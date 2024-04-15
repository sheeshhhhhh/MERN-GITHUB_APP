import express from 'express'
import { popularrepos } from '../Controllers/exploreController.js'

const router = express.Router()

router.get("/repos/:language", popularrepos)

export default router