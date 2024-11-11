import  React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';

class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: '',
        };
    }

	render() {
        const { navigation } = this.props; // Accediendo a las props de navegación

        return (
            <View style={styles.container} >
                <Text style={styles.title}> Ingresar </Text>

                <Text style={styles.description}> Formulario de LOGIN : navegacion cruzada con el Registro </Text>
                <TouchableOpacity style={styles.buttonBlue} onPress={ ()=> this.props.navigation.navigate('Register')}>
                    <Text style={styles.buttonText}>No tienes cuenta? REGISTER!</Text>
                </TouchableOpacity>

                <Text style={styles.description}> Navegacion cruzada con ingresar a la APP </Text>
                <TouchableOpacity style={styles.buttonOrange} onPress={() => navigation.navigate('HomeMenu')}>
                    <Text style={styles.buttonText}>Entrar en la app</Text>
                </TouchableOpacity>
                
            </View>
        )
    }
}

export default Login; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#E6F2FF', // Azul claro, similar al cielo
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#1A73E8', // Azul intenso, amigable y profesional
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#5F6368', // Gris azulado para un texto suave
    marginBottom: 20,
  },
  buttonBlue: {
      backgroundColor: '#0077CC', // Azul vibrante
      padding: 15,
      borderRadius: 30, // Bordes redondeados para un estilo moderno
      width: '80%', // Mejor ajuste en pantallas pequeñas
      alignItems: 'center',
      shadowColor: '#000', // Sombras para un efecto de elevación
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