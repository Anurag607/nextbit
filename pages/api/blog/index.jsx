import nc from 'next-connect'
import blogData from "../../../src/data/data"

const port = process.env.API_URL

const handler = nc()
    .get(async(req, res) => {
        if(!blogData) {
            res.status(404).end()
        }
        res.status(200).json(blogData)
    })

export default handler