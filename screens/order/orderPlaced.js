

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
import { HeaderBackButton } from "@react-navigation/stack";

const OrderPlaced = ({ navigation }) => {
    const userdata = useSelector(state => state.user.UserData);
    const orderData = useSelector(state => state.order.OrderData);

    const [online, setOnline] = useState(false);
    const [cashOnDelivery, setCashOnDelibery] = useState(false);
    const [marginPrice, setMarginPrice] = useState();
    const [suplierName, setSuplierNameCart] = useState();
    const dispatch = useDispatch();

    for (var key in orderData.cartData) {

        if (suplierName == '' || suplierName == null || suplierName == undefined) {
            setSuplierNameCart(orderData.cartData[0].suplierName);
        }


    }

    const moveBack = () => {
        navigation.replace('BottomTabs');

    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <HeaderBackButton onPress={() => moveBack()} />

                </View>
            )

        });
    }, [navigation]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(CartACtion.fetchCart(userdata.userData._id))
        });


    }, [dispatch]);

    // const navigatetoscreen = () => {
    //     navigation.navigate('Address', { showProceedButton: true })
    // }
    const naviagetoReviews = (ratingvalue, productitem) => {
        navigation.navigate('AddReview', { rating: ratingvalue, productdata: productitem })

    }

    return (
        <View>
            <ScrollView alwaysBounceVertical={true}
                showsVerticalScrollIndicator={false}


            >
                <View style={styles.container}>

                    <Card containerStyle={{ marginHorizontal: wp('0%'), width: wp('100%'), padding: 0, paddingBottom: hp('1.5%'), marginTop: hp('1.3%') }}>

                        <View style={{ justifyContent: 'space-between', marginTop: hp('1%'), alignItems: 'center' }}>
                            <Icon name="md-checkmark-circle" size={45} color='green' />
                            <Text style={{ fontSize: 17, fontWeight: 'bold', marginTop: hp('1%') }}>Your order is successful with</Text>
                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}> ID #{orderData._id}</Text>

                        </View>
                        <View style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: hp('1%'), paddingHorizontal: 20 }}>
                            <Text style={{ fontSize: 14, marginTop: hp('1%') }}>Estimated Delivery by</Text>
                            <Text style={{ fontSize: 16, marginTop: hp('1%'), color: color.blue }}>Wednesday,19th Aug</Text>

                        </View>


                    </Card>



                    <OrderProductCharges pink={false} orderFinal={orderData.OrderTotal} FinalCustomerPrice={orderData.FinalCustomerPrice} showMargin={orderData.MerchantMargin} />


                    <SuplierAndPayment SuplierNameCart={suplierName} />
                    <OrderItemList naviagetoReviews={naviagetoReviews} cartData={orderData.cartData} />

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

});

export default OrderPlaced;
