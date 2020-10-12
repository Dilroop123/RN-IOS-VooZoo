

import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableWithoutFeedback, View, Text } from 'react-native';
import color from '../../style/color';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Card, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

const CartPaymentCard = ({ online, cashOnDelivery, handleOnline, handleCashOnDelivery }) => {


    return (
        <View>

            <Card containerStyle={styles.cardContainer}>

                <TouchableWithoutFeedback onPress={() => handleOnline()}>
                    <View style={styles.iconOnline}>
                        {online ? <Icon name="radio-button-on" size={15} color={color.blue} /> : <Icon name="radio-button-off" size={15} color={color.blue} />}

                        <Text style={styles.textMargin}>Online
                    </Text>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{ borderBottomColor: color.gray, borderBottomWidth: 0.5 }} />
                <TouchableWithoutFeedback onPress={() => handleCashOnDelivery()}>
                    <View style={styles.iconCash}>
                        {cashOnDelivery ? <Icon name="radio-button-on" size={15} color={color.blue} /> : <Icon name="radio-button-off" size={15} color={color.blue} />}

                        <Text style={styles.textMargin}>Cash On Delivery</Text>
                    </View>
                </TouchableWithoutFeedback>
            </Card>

        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: wp('0%'),
        width: wp('100%'),
        padding: 0,
        paddingBottom: hp('1.5%'),
        marginTop: hp('1.3%')
    },
    iconOnline: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: hp('2%'),
        paddingLeft: 20

    },
    iconCash: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp('2%'),
        paddingLeft: 20
    },
    textMargin: {
        marginLeft: wp('2%')
    }

});

export default React.memo(CartPaymentCard);
