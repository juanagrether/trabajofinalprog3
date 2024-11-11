import  React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';

class Register extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          email: '',
          password: '',
        };
    }

	render(){
        return (
            <View style={styles.container}>
                <Text style={styles.title} >Registro</Text>
                <Text style={styles.description}> Formulario de REGISTRO</Text>
                <TouchableOpacity style={styles.buttonBlue} onPress={ ()=> this.props.navigation.navigate('Login')}>
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