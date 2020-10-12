import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Image, Button, View, Text, StatusBar, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import color from '../../../style/color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card, ListItem, Badge, withBadge } from 'react-native-elements';
import HTML from 'react-native-render-html';
import { WebView } from 'react-native-webview';
import { IGNORED_TAGS, alterNode, makeTableRenderer } from '@native-html/table-plugin';


const ProductDetailCard = ({ navigateToMoreDetails, description }) => {

    const renderers = {
        table: makeTableRenderer({ WebView })
    };


    const htmlConfig = {
        alterNode,
        renderers,
        ignoredTags: IGNORED_TAGS
    };
    return (

        <View style={styles.container}>

            <Card containerStyle={styles.cardContainer}>
                <View style={styles.viewContaner}>
                    <Text>PRODUCT DETAILS</Text>

                </View>
                <View style={{ paddingLeft: wp('2%'), marginRight: wp('2%') }}>

                    <HTML containerStyle={{ marginTop: hp('4%') }} {...htmlConfig} html={description} imagesMaxWidth={Dimensions.get('window').width} />


                </View>
                <TouchableWithoutFeedback onPress={() => navigateToMoreDetails()}>

                    <View style={{ flexDirection: 'row', borderTopWidth: 1, borderColor: color.gray, marginHorizontal: 10, justifyContent: 'space-between', alignItems: 'center', paddingVertical: hp('1%') }}>
                        <Text style={{ color: color.blue }}>All Details</Text>
                        <Icon name="arrow-right" size={20} color={color.blue} />
                    </View>
                </TouchableWithoutFeedback>
            </Card>

        </View>


    );
};

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: wp('0%'),
        width: wp('100%'),
        padding: 0,
        marginTop: hp('1.3%')
    },
    viewContaner: {
        backgroundColor: color.gray,
        height: hp('5%'),
        paddingLeft: 20,
        justifyContent: 'center'
    }

});

export default React.memo(ProductDetailCard);
