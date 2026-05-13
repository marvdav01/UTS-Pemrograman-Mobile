-- Create Database
CREATE DATABASE IF NOT EXISTS flavordash;
USE flavordash;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50),
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Sample Data
INSERT INTO users (username, password, email) VALUES 
('user', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user@example.com'); -- password is 'password'

INSERT INTO products (name, description, price, category, image_url) VALUES 
('Spaghetti Bolognese', 'Pasta al dente dengan saus daging sapi cincang khas Italia yang kaya rasa.', 45000, 'Main Course', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'),
('Burger Sapi Premium', 'Roti bun lembut dengan patty daging sapi 100%, sayuran segar, dan keju leleh.', 55000, 'Main Course', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'),
('Nasi Goreng Spesial', 'Nasi goreng bumbu rempah dengan telur mata sapi, ayam suwir, dan kerupuk gurih.', 35000, 'Main Course', 'http://192.168.101.4:8000/images/nasi_goreng.png'),
('Matcha Latte Dingin', 'Paduan sempurna teh hijau matcha premium dari Jepang dengan susu segar.', 28000, 'Drink', 'http://192.168.101.4:8000/images/matcha.png'),
('Wagyu Beef Burger', 'Premium wagyu beef with melted cheese and fresh vegetables.', 85000, 'Main Course', 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80'),
('Grilled Salmon', 'Atlantic salmon with lemon butter sauce and asparagus.', 120000, 'Seafood', 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80');
