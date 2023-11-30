import express from 'express'
import bodyParser from 'body-parser' 
import cors from 'cors'  
import firebaseApp from './config/firebaseConfig'
import userRouter from './routes/userRoutes'


const app = express()


const PORT = process.env.PORT || 3000


app.use(cors())  
app.use(bodyParser.json())  


app.use('/users', userRouter)  


app.get('/health', (req, res) => {
  res.send('Bienvenue sur le backend de Datavise!')
})


app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`)
})

export default app
