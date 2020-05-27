import React from 'react';
import {View, Text} from 'react-native';
import {errors} from '../styles';

const Error = ({errorText}) => {
    return (
        <View style={errors.errorWrapper}>
            <Text style={errors.errorText}>{errorText}</Text>
        </View>
    );
};

export default Error;
