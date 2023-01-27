import express from 'express'
import morgan from 'morgan'
import { createComment, getCommentbyPostId, getCommentbyAuthorId } from '../controllers/comments.mjs'

const router = express.Router()
router.use(morgan('dev'))
router.use((rqe, res, next) => {
    console.log("Comments Router Running!")
    next()
})

router.post('/createComment', createComment)
router.get('/getCommentbyPostId/:id', getCommentbyPostId)
router.get('/getCommentbyAuthorId/:id', getCommentbyAuthorId)

export default router