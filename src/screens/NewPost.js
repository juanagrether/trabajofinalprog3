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
        likes: [],
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
        <Text style={styles.title}>Crear Post</Text>

        <TextInput
          style={styles.field}
          keyboardType='default'
          placeholder='URL de imagen'
          onChangeText={(text) => this.setState({ image: text })}
          value={this.state.image}
        />
        <Text style={styles.text}> Checkea si la imagen es correcta aqui: </Text>
        <Image
          style={styles.image}
          source={
            this.state.image
              ? { uri: this.state.image }
              : require('../../assets/avion.jpeg')}
          resizeMode='contain'
        />

        <TextInput
          style={styles.field}
          placeholder="Descripcion del viaje"
          value={this.state.descrip}
          onChangeText={(text) => this.setState({ descrip: text })}
        />
        {this.state.error ? (
          <Text style={styles.errorText}>{this.state.error}</Text>
        ) : null}

        <TouchableOpacity style={styles.buttonBlue} onPress={this.handleSubmit}>
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
  text:{
    fontFamily: 'Roboto',
    color: 'white',
    textAlign: 'left',
    alignItems: 'left',
    justifyContent: 'flex-start',
    fontSize: 15,
    marginBottom: 10
  },
  postContainer: {
    width: '100%',
    padding: 7,
    marginBottom: 20,
    borderColor: '#3A3A3A',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: '100%', 
    height: 210,
    marginBottom: 20,
    borderRadius: 6,
  },
});
