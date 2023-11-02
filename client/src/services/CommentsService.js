import { AppState } from "../AppState"
import { Comment } from "../models/Comment"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService{

    async getEventComments(eventId){
    const res = await api.get(`api/events/${eventId}/comments`)
    AppState.comments = res.data.map(c => new Comment(c))
}

async postComment(body){
    const res = await api.post('api/comments', body)
    logger.log(res.data)
    AppState.comments.push(new Comment(res.data))
}

}

export const commentsService = new CommentsService()