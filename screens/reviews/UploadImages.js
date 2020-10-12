
import React, { useState } from 'react';
import { Platform } from 'react-native';
import { StyleSheet, Text, Button, View, Image, ImageBackground, TouchableWithoutFeedback, ScrollView, TextInput } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import color from '../../style/color';
import Color from 'color';
import ImagePicker from 'react-native-image-picker';
import baseUrl from '../../constants/baseUrl';
let count = 0;



const UploadImages = ({ navigation, passToParent, removeToParent }) => {

    const [uploadImages, setUploadedImages] = useState([]);


    const chooseImage = () => {
        let options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {


            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const source = { uri: response.data, id: count };

                setUploadedImages([...uploadImages, source]);

                uploadImageToServer(response.path, response.fileName);
            }

        });
    }





    const uploadImageToServer = async (singleFile, filename) => {



        const path =
            Platform.OS === 'android' ? 'file://' + singleFile : singleFile;

        const newImage = {

            uri: path,
            name: filename,
            type: "image/jpg",
        };

        let formData = new FormData();
        formData.append("review_image", newImage);

        const response = await fetch(baseUrl.url + 'api/v1/reviews/uploadImage', {
            method: 'POST',
            headers: {
                'Accept': '*',
                'Content-Type': 'multipart/form-data',

            },
            body: formData
        });

        const resData = await response.json();
        resData.productId = count;

        passToParent(resData);
        count++;
    };


    const removeImage = (id) => {
        setUploadedImages(prevtodo => {
            return prevtodo.filter((todo) => todo.id !== id);
        })

        removeToParent(id);
    }


    return (
        <View style={styles.container}>


            <Card containerStyle={{ marginHorizontal: wp('0%'), width: wp('100%'), padding: 0, paddingBottom: hp('1.5%'), marginTop: hp('1.3%') }}>

                <View style={{ marginTop: hp('2%'), marginHorizontal: wp('5%') }}>
                    <View style={{ marginTop: hp('1%') }}>
                        <Text style={{ marginBottom: hp('1.5%') }}>Resellers find images and videos more helpful than text alone</Text>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: color.pink }}>Maximum 5 Images</Text>
                        </View>
                        {uploadImages.length <= 4 ? <View style={{ marginBottom: hp('1%'), alignItems: 'center', paddingVertical: hp('1.5%'), marginTop: hp('2%'), borderRadius: 4, borderWidth: 0.8, borderColor: color.blue }}>
                            <TouchableWithoutFeedback onPress={() => chooseImage()}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                    <Icon name="camera" size={22} color={color.blue} />
                                    <Text style={{ color: color.blue, marginLeft: wp('3%') }}>Add Images</Text>

                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                            : null}


                        <View style={{ flexDirection: 'row', marginTop: ('4%') }}>
                            {uploadImages.map(productimage => (
                                <View key={productimage.id} style={{ height: hp('9.5%'), width: wp('15.5%'), marginHorizontal: 5 }}>

                                    <ImageBackground
                                        style={styles.card}
                                        source={{ uri: 'data:image/jpeg;base64,' + productimage.uri }}
                                    >
                                        <View style={styles.cardOverlay}>
                                            <TouchableWithoutFeedback onPress={() => removeImage(productimage.id)}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={styles.cardTitle}>Remove</Text>
                                                    <Icon name="delete" size={12} color='white' />
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </ImageBackground>
                                </View>
                            ))}


                        </View>


                    </View>
                </View>
            </Card>





        </View>
    );
}
export default UploadImages;
const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    imagestyle: {
        width: undefined,
        height: undefined,
        aspectRatio: 1
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
        backgroundColor:'black',
        
        overflow: 'hidden'
    },
});