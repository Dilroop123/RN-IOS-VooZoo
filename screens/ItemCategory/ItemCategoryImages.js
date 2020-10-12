

import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Image, View, Text, Button, FlatList, ImageBackground, ToastAndroid, TouchableWithoutFeedback } from 'react-native';

import Color from 'color';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import baseUrl from '../../constants/baseUrl';

const ItemCategoryImages = React.memo(({ item }) => {




    return (

        <View>

            {item.product.length == 1 ?

                <View style={{ height: hp('45%') }}>

                    <Image style={styles.imageaspectratio} source={{ uri: baseUrl.url + 'api/download?privateUrl=' + item.product[0].productimages[0].privateUrl }} />

                </View>


                : null}

            {item.product.length == 2 ?
                <View style={{ height: hp('45%'), flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>

                        <Image style={styles.imageviewflex} source={{ uri: baseUrl.url + 'api/download?privateUrl=' + item.product[0].productimages[0].privateUrl }} />

                    </View>

                    <View style={{ flex: 1, marginLeft: wp('1%') }}>

                        <Image style={styles.imageviewflex} source={{ uri: baseUrl.url + 'api/download?privateUrl=' + item.product[1].productimages[0].privateUrl }} />

                    </View>


                </View>
                : null}

            {item.product.length == 3 ?
                <View style={{ height: hp('45.5%'), flexDirection: 'row' }}>
                    <View style={{ width: wp('55%'), height: hp('45.5%') }}>

                        <Image style={styles.imageviewflex} source={{ uri: baseUrl.url + 'api/download?privateUrl=' + item.product[0].productimages[0].privateUrl }} />

                    </View>
                    <View style={styles.containerimagetwo}>
                        <View style={styles.viewimagetwo}>

                            <Image style={styles.imageaspectratio} source={{ uri: baseUrl.url + 'api/download?privateUrl=' + item.product[1].productimages[0].privateUrl }} />

                        </View>
                        <View style={styles.viewimagethree}>

                            <Image style={styles.imageaspectratio} source={{ uri: baseUrl.url + 'api/download?privateUrl=' + item.product[2].productimages[0].privateUrl }} />

                        </View>
                    </View>
                </View>
                : null}

            {item.product.length > 3 ?
                <View style={{ height: hp('45.5%'), flexDirection: 'row', backgroundColor: '#fff' }}>
                    <View style={{ width: wp('55%'), height: hp('45.5%') }}>

                        <Image style={styles.imageviewflex} source={{ uri: baseUrl.url + 'api/download?privateUrl=' + item.product[0].productimages[0].privateUrl }} />

                    </View>
                    <View style={styles.containerimagetwo}>
                        <View style={styles.viewimagetwo}>

                            <Image style={styles.imageflexascpect} source={{ uri: baseUrl.url + 'api/download?privateUrl=' + item.product[1].productimages[0].privateUrl }} />

                        </View>
                        <View style={styles.viewimagethree}>



                            <ImageBackground
                                style={styles.card}
                                source={{ uri: baseUrl.url + 'api/download?privateUrl=' + item.product[2].productimages[0].privateUrl }}
                            >
                                <View style={styles.cardOverlay}>
                                    <View>
                                        <Text style={styles.cardTitle}> + {item.product.length - 3}</Text>
                                    </View>
                                </View>
                            </ImageBackground>


                        </View>
                    </View>
                </View>
                : null}


        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp('1.2%')
    },
    cardOverlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        overflow: 'hidden'
    },
    cardTitle: {


        fontSize: 24,
        color: '#fff',

    },
    viewimagetwo: {
        width: wp('55%'),
        height: hp('22.5%')
    },

    viewimagethree: {
        marginTop: hp('0.5%'),
        width: wp('55%'),
        height: hp('22.5%')
    },
    imageflexascpect: {
        flex: 1,
        resizeMode: 'cover',
        width: undefined,
        height: undefined,
        aspectRatio: 1
    },
    containerimagetwo: {
        flexDirection: 'column',
        marginLeft: wp('1%')
    },
    imageviewflex: {
        flex: 1,
        width: undefined,
        height: undefined

    },
    cardcontainer: {
        marginHorizontal: wp('0%'),
        width: wp('100%'),
        padding: 0,
        marginTop: hp('1.3%')
    },
    imageaspectratio: {
        flex: 1,
        width: undefined,
        height: undefined,
        aspectRatio: 1
    }
    ,
    card: {


        resizeMode: 'cover',
        flex: 1,
        width: undefined,
        height: undefined,
        aspectRatio: 1
    }
});



export default React.memo(ItemCategoryImages)

