import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { auth, db } from '../firebase/config';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: auth.currentUser.email || '',
            userName: '',
            error: '',
            userPosts: [],
        };
    }

    componentDidMount() {
      db.collection("posts")
        .where("userEmail", "==", auth.currentUser.email)
        .onSnapshot((docs) => {
          let postArray = [];
          docs.forEach((doc) => {
            postArray.push({ id: doc.id, data: doc.data() });
          });
          postArray.sort((a, b) => b.data.createdAt - a.data.createdAt);
          this.setState({
            userPosts: postArray,
            isLoading: false,
          });
        });
    }

    handleLogout = () => {
      auth.signOut()
        .then(() => {
          console.log('Sesión cerrada');
          this.props.navigation.navigate('Login');
        })
        .catch((error) => {
          console.error("Error al cerrar sesión: ", error);
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Image style={styles.image}
                        source={require('../../assets/viajero.png')}
                        resizeMode='contain' 
                    />

                    <Text style={styles.title}>Perfil</Text>
                    <Text style={styles.detail}>Email: {this.state.email}</Text>
                    <Text style={styles.detail}>User Name: {this.state.userName}</Text>

                    {this.state.error ? (
                        <Text style={styles.error}>{this.state.error}</Text>
                    ) : null}
                </View>
                <TouchableOpacity style={styles.button} onPress={this.handleLogout}>
                  <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  formContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 400,
    height: 400,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
  },
  error: {
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
});
