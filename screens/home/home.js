

import React, { useEffect, useState, useFocusEffect } from 'react';
import { StyleSheet, RefreshControl, FlatList, ScrollView, Button, Image, View, Text, TouchableWithoutFeedback } from 'react-native';
import color from '../../style/color';
import Slider from './Slider';
import ShopingList from './ShopingList';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { Badge, withBadge } from 'react-native-elements';
import * as CategoryAction from '../../store/actions/CategoryAction';
import * as CartAction from '../../store/actions/CartAction'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import FilterModal from './FilterModal';
import WhishListFavButton from '../ItemCategory/WhishListFavButton';
import ItemCategoryImages from '../ItemCategory/ItemCategoryImages';
import ItemBasicDetails from '../ItemCategory/ItemBasicDetails';
import { Card, ListItem } from 'react-native-elements'
import FilterDataList from './FilterDataList';


const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const Home = ({ navigation }) => {
  const TotalCategory = useSelector(state => state.category.CategoryData);
  const SliderImages = useSelector(state => state.category.SliderData);
  const homeCatData = useSelector(state => state.category.HomeItemCategory);
  const userdata = useSelector(state => state.user.UserData);
  const filters = useSelector(state => state.filters.FilterDataList);

  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);


  const toggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  }





  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(CartAction.setBatchIcon(userdata.userData._id))
      dispatch(CategoryAction.fetchCategory())
      dispatch(CategoryAction.fetchSliderImages())
      dispatch(CategoryAction.fetchHomeLatestItemCategory())
    });


  }, [dispatch]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);



  const navigateToScreen = (id, headerimage, name) => {

    navigation.navigate('SubCategory', { catId: id, headerimage, screenTitle: name });
  }

  const navigateTo = (catId, subCatId, id, name, addOnPrice, gstPercent, voozooProfit, discount, cod, filterList) => {


    navigation.navigate('ProductList', { catId, subCatId, itemCatId: id, screenTitle: name, addOnPrice, gstPercent, voozooProfit, discount, cod, filterList });
  }


  return (
    <View style={{ flex: 1 }}>
      <ScrollView alwaysBounceVertical={true}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: '#fff' }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }

      >
        <View style={styles.container}>

          {/*SEARCH BAR */}
          <View style={styles.SearchContainer}>
            <Icon name="search-outline" size={15} color="gray" />
            <Text style={styles.textseacrh}>Try Saree,Kurti or Search by Product Code</Text>
          </View>


          {/*IMAGE SLIDER*/}
          <Slider sliderimages={SliderImages} />

          {/*SHOPING LIST */}
          {filters.length == 0 ?
            <View>
              <ShopingList catdata={TotalCategory} navigateTo={navigateToScreen} />
              <FilterDataList filters={homeCatData} navigateTo={navigateTo} />
            </View>
            : null}



          <FilterDataList filters={filters} navigateTo={navigateTo} />

          {/* <LatestItemCategoryList listData={homeCatData} navigateTo={navigateTo} /> */}

          {/* */}
          <FilterModal showFilterModal={showFilterModal} toggleFilterModal={toggleFilterModal} />

        </View>
      </ScrollView>

      <View style={styles.catalogContainer}>
        <Text style={styles.textseacrh}>Showing All Catalogs</Text>
        <TouchableWithoutFeedback onPress={() => setShowFilterModal(!showFilterModal)}>
          <View style={{ flexDirection: 'row' }}>
            <Icon name="filter" size={18} color={color.blue} />
            {filters.length > 0 ?
              <Badge containerStyle={{ position: 'absolute', top: -9, right: -5, zIndex: 1 }} value='1' status="error" />

              : null}

            <Text style={{ color: color.blue, marginLeft: 5 }}>FILTERS</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  textseacrh: {
    color: 'gray',
    marginLeft: wp('2%')
  },

  SearchContainer: {
    flexDirection: 'row',
    paddingLeft: wp('4%'),
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: color.gray,
    paddingVertical: hp('1%'),
    marginHorizontal: wp('5%'),
    marginTop: 5
  },
  catalogContainer: {

    paddingRight: 25,
    width: '100%',

    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: color.gray,
    paddingVertical: hp('1.6%'),
    marginTop: hp('1%'),
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff'

  },
  griditem: {
    flexDirection: 'row'
  }
});

export default Home;
