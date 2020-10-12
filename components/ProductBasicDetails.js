import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Image, View, Text, StatusBar, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import color from '../style/color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';




const ProductBasicDetails = React.memo(({ navigation, route, item, catdataobj }) => {



    var totalAddOnPrice = 0;
    var addOnPrice = (catdataobj.addOnPrice / 100) * item.productPrice;
    addOnPrice = item.productPrice + addOnPrice;
    var gstPercent = (catdataobj.gstPercent / 100) * addOnPrice;
    gstPercent = addOnPrice + gstPercent;
    totalAddOnPrice = totalAddOnPrice + Math.round(gstPercent);



    var NormalPrice = 0;
    var VooZooProfit = (catdataobj.voozooProfit / 100) * item.productPrice;
    VooZooProfit = item.productPrice + VooZooProfit;
    var discountper = (catdataobj.discount / 100) * VooZooProfit;
    discountper = VooZooProfit - discountper;
    NormalPrice = NormalPrice + Math.round(discountper);

    var itemOff = 0;
    var totalpercentOff = (totalAddOnPrice - NormalPrice) / totalAddOnPrice * 100;
    itemOff = itemOff + Math.round(totalpercentOff);




    return (

        <View style={styles.container}>
            <View style={{ marginLeft: wp('5%') }}>
                <Text style={{ marginTop: hp('1%') }}>{item.title}</Text>
                <View style={{ marginTop: hp('1%'), flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Text>₹ {NormalPrice}</Text>
                    <Text style={{ fontSize: 11, marginLeft: wp('2%'), textDecorationLine: 'line-through', color: 'gray' }}>{totalAddOnPrice}</Text>
                    <Text style={{ color: color.pink, marginLeft: wp('2%'), fontSize: 11 }}>{itemOff} off</Text>
                </View>


                <View style={{ marginTop: hp('1%'), paddingVertical: hp('0.2%'), paddingHorizontal: wp('1%'), backgroundColor: '#ffe3fb', width: wp('38%'), flexDirection: 'row', alignItems: 'center' }} >
                    <Icon name='dump-truck' type='MaterialCommunityIcons' size={20} color={color.pink} />
                    <View style={{ marginLeft: wp('2%') }}>
                        {catdataobj.cod ? <Text style={{ color: color.pink, fontSize: 11 }}>COD AVALIABLE</Text> :
                            <Text style={{ color: color.pink, fontSize: 11 }}>COD NOT AVALIABLE</Text>
                        }

                    </View>
                </View>
            </View>

        </View>
    );
});

const styles = StyleSheet.create({
    container: {

    }
});

export default React.memo(ProductBasicDetails);

