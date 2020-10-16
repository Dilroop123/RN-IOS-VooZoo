

import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Alert, Image, View, Text, TouchableWithoutFeedback } from 'react-native';
import color from '../../style/color';
import RNOtpVerify from 'react-native-otp-verify';
import * as UserAction from '../../store/actions/UserAction';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';

const Gender = React.memo(({ navigation }) => {
    /* render using props */
    const dispatch = useDispatch();
    const userdata = useSelector(state => state.user.UserData);

    const [male, setMale] = useState(false);
    const [female, setFemale] = useState(false);



    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            await AsyncStorage.setItem('USER_ID', userdata.userData._id);
        });


    }, []);


    const handleFemale = useCallback(() => {

        setFemale(true);
        setMale(false);
    }, []);


    const handleMale = () => {

        setFemale(false);
        setMale(true);


    }

    const navigatetoscreen = () => {



        if (male == false && female == false) {
            Alert.alert(
                "VooZoo",
                "Please select the Gender",
                [

                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
            return false;
        }
        let gendervalue = 'Female';
        if (male == true) {
            gendervalue = 'Male'
        }

        dispatch(UserAction.updateUserGender(userdata.userData._id, gendervalue, userdata.userData.mobile))
        navigation.replace('BottomTabs');
    }

    return (

        <View style={{ flex: 1 }}>
            <View style={styles.container}>

                <View style={{ alignItems: 'center' }}>
                    <View style={{ width: wp('30%'), height: hp('10%') }}>

                        <Image style={styles.imagelogo} source={require('../../assets/logoaa.jpg')} />

                    </View>
                </View>
                <View style={{ marginTop: hp('2%') }}>
                    <Text style={styles.textgender}>what is your Gender?</Text>
                    <Text style={{ color: 'gray' }}>Select your gender for more personalized products</Text>
                </View>

                {/* THIS IS FOR FEMALE */}
                <TouchableWithoutFeedback onPress={() => handleFemale()}>
                    <View style={styles.rectangleContainer}>
                        <View style={styles.subrectangle}>
                            {female ? <Icon name="radio-button-on" size={24} color={color.blue} /> : <Icon name="radio-button-off" size={24} color={color.blue} />}

                            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                                <Text style={{ fontSize: 18 }}>Female</Text>
                                <Text style={{ color: 'gray' }}>Female</Text>
                            </View>
                        </View>
                        <View style={styles.imageviewholder}>
                            <Image style={styles.genderimage} source={require('../../assets/woman.png')} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>

                {/* THIS IS FOR MALE */}
                <TouchableWithoutFeedback onPress={() => handleMale()}>
                    <View style={styles.rectangleContainer}>
                        <View style={styles.subrectangle}>

                            {male ? <Icon name="radio-button-on" size={24} color={color.blue} /> : <Icon name="radio-button-off" size={24} color={color.blue} />}


                            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                                <Text style={{ fontSize: 18 }}>Male</Text>
                                <Text style={{ color: 'gray' }}>Male</Text>
                            </View>
                        </View>
                        <View style={styles.imageviewholder}>
                            <Image style={styles.genderimage} source={require('../../assets/man.png')} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>

            <TouchableWithoutFeedback onPress={() => navigatetoscreen()}>
                <View style={styles.customButton}>
                    <Text style={styles.continuebutton}>Continue</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
});

// const Gender = ({ navigation }) => {

// };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },
    imagelogo: {
        flex: 1,
        resizeMode: 'cover',
        width: undefined,
        height: undefined
    },
    subrectangle: {
        flexDirection: 'row'
    },
    genderimage: {
        height: '100%',
        width: '100%'
    },
    imageviewholder: {
        height: 50,
        width: 50
    },
    textgender: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    continuebutton: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    rectangleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp('4%'),
        marginTop: hp('2%'),
        borderWidth: 1,
        borderColor: 'gray',
        paddingVertical: hp('2%')
    },
    customButton: {
        backgroundColor: color.blue,
        alignItems: 'center',
        paddingVertical: hp('2.2%'),
        width: '100%',
        position: 'absolute',
        bottom: 0
    }
});

export default Gender;