const Post = require('../models/Post.model');

module.exports = {
    async store(req, res) {
        const post = await Post.findByIdAndUpdate(req.params.post, { $inc: { likes: 1 } }, { new: true })

        req.io.emit('like', post);

        return res.json(post)
    }
}