# Guide de déploiement — Plateforme Campus

## Prérequis serveur
- Ubuntu 22.04 ou Debian 12
- Docker + Docker Compose installés
- Git installé
- Port 80 et 443 ouverts

## Étapes de déploiement

### 1. Cloner le projet
```bash
git clone https://github.com/Simsonyc/plateforme-campus.git
cd plateforme-campus
```

### 2. Créer le fichier .env
```bash
cp .env.example .env
```
Modifier `.env` avec les vraies valeurs :
```
NEXTAUTH_URL=https://votre-domaine.fr
NEXTAUTH_SECRET=un-secret-tres-long-et-aleatoire
```

### 3. Lancer les services
```bash
docker compose up -d
```

### 4. Appliquer les migrations
```bash
npm install
npx drizzle-kit migrate
```

### 5. Lancer l'application
```bash
npm run build
npm run start
```

## Services Docker
- PostgreSQL : port 5432
- Redis : port 6379
- MinIO : port 9000/9001

## Variables d'environnement requises
- NEXTAUTH_URL
- NEXTAUTH_SECRET
