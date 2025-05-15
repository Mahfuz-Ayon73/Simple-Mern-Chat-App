import path from "path"
import express from 'express'
import dotenv from 'dotenv'
import connectToMongoDB from './db/connetToMongoDB.js'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routers.js'
import { app , server} from './socket/socket.js'

dotenv.config()

const __dirname = path.resolve();
// const app = express()
const PORT = process.env.PORT || 5000


app.use(express.json()) // middleware to extract data from res.body
app.use(cookieParser())
app.use('/api/auth',authRoutes) // middleware
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)

app.use(express.static(path.join(__dirname,"/frontend/dist")))

app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

server.listen(PORT , () => {
    connectToMongoDB()
    console.log(`server is running ${PORT}`)
})
