// Get libriaries
#include <SoftwareSerial.h>
SoftwareSerial esp8266(9,10);
#include <iarduino_HC_SR04.h>        


iarduino_HC_SR04 h1(3,2);          
iarduino_HC_SR04 h2(5,4);
iarduino_HC_SR04 h3(7,6);
iarduino_HC_SR04 h4(12,11);


// Info about smart device
int placementId = 1006;
int smartDeviceId = 1005;
int activationOnDistance = 4;

class Sensor
{
  public:
    int sensorId;
    boolean sensorActiveted;
    long timeWhenLastTimeActiveted;
    int roomId;
    int neighboringSensorId;
    long timeOfLastActiveted;
    iarduino_HC_SR04* sensorDevice;
    Sensor(iarduino_HC_SR04* b, int _sensorId, int _roomId, int _neighboringSensorId)
    {
      sensorDevice = b;
      sensorActiveted = false;
      sensorId = _sensorId;
      roomId = _roomId;
      neighboringSensorId = _neighboringSensorId;
    }
    int sensorDistance()
    {
      return (*sensorDevice).distance();
    }
    boolean active()
    {
      return (sensorDistance() <= activationOnDistance);
    }
    
};
// Create objects for sensor
Sensor s1(&h1, 1020, 1013, 1021);
Sensor s2(&h2, 1021, 1014, 1020);
Sensor s3(&h3, 1022, 1014, 1023);
Sensor s4(&h4, 1023, 1015, 1022);
const int arraySize = 4;
Sensor arr[arraySize] {s1, s2, s3, s4};

int findIndexOfNeighboringSensor(int sensorId)
{
  for(int i = 0; i < arraySize; i++)
  {
    if(arr[i].sensorId == sensorId)
    {
      return i;
    }
  }
}

boolean neighboringSensorWasActivatedRecently(int IndexOfNeighboringSensor)
{
  return (arr[IndexOfNeighboringSensor].sensorActiveted == true 
  && millis() - arr[IndexOfNeighboringSensor].timeWhenLastTimeActiveted <= 2000);
}

String sendData(String command, const int timeout, boolean debug){
  String response = "";
  esp8266.print(command);
  long int time = millis();
  while((time+timeout) > millis()) 
  {
    while(esp8266.available())
    {
      char c = esp8266.read();
      response+=c;
    }
  }
  if(debug)
  {
    Serial.print(response);
  }
 return response;
}

void setup_ESP()
{
   sendData("AT+RST\r\n", 2000, 1);
   delay(1000);
   sendData("AT+CWJAP=\"YOUR_WIFI_NAME\",\"YOUR_WIFI_PASSWORD\"\r\n", 4000, 1);
   delay (4000);
   sendData("AT+CIPMODE=0\r\n", 1000, 1);
   delay (1000);
   sendData("AT+CIPMUX=1\r\n", 1000, 1);
   delay (1000);
}

void sendToServer(int roomOutId, int roomInId)
{
   sendData("AT+CIPSTART=0,\"TCP\",\"api.thingspeak.com\",80\r\n", 1000, 1);
   sendData("AT+CIPSEND=0,112\r\n", 100, 1);
   String placement = String(placementId);
   String roomOut = String(roomOutId);
   String roomIn = String(roomInId);
   String str = "GET https://api.thingspeak.com/update?api_key=4NYJPS5UBJ4WTY34&field1=" + placement + "&field2=" + roomOut + "&field3=" + roomIn + " HTTP/1.0\r\n";
   sendData(str, 100, 1);
   sendData("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", 1000, 1);
}

void serverGetData()
{
   sendData("AT+CIPSTART=0,\"TCP\",\"api.thingspeak.com\",80\r\n", 1000, 1);
   sendData("AT+CIPSEND=0,110\r\n", 100, 1);
   sendData("GET https://api.thingspeak.com/apps/thinghttp/send_request?api_key=FNOQDLAMRR2VYBJV HTTP/1.0\r\n", 100, 1);
   sendData("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", 100, 1);
   sendData("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", 1000, 1);
}

void work()
{
  for(int i = 0; i < arraySize; i++)
  {
    // If Sensor triggered
    if(arr[i].active())
    {
      arr[i].sensorActiveted = true;
      arr[i].timeWhenLastTimeActiveted = millis();
      int IndexOfNeighboringSensor = findIndexOfNeighboringSensor(arr[i].neighboringSensorId);
      if(neighboringSensorWasActivatedRecently(IndexOfNeighboringSensor) 
      && millis() - arr[i].timeOfLastActiveted >= 2000)
      {
        Serial.print("From room  ");
        Serial.print(arr[IndexOfNeighboringSensor].roomId);
        Serial.print("  To room  ");
        Serial.println(arr[i].roomId);
       
        int roomOutId = arr[IndexOfNeighboringSensor].roomId;
        int roomInId = arr[i].roomId;
        sendToServer(roomOutId, roomInId);
        serverGetData();
        delay(1500);
        
        arr[i].sensorActiveted = false;
        arr[i].timeWhenLastTimeActiveted = 0;
        
        arr[IndexOfNeighboringSensor].sensorActiveted = false;
        arr[IndexOfNeighboringSensor].timeWhenLastTimeActiveted = 0;
        
        arr[i].timeOfLastActiveted = millis();
        arr[IndexOfNeighboringSensor].timeOfLastActiveted = millis();
      }
    }
  }
}

void setup(){
  pinMode(13, OUTPUT);
  digitalWrite(13, LOW);
  Serial.begin(9600);                
  esp8266.begin(115200);
  setup_ESP();
  digitalWrite(13, HIGH);
}

void loop(){
  work();
  
}

