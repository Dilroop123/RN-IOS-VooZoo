

import React, { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, KeyboardAvoidingView, TextInput, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import color from '../../style/color';
import { Input } from 'react-native-elements';
import * as UsserAction from '../../store/actions/UserAction';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';
import ModalSelector from 'react-native-modal-selector'
import moment from 'moment';

const Personal = ({ navigation }) => {
    const userdata = useSelector(state => state.user.UserData);
    const dispatch = useDispatch();

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [textInputValue, setTextinputValue] = useState(userdata.userData.gender);
    const [selctedDate, setSelectedDate] = useState(userdata.userData.dateOfBirth);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;

        const temp = moment(currentDate).format('YYYY-MM-DD')


        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setSelectedDate(temp);
    };

    const showMode = () => {
        setShow(true);
        setMode('date');
    };

    let data = [
        { key: 0, label: 'Male' },
        { key: 1, label: 'Female' },
        { key: 2, label: 'Others' }
    ];




    const ref_full_name = useRef();
    const ref_mobile = useRef();


    const saveUser = () => {

        dispatch(UsserAction.updateUserPersonal(userdata.userData._id, selctedDate, textInputValue));


        navigation.pop();
    }


    return (



        <View>


            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}

                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}


            <View style={{ marginHorizontal: wp('4%'), marginTop: hp('3%') }}>
                <Text style={{ fontWeight: 'bold', color: 'gray', fontSize: 16 }}>Date of Birth</Text>
                <TouchableWithoutFeedback onPress={showMode} >
                    <View style={{ borderWidth: 1, borderColor: '#000', paddingVertical: hp('2%'), paddingLeft: 20 }}>

                        {selctedDate ? <Text style={{ fontSize: 16, color: 'gray' }}>{selctedDate}</Text> :
                            <Text style={{ fontSize: 16, color: 'gray' }}> Select Date</Text>}

                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View style={{ marginTop: hp('3%'), marginHorizontal: wp('4%') }}>
                <Text style={{ fontWeight: 'bold', color: 'gray', fontSize: 16 }}> Select Gender</Text>
                <ModalSelector
                    data={data}
                    initValue="Select Gender"
                    supportedOrientations={['portrait', 'landscape']}
                    accessible={true}
                    scrollViewAccessibilityLabel={'Scrollable options'}
                    cancelButtonAccessibilityLabel={'Cancel Button'}
                    onChange={(option) => { setTextinputValue(option.label) }}>

                    <TextInput
                        style={styles.textinputcustom}
                        editable={false}
                        placeholder="Select Gender"
                        value={textInputValue} />

                </ModalSelector>

            </View>




            <View style={styles.customButton}>


                <TouchableWithoutFeedback onPress={() => saveUser()}>
                    <View style={{ paddingVertical: hp('2%'), marginTop: hp('12%'), marginHorizontal: wp('2%'), backgroundColor: color.blue, alignItems: 'center', justifyContent: 'center' }}>

                        <Text style={{ color: '#fff', marginLeft: wp('1.5%') }}>SAVE</Text>

                    </View>
                </TouchableWithoutFeedback>


            </View>

        </View >




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
        height: 100
    },
    inputstyle: {
        height: 35,
        borderWidth: 1,
        paddingVertical: 25
    },
    textinputcustom: {
        fontSize: 16,
        paddingLeft: 20,
        height: 50,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 1,


    }
});

export default Personal;
