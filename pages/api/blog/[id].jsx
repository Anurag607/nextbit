import nc from 'next-connect'
import blogData from "../../../src/data/data"

const handler = nc()
    .get((req,res) => {
        if(!blogData) {
            res.status(404).end()
            return
        }

        let id = req.url.split('/')[3].split('%20')
        let key="", dummy="", image=""
        let topic = ""

        for (let i = 0; i < id.length; i++) {
            if(i == 0) topic += id[i]
            if(i == 0 && id.length > 1) topic += " "
            else topic += id[i]+" "
        }

        topic = topic.trim()

        for(const [k,v] of Object.entries(blogData[0].topics)) {
            if (v === topic) {
                key = k
                break
            }
        }
        
        for(const [k,v] of Object.entries(blogData[0].placeholder)) {
            if(k === key) {
                dummy = v
                break
            }
        }

        for(const [k,v] of Object.entries(blogData[0].bgimages)) {
            if(k === key) {
                image = v
                break
            }
        }

        res.status(200).json({"placeholder" : dummy, "bgimages" : image})
    })

export default handler