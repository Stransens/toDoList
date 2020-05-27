import {Dimensions, StyleSheet} from 'react-native';

const inputBorderColors = {
      main: '#C7C7CC',
      error: '#FF3B30',
      focused: '#006699',
};

const labelStyles = {
      fontSize: 14,
      marginBottom: 4,
      textTransform: 'uppercase',
      marginHorizontal: 16,
};

const textStyle = {
      borderRadius: 8,
      borderWidth: 1,
      paddingHorizontal: 16,
      paddingVertical: 15,
      fontSize: 16,
      backgroundColor: '#fff',
};

export const mainInput = StyleSheet.create({
      inputWrapper: {
            width: '100%',
            paddingVertical: 8,
      },
      label: {
            ...labelStyles
      },
      text: {
            ...textStyle,
            width: '100%',
            borderColor: inputBorderColors.main,
      },
      textMultiline: {
            ...textStyle,
            width: '100%',
            height: 80,
            borderColor: inputBorderColors.main,
      },
      errorText: {
            ...textStyle,
            borderColor: inputBorderColors.error,
      },
      focusedText: {
            ...textStyle,
            borderColor: inputBorderColors.main,
      },
      // error: {
      //       ...errorText,
      // },
      textarea: {
            ...textStyle,
            height: 100,
            paddingTop: 15,
      },
      formError: {
            color: '#FF3B30',
            fontSize: 14,
            alignSelf: 'center',
            marginTop: 10,
      },
      modalError: {
            color: '#FF3B30',
            fontSize: 14,
            alignSelf: 'center',
            marginTop: 10,
            flexWrap: 'wrap',
            width: 180,
            textAlign: 'center',
      },
});


