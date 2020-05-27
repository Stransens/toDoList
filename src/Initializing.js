import React from 'react';
import {
      View,
      Text,
      StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { goToAuth, goHome } from './navigation'

export default class Initialising extends React.Component {
      async componentDidMount() {
            try {
                  const user = await AsyncStorage.getItem('token')
                  console.log('token: ', user)
                  if (user) {
                        goHome()
                  } else {
                        goToAuth()
                  }
            } catch (err) {
                  console.log('error: ', err)
                  goToAuth()
            }
      }

      render() {
            return (
                <View style={styles.container}>
                      <Text style={styles.welcome}>Wait.. we are checkin your credentials</Text>
                </View>
            )
      }
}

const styles = StyleSheet.create({
      welcome: {
            fontSize: 16,
      },
      container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
      }
})
