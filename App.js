import React, { useEffect, useState, useRef, } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
    AppState
} from "react-native";
// import Firebase from '@react-native-firebase/app'
import loadData from "./src/components/Login";
import Colors from "./src/ColorCodes/Colors";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

// import PushNotification from "react-native-push-notification";
// import AsyncStorage from '@react-native-community/async-storage'
//import ShipmentBooking from './src/components/shipment/ShipmentBooking';
import profile_Data from "./src/store/reducers/profile_Data";
import ApiData from "./src/store/reducers/ApiData";
import MyStack from "./src/navigation/MyStack";
import OrderBox from "./src/store/reducers/OrderBox";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import messaging from '@react-native-firebase/messaging';

import NewScreen from "./NewScreen";
import DateTime from "./src/components/DateTime";
// import BusinessData from "./src/store/reducers/BusinessData";


const rootReducer = combineReducers({
  // products: productsReducer,
  // cart: cartReducer,
  // orders: ordersReducer,
  // mealReducer:mealReducer,
  // changeInProfile:changeInProfile,
  // loading:loading,
  ApiData: ApiData,
  profile_Data: profile_Data,
  OrderBox: OrderBox,
  // BusinessData: BusinessData,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
const App = () => {

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(()=>{

    PushNotificationIOS.addEventListener("notification",(data)=>{
      console.log("data ==PushNotificationIOS.addEventListener=>>>",data);
      PushNotificationIOS.getApplicationIconBadgeNumber(number => {
        console.log("background app message ==number==>>>>",number);
        PushNotificationIOS.setApplicationIconBadgeNumber(number + 1);
      });

    })

    messaging().setBackgroundMessageHandler(async (test)=>{
      console.log("onMessage ===test===>>>>",test);
      PushNotificationIOS.getApplicationIconBadgeNumber(number => {
        console.log("background app message ==number==>>>>",number);
        PushNotificationIOS.setApplicationIconBadgeNumber(number + 1);
      });
    });
    AppState.addEventListener("change", nextAppState => {
      if (
          appState.current.match(/inactive|background/) &&
          nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
        PushNotificationIOS.setApplicationIconBadgeNumber(0);
      }
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log("AppState", appState.current);
    });


  },[]);




  return (
    <>
      {/* <SafeAreaView style={styles.topSafeArea} />
      <SafeAreaView style={styles.bottomSafeArea}> */}
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor={Colors.themeColor}
      />
      <Provider store={store}>
        <MyStack />
      </Provider>
      {/* </SafeAreaView> */}
    </>
  );
};
const styles = StyleSheet.create({
  topSafeArea: {
    flex: 0,
    // backgroundColor: 'blue'
  },
  bottomSafeArea: {
    flex: 1,
    // backgroundColor: 'red'
  },
});

// const App = () => {
//   return (

// <DateTime/>
//   )

// }

export default App;
