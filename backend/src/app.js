import express from 'express'
import bodyParser from 'body-parser'  // Pour le traitement des requêtes JSON
import cors from 'cors'  // Pour gérer les CORS si nécessaire


import firebaseApp from './config/firebaseConfig'


import userRouter from './routes/userRoutes'


const app = express()

// Configuration du port
const PORT = process.env.PORT || 3000

// Middlewares
app.use(cors())  // Activez CORS si nécessaire
app.use(bodyParser.json())  // Pour analyser le corps des requêtes JSON

// Routes
app.use('/users', userRouter)  // Utilisez le routeur pour les routes utilisateur

// Route de base pour tester le serveur
app.get('/health', (req, res) => {
  res.send('Bienvenue sur le backend de Datavise!')
})

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`)
})

export default app
