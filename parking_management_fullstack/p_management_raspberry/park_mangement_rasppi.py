
from picamera.array import PiRGBArray
from picamera import PiCamera
import cv2
import json
import numpy as np
import time
from time import localtime, gmtime, strftime
import projeto42MqttClientCamara as mqttClient
from pathlib import Path

refPoints = []
cropping = False
pt_list = []


# write file
def write_file(file, data):
    with open(file, "w") as outfile:
        json.dump(data, outfile)


# read file
def read_file(file):
    with open(file, "r") as json_data:
        data = json.load(json_data)
    return data


def shift_points(points):
    rect = cv2.boundingRect(points)
    shifted_points = points.copy()
    shifted_points[:, 0] = points[:, 0] - rect[0]  # shift contour to roi
    shifted_points[:, 1] = points[:, 1] - rect[1]
    return shifted_points, rect


# read file with points and create parking slots
def apply_points(data_points, key):
    slot_contours = []
    slot_bounding_rects = []
    parking_mask = []
    for park in data_points:
        points = np.array(park[key])
        sh_points, rect = shift_points(points)
        slot_contours.append(points)
        slot_bounding_rects.append(rect)
        mask = cv2.drawContours(
            np.zeros((rect[3], rect[2]), dtype=np.uint8),
            [sh_points],
            contourIdx=-1,
            color=255,
            thickness=-1,
            lineType=cv2.LINE_8,
        )
        mask = mask == 255
        parking_mask.append(mask)

    return slot_contours, slot_bounding_rects, parking_mask


def calculate_centroid(points):
    moments = cv2.moments(points)
    centroid = (
        int(moments["m10"] / moments["m00"]),
        int(moments["m01"] / moments["m00"]),
    )
    return centroid


