import React, { useEffect, useState } from "react";
import StackNav from "./src/navigators/StackNav";
import { LogBox, StatusBar } from "react-native";

LogBox.ignoreAllLogs();
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./src/assets/language/english.json";
import fr from "./src/assets/language/french.json";
import { PaperProvider } from "react-native-paper";
import { getFcmToken, notificationListener, requestUserPermission } from "./src/utils/Notification";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { navigate } from "./src/utils/RootNavigation";

// import {getFcmToken, notificationListener, requestUserPermission} from './src/utils/Notifications';


const resources = {
  en: { translation: en },
  fr: { translation: fr },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  debug: false,
  compatibilityJSON: "v3",
  interpolation: {
    escapeValue: false,
  },
});

const BOOKING_WEBSOCKET_URL = "https://jv-realtime-booking.onrender.com";

function App() {
  const [generatedToken, setGeneratedToken] = useState();
  const AuthReducer = useSelector(state => state.AuthReducer);

  useEffect(() => {
    if (AuthReducer?.token) {
      // connect socket
      const socket = io(BOOKING_WEBSOCKET_URL, {
        reconnectionDelayMax: 10000,
        query: {
          "authToken": AuthReducer?.token,
        },
      });

      socket.on("connect", () => {
        console.log("Connected to server", socket);
      });


      socket.on("newBookingRequest", (data) => {
        // console.log(data); // not recing data here
        navigate("AlertNotify", { bookingData: JSON.parse(data) });
      });

      return () => {
        socket.disconnect();
      };
    }

  }, [AuthReducer?.token]);


  const origin = "17.3676,78.5246";
  const destination = "17.4374,78.4487";

  fetch(
    "https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=AIzaSyDJzLxbnSawJABJlKpUpopVZGt9Adp08uQ",
  )
    .then(response => response.json())
    .then(data => {
      console.log("Routes Data -- ", data);
      if (data.routes.length > 0) {
        const route = data.routes[0].overview_polyline.points;
        console.log("Route -- ", route);
        // const decodedRoute = decodePolyline(route);
        // console.log("Decode Polyline -- ", decodedRoute);

        // setDirections(decodedRoute);
      } else {
        console.log("No Routes Found -- ", origin, destination);
      }
    })
    .catch(error => {
      console.error("Error fetching directions:", error);
    });

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getFcmToken();
      console.log("FCM TOKEN --> ", token);
      if (token) {
        setGeneratedToken(token);
      }
    };
    void requestUserPermission();
    void notificationListener();
    void fetchToken();
  }, []);
  return (
    <PaperProvider>
      <StatusBar
        animated={true}
        backgroundColor="#fff"
        barStyle={"dark-content"}
      />
      <StackNav />
    </PaperProvider>
  );
}

export default App;
