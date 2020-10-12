

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback } from 'react-native';
import color from '../../style/color';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector, useDispatch } from 'react-redux';
import * as UserAction from '../../store/actions/UserAction';


const GenerateOtp = ({ navigation }) => {

  const [phoneNumber, setPhoneNumber] = useState();
  const dispatch = useDispatch();


  const getotp = () => {
    if (phoneNumber != '' && phoneNumber != undefined && phoneNumber != null) {
      dispatch(UserAction.GenerateOtp(phoneNumber));

      navigation.navigate('VerifyOtp', { phoneNumber });


    }
  }

  return (

    <View style={styles.container}>

      <Text style={styles.textheading}>We need to text you the OTP to authenticate{'\n'} your account</Text>

      <View style={{ marginTop: hp('4%') }}>
        <Text style={styles.textphone}>Phone Number</Text>

        <TextInput style={styles.textinput} value={phoneNumber} keyboardType='numeric' onChangeText={value => setPhoneNumber(value)} />

      </View>
      <View style={{ marginHorizontal: wp('7%') }}>
        <Text style={styles.textbottom}>By continuing, you accept the privacy policy and Terms of Services .An sms will be sent to you with OTP to verify your number.SMS and data rates may apply</Text>
      </View>
      <TouchableWithoutFeedback onPress={() => getotp()}>
        <View style={styles.customButton}>

          <Text style={{ color: 'white', fontSize: 16 }}>Next</Text>

        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  textheading: {
    color: 'gray',
    textAlign: 'center',
    marginTop: hp('5%')
  },
  textphone: {
    marginLeft: wp('9%'),
    color: 'gray'
  },
  textbottom: {
    color: 'gray',
    marginTop: hp('5%'),
    fontSize: 11
  },

  textinput: {


    paddingLeft: 15,
    height: 35,
    marginTop: hp('1%'),
    marginHorizontal: wp('8%'),
    borderRadius: 8,
    borderColor: color.blue,
    borderWidth: 1
  },
  customButton: {
    backgroundColor: color.blue,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: hp('4%'),
    marginHorizontal: wp('8%')
  }
});

export default GenerateOtp;
