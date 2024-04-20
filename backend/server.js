import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import passport from 'passport'
import session from 'express-session'

import './passport/githubauth.js'

import userRoutes from './Routes/userRoutes.js'
import exploreRoutes from './Routes/exploreRoutes.js'
import authRoutes from './Routes/authRoutes.js'

import { connecttodb } from './DB/connectDB.js'

const app = express()

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

app.listen(5000, () => {
    console.log("server has started on port 5000")

    connecttodb()
})