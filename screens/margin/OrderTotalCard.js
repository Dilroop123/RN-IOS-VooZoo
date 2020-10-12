

import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableWithoutFeedback, Alert, View, Text } from 'react-native';
import color from '../../style/color';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const OrderTotalCard = ({ orderFinal }) => {



    return (


        <View>
            <View style={styles.TextViewcontainer}>
                <Text>SELECT CUSTOMER PRICE</Text>
            </View>
            <View style={styles.subViewContainer}>
                <Text style={styles.textStyle}>Order Total</Text>

                <Text style={{ color: color.blue, fontWeight: 'bold' }}>₹ {orderFinal}</Text>
            </View>


        </View>
    );
};

const styles = StyleSheet.create({
    TextViewcontainer: {
        justifyContent: 'center',
        paddingLeft: 20,
        marginVertical: hp('1%'),
        marginTop: hp('1.5%')

    },
    subViewContainer: {
        flexDirection: 'row',
        backgroundColor: '#f9eef3',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp('1%'),
        paddingVertical: hp('2%'),
        paddingHorizontal: 20
    },
    textStyle: {
        color: color.blue,
        fontWeight: 'bold'
    }
});

export default React.memo(OrderTotalCard);
