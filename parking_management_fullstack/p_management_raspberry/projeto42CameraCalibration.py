#!/usr/bin/python3

# import the necessary packages
from picamera.array import PiRGBArray
import json
import numpy as np
from picamera import PiCamera
import time
from time import localtime, gmtime, strftime
import cv2

refPoints = []
cropping = False
pt_list = []


# write file
def write_file(file, data):
    with open(file, "w") as outfile:
        json.dump(data, outfile)


def calculate_centroid(points):
    moments = cv2.moments(points)
    centroid = (
        int(moments["m10"] / moments["m00"]),
        int(moments["m01"] / moments["m00"]),
    )
    return centroid


# draw parking slot
def draw_slot(image, coordinates, id):
    color = (0, 255, 0)
    points = np.array(coordinates)
    centroid = calculate_centroid(points)
    cv2.drawContours(
        image, [points], contourIdx=-1, color=color, thickness=2, lineType=cv2.LINE_8
    )
    cv2.putText(
        image,
        str(id),
        (centroid[0] + 3, centroid[1] + 2),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.75,
        (255, 255, 255),
        1,
        cv2.LINE_AA,
    )
    cv2.circle(image, (centroid[0], centroid[1]), 7, color, -1)


def crop_slot_image(image, coordinates, identifier):
    clone_image = image.copy()
    points = np.array(coordinates)
    rect = cv2.boundingRect(points)
    roi = clone_image[rect[1] : (rect[1] + rect[3]), rect[0] : (rect[0] + rect[2])]
    cv2.imwrite("./data/slot_background_%d.jpg" % identifier, roi)
    return roi


# check points by clicking the mouse
def click_and_check_points(event, x, y, flags, param):
    # grab references to the global variables
    global refPoints, cropping, pt_list

    if event == cv2.EVENT_LBUTTONDOWN:
        refPoints = [(x, y)]
        cropping = True
        pt_list.append([x, y])
        print(pt_list)

    # check to see if the left mouse button was released
    elif event == cv2.EVENT_LBUTTONUP:
        print(x, y)
        refPoints.append((x, y))
        cropping = False

        # draw a rectangle around the region of interest
        cv2.rectangle(image, refPoints[0], refPoints[1], (0, 255, 0), 2)

    return pt_list, refPoints


def calibration():
    # initialize the camera and grab a reference to the raw camera capture
    camera = PiCamera()
    camera.rotation = 270
    camera.resolution = (864, 480)
    camera.framerate = 15
    rawCapture = PiRGBArray(camera, size=(864, 480))

    # allow the camera to warmup
    time.sleep(0.1)

    res_width = 854
    res_height = 480

    # capture frames from the camera
    for frame in camera.capture_continuous(
        rawCapture, format="bgr", use_video_port=True
    ):
        # grab the raw NumPy array representing the image, then initialize the timestamp
        # and occupied/unoccupied text
        image = frame.array

        # show the frame
        cv2.imshow("Frame", image)
        key = cv2.waitKey(1) & 0xFF

        # clear the stream in preparation for the next frame
        rawCapture.truncate(0)

        # if the `q` key was pressed, break from the loop
        if key == ord("q"):
            cv2.resize(image, (res_width, res_height))
            k = cv2.waitKey(1) & 0xFF  # display video at normal speed
            cv2.imwrite("./data/frame_current_file.jpg", image)
            break

    cv2.destroyAllWindows()
    return image


def points_selection(image):
    global refPoints, cropping, pt_list
    cv2.namedWindow("image")
    cv2.setMouseCallback("image", click_and_check_points)

    identifier = 0
    data = []
    id_list = []
    points_list = []

    while True:
        # display the image and wait for a keypress
        cv2.moveWindow("image", 200, 100)
        cv2.imshow("image", image)

        cv2.putText(
            image,
            "press 'r' for reset points",
            (5, 30),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.5,
            (0, 0, 255),
            1,
            cv2.LINE_AA,
        )
        cv2.putText(
            image,
            "press 'c' for check points",
            (5, 50),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.5,
            (0, 0, 255),
            1,
            cv2.LINE_AA,
        )
        cv2.putText(
            image,
            "press 'q' for quit and exit",
            (5, 70),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.5,
            (0, 0, 255),
            1,
            cv2.LINE_AA,
        )
        cv2.putText(
            image,
            "for each slot, check 4 points",
            (500, 30),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.5,
            (0, 0, 255),
            1,
            cv2.LINE_AA,
        )

        key = cv2.waitKey(1) & 0xFF

        # if the 'r' key is pressed, reset the cropping region
        if key == ord("r"):
            # menu()
            image = clone.copy()
            identifier = 0
            id_list = []
            points_list = []
            pt_list = []

        # if the 'c' key is pressed, break from the loop
        elif key == ord("p"):
            identifier += 1
            id_list.append(identifier)
            points_list.append(pt_list)
            # crop_slot_image(clone, pt_list, identifier)
            draw_slot(image, pt_list, identifier)
            pt_list = []
            print(pt_list)

        # if the 'w' key is pressed, write file with points
        elif key == ord("w"):
            for i in range(len(id_list)):
                data.append({"id": id_list[i], "points": points_list[i]})
            print(data)
            if config["real_time_camera"]:
                filename = file_path + "slots_test_cam.json"
            else:
                filename = file_path + "slots_test_maquete.json"
            write_file(filename, data)
            break

        # don´t write file and run main with the default points file
        elif key == ord("q"):
            break

    cv2.destroyAllWindows()


# End

# -----------------------------------------------------------------------------
# Main
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    lTime = strftime("%H:%M:%S", localtime())
    print(lTime, "Start!")
    file_path = "./data/"

    write_file(
        file_path + "file_quit.json",
        {"quit_command": True, "restart_command": False, "print_frame": False},
    )

    image = calibration()
    points_selection(image)

    write_file(
        file_path + "file_quit.json",
        {"quit_command": False, "restart_command": False, "print_frame": False},
    )

    lTime = strftime("%H:%M:%S", localtime())
    print(lTime, "End!")
