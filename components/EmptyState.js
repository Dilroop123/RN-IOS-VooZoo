
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import color from '../style/color';

// EmptyState Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
        width: 80,
        height: 80,
        borderRadius: 40,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'white',
    },
    title: {
        marginBottom: 16,
        fontSize: 18,
        color: 'black',
    },
    message: {
        paddingHorizontal: 56,
        paddingBottom: 16,
        fontSize: 14,
        textAlign: 'center',
        color: 'black'
    },
});

// EmptyState Props
type Props = {
    showIcon: boolean,
    iconName: string,
    title: string,
    message: string,
};

// EmptyState
const EmptyState = ({
    showIcon,
    iconName,
    title = 'Empty State Title',
    message = 'Empty State Message',
}: Props) => (
        <View style={styles.container}>
            {showIcon && (
                <View style={styles.iconContainer}>
                    <Icon name={iconName} size={32} color={color.blue} />
                </View>
            )}

            <Text style={styles.title}>{title}</Text>

            <Text style={styles.message}>{message}</Text>
        </View>
    );

export default EmptyState;
