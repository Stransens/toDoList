import {Dimensions, StyleSheet} from 'react-native';

const colors = {
      low: 'green',
      middle: 'orange',
      high: 'red'
};

const wrapper = {
      width: '30%',
      justifyContent: 'center',
      alignItems: 'center',
      height: 60,
      borderWidth: 1,
      borderRadius: 4,
};

const text = {
      fontSize: 16,
};

export const priorityButtons = StyleSheet.create({
      priorityButtonsWrapper: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
      },
      lowWrapper: {
            ...wrapper,
            borderColor: colors.low,
      },
      lowText: {
            ...text,
            color: colors.low,
      },
      lowWrapperActive: {
            ...wrapper,
            borderColor: colors.low,
            backgroundColor: colors.low,
      },
      lowTextActive: {
            ...text,
            color: '#ffffff',
      },
      middleWrapper: {
            ...wrapper,
            borderColor: colors.middle,
      },
      middleText: {
            ...text,
            color: colors.middle,
      },
      middleWrapperActive: {
            ...wrapper,
            borderColor: colors.middle,
            backgroundColor: colors.middle,
      },
      middleTextActive: {
            ...text,
            color: '#ffffff',
      },
      highWrapper: {
            ...wrapper,
            borderColor: colors.high,
      },
      highText: {
            ...text,
            color: colors.high,
      },
      highWrapperActive: {
            ...wrapper,
            borderColor: colors.high,
            backgroundColor: colors.high,
      },
      highTextActive: {
            ...text,
            color: '#ffffff',
      },
});


