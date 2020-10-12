

import React, { useEffect } from 'react';
import {

  StyleSheet,
  View,
  Image,
  Text,
  TouchableWithoutFeedback
} from 'react-native';

import color from '../../style/color';
import ProfileBar from './ProfileBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const AccountListItem = ({ naviagteToScreen, naviagteToAddress }) => {



  return (
    <View style={{ flexDirection: 'column', marginTop: 8 }}>
      <View style={styles.listContainer}>

        <MaterialCommunityIcons name="home" color="black" size={22} />

        <Text style={styles.textStyle}>My Bank Details</Text>
      </View>
      <View style={{ borderBottomColor: color.gray, borderBottomWidth: 1 }} />

      <TouchableWithoutFeedback onPress={() => naviagteToAddress()}>
        <View style={styles.listContainer}>

          <MaterialCommunityIcons name="home" color="black" size={22} />

          <Text style={styles.textStyle}>My Address</Text>
        </View>
      </TouchableWithoutFeedback>
      <View style={{ borderBottomColor: color.gray, borderBottomWidth: 1 }} />

      <View style={styles.listContainer}>

        <MaterialCommunityIcons name="share-variant" color="black" size={22} />

        <Text style={styles.textStyle}>My Shared Catalogs</Text>
      </View>
      <View style={{ borderBottomColor: color.gray, borderBottomWidth: 1 }} />

      <View style={styles.listContainer}>

        <MaterialCommunityIcons name="card-account-details" color="black" size={22} />

        <Text style={styles.textStyle}>My Payments</Text>
      </View>
      <View style={{ borderBottomColor: color.gray, borderBottomWidth: 1 }} />

      <View style={styles.listContainer}>

        <MaterialCommunityIcons name="comment-edit" color="black" size={22} />

        <Text style={styles.textStyle}>Enter Referal Code</Text>
      </View>
      <View style={{ borderBottomColor: color.gray, borderBottomWidth: 1 }} />

      <View style={styles.listContainer}>

        <MaterialCommunityIcons name="contacts" color="black" size={22} />

        <Text style={styles.textStyle}>Refer & Earn</Text>
      </View>
      <View style={{ borderBottomColor: color.gray, borderBottomWidth: 1 }} />


    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {

    paddingVertical: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15
  },
  textStyle: {
    marginLeft: 20,

  }
});

export default AccountListItem;
