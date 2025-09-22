#!/bin/bash

# Script de déploiement simple
set -e

echo "🚀 Déploiement Ardent"

# Chargement des variables d'environnement
ENV=${1:-dev}

if [ "$ENV" = "dev" ]; then
    echo "📝 Mode développement"
    export $(grep -v '^#' .env.dev | grep -v '^$' | xargs)
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d
elif [ "$ENV" = "staging" ]; then
    echo "🧪 Mode staging"
    export $(grep -v '^#' .env.staging | grep -v '^$' | xargs)
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
elif [ "$ENV" = "prod" ]; then
    echo "🏭 Mode production"
    export $(grep -v '^#' .env.prod | grep -v '^$' | xargs)
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
else
    echo "❌ Usage: ./deploy.sh [dev|staging|prod]"
    exit 1
fi

echo "✅ Déploiement terminé"