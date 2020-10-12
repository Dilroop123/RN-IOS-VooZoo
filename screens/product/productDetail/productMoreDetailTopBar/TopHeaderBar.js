import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Image, View, Text, StatusBar, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import color from '../../../../style/color'
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import baseUrl from '../../../../constants/baseUrl';



const TopHeaderBar = React.memo(({ navigation, route, }) => {


    const productdata = useSelector(state => state.product.productId);


    return (

        <View style={{ flexDirection: 'row', marginVertical: 10, paddingHorizontal: wp('6%'), paddingVertical: 10, backgroundColor: '#fff' }}>
            <View style={{ height: hp('9.5%'), width: wp('15.5%') }}>

                <Image style={styles.imagestyle} resizeMethod='resize' source={{ uri: baseUrl.url + 'api/download?privateUrl=' + productdata.productimages[0].privateUrl }} />

            </View>
            <View style={{ marginLeft: wp('5%'), marginTop: hp('2%') }}>
                <Text style={{ fontSize: 16 }}>{productdata.title}</Text>

            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    imagestyle: {
        width: undefined,
        height: undefined,
        aspectRatio: 1
    }
});

export default React.memo(TopHeaderBar);

