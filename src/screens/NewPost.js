import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import { auth, db } from '../firebase/config';

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descrip: '',
      image: '',
      error: '',
    };
  }

  componentDidMount() {
    // Verifica si el usuario está logueado; si no, redirige a "Login"
    if (!auth.currentUser) {
      this.props.navigation.navigate("Login");
    }
  }

  handleSubmit = () => {
    const { descrip, image } = this.state;
    if (!auth.currentUser) {
      this.setState({ error: "Debes iniciar sesión para crear un post." });
      return;
    }
    db.collection('posts')
      .add({
        email: auth.currentUser.email,
        image: image || '../../assets/avion.jpeg',
        descrip: descrip,
        createdAt: Date.now(),
      })
      .then(() => {
        this.setState({ error: "" });
        this.props.navigation.navigate("Home");
      })
      .catch((e) => {
        console.log(e);
        this.setState({ error: 'Error al guardar el post. Intenta de nuevo.' });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={
            this.state.image
              ? { uri: this.state.image }
              : require('../../assets/avion.jpeg')} // Imagen predeterminada 
          resizeMode='contain'
        />
        <Text style={styles.title}>Nuevo Post</Text>

        <TextInput
          style={styles.input}
          placeholder="Escribe tu mensaje aquí"
          value={this.state.descrip}
          onChangeText={(text) => this.setState({ descrip: text })}
        />

        <TextInput
          style={styles.input}
          keyboardType='default'
          placeholder='Ingresa la URL de una imagen'
          onChangeText={(text) => this.setState({ image: text })}
          value={this.state.image}
        />

        {this.state.error ? (
          <Text style={styles.errorText}>{this.state.error}</Text>
        ) : null}

        <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>Subir Post</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default NewPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    width: 400, // Ancho más grande
    height: 400, // Alto más grande
    marginBottom: 10,
    alignSelf: 'center', // Centrar la imagen
  }
  
});
