

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import color from '../style/color';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Card } from 'react-native-elements';


const CartProductCharges = ({ orderFinal }) => {


    return (
        <View>

            <Card containerStyle={styles.cardContainer}>

                <View style={styles.viewContainer}>


                    <Text>Product Charges</Text>
                    <Text>₹ {orderFinal}</Text>
                </View>



                <View style={styles.viewContainer}>
                    <Text>Shipping Charges</Text>

                    <Text>₹ 0</Text>
                </View>
                {/*<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: hp('1%'), paddingHorizontal: 20 }}>
    <Text>COD Charges</Text>
                               
    <Text>278</Text>
   </View>*/}
                <View style={styles.orderContainer}>
                    <Text style={styles.orderText}>Order Total</Text>

                    <Text style={styles.orderText}>₹ {orderFinal}</Text>
                </View>
            </Card>

        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: wp('0%'),
        width: wp('100%'),
        padding: 0,
        paddingBottom: hp('1.5%'),
        marginTop: hp('1.3%')
    },
    viewContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp('1%'),
        paddingHorizontal: 20
    },
    orderContainer: {
        flexDirection: 'row',
        backgroundColor: '#f9eef3',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp('2%'),
        paddingVertical: hp('1%'),
        paddingHorizontal: 20
    },
    orderText: {
        color: color.blue,
        fontWeight: 'bold'
    }

});

const areEqual = (prevProps, nextProps) => {


    return prevProps.orderFinal === nextProps.orderFinal

}

export default React.memo(CartProductCharges, areEqual);
