import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Post = ({ descrip, email, image }) => {
    return (
        <View style={styles.postContainer}>
            <Image
                style={styles.postImage}
                source={image ? { uri: image } : require('../../assets/avion.jpeg')}
                resizeMode="cover"
            />
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

export default Post;
