
import React, { useState } from 'react';
import { StyleSheet, Text, Button, Alert, View, Image, ImageBackground, TouchableWithoutFeedback, ScrollView, TextInput } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import color from '../../style/color';
import * as ReviewAction from '../../store/actions/ReviewsAction';
import Color from 'color';
import UploadImages from './UploadImages';
import { useSelector, useDispatch } from 'react-redux';
import baseUrl from '../../constants/baseUrl';

const AddReview = ({ navigation, route }) => {
    const userdata = useSelector(state => state.user.UserData);
    const dispatch = useDispatch();
    const { rating } = route.params;
    const { productdata } = route.params;
    const [uploadImagesServer, setUploadedImagesServer] = useState([]);

    const [reviewTextArea, setReviewTextArea] = useState();
    var graphLine;
    if (rating == 1) {
        graphLine = 'Poor';
    } else if (rating == 2) {
        graphLine = 'Average';
    } else if (rating == 3) {
        graphLine = 'Good';
    } else if (rating == 4) {
        graphLine = 'Very Good';
    } else if (rating == 5) {
        graphLine = 'Excellent';
    }

    const SubmitReview = () => {


        if ((reviewTextArea != '' || reviewTextArea != undefined) && (uploadImagesServer.length == 0)) {
            Alert.alert(
                "VooZoo",
                "Please Upload Image first then You can  add the reason for rating",
                [

                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
        }
        else {
            console.log(reviewTextArea);
            dispatch(ReviewAction.createReview(userdata.userData._id, productdata.productId._id, productdata.productId.itemCategoryId, reviewTextArea, rating, uploadImagesServer, graphLine));
            navigation.pop();
        }
    }

    const passToParent = (uploadServerImages) => {

        setUploadedImagesServer([...uploadImagesServer, uploadServerImages])
    }

    const removeToParent = (id) => {
        setUploadedImagesServer(prevtodo => {
            return prevtodo.filter((todo) => todo.productId !== id);
        })
    }


    return (
        <View style={styles.container}>
            <ScrollView alwaysBounceVertical={true}
                showsVerticalScrollIndicator={false}
                bounces={true}

            >
                <Card containerStyle={{ marginHorizontal: wp('0%'), width: wp('100%'), padding: 0, paddingBottom: hp('1.5%'), marginTop: hp('1.3%') }}>
                    <View style={{ flexDirection: 'row', marginTop: hp('3%'), marginHorizontal: wp('5%') }}>
                        <View style={{ height: hp('12.5%'), width: wp('21.5%') }}>
                            <Image style={styles.imagestyle} source={{ uri: baseUrl.url + 'api/download?privateUrl=' + productdata.productId.productimages[0].privateUrl }} />
                        </View>
                        <View style={{ marginRight: wp('20%') }}>
                            <Text style={{ marginBottom: hp('1.5%') }}>{productdata.productId.title}</Text>
                            <AirbnbRating
                                count={5}
                                showRating={false}
                                defaultRating={rating}
                                isDisabled={true}

                                size={25}
                                starContainerStyle={{ marginTop: 1 }}

                            />
                        </View>
                    </View>
                </Card>

                <UploadImages passToParent={passToParent} removeToParent={removeToParent} />



                <Card containerStyle={{ marginHorizontal: wp('0%'), width: wp('100%'), padding: 0, paddingBottom: hp('10.5%'), marginTop: hp('1.3%') }}>

                    <View style={{ marginTop: hp('2%'), marginHorizontal: wp('5%') }}>
                        <View style={{ marginTop: hp('1%') }}>
                            <Text style={{ marginBottom: hp('1.5%') }}>COULD YOU TELL US A REASON FOR SUCH A RATING ?</Text>
                            <View style={styles.textAreaContainer} >
                                <TextInput
                                    style={styles.textArea}
                                    value={reviewTextArea}
                                    onChangeText={value => setReviewTextArea(value)}
                                    underlineColorAndroid="transparent"
                                    placeholder="Type something"
                                    placeholderTextColor="grey"
                                    numberOfLines={10}
                                    multiline={true}
                                />
                            </View>
                        </View>
                    </View>
                </Card>
            </ScrollView>
            <View style={styles.customButton}>

                <TouchableWithoutFeedback onPress={() => SubmitReview()}>
                    <View style={{ paddingVertical: hp('1.7%'), flex: 1, backgroundColor: color.blue, alignItems: 'center', justifyContent: 'center' }}>

                        <Text style={{ color: '#fff', marginLeft: wp('1.5%') }}>SUBMIT REVIEW</Text>

                    </View>
                </TouchableWithoutFeedback>


            </View>

        </View>
    );
}
export default AddReview;
const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    customButton: {

        paddingVertical: 0,
        width: '100%',

        position: 'absolute',
        bottom: 0
    },
    imagestyle: {
        width: undefined,
        height: undefined,
        aspectRatio: 1
    },
    textAreaContainer: {
        borderColor: color.gray,
        borderWidth: 1,
        padding: 5
    },
    textArea: {
        height: 75,
        justifyContent: "flex-start"
    },

    card: {

        width: undefined,
        height: undefined,
        aspectRatio: 1
    },
    cardTitle: {


        fontSize: 12,
        color: '#fff',

    },
    cardOverlay: {

        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        overflow: 'hidden'
    },
});