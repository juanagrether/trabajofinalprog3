import  React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-web';
import { auth, db } from '../firebase/config'

class Register extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          user: '',
          password: '',
          description: '',
          registered: false,
          errorMsg: ''
        };
    }
    componentDidMount () {
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.props.navigation.navigate('HomeMenu')
        }
      })
    }
    
    handleValidate = () => {
      const { email, user, password } = this.state;
  
      if (email === '' || !email.includes('@')) {
        return 'Email mal formateado';
      }
      if (user === '') {
        return 'Usuario mal formateado';
      }
      if (password === '') {
        return 'Contraseña mal formateada';
      }
      return null;
    };

    onSubmit(email, password, user, description){

      const errorMsg = this.handleValidate();
      if (errorMsg) { 
        this.setState({ errorMsg });
        return;
      }

      auth
          .createUserWithEmailAndPassword(email, password)
          .then((response) => {
            console.log("holaaa", email, password)
            if (response) {
              db.collection("users")
                .add({
                  email: auth.currentUser.email,
                  description: description,
                  user: user,
                  createdAt: Date.now(),
                })
                .then(() => {
                  this.setState({ registered: true, errorMsg: '' });
                  this.props.navigation.navigate('Login')
                })
                .catch(error => this.setState({ errorMsg: error.message }));
            }
          })
          .catch(error => {
            console.log(error.message);
            this.setState({ errorMsg: error.message })})
          
  }

  render(){
        return (
            <View style={styles.container}>
            <Text style={styles.title} >Registro</Text>
    
            <TextInput
              style={styles.field}
              keyboardType=' email-address'
              placeholder='email'
              onChangeText={text => this.setState({ email: text })}
              value={this.state.email}
            />
    
            <TextInput
              style={styles.field}
              keyboardType='default'
              placeholder='user'
              onChangeText={text => this.setState({ user: text })}
              value={this.state.user}
            />
    
            <TextInput style={styles.field}
              keyboardType='default'
              placeholder='description'
              onChangeText={text => this.setState({ description: text })}
              value={this.state.description}
            />
    
            <TextInput style={styles.field}
              keyboardType='default'
              placeholder='password'
              secureTextEntry={true}
              onChangeText={text => this.setState({ password: text })}
              value={this.state.password}
            />
    
            <TouchableOpacity style={styles.buttonBlue} onPress={() => this.onSubmit(this.state.email, this.state.password, this.state.user, this.state.description)} >
              <Text style={styles.buttonText}> Register </Text>
            </TouchableOpacity>

            {/* mensaje de error */}
            {this.state.errorMsg ? <Text style={styles.error}>{this.state.errorMsg}</Text> : null}
            
            <TouchableOpacity style={styles.buttonBlue} onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={styles.buttonText}>Ya tengo cuenta</Text>
            </TouchableOpacity>
            
          </View>
        )
    }
}

export default Register; 

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

