import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
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
      (error) => console.log(error) // Handles any errors with the onSnapshot
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Posts</Text>
        <FlatList
          data={this.state.posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Post email={item.data.email} descripcion={item.data.descrip} />
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



