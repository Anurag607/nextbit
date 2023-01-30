import {Comment} from '../models/comments.mjs'

const createComment = async (req,res) => {
    try {
        const saveComment = await new Comment(req.body)
        const savedComment = await saveComment.save()
        res.status(200).json(savedComment)
    
    } catch (error) {
        console.error(error.message)
        res.status(500).end()
    }
}

const getCommentbyPostId = async (req,res) => {
    try {
        const comment = await Comment.find({post_id: req.params.id})
        res.status(200).json(comment)

    } catch (error) {
        console.error(error.message)
        res.status(500).end()
    }
}
const getCommentbyAuthorId = async (req,res) => {
    try {
        const comment = await Comment.findById(req.params.id)
        res.status(200).json(comment)

    } catch (error) {
        console.error(error.message)
        res.status(500).end()
    }
}


export { createComment, getCommentbyPostId, getCommentbyAuthorId }