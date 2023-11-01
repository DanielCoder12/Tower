import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CommentsService {
    async destroyComment(commentId, userId) {
        const comment = await dbContext.Comments.findById(commentId)
        if (!comment) {
            throw new BadRequest(`no comment with this id ${commentId}`)
        }
        if (comment.creatorId != userId) {
            throw new Forbidden('not your comment')
        }
        comment.remove()
        return 'comment deleted'
    }
    async getEventComments(eventId) {
        const comments = await dbContext.Comments.find({ eventId }).populate('creator')
        return comments
    }
    async createComment(body) {
        const comment = await dbContext.Comments.create(body)
        await comment.populate('creator')
        return comment
    }

}

export const commentsService = new CommentsService()