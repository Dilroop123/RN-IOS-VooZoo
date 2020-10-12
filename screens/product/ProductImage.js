

import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, FlatList, Image, Button, View, Text, TouchableWithoutFeedback } from 'react-native';

import baseUrl from '../../constants/baseUrl';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const ProductImage = ({ item }) => {


    return (
        <View style={styles.container}>


            <View style={{ height: hp('32.5%'), alignItems: 'center' }}>
                <View style={{ width: wp('100%'), height: hp('32.5%') }}>
                    <Image resizeMethod='resize' style={{ flex: 1, resizeMode: 'contain' }} source={{ uri: baseUrl.url + 'api/download?privateUrl=' + item.productimages[0].privateUrl }} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    }
});



export default React.memo(ProductImage)

