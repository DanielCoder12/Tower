import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";

export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createComment)
            .delete('/:commentId', this.destroyComment)
    }

    async createComment(req, res, next) {
        try {
            const body = req.body
            body.creatorId = req.userInfo.id
            const comment = await commentsService.createComment(body)
            res.send(comment)
        } catch (error) {
            next(error)
        }
    }

    async destroyComment(req, res, next) {
        try {
            const commentId = req.params.commentId
            const userId = req.userInfo.id
            const message = await commentsService.destroyComment(commentId, userId)
            res.send(message)
        } catch (error) {
            next(error)
        }
    }
}