USE smart_food_db;

INSERT INTO categories (name)
SELECT * FROM (
    SELECT 'Rice' AS name
    UNION ALL SELECT 'Burger'
    UNION ALL SELECT 'Pizza'
    UNION ALL SELECT 'Drinks'
) AS seed_categories
WHERE NOT EXISTS (SELECT 1 FROM categories);

INSERT INTO users (name, email, password, role)
SELECT * FROM (
    SELECT 'Admin User', 'admin@smartfood.com', '$2a$10$XWJr1Q8j9iFh4x0Tqux8NukvH3ZqM8JrIoVNewc19hXtOD87mpy4W', 'admin'
    UNION ALL
    SELECT 'Jane Student', 'jane@student.com', '$2a$10$XWJr1Q8j9iFh4x0Tqux8NukvH3ZqM8JrIoVNewc19hXtOD87mpy4W', 'customer'
) AS seed_users(name, email, password, role)
WHERE NOT EXISTS (SELECT 1 FROM users);

INSERT INTO foods (name, category_id, price, rating, stock, prep_time, description, image)
SELECT 'Chicken Kottu', c.id, 8.50, 4.7, 24, '15 min',
       'A popular Sri Lankan style street food with chicken and vegetables.',
       'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'
FROM categories c
WHERE c.name = 'Rice'
AND NOT EXISTS (SELECT 1 FROM foods WHERE name = 'Chicken Kottu');

UPDATE foods
SET image = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'
WHERE name = 'Chicken Kottu';

INSERT INTO foods (name, category_id, price, rating, stock, prep_time, description, image)
SELECT 'Cheese Burger', c.id, 6.75, 4.5, 18, '10 min',
       'Juicy burger with melted cheese, fresh salad, and house sauce.',
       'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'
FROM categories c
WHERE c.name = 'Burger'
AND NOT EXISTS (SELECT 1 FROM foods WHERE name = 'Cheese Burger');
