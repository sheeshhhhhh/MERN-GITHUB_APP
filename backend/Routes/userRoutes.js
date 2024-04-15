import express from 'express'
import { profile } from '../Controllers/userController.js'

const router = express.Router()

router.get("/profile/:username", profile)


export default router