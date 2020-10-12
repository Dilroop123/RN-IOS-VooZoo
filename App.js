import React, { useEffect } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './navigation/navigation';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import SplashScreen from 'react-native-splash-screen';
import { LogBox } from 'react-native'
import categoryReducer from './store/reducers/CategoryReducer';
import userReducer from './store/reducers/UserReducer';
import cartReducer from './store/reducers/CartReducer';
import AddressReducer from './store/reducers/AddressReducer';
import WishReducer from './store/reducers/WishListReducer';
import OrderReducer from './store/reducers/OrderReducer';
import SocailReducer from './store/reducers/SocailShareReducer';
import FilterReducer from './store/reducers/FiltersReducer';
import ReviewReducer from './store/reducers/ReviewReducer';
import ProductReducer from './store/reducers/ProductReducer';
/*import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from 'react-native-push-notification';


// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log(token.token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   
  requestPermissions: true,
});*/
const rootReducer = combineReducers({
  category: categoryReducer,
  user: userReducer,
  cart: cartReducer,
  address: AddressReducer,
  wish: WishReducer,
  order: OrderReducer,
  socialShare: SocailReducer,
  filters: FilterReducer,
  review: ReviewReducer,
  product: ProductReducer

});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
])

const App = ({ navigation }) => {


  useEffect(() => {

    SplashScreen.hide();

  }, []);


  return (
    <NavigationContainer>

      <Provider store={store}><MyStack /></Provider>
    </NavigationContainer>

  );
};



export default App;
