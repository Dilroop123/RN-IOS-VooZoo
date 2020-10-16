

import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, ImageBackground, Alert, FlatList, TouchableWithoutFeedback, Image, View, Text } from 'react-native';
import color from '../../style/color';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SmsRetriever from 'react-native-sms-retriever';
import baseUrl from '../../constants/baseUrl';
import { useSelector, useDispatch } from 'react-redux';
import * as OrderAction from '../../store/actions/OrderAction';
import { Card, ListItem } from 'react-native-elements';
import MatericalIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/Ionicons';


const MyOrders = ({ navigation }) => {


    const userdata = useSelector(state => state.user.UserData);
    const orderData = useSelector(state => state.order.OrderList);

    const dispatch = useDispatch();


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(OrderAction.fetchOrder(userdata.userData._id))
        });


    }, [dispatch]);



    const renderItems = useCallback(
        ({ item }) => (

            <Card containerStyle={{ marginHorizontal: wp('0%'), width: wp('100%'), padding: 0, marginTop: hp('1%') }}>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ height: hp('15%'), width: wp('32%'), borderWidth: 0.5, borderColor: '#000' }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text>#20187676</Text>
                        </View>
                        <Image style={{ flex: 1, width: undefined, height: undefined, resizeMode: 'cover' }} source={{ uri: baseUrl.url + 'api/download?privateUrl=' + item.cartData[0].productId.productimages[0].privateUrl }} />

                    </View>
                    <View style={{ flexDirection: 'column', width: wp('68%'), paddingHorizontal: ('2%'), marginTop: hp('1%') }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ width: 150 }}>{item.cartData[0].productId.title}</Text>

                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: hp('1%') }}>
                            <Text style={{ fontSize: 13, color: 'gray' }}>₹ {`${item.FinalCustomerPrice} ${item.cartData[0].suplierName}`} </Text>

                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: hp('1%') }}>
                            <Text style={{ fontSize: 13, color: 'gray' }}>{item.createdAt.substring(0, 10)}</Text>

                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: hp('1%'), marginHorizontal: 10 }}>
                            <TouchableWithoutFeedback onPress={() => navigation.navigate('OrderDetail', { item })}>
                                <Text style={{ fontSize: 13, color: color.blue }}>View Details</Text>
                            </TouchableWithoutFeedback>

                        </View>


                    </View>
                </View>
            </Card>

        ), []);


    return (

        <View style={styles.container}>
            <FlatList
                data={orderData}
                keyExtractor={item => item.id}
                renderItem={renderItems}
                contentContainerStyle={styles.productList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1

    }
});


const areEqual = (prevProps, nextProps) => {
    // return false prevProps.text & nextProps.text are not equal.
    return prevProps.orderData === nextProps.orderData
    // else all are equal, no re-render
    return true
}

export default React.memo(MyOrders, areEqual)