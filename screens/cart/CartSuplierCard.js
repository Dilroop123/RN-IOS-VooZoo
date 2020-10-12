

import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, ScrollView, TouchableWithoutFeedback, View, Text } from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Card, ListItem } from 'react-native-elements';



const CartSuplierCard = ({ SuplierNameCart, orderFinal }) => {


    return (

        <View style={styles.container}>


            <Card containerStyle={styles.cardContainer}>

                {orderFinal != 0 ? <View style={styles.viewContainer}>


                    <Text>Supplier</Text>
                    <Text> {SuplierNameCart}</Text>
                </View> : null}


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
        paddingVertical: hp('1%'),
        paddingHorizontal: 20
    }

});

const areEqual = (prevProps, nextProps) => {


    return prevProps.orderFinal === nextProps.orderFinal

}

export default React.memo(CartSuplierCard, areEqual);


