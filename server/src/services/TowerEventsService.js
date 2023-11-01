import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TowerEventsService {

    // TODO FIX THIS
    async editEvent(userId, eventId, body) {
        const towerEvent = await this.getEventById(eventId)
        if (!towerEvent) {
            throw new BadRequest(`nothing with the id ${eventId}`)
        }
        if (towerEvent.creatorId != userId) {
            throw new Forbidden(`not your event to edit`)
        }
        if (towerEvent.isCanceled) {
            throw new BadRequest('this event is canceled')
        }
        towerEvent.name = body.name || towerEvent.name
        towerEvent.description = body.description || towerEvent.description
        towerEvent.coverImg = body.coverImg || towerEvent.coverImg
        towerEvent.location = body.location || towerEvent.location
        towerEvent.capacity = body.capacity || towerEvent.capacity
        towerEvent.startDate = body.startDate || towerEvent.startDate
        await towerEvent.save()
        return towerEvent
    }
    async destroyEvent(eventId, userId) {
        const towerEvent = await this.getEventById(eventId)
        if (towerEvent.creatorId != userId) {
            throw new Forbidden('not your event to cancel')
        }
        if (!towerEvent) {
            throw new BadRequest(`nothing with the id ${eventId}`)
        }
        towerEvent.isCanceled = !towerEvent.isCanceled
        await towerEvent.save()
        return towerEvent
    }
    async getEventById(eventId) {
        const towerEvent = await dbContext.TowerEvents.findById(eventId)
        await towerEvent.populate('ticketCount')
        return towerEvent
    }
    async getEvents() {
        const towerEvents = await dbContext.TowerEvents.find().populate('ticketCount')
        return towerEvents
    }
    async createEvent(body) {
        const towerEvent = await dbContext.TowerEvents.create(body)
        await towerEvent.populate('ticketCount')
        return towerEvent
    }

}

export const towerEventsService = new TowerEventsService()