import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import envPath from './env_path.mjs'
import userRoutes from './routes/auth.mjs'
import postRoutes from './routes/posts.mjs'
import commentRoutes from './routes/comments.mjs'
import connect from './utils/connect.mjs'

dotenv.config({path: envPath})
const PORT = process.env.PORT
const HOST = process.env.HOST

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connect(process.env.MONGO_URL, {
    useNewUrlParser: true
})
.then(console.log("Connected to Database"))
.catch(err => console.error(err.message))

app.get('/hello', (_, res) => res.send('Hello World!'))
app.use('/api/user', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)

app.listen(PORT, () => {
    console.log(`Server running on ${process.env.RENDER}`)
})