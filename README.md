# 🧓 Adaence – Recréer du lien avec nos aînés

**Adaence** est une plateforme web solidaire qui permet à des bénévoles de réserver un moment de rencontre avec une personne âgée isolée. Le projet met l’accent sur la bienveillance, la simplicité d’usage et la création de liens intergénérationnels durables.

---

## 🎯 Objectifs du projet

- Lutter contre l’isolement social des personnes âgées en France hexagonale, y compris dans les territoires ultramarins.
- Offrir une interface intuitive aux bénévoles pour organiser facilement une visite.
- Valoriser les moments partagés : balade, café, jeux, discussions, ateliers créatifs…

---

## 🛠️ Stack technique (Mono-repo)

### 🧠 Back-End

- **Node.js**
- **Express.js**
- **Prisma ORM**
- **PostgreSQL**
- **Dotenv** (variables d’environnement)
- **CORS** (sécurité cross-origin)
- **Helmet** (headers sécurisés)
- **Morgan** (logs HTTP)
- Architecture REST avec séparation des routes/controllers/models Prisma

### 💻 Front-End

- **Next.js 14 (App Router)**
- **React 18** (`useState`, `useEffect`, routing dynamique)
- **Tailwind CSS** (design rapide et responsive)
- **Lucide-react** (icônes modernes SVG)
- **Composants personnalisés** (`ReservationModal` [WIP], `ProfileCard`, `Navbar` etc)

### 🌐 Communication Front ↔ Back

- Appels via **API Routes Next.js (`/api/`)** jouant le rôle de **proxy**
- Transfert dynamique des filtres (`moment` et `localisation`) via **query params**
- **Client-side filtering** et **pagination**

---

## ✨ Fonctionnalités clés

- 🔍 Filtres dynamiques en temps réel par activité et ville
- 📷 Affichage des profils seniors avec image, âge, bio, activités
- 🔄 Pagination client-side (4 profils par page)
- 💬 Réservation d’un moment via modal contextuelle [WIP]
- 🎯 Design accessible, responsive et fluide
- 🔗 Intégration cohérente entre la page d’accueil et les résultats de recherche

---

## 🌱 Atouts du projet

- Projet **full-stack** complet, du design à la logique métier
- Code modulaire (clean code), facilement maintenable
- l'accessibilité de la plateforme est primordiale : test avec l'extension de navigateur WAVE
- UI pensée pour toutes les générations
- UX fluide : filtrage, recherche sans rechargement de page
- Optimisé pour une **extension future** : authentification, messagerie, notifications etc

---

## 🔮 Évolutions envisagées

- 🔐 Authentification (bénévoles et seniors)
- 📅 Gestion complète des réservations
- 📬 Notifications push / chatbot avec socket.io
- 🧠 Suggestions / Matching de profils via IA
- 📊 Tableau de bord administrateur
- 🦽 Accessibilité encore plus renforcée (clavier, lecteur d’écran, etc.)
- 📱 Application mobile (React Native ou Expo)

---

## 🙏 Remerciements

Ce projet élaboré pendant la semaine "Projet" du Campus Ada tech School, est dédié aux personnes âgées qui ont tant à transmettre (et celles qui me regardent de là-haut ! 🕊️), et à toutes les personnes solidaires qui souhaitent recréer du lien dans un monde parfois trop individualiste.

---

## 📜 Autrice

Marine GAREIN | Promotion Frances Spence | Campus Ada tech School

 **Adaence** est un projet citoyen, tourné vers l’humain ! 💖

---