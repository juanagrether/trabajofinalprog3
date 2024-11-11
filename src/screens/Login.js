import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class Login extends Component {
  render() {
    return (
      <View style={styles.container} >
        <Text style={styles.title}>Ingresar</Text>
        <Text style={styles.description}>Formulario de LOGIN: navegacion cruzada con el Registro</Text>

        <TouchableOpacity 
          style={styles.buttonBlue} 
          onPress={() => this.props.navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>No tienes cuenta? REGISTER!</Text>
        </TouchableOpacity>

        <Text style={styles.description}>Navegacion cruzada con ingresar a la APP</Text>

       
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