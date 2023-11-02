import { AppState } from "../AppState"
import { TowerEvent } from "../models/TowerEvent"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TowerEventsService {

    async getAllEvents(){
const res = await api.get('api/events')
AppState.towerEvents = res.data.map(t => new TowerEvent(t))
}

async getActiveEvent(eventId){
    AppState.activeEvent = {}
const res = await api.get(`api/events/${eventId}`)
AppState.activeEvent = new TowerEvent(res.data)
}

    async cancelEvent(eventId){
        logger.log(eventId)
    const res = await api.delete(`api/events/${eventId}`)
    AppState.activeEvent.isCanceled = !AppState.activeEvent.isCanceled
}
}

export const towerEventsService = new TowerEventsService()