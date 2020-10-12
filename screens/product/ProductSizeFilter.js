import React, { useEffect, useState } from 'react';
import { SafeAreaView, Alert, StyleSheet, FlatList, ToastAndroid, ScrollView, Image, Button, View, Text, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import color from '../../style/color';
import Icon from 'react-native-vector-icons/Ionicons';

import { useSelector, useDispatch } from 'react-redux';
import { Card, ListItem } from 'react-native-elements';
import * as CartAction from '../../store/actions/CartAction';
import Modal from 'react-native-modal';
import baseUrl from '../../constants/baseUrl';


const ProductSizeFilter = ({ navigation, route, toggleModal, showSize, item, catdataobj }) => {


    const userdata = useSelector(state => state.user.UserData);
    const cartData = useSelector(state => state.cart.CartData);


    const [disableContinue, setDisableContinue] = useState(true);
    const [quantityValue, SetQuantity] = useState(1);
    const [sizelist, setSizeList] = useState(item.noOfProducts);
    const [selectedItem, setSelectedItem] = useState();
    const [cartSuplierId, setSuplierIdCart] = useState();
    const [cartSuplierName, setCartSuplierName] = useState();

    for (var key in cartData) {

        if (cartSuplierId == '' || cartSuplierId == null || cartSuplierId == undefined) {
            setSuplierIdCart(cartData[0].suplierId);

            setCartSuplierName(cartData[0].suplierName);


        }

    }

    var NormalPrice = 0;
    var VooZooProfit = (catdataobj.voozooProfit / 100) * item.productPrice;
    VooZooProfit = item.productPrice + VooZooProfit;
    var discountper = (catdataobj.discount / 100) * VooZooProfit;
    discountper = VooZooProfit - discountper;
    NormalPrice = NormalPrice + Math.round(discountper);



    const dispatch = useDispatch();

    const selectedCard = (slectedSize) => {
        const index = sizelist.indexOf(slectedSize);
        const activeIndex = sizelist.findIndex((e) => e.Color === color.blue);

        if (activeIndex == -1) {
            slectedSize.Color = color.blue;
            setSizeList([...sizelist])
        }
        else if (activeIndex !== index && activeIndex > -1) {
            sizelist[activeIndex].Color = '#000';
            slectedSize.Color = color.blue;
            setSizeList([...sizelist])
        }

        setDisableContinue(false);
        setSelectedItem(slectedSize);
        SetQuantity(1);

    }


    const deleteAndaddToCart = () => {

        dispatch(CartAction.ClearCart(userdata.userData._id));

        dispatch(CartAction.CreateCart(item._id, userdata.userData._id, selectedItem.sizes, quantityValue, "COD", NormalPrice, item.SupplierId.BuisnessName, item.SupplierId._id));
        ToastAndroid.showWithGravity(
            "Added To CartList",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    }

    const addToCart = () => {
        //dispatch(CartAction.setBatchIcon());
        if (!disableContinue) {

            if (cartSuplierId === item.SupplierId._id || cartData.length == 0) {
                dispatch(CartAction.CreateCart(item._id, userdata.userData._id, selectedItem.sizes, quantityValue, "COD", NormalPrice, item.SupplierId.BuisnessName, item.SupplierId._id));
                dispatch(CartAction.clearReduxCart());
                ToastAndroid.showWithGravity(
                    "Added To CartList",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
                closeModel();
            } else {
                Alert.alert(
                    "VooZoo",
                    "Your cart contains  products from ( " + cartSuplierName + " ).\n\n\nD0 you want to discard and add products from (" + item.SupplierId.BuisnessName + " )",
                    [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "OK", onPress: () => deleteAndaddToCart() }
                    ],
                    { cancelable: false }
                );
                closeModel();
            }
        }

    }

    const closeModel = () => {
        const activeIndex = sizelist.findIndex((e) => e.Color === color.blue);
        if (activeIndex > -1) {

            sizelist[activeIndex].Color = '#000';
            setSizeList([...sizelist]);
        }
        setDisableContinue(true);
        SetQuantity(1);
        setSelectedItem();
        setSuplierIdCart();
        toggleModal();
    }
    const addQuantity = () => {

        if (selectedItem) {
            if (quantityValue >= selectedItem.Quantity) {

                Alert.alert(
                    "VooZoo",
                    "This Product is Out of Stock.You Can not add more Quantity",
                    [

                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                );
            } else {
                SetQuantity(quantityValue + 1);
            }
        } else {
            Alert.alert(
                "VooZoo",
                "Please Select the Size First",
                [

                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
        }
    }

    const SubstractQuantity = () => {
        if (quantityValue != 1) {
            SetQuantity(quantityValue - 1);
        }
    }



    const renderItems = ({ item }) => (
        <TouchableWithoutFeedback onPress={() => selectedCard(item)}>
            <View flex={1} onStartShouldSetResponder={() => true} style={{ marginTop: hp('1%'), borderWidth: 1, borderColor: item.Color, marginRight: wp('4%'), paddingVertical: 2, paddingHorizontal: 15, borderRadius: 15 }}>
                <Text style={{ fontSize: 16, color: item.Color }}>{item.sizes}</Text>

            </View>
        </TouchableWithoutFeedback>
    )



    return (

        <View>

            <Modal propagateSwipe={true}

                customBackdrop={
                    <TouchableWithoutFeedback onPress={() => closeModel()}>
                        <View style={{ height: hp('73%'), backgroundColor: '#000' }} />
                    </TouchableWithoutFeedback>
                }

                style={{ justifyContent: 'flex-end', marginTop: hp('67%'), marginHorizontal: 0, marginBottom: 0, backgroundColor: 'white' }} isVisible={showSize}>
                <View style={{ flex: 1 }}>
                    <View style={{ marginLeft: wp('8%'), marginTop: hp('3%') }}>
                        <Text style={{ fontSize: 14 }}>Select Size</Text>

                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={sizelist}
                            keyExtractor={item => item.sizes}
                            renderItem={renderItems}
                            contentContainerStyle={styles.productList}
                        />
                    </View>
                    <View style={{ borderBottomColor: color.gray, borderBottomWidth: 1, marginTop: hp('2%') }} />

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: ('3%'), marginLeft: wp('8%'), marginRight: wp('4%') }}>
                        <Text style={{ fontSize: 16 }}>Quantity</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableWithoutFeedback onPress={() => SubstractQuantity()}>
                                <Icon name="remove-circle" size={25} color={color.blue} />
                            </TouchableWithoutFeedback>

                            <Text style={{ marginHorizontal: wp('5%') }}>{quantityValue}</Text>
                            <TouchableWithoutFeedback onPress={() => addQuantity()}>
                                <Icon name="add-circle" size={25} color={color.blue} />
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={() => addToCart()}>
                        <View style={{ ...styles.customButton, backgroundColor: disableContinue ? color.gray : color.blue }}>

                            <Text style={{ color: 'white', fontSize: 16 }}>Continue</Text>

                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </Modal>

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    customButton: {

        alignItems: 'center',
        paddingVertical: 14,
        width: '100%',
        position: 'absolute',
        bottom: 0
    }
});

export default React.memo(ProductSizeFilter);
