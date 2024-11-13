import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
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

  componentDidMount(){
    auth.onAuthStateChanged(user => {
      if (user){
        this.props.navigation.navigate("HomeMenu"); 
        console.log('si estoy logueado');
      }
    });
  }

  onSubmit = () => {
    const { email, password } = this.state;

    // Validación del email y contraseña
    if (!email.includes('@')) {
      this.setState({ error: 'Email mal formateado' });
      return;
    }

    if (password.length < 6) {
      this.setState({ error: 'La password debe tener una longitud mínima de 6 caracteres, reescriba la contraseña' });
      return;
    }

    // Intento de inicio de sesión en Firebase
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
        <Text style={styles.title}>Ingresar</Text>
        <Text style={styles.description}>Formulario de LOGIN:</Text>

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
          placeholder='password'
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
        />

        <TouchableOpacity style={styles.buttonBlue} onPress={this.onSubmit}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* mensaje de error */}
        {this.state.error ? <Text style={styles.error}>{this.state.error}</Text> : null}

        <TouchableOpacity
          style={styles.buttonBlue}
          onPress={() => this.props.navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>¿No tienes cuenta? REGISTER!</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonOrange}
          onPress={() => this.props.navigation.navigate('HomeMenu')}
        >
          <Text style={styles.buttonText}>Entrar en la app</Text>
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
    backgroundColor: '#F0F4F8',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#3A3A3A',
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'Roboto',
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
    borderColor: '#D1D3D8',
    borderWidth: 1.5,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#333',
  },
  buttonBlue: {
    backgroundColor: '#0077CC',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 50,
    width: '90%',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#0077CC',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonOrange: {
    backgroundColor: '#f79c42',
    paddingVertical: 15,
    marginTop: 10,
    marginBottom: 30,
    borderRadius: 50,
    width: '70%',
    alignItems: 'center',
    shadowColor: '#f79c42',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
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

