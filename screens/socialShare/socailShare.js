

import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import color from '../../style/color';
import WishList from '../wishList/wishList';
import { useSelector, useDispatch } from 'react-redux';
import * as  SocialShareAcrtion from '../../store/actions/SocialShareAction';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const SocialShare = ({ navigation, route }) => {

    const userdata = useSelector(state => state.user.UserData);
    const dispatch = useDispatch();
    //const { catId } = route.params;
    // const { subCatId } = route.params;
    const [refreshing, setRefreshing] = useState(false);

    const TotalItemSoicalShareCategory = useSelector(state => state.socialShare.socialShareData);

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
            dispatch(SocialShareAcrtion.ViewSocailShare(userdata.userData._id))
        });


    }, [dispatch]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => setRefreshing(false));
    }, []);

    const navigateToScreen = (item) => {
        //  console.log(item);
        navigation.navigate('ProductList', { catId: item.itemCategoryId.categoryId, subCatId: item.itemCategoryId.subCategoryId, itemCatId: item.itemCategoryId._id, screenTitle: item.itemCategoryId.name, addOnPrice: item.itemCategoryId.addOnPrice, gstPercent: item.itemCategoryId.gstPercent, voozooProfit: item.itemCategoryId.voozooProfit, discount: item.itemCategoryId.discount, cod: item.itemCategoryId.cod });
    }
    return (

        <View style={styles.container}>



            <WishList navigateTo={navigateToScreen} hideFavButton={false} itemCatData={TotalItemSoicalShareCategory} />

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default SocialShare;
