import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

import moment from 'moment';

import {Navigation} from 'react-native-navigation';
import {goToAuth} from '../navigation';

import {getTask, deleteTask} from '../api/components/tasks';
import Error from '../components/error';

import {renderPriority} from '../utils/priority';

import {containers, mainInput, buttons, time} from '../styles';

export default class Task extends React.Component {
    constructor(props) {
        super(props);

        Navigation.events().bindComponent(this);

        this.state = {
            task: {},
            error: '',
            errorPriority: '',
            loading: true,
        };
    }

    static options(props) {
        return {
            topBar: {
                title: {
                    text: 'Task',
                },
                rightButtons: [
                    {
                        text: 'Edit',
                        id: 'TopRightButton',
                    },
                ],
                rightButtonColor: '#4B0082',
                backButton: {
                    color: '#4B0082',
                },
            },
        };
    }

    componentDidAppear() {
        this.getTaskInfo();
    }

    navigationButtonPressed({buttonId}) {
        if (buttonId === 'TopRightButton') {
            Navigation.push(this.props.componentId, {
                component: {
                    name: 'TaskEdit',
                    passProps: {
                        status: 'Edit task',
                        taskId: this.props.taskId,
                    },
                },
            });
        }
    }

    componentDidMount() {
        this.getTaskInfo();
    }

    getTaskInfo = () => {
        getTask(this.props.taskId)
            .then(response => {
                console.log(response);
                this.setState({
                    loading: false,
                    task: response.task,
                });
            }).catch(error => {
            this.setState({
                loading: false,
                error: error.message,
            });
            if (error.message === 'Expired token') {
                goToAuth();
                return;
            }
        });
    };

    deleteTask = () => {
        this.setState({
            loading: true,
        });

        deleteTask(this.props.taskId)
            .then(response => {
                this.setState({
                    loading: false,
                });
                Navigation.pop(this.props.componentId);
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    error: error.message,
                });
                if (error.message === 'Expired token') {
                    goToAuth();
                    return;
                }
            });
    };

    render() {
        const {task, loading, error, errorPriority} = this.state;
        return (
            <View style={containers.mainContainer}>
                {loading ? <ActivityIndicator size='small' color='pink'/> :
                    <View>
                        <View style={mainInput.inputWrapper}>
                            <Text style={mainInput.label}>Title</Text>
                            <Text>{task.title}</Text>
                        </View>
                        <View style={mainInput.inputWrapper}>
                            <Text style={mainInput.label}>Priority</Text>
                            {renderPriority(task.priority)}
                            <Text style={mainInput.error}>{errorPriority}</Text>
                        </View>
                        <Text style={mainInput.label}>Date and time</Text>
                        <View style={time.timeWrapper}>
                            <Text
                                style={time.timeString}>{moment(task.dueBy).format('YYYY / MM / DD    hh:mm a')}</Text>
                        </View>
                        {loading && <ActivityIndicator size='small' color='pink'/>}
                        {error !== '' && <Error errorText={error}/>}
                        <View style={buttons.oneButtonContainer}>
                            <TouchableOpacity onPress={this.deleteTask} style={buttons.mainButton}>
                                <Text style={buttons.mainButtonText}>Delete task</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
        );
    }
};
