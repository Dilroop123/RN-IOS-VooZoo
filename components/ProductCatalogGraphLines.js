import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Image, Button, View, Text, TouchableWithoutFeedback } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { ProgressBar, Colors } from 'react-native-paper';



const ProductCatalogGraphLines = ({ title, endValue, color, percentbar }) => {


    return (

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginLeft: wp('3%') }}>
            <Text style={{ fontSize: 12, color: '#acacac', width: wp('15%') }}>{title}</Text>
            <View style={{ flex: 1, marginHorizontal: 10, marginTop: hp('1%') }}>
                <ProgressBar progress={percentbar} color={color} />
            </View>
            <Text style={{ fontSize: 12, color: '#acacac' }}>({endValue})</Text>
        </View>

    );
};

const styles = StyleSheet.create({
    cardContainer: {

    },


});

export default React.memo(ProductCatalogGraphLines);
