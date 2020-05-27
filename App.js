/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
      SafeAreaView,
      StyleSheet,
      ScrollView,
      View,
      Text,
      StatusBar,
      Button,
} from 'react-native';

import {
      Header,
      LearnMoreLinks,
      Colors,
      DebugInstructions,
      ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {Navigation} from 'react-native-navigation';

XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
    GLOBAL.originalXMLHttpRequest :
    GLOBAL.XMLHttpRequest;

global._fetch = fetch;
global.fetch = function (uri, options, ...args) {
      return global._fetch(uri, options, ...args).then((response) => {
            console.log('Fetch', {request: {uri, options, ...args}, response});
            return response;
      });
};

const Login = (props) => {
      return (
          <SafeAreaView>
                <View>
                      <Button
                          title='Push Settings Screen'
                          color='#710ce3'
                          onPress={() => Navigation.push(props.componentId, {
                                component: {
                                      name: 'Settings',
                                },
                          })}/>
                </View>
          </SafeAreaView>
      );
};

Login.options = {
      topBar: {
            title: {
                  text: 'Dashboard',
            },
      },
      bottomTab: {
            text: 'Dashboard',
      },
};

Navigation.registerComponent('Login', () => App);

Navigation.events().registerAppLaunchedListener(async () => {
      Navigation.setRoot({
            root: {
                  stack: {
                        children: [
                              {
                                    component: {
                                          name: 'Dashboard'
                                    }
                              }
                        ]
                  }
            }
      });
});


export default App;
