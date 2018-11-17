import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { connect } from 'react-redux';

class LoginForm extends Component {
  onPressSignInButton = () => {
    const { email, password } = this.props;
    this.props.loginUser(email, password);
  } 

  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{
            text: 'Sign In',
            style: styles.headerText,
          }}
        />
        <FormLabel>Email</FormLabel>
        <FormInput
          onChangeText={this.props.emailChanged}
          value={this.props.email}
        />
        <FormValidationMessage></FormValidationMessage>
        <FormLabel>Password</FormLabel>
        <FormInput
          secureTextEntry 
          onChangeText={this.props.passwordChanged}
          value={this.props.password}
        />
        <FormValidationMessage></FormValidationMessage>
        <Button
          large
          title="Sign In"
          onPress={this.onPressSignInButton}
        />
        <Text style={styles.error}>{this.props.error}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },

  headerText: {
    color: '#fff',
  },

  error: {
    marginTop: 15,
    marginHorizontal: 15,
    color: '#f00',
  },
});

const mapStateToProps = state => {
  const { email, password, user, error, loading } = state.auth;
  return {
    email,
    password,
    user,
    error,
    loading,
  };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);
