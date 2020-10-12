import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import Splash from '../screens/boarding/Splash';
import Boarding from '../screens/boarding/Boarding';
import GenerateOtp from '../screens/otp/GenerateOtp';
import { useSelector, useDispatch } from 'react-redux';
import VerifyOtp from '../screens/otp/VerifyOtp';
import Gender from '../screens/boarding/Gender';
import { Card, Badge, withBadge } from 'react-native-elements';
import Home from '../screens/home/home';
import Account from '../screens/account/Account';
import SubCategory from '../screens/SubCategory/SubCategory';
import ItemCategory from '../screens/ItemCategory/ItemCategory';
import VideoTest from '../screens/videoTest';
import Cart from '../screens/cart/Cart';
import AddAdress from '../screens/Adress/AddAddress';
import AddressList from '../screens/Adress/AddressList';
import ProductList from '../screens/product/productList';
import ProductDetail from '../screens/product/productDetail/index';
import Address from '../screens/Adress/Address';
import OrderSummary from '../screens/order/orderSummary';
import color from '../style/color';
import Margin from '../screens/margin/index';
import EditAddress from '../screens/Adress/EditAddress';
import Contact from '../screens/profile/contact';
import Personal from '../screens/profile/personal';
import Wish from '../screens/wishList/wish';
import SocialShare from '../screens/socialShare/socailShare';
import OrderPlaced from '../screens/order/orderPlaced';
import MyOrders from '../screens/order/MyOrders';
import OrderDetail from '../screens/order/OrderDetail';
import AddReview from '../screens/reviews/AddReview';
import AllCatalogReviews from '../components/AllCatalogReviews';
import Description from '../screens/product/productDetail/productMoreDetailTopBar/Description';
import Specification from '../screens/product/productDetail/productMoreDetailTopBar/Specification';
import TopHeaderBar from '../screens/product/productDetail/productMoreDetailTopBar/TopHeaderBar';



const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const TabTop = createMaterialTopTabNavigator();

function HomeBottomTabs() {
  return (
    <Tab.Navigator
      activeColor={color.blue}
      style={{ backgroundColor: 'tomato' }}
      barStyle={{ backgroundColor: '#fff' }}
    >
      <Tab.Screen name="Home" component={Home}

        options={{
          tabBarLabel: 'For You',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />


      <Tab.Screen name="Orders" component={MyOrders}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="gift" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen name="Help" component={VideoTest}
        options={{
          tabBarLabel: 'Help',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="help-box" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen name="Account" component={Account}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function MyTopTabs() {
  return (
    <TabTop.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#000',
        indicatorStyle: { backgroundColor: color.blue },
        labelStyle: { fontSize: 12 },
        style: { backgroundColor: '#fff' },
      }}
    >
      <TabTop.Screen
        name="Contact"
        component={Contact}
        options={{ tabBarLabel: 'Contact' }}
      />
      <TabTop.Screen
        name="Personal"
        component={Personal}
        options={{ tabBarLabel: 'Personal' }}
      />

    </TabTop.Navigator>
  );
}


function MyWishShareList() {
  return (
    <TabTop.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#000',
        indicatorStyle: { backgroundColor: color.blue },
        labelStyle: { fontSize: 12 },
        style: { backgroundColor: '#fff' },
      }}
    >
      <TabTop.Screen
        name="Wish"
        component={Wish}
        options={{ tabBarLabel: 'Wish' }}
      />
      <TabTop.Screen
        name="SocialShare"
        component={SocialShare}
        options={{ tabBarLabel: 'SocialShare' }}
      />

    </TabTop.Navigator>
  );
}



function ProductHighlight() {

  return (
    <View style={{
      flex: 1
    }}>
      <TopHeaderBar />
      <TabTop.Navigator
        initialRouteName="Feed"
        tabBarOptions={{
          activeTintColor: '#000',
          indicatorStyle: { backgroundColor: color.blue },
          labelStyle: { fontSize: 12 },
          style: { backgroundColor: '#fff' },
        }}
      >
        <TabTop.Screen
          name="Description"

          options={{ tabBarLabel: 'Description' }}
        >
          {(props) => <Description  {...props} />}
        </TabTop.Screen>
        <TabTop.Screen
          name="Specifications"
          component={Specification}
          options={{ tabBarLabel: 'Specifications' }}
        />

      </TabTop.Navigator>
    </View>
  );
}





function HomeStack() {
  const batchicon = useSelector(state => state.cart.BatchIcon);
  return (
    <Stack.Navigator screenOptions={{

      headerTintColor: 'gray',
      headerTitleAlign: 'left',
      headerTitleStyle: {

        fontSize: 16
      },
      headerTitleStyle: {
        textAlign: "center"
      },
    }}>
      <Stack.Screen name="Home" component={HomeBottomTabs}
        options={({ navigation, route }) => ({
          headerTitle: 'VooZoo',
          headerLeft: null,
          headerTintColor: color.blue,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24
          },
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
          ),
        })}

      />
      <Stack.Screen name="SubCategory" component={SubCategory} options={({ route }) => ({ title: route.params.screenTitle })} />
      <Stack.Screen name="ItemCategory" component={ItemCategory} options={({ route }) => ({ title: route.params.screenTitle })} />
      <Stack.Screen name="ProductList" component={ProductList} options={({ route }) => ({ title: route.params.screenTitle })} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} options={({ route }) => ({ title: 'Product Detail' })} />
      <Stack.Screen name="MainContainer" component={ProductHighlight} options={({ route }) => ({ title: 'Product Reviews' })} />
      <Stack.Screen name="AllCatalogReviews" component={AllCatalogReviews} options={({ route }) => ({ title: 'Product Reviews' })} />
      <Stack.Screen name="Cart" component={Cart} options={({ route }) => ({ title: 'Cart' })} />
      <Stack.Screen name="Margin" component={Margin} options={({ route }) => ({ title: 'Add Margin' })} />
      <Stack.Screen name="Wish" component={MyWishShareList} />
      <Stack.Screen name="Address" options={({ route }) => ({ title: 'Select Address' })} component={Address} />
      <Stack.Screen name="AddAdress" component={AddAdress} />
      <Stack.Screen name="EditAddress" component={EditAddress} />
      <Stack.Screen name="OrderSummary" component={OrderSummary} />
      <Stack.Screen name="OrderPlaced" component={OrderPlaced} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} options={({ route }) => ({ title: 'Order Detail' })} />
      <Stack.Screen name="AddReview" component={AddReview} options={({ route }) => ({ title: 'Add Review' })} />
      <Stack.Screen name="EditProfile" component={MyTopTabs} />
    </Stack.Navigator>
  );
}






export default function MyStack() {
  return (
    <Stack.Navigator screenOptions={{

      headerTintColor: 'gray',
      headerTitleAlign: 'center',
      headerTitleStyle: {

        fontSize: 16
      },
    }}>
      <Stack.Screen name="Splash" options={{ headerShown: false }} component={Splash} />
      <Stack.Screen name="Boarding" options={{ headerShown: false }} component={Boarding} />
      <Stack.Screen name="GenerateOtp" component={GenerateOtp} options={({ route }) => ({ title: 'Enter your mobile number' })} />
      <Stack.Screen name="VerifyOtp" options={{ headerShown: false }} component={VerifyOtp} />
      <Stack.Screen name="Gender" options={{ headerShown: false }} component={Gender} />
      <Stack.Screen name="BottomTabs" options={{ headerShown: false }} component={HomeStack} />

    </Stack.Navigator>
  );
}