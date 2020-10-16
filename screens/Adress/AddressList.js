

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import color from '../../style/color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as AddressAction from '../../store/actions/AddressAction';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



const AddressList = ({ navigation, naviagteToScreen }) => {
    const AddressData = useSelector(state => state.address.AddressData);
    const [refreshValue, setRefreshValue] = useState(false);
    const dispatch = useDispatch();



    const HideAddress = (item) => {
        const index = AddressData.indexOf(item);
        if (index > -1) {
            AddressData.splice(index, 1);
        }

        setRefreshValue(!refreshValue);
        dispatch(AddressAction.hideAddrress(item._id));
    }


    const selctedAddress = (item) => {
        const index = AddressData.indexOf(item);
        const activeIndex = AddressData.findIndex((e) => e.primary_address === true);

        if (activeIndex == -1) {
            item.primary_address = true;
            setRefreshValue(!refreshValue);
            dispatch(AddressAction.selectAddress(item._id));
        }
        else if (activeIndex !== index && activeIndex > -1) {
            AddressData[activeIndex].primary_address = false;
            item.primary_address = true;
            setRefreshValue(!refreshValue);
            dispatch(AddressAction.selectAddress(item._id, AddressData[activeIndex]._id));
        }



    }
    const renderItems = ({ item }) => (

        <View style={{ flexDirection: 'row', backgroundColor: '#ffe3fb', justifyContent: 'space-between', alignItems: 'center', marginVertical: hp('1%'), paddingVertical: hp('3%') }}>
            <View style={{ flexDirection: 'row', marginLeft: 15 }}>
                <View>
                    <TouchableWithoutFeedback onPress={() => selctedAddress(item)}>
                        {item.primary_address ? <Icon name="radio-button-on" size={24} color={color.blue} /> :
                            <Icon name="radio-button-off" size={24} color="#000" />}

                    </TouchableWithoutFeedback>
                </View>
                <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                    <Text>{item.CustomerName}</Text>
                    <Text>{item.PhoneNumber}</Text>
                    <Text style={{ fontWeight: 'bold' }}>{`${item.HouseNumber} ${item.Street}`}</Text>
                    <Text>{`${item.City} ${item.State} ${item.PinCode}`}</Text>
                    <Text>Near To {item.LandMark}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableWithoutFeedback onPress={() => naviagteToScreen(item)}>
                    <MaterialIcons style={{ marginRight: 35 }} name="edit" size={24} color="#000" />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => HideAddress(item)}>
                    <MaterialCommunityIcons style={{ marginRight: 15 }} name="delete" size={24} color="#000" />
                </TouchableWithoutFeedback>
            </View>
        </View>
    )



    return (

        <View style={styles.container}>



            <FlatList

                data={AddressData}
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

    }
});

export default AddressList;
