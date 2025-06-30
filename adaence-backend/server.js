const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');


// Chargement variable d'env depuis .env 
dotenv.config();

// instance framework Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet()); // sécurise les en-têtes HTTP
app.use(cors()); // autorise les requêtes cross-origin
app.use(morgan('dev')); // logs des requêtes
app.use(express.json()); // parse le JSON dans les requêtes
app.use(express.urlencoded({ extended: true })); 
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite chaque IP à 100 requêtes
}));

app.get('/', (req, res) => {
  res.send('Bienvenue sur Adaence backend !');
});

// Point d'entrée routes externes (features en attente) 
// const apiRoutes = require('./src/routes/');
// app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
