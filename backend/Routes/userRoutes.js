import express from 'express'
import { getLikes, likeprofile, profile } from '../Controllers/userController.js'
import { ensureAuthenticated } from '../Middleware/ensureAuthenticated.js'

const router = express.Router()

router.get("/profile/:username", profile)

router.post("/likes", ensureAuthenticated, getLikes)

router.post("/Like/:username", ensureAuthenticated, likeprofile)


export default router