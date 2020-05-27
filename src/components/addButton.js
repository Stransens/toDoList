import React from 'react';
import {TouchableOpacity} from 'react-native';
import {buttons} from '../styles';
import {SvgElement} from './svgElement';

const AddButton = ({onPress}) => {
  return (
    <TouchableOpacity style={buttons.addButtonWrapper} onPress={onPress}>
      <SvgElement name="Plus" height={25} fill="#fff" />
    </TouchableOpacity>
  );
};

export default AddButton;
