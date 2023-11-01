import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";

export class TicketsController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router

            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTicket)
            .delete('/:ticketId', this.destroyTicket)
    }




    async createTicket(req, res, next) {
        try {
            const body = req.body
            body.accountId = req.userInfo.id
            const ticket = await ticketsService.createTicket(body)
            res.send(ticket)
        } catch (error) {
            next(error)
        }
    }

    async destroyTicket(req, res, next) {
        try {
            const ticketId = req.params.ticketId
            const userId = req.userInfo.id
            const message = await ticketsService.destroyTicket(ticketId, userId)
            res.send(message)
        } catch (error) {
            next(error)
        }
    }
}