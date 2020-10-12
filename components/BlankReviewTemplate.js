

import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, FlatList, Image, Button, View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import color from '../style/color';

import { Card, Badge, withBadge } from 'react-native-elements';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';




const BlankReviewTemplate = ({ navigation, route }) => {




    return (


        <View style={styles.container}>


            <Card containerStyle={styles.cardContainer}>

                <View style={styles.viewContaner}>
                    <Text>CATALOG REVIEWS</Text>

                </View>

                <View style={{ marginVertical: hp('2%'), alignItems: 'center' }}>
                    <Text> No REVIEWS ARE ADDED ON THIS PRODUCT</Text>
                </View>

            </Card>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }, cardContainer: {
        marginHorizontal: wp('0%'),
        width: wp('100%'),
        padding: 0,
        paddingBottom: hp('0.5%'),
        marginTop: hp('1.3%')
    },
    viewContaner: {
        backgroundColor: color.gray,
        height: hp('5%'),
        paddingLeft: 20,
        justifyContent: 'center',

    },
});



export default React.memo(BlankReviewTemplate)

