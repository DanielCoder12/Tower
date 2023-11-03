import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { api } from "./AxiosService"

class TicketsService{

async getPeopleGoingToEvent(eventId){
const res = await api.get(`api/events/${eventId}/tickets`)
AppState.tickets = res.data.map(t => new Ticket(t))
}

    async grabTicket(eventId){
    const res = await api.post('api/tickets', {eventId})
    AppState.tickets.push(new Ticket(res.data))
    AppState.Mytickets.push(new Ticket(res.data))
    AppState.activeEvent.ticketCount++
}

    async getMyTickets(){
    const res = await api.get('account/tickets')
    AppState.Mytickets = res.data.map(t => new Ticket(t))
}

async unAttendEvent(ticketId){
    await api.delete(`api/tickets/${ticketId}`)
    AppState.Mytickets = AppState.Mytickets.filter(t => t.id != ticketId)
}

}

export const ticketsService = new TicketsService()