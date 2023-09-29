import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    author_email: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    bgImage: {
        type: String,
        required: true
    },
    introImage: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Post = mongoose.model('Post', postSchema)

export { Post }