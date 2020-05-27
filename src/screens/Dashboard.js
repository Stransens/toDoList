import React from 'react';
import {View, Text, ActivityIndicator, TouchableOpacity, FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {Navigation} from 'react-native-navigation';
import {goToAuth} from '../navigation';

import {list} from '../api/components/tasks';
import Error from '../components/error';
import AddButton from '../components/addButton';
import TaskComponent from './components/taskComponent';

import {containers, emptyState, buttons} from '../styles';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: '',
            tasks: [],
        };
        Navigation.events().bindComponent(this);
    }

    static get options() {
        return {
            topBar: {
                title: {
                    text: 'My tasks',
                },
                rightButtons: [
                    {
                        text: 'Sort',
                        id: 'Sort',
                    },
                ],
                rightButtonColor: '#4B0082',
                leftButtonColor: '#4B0082',
            },
        };
    }

    componentDidAppear() {
        this.getTasksList();
    }

    navigationButtonPressed({buttonId}) {
        if (buttonId === 'Sort') {
            Navigation.showModal({
                stack: {
                    children: [
                        {
                            component: {
                                name: 'Modal',
                                options: {
                                    topBar: {
                                        title: {
                                            text: 'Modal',
                                        },
                                    },
                                    modalPresentationStyle: 'fullScreen',
                                },
                                passProps: {
                                    component: this.props.componentId,
                                },
                            },
                        },
                    ],
                },
            });
        }
    }

    getTasksList = () => {
        let {option, direction, sort} = this.props;
        let data;

        if (sort) {
            this.setState({
                tasks: [],
            })
        }

        if (option) {
            data = {
                sort: `${option} ${direction}`,
                page: sort ? 1 : this.state.meta.current,
            };
        } else {
            data = {
                sort: `title asc`,
                page: this.state.meta ? this.state.meta.current : 1,
            };
        }


        list(data)
            .then((response) => {
                // console.log(response);
                Navigation.updateProps(this.props.componentId, {
                    sort: false,
                });
                this.setState({
                    tasks: [...this.state.tasks, ...response.tasks],
                    error: '',
                    loading: false,
                    meta: response.meta,
                });
            })
            .catch((error) => {
                // console.log(error);
                this.setState({
                    error: error.message,
                    loading: false,
                });
                if (error.message === 'Expired token') {
                    goToAuth();
                }
            });
    };

    logout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            goToAuth();
        } catch (err) {
            console.log('error signing out...: ', err);
        }
    };

    _renderItem = (item) => {
        const {componentId} = this.props;
        return <TaskComponent
            item={item.item}
            goToTask={() => {
                console.log('click');
                Navigation.push(componentId, {
                    component: {
                        name: 'Task',
                        passProps: {
                            taskId: item.item.id,
                            status: 'Edit task',
                        },
                    },
                });
            }}
        />;
    };

    _handleLoadMore = () => {
        let {current, count, limit} = this.state.meta;
        if (current < Math.ceil(count / limit)) {
            this.setState({
                meta: {
                    current: current + 1,
                },
            }, () => {
                this.getTasksList();
            });
        }
    };


    render() {
        const {loading, error, tasks} = this.state;
        const {componentId} = this.props;
        console.log(this.props);
        return (
            <View style={containers.mainContainer}>
                {loading && <ActivityIndicator size="small" color="pink"/>}
                {error !== '' && <Error errorText={error}/>}
                {tasks.length > 0 ? (
                    <FlatList
                        data={tasks}
                        renderItem={this._renderItem.bind(this)}
                        keyExtractor={(item, key) => `list-item-${key}`}
                        onEndReached={this._handleLoadMore.bind(this)}
                        onEndReachedThreshold={0.2}
                    />
                ) : (
                    <View style={emptyState.wrapper}>
                        <Text style={emptyState.text}>You don't have tasks</Text>
                    </View>
                )}
                <AddButton
                    onPress={() =>
                        Navigation.push(componentId, {
                            component: {
                                name: 'TaskEdit',
                                passProps: {
                                    status: 'Create task',
                                },
                            },
                        })
                    }
                />
                <View style={buttons.oneButtonContainer}>
                    <TouchableOpacity onPress={this.logout} style={buttons.mainButton}>
                        <Text style={buttons.mainButtonText}>Log out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
