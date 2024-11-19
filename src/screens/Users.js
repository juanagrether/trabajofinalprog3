import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Image } from 'react-native';
import { db } from '../firebase/config';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
        users: [],
        filterU: [],
        filterValue: '',
    };
  }
  componentDidMount() {
    db.collection('users').onSnapshot(
        docs => {
            let usuarios = [];
            docs.forEach(doc => {
                usuarios.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            this.setState({
                users: usuarios,
                filterU: usuarios
            });
        }
    );
  }

  userFilter = (text) => {
    this.setState({
        filterValue: text,
        filterU: this.state.users.filter(user => user.data.email.toLowerCase().includes(text.toLowerCase())),
    });
  };

  render() {
    return (
        <View style={styles.container}>
          <Image
          source={require('../../assets/fondo.jpg')}
          style={styles.backgroundImage}
          />

            <View style={styles.form}>
                <Text style={styles.title}>Users</Text>
                <TextInput
                    style={styles.field}
                    keyboardType='email-address'
                    placeholder='Filtrar email'
                    onChangeText={this.userFilter}
                    value={this.state.filterValue}
                />

                <FlatList
                    data={this.state.filterU}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.userItem}>
                            <View style={styles.userInfo}>
                                <Text>Email: {item.data.email}</Text>
                                <Text>Username: {item.data.user}</Text>
                                <Text>Created At: {item.data.createdAt}</Text>
                            </View>
                        </View>
                    )}
                    style={styles.list} 
                />
            </View>
        </View>
    );
  }
}

export default Users;


const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  container: {
    flex: 1, // Asegura que ocupe todo el espacio disponible
    paddingHorizontal: 25,
    backgroundColor: '#F0F4F8',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#3A3A3A',
    margin: 10,
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
    fontFamily: 'Roboto',
  },
  backgroundImage: {
    position: 'absolute', 
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1, // Esto ya está correcto
    resizeMode: 'cover', // Ajusta para evitar distorsión
  },
  form: {
    flex: 1, // Asegura que ocupe el espacio disponible
    width: '100%', // Asegura que el contenido no se recorte horizontalmente
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  list: {
    flex: 1,
    width: '100%', // Asegura que el ancho sea completo
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

  userItem: {
    padding: 15,
    backgroundColor: '#3A3A3A',
    marginVertical: 8,
    borderRadius: 8,
  },
  userInfo: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#c1c3ae',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Roboto',
},
  
});

