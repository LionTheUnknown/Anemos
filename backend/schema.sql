CREATE TABLE IF NOT EXISTS weather (
    id BIGSERIAL PRIMARY KEY,
    city VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    count INTEGER NOT NULL DEFAULT 1,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    UNIQUE(city, country)
);

INSERT INTO weather (city, country, count, latitude, longitude) VALUES
    ('Sapporo', 'Japan', 3, 43.0621, 141.3544),
    ('Kaunas', 'Lithuania', 2, 54.8985, 23.9036),
    ('Cherrapunji', 'India', 1, 25.2700, 91.7195);
