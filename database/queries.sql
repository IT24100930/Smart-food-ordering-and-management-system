USE smart_food_db;

SELECT * FROM users;
SELECT * FROM categories;
SELECT * FROM foods;
SELECT * FROM orders;
SELECT * FROM order_items;

SELECT o.order_code,
       o.customer_name,
       o.total,
       o.status,
       o.order_date
FROM orders o
ORDER BY o.order_date DESC, o.id DESC;
