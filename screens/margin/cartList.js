

import React, { useState } from 'react';
import { StyleSheet, ImageBackground, Alert, FlatList, TouchableWithoutFeedback, Image, View, Text } from 'react-native';
import color from '../../style/color';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SmsRetriever from 'react-native-sms-retriever';
import baseUrl from '../../constants/baseUrl';
import { useSelector, useDispatch } from 'react-redux';
import * as CartAction from '../../store/actions/CartAction';
import { Card, ListItem } from 'react-native-elements';
import MatericalIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/Ionicons';


const CartList = ({ navigation, cartData }) => {

    const [refreshValue, setRefreshValue] = useState(false);


    const renderItems = ({ item }) => (

        <Card containerStyle={styles.cardContainer}>

            <View style={{ flexDirection: 'row' }}>
                <View style={{ height: hp('25%'), width: wp('32%') }}>
                    <Image style={styles.imageStyle} source={{ uri: baseUrl.url + 'api/download?privateUrl=' + item.productId.productimages[0].privateUrl }} />

                </View>
                <View style={styles.viewContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ width: 150 }}>{item.productId.title}</Text>

                    </View>
                    <View style={styles.subContainer}>
                        <Text>Price</Text>
                        <Text style={styles.textMargin}>₹ {item.ProductPrice}</Text>
                    </View>

                    <View style={styles.subContainer}>
                        <Text>Size</Text>
                        <Text style={styles.textMargin}>{item.size}</Text>
                    </View>

                    <View style={styles.subContainer}>
                        <Text>Quantity</Text>

                        <Text style={styles.textMargin}>{item.Quantity}</Text>


                    </View>
                </View>
            </View>
        </Card>

    )


    return (

        <View style={styles.container}>
            <FlatList
                data={cartData}
                keyExtractor={item => item.id}
                renderItem={renderItems}
                extraData={refreshValue}
                contentContainerStyle={styles.productList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1

    },
    imageStyle: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'cover'
    },
    textMargin: {
        marginHorizontal: wp('4%')
    },
    subContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: hp('3%')

    },
    cardContainer: {
        marginHorizontal: wp('0%'),
        width: wp('100%'),
        padding: 0,
        marginTop: hp('1%')
    },
    viewContainer: {
        flexDirection: 'column',
        width: wp('68%'),
        paddingHorizontal: wp('2%'),
        marginTop: hp('1%')
    }
});

export default React.memo(CartList);
