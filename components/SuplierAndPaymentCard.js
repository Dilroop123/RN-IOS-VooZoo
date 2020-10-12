

import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableWithoutFeedback, View, Text } from 'react-native';
import color from '../style/color';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Card, ListItem } from 'react-native-elements';


const SuplierAndPayment = ({ SuplierNameCart, placedDate }) => {

    return (
        <View>


            <Card containerStyle={{ marginHorizontal: wp('0%'), width: wp('100%'), padding: 0, paddingBottom: hp('1.5%'), marginTop: hp('1.3%') }}>


                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: hp('1%'), paddingHorizontal: 20 }}>
                    <Text>Supplier</Text>
                    <Text>{SuplierNameCart}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: hp('1%'), paddingHorizontal: 20 }}>
                    <Text>Payment Method</Text>

                    <Text>COD</Text>
                </View>
                {placedDate ?

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: hp('1%'), paddingHorizontal: 20 }}>
                        <Text>Placed on</Text>

                        <Text>{placedDate}</Text>
                    </View>
                    : null}

            </Card>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: hp('7%')

    },
    customButton: {
        backgroundColor: color.blue,
        alignItems: 'center',
        paddingVertical: hp('2.2%'),
        width: '100%',
        position: 'absolute',
        bottom: 0

    },
    textinput: {
        height: 30,
        width: wp('30%')
    },
    inputstyle: {
        height: 22
    }
});

export default SuplierAndPayment;
