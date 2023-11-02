import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketsService{

async getPeopleGoingToEvent(eventId){
const res = await api.get(`api/events/${eventId}/tickets`)
AppState.tickets = res.data.map(t => new Ticket(t))
}

    async grabTicket(eventId){
    const res = await api.post('api/tickets', {eventId})
    logger.log('ticket', res.data)
    AppState.tickets.push(new Ticket(res.data))
    AppState.Mytickets.push(new Ticket(res.data))
    AppState.activeEvent.ticketCount++
}

    async getMyTickets(){
    const res = await api.get('account/tickets')
    logger.log('my tickets', res.data)
    AppState.Mytickets = res.data.map(t => new Ticket(t))
}

async unAttendEvent(ticketId){
    const res = await api.delete(`api/tickets/${ticketId}`)
    logger.log('deleted ticket', res.data)
    AppState.Mytickets = AppState.Mytickets.filter(t => t.id != ticketId)
}

}

export const ticketsService = new TicketsService()