import express from 'express'
import morgan from 'morgan'
import { createPost, updatePost, deletePost, getAllPosts, getOnePost, getAllPostbyUserId } from '../controllers/posts.mjs'

const router = express.Router()
router.use(morgan('dev'))
router.use((req, res, next) => {
    console.log("Posts Router Running!")
    next()
})

router.post('/createPost', createPost)
router.put('/updatePost/:id', updatePost)
router.delete('/deletePost/:id', deletePost)
router.get('/getAll', getAllPosts)
router.get('/getPost/:id', getOnePost)
router.get('/getUsersPosts/:id', getAllPostbyUserId)

export default router