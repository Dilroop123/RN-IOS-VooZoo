

import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, TouchableWithoutFeedback } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const WhishListFavButton = React.memo(({ addToWishList, item }) => {



    return (

        <View style={styles.container}>



            <TouchableWithoutFeedback onPress={() => addToWishList(item)}>
                <View style={styles.heartIcon}>
                    {item.wishlist ? <Icon name="heart" color="red" size={25} /> :
                        <Icon name="heart-outline" color="red" size={25} />}

                </View>
            </TouchableWithoutFeedback>

        </View>
    );
});

const styles = StyleSheet.create({
    container: {

    },
    heartIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
        height: 40,
        width: 40,
        backgroundColor: '#fff',
        zIndex: 1,
        position: 'absolute',
        top: 10,
        right: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1
    }
});



export default React.memo(WhishListFavButton)

