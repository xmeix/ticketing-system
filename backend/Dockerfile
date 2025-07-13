FROM python:3.12-slim

# Install netcat and other build tools
RUN apt-get update && apt-get install -y netcat-openbsd gcc libmariadb-dev && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /code

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Ensure wait-for-it.sh is executable
RUN chmod +x wait-for-it.sh
