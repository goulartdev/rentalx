#!/bin/bash

set -e
set -u

echo "  Creating test database '$TEST_DB_NAME'"
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
		CREATE DATABASE "${TEST_DB_NAME}";
		GRANT ALL PRIVILEGES ON DATABASE "${TEST_DB_NAME}" TO "$POSTGRES_USER";
EOSQL
