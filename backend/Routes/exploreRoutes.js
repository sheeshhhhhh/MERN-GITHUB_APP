import express from 'express'
import { popularrepos } from '../Controllers/exploreController.js'
import { ensureAuthenticated } from '../Middleware/ensureAuthenticated.js'

const router = express.Router()

router.get("/repos/:language", ensureAuthenticated, popularrepos)

export default router