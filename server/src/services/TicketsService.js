import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { towerEventsService } from "./TowerEventsService.js"

class TicketsService {
    async destroyTicket(ticketId, userId) {
        const ticket = await dbContext.Tickets.findById(ticketId)
        if (!ticket) {
            throw new BadRequest(`no ticket with this id ${ticketId}`)
        }
        if (ticket.accountId != userId) {
            throw new Forbidden('you cant delete this')
        }
        await ticket.remove()
        return 'successfully deleted'
    }
    async getTicketsForEvent(eventId) {
        const ticket = await dbContext.Tickets.find({ eventId: eventId }).populate('profile')
        return ticket
    }
    async getMyTickets(accountId) {
        const ticket = await dbContext.Tickets.find({ accountId }).populate('event')
        return ticket
    }
    async createTicket(body) {
        const towerEvent = await towerEventsService.getEventById(body.eventId)
        if (towerEvent.isCanceled) {
            throw new Forbidden('this event was canceled')
        }
        // @ts-ignore
        if (towerEvent.ticketCount == towerEvent.capacity) {
            throw new Forbidden('event is full')
        }
        const ticket = await dbContext.Tickets.create(body)
        await ticket.populate('profile', 'name picture')
        await ticket.populate('event')
        return ticket
    }

}

export const ticketsService = new TicketsService()