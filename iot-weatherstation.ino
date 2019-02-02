// ESP8266 Board with temperature, pressure and humidity sensor. Posts data to server as JSON

#include <Arduino.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <Wire.h>
#include <Adafruit_BME280.h>

#define I2C_ADDR 0x76
#define SSID ""  //Wifi name
#define PASSWD ""       //Wifi password 
#define IP "http://192.168.43.7:3001/api/newreading"  //Server IP
#define NAME "Saa-asema"

ESP8266WiFiMulti WiFiMulti;
Adafruit_BME280 sensor;

const int capacity = JSON_OBJECT_SIZE(4);

void setup() {
  Serial.begin(115200);

  Wire.begin();

  if(!sensor.begin(I2C_ADDR)){
    Serial.println("Error: Sensor not found");
  }
  WiFi.mode(WIFI_STA);
  WiFiMulti.addAP(SSID, PASSWD);
}

void loop() {
  StaticJsonBuffer<capacity> jb;
  char output[128];
  JsonObject& data = jb.createObject();

  data["name"] = NAME;
  data["temperature"] = sensor.readTemperature();
  data["pressure"] = sensor.readPressure();
  data["humidity"] = sensor.readHumidity();

  data.printTo(output);
  data.prettyPrintTo(Serial);
  Serial.println();

  if(WiFiMulti.run() == WL_CONNECTED){

    HTTPClient http;

    Serial.println("[HTTP] begin...");

    http.begin(IP);
    http.addHeader("Content-Type", "application/json");

    int httpcode = http.POST(output);
    
    if(httpcode == HTTP_CODE_OK){
      Serial.println("Working");
    }else{
      Serial.println("Something went wrong");
      Serial.println(httpcode);
    }

    http.end();
  }

  delay(10000);
}
