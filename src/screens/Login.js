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
      backgroundColor: '#f5f5f5',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      margin: 20,
    },
    description: {
      fontSize: 16,
      textAlign: 'center',
    },
    buttonBlue: {
      backgroundColor: '#67b7f7',
      padding: 15,
      margin: 20,
      borderRadius: 10,
      width: 600,
      height:50,
      alignItems: 'center',
    },
    buttonOrange: {
      backgroundColor: '#f7a667',
      padding: 15,
      margin: 20,
      borderRadius: 10,
      width: 600,
      height:50,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });