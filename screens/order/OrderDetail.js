

import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableWithoutFeedback, View, Text } from 'react-native';
import color from '../../style/color';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector, useDispatch } from 'react-redux';
import * as CartACtion from '../../store/actions/CartAction';
import { Input } from 'react-native-elements';
import OrderItemList from './orderItemList';
import { Card, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import OrderProductCharges from '../../components/OrderProductCharges';
import SuplierAndPayment from '../../components/SuplierAndPaymentCard';
import ShippingAddressCard from '../../components/ShippingAddressCard';

const OrderDetail = ({ navigation, route }) => {
    const userdata = useSelector(state => state.user.UserData);

    const { item } = route.params;

    const naviagetoReviews = (ratingvalue, productitem) => {
        navigation.navigate('AddReview', { rating: ratingvalue, productdata: productitem })

    }

    return (
        <View>
            <ScrollView alwaysBounceVertical={true}
                showsVerticalScrollIndicator={false}


            >
                <View style={styles.container}>

                    <OrderProductCharges pink={true} orderFinal={item.OrderTotal} itemNumber={item.cartData.length} FinalCustomerPrice={item.FinalCustomerPrice} orderId={'23454'} />

                    <OrderItemList naviagetoReviews={naviagetoReviews} cartData={item.cartData} />


                    <SuplierAndPayment SuplierNameCart={item.cartData[0].suplierName} placedDate={item.createdAt.substring(0, 10)} />



                    <ShippingAddressCard cardHeading={'Customer Details'} addressdata={item.addressId} />

                    <Card containerStyle={{ marginHorizontal: wp('0%'), width: wp('100%'), padding: 0, paddingBottom: hp('3%'), marginTop: hp('1.3%') }}>



                        <View style={{ marginTop: hp('1%'), paddingHorizontal: 20 }}>

                            <Text>Sender Information</Text>
                        </View>
                        <View style={{ marginTop: hp('2%'), paddingHorizontal: 20 }}>
                            <Text style={styles.textStyle}>{userdata.userData.fullName}</Text>
                            <Text style={styles.textStyle}>{userdata.userData.mobile}</Text>

                        </View>
                    </Card>

                </View>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: hp('7%')

    },
    textStyle: {
        fontSize: 13,
        marginTop: hp('1%')
    }
});

export default OrderDetail;
