

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


const CartList = ({ navigation, cartData, ReCalculateTotalvalue, addQuantityOrderTotal, substarctQuantityOrderTotal }) => {


    const userdata = useSelector(state => state.user.UserData);
    const [cartDataList, setCartDataList] = useState(cartData);

    const [refreshValue, setRefreshValue] = useState(false);
    const dispatch = useDispatch();



    const addQuantity = (item, product) => {
        let itemQuantity = 0;
        for (var key in product) {
            if (product[key].sizes == item.size) {
                itemQuantity = product[key].Quantity + itemQuantity
            }
        }
        if (item.Quantity >= itemQuantity) {
            Alert.alert(
                "VooZoo",
                "This Product is Out of Stock.You Can not add more Quantity",
                [

                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );

        } else {
            const newValue = item.Quantity + 1;
            item.Quantity = newValue;
            addQuantityOrderTotal(item.ProductPrice);
            setCartDataList([...cartDataList]);
            dispatch(CartAction.updateCart(item._id, newValue));
        }
    }

    const SubstractQuantity = (item) => {
        if (item.Quantity != 1) {
            const newValue = item.Quantity - 1;
            item.Quantity = newValue;
            substarctQuantityOrderTotal(item.ProductPrice);
            setCartDataList([...cartDataList]);
            dispatch(CartAction.updateCart(item._id, newValue));
        }
    }
    const deleteCartItem = (item) => {

        const index = cartData.indexOf(item);
        if (index > -1) {
            cartData.splice(index, 1);
        }
        ReCalculateTotalvalue(item.ProductPrice * item.Quantity);
        setRefreshValue(!refreshValue);
        dispatch(CartAction.deleteCart(item._id, userdata.userData._id));

    }

    const renderItems = ({ item }) => (

        <Card containerStyle={styles.cardContainer}>

            <View style={{ flexDirection: 'row' }}>
                <View style={{ height: hp('25%'), width: wp('32%') }}>
                    <Image style={styles.imgaeview} source={{ uri: baseUrl.url + 'api/download?privateUrl=' + item.productId.productimages[0].privateUrl }} />

                </View>
                <View style={styles.viewContainer}>
                    <View style={styles.rowOne}>
                        <Text style={{ width: 150 }}>{item.productId.title}</Text>
                        <TouchableWithoutFeedback onPress={() => deleteCartItem(item)}>
                            <MatericalIcon name="delete" size={18} color='black' />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.subView}>
                        <Text>Price</Text>
                        <Text style={{ marginHorizontal: wp('4%') }}>₹ {item.ProductPrice}</Text>
                    </View>
                    <View style={styles.subView}>
                        <Text>Size</Text>
                        <Text style={{ marginHorizontal: wp('4%') }}>{item.size}</Text>
                    </View>
                    <View style={styles.subView}>
                        <Text>Quantity</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableWithoutFeedback onPress={() => SubstractQuantity(item)}>
                                <Icon name="remove-circle" size={25} color={color.blue} />
                            </TouchableWithoutFeedback>
                            <Text style={{ marginHorizontal: wp('5%') }}>{item.Quantity}</Text>
                            <TouchableWithoutFeedback onPress={() => addQuantity(item, item.productId.noOfProducts)}>
                                <Icon name="add-circle" size={25} color={color.blue} />
                            </TouchableWithoutFeedback>
                        </View>
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
    imgaeview: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'cover'
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
        paddingHorizontal: ('2%'),
        marginTop: hp('1%')
    },
    rowOne: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    subView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: hp('4%')
    }
});

export default React.memo(CartList);
