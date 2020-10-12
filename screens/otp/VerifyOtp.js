/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, { useState, useEffect } from 'react';
import {
  Alert,
  I18nManager,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  View,
} from 'react-native';

import NumericKeyboard from '../../components/NumericKeyboard';
import color from '../../style/color'
import { useSelector, useDispatch } from 'react-redux';
import * as UserAction from '../../store/actions/UserAction';
import * as CartAction from '../../store/actions/CartAction';
import SmsRetriever from 'react-native-sms-retriever';

const isRTL = I18nManager.isRTL;


const VerifyOtp = ({ navigation, route }) => {
  const userdataotp = useSelector(state => state.user.OtpData);
  //   const userdata = useSelector(state => state.user.UserData);
  const userdata = useSelector(state => state.user);

  const [pin, setPin] = useState('');
  const { phoneNumber } = route.params;
  const dispatch = useDispatch();
  const [reciveotp, setRecieveOtp] = useState();


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {


      try {
        const registered = await SmsRetriever.startSmsRetriever();
        if (registered) {
          SmsRetriever.addSmsListener(event => {

            const otp = /(\d{6})/g.exec(event.message)[1];
            // setRecieveOtp(otp);

            var arr = otp.toString().split('');
            var digits = arr.map(function (el) { return +el })
            setPin(digits);
            console.log(otp);
            SmsRetriever.removeSmsListener();
            // submit();
          });
        }

      } catch (error) {
        console.log(JSON.stringify(error));
      }

    });


  }, []);






  const pressKeyboardButton = (keyboardButton) => () => {


    if (keyboardButton === 'backspace') {
      const Newpin = pin.slice(0, -1);
      setPin(Newpin);
      return;
    }



    if ((pin + keyboardButton).length > 6) {
      return;
    }
    setPin(pin + keyboardButton);

  };

  const submit = async () => {
    console.log(pin);
    if (phoneNumber != '' && phoneNumber != undefined && phoneNumber != null) {
      await dispatch(UserAction.createUser(phoneNumber, pin, userdataotp.Details));
    }

    // console.log(userdata);

    // if (userdata.userData._id != undefined) {
    navigation.replace('Gender');
    //}
  }

  return (
    <SafeAreaView forceInset={{ top: 'never' }} style={styles.screenContainer}>

      <View style={styles.container}>
        <View style={styles.instructionContainer}>
          <Text style={{ fontWeight: 'bold' }}>Enter Verification Code</Text>
          <Text style={styles.instruction}>
            We have sent OTP on your number{'\n'} {phoneNumber}
          </Text>

          <View style={styles.codeContainer}>
            <View style={styles.digitContainer}>
              <Text style={styles.digit}>{pin[0]}</Text>

            </View>
            <View style={styles.digitContainer}>
              <Text style={styles.digit}>{pin[1]}</Text>
            </View>
            <View style={styles.digitContainer}>
              <Text style={styles.digit}>{pin[2]}</Text>
            </View>
            <View style={styles.digitContainer}>
              <Text style={styles.digit}>{pin[3]}</Text>
            </View>
            <View style={styles.digitContainer}>
              <Text style={styles.digit}>{pin[4]}</Text>
            </View>
            <View style={styles.digitContainer}>
              <Text style={styles.digit}>{pin[5]}</Text>
            </View>
          </View>
        </View>

        <View style={{ marginHorizontal: 70 }}>
          <Button
            onPress={submit}
            disabled={pin.length < 6}
            color={color.blue}
            style={{ borderRadius: 7 }}


            title={'Continue'.toUpperCase()}
          />
        </View>

        <NumericKeyboard
          actionButtonTitle="skip"
          onPress={pressKeyboardButton}
        />


      </View>
    </SafeAreaView>
  );
}
export default VerifyOtp;
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  container: {
    flex: 1
  },
  instructionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instruction: {
    marginTop: 16,
    paddingHorizontal: 40,
    fontSize: 14,
    textAlign: 'center',
  },
  codeContainer: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 38,
  },
  digitContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    width: 48,
    height: 50,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  digit: {
    fontWeight: '400',
    fontSize: 17,
  },
  buttonContainer: {
    width: '100%',
    marginHorizontal: 20
  },
});