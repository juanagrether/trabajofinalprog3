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
           <Image
        source={require('../../assets/fondo.jpg')}
        style={styles.backgroundImage} // Imagen de fondo
      />
        <Text style={styles.title}>Crear Post ✈️</Text>

        <TextInput
          style={styles.input}
          keyboardType='default'
          placeholder='Ingresa la direccion de una imagen de tu destino '
          onChangeText={(text) => this.setState({ image: text })}
          value={this.state.image}
        />
        <Text style={styles.texto}> Si la direccion de imagen es correcta, deberia verse aqui: </Text>
        <Image
          style={styles.image}
          source={
            this.state.image
              ? { uri: this.state.image }
              : require('../../assets/avion.jpeg')}
          resizeMode='contain'
        />

        <TextInput
          style={styles.input}
          placeholder="Escribe la descripcion de tu viaje aquí"
          value={this.state.descrip}
          onChangeText={(text) => this.setState({ descrip: text })}
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
    backgroundColor: '#f0f4f8', // Fondo neutro suave
    justifyContent: 'center', // Centra verticalmente los elementos
    alignItems: 'center', // Centra horizontalmente los elementos
  },
  backgroundImage: {
    position: 'absolute', // Poner la imagen de fondo
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1, // Asegura que la imagen esté detrás de los demás componentes
    borderRadius: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#66C2D1',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  input: {
    width: '100%', // Ocupa el 100% del ancho del contenedor
    height: 50,
    borderColor: 'rgba(40, 167, 69, 0.5)', // Gris moderno
    borderWidth: 1,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#ffffff', // Fondo blanco para claridad
    fontSize: 14,
    color: '#3a3a3a',
    textAlignVertical: 'top',
    borderRadius: 6,
  },
  texto: {
    fontSize: 12,
    textAlign: 'center',
    color: '#6c757d', // Gris suave para descripciones
    marginBottom: 10,
  },
  errorText: {
    color: '#e63946', // Rojo vibrante para errores
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#66C2D1', // Color de fondo azul suave
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    marginVertical: 20,
    borderRadius: 4, // Aumenté a 8 para un borde circular leve más notorio
  },
  buttonText: {
    color: '#388E3C', // Texto blanco para contraste
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1.5,
  },
  image: {
    width: '100%', // Asegura que la imagen ocupe el 100% del ancho del contenedor
    height: 220,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#d1d8e0', // Borde gris suave
    resizeMode: 'cover', // Ajusta la imagen de manera proporcional sin distorsión
    borderRadius: 6,
  },
});




