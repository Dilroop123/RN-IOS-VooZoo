

import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, Button, FlatList, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import color from '../../style/color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card, ListItem } from 'react-native-elements'
import Color from 'color';
import ImgToBase64 from 'react-native-image-base64';
import { useSelector, useDispatch } from 'react-redux';
import * as CategoryAction from '../../store/actions/CategoryAction';
import ItemBasicDetails from './ItemBasicDetails';
import Share from 'react-native-share';
import * as WhishListAction from '../../store/actions/WishListAction';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import baseUrl from '../../constants/baseUrl';
import Modal from 'react-native-modal';

const WishList = ({ navigation, route, navigateTo, itemCatData, hideFavButton }) => {


    const userdata = useSelector(state => state.user.UserData);
    const dispatch = useDispatch();
    const [isModalVisible, setModalVisible] = useState(false);
    const [refreshValue, setRefreshValue] = useState(false);
    const [modelImage, setmodelImages] = useState(false);
    const [modalDescription, setModalDescription] = useState(false);
    const [imageurlData, setimageurlData] = useState();
    const [nameData, setnameData] = useState();
    const [base64productImage, setBase64productImage] = useState([]);
    var productImagesUrl = [];









    const toggleModal = (product, name) => {

        productImagesUrl = [];
        for (const key in product) {
            productImagesUrl.push(product[key].productimages[0].privateUrl);
        }

        setimageurlData(productImagesUrl);
        setnameData(name);
        setModalVisible(!isModalVisible);
    };

    const handleImage = () => {
        setmodelImages(!modelImage);
    }

    const handleDescription = () => {
        setModalDescription(!modalDescription);
    }

    const cancelShare = () => {
        setmodelImages(false);
        setModalDescription(false);
        setModalVisible(false);
    }
    const removeWishList = (item) => {

        const index = itemCatData.indexOf(item);
        if (index > -1) {
            itemCatData.splice(index, 1);
        }

        setRefreshValue(!refreshValue);
        dispatch(WhishListAction.RemoveWishList(userdata.userData._id, item.itemCategoryId._id))
        dispatch(CategoryAction.WhisListItemCategory(item.itemCategoryId._id, false))

    }



    const fun = async () => {

        let base64img = [];

        for (const key in imageurlData) {

            await ImgToBase64.getBase64String(baseUrl.url + 'api/download?privateUrl=' + imageurlData[key])
                .then(base64String => {

                    base64img.push('data:image/jpeg;base64,' + base64String);

                })
        }
        shareProduct(base64img);
    }



    const shareProduct = (base64img) => {

        const shareOptions = {
            title: 'Share via',
            message: modalDescription ? nameData : '',
            urls: modelImage ? base64img : [''],
            social: Share.Social.WHATSAPP,
            whatsAppNumber: "+15145492584"


        };
        Share.shareSingle(shareOptions).then(() => cancelShare())
            .catch((err) => { err && console.log(err) })

    }

    const renderItems = ({ item }) => (
        <TouchableWithoutFeedback onPress={() => navigateTo(item)}>
            <Card containerStyle={{ marginHorizontal: wp('0%'), width: wp('100%'), padding: 0, marginTop: hp('1.3%') }}>
                {hideFavButton ? <TouchableWithoutFeedback onPress={() => removeWishList(item)}>
                    <View style={styles.heartIcon}>
                        <Icon name="heart" color="red" size={25} />

                    </View>
                </TouchableWithoutFeedback> : null}


                {item.product.length == 1 ?

                    <View style={{ height: hp('45%') }}>

                        <Image style={{ flex: 1, width: undefined, height: undefined, aspectRatio: 1 }} source={{ uri: baseUrl.url + 'api/download?privateUrl=' + item.product[0].productimages[0].privateUrl }} />

                    </View>


                    : null}

                {item.product.length == 2 ?
                    <View style={{ height: hp('45%'), flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>

                            <Image style={{ flex: 1, width: undefined, height: undefined }} source={{ uri: baseUrl.url + 'api/download?privateUrl=' + item.product[0].productimages[0].privateUrl }} />

                        </View>

                        <View style={{ flex: 1, marginLeft: wp('1%') }}>

                            <Image style={{ flex: 1, width: undefined, height: undefined }} source={{ uri: baseUrl.url + 'api/download?privateUrl=' + item.product[1].productimages[0].privateUrl }} />

                        </View>


                    </View>
                    : null}

                {item.product.length == 3 ?
                    <View style={{ height: hp('45.5%'), flexDirection: 'row' }}>
                        <View style={{ width: wp('55%'), height: hp('45.5%') }}>

                            <Image style={{ flex: 1, width: undefined, height: undefined }} source={{ uri: baseUrl.url + 'api/download?privateUrl=' + item.product[0].productimages[0].privateUrl }} />

                        </View>
                        <View style={{ flexDirection: 'column', marginLeft: wp('1%') }}>
                            <View style={{ width: wp('55%'), height: hp('22.5%') }}>

                                <Image style={{ flex: 1, width: undefined, height: undefined, aspectRatio: 1 }} source={{ uri: baseUrl.url + 'api/download?privateUrl=' + item.product[1].productimages[0].privateUrl }} />

                            </View>
                            <View style={{ marginTop: hp('0.5%'), width: wp('55%'), height: hp('22.5%') }}>

                                <Image style={{ flex: 1, width: undefined, height: undefined, aspectRatio: 1 }} source={{ uri: baseUrl.url + 'api/download?privateUrl=' + item.product[2].productimages[0].privateUrl }} />

                            </View>
                        </View>
                    </View>
                    : null}

                {item.product.length > 3 ?
                    <View style={{ height: hp('45.5%'), flexDirection: 'row', backgroundColor: '#fff' }}>
                        <View style={{ width: wp('55%'), height: hp('45.5%') }}>

                            <Image style={{ flex: 1, width: undefined, height: undefined }} source={{ uri: baseUrl.url + 'api/download?privateUrl=' + item.product[0].productimages[0].privateUrl }} />

                        </View>
                        <View style={{ flexDirection: 'column', marginLeft: wp('1%') }}>
                            <View style={{ width: wp('55%'), height: hp('22.5%') }}>

                                <Image style={{ flex: 1, resizeMode: 'cover', width: undefined, height: undefined, aspectRatio: 1 }} source={{ uri: baseUrl.url + 'api/download?privateUrl=' + item.product[1].productimages[0].privateUrl }} />

                            </View>
                            <View style={{ marginTop: hp('0.5%'), width: wp('55%'), height: hp('22.5%') }}>



                                <ImageBackground
                                    style={styles.card}
                                    source={{ uri: baseUrl.url + 'api/download?privateUrl=' + item.product[2].productimages[0].privateUrl }}
                                >
                                    <View style={styles.cardOverlay}>
                                        <View>
                                            <Text style={styles.cardTitle}> + {item.product.length - 3}</Text>
                                        </View>
                                    </View>
                                </ImageBackground>


                            </View>
                        </View>
                    </View>
                    : null}









                <ItemBasicDetails item={item.itemCategoryId} product={item.product} />


                <View style={{ borderBottomColor: color.gray, borderBottomWidth: 1, marginTop: hp('1%') }} />
                <View style={{ flexDirection: 'row', height: hp('5%'), marginVertical: hp('1%') }}>
                    <TouchableWithoutFeedback onPress={() => toggleModal(item.product, item.name)}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginHorizontal: wp('5%'), paddingVertical: hp('0.8%'), alignItems: 'center', borderRadius: 8, borderWidth: 0.8, borderColor: 'green' }}>
                            <Icon name="whatsapp" size={24} color='green' />
                            <Text style={{ marginLeft: wp('1%'), color: 'green', fontWeight: 'bold' }}>SHARE NOW</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <View style={{ flex: 1, backgroundColor: color.blue, marginLeft: wp('2%'), marginHorizontal: wp('5%'), alignItems: 'center', paddingVertical: hp('0.8%'), borderRadius: 8, borderWidth: 0.8, borderColor: color.blue }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>View Products</Text>
                    </View>

                </View>
                <View style={{ borderBottomColor: color.gray, borderBottomWidth: 1, marginBottom: hp('1%') }} />
            </Card>
        </TouchableWithoutFeedback >
    )

    return (

        <View style={styles.container}>



            <Modal style={{ marginVertical: hp('28%'), marginHorizontal: wp('10%'), backgroundColor: 'white' }} isVisible={isModalVisible}>
                <View style={{ flex: 1 }}>


                    <View style={{ paddingHorizontal: 20 }}>
                        <Text style={{ marginTop: 20, textAlign: 'center', fontWeight: 'bold' }}>Sharing Category...</Text>
                        <TouchableWithoutFeedback onPress={() => handleImage()}>
                            <View style={{ marginTop: hp('4%'), flexDirection: 'row', alignItems: 'center' }}>
                                {modelImage ? <Icon name="checkbox-marked-circle" size={24} color={color.blue} /> :
                                    <Icon name="checkbox-blank-circle-outline" size={24} color={color.blue} />}
                                <Text style={{ marginLeft: wp('5%'), color: color.blue }}>Images</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => handleDescription()}>
                            <View style={{ marginTop: hp('4%'), flexDirection: 'row' }}>
                                {modalDescription ? <Icon name="checkbox-marked-circle" size={24} color={color.blue} /> :
                                    <Icon name="checkbox-blank-circle-outline" size={24} color={color.blue} />}
                                <Text style={{ marginLeft: wp('5%'), color: color.blue }}>Description</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>


                    <View style={{ marginTop: hp('4%'), flexDirection: 'row', marginHorizontal: 10, justifyContent: 'space-around' }}>
                        <View style={{ flex: 1 }}>
                            <Button title="Cancel" color='red' onPress={cancelShare} />
                        </View>
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Button title="Share" color='green' onPress={fun} />
                        </View>
                    </View>
                </View>
            </Modal>






            <FlatList
                data={itemCatData}
                keyExtractor={item => item._id}
                renderItem={renderItems}
                extraData={refreshValue}
                contentContainerStyle={styles.productList}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp('1.2%')
    },
    cardOverlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        overflow: 'hidden'
    },
    cardTitle: {


        fontSize: 24,
        color: '#fff',

    }
    ,
    card: {


        resizeMode: 'cover',
        flex: 1,
        width: undefined,
        height: undefined,
        aspectRatio: 1
    },
    heartIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
        height: 40,
        width: 40,
        backgroundColor: '#fff',
        zIndex: 1,
        position: 'absolute',
        top: 10,
        right: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1
    }
});

export default WishList;
