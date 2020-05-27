import React from 'react';
import {
      View,
      StyleSheet,
      Text,
      TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {buttons, containers, titles} from '../styles';
import Input from '../components/input';
import Error from '../components/error';
import {signUp} from '../api/components/user';
import {goHome} from '../navigation';

export default class SignUp extends React.Component {
      state = {
            username: '',
            password: '',
            email: '',
            phone_number: '',
            loading: false,
            error: '',
      };
      onChangeText = (key, val) => {
            this.setState({[key]: val});
      };

      signUp = () => {
            this.setState({
                  loading: true,
            });
            let data = {
                  email: this.state.email,
                  password: this.state.password,
            };

            signUp(data)
                .then(response => {
                      console.log(response);
                      this.setState({
                            loading: false,
                      });
                      AsyncStorage.setItem('token', response.token);
                      goHome();
                })
                .catch(error => {
                      console.log(error);
                      this.setState({
                            error: error.message,
                            loading: false,
                      });
                });
      };

      render() {
            const {email, password, error} = this.state;
            return (
                <View style={containers.loginContainer}>
                      <Text style={titles.mainTitle}>Sign Up</Text>
                      <Input label='Email'
                             value={email}
                             defaultValue={email}
                             onChangeText={val => this.onChangeText('email', val)}
                             placeholder='Enter your email'
                             name='email'
                             onSubmitEditing={() => this._passwordInput.focus()}
                             password={false}
                      />
                      <Input label='Password'
                             value={password}
                             defaultValue={password}
                             onChangeText={val => this.onChangeText('password', val)}
                             placeholder='Enter your password'
                             name='password'
                             markRef={component => this._passwordInput = component}
                             onSubmitEditing={this.signUp}
                             password={true}
                      />
                      {error !== '' && <Error errorText={error}/>}
                      <View style={buttons.oneButtonContainer}>
                            <TouchableOpacity onPress={this.signUp} style={buttons.mainButton}>
                                  <Text style={buttons.mainButtonText}>Sign Up</Text>
                            </TouchableOpacity>
                      </View>
                </View>
            );
      }
}
