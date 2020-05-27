import React from 'react';
import {View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import {titles} from '../styles/index';

let radio_props1 = [
    {label: 'Priority', value: 'priority'},
    {label: 'Title', value: 'title'},
    {label: 'Date', value: 'dueBy'},
];

let radio_props2 = [
    {label: 'Up', value: 'asc'},
    {label: 'Down', value: 'desc'},
];

import {containers, emptyState, buttons} from '../styles';
import {Navigation} from 'react-native-navigation';

export default class SortModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            option: '',
            direction: 'asc',
        };
    }


    render() {
        const {option, direction} = this.state;
        return (
            <View style={containers.mainContainer}>
                <Text style={titles.checkboxTitle}>Choose sorting option:</Text>
                <View style={containers.checkboxContainer}>
                    <RadioForm
                        radio_props={radio_props1}
                        initial={option}
                        buttonColor={'#4B0082'}
                        selectedButtonColor={'#4B0082'}
                        onPress={(value) => {
                            this.setState({option: value});
                        }}
                    />
                </View>
                <Text style={titles.checkboxTitle}>Choose direction:</Text>
                <View style={containers.checkboxContainer}>
                    <RadioForm
                        radio_props={radio_props2}
                        initial={direction}
                        buttonColor={'#4B0082'}
                        selectedButtonColor={'#4B0082'}
                        onPress={(value) => {
                            this.setState({direction: value});
                        }}
                    />
                </View>
                <View style={buttons.oneButtonContainer}>
                    <TouchableOpacity onPress={() => {
                        Navigation.updateProps(this.props.component, {
                            option: option,
                            direction: direction,
                            sort: true,
                        });

                        Navigation.dismissModal(this.props.componentId, {
                            component: {
                                passProps: {
                                    option: option,
                                    direction: direction,
                                },
                            },
                        });
                    }} style={buttons.mainButton}>
                        <Text style={buttons.mainButtonText}>Done</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
