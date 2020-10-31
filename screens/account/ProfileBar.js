

import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import color from '../../style/color';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
const ProfileBar = ({ navigation, naviagteToScreen }) => {
  const userdata = useSelector(state => state.user.UserData);


  return (
    <View>
      <View style={styles.container}>
        <View style={{ height: hp('8%'), width: wp('14.2%') }}>
          <Image style={{ height: '100%', width: '100%' }} source={require('../../assets/person.png')} />
          <View>

          </View>

        </View>
        <View style={{ flexDirection: 'column', marginLeft: wp('10%') }}>
          {userdata.userData.fullName != '' ?
            <Text style={{ color: color.blue, fontWeight: 'bold', fontSize: 16 }}>{userdata.userData.fullName}</Text>
            :
            <Text style={{ color: color.blue, fontWeight: 'bold', fontSize: 16 }}>VooZoo</Text>
          }

          <Text>{userdata.userData.mobile}</Text>

        </View>
      </View>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => naviagteToScreen('EditProfile')}>
          <View style={{ flexDirection: 'row', width: wp('80%'), marginLeft: wp('10%'), alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ color: color.blue, fontWeight: 'bold', fontSize: 16 }}>Complete your Profile Now </Text>
            <Icon name="chevron-right" size={24} color={color.blue} />

          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    paddingVertical: hp('1%'),
    backgroundColor: '#fff',
    marginTop: hp('1.3%'),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: wp('3%')
  }
});

export default ProfileBar;
