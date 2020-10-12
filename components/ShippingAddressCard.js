

import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableWithoutFeedback, View, Text } from 'react-native';
import color from '../style/color';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


import { Card, ListItem } from 'react-native-elements';


const ShippingAddressCard = ({ cardHeading, addressdata }) => {

    return (
        <View>

            <Card containerStyle={styles.cardContainer}>



                <View style={{ marginTop: hp('1%'), paddingHorizontal: 20 }}>

                    <Text>{cardHeading} </Text>
                </View>
                <View style={{ marginTop: hp('2%'), paddingHorizontal: 20 }}>
                    <Text>{addressdata.CustomerName}</Text>
                    <Text>{`${addressdata.HouseNumber} ${addressdata.Street} , ${addressdata.City} , ${addressdata.State} , ${addressdata.PinCode}`}</Text>

                    <Text>{addressdata.PhoneNumber}</Text>
                </View>
            </Card>


        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: wp('0%'),
        width: wp('100%'),
        padding: 0,
        paddingBottom: hp('3%'),
        marginTop: hp('1.3%')

    },

});

export default ShippingAddressCard;
