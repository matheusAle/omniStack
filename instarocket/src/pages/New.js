import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    TextInput,
    Image,
 } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import api from "../services/api";

export default class Feed extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Nova publicação'
    });

    state = {
        image: null,
        author: '',
        place: '',
        description: '',
        hashtags: '',
        preview: {}
    };

    handleSubmit = async () => {

        const data = new FormData();

        data.append('image', this.state.image);
        data.append('author', this.state.author);
        data.append('place', this.state.place);
        data.append('description', this.state.description);
        data.append('hashtags', this.state.hashtags);


        await api.post('posts', data);
        this.props.navigation.navigate('Feed');
    };

    handlerImagePicker = () => {
        ImagePicker.showImagePicker({
            title: 'Selecione a imagem'
        }, ({ error, didCancel, data, uri, type, fileName }) => {
            if (didCancel && error) return;

            const preview = {
                uri: `data:image/jpeg;base64,${data}`
            };

            let [ name, ext ] = (fileName || new Date().getTime()).split('.');

            const image = {
                uri,
                type,
                data,
                name: `${name}.${ ext.toUpperCase() === 'heic' ? 'jpeg' : ext}`
            };

            this.setState({ preview, image });

        })
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.selectButton} onPress={this.handlerImagePicker}>
                    <Text style={styles.selectButtonText}>Selecionar imagem</Text>
                </TouchableOpacity>

                { this.state.preview && <Image source={this.state.preview} style={styles.preview}/> }

                <TextInput
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Nome autor"
                    placeholderTextColor="#999"
                    value={this.state.author}
                    onChangeText={ author => this.setState({ author }) }
                    style={styles.input} />

                <TextInput
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Local"
                    placeholderTextColor="#999"
                    value={this.state.place}
                    onChangeText={ place => this.setState({ place }) }
                    style={styles.input} />


                <TextInput
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Descrição"
                    placeholderTextColor="#999"
                    value={this.state.description}
                    onChangeText={ description => this.setState({ description }) }
                    style={styles.input} />


                <TextInput
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Nome autor"
                    placeholderTextColor="#999"
                    value={this.state.hashtags}
                    onChangeText={ hashtags => this.setState({ hashtags }) }
                    style={styles.input} />

                <TouchableOpacity style={styles.shareButton} onPress={this.handleSubmit}>
                    <Text style={styles.shareButtonText}>Compartilhar</Text>
                </TouchableOpacity>

            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 30,
    },

    selectButton: {
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#CCC',
      borderStyle: 'dashed',
      height: 42,

      justifyContent: 'center',
      alignItems: 'center',
    },

    selectButtonText: {
      fontSize: 16,
      color: '#666',
    },

    preview: {
      width: 100,
      height: 100,
      marginTop: 10,
      alignSelf: 'center',
      borderRadius: 4,
    },

    input: {
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 15,
      marginTop: 10,
      fontSize: 16,
    },

    shareButton: {
      backgroundColor: '#7159c1',
      borderRadius: 4,
      height: 42,
      marginTop: 15,

      justifyContent: 'center',
      alignItems: 'center',
    },

    shareButtonText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: '#FFF',
    },
  });
