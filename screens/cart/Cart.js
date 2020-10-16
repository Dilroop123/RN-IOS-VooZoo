

import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, ScrollView, TouchableWithoutFeedback, View, Text } from 'react-native';
import color from '../../style/color';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector, useDispatch } from 'react-redux';
import * as CartACtion from '../../store/actions/CartAction';
import { HeaderBackButton } from "@react-navigation/stack";
import { Card, ListItem } from 'react-native-elements';
import CartList from './cartList';
import Icon from 'react-native-vector-icons/Ionicons';
import CartPaymentCard from './CartPaymentCard';
import CartProductCharges from '../../components/CartProductCharges';
import CartSuplierCard from './CartSuplierCard';
import EmptyState from '../../components/EmptyState';

const Cart = ({ navigation }) => {

    const userdata = useSelector(state => state.user.UserData);
    const cartData = useSelector(state => state.cart.CartData);
    const batchicon = useSelector(state => state.cart.BatchIcon);



    var orderTotal = 0;
    const [online, setOnline] = useState(false);
    const [SuplierNameCart, setSuplierNameCart] = useState();
    const [orderFinal, setOrderFinal] = useState(0);
    const [cashOnDelivery, setCashOnDelibery] = useState(false);
    const dispatch = useDispatch();


    for (var key in cartData) {

        orderTotal = orderTotal + (cartData[key].ProductPrice * cartData[key].Quantity);

        if (SuplierNameCart == '' || SuplierNameCart == null || SuplierNameCart == undefined) {
            setSuplierNameCart(cartData[0].suplierName);
        }


        if (orderFinal == 0) {

            setOrderFinal(orderTotal);
        }
    }
    // }, [orderFinal, SuplierNameCart]);


    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <HeaderBackButton onPress={() => moveBack()} />

                </View>
            ),

        });
    }, [navigation]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

            dispatch(CartACtion.fetchCart(userdata.userData._id))
        });


    }, [dispatch]);



    const moveBack = () => {
        dispatch(CartACtion.clearReduxCart());
        navigation.pop();
    }


    const handleOnline = useCallback(
        () => {
            setOnline(true);
            setCashOnDelibery(false);
        }, []);

    const handleCashOnDelivery = useCallback(
        () => {
            setOnline(false);
            setCashOnDelibery(true);
        }, []);

    const ReCalculateTotalvalue =
        useCallback(
            (itemPrice) => {

                var lastOrdefinal = orderFinal;
                lastOrdefinal = lastOrdefinal - itemPrice;
                setOrderFinal(lastOrdefinal);
            }
            , [orderFinal]);

    const addQuantityOrderTotal =
        useCallback(
            (itemPrice) => {

                var Ordefinal = orderFinal;
                Ordefinal = Ordefinal + itemPrice;
                setOrderFinal(Ordefinal);
            }
            , [orderFinal]);

    const substarctQuantityOrderTotal =
        useCallback(
            (itemPrice) => {

                var Ordefinallast = orderFinal;
                Ordefinallast = Ordefinallast - itemPrice;
                setOrderFinal(Ordefinallast);
            }
            , [orderFinal]);

    return (
        <View style={{ flex: 1 }}>

            {batchicon == 0 ?

                <EmptyState
                    showIcon
                    iconName='cart-remove'

                    title="Your Cart is Empty"
                    message="Looks like you haven't added anything to your cart yet"
                />
                :
                <ScrollView alwaysBounceVertical={true}
                    showsVerticalScrollIndicator={false}


                >
                    <View style={styles.container}>
                        <View style={styles.paymentContainer}>
                            <Text>SELECT PAYMENT METHOD</Text>
                        </View>

                        <CartPaymentCard online={online} cashOnDelivery={cashOnDelivery} handleOnline={handleOnline} handleCashOnDelivery={handleCashOnDelivery} />
                        <CartProductCharges orderFinal={orderFinal} />



                        <CartSuplierCard SuplierNameCart={SuplierNameCart} orderFinal={orderFinal} />
                        <CartList cartData={cartData} ReCalculateTotalvalue={ReCalculateTotalvalue} addQuantityOrderTotal={addQuantityOrderTotal} substarctQuantityOrderTotal={substarctQuantityOrderTotal} />

                    </View>

                </ScrollView>
            }




            {((cashOnDelivery || online) && batchicon > 0) ?
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Margin', { orderFinal, SuplierNameCart })}>
                    <View style={styles.customButton}>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>PROCEED</Text>
                    </View>
                </TouchableWithoutFeedback>
                : null}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: hp('7%')

    },
    paymentContainer: {
        justifyContent: 'center',
        paddingLeft: 20,
        marginVertical: hp('1%'),
        marginTop: hp('1.5%')
    },
    customButton: {
        backgroundColor: color.blue,
        alignItems: 'center',
        paddingVertical: hp('2.2%'),
        width: '100%',
        position: 'absolute',
        bottom: 0
    }
});

export default Cart;
