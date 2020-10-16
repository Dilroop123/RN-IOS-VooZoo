

import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableWithoutFeedback, View, Text } from 'react-native';
import color from '../../style/color';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector, useDispatch } from 'react-redux';
import * as CartACtion from '../../store/actions/CartAction';
import * as AddressAction from '../../store/actions/AddressAction';
import * as OrderAction from '../../store/actions/OrderAction';
import { Input } from 'react-native-elements';
import CartList from '../margin/cartList';
import { Card, ListItem } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import OrderProductCharges from '../../components/OrderProductCharges';
import SuplierAndPayment from '../../components/SuplierAndPaymentCard';
import ShippingAddressCard from '../../components/ShippingAddressCard';

const OrderSummary = ({ navigation, route }) => {
    const userdata = useSelector(state => state.user.UserData);
    const cartData = useSelector(state => state.cart.CartData);
    const addressdata = useSelector(state => state.address.PrimaryData);


    const { showMargin } = route.params;
    const { orderFinal } = route.params;
    const { SuplierNameCart } = route.params;
    const FinalCustomerPrice = showMargin + orderFinal;

    const [online, setOnline] = useState(false);
    const [cashOnDelivery, setCashOnDelibery] = useState(false);
    const [marginPrice, setMarginPrice] = useState();
    const dispatch = useDispatch();


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(CartACtion.fetchCart(userdata.userData._id))
            dispatch(AddressAction.getPrimaryAddress(userdata.userData._id))
        });


    }, [dispatch]);

    const navigatetoscreen = () => {
        navigation.navigate('Address', { showProceedButton: true })
    }
    const palceOrder = () => {
        //CreateOrder = (userId, cartData, addressId, MerchantMargin, orderStatus, PaymentMethod, OrderTotal, FinalCustomerPrice, ShippingPrice)
        dispatch(CartACtion.ClearCart(userdata.userData._id));
        dispatch(OrderAction.CreateOrder(userdata.userData._id, cartData, addressdata._id, showMargin, 'Pending', 'COD', orderFinal, FinalCustomerPrice))
        navigation.navigate('OrderPlaced')
    }

    return (
        <View>
            <ScrollView alwaysBounceVertical={true}
                showsVerticalScrollIndicator={false}


            >
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginVertical: hp('1%'), marginTop: hp('1.5%') }}>
                        <Text>SENDER INFORMATION</Text>
                        <TouchableWithoutFeedback onPress={() => navigation.pop()}>
                            <View style={{ backgroundColor: '#fff', paddingHorizontal: 5, paddingVertical: 5 }}>
                                <Text style={{ color: 'blue' }}>Change</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>




                    <Card containerStyle={{ marginHorizontal: wp('0%'), width: wp('100%'), padding: 0, paddingBottom: hp('1.5%'), marginTop: hp('1.3%') }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('1%'), paddingHorizontal: 20 }}>
                            <Text style={{ fontSize: 13, marginTop: hp('1%') }}>{userdata.userData.fullName}</Text>
                            <Text style={{ fontSize: 13, marginTop: hp('1%') }}>{userdata.userData.mobile}</Text>

                        </View>

                        <View style={{ borderBottomColor: color.gray, borderBottomWidth: 1, marginTop: hp('1%') }} />

                        <View style={{ flexDirection: 'row', marginTop: hp('2%'), paddingHorizontal: wp('5%') }}>
                            <AntDesign name="exclamationcircle" size={16} style={{ marginRight: wp('2%') }} color='gray' />

                            <Text style={{ marginRight: 10 }}>This information will be displayed in the package sent to customer .No mention of VooZoo will be there</Text>
                        </View>

                    </Card>
                    <Card containerStyle={{ marginHorizontal: wp('0%'), width: wp('100%'), padding: 0, paddingBottom: hp('1.5%'), marginTop: hp('1.3%') }}>

                        <View style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: hp('1%'), paddingHorizontal: 20 }}>
                            <Text style={{ fontSize: 14, marginTop: hp('1%') }}>Estimated Delivery by</Text>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: hp('1%'), color: color.blue }}>Wednesday,19th Aug</Text>

                        </View>
                    </Card>



                    <OrderProductCharges pink={true} orderFinal={orderFinal} FinalCustomerPrice={FinalCustomerPrice} showMargin={showMargin} />


                    <SuplierAndPayment SuplierNameCart={SuplierNameCart} />

                    <CartList cartData={cartData} />


                    <ShippingAddressCard cardHeading={'SHIPPING ADDRESS'} addressdata={addressdata} />
                </View>
            </ScrollView>
            <TouchableWithoutFeedback onPress={() => palceOrder()}>
                <View style={styles.customButton}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>PLACE ORDER</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: hp('7%')

    },
    customButton: {
        backgroundColor: color.blue,
        alignItems: 'center',
        paddingVertical: hp('2.2%'),
        width: '100%',
        position: 'absolute',
        bottom: 0

    },
    textinput: {
        height: 30,
        width: wp('30%')
    },
    inputstyle: {
        height: 22
    }
});

export default OrderSummary;
