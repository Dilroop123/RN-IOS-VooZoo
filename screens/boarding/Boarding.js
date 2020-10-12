

import React from 'react';
import { StyleSheet, ImageBackground, TouchableWithoutFeedback, View, Text, Alert } from 'react-native';
import color from '../../style/color';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SmsRetriever from 'react-native-sms-retriever';
import RNOtpVerify from 'react-native-otp-verify';
import { useSelector, useDispatch } from 'react-redux';
import * as UserAction from '../../store/actions/UserAction';
import { Platform } from 'react-native';
const Boarding = ({ navigation }) => {
  const dispatch = useDispatch();
  const userdata = useSelector(state => state.user.UserData);




  const generateOtp = async () => {
    let phoneNumber;


    try {
      phoneNumber = await SmsRetriever.requestPhoneNumber();
    } catch (error) {
      console.log(JSON.stringify(error));

      Alert.alert(
        "Phone",
        "Do you want to manually enter the Phone Number",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Yes", onPress: () => navigation.navigate('GenerateOtp') }
        ],
        { cancelable: false }
      );
    }
    //console.log(phoneNumber);

    if (phoneNumber != '' && phoneNumber != undefined && phoneNumber != null) {
      dispatch(UserAction.GenerateOtp(phoneNumber));
      if (Platform.OS === 'android') {
        navigation.navigate('VerifyOtp', { phoneNumber });

      } else {
        navigation.navigate('GenerateOtp')

      }
    }

    // let code = await RNOtpVerify.getHash();
    // console.log(code);
  }


  return (

    <View style={styles.container}>
      <ImageBackground source={require('../../assets/Background.png')} style={styles.image}>

        <View style={styles.subcontainer}>
          <Text style={styles.textearn}>Earn from Home {"\n"}with Zero Investment</Text>
        </View>

      </ImageBackground>

      <TouchableWithoutFeedback onPress={() => generateOtp()}>
        <View style={styles.customButton}>

          <Text style={{ color: 'white', fontSize: 16 }}>Continue</Text>

        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1

  },
  image: {
    flex: 1,
    flexDirection: 'row'
  },
  subcontainer: {
    flex: 1,
    marginTop: hp('18%'),
    marginLeft: wp('4%')
  },
  text: {
    color: color.blue,
    fontWeight: "bold",
    textAlign: 'center'
  },
  customButton: {
    backgroundColor: color.blue,
    alignItems: 'center',
    paddingVertical: 14,
    width: '100%',
    position: 'absolute',
    bottom: 0
  },
  textearn: {
    color: color.blue,
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center'
  }
});

export default Boarding;
