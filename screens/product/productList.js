

import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, FlatList, Image, Button, View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import color from '../../style/color';
import Modal from 'react-native-modal';
import Share from 'react-native-share';
import { useSelector, useDispatch } from 'react-redux';
import baseUrl from '../../constants/baseUrl';
import ImgToBase64 from 'react-native-image-base64';
import { Card, Badge, withBadge } from 'react-native-elements';
import ProductBasicDetails from '../../components/ProductBasicDetails';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HeaderBackButton } from "@react-navigation/stack";
import * as  SocialShareAcrtion from '../../store/actions/SocialShareAction';
import Iconic from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import * as CategoryAction from '../../store/actions/CategoryAction';
import * as ReviewAction from '../../store/actions/ReviewsAction';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ShareModal from '../../components/ShareModal';
import ProductImage from './ProductImage';
import ProductCatalogReviews from '../../components/ProductCatalogReviews';
import BlankReviewTemplate from '../../components/BlankReviewTemplate';
import FilterItemCategoryModal from './FilterItemCategoryModal';

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const ProductList = ({ navigation, route }) => {

    const userdata = useSelector(state => state.user.UserData);
    const reviewCategory = useSelector(state => state.review.reviewItemCategoryData);
    const filterproducts = useSelector(state => state.category.ProductFilterData);


    const batchicon = useSelector(state => state.cart.BatchIcon);
    const { itemCatId } = route.params;
    const { catId } = route.params;
    const { subCatId } = route.params;
    const { filterList } = route.params;
    const { addOnPrice } = route.params;
    const { gstPercent } = route.params;
    const { voozooProfit } = route.params;
    const { discount } = route.params;
    const { cod } = route.params;

    const catdataobj = { addOnPrice, gstPercent, voozooProfit, discount, cod };
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [shareOthers, setShareOthers] = useState(false);
    const [ItemCategoryId, setItemCategoryId] = useState();
    const [imageurlData, setimageurlData] = useState();
    const [nameData, setnameData] = useState();
    const TotalProduct = useSelector(state => state.category.ProductData);
    var productImagesUrl = [];
    const dispatch = useDispatch();

    const [refreshing, setRefreshing] = useState(false);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Iconic

                        name='search-outline'
                        type='font-awesome'
                        size={23}
                        color={color.blue}

                        onPress={() => console.log('helgtylo')} />
                    <Iconic
                        style={{ marginLeft: wp('2.5%') }}
                        name='heart-outline'
                        type='font-awesome'
                        size={23}
                        color={color.blue}

                        onPress={() => navigation.navigate('Wish')} />
                    <View>
                        <Badge containerStyle={{ position: 'absolute', top: -9, right: 1, zIndex: 1 }} value={batchicon} status="error" />
                        <Iconic
                            style={{ marginLeft: wp('2.5%'), marginRight: wp('2.5%') }}
                            name='cart-outline'
                            type='font-awesome'
                            size={23}
                            color={color.blue}

                            onPress={() => navigation.navigate('Cart')} />
                    </View>
                </View>
            ), headerLeft: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <HeaderBackButton onPress={() => moveBack()} />

                </View>
            ),

        });
    }, [navigation, batchicon]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

            dispatch(CategoryAction.fetchProduct(catId, subCatId, itemCatId))
            dispatch(ReviewAction.fetchItemCategoryReviews(itemCatId))
        });


    }, [dispatch]);


    const toggleFilterModal = () => {
        setShowFilterModal(!showFilterModal);
    }



    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => setRefreshing(false));
    }, []);

    const moveBack = () => {
        dispatch(CategoryAction.clearProduct())
        dispatch(CategoryAction.clearFilterProduct())
        navigation.pop();

    }


    const toggleModalVisibility = useCallback(
        () => {

            setModalVisible(false);
        }, []);

    const toggleModal = useCallback(
        (imageurl, name, sharevalue, itemCatId) => {

            productImagesUrl = [];
            for (var key in imageurl) {
                productImagesUrl.push(imageurl[key].privateUrl);
            }
            setimageurlData(productImagesUrl);
            setnameData(name);
            setItemCategoryId(itemCatId);
            setShareOthers(sharevalue);
            setModalVisible(!isModalVisible);
        }, []);

    const navigateToScreen = (item) => {

        navigation.navigate('ProductDetail', { item, catdataobj });
    }




    const renderItems = useCallback(
        ({ item }) => (
            <TouchableWithoutFeedback onPress={() => navigateToScreen(item)}>
                <Card containerStyle={{ marginHorizontal: wp('0%'), width: wp('100%'), padding: 0, marginTop: hp('1.3%') }}>


                    <ProductImage item={item} />


                    <ProductBasicDetails item={item} catdataobj={catdataobj} />




                    <View style={{ flexDirection: 'row', height: hp('7%'), marginTop: hp('1%') }}>
                        <TouchableWithoutFeedback onPress={() => toggleModal(item.productimages, item.description, true, item.itemCategoryId)}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', paddingVertical: hp('2%'), alignItems: 'center', borderTopWidth: 0.3, borderRightWidth: 0.3, borderColor: color.gray }}>
                                <EvilIcons name="share-google" size={24} color='#000' />
                                <Text style={{ marginLeft: wp('1%'), color: '#000' }}>SHARE ON OTHERS</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => toggleModal(item.productimages[0].privateUrl, item.description, false, item.itemCategoryId)}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', paddingVertical: hp('2%'), alignItems: 'center', borderTopWidth: 0.3, borderColor: color.gray }}>
                                <Icon name="whatsapp" size={24} color='#00d558' />
                                <Text style={{ marginLeft: wp('1%'), color: '#000' }}>SHARE ON WHATSAPP</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </Card>
            </TouchableWithoutFeedback>
        ), []);



    return (


        <View style={styles.container}>
            <View style={styles.catalogContainer}>
                <Text style={styles.textseacrh}>Showing All Catalogs</Text>
                <TouchableWithoutFeedback onPress={() => setShowFilterModal(!showFilterModal)}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name="filter" size={18} color={color.blue} />
                        {/*           
              <Badge containerStyle={{ position: 'absolute', top: -9, right: -5, zIndex: 1 }} value='1' status="error" /> */}



                        <Text style={{ color: color.blue, marginLeft: 5 }}>FILTERS</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <ScrollView alwaysBounceVertical={true}
                showsVerticalScrollIndicator={false}
                style={{ backgroundColor: '#fff' }}


            >

                <FilterItemCategoryModal itemCatId={itemCatId} filterList={filterList} showFilterModal={showFilterModal} toggleFilterModal={toggleFilterModal} />


                <ShareModal shareOthers={shareOthers} toggleModalVisibility={toggleModalVisibility} ItemCategoryId={ItemCategoryId} nameData={nameData} isModalVisible={isModalVisible} imageurlData={imageurlData} />






                {filterproducts.length > 0 ?
                    <FlatList

                        data={filterproducts}
                        keyExtractor={item => item.id}
                        renderItem={renderItems}
                        contentContainerStyle={styles.productList}
                    /> : <FlatList

                        data={TotalProduct}
                        keyExtractor={item => item.id}
                        renderItem={renderItems}
                        contentContainerStyle={styles.productList}
                    />}

                {/* {filterproducts.products.length == 0 ?
                    <View style={{ marginTop: hp('5%'), marginHorizontal: wp('10%'), alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'red', fontSize: 16 }}>No products are found with this filter</Text>
                    </View>
                    : null} */}



                {reviewCategory.reviewCount != undefined && reviewCategory.reviewCount && filterproducts.products > 0 ?
                    <View>
                        <ProductCatalogReviews reviewCategory={reviewCategory} />
                        <TouchableWithoutFeedback onPress={() => { navigation.navigate('AllCatalogReviews', { itemcategory: itemCatId, productId: 'false' }) }}>

                            <View style={{ flexDirection: 'row', marginHorizontal: 10, justifyContent: 'space-between', alignItems: 'center', paddingVertical: hp('1%') }}>
                                <Text style={{ color: color.blue }}>See All Catalog Reviews</Text>
                                <Icon name="arrow-right" size={20} color={color.blue} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    :


                    <BlankReviewTemplate />



                }

                <View style={{ borderBottomColor: color.gray, borderBottomWidth: 1, marginBottom: hp('2%') }} />


            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }, cardContainer: {
        marginHorizontal: wp('0%'),
        width: wp('100%'),
        padding: 0,
        paddingBottom: hp('0.5%'),
        marginTop: hp('1.3%')
    },
    catalogContainer: {

        paddingRight: 25,
        width: '100%',

        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: color.gray,
        paddingVertical: hp('1.6%'),
        backgroundColor: '#fff'

    }, textseacrh: {
        color: 'gray',
        marginLeft: wp('2%')
    },
});



export default React.memo(ProductList)

