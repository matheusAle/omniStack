import React, { Component } from 'react';
import './New.css';
import api from '../services/api';

export default class New extends Component {

    state = {
        image: null,
        author: '',
        place: '',
        description: '',
        hashtags: '',
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleImageChange = e => {
        this.setState({ [e.target.name]: e.target.files[0] })
    }

    handleSubmit = async e => {
        e.preventDefault();

        const data = new FormData();

        data.append('image', this.state.image);
        data.append('author', this.state.author);
        data.append('place', this.state.place);
        data.append('description', this.state.description);
        data.append('hashtags', this.state.hashtags);


        await api.post('posts', data);
        this.props.history.push('/');
    }

    render() {
        return (
            <form id="new-post" onSubmit={this.handleSubmit}>
                <input type="file" name="image" id="" onChange={this.handleImageChange}/>

                <input
                    type="text"
                    name="author"
                    placeholder="Author do post"
                    onChange={this.handleChange}
                />

                <input
                    type="text"
                    name="place"
                    placeholder="local"
                    onChange={this.handleChange}
                />

                <input
                    type="text"
                    name="description"
                    placeholder="Descrição"
                    onChange={this.handleChange}
                />

                <input
                    type="text"
                    name="hashtags"
                    placeholder="hashtags"
                    onChange={this.handleChange}
                />

                <button type="submit">Enviar</button>

            </form>
        )
    }
}