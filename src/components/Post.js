// Post.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Post = ({ descrip, email }) => {
    return (
        <View style={styles.postContainer}>
            <Text style={styles.postText}>{descrip}</Text>
            <Text style={styles.postUser}>Publicado por: {email}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    postContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
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
    postDate: {
        fontSize: 12,
        color: '#aaa',
    },
});

export default Post;