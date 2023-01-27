import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Comment = mongoose.model('Comment', postSchema)

export {Comment}