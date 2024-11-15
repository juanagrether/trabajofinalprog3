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

  handleSubmit = () => {
    const { descrip, image } = this.state;
    const imageToSave = image ? image : '../../assets/avion.jpeg';
    db.collection('posts')
      .add({
        email: auth.currentUser.email,
        image: imageToSave,
        descrip: descrip,
        likes:[],
        createdAt: Date.now(),
      })
      .then(() => {
        this.setState({ error: "", descrip: "", image: "" });
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
              : require('../../assets/avion.jpeg')}
          resizeMode='contain'
        />
        <Text style={styles.title}>Nuevo Post de viaje</Text>

        <TextInput
          style={styles.input}
          placeholder="Escribe tu descripcion de tu viaje aquí"
          value={this.state.descrip}
          onChangeText={(text) => this.setState({ descrip: text })}
        />

        <TextInput
          style={styles.input}
          keyboardType='default'
          placeholder='Ingresa la URL de una imagen de tu destino favorito'
          onChangeText={(text) => this.setState({ image: text })}
          value={this.state.image}
        />

        {this.state.error ? (
          <Text style={styles.errorText}>{this.state.error}</Text>
        ) : null}

        <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>Publicar Viaje</Text>
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
    width: 400,
    height: 400,
    marginBottom: 10,
    alignSelf: 'center', 
  }

});
