import mongoose from 'mongoose'

mongoose.Promise = global.Promise

const connect = (url) => mongoose.connect(url)

export default connect