

import React, { useCallback } from 'react';
import { StyleSheet, Image, View, Text, FlatList, TouchableWithoutFeedback } from 'react-native';

import { Card } from 'react-native-elements'
import baseUrl from '../../constants/baseUrl';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';




const SubCategoryList = React.memo(({ navigation, navigateTo, subCatData }) => {


    const renderItems = useCallback(({ item }) => (
        <TouchableWithoutFeedback onPress={() => navigateTo(item.id, item.name, item.filterlist)}>
            <Card containerStyle={styles.cardconatiner}>


                <View style={{ height: hp('20.5%') }}>
                    <Image style={styles.imageview} source={{ uri: baseUrl.url + 'api/download?privateUrl=' + item.image }} />
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Text>{item.name}</Text>
                    <Text>999</Text>
                </View>


            </Card>
        </TouchableWithoutFeedback>
    ), []);

    return (

        <View style={styles.container}>
            <FlatList
                numColumns={3}
                data={subCatData}
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
        paddingHorizontal: wp('1.2%')
    },
    cardconatiner: {
        marginHorizontal: wp('0.7%'),
        width: wp('31.1%'),
        padding: 0,
        marginTop: hp('0.8%')
    },
    imageview: {
        width: undefined,
        height: undefined,
        aspectRatio: 1
    }

});

const areEqual = (prevProps, nextProps) => {
    // return false prevProps.text & nextProps.text are not equal.
    return prevProps.subCatData === nextProps.subCatData
    // else all are equal, no re-render
    return true
}

export default React.memo(SubCategoryList, areEqual)

