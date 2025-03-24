-- CREATE DATABASE deviceatlas; 

CREATE TABLE IF NOT EXISTS os (
    os_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,
    version_parts INT[] NOT NULL,
    UNIQUE(name, version_parts)
);

CREATE TABLE IF NOT EXISTS browser (
    browser_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,
    rendering_engine VARCHAR(50) NOT NULL,
    UNIQUE(name, rendering_engine)
);

CREATE TABLE IF NOT EXISTS device (
    device_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    primary_hardware_type VARCHAR(50) NOT NULL,
    os_id UUID REFERENCES os(os_id) NOT NULL,
    browser_id UUID REFERENCES browser(browser_id) NOT NULL 
);