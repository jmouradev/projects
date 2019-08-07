
#include <SPI.h>
#include <RH_RF95.h>

#define sensor A0 // Sharp IR GP2Y0A41SK0F (4-30cm, analog)

// Singleton instance of the radio driver
RH_RF95 rf95;
float frequency = 868.0;
uint8_t dataoutgoing[100];
String bigstring = "";    
int count = 0;
String zona = "Z002";
String vaga = "V002";
int distancia = 30;

void setup() {
  Serial.begin(9600); // start the serial port
  Serial.println("Start LoRa Client");
  
  if (!rf95.init())
    Serial.println("init failed");
  
  // Setup ISM frequency
  rf95.setFrequency(frequency);
  // Setup Power,dBm
  rf95.setTxPower(13);

  // Setup Spreading Factor (6 ~ 12)
  rf95.setSpreadingFactor(7);
  
  // Setup BandWidth, option: 7800,10400,15600,20800,31200,41700,62500,125000,250000,500000
  //Lower BandWidth for longer distance.
  rf95.setSignalBandwidth(125000);
  
  // Setup Coding Rate:5(4/5),6(4/6),7(4/7),8(4/8) 
  rf95.setCodingRate4(5);
}

void loop() {
  
  // 5v
  float volts = analogRead(sensor)*0.0048828125;  // value from sensor * (5/1024)
  int cmMsec = 13*pow(volts, -1); // worked out from datasheet graph

  Serial.print("Distancia em cm: ");
  Serial.println(cmMsec);
  count++;

  if (cmMsec < distancia) {
    bigstring = zona + vaga + "S000";
  } else {
    bigstring = zona + vaga + "S001";
  }

  bigstring.toCharArray(dataoutgoing, 35);

  Serial.println(bigstring);
  // Send the data to server
  
  Serial.println("Sending to LoRa Server");
  // Send a message to LoRa Server
  rf95.send(dataoutgoing, sizeof(dataoutgoing));

//  rf95.waitPacketSent();
//  Serial.println("Waiting for LoRa Server");

//  uint8_t buf[RH_RF95_MAX_MESSAGE_LEN];
//  uint8_t len = sizeof(buf);

//  if (rf95.waitAvailableTimeout(300)) {
//    Serial.println("Reply!");
//  } else {
//    Serial.println("No reply!");
//  }
  
  Serial.println("Waiting 30s");
  delay(30000);
}
