/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React from 'react';
import {
  I18nManager,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
// import colors
//import Colors from '../../theme/colors';

// NumericKeyboard Config
const isRTL = I18nManager.isRTL;
const BACKSPACE_ICON = Platform.OS === 'ios' ? 'ios-backspace' : 'md-backspace';

// NumericKeyboard & ActionButton Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingVertical: 8,
    
  },
  keyboardButton: {
    width: '32%',
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontWeight: '300',
    fontSize: 24,
    color: 'black',
  },
  actionButtonTitle: {
    padding: 12,
    fontWeight: '500',
    fontSize: 13,
    color: 'black',
  },
});

// NumericKeyboard Props
type Props = {
  /**
   * Left action button title
   */
  actionButtonTitle: string,

  /**
   * Handler to be called when the user taps the numeric key
   * IMPORTANT: need to be defined in parent component
   */
  onPress: () => {},
};

// NumericKeyboard
const NumericKeyboard = ({actionButtonTitle, onPress = () => {}}: Props) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress('1')} style={styles.keyboardButton}>
      <Text style={styles.number}>1</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onPress('2')} style={styles.keyboardButton}>
      <Text style={styles.number}>2</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onPress('3')} style={styles.keyboardButton}>
      <Text style={styles.number}>3</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onPress('4')} style={styles.keyboardButton}>
      <Text style={styles.number}>4</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onPress('5')} style={styles.keyboardButton}>
      <Text style={styles.number}>5</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onPress('6')} style={styles.keyboardButton}>
      <Text style={styles.number}>6</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onPress('7')} style={styles.keyboardButton}>
      <Text style={styles.number}>7</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onPress('8')} style={styles.keyboardButton}>
      <Text style={styles.number}>8</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onPress('9')} style={styles.keyboardButton}>
      <Text style={styles.number}>9</Text>
    </TouchableOpacity>
    {actionButtonTitle ? (
      <TouchableOpacity
        onPress={onPress(actionButtonTitle)}
        style={styles.keyboardButton}>
        <Text style={styles.actionButtonTitle}>
          {}
        </Text>
      </TouchableOpacity>
    ) : (
      <View style={styles.keyboardButton} />
    )}
    <TouchableOpacity onPress={onPress('0')} style={styles.keyboardButton}>
      <Text style={styles.number}>0</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={onPress('backspace')}
      style={styles.keyboardButton}>
		 
      {/*<Icon name="backspace" size={24} color="#900" />*/}
    </TouchableOpacity>
  </View>
);

export default NumericKeyboard;
