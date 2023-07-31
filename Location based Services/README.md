# Ambulance Aid for solving Oxygen Emergency problem


<b>1. Problem Statement and Introduction</b>

There have been numerous cases of oxygen emergency during an ambulance trip from one place to other. Absence of enough oxygen or ventilation within the ambulance may lead to patient’s death. To tackle this problem, our team has created a web application for ambulance. This web application displays information about all the available hospitals near the current location of ambulance and contacts with those hospitals to check the availability of ambulance. If the hospital with required amount of oxygen is located, the application displays the route to that hospital. Maps Javascript API is used to display map on the web application. <br>

<b>2. Locating Hospitals</b>
  
Geolocation API is used to find current location of the ambulance.<br>

Places API enable a web-based application to search for places (defined in this API as establishments, geographic locations, or prominent points of interest) contained within a defined area, such as the bounds of a map, or around a fixed point. A Nearby Search is a feature within Places API which allows search of places within a specified area. Search could be refined by supplying keywords or specifying the type of place. The <i>nearbySearch()</i> method is used to find all hospitals or clinics  that lie around the radius of 500m around ambulance. The available hospitals are marked on the map. In addition to providing a list of places within an area, the Places API also return detailed information about a specific place. 
 
<b>3. Contacting hospitals for help</b>  
The <i>getDetails()</i> method is used to find the details like name, address and formatted phone numbers of all the operational hospitals. The acquired phone numbers are used for contacting the respective hospitals and asking them about the availability of oxygen. The value of phone number is stored in the form of string and passed to backend of the Flask application through POST request.  
Twillio API is used for sending SMS to hospitals. If availability of the oxygen is confirmed, applications displays the path to hospital through Directions API. Directions Service is one of the Server-side libraries which receives direction requests and returns an efficient path. Travel time is the primary factor which is optimized, but other factors such as distance, number of turns and many more may be taken into account. DirectionsRenderer object renders the result on map. 
