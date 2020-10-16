

import React, { useEffect, useState } from 'react';
import { StyleSheet, RefreshControl, ScrollView, Image, View, Text, TouchableWithoutFeedback } from 'react-native';
import color from '../../style/color';
import WishList from './wishList';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as WishListAction from '../../store/actions/WishListAction';

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const Wish = ({ navigation, route }) => {

    const userdata = useSelector(state => state.user.UserData);
    const dispatch = useDispatch();
    //const { catId } = route.params;
    // const { subCatId } = route.params;
    const [refreshing, setRefreshing] = useState(false);

    const TotalItemCategory = useSelector(state => state.wish.wishListData);

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

                        onPress={() => console.log('hello')} />
                    <Icon
                        style={{ marginLeft: wp('2.5%'), marginRight: wp('2.5%') }}
                        name='cart-outline'
                        type='font-awesome'
                        size={23}
                        color={color.blue}

                        onPress={() => navigation.navigate('Cart')} />
                </View>
            ),

        });
    }, [navigation]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(WishListAction.ViewWishlist(userdata.userData._id))
        });


    }, [dispatch]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => setRefreshing(false));
    }, []);

    const navigateToScreen = (item) => {

        navigation.navigate('ProductList', { catId: item.itemCategoryId.categoryId, subCatId: item.itemCategoryId.subCategoryId, itemCatId: item.itemCategoryId._id, screenTitle: item.itemCategoryId.name, addOnPrice: item.itemCategoryId.addOnPrice, gstPercent: item.itemCategoryId.gstPercent, voozooProfit: item.itemCategoryId.voozooProfit, discount: item.itemCategoryId.discount, cod: item.itemCategoryId.cod });
    }
    return (

        <View style={styles.container}>



            <WishList navigateTo={navigateToScreen} hideFavButton={true} itemCatData={TotalItemCategory} />

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default Wish;
