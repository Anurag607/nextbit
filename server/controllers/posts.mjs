import {Post} from '../models/posts.mjs'

const createPost = async (req,res) => {
    try {
        const savePost = await new Post(req.body)
        const savedPost = await savePost.save()
        res.status(200).json(savedPost)
    
    } catch (error) {
        console.error(error.message)
        res.status(500).end()
    }
}

const deletePost = async (req, res) => {
    try {
        const post =  await Post.findById(req.params.id)
        if (post.userId === req.body.userId) {
            await post.delete()
            res.status(200).json({message: 'the post is deleted'})
        } else {
            res.status(403).json({message: 'you can only delete your post'})
        }

    } catch (error) {
        console.error(error.message)
      res.status(500).end()
    }
}

const updatePost = async (req,res)=> {
    try {
        console.log(req.body)
        const post = await Post.findById(req.params.id)
        if(post.userId === req.body.userId) {
            await post.updateOne({$set:req.body})
            res.status(200).json({message: 'the post is updated'})
        } else {
            res.status(403).json({message: 'you can only update your post'})
        }

    } catch (error) {
        console.error(error.message)
        res.status(500).end()
    }
}

const getAllPosts = async (req,res) => {
    try {
        const posts = await Post.find()
        res.status(200).json(posts)

    } catch (error) {
        console.error(error.message)
        res.status(500).end()
    }
}

const getOnePost = async (req,res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)

    } catch (error) {
        console.error(error.message)
        res.status(500).end()
    }
}

const getAllPostbyUserId = async (req,res) => {
    try {
        const post = await Post.find({user_id: req.params.id})
        res.status(200).json(post)

    } catch (error) {
        console.error(error.message)
        res.status(500).json([])
    }
}

export { createPost, updatePost, deletePost, getAllPosts, getOnePost, getAllPostbyUserId }