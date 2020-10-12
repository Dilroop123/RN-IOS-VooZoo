

import React, { useEffect, useLayoutEffect } from 'react';
import {

  StyleSheet,
  View,
  Text
} from 'react-native';

import color from '../../style/color';
import ProfileBar from './ProfileBar';
import AccountListItem from './AccountListItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Account = ({ navigation }) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (

        <MaterialCommunityIcons

          name='cart'
          type='font-awesome'
          size={23}
          color='black'
          style={{ marginRight: 30 }}
          onPress={() => console.log('in icon handler')} />

      )

    });
  }, [navigation]);


  const naviagteToScreen = (screen) => {
    navigation.navigate(screen);
  }
  const naviagteToAddress = (screen) => {
    navigation.navigate('Address', { showProceedButton: false, showMargin: 'show', orderFinal: 'show', SuplierNameCart: 'show' })
  }


  return (

    <View style={styles.container}>
      <ProfileBar naviagteToScreen={naviagteToScreen} />
      <AccountListItem naviagteToAddress={naviagteToAddress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1

  }
});

export default Account;
