import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import userRoutes from './Routes/userRoutes.js'
import exploreRoutes from './Routes/exploreRoutes.js'
import authRoutes from './Routes/authRoutes.js'

const app = express()
app.use(cors())

dotenv.config()

app.use("/api/users", userRoutes)
app.use("/api/explore", exploreRoutes)
app.use("/api/auth", authRoutes)

app.listen(5000, () => {
    console.log("server has started on port 5000")
})