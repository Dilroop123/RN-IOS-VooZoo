import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Image, Button, View, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import color from '../../../style/color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconic from 'react-native-vector-icons/Ionicons';

import { Card, ListItem, Badge, withBadge } from 'react-native-elements';



const ProductIconCard = ({ navigation, route }) => {


    return (
        <View>

            <Card containerStyle={styles.cardContainer}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={styles.iconContainer}>
                        <Icon name="cash-multiple" size={50} color={color.blue} />
                        <Text style={styles.iconText}>Free cash {"\n"} on Delivery </Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <Icon name="cog-counterclockwise" size={50} color={color.blue} />
                        <Text style={styles.iconText}>7 Days Easy {"\n"} Returns</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <Icon name="truck-fast" size={50} color={color.blue} />
                        <Text style={styles.iconText}>Direct Delivery {"\n"}To Customers </Text>
                    </View>

                </View>
                <View style={{ marginTop: hp('2%') }}>
                    <Text style={{ color: color.blue, textAlign: 'center', fontSize: 11 }}>Know More</Text>
                </View>

            </Card>

        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    customButton: {

        paddingVertical: 0,
        width: '100%',

        position: 'absolute',
        bottom: 0
    },
    iconContainer: {
        alignItems: 'center'
    },
    iconText: {
        marginTop: hp('3%')
    },
    cardContainer: {
        marginHorizontal: wp('0%'),
        width: wp('100%'),
        padding: 0,
        paddingBottom: hp('1%'),
        marginTop: hp('1.3%')
    }
});

export default React.memo(ProductIconCard);
