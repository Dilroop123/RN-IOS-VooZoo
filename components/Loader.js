

import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, FlatList, Image, Button, View, Text, ScrollView, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import color from '../style/color';
import { Dimensions } from 'react-native';


import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Loader = ({ navigation, route, loader }) => {




    return (

        <View style={{ alignItems: 'center', flex: 1, position: 'absolute', top: windowHeight / 3.5, left: windowWidth / 2.5, zIndex: 1 }}>


            {loader ?
                <View style={styles.container}>
                    <ActivityIndicator size="large" color={color.blue} />
                </View>
                : null}



        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: hp('8%'),
        borderRadius: 24,
        width: wp('15%'),
        borderColor: color.lightblack,
        borderWidth: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },

});



export default Loader

