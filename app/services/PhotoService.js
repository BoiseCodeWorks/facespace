import mongoose from 'mongoose'
let ObjectId = mongoose.Schema.Types.ObjectId

let _commentSchema = new mongoose.Schema({
    authorId: { type: ObjectId, ref: 'user', required: true },
    content: { type: String, required: true }
   }, { timestamps: true })

let _schema = new mongoose.Schema({
    authorId: { type: ObjectId, ref: 'user', required: true },
    imgUrl: { type: String, required: true },
    description: { type: String },
    comments: [_commentSchema]
}, { timestamps: true })

export default class PhotoService {
    get repository() {
        return mongoose.model('photo', _schema)
    }

    async commentsRoute(id, comment) {
        try {
            // need to query the db for the photo with this id
            // depending on properties of the comment either
            // save the photo
            
            let photo = await this.repository.findById(id)
            // add a comment
            if (!comment._id) {
                photo.comments.push(comment)
            } else { // delete a comment
                photo.comments.forEach((c, i, a) => {
                    if (c._id.toString() == comment._id) {
                        a.splice(i, 1)
                    }
                })
            }
            await photo.save()
            return photo
        } catch (error) {
            throw error
        }
    }
}