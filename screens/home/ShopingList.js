

import React, { useCallback } from 'react';
import { StyleSheet, Image, View, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import color from '../../style/color';
import Icon from 'react-native-vector-icons/Ionicons';
import baseUrl from '../../constants/baseUrl';
import { Card, ListItem, Button } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const ShopingList = React.memo(({ navigation, navigateTo, catdata }) => {






    const renderItems = useCallback(({ item }) => (
        <TouchableWithoutFeedback onPress={() => navigateTo(item.id, item.headerImage, item.name)}>
            <Card containerStyle={styles.cardcontainer}>


                <View style={{ height: hp('17.5%') }}>
                    <Image style={styles.imagestyle} source={{ uri: baseUrl.url + 'api/download?privateUrl=' + item.image }} />
                </View>

                <View style={{}}>
                    <Text style={{ textAlign: 'center' }}>{item.name}</Text>
                    <Text style={{ textAlign: 'center', color: color.blue }}>{item.count}</Text>
                </View>


            </Card>
        </TouchableWithoutFeedback>
    ), []);

    return (

        <View style={styles.container}>
            <FlatList
                numColumns={3}
                data={catdata}
                keyExtractor={item => item.id}
                renderItem={renderItems}
                contentContainerStyle={styles.productList}
            />

        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: wp('1.2%'),

    },
    cardcontainer: {
        marginHorizontal: wp('0.7%'),
        width: wp('31.1%'),
        padding: 0,

        marginTop: hp('0.8%')
    },
    imagestyle: {
        width: undefined,
        height: undefined,
        aspectRatio: 1
    }

});



export default React.memo(ShopingList)

