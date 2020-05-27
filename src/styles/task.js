import {Dimensions, StyleSheet} from 'react-native';

const colors = {
      low: 'green',
      middle: 'orange',
      high: 'red'
};

const text = {
      fontSize: 16,
      marginLeft: 10,
};

export const tasks = StyleSheet.create({
      taskWrapper: {
            padding: 8,
            borderWidth: 1,
            borderColor: '#eee',
            borderRadius: 4,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 4,
      },
      taskTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 6,
      },
      detailsLine: {
            flexDirection: 'row',
            alignItems: 'center',
      },
      date: {
            color: 'gray',
            marginRight: 10,
      },
      priorityLine: {
            flexDirection: 'row',
      },
      priorityTextHigh: {
            ...text,
            color: colors.high,
      },
      priorityTextMiddle: {
            ...text,
            color: colors.middle,
      },
      priorityTextLow: {
            ...text,
            color: colors.low,
      },
});

export const emptyState = StyleSheet.create({
      wrapper: {
            padding: 8,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 4,
      },
      text: {
            fontSize: 18,
      },
});

export const time = StyleSheet.create({
      timeString: {
            fontSize: 16,
      },
      timeWrapper: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 4,
      },
});


