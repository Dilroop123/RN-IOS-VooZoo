

import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, TouchableWithoutFeedback } from 'react-native';
import color from '../../style/color';
import baseUrl from '../../constants/baseUrl';
import { SliderBox } from 'react-native-image-slider-box';
import Icon from 'react-native-vector-icons/Ionicons';

//const Slider = ({ navigation, sliderimages }) => {
const Slider = React.memo(props => {
    const slideArray = [];

    if (props.sliderimages.length > 0) {

        for (const key in props.sliderimages) {

            slideArray.push(

                baseUrl.url + 'api/download?privateUrl=' + props.sliderimages[key].sliderImage[0].privateUrl

            );
        }
    }

    return (

        <View style={styles.container}>


            <SliderBox dotColor={color.blue} sliderBoxHeight={170}
                images={slideArray}
            // autoplay
            // circleLoop

            />

        </View>
    );
});

const styles = StyleSheet.create({
    container: {

        marginTop: 5
    }
});





export default React.memo(Slider)