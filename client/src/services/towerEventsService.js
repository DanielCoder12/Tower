import { AppState } from "../AppState"
import { TowerEvent } from "../models/TowerEvent"
import { api } from "./AxiosService"

class TowerEventsService {

    
    async getAllEvents(){
const res = await api.get('api/events')
AppState.towerEvents = res.data.map(t => new TowerEvent(t))

}

async getMyEvents(){
const res = await api.get(`api/events`)
const events = res.data.map(t => new TowerEvent(t))
AppState.mytowerEvents = events.filter(t => t.creatorId == AppState.account.id)
}

checkAttendingStatus(){
    AppState.tickets.forEach(t => {if(AppState.account.id == t.accountId){
        AppState.activeEvent.isAttending = true
    }
        
    });
}
async getActiveEvent(eventId){
    AppState.activeEvent = {}
const res = await api.get(`api/events/${eventId}`)
AppState.activeEvent = new TowerEvent(res.data)
}

    async cancelEvent(eventId){
    await api.delete(`api/events/${eventId}`)
    AppState.activeEvent.isCanceled = !AppState.activeEvent.isCanceled
}

async createEvent(payload){
    const res = await api.post('api/events', payload)
    return res.data._id
}

    async editEvent(body, eventId){
    const res = await api.put(`api/events/${eventId}`, body)
    AppState.activeEvent = new TowerEvent(res.data)
}


}

export const towerEventsService = new TowerEventsService()