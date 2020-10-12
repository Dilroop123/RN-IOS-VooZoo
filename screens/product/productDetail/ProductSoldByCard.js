import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Image, Button, View, Text, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import color from '../../../style/color';

import { Card, ListItem, Badge, withBadge } from 'react-native-elements';




const ProductSoldByCard = ({ suplierName }) => {

    return (

        <View>

            <Card containerStyle={styles.cardContainer}>

                <View style={styles.viewContaner}>
                    <Text>SOLD BY</Text>

                </View>
                <View style={{ marginTop: hp('2%'), paddingLeft: 20 }}>
                    <Text>{suplierName}</Text>
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
        paddingBottom: hp('8%'),
        marginTop: hp('1.3%')
    },
    viewContaner: {
        backgroundColor: color.gray,
        height: hp('5%'),
        paddingLeft: 20,
        justifyContent: 'center'
    }

});

export default React.memo(ProductSoldByCard);
