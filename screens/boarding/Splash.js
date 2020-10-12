import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Image, View, Text, StatusBar, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import color from '../../style/color';
import { useSelector, useDispatch } from 'react-redux';
import * as UserAction from '../../store/actions/UserAction';
import AsyncStorage from '@react-native-community/async-storage';

const Splash = ({ navigation }) => {

  const dispatch = useDispatch();


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {

      stopSplash();


    });


  }, []);

  const stopSplash = () => {


    AsyncStorage.getItem('USER_ID').then(async (value) => {
      console.log(value);

      if (value != undefined) {
        await dispatch(UserAction.getUserById(value));
        navigation.replace('BottomTabs');
      } else {
        navigation.replace("Boarding");
      }
      // console.log(value);

    });

    setTimeout(() => { }, 3000);
  }

  return (

    <View style={styles.container}>


      <View style={styles.subcontainer}>

        <Image style={{ flex: 1, resizeMode: 'cover', width: undefined, height: undefined }} source={require('../../assets/logoaa.jpg')} />

      </View>
      <Text style={styles.destination}>Destination Of Dreams</Text>
      <View style={styles.logoimage}>
        <Image style={{ width: '100%', height: '100%' }} source={require('../../assets/make.png')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoimage: {
    width: wp('40%'),
    height: hp('10%'),
    position: "absolute",
    bottom: 0,
    marginBottom: 10
  },
  subcontainer: {
    width: wp('80%'),
    height: hp('22.5%')
  },
  destination: {
    fontSize: 20,
    marginTop: hp('1%'),
    fontWeight: 'bold'
  }
});

export default Splash;
