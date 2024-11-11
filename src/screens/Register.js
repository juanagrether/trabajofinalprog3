import  React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-web';
import { auth, db } from '../firebase/config'

class Register extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          user: '',
          password: '',
          description: '',
          registered: false,
          errorMsg: ''
        };
      }

      onSubmit = (email, password, user, description) => {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((response) => {
            console.log("holaaa", email, password)
            if (response) {
              db.collection("users")
                .add({
                  email: auth.currentUser.email,
                  description: description,
                  user: user,
                  createdAt: Date.now(),
                })
                .then(() => {
                  this.setState({ registered: true, errorMsg: '' });
                  this.props.navigation.navigate('HomeMenu')
                })
                .catch(error => this.setState({ errorMsg: error.message }));
            }
          })
          .catch(error => this.setState({ errorMsg: error.message }));
      }

	render(){
        return (
            <View style={styles.container}>
            <Text style={styles.title} >Registro</Text>
    
            <TextInput
              style={styles.field}
              keyboardType=' email-address'
              placeholder='email'
              onChangeText={text => this.setState({ email: text })}
              value={this.state.email}
            />
    
            <TextInput
              style={styles.field}
              keyboardType='default'
              placeholder='user'
              onChangeText={text => this.setState({ user: text })}
              value={this.state.user}
            />
    
            <TextInput style={styles.field}
              keyboardType='default'
              placeholder='description'
              onChangeText={text => this.setState({ description: text })}
              value={this.state.description}
            />
    
            <TextInput style={styles.field}
              keyboardType='default'
              placeholder='password'
              secureTextEntry={true}
              onChangeText={text => this.setState({ password: text })}
              value={this.state.password}
            />
    
            <TouchableOpacity style={styles.buttonGreen} onPress={() => this.onSubmit(this.state.email, this.state.password, this.state.user, this.state.description)} >
              <Text style={styles.buttonText}> Register </Text>
            </TouchableOpacity>
    
            <View style={styles.preview}>
              <Text style={styles.description}> Email: {this.state.email}</Text>
              <Text style={styles.description}> User: {this.state.user}</Text>
              <Text style={styles.description}> Password: {this.state.password}</Text>
            </View>
    
    
            <TouchableOpacity style={styles.buttonBlue} onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={styles.buttonText} >Ya tienes cuenta? LOGIN!</Text>
            </TouchableOpacity>
          </View>
        )
    }
}

export default Register; 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      backgroundColor: '#E6F2FF',
    },
    title: {
      fontSize: 34,
      fontWeight: 'bold',
      color: '#1A73E8', 
      marginBottom: 20,
    },
    description: {
      fontSize: 16,
      textAlign: 'center',
      color: '#5F6368', 
      marginBottom: 20,
    },
    buttonBlue: {
        backgroundColor: '#0077CC', 
        padding: 15,
        borderRadius: 30, 
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
    },
    buttonText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 18,
    },
});