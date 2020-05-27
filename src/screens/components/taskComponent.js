import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {tasks} from '../../styles';
import {SvgElement} from '../../components/svgElement';
import moment from 'moment';
import {renderPriority} from '../../utils/priority';

const TaskComponent = ({item, goToTask}) => {
  return (
    <TouchableOpacity onPress={() => goToTask()} style={tasks.taskWrapper}>
      <View>
        <Text style={tasks.taskTitle}>{item.title}</Text>
        <View style={tasks.detailsLine}>
          <Text style={tasks.date}>{moment(item.dueBy).format('YYYY/MM/DD hh:mm a')}</Text>
          {renderPriority(item.priority)}
        </View>
      </View>
      <SvgElement name="ArrowRight" height={25} fill="pink" />
    </TouchableOpacity>
  );
};

export default TaskComponent;
