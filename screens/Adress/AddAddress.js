

import React, { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, TextInput, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import color from '../../style/color';
import { Input } from 'react-native-elements';
import * as AddressAction from '../../store/actions/AddressAction';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const AddAdress = ({ navigation }) => {
    const userdata = useSelector(state => state.user.UserData);
    const dispatch = useDispatch();
    const [CustomeName, setCustomerName] = useState();
    const [PhoneNumber, setPhoneNumber] = useState();
    const [House, setHouse] = useState();
    const [Street, setStreet] = useState();
    const [City, setCity] = useState();
    const [Landmark, setLandmark] = useState();
    const [State, setState] = useState();
    const [PinCode, setPinCode] = useState();
    const [enableShift, setEnableShift] = useState(false);

    const ref_phone = useRef();
    const ref_house = useRef();
    const ref_street = useRef();
    const ref_city = useRef();
    const ref_landmark = useRef();
    const ref_state = useRef();
    const ref_pincode = useRef();

    const addAddress = () => {

        dispatch(AddressAction.creatAddress(CustomeName, PhoneNumber, House, Street, userdata.userData._id, City, Landmark, State, PinCode));

        navigation.pop();
    }


    return (

        <KeyboardAvoidingView

            behavior="position"
            enabled={enableShift}
            style={styles.container}
        >
            <View>


                <Input value={CustomeName}
                    onSubmitEditing={() => ref_phone.current.focus()}
                    returnKeyType={"next"}
                    inputContainerStyle={styles.inputstyle}
                    onFocus={() => setEnableShift(false)}
                    containerStyle={styles.textinput}
                    onChangeText={value => setCustomerName(value)}
                    label="CUSTOMER NAME" />

                <Input value={PhoneNumber}
                    ref={ref_phone}
                    onSubmitEditing={() => ref_house.current.focus()}
                    returnKeyType={"next"}
                    keyboardType='phone-pad'
                    inputContainerStyle={styles.inputstyle}
                    onFocus={() => setEnableShift(false)}
                    containerStyle={styles.textinput}
                    onChangeText={value => setPhoneNumber(value)}
                    label="PHONE NUMBER" />

                <Input value={House}
                    ref={ref_house}
                    returnKeyType={"next"}
                    onSubmitEditing={() => ref_street.current.focus()}
                    inputContainerStyle={styles.inputstyle}
                    onFocus={() => setEnableShift(false)}
                    containerStyle={styles.textinput}
                    onChangeText={value => setHouse(value)}
                    label="FLAT/HOUSE NO/BUILDING" />

                <Input value={Street}
                    ref={ref_street}
                    onSubmitEditing={() => ref_city.current.focus()}
                    returnKeyType={"next"}
                    inputContainerStyle={styles.inputstyle}
                    containerStyle={styles.textinput}
                    onFocus={() => setEnableShift(false)}
                    onChangeText={value => setStreet(value)}
                    label="STREET/COLONY" />

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Input value={City}
                            onSubmitEditing={() => ref_landmark.current.focus()}
                            ref={ref_city}
                            onFocus={() => setEnableShift(true)}
                            returnKeyType={"next"}
                            inputContainerStyle={styles.inputstyle}
                            containerStyle={styles.textinput}
                            onChangeText={value => setCity(value)}
                            label="CITY" />

                    </View>

                    <View style={{ flex: 1 }}>
                        <Input value={Landmark}
                            onSubmitEditing={() => ref_state.current.focus()}
                            ref={ref_landmark}
                            onFocus={() => setEnableShift(true)}
                            returnKeyType={"next"}
                            inputContainerStyle={styles.inputstyle}
                            containerStyle={styles.textinput}
                            onChangeText={value => setLandmark(value)}
                            label="LANDMARK" />
                    </View>

                </View>

                <View style={{ flexDirection: 'row' }}>

                    <View style={{ flex: 1 }}>
                        <Input value={State}
                            ref={ref_state}
                            onSubmitEditing={() => ref_pincode.current.focus()}
                            returnKeyType={"next"}
                            onFocus={() => setEnableShift(true)}
                            inputContainerStyle={styles.inputstyle}
                            containerStyle={styles.textinput}
                            onChangeText={value => setState(value)}
                            label="STATE" />
                    </View>

                    <View style={{ flex: 1 }}>
                        <Input value={PinCode}
                            ref={ref_pincode}
                            onFocus={() => setEnableShift(true)}
                            inputContainerStyle={styles.inputstyle}
                            containerStyle={styles.textinput}
                            onChangeText={value => setPinCode(value)}
                            label="PIN CODE" />
                    </View>

                </View>


                <View style={styles.customButton}>
                    <View style={{ flexDirection: 'row', marginHorizontal: wp('5%') }}>
                        <TouchableWithoutFeedback onPress={() => navigation.pop()}>
                            <View style={{ borderWidth: 1, borderColor: color.blue, flexDirection: 'row', paddingVertical: hp('2%'), flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>

                                <Text style={{ color: color.blue, marginLeft: wp('1.5%') }}>CANCEL</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => addAddress()}>
                            <View style={{ flexDirection: 'row', paddingVertical: hp('2%'), flex: 1, marginLeft: wp('2%'), backgroundColor: color.blue, alignItems: 'center', justifyContent: 'center' }}>

                                <Text style={{ color: '#fff', marginLeft: wp('1.5%') }}>ADD ADDRESS</Text>

                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                </View>
            </View>
        </KeyboardAvoidingView>


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

export default AddAdress;