def image_processing():
    file_path = "./data/"

    file_config = Path(file_path + "config_file.json")
    if not file_config.is_file():
        write_file(
            file_path + "config_file.json",
            {
                "save_video": False,
                "text_overlay": False,
                "parking": True,
                "p_detection": True,
                "laplacian_threshold": 0.6,
                "wait_for_parking": 3.0,
                "start_frame": 0,
                "frame_speed": 20,
                "real_time_camera": True,
                "default_slots_file": True,
                "status_time_confirmation": 3.0,
                "run_directly": True,
                "read_waiting_time": 60,
                "status_waiting_time": 60,
                "delta_waiting_time": 60,
            },
        )

    file_quit = Path(file_path + "file_quit.json")
    if not file_quit.is_file():  # True if file_quit exists
        write_file(
            file_path + "file_quit.json",
            {"quit_command": False, "restart_command": False, "print_frame": False},
        )

    config = read_file("./data/config_file.json")
    config_quit = read_file("./data/file_quit.json")

    if config_quit["quit_command"]:
        return 0

    # ##### READ IMAGE #######

    image = cv2.imread("./data/frame_current_file.jpg")
    clone = image.copy()

    identifier = 0

    data = []
    id_list = []
    points_list = []

    # initialize the camera and grab a reference to the raw camera capture
    camera = PiCamera()
    camera.rotation = 270
    camera.resolution = (864, 480)
    camera.framerate = 15
    rawCapture = PiRGBArray(camera, size=(864, 480))

    res_width = 854
    res_height = 480
    ret = False

    fn_json = r"./data/slots_test_cam.json"  # points file
    fn_out = r"data/output4_test_cam.avi"  # video file for saving
    ret = True
    images_list = []

    # Read JSON data (parking space slots)
    parking_data = read_file(fn_json)
    parking_contours, parking_bounding_rects, parking_mask = apply_points(
        parking_data, "points"
    )

    p_status = [False] * len(parking_data)
    p_buffer = [None] * len(parking_data)
    parking_time = [0.0] * len(parking_data)
    tempoInicialRead = time.time() - 90000
    tempoInicialStatus = time.time()
    tempoInicialDelta = time.time()
    time.sleep(5)

    for frameIn in camera.capture_continuous(
        rawCapture, format="bgr", use_video_port=True
    ):
        frame = frameIn.array

        if (time.time() - tempoInicialRead) > config["read_waiting_time"]:
            config = read_file("./data/config_file.json")
            config_quit = read_file("./data/file_quit.json")
            tempoInicialRead = time.time()

        if config_quit["quit_command"] or config_quit["restart_command"]:
            break

        if ret is False:
            print("Capture Error")
            break
        else:
            cv2.resize(frame, (res_width, res_height))
            k = cv2.waitKey(1) & 0xFF  # display video at normal speed

            if config_quit["print_frame"]:
                cv2.imwrite("./data/frame_current_file.jpg", frame)
                write_file(
                    file_path + "file_quit.json",
                    {
                        "quit_command": False,
                        "restart_command": False,
                        "print_frame": False,
                    },
                )

            frame_blur = cv2.GaussianBlur(frame.copy(), (5, 5), 3)
            frame_gray = cv2.cvtColor(frame_blur, cv2.COLOR_BGR2GRAY)
            frame_out = frame.copy()

            parked_slots_id = []
            parked_slots_id_time = []
            delta_list = []
            var_time = 0.00
            park_list = []
            status_time_conf = time.time()
            if config["p_detection"]:
                for idx, park in enumerate(parking_data):
                    points = np.array(park["points"])
                    rect = parking_bounding_rects[idx]
                    roi_gray = frame_gray[
                        rect[1] : (rect[1] + rect[3]), rect[0] : (rect[0] + rect[2])
                    ]  # crop roi
                    laplacian = cv2.Laplacian(
                        roi_gray, cv2.CV_64F
                    )  # Laplacian of the image
                    points[:, 0] -= rect[0]  # shift contour to roi
                    points[:, 1] -= rect[1]
                    delta = np.mean(np.abs(laplacian * parking_mask[idx]))
                    status = delta < config["laplacian_threshold"]

                    id_delta = {"id_vaga": park["id"], "delta": delta}
                    delta_list.append(id_delta)

                    # If detected a change in parking status, save the current time
                    if status != p_status[idx] and p_buffer[idx] is None:
                        p_buffer[idx] = time.time()
                        if (
                            time.time() - status_time_conf
                            > config["status_time_confirmation"]
                        ):
                            mqttClient.sendStatus(str(park["id"]), int(p_status[idx]))
                            write_file(
                                "./data/status_file" + str(park["id"]) + ".json",
                                {"id": park["id"], "status": str(p_status[idx])},
                            )
                            print({"id": park["id"], "status": str(p_status[idx])})
                            status_time_conf = time.time()

                    # # If status is still different than the one saved and counter is open
                    elif status != p_status[idx] and p_buffer[idx] is not None:
                        if time.time() - p_buffer[idx] > config["wait_for_parking"]:
                            p_status[idx] = status
                            p_buffer[idx] = None
                            mqttClient.sendStatus(str(park["id"]), int(p_status[idx]))
                            write_file(
                                "./data/status_file" + str(park["id"]) + ".json",
                                {"id": park["id"], "status": str(p_status[idx])},
                            )
                            print({"id": park["id"], "status": str(p_status[idx])})

                    # # If status is still same and counter is open
                    elif status == p_status[idx] and p_buffer[idx] is not None:
                        if time.time() - p_buffer[idx] > config["wait_for_parking"]:
                            p_buffer[idx] = None

                    if (time.time() - tempoInicialStatus) > config[
                        "status_waiting_time"
                    ]:
                        mqttClient.sendStatus(str(park["id"]), int(p_status[idx]))

            if (time.time() - tempoInicialStatus) > config["status_waiting_time"]:
                tempoInicialStatus = time.time()

            if (time.time() - tempoInicialDelta) > config["delta_waiting_time"]:
                lTime = time.asctime(time.localtime(time.time()))
                dh_delta_list = {
                    "data_hora": lTime,
                    "laplacian_threshold": config["laplacian_threshold"],
                    "delta_list": delta_list,
                }
                mqttClient.sendDelta(dh_delta_list)
                tempoInicialDelta = time.time()

            if config["parking"]:
                for idx, park in enumerate(parking_data):
                    parked_slots_id.append(park["id"])
                    points = np.array(park["points"])
                    centroid = calculate_centroid(points)

                    if not p_status[idx]:
                        color = (0, 0, 255)
                        parking_time[idx] = time.time()
                        parked_slots_id.append(park["id"])
                        cv2.putText(
                            frame_out,
                            str(p_status[idx]),
                            (centroid[0] + 10, centroid[1] + 5),
                            cv2.FONT_HERSHEY_SIMPLEX,
                            0.45,
                            (255, 255, 255),
                            1,
                            cv2.LINE_AA,
                        )

                    else:
                        color = (0, 255, 0)
                        parked_slots_id.remove(park["id"])
                        cv2.putText(
                            frame_out,
                            str(p_status[idx]),
                            (centroid[0] + 10, centroid[1] + 5),
                            cv2.FONT_HERSHEY_SIMPLEX,
                            0.45,
                            (255, 255, 255),
                            1,
                            cv2.LINE_AA,
                        )
                    cv2.circle(frame_out, (centroid[0], centroid[1]), 7, color, -1)
                cv2.putText(
                    frame_out,
                    "occupied = " + str(len(p_status) - sum(p_status)),
                    (5, 70),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.5,
                    (0, 0, 255),
                    1,
                    cv2.LINE_AA,
                )

        # Display video frames
        if not config["run_directly"]:
            cv2.moveWindow("frame", 100, 50)
            cv2.imshow("frame", frame_out)

        if k == ord("q"):
            break
        elif k == ord("c"):
            cv2.imwrite("./data/frame%d.jpg" % video_cur_frame, frame_out)

        rawCapture.truncate(0)

    if config["save_video"]:
        out.release()
    cv2.destroyAllWindows()

    filename_parking_ids = file_path + "parking_file.json"

    if config_quit["restart_command"]:
        quit_command = config_quit["quit_command"]
        write_file(
            file_path + "file_quit.json",
            {
                "quit_command": quit_command,
                "restart_command": False,
                "print_frame": False,
            },
        )


# End

# -----------------------------------------------------------------------------
# Main
# -----------------------------------------------------------------------------

if __name__ == "__main__":

    lTime = strftime("%H:%M:%S", localtime())
    print(lTime, "Start!")

    image_processing()

    lTime = strftime("%H:%M:%S", localtime())
    print(lTime, "End!")
