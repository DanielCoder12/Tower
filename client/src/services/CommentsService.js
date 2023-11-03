import { AppState } from "../AppState"
import { Comment } from "../models/Comment"
import { api } from "./AxiosService"

class CommentsService{

    async getEventComments(eventId){
    const res = await api.get(`api/events/${eventId}/comments`)
    AppState.comments = res.data.map(c => new Comment(c))
    
        

}

async postComment(body){
    const res = await api.post('api/comments', body)
    AppState.comments.push(new Comment(res.data))
}

async destroyComment(commentId){
 await api.delete(`api/comments/${commentId}`)
   AppState.comments = AppState.comments.filter(c => c.id != commentId)
}

}

export const commentsService = new CommentsService()