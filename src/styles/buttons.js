import {StyleSheet} from 'react-native';

const buttonsColors = {
  main: '#4B0082',
  secondary: '#7B68EE',
  disabled: '#C7C7C7',
};

const buttonsTextColor = {
  main: '#ffffff',
  secondary: '#006699',
  disabled: '#ffffff',
};

const buttonContainerStyle = {
  flex: 1,
  width: 150,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'stretch',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.19,
  shadowRadius: 3.3,
  marginHorizontal: 16,
  elevation: 4,
  borderRadius: 8,
  maxHeight: 48,
};

const buttonTextStyle = {
  fontSize: 14,
  textTransform: 'uppercase',
  lineHeight: 48,
};

export const buttons = StyleSheet.create({
  oneButtonContainer: {
    alignSelf: 'center',
    paddingVertical: 16,
  },
  twoButtonsContainer: {
    flexDirection: 'row',
    paddingVertical: 16,
  },
  mainButton: {
    ...buttonContainerStyle,
    backgroundColor: buttonsColors.main,
  },
  mainButtonText: {
    ...buttonTextStyle,
    color: buttonsTextColor.main,
  },
  addButtonWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  smallButtonWrapper: {
    backgroundColor: buttonsColors.secondary,
    padding: 8,
    borderRadius: 4,
    width: 140,
    marginVertical: 4,
    alignItems: 'center',
  },
  smallButtonText: {
    fontSize: 14,
    color: '#fff',
    textTransform: 'uppercase',
  },
});
