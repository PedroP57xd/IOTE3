#include <Firebase_ESP_Client.h>
#include <WiFi.h>
#include <addons/TokenHelper.h>
#include <ArduinoJson.h>
#define FIREBASE_USE_PSRAM

int led1= 23,led2= 22, led3=21;

//Conectar a una red WiFi
const char* WIFI_SSID = "STP1";            //el nombre de la red
const char* WIFI_PASSWORD = "1234esp321";  //la contraseña de la red
//Recursos de Firebase
const char* API_KEY = "AIzaSyD036Hf9HOmaRXVnWekzBEWrSR1FpLBQ4k";
const char* FIREBASE_PROJECT_ID = "iote3-b8780";
//CONFIGURAR UN EMAIL Y CONTRASEÑA EN AUTHENTICATION de Firebase
const char* USER_EMAIL = "esp32@test.com";
const char* USER_PASSWORD = "123456";

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
void setupWiFi() {
  Serial.print("Connecting to Wi-Fi");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
}

void setupFirebase() {
  config.api_key = API_KEY;
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;
  config.token_status_callback = tokenStatusCallback;  // Ver addons/TokenHelper.h
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}
void setup() {
  Serial.begin(115200);
  Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);  //Verificamos la version
  setupWiFi();                                                        //Llamamos la funcion de configuración wifi
  setupFirebase();                                                    //Llamamos la funcion de configuración Firebase

  pinMode(23,OUTPUT);
  pinMode(22,OUTPUT);
  pinMode(21,OUTPUT);
}

void loop() {
  String path = "controlLED";  //RUTA DE COLECCION
  FirebaseJson json;

  if (Firebase.Firestore.getDocument(&fbdo, FIREBASE_PROJECT_ID, "", path.c_str(), "")) {

    StaticJsonDocument<1024> doc;
    DeserializationError error = deserializeJson(doc, fbdo.payload().c_str());

    if (!error) {
      for (JsonObject document : doc["documents"].as<JsonArray>()) {
        const char* document_name = document["name"];//PARAMETRO NOMBRE
        Serial.print(document);
        const bool state = document["fields"]["encender"]["booleanValue"];//PARAMETRO DE CAMPOS A REVISAR
        Serial.print(" : ");
        if (strstr(document_name, "LED1") != nullptr) {//COMPARAR NOMBRE CON  RESULTADO ESPERADO LED1
          state ? digitalWrite(led1,1) : digitalWrite(led1,0);
        }
        if (strstr(document_name, "LED2") != nullptr) {//COMPARAR NOMBRE CON  RESULTADO ESPERADO LED1
          state ? digitalWrite(led2,1) : digitalWrite(led2,0);
        }
        if (strstr(document_name, "LED3") != nullptr) {//COMPARAR NOMBRE CON  RESULTADO ESPERADO LED1
          state ? digitalWrite(led3,1) : digitalWrite(led3,0);
        }
        if (strstr(document_name, "LEDS") != nullptr) {//COMPARAR NOMBRE CON  RESULTADO ESPERADO LED1
          state ? Serial.println("Control 4 On")  : Serial.println("Control 1 OFF");
        }
      }
    }
  }
}
