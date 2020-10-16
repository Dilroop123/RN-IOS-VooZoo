

import React, { useEffect, useState } from 'react';
import { StyleSheet, RefreshControl, ScrollView, Image, View, Text, TouchableWithoutFeedback } from 'react-native';
import color from '../../style/color';
import ItemCategoryList from './ItemCategoryList';
import { HeaderBackButton } from "@react-navigation/stack";
import { Card, Badge, withBadge } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as CategoryAction from '../../store/actions/CategoryAction';
import FilterItemCategoryModal from './FilterItemCategoryModal';



const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const ItemCategory = ({ navigation, route }) => {

  const userdata = useSelector(state => state.user.UserData);
  const batchicon = useSelector(state => state.cart.BatchIcon);

  const dispatch = useDispatch();

  const [showFilterModal, setShowFilterModal] = useState(false);

  const { catId } = route.params;
  const { subCatId } = route.params;
  const { filterList } = route.params;

  const [refreshing, setRefreshing] = useState(false);

  const TotalItemCategory = useSelector(state => state.category.ItemCategoryData);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon

            name='search-outline'
            type='font-awesome'
            size={23}
            color={color.blue}

            onPress={() => console.log('helgtylo')} />
          <Icon
            style={{ marginLeft: wp('2.5%') }}
            name='heart-outline'
            type='font-awesome'
            size={23}
            color={color.blue}

            onPress={() => navigation.navigate('Wish')} />
          <View>
            <Badge containerStyle={{ position: 'absolute', top: -9, right: 1, zIndex: 1 }} value={batchicon} status="error" />

            <Icon
              style={{ marginLeft: wp('2.5%'), marginRight: wp('2.5%') }}
              name='cart-outline'
              type='font-awesome'
              size={23}
              color={color.blue}

              onPress={() => navigation.navigate('Cart')} />
          </View>
        </View>
      ), headerLeft: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <HeaderBackButton onPress={() => moveBack()} />
          <Icon
            style={{ paddingRight: wp('17.5%') }}
            name='home-outline'
            type='font-awesome'
            size={23}
            color='black'

            onPress={() => navigation.navigate('Home')} />

        </View>
      ),

    });
  }, [navigation, batchicon]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(CategoryAction.fetchItemCategory(catId, subCatId, userdata.userData._id))
    });


  }, [dispatch]);


  const moveBack = () => {
    dispatch(CategoryAction.clearItemCategory())
    navigation.pop();

  }
  const toggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  }


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  const navigateToScreen = (id, name, addOnPrice, gstPercent, voozooProfit, discount, cod) => {

    navigation.navigate('ProductList', { catId, subCatId, itemCatId: id, screenTitle: name, addOnPrice, gstPercent, voozooProfit, discount, cod });
  }

  const navigatetoproduct = () => {
    navigation.navigate('ProductList', { catId: undefined, subCatId: undefined, itemCatId: undefined, screenTitle: 'name', addOnPrice: undefined, gstPercent: undefined, voozooProfit: undefined, discount: undefined, cod: undefined });
  }

  return (

    <View style={styles.container}>

      <View style={styles.catalogContainer}>
        <Text style={styles.textseacrh}>Showing All Catalogs</Text>
        <TouchableWithoutFeedback onPress={() => setShowFilterModal(!showFilterModal)}>
          <View style={{ flexDirection: 'row' }}>
            <Icon name="filter" size={18} color={color.blue} />
            {/*           
              <Badge containerStyle={{ position: 'absolute', top: -9, right: -5, zIndex: 1 }} value='1' status="error" /> */}



            <Text style={{ color: color.blue, marginLeft: 5 }}>FILTERS</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>



      <ItemCategoryList navigateTo={navigateToScreen} itemCatData={TotalItemCategory} />
      <FilterItemCategoryModal navigatetoproduct={navigatetoproduct} filterList={filterList} showFilterModal={showFilterModal} toggleFilterModal={toggleFilterModal} />

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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
    backgroundColor: '#fff'

  }, textseacrh: {
    color: 'gray',
    marginLeft: wp('2%')
  },

});

export default ItemCategory;
