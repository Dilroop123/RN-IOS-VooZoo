

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
                    <View style={{ justifyContent: 'center', paddingLeft: 20, marginVertical: hp('1%'), marginTop: hp('1.5%') }}>
                        <Text>SELECT CUSTOMER PRICE</Text>
                    </View>
                    <View style={{ flexDirection: 'row', backgroundColor: '#f9eef3', justifyContent: 'space-between', alignItems: 'center', marginTop: hp('1%'), paddingVertical: hp('2%'), paddingHorizontal: 20 }}>
                        <Text style={{ color: color.blue, fontWeight: 'bold' }}>Order Total</Text>

                        <Text style={{ color: color.blue, fontWeight: 'bold' }}>₹ {orderFinal}</Text>
                    </View>



                    <Card containerStyle={{ marginHorizontal: wp('0%'), width: wp('100%'), padding: 0, paddingBottom: hp('1.5%'), marginTop: hp('1.3%') }}>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('1%'), paddingHorizontal: 20 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: hp('1%') }}>Cash To Collect From Customer</Text>
                            <View style={{ flexDirection: 'row' }}>

                                <Input value={marginPrice}
                                    keyboardType='decimal-pad'
                                    inputContainerStyle={styles.inputstyle}
                                    containerStyle={styles.textinput}
                                    onChangeText={value => calculateMargin(value)}
                                />
                            </View>

                        </View>
                        <View style={{ paddingHorizontal: 20 }}>


                            <Text style={{ color: 'gray', fontSize: 12 }}>(including your Margin)</Text>

                        </View>
                        <View style={{ paddingHorizontal: 20 }}>


                            <Text style={{ color: 'red', fontSize: 12 }}>Please enter an amount greater than or equal to the Order Total    ₹ ({orderFinal})</Text>

                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: hp('2%'), paddingHorizontal: 20 }}>


                            <Text style={{ color: 'green' }}>Margin you Earn</Text>
                            <Text style={{ color: 'green' }}>₹ {showMargin}</Text>
                        </View>

                        <View style={{ borderBottomColor: color.gray, borderBottomWidth: 1, marginTop: hp('1%') }} />

                        <View style={{ flexDirection: 'row', marginTop: hp('2%'), paddingHorizontal: wp('5%') }}>
                            <AntDesign name="exclamationcircle" size={16} style={{ marginRight: wp('2%') }} color='gray' />

                            <Text>This amount is required for creating customer invoice and taxation purposes,as mandated by Govt. of India</Text>
                        </View>

                    </Card>



                    <Card containerStyle={{ marginHorizontal: wp('0%'), width: wp('100%'), padding: 0, paddingBottom: hp('1.5%'), marginTop: hp('1.3%') }}>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: hp('1%'), paddingHorizontal: 20 }}>


                            <Text>Product Charges</Text>
                            <Text>₹ {orderFinal}</Text>
                        </View>



                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: hp('1%'), paddingHorizontal: 20 }}>
                            <Text>Shipping Charges</Text>

                            <Text>₹ 0</Text>
                        </View>
                        {/*<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: hp('1%'), paddingHorizontal: 20 }}>
                            <Text>COD Charges</Text>

                            <Text>278</Text>
                            </View>*/}
                        <View style={{ flexDirection: 'row', backgroundColor: '#f9eef3', justifyContent: 'space-between', alignItems: 'center', marginTop: hp('2%'), paddingVertical: hp('1%'), paddingHorizontal: 20 }}>
                            <Text style={{ color: color.blue, fontWeight: 'bold' }}>Order Total</Text>

                            <Text style={{ color: color.blue, fontWeight: 'bold' }}>₹ {orderFinal}</Text>
                        </View>
                    </Card>

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
