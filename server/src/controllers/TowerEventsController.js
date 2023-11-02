import { Auth0Provider } from "@bcwdev/auth0provider";
import { towerEventsService } from "../services/TowerEventsService.js";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";

export class TowerEventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('/:eventId/comments', this.getEventComments)
            .get('/:eventId/tickets', this.getTicketsForEvent)
            .get('', this.getEvents)
            .get('/:eventId', this.getEventById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
            .put('/:eventId', this.editEvent)
            .delete('/:eventId', this.destroyEvent)
    }
    async getEventComments(req, res, next) {
        try {
            const comments = await commentsService.getEventComments(req.params.eventId)
            res.send(comments)
        } catch (error) {
            next(error)
        }
    }
    async getTicketsForEvent(req, res, next) {
        try {
            const ticket = await ticketsService.getTicketsForEvent(req.params.eventId)
            res.send(ticket)
        } catch (error) {
            next(error)
        }
    }

    async getEvents(req, res, next) {
        try {
            const towerEvents = await towerEventsService.getEvents()
            res.send(towerEvents)
        } catch (error) {
            next(error)
        }
    }

    async getEventById(req, res, next) {
        try {
            const towerEvent = await towerEventsService.getEventById(req.params.eventId)
            res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }
    async createEvent(req, res, next) {
        try {
            const body = req.body
            const userId = req.userInfo.id
            body.creatorId = userId
            body.isCanceled = false
            const towerEvent = await towerEventsService.createEvent(body)
            res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }

    async editEvent(req, res, next) {
        try {
            const userId = req.userInfo.id
            const eventId = req.params.eventId
            const body = req.body
            const towerEvent = await towerEventsService.editEvent(userId, eventId, body)
            res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }
    async destroyEvent(req, res, next) {
        try {
            const eventId = req.params.eventId
            const userId = req.userInfo.id
            const message = await towerEventsService.destroyEvent(eventId, userId)
            res.send(message)
        } catch (error) {
            next(error)
        }
    }

}