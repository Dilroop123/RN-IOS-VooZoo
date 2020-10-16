import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, Alert, StyleSheet, FlatList, ToastAndroid, ScrollView, Image, Button, View, Text, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import color from '../../style/color';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { Card, ListItem } from 'react-native-elements';

import * as FilterAction from '../../store/actions/FiltersAction';
import Modal from 'react-native-modal';
import baseUrl from '../../constants/baseUrl';

let SelectedEmpoloy = [];
const FilterModal = ({ showFilterModal, toggleFilterModal }) => {

    const TotalCategory = useSelector(state => state.category.CategoryData);
    const userdata = useSelector(state => state.user.UserData);
    const [length, setLength] = useState(0);

    const [refreshValue, setRefreshValue] = useState(false);
    const [filterListData, setFilterListData] = useState();

    useEffect(() => {

        setFilterListData(TotalCategory)
    }, [TotalCategory])


    const dispatch = useDispatch();
    const [todos, setTodos] = useState([
        { text: 'Category', key: '2', primary: true },
        { text: 'Price', key: '3', primary: false },
        // { text: 'Rating', key: '4', primary: false }
    ]);


    var PriceList = [
        { name: '₹ 0 - ₹281', id: '1' },
        { name: '₹ 281 - ₹ 461', id: '2' },
        { name: '₹ 461 - ₹ 691', id: '3' },
        { name: '₹ 691 &Above', id: '4' }
    ]

    const loadData = () => {
        dispatch(FilterAction.fetchFilterData(SelectedEmpoloy, userdata.userData._id));
        closeModel();
    }

    const selectedCard = useCallback(
        (item) => {
            const index = todos.indexOf(item);
            const activeIndex = todos.findIndex((e) => e.primary === true);

            if (activeIndex == -1) {
                item.primary = true;
                setRefreshValue(!refreshValue);
                // dispatch(AddressAction.selectAddress(item._id));
            }
            else if (activeIndex !== index && activeIndex > -1) {
                todos[activeIndex].primary = false;
                item.primary = true;
                setRefreshValue(!refreshValue);
                //dispatch(AddressAction.selectAddress(item._id, AddressData[activeIndex]._id));
            }
            if (item.text == 'Category') {


                setFilterListData(TotalCategory);

            } else {

                setFilterListData(PriceList);
            }

        });



    const applyFilter = (item) => {

        let index = filterListData.indexOf(item);

        const activeIndex = filterListData.reduce(function (a, e, i) {
            if (e.active === true)
                a.push(i);
            return a;
        }, []);

        if (activeIndex.length == 0) {

            item.active = true;
            setRefreshValue(!refreshValue);

            SelectedEmpoloy.push(item.id);
            setLength(SelectedEmpoloy.length)
        }
        else if (!activeIndex.includes(index)) {

            item.active = true;
            setRefreshValue(!refreshValue);

            SelectedEmpoloy.push(item.id);

            setLength(SelectedEmpoloy.length)
        }
        else if (activeIndex.includes(index)) {

            item.active = false;

            var removeItemindex = SelectedEmpoloy.indexOf(item.id);

            if (removeItemindex > -1) {
                SelectedEmpoloy.splice(removeItemindex, 1);
            }


            setLength(SelectedEmpoloy.length)
            setRefreshValue(!refreshValue);
        }




    }

    const resetFilter = () => {
        SelectedEmpoloy = [];
        for (var index in filterListData)

            if (filterListData[index].active = true) {
                filterListData[index].active = false;
            }
        dispatch(FilterAction.fetchFilterData([], userdata.userData._id));

    }

    const closeModel = () => {

        toggleFilterModal();


    }
    const renderItems = ({ item }) => (
        <TouchableWithoutFeedback onPress={() => selectedCard(item)}>
            <View flex={1} onStartShouldSetResponder={() => true} style={{ backgroundColor: item.primary ? 'white' : '#f5f5f5', borderBottomWidth: 0.3, borderColor: color.gray, paddingVertical: 15, paddingHorizontal: 15 }}>
                <Text style={{ fontSize: 16, color: item.Color }}>{item.text}</Text>

            </View>
        </TouchableWithoutFeedback>
    )

    const renderItemsFilter = ({ item }) => (
        <TouchableWithoutFeedback onPress={() => applyFilter(item)}>
            <View flex={1} onStartShouldSetResponder={() => true} style={{ flexDirection: 'row', borderBottomWidth: 0.3, borderColor: color.gray, paddingVertical: 15, paddingHorizontal: 15 }}>

                {item.active ?
                    <MaterialCommunityIcons name='checkbox-marked' type='MaterialCommunityIcons' size={17} color={color.blue} />

                    : <MaterialCommunityIcons name='checkbox-blank-outline' type='MaterialCommunityIcons' size={17} color={color.blue} />}

                <Text style={{ marginLeft: 15, fontSize: 16, color: item.Color }}>{item.name}</Text>

            </View>
        </TouchableWithoutFeedback>
    )



    return (

        <View>

            <Modal propagateSwipe={true}

                customBackdrop={
                    <TouchableWithoutFeedback onPress={() => closeModel()}>
                        <View style={{ height: hp('32%'), backgroundColor: '#000' }} />
                    </TouchableWithoutFeedback>
                }

                style={styles.modalContainer} isVisible={showFilterModal}>
                <View style={{ flex: 1 }}>
                    <View style={styles.filterView}>
                        <Text style={{ fontSize: 16 }}>FILTERS</Text>
                        <Icon name='close-outline' type='Ionicons' size={24} onPress={() => closeModel()} color={color.blue} />
                    </View>

                    <View style={styles.horizonatlLine} />

                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={{ backgroundColor: '#f5f5f5', width: 130, height: '100%' }}>
                            <FlatList

                                showsHorizontalScrollIndicator={true}
                                data={todos}
                                extraData={refreshValue}
                                keyExtractor={item => item.key}
                                renderItem={renderItems}
                                contentContainerStyle={styles.productList}
                            />
                        </View>
                        <View style={{ flex: 1, marginTop: 8 }}>
                            <FlatList

                                showsHorizontalScrollIndicator={true}
                                data={filterListData}
                                extraData={refreshValue}
                                keyExtractor={item => item.id}
                                renderItem={renderItemsFilter}
                                contentContainerStyle={styles.productList}
                            />
                        </View>
                    </View>

                    <View style={styles.customButton}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableWithoutFeedback onPress={() => resetFilter()}>
                                <View style={{ borderWidth: 1, borderColor: color.blue, flexDirection: 'row', paddingVertical: hp('2.1%'), flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>

                                    <Text style={{ color: color.blue, marginLeft: wp('1.5%') }}>RESET</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => loadData()}>
                                <View style={{ flexDirection: 'row', paddingVertical: hp('2.1%'), flex: 1, backgroundColor: color.blue, alignItems: 'center', justifyContent: 'center' }}>

                                    <Text style={{ color: '#fff', marginLeft: wp('1.5%') }}>APPLY FILTERS</Text>

                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                    </View>
                </View>
            </Modal>

        </View>

    );
};

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
    modalContainer: {
        justifyContent: 'flex-end',
        marginTop: hp('25%'),
        marginHorizontal: 0,
        marginBottom: 0,
        backgroundColor: 'white'
    },
    filterView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: wp('8%'),
        marginTop: hp('3%')
    },
    horizonatlLine: {
        borderBottomColor: color.gray,
        borderBottomWidth: 1,
        marginTop: hp('2%')
    }
});

export default FilterModal
