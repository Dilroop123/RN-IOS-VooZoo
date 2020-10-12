

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import color from '../../style/color';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Input } from 'react-native-elements';
import { Card } from 'react-native-elements';

import AntDesign from 'react-native-vector-icons/AntDesign';
import OrderTotalCard from './OrderTotalCard';


const EnterMargin = ({ showMargin, calculateMargin, marginPrice, orderFinal }) => {



    return (
        <View>

            <Card containerStyle={styles.cardContainer}>

                <View style={styles.inputContainer}>
                    <Text style={styles.TextCash}>Cash To Collect From Customer</Text>
                    <View style={{ flexDirection: 'row' }}>

                        <Input value={marginPrice}
                            keyboardType='decimal-pad'
                            inputContainerStyle={styles.inputstyle}
                            containerStyle={styles.textinput}
                            onChangeText={value => calculateMargin(value)}
                        />
                    </View>

                </View>
                <View style={{ paddingHorizontal: 20 }}>


                    <Text style={{ color: 'gray', fontSize: 12 }}>(including your Margin)</Text>

                </View>
                <View style={{ paddingHorizontal: 20 }}>


                    <Text style={{ color: 'red', fontSize: 12 }}>Please enter an amount greater than or equal to the Order Total    ₹ ({orderFinal})</Text>

                </View>
                <View style={styles.marginContiner}>


                    <Text style={{ color: 'green' }}>Margin you Earn</Text>
                    <Text style={{ color: 'green' }}>₹ {showMargin}</Text>
                </View>

                <View style={styles.borderContainer} />

                <View style={styles.footerContainer}>
                    <AntDesign name="exclamationcircle" size={16} style={{ marginRight: wp('2%') }} color='gray' />

                    <Text>This amount is required for creating customer invoice and taxation purposes,as mandated by Govt. of India</Text>
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
        paddingBottom: hp('1.5%'),
        marginTop: hp('1.3%')

    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: hp('1%'),
        paddingHorizontal: 20
    },
    TextCash: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: hp('1%')
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
    },
    marginContiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp('2%'),
        paddingHorizontal: 20
    },
    footerContainer: {
        flexDirection: 'row',
        marginTop: hp('2%'),
        paddingHorizontal: wp('5%')
    },
    borderContainer: {
        borderBottomColor: color.gray,
        borderBottomWidth: 1,
        marginTop: hp('1%')
    }
});

export default EnterMargin;
