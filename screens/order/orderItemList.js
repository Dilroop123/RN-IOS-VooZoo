

import React, { useState } from 'react';
import { StyleSheet, FlatList, Image, View, Text } from 'react-native';
import color from '../../style/color';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import baseUrl from '../../constants/baseUrl';

import { Card, ListItem } from 'react-native-elements';

import { Rating, AirbnbRating } from 'react-native-ratings';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const OrderItemList = ({ navigation, cartData, naviagetoReviews }) => {

    const [ratingvalue, setRatingValue] = useState();
    const ratingCompleted = (rating) => {

        setRatingValue(rating);


    }

    const itemdata = (productitem) => {

        naviagetoReviews(ratingvalue, productitem);
    }
    const renderItems = ({ item }) => (

        <Card containerStyle={{ marginHorizontal: wp('0%'), width: wp('100%'), padding: 0, marginTop: hp('1%') }}>

            <View style={{ flexDirection: 'row' }}>
                <View style={{ height: hp('22%'), width: wp('32%') }}>
                    <Image style={{ flex: 1, width: undefined, height: undefined, resizeMode: 'cover' }} source={{ uri: baseUrl.url + 'api/download?privateUrl=' + item.productId.productimages[0].privateUrl }} />

                </View>
                <View style={{ flexDirection: 'column', width: wp('68%'), paddingHorizontal: ('2%'), marginTop: hp('1%') }}>
                    <View style={{ alignItems: 'center', backgroundColor: 'green' }}>
                        <Text style={{ color: '#fff' }}>Ordered</Text>

                    </View>
                    <View style={{ marginTop: hp('2%'), marginHorizontal: wp('2%') }}>
                        <Text style={{ width: 150 }}>{item.productId.title}</Text>

                    </View>
                    <View style={{ flexDirection: 'row', marginHorizontal: wp('2%'), alignItems: 'center', justifyContent: 'space-between', marginTop: hp('1%') }}>
                        <Text>{item.productId.productPrice}</Text>
                        <Text>size  {item.size}</Text>
                        <Text>Qty  {item.Quantity}</Text>

                    </View>
                    <TouchableWithoutFeedback onPress={() => itemdata(item)}>
                        <AirbnbRating
                            count={5}
                            showRating={false}
                            defaultRating={0}
                            onFinishRating={ratingCompleted}
                            size={15}
                            starContainerStyle={{ marginTop: 1 }}

                        />
                    </TouchableWithoutFeedback>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: hp('4%') }}>
                        <View style={{ borderWidth: 1, borderColor: color.blue, paddingHorizontal: 25, paddingVertical: 5 }}>
                            <Text>CANCEL</Text>
                        </View>
                        <View style={{ borderWidth: 1, backgroundColor: color.blue, borderColor: color.blue, paddingHorizontal: 25, paddingVertical: 5 }}>
                            <Text style={{ color: '#fff' }}>TRACK</Text>
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

export default OrderItemList;
