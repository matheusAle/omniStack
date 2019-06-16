import React, { Component } from 'react';
import './Feed.css';
import like from '../assets/like.svg';
import more from '../assets/more.svg';
import send from '../assets/send.svg';
import comment from '../assets/comment.svg';
import api from '../services/api';
import io from 'socket.io-client';

export default class Feed extends Component {

    state = {
        feed: []
    }

    async componentDidMount() {
        const { data } = await api.get('posts');
        this.setState({ feed: data })
        this.registerToSocket();
    }

    handleLike = async ({ _id }, e) => {
        await api.post(`posts/${_id}/like`);
    }

    registerToSocket = () => {
        const socket = io('http://192.168.1.9:3333');

        socket.on('post', newPost => {
            this.setState({ feed: [newPost, ...this.state.feed] })
        })

        socket.on('like', postLike => {
            this.setState({ feed: this.state.feed.map(p => {
                if (p._id === postLike._id) p.likes = postLike.likes;
                return p;
            }) })
        })

    }

    render() {
        return (
            <section id="post-list">
                { this.state.feed.map(post => (
                    <article key={post._id}>
                        <header>
                            <div className="user-info">
                                <span>{ post.author }</span>
                                <span className="place">{ post.place }</span>
                            </div>

                            <img src={more} alt="Mais" />

                        </header>

                        <img src={`http://192.168.1.9:3333/files/${post.image}`} />

                        <footer>
                            <div className="actions">
                            <button type="button" onClick={e => this.handleLike(post, e)}>
                                <img src={like} />
                            </button>
                                <img src={comment} />
                                <img src={send} />
                            </div>

                            <strong>
                                { post.likes } curtidas
                            </strong>

                            <p>
                                { post.description }
                                <span>{ post.hashtags }</span>
                            </p>

                        </footer>
                </article>
                )) }

            </section>
        )
    }
}
