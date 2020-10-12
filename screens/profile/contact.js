

import React, { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, TextInput, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import color from '../../style/color';
import { Input } from 'react-native-elements';
import * as UsserAction from '../../store/actions/UserAction';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const Contact = ({ navigation }) => {
    const userdata = useSelector(state => state.user.UserData);
    const dispatch = useDispatch();


    const [Fullname, setFullName] = useState(userdata.userData.fullName);
    const [Mobile, setMobile] = useState(userdata.userData.mobile);
    const [Email, setEmail] = useState(userdata.userData.email);
    const [Pincode, setPincode] = useState(userdata.userData.pincode);
    const [address1, setAddress1] = useState(userdata.userData.address1);
    const [address2, setAddress2] = useState(userdata.userData.address2);
    const [City, setCity] = useState(userdata.userData.city);
    const [State, setState] = useState(userdata.userData.state);
    const [enableShift, setEnableShift] = useState(false);

    const ref_full_name = useRef();
    const ref_mobile = useRef();
    const ref_email = useRef();
    const ref_pincode = useRef();
    const ref_address1 = useRef();
    const ref_address2 = useRef();
    const ref_city = useRef();
    const ref_state = useRef();

    const addAddress = () => {

        dispatch(UsserAction.updateUserContact(userdata.userData._id, Fullname, Mobile, Email, Pincode, address1, address2, City, State));


        navigation.pop();
    }


    return (
        <ScrollView>
            <KeyboardAvoidingView

                behavior="position"
                enabled={enableShift}
                style={styles.container}
            >

                <View>


                    <Input value={Fullname}
                        onSubmitEditing={() => ref_mobile.current.focus()}
                        returnKeyType={"next"}
                        inputContainerStyle={styles.inputstyle}
                        containerStyle={styles.textinput}
                        onChangeText={value => setFullName(value)}
                        label="Full Name" />

                    <Input value={Mobile}
                        ref={ref_mobile}
                        onSubmitEditing={() => ref_email.current.focus()}
                        returnKeyType={"next"}
                        inputContainerStyle={styles.inputstyle}
                        containerStyle={styles.textinput}
                        onChangeText={value => setMobile(value)}
                        label="MOBILE NUMBER" />

                    <Input value={Email}
                        ref={ref_email}
                        returnKeyType={"next"}
                        onSubmitEditing={() => ref_pincode.current.focus()}
                        inputContainerStyle={styles.inputstyle}
                        containerStyle={styles.textinput}
                        onChangeText={value => setEmail(value)}
                        label="EMAIL" />

                    <Input value={Pincode}
                        ref={ref_pincode}
                        onSubmitEditing={() => ref_address1.current.focus()}
                        returnKeyType={"next"}
                        inputContainerStyle={styles.inputstyle}
                        containerStyle={styles.textinput}
                        onChangeText={value => setPincode(value)}
                        label="PIN CODE" />



                    <Input value={address1}
                        onSubmitEditing={() => ref_address2.current.focus()}
                        ref={ref_address1}
                        //  onFocus={() => setEnableShift(true)}
                        returnKeyType={"next"}
                        inputContainerStyle={styles.inputstyle}
                        containerStyle={styles.textinput}
                        onChangeText={value => setAddress1(value)}
                        label="ADDRESS1" />




                    <Input value={address2}
                        onSubmitEditing={() => ref_city.current.focus()}
                        ref={ref_address2}
                        // onFocus={() => setEnableShift(true)}
                        returnKeyType={"next"}
                        inputContainerStyle={styles.inputstyle}
                        containerStyle={styles.textinput}
                        onChangeText={value => setAddress2(value)}
                        label="ADDRESS2" />







                    <Input value={City}
                        ref={ref_city}
                        onSubmitEditing={() => ref_state.current.focus()}
                        returnKeyType={"next"}
                        // onFocus={() => setEnableShift(true)}
                        inputContainerStyle={styles.inputstyle}
                        containerStyle={styles.textinput}
                        onChangeText={value => setCity(value)}
                        label="CITY" />



                    <Input value={State}
                        ref={ref_state}
                        //  onFocus={() => setEnableShift(true)}
                        inputContainerStyle={styles.inputstyle}
                        containerStyle={styles.textinput}
                        onChangeText={value => setState(value)}
                        label="STATE" />





                    <View style={styles.customButton}>


                        <TouchableWithoutFeedback onPress={() => addAddress()}>
                            <View style={{ paddingVertical: hp('2%'), marginHorizontal: wp('2%'), backgroundColor: color.blue, alignItems: 'center', justifyContent: 'center' }}>

                                <Text style={{ color: '#fff', marginLeft: wp('1.5%') }}>SAVE</Text>

                            </View>
                        </TouchableWithoutFeedback>


                    </View>
                </View>

            </KeyboardAvoidingView>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: hp('1.5%')
    },
    customButton: {

        paddingVertical: 0,
        width: '100%'

        //  position: 'absolute',
        // bottom: 0
    },
    textinput: {
        height: 70
    },
    inputstyle: {
        height: 35
    }
});

export default Contact;
