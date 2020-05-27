import React from 'react';
import {
      View,
      Text,
      TouchableOpacity,
      ActivityIndicator,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Input from '../components/input';
import {priorityButtons, containers, mainInput, buttons, time} from '../styles';
import {create, getTask, updateTask} from '../api/components/tasks';
import Error from '../components/error';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {goToAuth} from '../navigation';

export default class TaskEdit extends React.Component {
      static options(props) {
            return {
                  topBar: {
                        title: {
                              text: props.status,
                        },
                        backButton: {
                              color: '#4B0082',
                        },
                  },
            };
      }

      state = {
            title: '',
            priority: '',
            error: '',
            loading: false,
            date: '',
            time: '',
            show: false,
      };

      componentDidMount() {
            if (this.props.status === 'Edit task') {
                  this.getTaskInfo();
            } else {
                  this.setState({
                        date: new Date(),
                        priority: 'Low',
                  });
            }
      }

      getTaskInfo = () => {
            getTask(this.props.taskId)
                .then(response => {
                      this.setState({
                            loading: false,
                            title: response.task.title,
                            priority: response.task.priority,
                            date: response.task.dueBy,
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

      onChangeText = (key, value) => {
            this.setState({[key]: value, error: ''});
      };

      onChange = (event, selectedDate) => {
            const currentDate = selectedDate;
            this.setState({
                  date: currentDate,
            });
      };

      showDatepicker = () => {
            this.setState({
                  show: true,
                  mode: 'date',
            });
      };

      showTimepicker = () => {
            this.setState({
                  show: true,
                  mode: 'time',
            });
      };

      createTask = () => {
            const {priority, date, title} = this.state;
            const {componentId} = this.props;
            this.setState({
                  loading: true,
            });
            let dateDue = Math.round(moment(date).valueOf() / 1000);
            let data = {
                  'title': title,
                  'dueBy': dateDue,
                  'priority': priority,
            };
            create(data).then(response => {
                  this.setState({
                        loading: false,
                  });
                  Navigation.pop(componentId);
            }).catch(error => {
                  console.log(error)
                  this.setState({
                        error: error.message,
                        loading: false,
                  });
                  if (error.message === 'Expired token') {
                        goToAuth();
                        return;
                  }
            });
      };

      editTask = () => {
            const {priority, date, title} = this.state;
            const {taskId, componentId} = this.props;
            this.setState({
                  loading: true,
            });
            let dateDue = moment(date).valueOf();
            let data = {
                  'title': title,
                  'dueBy': dateDue,
                  'priority': priority,
            };
            updateTask(taskId, data).then(response => {
                  this.setState({
                        loading: false,
                  });
                  Navigation.pop(componentId);
            }).catch(error => {
                  console.log(error);
                  this.setState({
                        error: error.message,
                        loading: false,
                  });
                  if (error.message === 'Expired token') {
                        goToAuth();
                        return;
                  }
            });
      };

      render() {
            const {priority, date, mode, loading, error} = this.state;
            const {status} = this.props;
            let timezone = new Date().getTimezoneOffset() * -1;
            return (
                <View style={containers.mainContainer}>
                      <Input label='Title'
                             value={this.state.title}
                             defaultValue={this.state.title}
                             onChangeText={val => this.onChangeText('title', val)}
                             placeholder='Title'
                             name='title'
                             password={false}
                             numberOfLines={4}
                             multiline
                      />
                      <View style={mainInput.inputWrapper}>
                            <Text style={mainInput.label}>Priority</Text>
                            <View style={priorityButtons.priorityButtonsWrapper}>
                                  <TouchableOpacity onPress={() => this.setState({priority: 'Low'})}
                                                    style={priority === 'Low' ? priorityButtons.lowWrapperActive : priorityButtons.lowWrapper}>
                                        <Text
                                            style={priority === 'Low' ? priorityButtons.lowTextActive : priorityButtons.lowText}>Low</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity onPress={() => this.setState({priority: 'Normal'})}
                                                    style={priority === 'Normal' ? priorityButtons.middleWrapperActive : priorityButtons.middleWrapper}>
                                        <Text
                                            style={priority === 'Normal' ? priorityButtons.middleTextActive : priorityButtons.middleText}>Normal</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity onPress={() => this.setState({priority: 'High'})}
                                                    style={priority === 'High' ? priorityButtons.highWrapperActive : priorityButtons.highWrapper}>
                                        <Text
                                            style={priority === 'High' ? priorityButtons.highTextActive : priorityButtons.highText}>High</Text>
                                  </TouchableOpacity>
                            </View>
                            <Text style={mainInput.label}>Date and time</Text>
                            <View style={time.timeWrapper}>
                                  <Text
                                      style={time.timeString}>{moment(date).format('YYYY / MM / DD    hh:mm a')}</Text>
                                  <View>
                                        <TouchableOpacity style={buttons.smallButtonWrapper}
                                                          onPress={this.showDatepicker}><Text
                                            style={buttons.smallButtonText}>Choose date</Text></TouchableOpacity>
                                        <TouchableOpacity style={buttons.smallButtonWrapper}
                                                          onPress={this.showTimepicker}><Text
                                            style={buttons.smallButtonText}>Choose time</Text></TouchableOpacity>
                                  </View>
                            </View>
                            <View>
                                  {this.state.show && (
                                      <DateTimePicker
                                          testID="dateTimePicker"
                                          timeZoneOffsetInMinutes={timezone}
                                          value={date}
                                          mode={mode}
                                          is24Hour={true}
                                          display="default"
                                          onChange={this.onChange}
                                      />
                                  )}
                            </View>
                      </View>
                      {loading && <ActivityIndicator size='small' color='pink'/>}
                      {error !== '' && <Error errorText={error}/>}
                      <View style={buttons.oneButtonContainer}>
                            <TouchableOpacity onPress={status === 'Create task' ? this.createTask : this.editTask}
                                              style={buttons.mainButton}>
                                  <Text
                                      style={buttons.mainButtonText}>{status === 'Create task' ? 'Create task' : 'Edit task'}</Text>
                            </TouchableOpacity>
                      </View>
                </View>
            );
      }
}

