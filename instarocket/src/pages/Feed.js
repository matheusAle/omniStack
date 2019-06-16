import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Text,
    StyleSheet
} from 'react-native';

import camera from '../assets/camera.png';
import api from '../services/api';
import like from '../assets/like.png';
import more from '../assets/more.png';
import send from '../assets/send.png';
import comment from '../assets/comment.png';
import io from 'socket.io-client';

export default class Feed extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerRight: (
            <TouchableOpacity onPress={() => navigation.navigate('New')}>
                <Image source={camera} style={{ marginRight: 20 }}/>
            </TouchableOpacity>
        )
    });

    state = {
        feed: []
    };

    async componentDidMount() {
        const { data } = await api.get('posts');
        this.setState({ feed: data });
        this.registerToSocket();
    }

    handleLike = async ({ _id }) => {
        await api.post(`posts/${_id}/like`);
    };

    registerToSocket = () => {
        const socket = io('http://192.168.1.9:3333');

        socket.on('post', newPost => {
            this.setState({ feed: [newPost, ...this.state.feed] })
        });

        socket.on('like', postLike => {
            this.setState({ feed: this.state.feed.map(p => {
                if (p._id === postLike._id) p.likes = postLike.likes;
                return p;
            }) })
        })
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.feed}
                    keyExtractor={post => post._id}
                    renderItem={({ item }) => (
                        <View style={styles.feedItem}>
                            <View style={styles.feedItemHeader}>
                                <View style={styles.userInfo}>
                                    <Text style={styles.name}>{item.author}</Text>
                                    <Text style={styles.place}>{item.place}</Text>
                                </View>
                                <Image source={more} />
                            </View>
                            <Image style={styles.feedImage} source={{ uri: `http://192.168.1.9:3333/files/${item.image}` }} />
                            <View style={styles.footer}>
                                <View style={styles.actions}>
                                    <TouchableOpacity onPress={() => this.handleLike(item)} style={styles.action}>
                                        <Image source={like} />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => {}} style={styles.action}>
                                        <Image source={comment} />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => {}} style={styles.action}>
                                        <Image source={send} />
                                    </TouchableOpacity>
                                </View>

                                <Text style={styles.likes}>{item.likes} curtidas</Text>
                                <Text style={styles.description}>{item.description}</Text>
                                <Text style={styles.hastags}>{item.hashtags}</Text>

                            </View>
                        </View>
                    )} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    feedItem: {
        marginTop: 20,
    },
    feedItemHeader: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    place: {
        marginTop: 1,
        fontSize: 11,
        color: '#666'
    },
    feedImage: {
        width: '100%',
        height: 400,
        marginVertical: 15
    },
    footer: {
        paddingHorizontal: 15,
    },
    actions: {
        flexDirection: 'row',
    },
    action: {
        marginRight: 10
    },
    likes: {
        marginTop: 10,
        fontWeight: 'bold',
        color: '#000'
    },
    description: {
        lineHeight: 18,
        color: '#000'
    },
    hastags: {
        color: '#7159c1',
    }
});
