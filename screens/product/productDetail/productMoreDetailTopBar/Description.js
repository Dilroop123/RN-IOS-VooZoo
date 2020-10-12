import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Image, Dimensions, View, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector, useDispatch } from 'react-redux';
import HTML from 'react-native-render-html';

import { WebView } from 'react-native-webview';

import { IGNORED_TAGS, alterNode, makeTableRenderer } from '@native-html/table-plugin';

const Description = (props) => {

    const productdata = useSelector(state => state.product.productId);
    const renderers = {
        table: makeTableRenderer({ WebView })
    };


    const htmlConfig = {
        alterNode,
        renderers,
        ignoredTags: IGNORED_TAGS
    };

    return (


        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>


            <HTML containerStyle={{ marginTop: hp('4%'), marginHorizontal: wp('4%') }} html={productdata.description} {...htmlConfig} imagesMaxWidth={Dimensions.get('window').width} />


        </ScrollView>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default Description;

