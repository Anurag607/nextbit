import mongoose from 'mongoose'

mongoose.set('strictQuery', false)
mongoose.Promise = global.Promise

const connect = (url) => mongoose.connect(url)

export default connect