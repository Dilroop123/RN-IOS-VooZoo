

import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableWithoutFeedback, View, Text } from 'react-native';
import color from '../style/color';
import * as ReviewAction from '../store/actions/ReviewsAction';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ProductCatalogReviews from './ProductCatalogReviews';

import { useSelector, useDispatch } from 'react-redux';

const AllCatalogReviews = ({ navigation, route }) => {

    var productReviews;

    const { itemcategory } = route.params;
    const { productId } = route.params;
    if (productId == 'false') {
        productReviews = useSelector(state => state.review.alreviewItemcat);
    } else {
        productReviews = useSelector(state => state.review.allreviewProduct);
    }

    const dispatch = useDispatch();


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            if (productId == 'false') {
                await dispatch(ReviewAction.fetchAllItemCategoryReviews(itemcategory))
            } else {
                await dispatch(ReviewAction.fetchAllProductReviews(itemcategory, productId))
            }



        });


    }, [dispatch]);

    return (
        <ScrollView alwaysBounceVertical={true}
            showsVerticalScrollIndicator={false}
            bounces={true}

        >
            <ProductCatalogReviews reviewCategory={productReviews} />


        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {

    },

});

export default AllCatalogReviews;
