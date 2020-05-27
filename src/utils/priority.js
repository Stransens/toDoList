import React from 'react';
import {Text, View} from 'react-native';
import {tasks} from '../styles';
import {SvgElement} from '../components/svgElement';

export function renderPriority(priority) {
  switch (priority) {
    case 'High': {
      return (
        <View style={tasks.priorityLine}>
          <SvgElement name="Top" height={15} fill="red"/>
          <Text style={tasks.priorityTextHigh}>{priority}</Text>
        </View>
      );
    }
    case 'Normal': {
      return (
        <View style={tasks.priorityLine}>
          <Text style={tasks.priorityTextMiddle}>{priority}</Text>
        </View>
      );
    }
    case 'Low': {
      return (
        <View style={tasks.priorityLine}>
          <SvgElement name="Bottom" height={15} fill="green"/>
          <Text style={tasks.priorityTextLow}>{priority}</Text>
        </View>
      );
    }
  }
}
