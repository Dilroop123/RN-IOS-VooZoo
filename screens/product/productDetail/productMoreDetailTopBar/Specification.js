import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Image, View, Dimensions, Text, StatusBar, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import color from '../../../../style/color'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import HTML from 'react-native-render-html';
import { WebView } from 'react-native-webview';

import { IGNORED_TAGS, alterNode, makeTableRenderer } from '@native-html/table-plugin';

const Specification = React.memo(({ navigation, route, }) => {


    const productdata = useSelector(state => state.product.productId);
    // console.log(productdata.specifications);

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


            <HTML containerStyle={{ marginTop: hp('4%'), marginHorizontal: wp('4%') }} html={productdata.specifications} {...htmlConfig} imagesMaxWidth={Dimensions.get('window').width} />


        </ScrollView>
    );
});

const styles = StyleSheet.create({
    container: {

    }
});

export default React.memo(Specification);

