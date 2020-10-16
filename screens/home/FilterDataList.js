

import React, { useEffect, useState, useFocusEffect, useCallback } from 'react';
import { StyleSheet, RefreshControl, ToastAndroid, FlatList, ScrollView, Button, Image, View, Text, TouchableWithoutFeedback } from 'react-native';
import color from '../../style/color';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector, useDispatch } from 'react-redux';
import WhishListFavButton from '../ItemCategory/WhishListFavButton';
import ItemCategoryImages from '../ItemCategory/ItemCategoryImages';
import ItemBasicDetails from '../ItemCategory/ItemBasicDetails';
import { Card, ListItem } from 'react-native-elements'
import * as WhishListAction from '../../store/actions/WishListAction';
import ShareModal from '../../components/ShareModal';

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const FilterDataList = ({ navigation, filters, navigateTo }) => {

    const userdata = useSelector(state => state.user.UserData);
    const [refreshValue, setRefreshValue] = useState(false);
    const dispatch = useDispatch();


    const [isModalVisible, setModalVisible] = useState(false);

    const [imageurlData, setimageurlData] = useState();
    const [nameData, setnameData] = useState();
    const [ItemCategoryId, setItemCategoryId] = useState();
    var productImagesUrl = [];


    const toggleModal = useCallback(
        (product, name, itemCatId) => {

            productImagesUrl = [];
            for (const key in product) {
                productImagesUrl.push(product[key].productimages[0].privateUrl);
            }

            setimageurlData(productImagesUrl);
            setnameData(name);
            setItemCategoryId(itemCatId);
            setModalVisible(!isModalVisible);

        }, []);

    const toggleModalVisibility = useCallback(
        () => {

            setModalVisible(false);
        }, []);


    const addToWishList = useCallback(item => {
        const wishval = item.wishlist;
        item.wishlist = !item.wishlist;
        setRefreshValue(!refreshValue);
        if (!wishval) {
            dispatch(WhishListAction.addWishlist(userdata.userData._id, item._id))
            ToastAndroid.showWithGravity(
                "Added To WishList",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        } else {
            dispatch(WhishListAction.RemoveWishList(userdata.userData._id, item._id))
            ToastAndroid.showWithGravity(
                "Removed From WishList",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
    }, [refreshValue]);

    const renderItems = ({ item }) => ( // catId, subCatId

        <TouchableWithoutFeedback onPress={() => navigateTo(item.categoryId, item.subCategoryId, item._id, item.name, item.addOnPrice, item.gstPercent, item.voozooProfit, item.discount, item.cod)}>



            <Card containerStyle={styles.cardcontainer}>
                <WhishListFavButton item={item} addToWishList={addToWishList} />



                <ItemCategoryImages item={item} />
                {item.product[0] != undefined ?
                    <ItemBasicDetails item={item} />
                    : null}


                <View style={{ borderBottomColor: color.gray, borderBottomWidth: 1, marginTop: hp('1%') }} />

                <View style={{ flexDirection: 'row', height: hp('5%'), marginVertical: hp('1%') }}>
                    <TouchableWithoutFeedback onPress={() => toggleModal(item.product, item.name, item._id)}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginHorizontal: wp('5%'), paddingVertical: hp('0.8%'), alignItems: 'center', borderRadius: 8, borderWidth: 0.8, borderColor: 'green' }}>
                            <Icon name="whatsapp" size={24} color='green' />
                            <Text style={{ marginLeft: wp('1%'), color: 'green', fontWeight: 'bold' }}>SHARE NOW</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <View style={{ flex: 1, backgroundColor: color.blue, marginLeft: wp('2%'), marginHorizontal: wp('5%'), alignItems: 'center', paddingVertical: hp('0.8%'), borderRadius: 8, borderWidth: 0.8, borderColor: color.blue }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>View Products</Text>
                    </View>

                </View>
                {/* <View style={{ borderBottomColor: color.gray, borderBottomWidth: 1, marginBottom: hp('1%') }} /> */}
            </Card>



        </TouchableWithoutFeedback >
    );

    return (


        <View style={styles.container}>

            <ShareModal shareOthers={false}
                toggleModalVisibility={toggleModalVisibility}
                ItemCategoryId={ItemCategoryId}
                nameData={nameData}
                isModalVisible={isModalVisible}
                imageurlData={imageurlData} />


            <FlatList
                data={filters}
                keyExtractor={item => item._id}
                renderItem={renderItems}
                showsVerticalScrollIndicator={false}
                extraData={refreshValue}
                contentContainerStyle={styles.productList}
            />


        </View>



    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: hp('7%'),
    },


    cardcontainer: {
        marginHorizontal: wp('0%'),
        width: wp('100%'),
        padding: 0,
        marginTop: hp('1.8%')
    },
    griditem: {
        flexDirection: 'row'
    }
});

export default FilterDataList;
