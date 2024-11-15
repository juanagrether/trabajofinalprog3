import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { db } from '../firebase/config';
import Post from "../components/Post"

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    db.collection('posts').onSnapshot(
      (snapshot) => {
        let posts = [];
        snapshot.forEach((doc) => {
          posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({ posts: posts });
      },
      (error) => console.log(error) 
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
        source={require('../../assets/fondo.jpg')}
        style={styles.backgroundImage} // Imagen de fondo
      />
        <Text style={styles.title}>Viajes ✈️</Text>
        <FlatList
          data={this.state.posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
            <Post item={item} email={item.data.email} descrip={item.data.descrip} image={item.data.image} />
            </View>
          )}

        />
      </View>
    );
  }
}
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    backgroundColor: '#F0F4F8',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'left',
    color: '#66C2D1',
    textTransform: 'uppercase',
    letterSpacing: 2,
    padding: 10,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#606060',
    marginBottom: 25,
    fontFamily: 'Roboto',
  },
  backgroundImage: {
    position: 'absolute', // Poner la imagen de fondo
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1, // Asegura que la imagen esté detrás de los demás componentes
  },
  postContainer: {
    width: '100%',
    padding: 7,
    marginBottom: 20,
    borderColor: '#D1D3D8',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
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



