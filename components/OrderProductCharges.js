

import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableWithoutFeedback, View, Text } from 'react-native';
import color from '../style/color';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Card, ListItem } from 'react-native-elements';


const OrderProductCharges = ({ pink, orderFinal, FinalCustomerPrice, showMargin, orderId, itemNumber }) => {


    return (
        <View>

            <Card containerStyle={styles.cardContainer}>

                {orderId ?

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: hp('1%'), paddingHorizontal: 20 }}>


                        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Order #2345435</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{itemNumber} item</Text>
                    </View>

                    : null}


                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: hp('1%'), paddingHorizontal: 20 }}>


                    <Text>Product Charges</Text>
                    <Text>₹ {orderFinal}</Text>
                </View>



                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: hp('1%'), paddingHorizontal: 20 }}>
                    <Text>Shipping Charges</Text>

                    <Text>₹ 0</Text>
                </View>

                <View style={{ flexDirection: 'row', backgroundColor: pink ? '#f9eef3' : '#ffffff', justifyContent: 'space-between', alignItems: 'center', marginTop: hp('2%'), paddingVertical: hp('1%'), paddingHorizontal: 20 }}>
                    <Text style={{ color: pink ? color.blue : '#000000', fontWeight: 'bold' }}>Order Total</Text>

                    <Text style={{ color: pink ? color.blue : '#000000', fontWeight: 'bold' }}>₹ {orderFinal}</Text>
                </View>
                <View style={{ flexDirection: 'row', backgroundColor: pink ? '#f9eef3' : '#ffffff', justifyContent: 'space-between', alignItems: 'center', paddingVertical: hp('1%'), paddingHorizontal: 20 }}>
                    <Text style={{ color: pink ? color.blue : '#000000', fontWeight: 'bold' }}>Final Customer Price</Text>

                    <Text style={{ color: pink ? color.blue : '#000000', fontWeight: 'bold' }}>₹ {FinalCustomerPrice}</Text>
                </View>

                {showMargin ?
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: hp('1%'), paddingVertical: hp('1%'), paddingHorizontal: 20 }}>
                        <Text style={{ color: 'green' }}>Margin Earned</Text>

                        <Text style={{ color: 'green' }}>₹ {showMargin}</Text>
                    </View>
                    : null}

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


});

export default OrderProductCharges;
