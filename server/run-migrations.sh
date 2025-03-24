#!/bin/bash
set -e

# Database credentials
DB_HOST=${POSTGRES_HOST}
DB_PORT=${DB_PORT:-5432}
DB_USER=${POSTGRES_USER}
DB_NAME=${POSTGRES_DB}
DB_PASSWORD=${POSTGRES_PASSWORD}

echo "Waiting for database to be ready..."
until PGPASSWORD=$DB_PASSWORD psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -c '\q' 2>/dev/null; do
    echo "database is unavailable"
    sleep 2
done

echo "executing database migrations"

# Run SQL migrations
PGPASSWORD=$DB_PASSWORD psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -f /docker-entrypoint-initdb.d/database.sql

echo "database migrations executed successfully!"