import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {containers, titles, buttons} from '../styles';
import Input from '../components/input';
import Error from '../components/error';
import {signIn} from '../api/components/user';
import {goHome} from '../navigation';

export default class SignIn extends React.Component {
  state = {
    email: '',
    password: '',
    loading: false,
    error: '',
  };

  onChangeText = (key, value) => {
    this.setState({[key]: value, error: ''});
  };

  signIn = () => {
    this.setState({
      loading: true,
    });
    let data = {
      email: this.state.email,
      password: this.state.password,
    };

    signIn(data)
      .then(response => {
        console.log(response.token);
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
        <Text style={titles.mainTitle}>Log in</Text>
        <Input
          label="Email"
          value={email}
          defaultValue={email}
          onChangeText={(val) => this.onChangeText('email', val)}
          placeholder='Enter your email'
          name='email'
          onSubmitEditing={() => this._passwordInput.focus()}
          password={false}
        />
        <Input
          label='Password'
          value={password}
          defaultValue={password}
          onChangeText={(val) => this.onChangeText('password', val)}
          placeholder='Enter your password'
          name='newPassword'
          markRef={(component) => (this._passwordInput = component)}
          onSubmitEditing={this.signIn}
          password={true}
        />
        {error !== '' && <Error errorText={error}/>}
        <View style={buttons.oneButtonContainer}>
          <TouchableOpacity onPress={this.signIn} style={buttons.mainButton}>
            <Text style={buttons.mainButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
