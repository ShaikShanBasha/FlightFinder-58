import express from "express"
const Router = express.Router()
import { bookTicket, cancelTicket } from "../controllers/customerController.js"

Router.post('/book-ticket',bookTicket)
Router.put('/cancel-ticket/:id',cancelTicket)

export default Router;