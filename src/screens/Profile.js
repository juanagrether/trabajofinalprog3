import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { auth, db } from '../firebase/config';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: auth.currentUser.email,
      userName: '',
      userPosts: [],
    };
  }

  componentDidMount() {
    db.collection('users')
      .where('email', '==', auth.currentUser.email)
      .onSnapshot(docs => {
        docs.forEach(doc => {
          this.setState({ userName: doc.data().user });
        });
      });

    db.collection('posts')
      .where('email', '==', auth.currentUser.email)
      .onSnapshot(docs => {
        let postArray = [];
        docs.forEach((doc) => {
          const postData = doc.data();
          postArray.push({
            id: doc.id,
            descrip: postData.descrip,
            image: postData.image,
            createdAt: postData.createdAt,
          });
        });
        postArray.sort((a, b) => b.createdAt - a.createdAt);
        this.setState({ userPosts: postArray });
      });
  }

  handleDeletePost = (postId) => {
    db.collection('posts').doc(postId).delete()
      .then(() => {
        const updatedPosts = this.state.userPosts.filter(post => post.id !== postId);
        this.setState({ userPosts: updatedPosts });
      })
      .catch(error => console.log(error));
  };

  handleLogout = () => {
    auth.signOut()
      .then(() => {
        this.props.navigation.navigate('Login');
      })
      .catch((error) => {
        console.error("Error al cerrar sesión: ", error);
      });
  };

  render() {
    const { userPosts } = this.state; 

    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/viajero.png')}
            resizeMode='contain'
          />
          <Text style={styles.title}>Perfil</Text>
          <Text style={styles.description}>Email: {this.state.email}</Text>
          <Text style={styles.description}>User Name: {this.state.userName}</Text>
          <Text style={styles.description}>Número de Posts: {userPosts.length}</Text> 
        </View>
        <TouchableOpacity style={styles.buttonBlue} onPress={this.handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.postsContainer}>
          {userPosts.length > 0 ? (
            userPosts.map(post => {
              const imageSource = post.image ? { uri: post.image } : require('../../assets/viajero.png');
              return (
                <View key={post.id} style={styles.post}>
                  <Text style={styles.postText}>{post.descrip}</Text>
                  <Image
                    style={styles.postImage}
                    source={imageSource} 
                    resizeMode="cover"
                  />
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => this.handleDeletePost(post.id)}
                  >
                    <Text style={styles.deleteButtonText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <Text>No hay posts disponibles.</Text>
          )}
        </View>
      </View>
    );
  }
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    backgroundColor: '#c1c3ae',
  },
  formContainer: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
    width: 300,
    height: 350,
    borderColor: '#3A3A3A',
    borderWidth: 1,
    borderRadius: 5,
  },
  backgroundImage: {
    position: 'absolute', // Poner la imagen de fondo
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1, // Asegura que la imagen esté detrás de los demás componentes
  },
  image: {
    width: 170, 
    height: 150, 
    marginBottom: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#c1c3ae',
    margin: 20,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  description: {
    fontSize: 15,
    fontWeight: 'bolder',
    textAlign: 'center',
    color: '#606060',
    fontFamily: 'Roboto',
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
  postsContainer: {
    marginTop: 20,
  },
  post: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  postText: {
    fontSize: 16,
  },
  postImage: {
    width: 150,  
    height: 150, 
    marginTop: 10,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#ff6347',  
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});


