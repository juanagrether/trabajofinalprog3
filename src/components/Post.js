import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            like: false,
            cantidad: this.props.item.data.likes.length
        };
    }

    componentDidMount() {
        if (this.props.item.data.likes.includes(auth.currentUser.email)) {
            this.setState({
                like: true
            })
        }
    }
    handleLike = () => {
        db.collection('posts').doc(this.props.item.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
            .then(() => {
                this.setState({
                    like: true,
                    cantidad: this.props.item.data.likes.length
                });
            });
    }
    handleDislike = () => {
        db.collection('posts').doc(this.props.item.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
            .then(() => {
                this.setState({
                    like: false,
                    cantidad: this.props.item.data.likes.length
                });
            });
    }
    render() {
        const { descrip, email, image } = this.props;

        return (
            <View style={styles.postContainer}>
                <Image
                    style={styles.postImage}
                    source={image ? { uri: image } : require('../../assets/avion.jpeg')}
                    resizeMode="cover"
                />
                <Text style={styles.postText}>{descrip}</Text>
                <Text style={styles.postUser}>Publicado por: {email}</Text>
                <View style={styles.likeContainer}>
                    <TouchableOpacity onPress={this.state.like ? this.handleDislike : this.handleLike}>
                        <Ionicons //agrego icono de corazon 
                            name={this.state.like ? 'heart' : 'heart-outline'}
                            size={24}
                            color={this.state.like ? 'red' : 'gray'}
                        />
                    </TouchableOpacity>
                    <Text style={styles.likeCount}>{this.state.cantidad}</Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    postContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
    },
    postImage: {
        width: '100%',
        height: 200,
        marginBottom: 10,
    },
    postText: {
        fontSize: 16,
    },
    postUser: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#666',
    },
});


