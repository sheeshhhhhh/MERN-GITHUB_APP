import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import session from 'express-session'
import passport from 'passport'

import './passport/githubauth.js'

import authRoutes from './Routes/authRoutes.js'
import exploreRoutes from './Routes/exploreRoutes.js'
import userRoutes from './Routes/userRoutes.js'

import path from 'path'
import { connecttodb } from './DB/connectDB.js'

const app = express()
const PORT = process.env.PORT || 5000

const __dirname = path.resolve()

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.use(cors())

dotenv.config()

app.use("/api/users", userRoutes)
app.use("/api/explore", exploreRoutes)
app.use("/api/auth", authRoutes)

app.use(express.static(path.join(__dirname, "frontend/dist")))

app.get("*", (req, res) => {
    res.send(path.join(__dirname, "frontend", "dist", "index.html"))
})


app.listen(PORT, () => {
    console.log("server has started on port", PORT)

    connecttodb()
})