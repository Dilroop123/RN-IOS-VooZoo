

import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Image, View, Text, Button, FlatList, ImageBackground, ToastAndroid, TouchableWithoutFeedback } from 'react-native';
import color from '../style/color'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from 'color';
import ImgToBase64 from 'react-native-image-base64';
import { useSelector, useDispatch } from 'react-redux';
import Share from 'react-native-share';
import * as  SocialShareAcrtion from '../store/actions/SocialShareAction';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import baseUrl from '../constants/baseUrl';
import Modal from 'react-native-modal';


const ShareModal = React.memo(({ isModalVisible, shareOthers, imageurlData, nameData, ItemCategoryId, toggleModalVisibility }) => {



    const userdata = useSelector(state => state.user.UserData);
    const dispatch = useDispatch();
    const [modelImage, setmodelImages] = useState(false);
    const [modalDescription, setModalDescription] = useState(false);

    const handleImage = () => {
        setmodelImages(!modelImage);
    }

    const handleDescription = () => {
        setModalDescription(!modalDescription);
    }

    const cancelShare = () => {
        toggleModalVisibility();
        setmodelImages(false);
        setModalDescription(false);
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
            whatsAppNumber: userdata.userData.mobile


        };
        if (shareOthers) {
            Share.open(shareOptions).then(() => {
                cancelShare()
                dispatch(SocialShareAcrtion.addSocialShare(userdata.userData._id, ItemCategoryId))
            })
                .catch((err) => { err && console.log(err) });
        }
        else {
            Share.shareSingle(shareOptions).then(() => {
                cancelShare()
                dispatch(SocialShareAcrtion.addSocialShare(userdata.userData._id, ItemCategoryId))
            })
                .catch((err) => { err && console.log(err) });
        }

    }






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





        </View>
    );
});

const styles = StyleSheet.create({
    container: {


    },

});



export default React.memo(ShareModal)

