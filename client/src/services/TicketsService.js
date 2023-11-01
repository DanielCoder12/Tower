import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketsService{

async getPeopleGoingToEvent(eventId){
const res = await api.get(`api/events/${eventId}/tickets`)
AppState.tickets = res.data.map(t => new Ticket(t))
}

}

export const ticketsService = new TicketsService()