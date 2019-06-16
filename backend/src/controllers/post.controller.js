const Post = require('../models/Post.model');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

module.exports = {
    async index(req, res) {
        return res.json(await Post.find({}).sort({ createdAt: -1 }));
    },
    async store(req, res) {
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;

        const [ name ] = image.split('.');
        const fileName = `${name}.jpg`;

        await sharp(req.file.path)
        .resize(500)
        .jpeg({ quality: 70 })
        .toFile(path.resolve(req.file.destination, 'resized', fileName));

        fs.unlinkSync(req.file.path);

        const post = await Post.create({ author, place, image, description, hashtags, image: fileName });

        req.io.emit('post', post);

        return res.json(post)
    }
}