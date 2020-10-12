

import React, { useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import color from '../../style/color';
import * as AddressAction from '../../store/actions/AddressAction';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AddressList from './AddressList';


const Address = ({ navigation, route }) => {
    const AddressData = useSelector(state => state.address.AddressData);

    const { showProceedButton } = route.params;
    const { showMargin } = route.params;
    const { orderFinal } = route.params;
    const { SuplierNameCart } = route.params;
    const userdata = useSelector(state => state.user.UserData);


    const dispatch = useDispatch();



    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(AddressAction.fetchAddress(userdata.userData._id))
        });


    }, [dispatch]);

    const naviagteToScreen = (data) => {
        navigation.navigate('EditAddress', { addressvalue: data })
    }



    return (

        <View style={styles.container}>

            <AddressList naviagteToScreen={naviagteToScreen} />
            <TouchableWithoutFeedback onPress={() => navigation.navigate('AddAdress')}>
                <View style={styles.floatingButton}>
                    <MaterialCommunityIcons name="plus" size={30} color="#fff" />
                </View>

            </TouchableWithoutFeedback>
            {showProceedButton && (AddressData.length > 0) ? <TouchableWithoutFeedback onPress={() => navigation.navigate('OrderSummary', { showMargin, orderFinal, SuplierNameCart })}>
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
        backgroundColor: '#fff'

    },
    floatingButton: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        position: 'absolute',
        bottom: 70,
        zIndex: 1,
        right: 10,
        height: 60,
        backgroundColor: color.blue,
        borderRadius: 100,
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

export default Address;
