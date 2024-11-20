import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
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
        docs.forEach(doc => {
          const postData = doc.data();
          postArray.push({
            id: doc.id,
            data: postData,
          });
        });
        postArray.sort((a, b) => b.data.createdAt - a.data.createdAt);
        this.setState({ userPosts: postArray });
      });
  }

  handleLogout = () => {
    auth.signOut()
      .then(() => {
        this.props.navigation.navigate('Login');
      })
      .catch((error) => {
        console.error("Error al cerrar sesión: ", error);
      });
  };

  handleDeletePost = (id) => {
    db.collection('posts')
      .doc(id)
      .delete()
      .then(() => {
        console.log(`Post ${id} eliminado`);
      })
      .catch(error => console.log(error));
  };

  render() {
    const { userPosts } = this.state;

    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/fondo.jpg')}
          style={styles.backgroundImage}
        />
        <View style={styles.header}>
          <Image
            style={styles.image}
            source={require('../../assets/viajero.png')}
            resizeMode='cover'
          />
          <Text style={styles.title}>Perfil de Viajero</Text>
          <Text style={styles.description}>Email: {this.state.email}</Text>
          <Text style={styles.description}>Usuario: {this.state.userName}</Text>
          <Text style={styles.description}>Número de Posts: {userPosts.length}</Text>
        </View>
        <TouchableOpacity style={styles.buttonBlue} onPress={this.handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        {userPosts.length === 0 ? (
          <Text style={styles.noPostsText}>No hay posts</Text>
        ) : (
        <FlatList
          data={userPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <Image
                source={{ uri: item.data.image }}
                style={styles.postImage}
              />
              <Text style={styles.postText}>{item.data.descrip}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => this.handleDeletePost(item.id)}
              >
                <Text style={styles.deleteText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
         )}
         />
       )}
     </View>
   );
 }};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    backgroundColor: '#c1c3ae',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
    width: 300,
    padding: 20,
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3A3A3A',
    marginBottom: 10,
    fontFamily: 'Roboto',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#606060',
    marginBottom: 5,
    fontFamily: 'Roboto',
  },
  buttonBlue: {
    backgroundColor: '#3A3A3A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  postContainer: {
    width: 270,
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
  postImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  postText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#606060',
    fontFamily: 'Roboto',
    marginBottom: 5
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#FF4D4D',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'c',
  },
  deleteText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'Roboto',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  noPostsText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});


