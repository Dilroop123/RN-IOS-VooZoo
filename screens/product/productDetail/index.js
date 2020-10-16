import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Image, Button, View, Text, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import color from '../../../style/color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconic from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';

import baseUrl from '../../../constants/baseUrl';
import * as CartAction from '../../../store/actions/CartAction';
import * as ReviewAction from '../../../store/actions/ReviewsAction';
import * as ProductAction from '../../../store/actions/ProductAction';
import { Card, ListItem, Badge, withBadge } from 'react-native-elements';
import ProductSizeFilter from '../ProductSizeFilter';

import ProductBasicDetails from '../../../components/ProductBasicDetails';
import ShareModal from '../../../components/ShareModal';
import ProductImageSlider from './ProductImageSlider'
import ProductIconCard from './ProductIconCard';
import ProductDetailCard from './ProductDetailCard';
import ProductSoldByCard from './ProductSoldByCard';
import ProductCatalogReviews from '../../../components/ProductCatalogReviews';
import BlankReviewTemplate from '../../../components/BlankReviewTemplate';
import { HeaderBackButton } from '@react-navigation/stack';



const ProductDetail = ({ navigation, route }) => {
    const userdata = useSelector(state => state.user.UserData);
    const productReviews = useSelector(state => state.review.reviewProduct);


    const batchicon = useSelector(state => state.cart.BatchIcon);



    const { item } = route.params;
    const { catdataobj } = route.params;

    const [showSize, setShowSize] = useState(false);
    const [imageurlData, setimageurlData] = useState();

    const [ItemCategoryId, setItemCategoryId] = useState();
    const [modalDescription, setModalDescription] = useState(false);
    const [nameData, setnameData] = useState();
    const [isModalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();



    let ShareproductImagesUrl = [];
    let productImagesUrl = [];





    for (const key in item.productimages) {
        productImagesUrl.push(baseUrl.url + 'api/download?privateUrl=' + item.productimages[key].privateUrl);
    }


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
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <HeaderBackButton onPress={() => moveBack()} />
                    <Iconic
                        style={{ paddingRight: wp('17.5%') }}
                        name='home-outline'
                        type='font-awesome'
                        size={23}
                        color='black'

                        onPress={() => navigation.navigate('Home')} />
                </View>
            )

        });
    }, [navigation, batchicon]);



    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            await dispatch(CartAction.fetchCart(userdata.userData._id))
            await dispatch(ReviewAction.fetchProductReviews(item.itemCategoryId, item._id))
            await dispatch(ProductAction.saveproductid(item))
        });


    }, [dispatch, batchicon]);

    const navigateToMoreDetails = () => {
        //navigation.navigate('AllCatalogReviews', { itemcategory: item.itemCategoryId, productId: item._id })
        navigation.navigate('MainContainer', { productdata: item });
    }


    const toggleModal = useCallback(
        () => {

            setShowSize(!showSize)
        }, [showSize]);

    const toggleModalVisibility = useCallback(
        () => {

            setModalVisible(false);
        }, []);


    const toogleShareModal = useCallback(
        (imageurl, name, itemCatId) => {

            ShareproductImagesUrl = [];
            for (var key in imageurl) {
                ShareproductImagesUrl.push(imageurl[key].privateUrl);
            }

            setimageurlData(ShareproductImagesUrl);
            setnameData(name);
            setItemCategoryId(itemCatId);
            setModalVisible(!isModalVisible);
        }, []);


    const showSizeFilter = useCallback(
        () => {
            setShowSize(true)
        }, []);

    const moveBack = () => {

        navigation.pop();

    }

    return (
        <View>
            <ScrollView alwaysBounceVertical={true}
                showsVerticalScrollIndicator={false}
                bounces={true}

            >

                <ShareModal shareOthers={true} toggleModalVisibility={toggleModalVisibility} ItemCategoryId={ItemCategoryId} nameData={nameData} isModalVisible={isModalVisible} imageurlData={imageurlData} />

                <View style={styles.container}>
                    <Card containerStyle={{ marginHorizontal: wp('0%'), width: wp('100%'), padding: 0, marginTop: hp('1.3%') }}>

                        <ProductImageSlider productImagesUrl={productImagesUrl} />
                        <ProductBasicDetails item={item} catdataobj={catdataobj} />

                        <TouchableWithoutFeedback onPress={() => toogleShareModal(item.productimages, item.description, item.itemCategoryId)}>
                            <View style={{ marginBottom: hp('3%'), marginHorizontal: wp('5%'), alignItems: 'center', paddingVertical: hp('1.5%'), marginTop: hp('2%'), borderRadius: 8, borderWidth: 0.8, borderColor: color.blue }}>
                                <Text style={{ color: color.blue, fontWeight: 'bold' }}>SHARE NOW</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </Card>


                    <ProductDetailCard description={item.shortDescription} navigateToMoreDetails={navigateToMoreDetails} />
                    <ProductIconCard />


                    {productReviews.reviewCount != undefined && productReviews.reviewCount > 0 ?
                        <View>
                            <ProductCatalogReviews reviewCategory={productReviews} />
                            <TouchableWithoutFeedback onPress={() => { navigation.navigate('AllCatalogReviews', { itemcategory: item.itemCategoryId, productId: item._id }) }}>

                                <View style={{ flexDirection: 'row', marginHorizontal: 10, justifyContent: 'space-between', alignItems: 'center', paddingVertical: hp('1%') }}>
                                    <Text style={{ color: color.blue }}>See All Catalog Reviews</Text>
                                    <Icon name="arrow-right" size={20} color={color.blue} />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                        :
                        <BlankReviewTemplate />

                    }
                    <ProductSoldByCard suplierName={item.SupplierId.BuisnessName} />

                    <ProductSizeFilter item={item} catdataobj={catdataobj} toggleModal={toggleModal} showSize={showSize} />

                </View>

            </ScrollView>

            <View style={styles.customButton}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableWithoutFeedback onPress={() => showSizeFilter()}>
                        <View style={{ borderWidth: 1, borderColor: color.blue, flexDirection: 'row', paddingVertical: hp('1.2%'), flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name="cart-outline" size={20} color={color.blue} />
                            <Text style={{ color: color.blue, marginLeft: wp('1.5%') }}>ADD TO CART</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Cart')}>
                        <View style={{ flexDirection: 'row', paddingVertical: hp('1.2%'), flex: 1, backgroundColor: color.blue, alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name="share-variant" size={20} color='#fff' />
                            <Text style={{ color: '#fff', marginLeft: wp('1.5%') }}>CHECK OUT</Text>

                        </View>
                    </TouchableWithoutFeedback>
                </View>

            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    customButton: {

        paddingVertical: 0,
        width: '100%',

        position: 'absolute',
        bottom: 0
    }
});

export default ProductDetail;
