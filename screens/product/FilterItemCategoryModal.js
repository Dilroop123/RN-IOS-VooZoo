import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, Alert, StyleSheet, FlatList, ToastAndroid, ScrollView, Image, Button, View, Text, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import color from '../../style/color';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { Card, ListItem } from 'react-native-elements';

import * as FilterAction from '../../store/actions/FiltersAction';
import * as CategoryAction from '../../store/actions/CategoryAction';
import Modal from 'react-native-modal';
import baseUrl from '../../constants/baseUrl';

let SelectedEmpoloy = [];

const FilterItemCategoryModal = ({ showFilterModal, toggleFilterModal, filterList, itemCatId }) => {

    const TotalCategory = useSelector(state => state.category.CategoryData);
    const userdata = useSelector(state => state.user.UserData);
    const [length, setLength] = useState(0);

    const [refreshValue, setRefreshValue] = useState(false);
    const [filterListData, setFilterListData] = useState();
    const [todos, setTodos] = useState();
    let renderFilterListKey = [];


    useEffect(() => {
        SelectedEmpoloy = [];
        for (var index in filterList) {
            renderFilterListKey.push({
                text: filterList[index].filtername, key: filterList[index]._id, primary: index == 0 ? true : false
            })


        }




        setTodos(renderFilterListKey);
        var filterFirstvalue = [];

        if (filterList.length > 0) {
            for (var innerIndex in filterList[0].filterdata) {
                filterFirstvalue.push({
                    name: filterList[0].filterdata[innerIndex],
                    active: false
                });
            }
        }
        setFilterListData(filterFirstvalue)


    }, [])


    const dispatch = useDispatch();


    const loadData = () => {
        dispatch(CategoryAction.fetchFilterProduct(SelectedEmpoloy, itemCatId));
        closeModel();


    }

    const selectedCard = useCallback(
        (item) => {
            const index = todos.indexOf(item);
            const activeIndex = todos.findIndex((e) => e.primary === true);

            if (activeIndex == -1) {
                item.primary = true;
                setRefreshValue(!refreshValue);

            }
            else if (activeIndex !== index && activeIndex > -1) {
                todos[activeIndex].primary = false;
                item.primary = true;
                setRefreshValue(!refreshValue);

            }


            for (var indexof in filterList) {

                if (filterList[indexof]._id == item.key) {
                    var filtervalue = [];
                    for (var innerIndex in filterList[indexof].filterdata) {
                        var flagvalue = SelectedEmpoloy.includes(filterList[indexof].filterdata[innerIndex]);
                        filtervalue.push({
                            name: filterList[indexof].filterdata[innerIndex],
                            active: flagvalue
                        });
                    }


                    setFilterListData(filtervalue);
                }
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

            SelectedEmpoloy.push(item.name);

        }
        else if (!activeIndex.includes(index)) {

            item.active = true;
            setRefreshValue(!refreshValue);

            SelectedEmpoloy.push(item.name);


        }
        else if (activeIndex.includes(index)) {

            item.active = false;

            var removeItemindex = SelectedEmpoloy.indexOf(item.name);

            if (removeItemindex > -1) {
                SelectedEmpoloy.splice(removeItemindex, 1);
            }



            setRefreshValue(!refreshValue);
        }




    }

    const resetFilter = () => {

        SelectedEmpoloy = [];
        for (var index in filterListData)

            if (filterListData[index].active = true) {
                filterListData[index].active = false;

            }
        setRefreshValue(!refreshValue);
        //  dispatch(FilterAction.fetchFilterData([], userdata.userData._id));

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
                                keyExtractor={item => item.name}
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

export default FilterItemCategoryModal
