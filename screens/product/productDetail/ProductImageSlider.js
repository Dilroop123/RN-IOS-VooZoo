import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import color from '../../../style/color';

import { SliderBox } from 'react-native-image-slider-box';

const ProductImageSlider = ({ productImagesUrl }) => {






    return (
        <View>


            <View style={{ height: hp('60.5%'), alignItems: 'center' }}>
                <View style={{ height: hp('60.5%') }}>
                    <SliderBox dotColor={color.blue} sliderBoxHeight={hp('60.5%')}
                        images={productImagesUrl}


                    />
                </View>
            </View>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

const areEqual = (prevProps, nextProps) => {



    // return prevProps.productImagesUrl === nextProps.productImagesUrl
    return true;
}

export default React.memo(ProductImageSlider, areEqual);

