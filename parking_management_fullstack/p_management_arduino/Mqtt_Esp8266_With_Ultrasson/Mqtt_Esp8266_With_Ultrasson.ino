
#include <SPI.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

// defines pins numbers
const int trigPin = 2; //D4
const int echoPin = 0; //D3

// defines variables
long duration;
int distance;
int estado;
int distancia = 30;
int zona = 2;
int vaga = 3;

// Update these with values suitable for your network.

const char* ssid = "SSI da rede wifi";
const char* password = "password do wifi";
const char* mqtt_server = "46.189.192.58";

WiFiClient espClient;
PubSubClient client(espClient);
long lastMsg = 0;
String msg = "";
char msgChar[70];
int value = 0;

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(BUILTIN_LED, OUTPUT);     // Initialize the BUILTIN_LED pin as an output
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 8883);
  client.setCallback(callback);
}

void setup_wifi() {

  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();

  // Switch on the LED if an 1 was received as first character
  if ((char)payload[0] == '1') {
    digitalWrite(BUILTIN_LED, LOW);   // Turn the LED on (Note that LOW is the voltage level
    // but actually the LED is on; this is because
    // it is acive low on the ESP-01)
  } else {
    digitalWrite(BUILTIN_LED, HIGH);  // Turn the LED off by making the voltage HIGH
  }

}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect("ESP8266Client", "Projeto42", "Projeto42")) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      client.publish("services/sensor/request/Z" + String(zona) + String(vaga), "{\"opcao\":\"status-i\",\"zona\":" + String(zona) + ",\"camara\":0,\"vaga\":" + String(vaga) + ",\"tipo\":2,\"status\":1}");
      // ... and resubscribe
      client.subscribe("services/sensor/response");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}
void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);

  distance = duration * 0.034/2;
  Serial.print("Distancia em cm: ");
  Serial.println(distance);

  if (!client.connected()) {
    reconnect();
  }
  
  client.loop();

  if (distance < distancia) {
    msg =  "{\"opcao\":\"status-i\",\"zona\":" + String(zona) + ",\"camara\":0,\"vaga\":" + String(vaga) + ",\"tipo\":2,\"status\":0}";
  } else {
    msg =  "{\"opcao\":\"status-i\",\"zona\":" + String(zona) + ",\"camara\":0,\"vaga\":" + String(vaga) + ",\"tipo\":2,\"status\":1}";
  }

  Serial.print("msg: ");
  Serial.println(msg);
  msg.toCharArray(msgChar, 70);
  client.publish("services/sensor/request/Z" + String(zona) + String(vaga), msgChar);

  Serial.println("Waiting 30s");
  delay(30000);  
}

