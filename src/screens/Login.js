import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import { auth } from '../firebase/config';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loggedIn: false,
      error: '',
    };
  }

  componentDidMount () {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate('HomeMenu')
      }
    })
  }

  onSubmit = () => {
    const { email, password } = this.state;

    if (!email.includes('@')) {
      this.setState({ error: 'Email mal formateado' });
      return;
    }

    if (password.length < 6) {
      this.setState({ error: 'La password debe tener una longitud mínima de 6 caracteres, reescriba la contraseña' });
      return;
    }

    auth.signInWithEmailAndPassword(email, password)
      .then((response) => {
        this.setState({ loggedIn: true, error: '' });
        this.props.navigation.navigate('HomeMenu'); 
      })
      .catch(error => {
        this.setState({ error: 'Mail o la contraseña incorrecta. Intentalo devuelta!' });
      });
  };

  render() {
    return (
      <View style={styles.container}>
         <Image
        source={require('../../assets/fondo2.jpg')}
        style={styles.backgroundImage} 
      />
        <Text style={styles.title}>Ingresar</Text>
        
        <TextInput
          style={styles.field}
          keyboardType='email-address'
          placeholder='email'
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
        />

        <TextInput
          style={styles.field}
          keyboardType='default'
          placeholder='contraseña'
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
        />

        <TouchableOpacity style={styles.buttonBlue} onPress={this.onSubmit}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {this.state.error ? <Text style={styles.error}>{this.state.error}</Text> : null}

        <TouchableOpacity
          style={styles.buttonBlue}
          onPress={() => this.props.navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>¿No tienes cuenta?</Text>
        </TouchableOpacity>

        
      </View>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    backgroundColor: '#c1c3ae',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#3A3A3A',
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  backgroundImage: {
    position: 'absolute', 
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1, 
    borderRadius: 6,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#606060',
    marginBottom: 25,
    fontFamily: 'Roboto',
  },
  field: {
    width: '90%',
    marginBottom: 20,
    padding: 15,
    borderColor: '#3A3A3A',
    borderWidth: 1.5,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#333',
    fontFamily: 'Roboto',
  },
  buttonBlue: {
    backgroundColor: '#3A3A3A',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 50,
    width: '90%',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#3A3A3A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontFamily: 'Roboto',
  },
  error: {
    color: '#FF4D4D',
    fontSize: 14,
    marginTop: 15,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
});

