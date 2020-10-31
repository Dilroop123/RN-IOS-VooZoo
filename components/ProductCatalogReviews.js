import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Image, Button, View, Text, TouchableWithoutFeedback, FlatList, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import color from '../style/color';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { ProgressBar, Colors } from 'react-native-paper';
import ProductCatalogGraphLines from './ProductCatalogGraphLines';
import Color from 'color';
import baseUrl from '../constants/baseUrl';


const ProductCatalogReviews = ({ reviewCategory }) => {



    var percentExcellent = (reviewCategory.excellentCount / 100) * reviewCategory.ratingCount;
    var percentVeryGood = (reviewCategory.VeryGoodCount / 100) * reviewCategory.ratingCount;
    var percentGood = (reviewCategory.GoodCount / 100) * reviewCategory.ratingCount;
    var percentAverage = (reviewCategory.AverageCount / 100) * reviewCategory.ratingCount;
    var percentPoor = (reviewCategory.PoorCount / 100) * reviewCategory.ratingCount;


    const renderItems = useCallback(
        ({ item }) => (

            <View>
                <View style={{ borderBottomColor: color.gray, borderBottomWidth: 1, marginBottom: hp('2%'), marginRight: wp('5%') }} />
                {item.userId.fullName == "" ?

                    <Text style={{ fontSize: 12 }}>VooZoo User</Text>
                    :
                    <Text style={{ fontSize: 12 }}>{item.userId.fullName}</Text>
                }


                <AirbnbRating
                    count={5}
                    showRating={false}
                    isDisabled={true}
                    defaultRating={item.rating}

                    size={15}
                    starContainerStyle={{ marginTop: 1 }}

                />
                <View style={{ marginRight: wp('8%'), marginVertical: hp('1%') }}>
                    <Text style={{ fontSize: 12, color: color.lightblack }}>{item.review}</Text>
                </View>

                <View style={{ flexDirection: 'row', marginBottom: hp('0.5%') }}>
                    {item.reviewImages.map(productimage => (
                        <View key={productimage._id} style={{ height: hp('9.5%'), width: wp('15.5%'), marginRight: 5 }}>
                            <Image style={styles.imagestyle} resizeMethod='resize' source={{ uri: baseUrl.url + 'api/download?privateUrl=' + productimage.privateUrl }} />
                        </View>
                    ))}


                </View>

            </View>

        ), []);



    return (

        <View>

            <Card containerStyle={styles.cardContainer}>

                <View style={styles.viewContaner}>
                    <Text>CATALOG REVIEWS</Text>

                </View>

                {reviewCategory.ratingCount > 0 ?

                    <View style={{ marginTop: hp('2%'), paddingHorizontal: 20 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                {reviewCategory.avg[0] != undefined ?
                                    <View style={{ width: wp('18%'), borderRadius: 5, backgroundColor: '#a0d910', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12 }}>
                                        <Text style={{ fontSize: 20, marginRight: 5, color: 'white' }}>{reviewCategory.avg[0].avgRating.toFixed(1)}</Text>
                                        <Icon name="star" size={16} color='white' />
                                    </View>
                                    : null}

                                <View style={{ marginTop: hp('1.5%') }}>
                                    <Text style={{ fontSize: 12, color: color.lightblack }}>{reviewCategory.ratingCount}</Text>
                                    <Text style={{ fontSize: 12, color: color.lightblack }}>Rating</Text>
                                    <Text style={{ fontSize: 12, color: color.lightblack }}>{reviewCategory.reviewCount}</Text>
                                    <Text style={{ fontSize: 12, color: color.lightblack }}>Reviews</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1 }}>
                                <ProductCatalogGraphLines title='Excellent' endValue={reviewCategory.excellentCount} color='#01b35d' percentbar={percentExcellent} />
                                <ProductCatalogGraphLines title='Very Good' endValue={reviewCategory.VeryGoodCount} color='#73c018' percentbar={percentVeryGood} />
                                <ProductCatalogGraphLines title='Good' endValue={reviewCategory.GoodCount} color='#9edb10' percentbar={percentGood} />
                                <ProductCatalogGraphLines title='Average' endValue={reviewCategory.AverageCount} color='#efc101' percentbar={percentAverage} />
                                <ProductCatalogGraphLines title='Poor' endValue={reviewCategory.PoorCount} color='#dc162e' percentbar={percentPoor} />
                            </View>

                        </View>

                        <View style={{ borderBottomColor: color.gray, borderBottomWidth: 1, marginVertical: hp('2%'), marginRight: wp('5%') }} />


                        <Text style={{ marginBottom: hp('2%') }}>Real Images from Resellers</Text>
                        <View style={{ flexDirection: 'row', marginVertical: hp('2%') }}>
                            {reviewCategory.imageArray.map((productimage, index) => (
                                <View key={productimage._id} style={{ height: hp('9.5%'), width: wp('15.5%'), marginRight: 5 }}>
                                    {index <= 3 ?
                                        <Image style={styles.imagestyle} resizeMethod='resize' source={{ uri: baseUrl.url + 'api/download?privateUrl=' + productimage.privateUrl }} />

                                        : null}
                                    {index == 4 ?
                                        <ImageBackground
                                            style={styles.card}
                                            resizeMethod='resize'
                                            source={{ uri: baseUrl.url + 'api/download?privateUrl=' + productimage.privateUrl }}
                                        >
                                            <View style={styles.cardOverlay}>

                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={styles.cardTitle}>+ {reviewCategory.imageArray.length - 4}</Text>

                                                </View>

                                            </View>
                                        </ImageBackground>
                                        : null}


                                </View>
                            ))}


                        </View>


                        <FlatList

                            data={reviewCategory.reviews}
                            keyExtractor={item => item._id}
                            renderItem={renderItems}
                            removeClippedSubviews={true}
                            contentContainerStyle={styles.productList}
                        />


                    </View>


                    :
                    <View style={{ marginVertical: hp('2%'), alignItems: 'center' }}>
                        <Text> No REVIEWS ARE ADDED ON THIS PRODUCT</Text>
                    </View>
                }



            </Card>

        </View >


    );
};

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: wp('0%'),
        width: wp('100%'),
        padding: 0,
        paddingBottom: hp('0.5%'),
        marginTop: hp('1.3%')
    },
    viewContaner: {
        backgroundColor: color.gray,
        height: hp('5%'),
        paddingLeft: 20,
        justifyContent: 'center',

    },
    imagestyle: {
        width: undefined,
        height: undefined,
        aspectRatio: 1
    }, card: {

        width: undefined,
        height: undefined,
        aspectRatio: 1
    },
    cardTitle: {


        fontSize: 14,
        color: '#fff',

    },
    cardOverlay: {

        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        overflow: 'hidden'
    },

});

//export default React.memo(ProductCatalogReviews);
export default ProductCatalogReviews;
