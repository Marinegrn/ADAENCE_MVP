const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { sendTestEmail } = require('./src/utils/mail');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const path = require('path');

// Chargement variable d'env depuis .env 
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet()); // sécurise les en-têtes HTTP
app.use(cors({
  origin: ['http://localhost:3000'],  // frontend autorisé et autorise les requêtes cross-origin
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(morgan('dev')); // logs des requêtes
app.use(express.json()); // parse le JSON dans les requêtes
app.use(express.urlencoded({ extended: true })); 
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite chaque IP à 100 requêtes
}));

// TEST - uploads Photos
console.log('__dirname:', __dirname);
console.log('Dossier public:', path.join(__dirname, 'public'));

// Servir le dossier public (important : le dossier public lui-même)
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes
const userRoutes = require('./src/routes/users');
const seniorRoutes = require('./src/routes/seniors');
const activityRoutes = require('./src/routes/activities');
const slotRoutes = require('./src/routes/slots');
const bookingRoutes = require('./src/routes/bookings');
const applicationRoutes = require('./src/routes/applications');
const authRoutes = require('./src/routes/auth')

app.use('/api/users', userRoutes);
app.use('/api/seniors', seniorRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/slots', slotRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Bienvenue sur Adaence backend !');
});

// Pour les e-mail
app.get('/send-test-mail', async (req, res) => {
  try {
    const previewUrl = await sendTestEmail('testemail@exemple.com'); 
    res.json({ message: 'Mail envoyé !', previewUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de l’envoi du mail' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error('Erreur lors du démarrage du serveur:', err.message);
  process.exit(1);
});
