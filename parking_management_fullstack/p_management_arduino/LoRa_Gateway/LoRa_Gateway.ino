
//For product: LG01. 
#define BAUDRATE 115200

#include <Console.h>
#include <SPI.h>
#include <RH_RF95.h>

// Singleton instance of the radio driver
RH_RF95 rf95;

int led = A2;
float frequency = 868.0;
String dataOut = "";
int zona = 0;
int vaga = 0;
int stat = 1;
String msg = "";
String topic = "";

void setup() {
  pinMode(led, OUTPUT);     
  Bridge.begin(BAUDRATE);
  Console.begin();
  Console.println("Start Execution");
  
  while (!Console); // Wait for console port to be available
  
  Console.println("Start Sketch");
  
  if (!rf95.init())
    Console.println("init failed");
  
  // Setup ISM frequency
  rf95.setFrequency(frequency);
  // Setup Power,dBm
  rf95.setTxPower(13);
  
  // Setup Spreading Factor (6 ~ 12)
  rf95.setSpreadingFactor(7);
  
  // Setup BandWidth, option: 7800,10400,15600,20800,31200,41700,62500,125000,250000,500000
  rf95.setSignalBandwidth(125000);
  
  // Setup Coding Rate:5(4/5),6(4/6),7(4/7),8(4/8) 
  rf95.setCodingRate4(5);
  
  Console.print("Listening on frequency: ");
  Console.println(frequency);
}

void loop() {
  if (rf95.available()) {
    // Should be a message for us now   
    uint8_t buf[RH_RF95_MAX_MESSAGE_LEN];
    uint8_t len = sizeof(buf);

    if (rf95.recv(buf, &len)) {
      digitalWrite(led, HIGH);
      RH_RF95::printBuffer("request: ", buf, len);
      Console.print("got request: ");
      Console.println((char*)buf);
      Console.println(len);
      Console.print("RSSI: ");
      Console.println(rf95.lastRssi(), DEC);

      Console.println("Go to MQTT");
      dataOut = (char*)buf;

      zona = dataOut.substring(1,4).toInt();
      vaga = dataOut.substring(5,8).toInt();
      stat = dataOut.substring(9,12).toInt();
      console.println("zona: " + String(zona) + " vaga: " + String(vaga) + " status: " + String(stat));
     
      mqtt_publish();
      
//      uint8_t data[] = "OK";
//      rf95.send(data, sizeof(data));
//      rf95.waitPacketSent();
//      Console.println("Sent a reply");

      digitalWrite(led, LOW);
    } else {
      Console.println("recv failed");
    }
  } 
}

String generate_data() {
  console.println("{\"opcao\":\"status-i\",\"zona\":" + String(zona) + ",\"camara\":0,\"vaga\":" + String(vaga) + ",\"tipo\":2,\"status\":" + String(stat) + "}");
  return "{\"opcao\":\"status-i\",\"zona\":" + String(zona) + ",\"camara\":0,\"vaga\":" + String(vaga) + ",\"tipo\":2,\"status\":" + String(stat) + "}";
}

void mqtt_publish() {
    Console.println("into MQTT");
    Process p;    // Create a process and call it "p"
    p.begin("mosquitto_pub"); // Process that launch the "mosquitto_pub" command
    p.addParameter("-d");
    p.addParameter("-h");
    p.addParameter("46.189.192.58");
    p.addParameter("-i");
    p.addParameter("dragino-17c556");  // Add Baidu Device ID
    p.addParameter("-p");
    p.addParameter("8883");
    p.addParameter("-q");
    p.addParameter("0");
    p.addParameter("-m");
    p.addParameter(generate_data());   // Add data
    p.addParameter("-u");
    p.addParameter("Projeto42");
    p.addParameter("-P");
    p.addParameter("Projeto42");
    p.addParameter("-t");
    p.addParameter("services/sensor/request/Z21");    // Publish to this topic
    p.run();    // Run the process and wait for its termination
    Console.println(p.available());
  
    // Print arduino logo over the Serial
    // A process output can be read with the stream methods
    while (p.available() > 0) {
      char c = p.read();
      Console.print(c);
    }
  //   Ensure the last bit of data is sent.
    Console.flush();
    Console.println("end MQTT");
}

