

import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableWithoutFeedback, Alert, View, Text } from 'react-native';
import color from '../../style/color';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector, useDispatch } from 'react-redux';
import * as CartACtion from '../../store/actions/CartAction';
import { Input } from 'react-native-elements';
import { Card, ListItem } from 'react-native-elements';
import CartList from './cartList';
import AntDesign from 'react-native-vector-icons/AntDesign';
import OrderTotalCard from './OrderTotalCard';
import EnterMargin from './EnterMargin';
import CartProductCharges from '../../components/CartProductCharges';


const Margin = ({ navigation, route }) => {
    const userdata = useSelector(state => state.user.UserData);
    const cartData = useSelector(state => state.cart.CartData);
    const { orderFinal } = route.params;
    const { SuplierNameCart } = route.params;
    const [online, setOnline] = useState(false);
    const [cashOnDelivery, setCashOnDelibery] = useState(false);
    const [marginPrice, setMarginPrice] = useState();
    const [showMargin, setShowMargin] = useState();
    const dispatch = useDispatch();


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(CartACtion.fetchCart(userdata.userData._id))
        });


    }, [dispatch]);

    const navigatetoscreen = () => {
        navigation.navigate('Address', { showProceedButton: true, showMargin, orderFinal, SuplierNameCart })
    }
    const calculateMargin = (value) => {
        setMarginPrice(value);
        var marginval = value - orderFinal;

        setShowMargin(marginval)
    }
    const checkMargin = () => {
        if (showMargin == 0 || showMargin > 0) {
            navigatetoscreen();
        }
        else {
            Alert.alert(
                "VooZoo",
                "Please Check you Margin before you proceed",
                [

                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
        }
    }


    return (
        <View>
            <ScrollView alwaysBounceVertical={true}
                showsVerticalScrollIndicator={false}


            >
                <View style={styles.container}>


                    <OrderTotalCard orderFinal={orderFinal} />



                    <EnterMargin orderFinal={orderFinal} showMargin={showMargin} marginPrice={marginPrice} calculateMargin={calculateMargin} />

                    <CartProductCharges orderFinal={orderFinal} />

                    <CartList cartData={cartData} />

                </View>
            </ScrollView>
            <TouchableWithoutFeedback onPress={() => checkMargin()}>
                <View style={styles.customButton}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>PROCEED</Text>
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

export default Margin;
