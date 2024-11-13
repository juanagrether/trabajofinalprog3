import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { auth } from '../firebase/config'; 
function Home({ navigation }) {


  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        console.log('Sesión cerrada');
        navigation.replace('Login');
      })
      .catch((error) => {
        console.error("Error al cerrar sesión: ", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.message}>¡Estás en HomeMenu!</Text>
      
      {/* Botón de Cerrar sesión */}
      <Button title="Cerrar sesión" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Home;

