DROP DATABASE IF EXISTS papustore;
CREATE DATABASE IF NOT EXISTS papustore;
USE papustore;

-- Table where user data is registered
CREATE TABLE IF NOT EXISTS user_data (
    email           VARCHAR(100)    NOT NULL PRIMARY KEY,
    first_name      VARCHAR(100)    NOT NULL,   
    last_name       VARCHAR(100),   -- Optional last name
    phone           VARCHAR(20),    -- Optional phone number
    email_secondary VARCHAR(100),   -- Optional secondary email
    country         VARCHAR(100),   -- Optional country
    state           VARCHAR(100),   -- Optional state
    zip             VARCHAR(20),    -- Optional zip code
    company         VARCHAR(100),   -- Optional company name
    address         VARCHAR(255),   -- Optional address
    region          VARCHAR(100),   -- Optional region
    city            VARCHAR(100),   -- Optional city
    purchases       INT DEFAULT 0   NOT NULL,
    papu_credits    DECIMAL(10, 2)  DEFAULT 20000.00 NOT NULL
);

-- Table for user login
CREATE TABLE IF NOT EXISTS user_login (
    email       VARCHAR(100)    NOT NULL PRIMARY KEY,
    password    VARCHAR(100)    NOT NULL,
    CHECK (LENGTH(password) >= 8), -- Ensure the password is at least 8 characters long
    FOREIGN KEY (email) REFERENCES user_data(email)
);

-- Inserción en la tabla user_data (primero)
INSERT INTO user_data (email, first_name) 
VALUES ('example@example.com', 'John');

-- Inserción en la tabla user_login (segundo)
INSERT INTO user_login (email, password)
VALUES ('example@example.com', 'securepassword123');

-- Table with product data
CREATE TABLE IF NOT EXISTS products (
    id                      INT AUTO_INCREMENT PRIMARY KEY,
    title                   VARCHAR(100) NOT NULL,
    description             TEXT NOT NULL,
    category                VARCHAR(100) NOT NULL,
    price                   DECIMAL(10, 2) NOT NULL,
    discountPercentage      DECIMAL(5, 2) NOT NULL,
    priceWithDiscount    	DECIMAL(10, 2) NOT NULL,
    rating                  DECIMAL(3, 2) NOT NULL,
    stock                   INT NOT NULL,
    brand                   VARCHAR(100) NOT NULL,
    weight                  INT NOT NULL,
    width                   INT NOT NULL,
    height                  INT NOT NULL,
    depth                   INT NOT NULL,
    warrantyInformation     TEXT NOT NULL,
    shippingInformation     TEXT NOT NULL,
    availabilityStatus      VARCHAR(100) NOT NULL,
    returnPolicy            TEXT NOT NULL,
    thumbnail               VARCHAR(255) NOT NULL,
    total_sales             INT DEFAULT 0 NOT NULL
);

-- Table for product tags
CREATE TABLE IF NOT EXISTS tags (
    product_id  INT NOT NULL,
    name        VARCHAR(100) NOT NULL,
    PRIMARY KEY (product_id, name),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Table for product images
CREATE TABLE IF NOT EXISTS images (
    product_id  INT NOT NULL,
    url         VARCHAR(255) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Table for user comments on products
CREATE TABLE IF NOT EXISTS comments (
    email       VARCHAR(100) NOT NULL,
    name        VARCHAR(100) NOT NULL,
    product_id  INT NOT NULL,
    rating      INT NOT NULL,
    comment     TEXT NOT NULL,
    date        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (email) REFERENCES user_data(email),
    FOREIGN KEY (product_id) REFERENCES products(id)
);


-- Table for user shopping carts
CREATE TABLE IF NOT EXISTS shopping_cart (
    email       VARCHAR(100) NOT NULL,
    product_id  INT NOT NULL,
    quantity    INT NOT NULL,
    PRIMARY KEY (email, product_id),
    FOREIGN KEY (email) REFERENCES user_data(email),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Table for user wishlists
CREATE TABLE IF NOT EXISTS wishlist (
    email       VARCHAR(100) NOT NULL,
    product_id  INT NOT NULL,
    PRIMARY KEY (email, product_id),
    FOREIGN KEY (email) REFERENCES user_data(email),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS IDs (
	id INT DEFAULT(0)
);

INSERT INTO IDs (id) values (0);

INSERT INTO user_data (email, first_name, last_name) VALUES ("arturogparrarivas@gmail.com", "Arturo", "Parra");
INSERT INTO user_login (email, password) VALUES ("arturogparrarivas@gmail.com", "Acuario_16");

-- Table for purchase history
CREATE TABLE IF NOT EXISTS purchase_history (
    purchase_id INT AUTO_INCREMENT PRIMARY KEY,
    email       VARCHAR(100) NOT NULL,
    date        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total       DECIMAL(10, 2) NOT NULL,
    country         VARCHAR(100),   -- Optional country
    state           VARCHAR(100),   -- Optional state
    zip             VARCHAR(20),    -- Optional zip code
    address         VARCHAR(255),   -- Optional address
    city   			VARCHAR(100),   -- Optional city
    FOREIGN KEY (email) REFERENCES user_data(email)
);



-- Table for purchase details in the history
CREATE TABLE IF NOT EXISTS purchase_details (
    purchase_id INT NOT NULL,
    product_id  INT NOT NULL,
    quantity    INT NOT NULL,
    unit_price  DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (purchase_id, product_id),
    FOREIGN KEY (purchase_id) REFERENCES purchase_history(purchase_id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS user_administrator (
    adminuser       VARCHAR(100)    NOT NULL PRIMARY KEY,
    password    VARCHAR(100)    NOT NULL,
    CHECK (LENGTH(password) >= 8) -- Ensure the password is at least 8 characters long
);

-- Inserción en la tabla user_administrator (primero)
INSERT INTO user_administrator (adminuser, password) 
VALUES ('admin', '1Aa@admin');

-- Inserts for products
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (1, 'Essence Mascara Lash Princess', 'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.', 'beauty', 9.99, 7.17, 9.273717, 4.94, 5, 'Essence', 2, 23.17, 14.43, 28.01, '1 month warranty', 'Ships in 1 month', 'Low Stock', '30 days return policy', 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (2, 'Eyeshadow Palette with Mirror', 'The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it''s convenient for on-the-go makeup application.', 'beauty', 19.99, 5.5, 18.890549999999998, 3.28, 44, 'Glamour Beauty', 3, 12.42, 8.63, 29.13, '1 year warranty', 'Ships in 2 weeks', 'In Stock', '30 days return policy', 'https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (3, 'Powder Canister', 'The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.', 'beauty', 14.99, 18.14, 12.270814, 3.82, 59, 'Velvet Touch', 8, 24.16, 10.7, 11.07, '2 year warranty', 'Ships in 1-2 business days', 'In Stock', '60 days return policy', 'https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (4, 'Red Lipstick', 'The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.', 'beauty', 12.99, 19.03, 10.518003, 2.51, 68, 'Chic Cosmetics', 5, 14.37, 13.94, 14.6, 'Lifetime warranty', 'Ships in 2 weeks', 'In Stock', '90 days return policy', 'https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (5, 'Red Nail Polish', 'The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails. With a quick-drying formula, it provides a salon-quality finish at home.', 'beauty', 8.99, 2.46, 8.768846, 3.91, 71, 'Nail Couture', 9, 8.11, 10.89, 29.06, '1 year warranty', 'Ships in 1 week', 'In Stock', 'No return policy', 'https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (6, 'Calvin Klein CK One', 'CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It''s a versatile fragrance suitable for everyday wear.', 'fragrances', 49.99, 0.32, 49.830032, 4.85, 17, 'Calvin Klein', 5, 11.53, 14.44, 6.81, '5 year warranty', 'Ships overnight', 'In Stock', 'No return policy', 'https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (7, 'Chanel Coco Noir Eau De', 'Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.', 'fragrances', 129.99, 18.64, 105.75986400000001, 2.76, 41, 'Chanel', 4, 21.27, 28, 11.89, '1 week warranty', 'Ships in 1 month', 'In Stock', '60 days return policy', 'https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (8, 'Dior J''adore', 'J''adore by Dior is a luxurious and floral fragrance, known for its blend of ylang-ylang, rose, and jasmine. It embodies femininity and sophistication.', 'fragrances', 89.99, 17.44, 74.295744, 3.31, 91, 'Dior', 10, 21.51, 7, 26.51, 'Lifetime warranty', 'Ships in 2 weeks', 'In Stock', '7 days return policy', 'https://cdn.dummyjson.com/products/images/fragrances/Dior%20J''adore/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (9, 'Dolce Shine Eau de', 'Dolce Shine by Dolce & Gabbana is a vibrant and fruity fragrance, featuring notes of mango, jasmine, and blonde woods. It''s a joyful and youthful scent.', 'fragrances', 69.99, 11.47, 61.962146999999995, 2.68, 3, 'Dolce & Gabbana', 5, 17, 24.57, 13.3, '5 year warranty', 'Ships in 1-2 business days', 'Low Stock', '30 days return policy', 'https://cdn.dummyjson.com/products/images/fragrances/Dolce%20Shine%20Eau%20de/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (10, 'Gucci Bloom Eau de', 'Gucci Bloom by Gucci is a floral and captivating fragrance, with notes of tuberose, jasmine, and Rangoon creeper. It''s a modern and romantic scent.', 'fragrances', 79.99, 8.9, 72.87089, 2.69, 93, 'Gucci', 10, 22.28, 17.81, 27.18, 'No warranty', 'Ships in 2 weeks', 'In Stock', 'No return policy', 'https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (11, 'Annibale Colombo Bed', 'The Annibale Colombo Bed is a luxurious and elegant bed frame, crafted with high-quality materials for a comfortable and stylish bedroom.', 'furniture', 1899.99, 0.29, 1894.480029, 4.14, 47, 'Annibale Colombo', 3, 28.75, 26.88, 24.47, '2 year warranty', 'Ships overnight', 'In Stock', '7 days return policy', 'https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (12, 'Annibale Colombo Sofa', 'The Annibale Colombo Sofa is a sophisticated and comfortable seating option, featuring exquisite design and premium upholstery for your living room.', 'furniture', 2499.99, 18.54, 2036.4918539999999, 3.08, 16, 'Annibale Colombo', 3, 20.97, 19.11, 25.81, '1 month warranty', 'Ships overnight', 'In Stock', '7 days return policy', 'https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Sofa/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (13, 'Bedside Table African Cherry', 'The Bedside Table in African Cherry is a stylish and functional addition to your bedroom, providing convenient storage space and a touch of elegance.', 'furniture', 299.99, 9.58, 271.250958, 4.48, 16, 'Furniture Co.', 10, 25.43, 20.2, 24.95, '6 months warranty', 'Ships in 1-2 business days', 'In Stock', 'No return policy', 'https://cdn.dummyjson.com/products/images/furniture/Bedside%20Table%20African%20Cherry/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (14, 'Knoll Saarinen Executive Conference Chair', 'The Knoll Saarinen Executive Conference Chair is a modern and ergonomic chair, perfect for your office or conference room with its timeless design.', 'furniture', 499.99, 15.23, 423.841523, 4.11, 47, 'Knoll', 3, 16.59, 21.46, 29.07, 'Lifetime warranty', 'Ships in 3-5 business days', 'In Stock', '30 days return policy', 'https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (15, 'Wooden Bathroom Sink With Mirror', 'The Wooden Bathroom Sink with Mirror is a unique and stylish addition to your bathroom, featuring a wooden sink countertop and a matching mirror.', 'furniture', 799.99, 11.22, 710.231122, 3.26, 95, 'Bath Trends', 6, 7.32, 22.64, 12.37, '6 months warranty', 'Ships in 3-5 business days', 'In Stock', '7 days return policy', 'https://cdn.dummyjson.com/products/images/furniture/Wooden%20Bathroom%20Sink%20With%20Mirror/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (16, 'Apple', 'Fresh and crisp apples, perfect for snacking or incorporating into various recipes.', 'groceries', 1.99, 1.97, 1.950797, 2.96, 9, '', 8, 8.29, 5.58, 12.41, '2 year warranty', 'Ships in 2 weeks', 'In Stock', '60 days return policy', 'https://cdn.dummyjson.com/products/images/groceries/Apple/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (17, 'Beef Steak', 'High-quality beef steak, great for grilling or cooking to your preferred level of doneness.', 'groceries', 12.99, 17.99, 10.653099000000001, 2.83, 96, '', 9, 23.35, 13.48, 26.4, '1 month warranty', 'Ships overnight', 'In Stock', '90 days return policy', 'https://cdn.dummyjson.com/products/images/groceries/Beef%20Steak/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (18, 'Cat Food', 'Nutritious cat food formulated to meet the dietary needs of your feline friend.', 'groceries', 8.99, 9.57, 8.129657, 2.88, 13, '', 9, 15.4, 13.97, 25.13, '3 months warranty', 'Ships in 1-2 business days', 'In Stock', '7 days return policy', 'https://cdn.dummyjson.com/products/images/groceries/Cat%20Food/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (19, 'Chicken Meat', 'Fresh and tender chicken meat, suitable for various culinary preparations.', 'groceries', 9.99, 10.46, 8.945046, 4.61, 69, '', 7, 15.96, 29.24, 26.25, 'Lifetime warranty', 'Ships in 1 month', 'In Stock', '7 days return policy', 'https://cdn.dummyjson.com/products/images/groceries/Chicken%20Meat/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (20, 'Cooking Oil', 'Versatile cooking oil suitable for frying, sautéing, and various culinary applications.', 'groceries', 4.99, 18.89, 4.047389, 4.01, 22, '', 8, 8.18, 27.45, 27.88, 'Lifetime warranty', 'Ships in 1 month', 'In Stock', '60 days return policy', 'https://cdn.dummyjson.com/products/images/groceries/Cooking%20Oil/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (21, 'Cucumber', 'Crisp and hydrating cucumbers, ideal for salads, snacks, or as a refreshing side.', 'groceries', 1.49, 11.44, 1.3195439999999998, 4.71, 22, '', 9, 11.04, 20.5, 8.18, '5 year warranty', 'Ships overnight', 'In Stock', '30 days return policy', 'https://cdn.dummyjson.com/products/images/groceries/Cucumber/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (22, 'Dog Food', 'Specially formulated dog food designed to provide essential nutrients for your canine companion.', 'groceries', 10.99, 18.15, 8.995315, 2.74, 40, '', 2, 29.39, 29.77, 20.54, '1 year warranty', 'Ships in 1 month', 'In Stock', '90 days return policy', 'https://cdn.dummyjson.com/products/images/groceries/Dog%20Food/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (23, 'Eggs', 'Fresh eggs, a versatile ingredient for baking, cooking, or breakfast.', 'groceries', 2.99, 5.8, 2.81658, 4.46, 10, '', 4, 12.3, 10.99, 15.53, '3 year warranty', 'Ships overnight', 'In Stock', '30 days return policy', 'https://cdn.dummyjson.com/products/images/groceries/Eggs/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (24, 'Fish Steak', 'Quality fish steak, suitable for grilling, baking, or pan-searing.', 'groceries', 14.99, 7, 13.9407, 4.83, 99, '', 8, 20.14, 8.4, 10.01, '1 year warranty', 'Ships in 1 month', 'In Stock', '30 days return policy', 'https://cdn.dummyjson.com/products/images/groceries/Fish%20Steak/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (25, 'Green Bell Pepper', 'Fresh and vibrant green bell pepper, perfect for adding color and flavor to your dishes.', 'groceries', 1.29, 15.5, 1.09005, 4.28, 89, '', 7, 7.32, 14.31, 21.38, '5 year warranty', 'Ships overnight', 'In Stock', '30 days return policy', 'https://cdn.dummyjson.com/products/images/groceries/Green%20Bell%20Pepper/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (26, 'Green Chili Pepper', 'Spicy green chili pepper, ideal for adding heat to your favorite recipes.', 'groceries', 0.99, 18.51, 0.806751, 4.43, 8, '', 2, 18.67, 21.17, 25.26, 'No warranty', 'Ships in 1-2 business days', 'In Stock', '30 days return policy', 'https://cdn.dummyjson.com/products/images/groceries/Green%20Chili%20Pepper/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (27, 'Honey Jar', 'Pure and natural honey in a convenient jar, perfect for sweetening beverages or drizzling over food.', 'groceries', 6.99, 1.91, 6.856491, 3.5, 25, '', 9, 26.53, 27.11, 6.63, '2 year warranty', 'Ships overnight', 'In Stock', '90 days return policy', 'https://cdn.dummyjson.com/products/images/groceries/Honey%20Jar/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (28, 'Ice Cream', 'Creamy and delicious ice cream, available in various flavors for a delightful treat.', 'groceries', 5.49, 7.58, 5.073858, 3.77, 76, '', 5, 17.66, 24.49, 25.98, '2 year warranty', 'Ships in 2 weeks', 'In Stock', 'No return policy', 'https://cdn.dummyjson.com/products/images/groceries/Ice%20Cream/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (29, 'Juice', 'Refreshing fruit juice, packed with vitamins and great for staying hydrated.', 'groceries', 3.99, 5.45, 3.772545, 3.41, 99, '', 2, 8.97, 12.26, 15.05, '1 week warranty', 'Ships in 1-2 business days', 'In Stock', '90 days return policy', 'https://cdn.dummyjson.com/products/images/groceries/Juice/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (30, 'Kiwi', 'Nutrient-rich kiwi, perfect for snacking or adding a tropical twist to your dishes.', 'groceries', 2.49, 10.32, 2.233032, 4.37, 1, '', 8, 27.3, 7.48, 15.08, '6 months warranty', 'Ships in 3-5 business days', 'Low Stock', '7 days return policy', 'https://cdn.dummyjson.com/products/images/groceries/Kiwi/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (31, 'Lemon', 'Zesty and tangy lemons, versatile for cooking, baking, or making refreshing beverages.', 'groceries', 0.79, 17.81, 0.6493010000000001, 4.25, 0, '', 10, 25.97, 27.47, 6.31, '3 year warranty', 'Ships in 1 week', 'Out of Stock', '90 days return policy', 'https://cdn.dummyjson.com/products/images/groceries/Lemon/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (32, 'Milk', 'Fresh and nutritious milk, a staple for various recipes and daily consumption.', 'groceries', 3.49, 15.09, 2.963359, 3.14, 57, '', 1, 22.42, 20.9, 12.48, '6 months warranty', 'Ships in 1 month', 'In Stock', '7 days return policy', 'https://cdn.dummyjson.com/products/images/groceries/Milk/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (33, 'Mulberry', 'Sweet and juicy mulberries, perfect for snacking or adding to desserts and cereals.', 'groceries', 4.99, 16.35, 4.174135000000001, 3.19, 79, '', 4, 11.12, 27.3, 27.57, '3 months warranty', 'Ships in 1 month', 'In Stock', '60 days return policy', 'https://cdn.dummyjson.com/products/images/groceries/Mulberry/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (34, 'Nescafe Coffee', 'Quality coffee from Nescafe, available in various blends for a rich and satisfying cup.', 'groceries', 7.99, 11.65, 7.059165, 2.54, 22, '', 9, 11.21, 24.54, 15.05, 'No warranty', 'Ships in 3-5 business days', 'In Stock', '30 days return policy', 'https://cdn.dummyjson.com/products/images/groceries/Nescafe%20Coffee/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (35, 'Potatoes', 'Versatile and starchy potatoes, great for roasting, mashing, or as a side dish.', 'groceries', 2.29, 4.05, 2.197255, 3.82, 8, '', 9, 20, 6.44, 20.07, '5 year warranty', 'Ships in 1-2 business days', 'In Stock', '7 days return policy', 'https://cdn.dummyjson.com/products/images/groceries/Potatoes/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (36, 'Protein Powder', 'Nutrient-packed protein powder, ideal for supplementing your diet with essential proteins.', 'groceries', 19.99, 1.58, 19.674158, 3.91, 65, '', 2, 5.62, 7.88, 23.48, '1 year warranty', 'Ships in 1-2 business days', 'In Stock', 'No return policy', 'https://cdn.dummyjson.com/products/images/groceries/Protein%20Powder/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (37, 'Red Onions', 'Flavorful and aromatic red onions, perfect for adding depth to your savory dishes.', 'groceries', 1.99, 17.89, 1.633989, 4.08, 86, '', 2, 14.05, 17.13, 14.05, 'Lifetime warranty', 'Ships in 2 weeks', 'In Stock', '60 days return policy', 'https://cdn.dummyjson.com/products/images/groceries/Red%20Onions/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (38, 'Rice', 'High-quality rice, a staple for various cuisines and a versatile base for many dishes.', 'groceries', 5.99, 12.02, 5.270002000000001, 3.94, 49, '', 1, 28.86, 6.26, 11.04, '2 year warranty', 'Ships in 1 month', 'In Stock', '60 days return policy', 'https://cdn.dummyjson.com/products/images/groceries/Rice/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (39, 'Soft Drinks', 'Assorted soft drinks in various flavors, perfect for refreshing beverages.', 'groceries', 1.99, 1.88, 1.952588, 4.59, 78, '', 9, 15.73, 24.93, 27.19, '1 year warranty', 'Ships in 3-5 business days', 'In Stock', '90 days return policy', 'https://cdn.dummyjson.com/products/images/groceries/Soft%20Drinks/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (40, 'Strawberry', 'Sweet and succulent strawberries, great for snacking, desserts, or blending into smoothies.', 'groceries', 3.99, 19.59, 3.208359, 4.5, 9, '', 4, 20.82, 15.81, 14.89, '1 year warranty', 'Ships in 1 week', 'In Stock', '30 days return policy', 'https://cdn.dummyjson.com/products/images/groceries/Strawberry/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (41, 'Tissue Paper Box', 'Convenient tissue paper box for everyday use, providing soft and absorbent tissues.', 'groceries', 2.49, 15.44, 2.105544, 4.55, 97, '', 3, 24.1, 19.74, 5.48, '6 months warranty', 'Ships in 1 month', 'In Stock', 'No return policy', 'https://cdn.dummyjson.com/products/images/groceries/Tissue%20Paper%20Box/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (42, 'Water', 'Pure and refreshing bottled water, essential for staying hydrated throughout the day.', 'groceries', 0.99, 13.71, 0.854271, 2.93, 95, '', 2, 25.46, 25.86, 18.06, 'No warranty', 'Ships in 1 week', 'In Stock', '7 days return policy', 'https://cdn.dummyjson.com/products/images/groceries/Water/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (43, 'Decoration Swing', 'The Decoration Swing is a charming addition to your home decor. Crafted with intricate details, it adds a touch of elegance and whimsy to any room.', 'home-decoration', 59.99, 0.65, 59.60006500000001, 3.56, 62, '', 8, 20.75, 11.18, 7.92, 'Lifetime warranty', 'Ships in 2 weeks', 'In Stock', '30 days return policy', 'https://cdn.dummyjson.com/products/images/home-decoration/Decoration%20Swing/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (44, 'Family Tree Photo Frame', 'The Family Tree Photo Frame is a sentimental and stylish way to display your cherished family memories. With multiple photo slots, it tells the story of your loved ones.', 'home-decoration', 29.99, 1.53, 29.531153, 3.84, 34, '', 4, 15.46, 26.32, 17.1, '6 months warranty', 'Ships in 1 month', 'In Stock', '90 days return policy', 'https://cdn.dummyjson.com/products/images/home-decoration/Family%20Tree%20Photo%20Frame/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (45, 'House Showpiece Plant', 'The House Showpiece Plant is an artificial plant that brings a touch of nature to your home without the need for maintenance. It adds greenery and style to any space.', 'home-decoration', 39.99, 19.45, 32.211945, 3.61, 89, '', 9, 27.15, 14.43, 10.05, '5 year warranty', 'Ships in 1 week', 'In Stock', '7 days return policy', 'https://cdn.dummyjson.com/products/images/home-decoration/House%20Showpiece%20Plant/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (46, 'Plant Pot', 'The Plant Pot is a stylish container for your favorite plants. With a sleek design, it complements your indoor or outdoor garden, adding a modern touch to your plant display.', 'home-decoration', 14.99, 0.19, 14.961519000000001, 3.33, 70, '', 8, 16.28, 8.72, 18.47, '2 year warranty', 'Ships in 1-2 business days', 'In Stock', '90 days return policy', 'https://cdn.dummyjson.com/products/images/home-decoration/Plant%20Pot/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (47, 'Table Lamp', 'The Table Lamp is a functional and decorative lighting solution for your living space. With a modern design, it provides both ambient and task lighting, enhancing the atmosphere.', 'home-decoration', 49.99, 0.59, 49.695059, 4.56, 84, '', 2, 29.6, 19.68, 10.12, '1 year warranty', 'Ships in 2 weeks', 'In Stock', '30 days return policy', 'https://cdn.dummyjson.com/products/images/home-decoration/Table%20Lamp/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (48, 'Bamboo Spatula', 'The Bamboo Spatula is a versatile kitchen tool made from eco-friendly bamboo. Ideal for flipping, stirring, and serving various dishes.', 'kitchen-accessories', 7.99, 4.85, 7.602485000000001, 4.4, 0, '', 4, 27.97, 21.77, 21.38, '1 year warranty', 'Ships in 1 month', 'Out of Stock', '7 days return policy', 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Bamboo%20Spatula/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (49, 'Black Aluminium Cup', 'The Black Aluminium Cup is a stylish and durable cup suitable for both hot and cold beverages. Its sleek black design adds a modern touch to your drinkware collection.', 'kitchen-accessories', 5.99, 9.22, 5.437722, 3.62, 42, '', 8, 7.48, 23.98, 12.84, 'Lifetime warranty', 'Ships in 1 week', 'In Stock', '7 days return policy', 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Black%20Aluminium%20Cup/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (50, 'Black Whisk', 'The Black Whisk is a kitchen essential for whisking and beating ingredients. Its ergonomic handle and sleek design make it a practical and stylish tool.', 'kitchen-accessories', 9.99, 16.87, 8.304687, 2.88, 17, '', 6, 21.06, 15.46, 13.28, '5 year warranty', 'Ships in 3-5 business days', 'In Stock', '30 days return policy', 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Black%20Whisk/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (51, 'Boxed Blender', 'The Boxed Blender is a powerful and compact blender perfect for smoothies, shakes, and more. Its convenient design and multiple functions make it a versatile kitchen appliance.', 'kitchen-accessories', 39.99, 7.36, 37.046736, 2.73, 81, '', 10, 16.73, 10.93, 14.75, '3 months warranty', 'Ships in 2 weeks', 'In Stock', '30 days return policy', 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Boxed%20Blender/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (52, 'Carbon Steel Wok', 'The Carbon Steel Wok is a versatile cooking pan suitable for stir-frying, sautéing, and deep frying. Its sturdy construction ensures even heat distribution for delicious meals.', 'kitchen-accessories', 29.99, 5.89, 28.223589, 2.94, 2, '', 4, 14.69, 11.23, 28.05, '2 year warranty', 'Ships in 1 month', 'Low Stock', '30 days return policy', 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Carbon%20Steel%20Wok/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (53, 'Chopping Board', 'The Chopping Board is an essential kitchen accessory for food preparation. Made from durable material, it provides a safe and hygienic surface for cutting and chopping.', 'kitchen-accessories', 12.99, 17.72, 10.688172, 4.82, 53, '', 3, 24.38, 26.51, 6.93, 'Lifetime warranty', 'Ships in 1-2 business days', 'In Stock', '90 days return policy', 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Chopping%20Board/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (54, 'Citrus Squeezer Yellow', 'The Citrus Squeezer in Yellow is a handy tool for extracting juice from citrus fruits. Its vibrant color adds a cheerful touch to your kitchen gadgets.', 'kitchen-accessories', 8.99, 12.35, 7.879735000000001, 4.18, 59, '', 9, 21.74, 7.6, 18.04, '3 year warranty', 'Ships overnight', 'In Stock', 'No return policy', 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Citrus%20Squeezer%20Yellow/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (55, 'Egg Slicer', 'The Egg Slicer is a convenient tool for slicing boiled eggs evenly. It''s perfect for salads, sandwiches, and other dishes where sliced eggs are desired.', 'kitchen-accessories', 6.99, 9.6, 6.318960000000001, 2.91, 30, '', 5, 17.18, 11.58, 11.79, '5 year warranty', 'Ships in 1 week', 'In Stock', '60 days return policy', 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Egg%20Slicer/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (56, 'Electric Stove', 'The Electric Stove provides a portable and efficient cooking solution. Ideal for small kitchens or as an additional cooking surface for various culinary needs.', 'kitchen-accessories', 49.99, 16.64, 41.671664, 4.84, 41, '', 9, 28.07, 11.43, 20.68, '6 months warranty', 'Ships in 2 weeks', 'In Stock', 'No return policy', 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Electric%20Stove/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (57, 'Fine Mesh Strainer', 'The Fine Mesh Strainer is a versatile tool for straining liquids and sifting dry ingredients. Its fine mesh ensures efficient filtering for smooth cooking and baking.', 'kitchen-accessories', 9.99, 2.56, 9.734256, 3.7, 13, '', 6, 5.19, 9.64, 20.53, '1 week warranty', 'Ships in 2 weeks', 'In Stock', '90 days return policy', 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Fine%20Mesh%20Strainer/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (58, 'Fork', 'The Fork is a classic utensil for various dining and serving purposes. Its durable and ergonomic design makes it a reliable choice for everyday use.', 'kitchen-accessories', 3.99, 14.36, 3.4170360000000004, 4.18, 10, '', 6, 23.61, 25.62, 5.67, '1 month warranty', 'Ships in 1-2 business days', 'In Stock', '30 days return policy', 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Fork/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (59, 'Glass', 'The Glass is a versatile and elegant drinking vessel suitable for a variety of beverages. Its clear design allows you to enjoy the colors and textures of your drinks.', 'kitchen-accessories', 4.99, 7.38, 4.621738000000001, 3.06, 68, '', 5, 14.7, 18.98, 21.93, '3 year warranty', 'Ships in 2 weeks', 'In Stock', '7 days return policy', 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Glass/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (60, 'Grater Black', 'The Grater in Black is a handy kitchen tool for grating cheese, vegetables, and more. Its sleek design and sharp blades make food preparation efficient and easy.', 'kitchen-accessories', 10.99, 3.29, 10.628429, 2.87, 80, '', 3, 12.6, 28.86, 21.12, '3 year warranty', 'Ships in 1 month', 'In Stock', '30 days return policy', 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Grater%20Black/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (61, 'Hand Blender', 'The Hand Blender is a versatile kitchen appliance for blending, pureeing, and mixing. Its compact design and powerful motor make it a convenient tool for various recipes.', 'kitchen-accessories', 34.99, 6.44, 32.736644, 3.71, 8, '', 4, 13.3, 6.21, 16.77, '1 year warranty', 'Ships in 1 week', 'In Stock', '7 days return policy', 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Hand%20Blender/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (62, 'Ice Cube Tray', 'The Ice Cube Tray is a practical accessory for making ice cubes in various shapes. Perfect for keeping your drinks cool and adding a fun element to your beverages.', 'kitchen-accessories', 5.99, 0.95, 5.933095000000001, 3.27, 81, '', 8, 27.19, 20.42, 17.45, 'No warranty', 'Ships in 1 month', 'In Stock', '30 days return policy', 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Ice%20Cube%20Tray/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (63, 'Kitchen Sieve', 'The Kitchen Sieve is a versatile tool for sifting and straining dry and wet ingredients. Its fine mesh design ensures smooth results in your cooking and baking.', 'kitchen-accessories', 7.99, 9.23, 7.252523, 2.96, 33, '', 5, 22.94, 11.91, 20.47, '1 week warranty', 'Ships in 1-2 business days', 'In Stock', '7 days return policy', 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Kitchen%20Sieve/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (64, 'Knife', 'The Knife is an essential kitchen tool for chopping, slicing, and dicing. Its sharp blade and ergonomic handle make it a reliable choice for food preparation.', 'kitchen-accessories', 14.99, 19.95, 11.999495, 4.31, 59, '', 7, 11.63, 23.99, 24.62, '1 year warranty', 'Ships in 1 month', 'In Stock', '7 days return policy', 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Knife/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (65, 'Lunch Box', 'The Lunch Box is a convenient and portable container for packing and carrying your meals. With compartments for different foods, it''s perfect for on-the-go dining.', 'kitchen-accessories', 12.99, 15.33, 10.998633, 2.84, 26, '', 1, 13.76, 18.36, 27.9, '3 year warranty', 'Ships in 1 month', 'In Stock', '7 days return policy', 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Lunch%20Box/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (66, 'Microwave Oven', 'The Microwave Oven is a versatile kitchen appliance for quick and efficient cooking, reheating, and defrosting. Its compact size makes it suitable for various kitchen setups.', 'kitchen-accessories', 89.99, 18.73, 73.134873, 2.71, 27, '', 8, 9.61, 25.64, 12.31, '6 months warranty', 'Ships in 1 month', 'In Stock', '90 days return policy', 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Microwave%20Oven/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (67, 'Mug Tree Stand', 'The Mug Tree Stand is a stylish and space-saving solution for organizing your mugs. Keep your favorite mugs easily accessible and neatly displayed in your kitchen.', 'kitchen-accessories', 15.99, 15.21, 13.557921, 4.34, 93, '', 7, 7.37, 13.1, 12, '1 week warranty', 'Ships in 3-5 business days', 'In Stock', '30 days return policy', 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Mug%20Tree%20Stand/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (68, 'Pan', 'The Pan is a versatile and essential cookware item for frying, sautéing, and cooking various dishes. Its non-stick coating ensures easy food release and cleanup.', 'kitchen-accessories', 24.99, 6.55, 23.353154999999997, 3.4, 40, '', 7, 19.51, 17.96, 23.24, '3 months warranty', 'Ships overnight', 'In Stock', 'No return policy', 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Pan/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (69, 'Plate', 'The Plate is a classic and essential dishware item for serving meals. Its durable and stylish design makes it suitable for everyday use or special occasions.', 'kitchen-accessories', 3.99, 13.03, 3.4701030000000004, 3.07, 30, '', 8, 14.77, 21.78, 29.1, '1 year warranty', 'Ships overnight', 'In Stock', '7 days return policy', 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Plate/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (70, 'Red Tongs', 'The Red Tongs are versatile kitchen tongs suitable for various cooking and serving tasks. Their vibrant color adds a pop of excitement to your kitchen utensils.', 'kitchen-accessories', 6.99, 18.24, 5.7150240000000005, 3.22, 15, '', 3, 27.38, 20.49, 26.65, '1 month warranty', 'Ships in 3-5 business days', 'In Stock', '90 days return policy', 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Red%20Tongs/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (71, 'Silver Pot With Glass Cap', 'The Silver Pot with Glass Cap is a stylish and functional cookware item for boiling, simmering, and preparing delicious meals. Its glass cap allows you to monitor cooking progress.', 'kitchen-accessories', 39.99, 4.57, 38.162457, 3.86, 37, '', 9, 9.58, 25.84, 26.13, 'Lifetime warranty', 'Ships in 1 week', 'In Stock', '7 days return policy', 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Silver%20Pot%20With%20Glass%20Cap/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (72, 'Slotted Turner', 'The Slotted Turner is a kitchen utensil designed for flipping and turning food items. Its slotted design allows excess liquid to drain, making it ideal for frying and sautéing.', 'kitchen-accessories', 8.99, 7.24, 8.339124, 3.77, 36, '', 4, 22.29, 24.06, 7.05, 'Lifetime warranty', 'Ships in 2 weeks', 'In Stock', 'No return policy', 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Slotted%20Turner/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (73, 'Spice Rack', 'The Spice Rack is a convenient organizer for your spices and seasonings. Keep your kitchen essentials within reach and neatly arranged with this stylish spice rack.', 'kitchen-accessories', 19.99, 13.78, 17.235377999999997, 4.05, 24, '', 8, 20.73, 6.81, 24.14, 'Lifetime warranty', 'Ships in 1 month', 'In Stock', 'No return policy', 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Spice%20Rack/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (74, 'Spoon', 'The Spoon is a versatile kitchen utensil for stirring, serving, and tasting. Its ergonomic design and durable construction make it an essential tool for every kitchen.', 'kitchen-accessories', 4.99, 0.93, 4.943593, 3.98, 51, '', 9, 8.45, 25.16, 17.43, '3 year warranty', 'Ships overnight', 'In Stock', '90 days return policy', 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Spoon/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (75, 'Tray', 'The Tray is a functional and decorative item for serving snacks, appetizers, or drinks. Its stylish design makes it a versatile accessory for entertaining guests.', 'kitchen-accessories', 16.99, 9.93, 15.302893, 3.2, 48, '', 8, 25.01, 5.72, 5.25, '5 year warranty', 'Ships in 2 weeks', 'In Stock', '90 days return policy', 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Tray/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (76, 'Wooden Rolling Pin', 'The Wooden Rolling Pin is a classic kitchen tool for rolling out dough for baking. Its smooth surface and sturdy handles make it easy to achieve uniform thickness.', 'kitchen-accessories', 11.99, 16.94, 9.958894, 4.99, 80, '', 7, 19.66, 19.62, 25.23, '1 week warranty', 'Ships overnight', 'In Stock', '60 days return policy', 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Wooden%20Rolling%20Pin/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (77, 'Yellow Peeler', 'The Yellow Peeler is a handy tool for peeling fruits and vegetables with ease. Its bright yellow color adds a cheerful touch to your kitchen gadgets.', 'kitchen-accessories', 5.99, 17.09, 4.966309, 4.41, 86, '', 4, 17.36, 17.41, 27.38, '1 month warranty', 'Ships in 3-5 business days', 'In Stock', '30 days return policy', 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Yellow%20Peeler/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (78, 'Apple MacBook Pro 14 Inch Space Grey', 'The MacBook Pro 14 Inch in Space Grey is a powerful and sleek laptop, featuring Apple''s M1 Pro chip for exceptional performance and a stunning Retina display.', 'laptops', 1999.99, 9.25, 1814.990925, 3.13, 39, 'Apple', 4, 12.38, 21.55, 27.95, '1 month warranty', 'Ships in 1 week', 'In Stock', '30 days return policy', 'https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (79, 'Asus Zenbook Pro Dual Screen Laptop', 'The Asus Zenbook Pro Dual Screen Laptop is a high-performance device with dual screens, providing productivity and versatility for creative professionals.', 'laptops', 1799.99, 9.21, 1634.2109209999999, 3.14, 38, 'Asus', 8, 19.67, 11.05, 14.32, 'No warranty', 'Ships in 3-5 business days', 'In Stock', 'No return policy', 'https://cdn.dummyjson.com/products/images/laptops/Asus%20Zenbook%20Pro%20Dual%20Screen%20Laptop/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (80, 'Huawei Matebook X Pro', 'The Huawei Matebook X Pro is a slim and stylish laptop with a high-resolution touchscreen display, offering a premium experience for users on the go.', 'laptops', 1399.99, 15.25, 1186.4915250000001, 4.62, 34, 'Huawei', 9, 22.11, 11.11, 23.07, '2 year warranty', 'Ships in 2 weeks', 'In Stock', '60 days return policy', 'https://cdn.dummyjson.com/products/images/laptops/Huawei%20Matebook%20X%20Pro/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (81, 'Lenovo Yoga 920', 'The Lenovo Yoga 920 is a 2-in-1 convertible laptop with a flexible hinge, allowing you to use it as a laptop or tablet, offering versatility and portability.', 'laptops', 1099.99, 7.77, 1014.5207770000001, 2.98, 71, 'Lenovo', 7, 11.02, 14.45, 24.09, 'Lifetime warranty', 'Ships in 1 week', 'In Stock', 'No return policy', 'https://cdn.dummyjson.com/products/images/laptops/Lenovo%20Yoga%20920/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (82, 'New DELL XPS 13 9300 Laptop', 'The New DELL XPS 13 9300 Laptop is a compact and powerful device, featuring a virtually borderless InfinityEdge display and high-end performance for various tasks.', 'laptops', 1499.99, 11.7, 1324.49117, 2.98, 18, 'Dell', 10, 12.09, 6.43, 15.69, 'Lifetime warranty', 'Ships overnight', 'In Stock', '7 days return policy', 'https://cdn.dummyjson.com/products/images/laptops/New%20DELL%20XPS%2013%209300%20Laptop/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (83, 'Blue & Black Check Shirt', 'The Blue & Black Check Shirt is a stylish and comfortable men''s shirt featuring a classic check pattern. Made from high-quality fabric, it''s suitable for both casual and semi-formal occasions.', 'mens-shirts', 29.99, 1.41, 29.567141, 4.19, 44, 'Fashion Trends', 6, 17.25, 27.31, 20.88, 'No warranty', 'Ships in 1 month', 'In Stock', '7 days return policy', 'https://cdn.dummyjson.com/products/images/mens-shirts/Blue%20&%20Black%20Check%20Shirt/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (84, 'Gigabyte Aorus Men Tshirt', 'The Gigabyte Aorus Men Tshirt is a cool and casual shirt for gaming enthusiasts. With the Aorus logo and sleek design, it''s perfect for expressing your gaming style.', 'mens-shirts', 24.99, 12.6, 21.84126, 4.95, 64, 'Gigabyte', 2, 8.54, 23.52, 5.66, '1 month warranty', 'Ships in 1 week', 'In Stock', '30 days return policy', 'https://cdn.dummyjson.com/products/images/mens-shirts/Gigabyte%20Aorus%20Men%20Tshirt/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (85, 'Man Plaid Shirt', 'The Man Plaid Shirt is a timeless and versatile men''s shirt with a classic plaid pattern. Its comfortable fit and casual style make it a wardrobe essential for various occasions.', 'mens-shirts', 34.99, 17.53, 28.856253000000002, 3.66, 65, 'Classic Wear', 1, 29.56, 29.84, 7.77, 'Lifetime warranty', 'Ships in 1 week', 'In Stock', '30 days return policy', 'https://cdn.dummyjson.com/products/images/mens-shirts/Man%20Plaid%20Shirt/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (86, 'Man Short Sleeve Shirt', 'The Man Short Sleeve Shirt is a breezy and stylish option for warm days. With a comfortable fit and short sleeves, it''s perfect for a laid-back yet polished look.', 'mens-shirts', 19.99, 8.65, 18.260865, 4.62, 20, 'Casual Comfort', 2, 7.11, 28.63, 27.54, '5 year warranty', 'Ships in 2 weeks', 'In Stock', '7 days return policy', 'https://cdn.dummyjson.com/products/images/mens-shirts/Man%20Short%20Sleeve%20Shirt/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (87, 'Men Check Shirt', 'The Men Check Shirt is a classic and versatile shirt featuring a stylish check pattern. Suitable for various occasions, it adds a smart and polished touch to your wardrobe.', 'mens-shirts', 27.99, 14.21, 24.012621, 2.9, 69, 'Urban Chic', 1, 18.43, 6.96, 20.73, '3 year warranty', 'Ships in 1 month', 'In Stock', '90 days return policy', 'https://cdn.dummyjson.com/products/images/mens-shirts/Men%20Check%20Shirt/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (88, 'Nike Air Jordan 1 Red And Black', 'The Nike Air Jordan 1 in Red and Black is an iconic basketball sneaker known for its stylish design and high-performance features, making it a favorite among sneaker enthusiasts and athletes.', 'mens-shoes', 149.99, 15.82, 126.261582, 2.77, 15, 'Nike', 5, 19.29, 13.2, 29.13, '1 year warranty', 'Ships in 1 month', 'In Stock', '7 days return policy', 'https://cdn.dummyjson.com/products/images/mens-shoes/Nike%20Air%20Jordan%201%20Red%20And%20Black/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (89, 'Nike Baseball Cleats', 'Nike Baseball Cleats are designed for maximum traction and performance on the baseball field. They provide stability and support for players during games and practices.', 'mens-shoes', 79.99, 11.4, 70.87114, 4.01, 14, 'Nike', 7, 14.83, 19.16, 28.98, 'No warranty', 'Ships overnight', 'In Stock', '7 days return policy', 'https://cdn.dummyjson.com/products/images/mens-shoes/Nike%20Baseball%20Cleats/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (90, 'Puma Future Rider Trainers', 'The Puma Future Rider Trainers offer a blend of retro style and modern comfort. Perfect for casual wear, these trainers provide a fashionable and comfortable option for everyday use.', 'mens-shoes', 89.99, 3.64, 86.71436399999999, 4.85, 10, 'Puma', 8, 14.58, 25.54, 19.57, '2 year warranty', 'Ships in 1 month', 'In Stock', '90 days return policy', 'https://cdn.dummyjson.com/products/images/mens-shoes/Puma%20Future%20Rider%20Trainers/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (91, 'Sports Sneakers Off White & Red', 'The Sports Sneakers in Off White and Red combine style and functionality, making them a fashionable choice for sports enthusiasts. The red and off-white color combination adds a bold and energetic touch.', 'mens-shoes', 119.99, 11.69, 105.963169, 4.92, 73, 'Off White', 3, 10.71, 19.23, 19.85, '6 months warranty', 'Ships overnight', 'In Stock', 'No return policy', 'https://cdn.dummyjson.com/products/images/mens-shoes/Sports%20Sneakers%20Off%20White%20&%20Red/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (92, 'Sports Sneakers Off White Red', 'Another variant of the Sports Sneakers in Off White Red, featuring a unique design. These sneakers offer style and comfort for casual occasions.', 'mens-shoes', 109.99, 17.22, 91.04972199999999, 2.95, 75, 'Off White', 4, 18.32, 19.34, 28.56, 'No warranty', 'Ships in 1 week', 'In Stock', 'No return policy', 'https://cdn.dummyjson.com/products/images/mens-shoes/Sports%20Sneakers%20Off%20White%20Red/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (93, 'Brown Leather Belt Watch', 'The Brown Leather Belt Watch is a stylish timepiece with a classic design. Featuring a genuine leather strap and a sleek dial, it adds a touch of sophistication to your look.', 'mens-watches', 89.99, 15.01, 76.482501, 4.47, 69, 'Fashion Timepieces', 10, 18.39, 10.82, 10.52, '3 months warranty', 'Ships in 1 week', 'In Stock', '90 days return policy', 'https://cdn.dummyjson.com/products/images/mens-watches/Brown%20Leather%20Belt%20Watch/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (94, 'Longines Master Collection', 'The Longines Master Collection is an elegant and refined watch known for its precision and craftsmanship. With a timeless design, it''s a symbol of luxury and sophistication.', 'mens-watches', 1499.99, 0.64, 1490.3900640000002, 2.64, 65, 'Longines', 2, 5.83, 12.48, 7.65, '1 month warranty', 'Ships in 3-5 business days', 'In Stock', '60 days return policy', 'https://cdn.dummyjson.com/products/images/mens-watches/Longines%20Master%20Collection/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (95, 'Rolex Cellini Date Black Dial', 'The Rolex Cellini Date with Black Dial is a classic and prestigious watch. With a black dial and date complication, it exudes sophistication and is a symbol of Rolex''s heritage.', 'mens-watches', 8999.99, 14.28, 7714.7914279999995, 3.61, 84, 'Rolex', 6, 12.17, 27.99, 10.36, '5 year warranty', 'Ships in 1 month', 'In Stock', '30 days return policy', 'https://cdn.dummyjson.com/products/images/mens-watches/Rolex%20Cellini%20Date%20Black%20Dial/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (96, 'Rolex Cellini Moonphase', 'The Rolex Cellini Moonphase is a masterpiece of horology, featuring a moon phase complication and exquisite design. It reflects Rolex''s commitment to precision and elegance.', 'mens-watches', 12999.99, 5.7, 12258.99057, 4.52, 33, 'Rolex', 5, 28.07, 13.43, 10.81, '3 year warranty', 'Ships overnight', 'In Stock', 'No return policy', 'https://cdn.dummyjson.com/products/images/mens-watches/Rolex%20Cellini%20Moonphase/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (97, 'Rolex Datejust', 'The Rolex Datejust is an iconic and versatile timepiece with a date window. Known for its timeless design and reliability, it''s a symbol of Rolex''s watchmaking excellence.', 'mens-watches', 10999.99, 9.69, 9934.090969, 4.94, 11, 'Rolex', 5, 9.68, 7.29, 5.67, '6 months warranty', 'Ships in 3-5 business days', 'In Stock', '90 days return policy', 'https://cdn.dummyjson.com/products/images/mens-watches/Rolex%20Datejust/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (98, 'Rolex Submariner Watch', 'The Rolex Submariner is a legendary dive watch with a rich history. Known for its durability and water resistance, it''s a symbol of adventure and exploration.', 'mens-watches', 13999.99, 0.82, 13885.190082, 2.97, 35, 'Rolex', 5, 5.22, 27.59, 16.93, 'No warranty', 'Ships in 1-2 business days', 'In Stock', '90 days return policy', 'https://cdn.dummyjson.com/products/images/mens-watches/Rolex%20Submariner%20Watch/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (99, 'Amazon Echo Plus', 'The Amazon Echo Plus is a smart speaker with built-in Alexa voice control. It features premium sound quality and serves as a hub for controlling smart home devices.', 'mobile-accessories', 99.99, 16.3, 83.69162999999999, 3.52, 50, 'Amazon', 7, 8.1, 7.74, 5.68, '1 month warranty', 'Ships in 1 week', 'In Stock', '90 days return policy', 'https://cdn.dummyjson.com/products/images/mobile-accessories/Amazon%20Echo%20Plus/thumbnail.png', 0);
INSERT INTO products (id, title, description, category, price, discountPercentage, priceWithDiscount, rating, stock, brand, weight, width, height, depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, thumbnail, total_sales) VALUES (100, 'Apple Airpods', 'The Apple Airpods offer a seamless wireless audio experience. With easy pairing, high-quality sound, and Siri integration, they are perfect for on-the-go listening.', 'mobile-accessories', 129.99, 4.82, 123.72448200000001, 4.38, 93, 'Apple', 3, 22.62, 9.92, 18.15, 'No warranty', 'Ships in 3-5 business days', 'In Stock', '60 days return policy', 'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Airpods/thumbnail.png', 0);

-- Inserts for tags
INSERT INTO tags (product_id, name) VALUES (1, 'beauty');
INSERT INTO tags (product_id, name) VALUES (1, 'mascara');
INSERT INTO tags (product_id, name) VALUES (2, 'beauty');
INSERT INTO tags (product_id, name) VALUES (2, 'eyeshadow');
INSERT INTO tags (product_id, name) VALUES (3, 'beauty');
INSERT INTO tags (product_id, name) VALUES (3, 'face powder');
INSERT INTO tags (product_id, name) VALUES (4, 'beauty');
INSERT INTO tags (product_id, name) VALUES (4, 'lipstick');
INSERT INTO tags (product_id, name) VALUES (5, 'beauty');
INSERT INTO tags (product_id, name) VALUES (5, 'nail polish');
INSERT INTO tags (product_id, name) VALUES (6, 'fragrances');
INSERT INTO tags (product_id, name) VALUES (6, 'perfumes');
INSERT INTO tags (product_id, name) VALUES (7, 'fragrances');
INSERT INTO tags (product_id, name) VALUES (7, 'perfumes');
INSERT INTO tags (product_id, name) VALUES (8, 'fragrances');
INSERT INTO tags (product_id, name) VALUES (8, 'perfumes');
INSERT INTO tags (product_id, name) VALUES (9, 'fragrances');
INSERT INTO tags (product_id, name) VALUES (9, 'perfumes');
INSERT INTO tags (product_id, name) VALUES (10, 'fragrances');
INSERT INTO tags (product_id, name) VALUES (10, 'perfumes');
INSERT INTO tags (product_id, name) VALUES (11, 'furniture');
INSERT INTO tags (product_id, name) VALUES (11, 'beds');
INSERT INTO tags (product_id, name) VALUES (12, 'furniture');
INSERT INTO tags (product_id, name) VALUES (12, 'sofas');
INSERT INTO tags (product_id, name) VALUES (13, 'furniture');
INSERT INTO tags (product_id, name) VALUES (13, 'bedside tables');
INSERT INTO tags (product_id, name) VALUES (14, 'furniture');
INSERT INTO tags (product_id, name) VALUES (14, 'office chairs');
INSERT INTO tags (product_id, name) VALUES (15, 'furniture');
INSERT INTO tags (product_id, name) VALUES (15, 'bathroom');
INSERT INTO tags (product_id, name) VALUES (16, 'fruits');
INSERT INTO tags (product_id, name) VALUES (17, 'meat');
INSERT INTO tags (product_id, name) VALUES (18, 'pet supplies');
INSERT INTO tags (product_id, name) VALUES (18, 'cat food');
INSERT INTO tags (product_id, name) VALUES (19, 'meat');
INSERT INTO tags (product_id, name) VALUES (20, 'cooking essentials');
INSERT INTO tags (product_id, name) VALUES (21, 'vegetables');
INSERT INTO tags (product_id, name) VALUES (22, 'pet supplies');
INSERT INTO tags (product_id, name) VALUES (22, 'dog food');
INSERT INTO tags (product_id, name) VALUES (23, 'dairy');
INSERT INTO tags (product_id, name) VALUES (24, 'seafood');
INSERT INTO tags (product_id, name) VALUES (25, 'vegetables');
INSERT INTO tags (product_id, name) VALUES (26, 'vegetables');
INSERT INTO tags (product_id, name) VALUES (27, 'condiments');
INSERT INTO tags (product_id, name) VALUES (28, 'desserts');
INSERT INTO tags (product_id, name) VALUES (29, 'beverages');
INSERT INTO tags (product_id, name) VALUES (30, 'fruits');
INSERT INTO tags (product_id, name) VALUES (31, 'fruits');
INSERT INTO tags (product_id, name) VALUES (32, 'dairy');
INSERT INTO tags (product_id, name) VALUES (33, 'fruits');
INSERT INTO tags (product_id, name) VALUES (34, 'beverages');
INSERT INTO tags (product_id, name) VALUES (34, 'coffee');
INSERT INTO tags (product_id, name) VALUES (35, 'vegetables');
INSERT INTO tags (product_id, name) VALUES (36, 'health supplements');
INSERT INTO tags (product_id, name) VALUES (37, 'vegetables');
INSERT INTO tags (product_id, name) VALUES (38, 'grains');
INSERT INTO tags (product_id, name) VALUES (39, 'beverages');
INSERT INTO tags (product_id, name) VALUES (40, 'fruits');
INSERT INTO tags (product_id, name) VALUES (41, 'household essentials');
INSERT INTO tags (product_id, name) VALUES (42, 'beverages');
INSERT INTO tags (product_id, name) VALUES (43, 'home decor');
INSERT INTO tags (product_id, name) VALUES (43, 'swing');
INSERT INTO tags (product_id, name) VALUES (44, 'home decor');
INSERT INTO tags (product_id, name) VALUES (44, 'photo frame');
INSERT INTO tags (product_id, name) VALUES (45, 'home decor');
INSERT INTO tags (product_id, name) VALUES (45, 'artificial plants');
INSERT INTO tags (product_id, name) VALUES (46, 'home decor');
INSERT INTO tags (product_id, name) VALUES (46, 'plant accessories');
INSERT INTO tags (product_id, name) VALUES (47, 'home decor');
INSERT INTO tags (product_id, name) VALUES (47, 'lighting');
INSERT INTO tags (product_id, name) VALUES (48, 'kitchen tools');
INSERT INTO tags (product_id, name) VALUES (48, 'utensils');
INSERT INTO tags (product_id, name) VALUES (49, 'drinkware');
INSERT INTO tags (product_id, name) VALUES (49, 'cups');
INSERT INTO tags (product_id, name) VALUES (50, 'kitchen tools');
INSERT INTO tags (product_id, name) VALUES (50, 'utensils');
INSERT INTO tags (product_id, name) VALUES (51, 'kitchen appliances');
INSERT INTO tags (product_id, name) VALUES (51, 'blenders');
INSERT INTO tags (product_id, name) VALUES (52, 'cookware');
INSERT INTO tags (product_id, name) VALUES (52, 'woks');
INSERT INTO tags (product_id, name) VALUES (53, 'kitchen tools');
INSERT INTO tags (product_id, name) VALUES (53, 'cutting boards');
INSERT INTO tags (product_id, name) VALUES (54, 'kitchen tools');
INSERT INTO tags (product_id, name) VALUES (54, 'juicers');
INSERT INTO tags (product_id, name) VALUES (55, 'kitchen tools');
INSERT INTO tags (product_id, name) VALUES (55, 'slicers');
INSERT INTO tags (product_id, name) VALUES (56, 'kitchen appliances');
INSERT INTO tags (product_id, name) VALUES (56, 'cooktops');
INSERT INTO tags (product_id, name) VALUES (57, 'kitchen tools');
INSERT INTO tags (product_id, name) VALUES (57, 'strainers');
INSERT INTO tags (product_id, name) VALUES (58, 'kitchen tools');
INSERT INTO tags (product_id, name) VALUES (58, 'utensils');
INSERT INTO tags (product_id, name) VALUES (59, 'drinkware');
INSERT INTO tags (product_id, name) VALUES (59, 'glasses');
INSERT INTO tags (product_id, name) VALUES (60, 'kitchen tools');
INSERT INTO tags (product_id, name) VALUES (60, 'graters');
INSERT INTO tags (product_id, name) VALUES (61, 'kitchen appliances');
INSERT INTO tags (product_id, name) VALUES (61, 'blenders');
INSERT INTO tags (product_id, name) VALUES (62, 'kitchen tools');
INSERT INTO tags (product_id, name) VALUES (62, 'ice cube trays');
INSERT INTO tags (product_id, name) VALUES (63, 'kitchen tools');
INSERT INTO tags (product_id, name) VALUES (63, 'strainers');
INSERT INTO tags (product_id, name) VALUES (64, 'kitchen tools');
INSERT INTO tags (product_id, name) VALUES (64, 'cutlery');
INSERT INTO tags (product_id, name) VALUES (65, 'kitchen tools');
INSERT INTO tags (product_id, name) VALUES (65, 'storage');
INSERT INTO tags (product_id, name) VALUES (66, 'kitchen appliances');
INSERT INTO tags (product_id, name) VALUES (66, 'microwaves');
INSERT INTO tags (product_id, name) VALUES (67, 'kitchen tools');
INSERT INTO tags (product_id, name) VALUES (67, 'organization');
INSERT INTO tags (product_id, name) VALUES (68, 'cookware');
INSERT INTO tags (product_id, name) VALUES (68, 'pans');
INSERT INTO tags (product_id, name) VALUES (69, 'dinnerware');
INSERT INTO tags (product_id, name) VALUES (69, 'plates');
INSERT INTO tags (product_id, name) VALUES (70, 'kitchen tools');
INSERT INTO tags (product_id, name) VALUES (70, 'tongs');
INSERT INTO tags (product_id, name) VALUES (71, 'cookware');
INSERT INTO tags (product_id, name) VALUES (71, 'pots');
INSERT INTO tags (product_id, name) VALUES (72, 'kitchen tools');
INSERT INTO tags (product_id, name) VALUES (72, 'turners');
INSERT INTO tags (product_id, name) VALUES (73, 'kitchen tools');
INSERT INTO tags (product_id, name) VALUES (73, 'organization');
INSERT INTO tags (product_id, name) VALUES (74, 'kitchen tools');
INSERT INTO tags (product_id, name) VALUES (74, 'utensils');
INSERT INTO tags (product_id, name) VALUES (75, 'serveware');
INSERT INTO tags (product_id, name) VALUES (75, 'trays');
INSERT INTO tags (product_id, name) VALUES (76, 'kitchen tools');
INSERT INTO tags (product_id, name) VALUES (76, 'baking');
INSERT INTO tags (product_id, name) VALUES (77, 'kitchen tools');
INSERT INTO tags (product_id, name) VALUES (77, 'peelers');
INSERT INTO tags (product_id, name) VALUES (78, 'laptops');
INSERT INTO tags (product_id, name) VALUES (78, 'apple');
INSERT INTO tags (product_id, name) VALUES (79, 'laptops');
INSERT INTO tags (product_id, name) VALUES (80, 'laptops');
INSERT INTO tags (product_id, name) VALUES (81, 'laptops');
INSERT INTO tags (product_id, name) VALUES (82, 'laptops');
INSERT INTO tags (product_id, name) VALUES (83, 'clothing');
INSERT INTO tags (product_id, name) VALUES (83, 'men''s shirts');
INSERT INTO tags (product_id, name) VALUES (84, 'clothing');
INSERT INTO tags (product_id, name) VALUES (84, 'men''s t-shirts');
INSERT INTO tags (product_id, name) VALUES (85, 'clothing');
INSERT INTO tags (product_id, name) VALUES (85, 'men''s shirts');
INSERT INTO tags (product_id, name) VALUES (86, 'clothing');
INSERT INTO tags (product_id, name) VALUES (86, 'men''s shirts');
INSERT INTO tags (product_id, name) VALUES (87, 'clothing');
INSERT INTO tags (product_id, name) VALUES (87, 'men''s shirts');
INSERT INTO tags (product_id, name) VALUES (88, 'footwear');
INSERT INTO tags (product_id, name) VALUES (88, 'athletic shoes');
INSERT INTO tags (product_id, name) VALUES (89, 'footwear');
INSERT INTO tags (product_id, name) VALUES (89, 'sports cleats');
INSERT INTO tags (product_id, name) VALUES (90, 'footwear');
INSERT INTO tags (product_id, name) VALUES (90, 'casual shoes');
INSERT INTO tags (product_id, name) VALUES (91, 'footwear');
INSERT INTO tags (product_id, name) VALUES (91, 'athletic shoes');
INSERT INTO tags (product_id, name) VALUES (92, 'footwear');
INSERT INTO tags (product_id, name) VALUES (92, 'casual shoes');
INSERT INTO tags (product_id, name) VALUES (93, 'watches');
INSERT INTO tags (product_id, name) VALUES (93, 'leather watches');
INSERT INTO tags (product_id, name) VALUES (94, 'watches');
INSERT INTO tags (product_id, name) VALUES (94, 'luxury watches');
INSERT INTO tags (product_id, name) VALUES (95, 'watches');
INSERT INTO tags (product_id, name) VALUES (95, 'luxury watches');
INSERT INTO tags (product_id, name) VALUES (96, 'watches');
INSERT INTO tags (product_id, name) VALUES (96, 'luxury watches');
INSERT INTO tags (product_id, name) VALUES (97, 'watches');
INSERT INTO tags (product_id, name) VALUES (97, 'luxury watches');
INSERT INTO tags (product_id, name) VALUES (98, 'watches');
INSERT INTO tags (product_id, name) VALUES (98, 'luxury watches');
INSERT INTO tags (product_id, name) VALUES (99, 'electronics');
INSERT INTO tags (product_id, name) VALUES (99, 'smart speakers');
INSERT INTO tags (product_id, name) VALUES (100, 'electronics');
INSERT INTO tags (product_id, name) VALUES (100, 'wireless earphones');

-- Inserts for images
INSERT INTO images (product_id, url) VALUES (1, 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png');
INSERT INTO images (product_id, url) VALUES (2, 'https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/1.png');
INSERT INTO images (product_id, url) VALUES (3, 'https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/1.png');
INSERT INTO images (product_id, url) VALUES (4, 'https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/1.png');
INSERT INTO images (product_id, url) VALUES (5, 'https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/1.png');
INSERT INTO images (product_id, url) VALUES (6, 'https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/1.png');
INSERT INTO images (product_id, url) VALUES (6, 'https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/2.png');
INSERT INTO images (product_id, url) VALUES (6, 'https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/3.png');
INSERT INTO images (product_id, url) VALUES (7, 'https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/1.png');
INSERT INTO images (product_id, url) VALUES (7, 'https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/2.png');
INSERT INTO images (product_id, url) VALUES (7, 'https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/3.png');
INSERT INTO images (product_id, url) VALUES (8, 'https://cdn.dummyjson.com/products/images/fragrances/Dior%20J''adore/1.png');
INSERT INTO images (product_id, url) VALUES (8, 'https://cdn.dummyjson.com/products/images/fragrances/Dior%20J''adore/2.png');
INSERT INTO images (product_id, url) VALUES (8, 'https://cdn.dummyjson.com/products/images/fragrances/Dior%20J''adore/3.png');
INSERT INTO images (product_id, url) VALUES (9, 'https://cdn.dummyjson.com/products/images/fragrances/Dolce%20Shine%20Eau%20de/1.png');
INSERT INTO images (product_id, url) VALUES (9, 'https://cdn.dummyjson.com/products/images/fragrances/Dolce%20Shine%20Eau%20de/2.png');
INSERT INTO images (product_id, url) VALUES (9, 'https://cdn.dummyjson.com/products/images/fragrances/Dolce%20Shine%20Eau%20de/3.png');
INSERT INTO images (product_id, url) VALUES (10, 'https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/1.png');
INSERT INTO images (product_id, url) VALUES (10, 'https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/2.png');
INSERT INTO images (product_id, url) VALUES (10, 'https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/3.png');
INSERT INTO images (product_id, url) VALUES (11, 'https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/1.png');
INSERT INTO images (product_id, url) VALUES (11, 'https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/2.png');
INSERT INTO images (product_id, url) VALUES (11, 'https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/3.png');
INSERT INTO images (product_id, url) VALUES (12, 'https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Sofa/1.png');
INSERT INTO images (product_id, url) VALUES (12, 'https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Sofa/2.png');
INSERT INTO images (product_id, url) VALUES (12, 'https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Sofa/3.png');
INSERT INTO images (product_id, url) VALUES (13, 'https://cdn.dummyjson.com/products/images/furniture/Bedside%20Table%20African%20Cherry/1.png');
INSERT INTO images (product_id, url) VALUES (13, 'https://cdn.dummyjson.com/products/images/furniture/Bedside%20Table%20African%20Cherry/2.png');
INSERT INTO images (product_id, url) VALUES (13, 'https://cdn.dummyjson.com/products/images/furniture/Bedside%20Table%20African%20Cherry/3.png');
INSERT INTO images (product_id, url) VALUES (14, 'https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/1.png');
INSERT INTO images (product_id, url) VALUES (14, 'https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/2.png');
INSERT INTO images (product_id, url) VALUES (14, 'https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/3.png');
INSERT INTO images (product_id, url) VALUES (15, 'https://cdn.dummyjson.com/products/images/furniture/Wooden%20Bathroom%20Sink%20With%20Mirror/1.png');
INSERT INTO images (product_id, url) VALUES (15, 'https://cdn.dummyjson.com/products/images/furniture/Wooden%20Bathroom%20Sink%20With%20Mirror/2.png');
INSERT INTO images (product_id, url) VALUES (15, 'https://cdn.dummyjson.com/products/images/furniture/Wooden%20Bathroom%20Sink%20With%20Mirror/3.png');
INSERT INTO images (product_id, url) VALUES (16, 'https://cdn.dummyjson.com/products/images/groceries/Apple/1.png');
INSERT INTO images (product_id, url) VALUES (17, 'https://cdn.dummyjson.com/products/images/groceries/Beef%20Steak/1.png');
INSERT INTO images (product_id, url) VALUES (18, 'https://cdn.dummyjson.com/products/images/groceries/Cat%20Food/1.png');
INSERT INTO images (product_id, url) VALUES (19, 'https://cdn.dummyjson.com/products/images/groceries/Chicken%20Meat/1.png');
INSERT INTO images (product_id, url) VALUES (19, 'https://cdn.dummyjson.com/products/images/groceries/Chicken%20Meat/2.png');
INSERT INTO images (product_id, url) VALUES (20, 'https://cdn.dummyjson.com/products/images/groceries/Cooking%20Oil/1.png');
INSERT INTO images (product_id, url) VALUES (21, 'https://cdn.dummyjson.com/products/images/groceries/Cucumber/1.png');
INSERT INTO images (product_id, url) VALUES (22, 'https://cdn.dummyjson.com/products/images/groceries/Dog%20Food/1.png');
INSERT INTO images (product_id, url) VALUES (23, 'https://cdn.dummyjson.com/products/images/groceries/Eggs/1.png');
INSERT INTO images (product_id, url) VALUES (24, 'https://cdn.dummyjson.com/products/images/groceries/Fish%20Steak/1.png');
INSERT INTO images (product_id, url) VALUES (25, 'https://cdn.dummyjson.com/products/images/groceries/Green%20Bell%20Pepper/1.png');
INSERT INTO images (product_id, url) VALUES (26, 'https://cdn.dummyjson.com/products/images/groceries/Green%20Chili%20Pepper/1.png');
INSERT INTO images (product_id, url) VALUES (27, 'https://cdn.dummyjson.com/products/images/groceries/Honey%20Jar/1.png');
INSERT INTO images (product_id, url) VALUES (28, 'https://cdn.dummyjson.com/products/images/groceries/Ice%20Cream/1.png');
INSERT INTO images (product_id, url) VALUES (28, 'https://cdn.dummyjson.com/products/images/groceries/Ice%20Cream/2.png');
INSERT INTO images (product_id, url) VALUES (28, 'https://cdn.dummyjson.com/products/images/groceries/Ice%20Cream/3.png');
INSERT INTO images (product_id, url) VALUES (28, 'https://cdn.dummyjson.com/products/images/groceries/Ice%20Cream/4.png');
INSERT INTO images (product_id, url) VALUES (29, 'https://cdn.dummyjson.com/products/images/groceries/Juice/1.png');
INSERT INTO images (product_id, url) VALUES (30, 'https://cdn.dummyjson.com/products/images/groceries/Kiwi/1.png');
INSERT INTO images (product_id, url) VALUES (31, 'https://cdn.dummyjson.com/products/images/groceries/Lemon/1.png');
INSERT INTO images (product_id, url) VALUES (32, 'https://cdn.dummyjson.com/products/images/groceries/Milk/1.png');
INSERT INTO images (product_id, url) VALUES (33, 'https://cdn.dummyjson.com/products/images/groceries/Mulberry/1.png');
INSERT INTO images (product_id, url) VALUES (34, 'https://cdn.dummyjson.com/products/images/groceries/Nescafe%20Coffee/1.png');
INSERT INTO images (product_id, url) VALUES (35, 'https://cdn.dummyjson.com/products/images/groceries/Potatoes/1.png');
INSERT INTO images (product_id, url) VALUES (36, 'https://cdn.dummyjson.com/products/images/groceries/Protein%20Powder/1.png');
INSERT INTO images (product_id, url) VALUES (37, 'https://cdn.dummyjson.com/products/images/groceries/Red%20Onions/1.png');
INSERT INTO images (product_id, url) VALUES (38, 'https://cdn.dummyjson.com/products/images/groceries/Rice/1.png');
INSERT INTO images (product_id, url) VALUES (39, 'https://cdn.dummyjson.com/products/images/groceries/Soft%20Drinks/1.png');
INSERT INTO images (product_id, url) VALUES (40, 'https://cdn.dummyjson.com/products/images/groceries/Strawberry/1.png');
INSERT INTO images (product_id, url) VALUES (41, 'https://cdn.dummyjson.com/products/images/groceries/Tissue%20Paper%20Box/1.png');
INSERT INTO images (product_id, url) VALUES (41, 'https://cdn.dummyjson.com/products/images/groceries/Tissue%20Paper%20Box/2.png');
INSERT INTO images (product_id, url) VALUES (42, 'https://cdn.dummyjson.com/products/images/groceries/Water/1.png');
INSERT INTO images (product_id, url) VALUES (43, 'https://cdn.dummyjson.com/products/images/home-decoration/Decoration%20Swing/1.png');
INSERT INTO images (product_id, url) VALUES (43, 'https://cdn.dummyjson.com/products/images/home-decoration/Decoration%20Swing/2.png');
INSERT INTO images (product_id, url) VALUES (43, 'https://cdn.dummyjson.com/products/images/home-decoration/Decoration%20Swing/3.png');
INSERT INTO images (product_id, url) VALUES (44, 'https://cdn.dummyjson.com/products/images/home-decoration/Family%20Tree%20Photo%20Frame/1.png');
INSERT INTO images (product_id, url) VALUES (45, 'https://cdn.dummyjson.com/products/images/home-decoration/House%20Showpiece%20Plant/1.png');
INSERT INTO images (product_id, url) VALUES (45, 'https://cdn.dummyjson.com/products/images/home-decoration/House%20Showpiece%20Plant/2.png');
INSERT INTO images (product_id, url) VALUES (45, 'https://cdn.dummyjson.com/products/images/home-decoration/House%20Showpiece%20Plant/3.png');
INSERT INTO images (product_id, url) VALUES (46, 'https://cdn.dummyjson.com/products/images/home-decoration/Plant%20Pot/1.png');
INSERT INTO images (product_id, url) VALUES (46, 'https://cdn.dummyjson.com/products/images/home-decoration/Plant%20Pot/2.png');
INSERT INTO images (product_id, url) VALUES (46, 'https://cdn.dummyjson.com/products/images/home-decoration/Plant%20Pot/3.png');
INSERT INTO images (product_id, url) VALUES (46, 'https://cdn.dummyjson.com/products/images/home-decoration/Plant%20Pot/4.png');
INSERT INTO images (product_id, url) VALUES (47, 'https://cdn.dummyjson.com/products/images/home-decoration/Table%20Lamp/1.png');
INSERT INTO images (product_id, url) VALUES (48, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Bamboo%20Spatula/1.png');
INSERT INTO images (product_id, url) VALUES (49, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Black%20Aluminium%20Cup/1.png');
INSERT INTO images (product_id, url) VALUES (49, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Black%20Aluminium%20Cup/2.png');
INSERT INTO images (product_id, url) VALUES (50, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Black%20Whisk/1.png');
INSERT INTO images (product_id, url) VALUES (51, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Boxed%20Blender/1.png');
INSERT INTO images (product_id, url) VALUES (51, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Boxed%20Blender/2.png');
INSERT INTO images (product_id, url) VALUES (51, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Boxed%20Blender/3.png');
INSERT INTO images (product_id, url) VALUES (51, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Boxed%20Blender/4.png');
INSERT INTO images (product_id, url) VALUES (52, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Carbon%20Steel%20Wok/1.png');
INSERT INTO images (product_id, url) VALUES (53, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Chopping%20Board/1.png');
INSERT INTO images (product_id, url) VALUES (54, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Citrus%20Squeezer%20Yellow/1.png');
INSERT INTO images (product_id, url) VALUES (55, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Egg%20Slicer/1.png');
INSERT INTO images (product_id, url) VALUES (56, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Electric%20Stove/1.png');
INSERT INTO images (product_id, url) VALUES (56, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Electric%20Stove/2.png');
INSERT INTO images (product_id, url) VALUES (56, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Electric%20Stove/3.png');
INSERT INTO images (product_id, url) VALUES (56, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Electric%20Stove/4.png');
INSERT INTO images (product_id, url) VALUES (57, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Fine%20Mesh%20Strainer/1.png');
INSERT INTO images (product_id, url) VALUES (58, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Fork/1.png');
INSERT INTO images (product_id, url) VALUES (59, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Glass/1.png');
INSERT INTO images (product_id, url) VALUES (60, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Grater%20Black/1.png');
INSERT INTO images (product_id, url) VALUES (61, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Hand%20Blender/1.png');
INSERT INTO images (product_id, url) VALUES (62, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Ice%20Cube%20Tray/1.png');
INSERT INTO images (product_id, url) VALUES (63, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Kitchen%20Sieve/1.png');
INSERT INTO images (product_id, url) VALUES (64, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Knife/1.png');
INSERT INTO images (product_id, url) VALUES (65, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Lunch%20Box/1.png');
INSERT INTO images (product_id, url) VALUES (66, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Microwave%20Oven/1.png');
INSERT INTO images (product_id, url) VALUES (66, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Microwave%20Oven/2.png');
INSERT INTO images (product_id, url) VALUES (66, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Microwave%20Oven/3.png');
INSERT INTO images (product_id, url) VALUES (66, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Microwave%20Oven/4.png');
INSERT INTO images (product_id, url) VALUES (67, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Mug%20Tree%20Stand/1.png');
INSERT INTO images (product_id, url) VALUES (67, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Mug%20Tree%20Stand/2.png');
INSERT INTO images (product_id, url) VALUES (68, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Pan/1.png');
INSERT INTO images (product_id, url) VALUES (69, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Plate/1.png');
INSERT INTO images (product_id, url) VALUES (70, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Red%20Tongs/1.png');
INSERT INTO images (product_id, url) VALUES (71, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Silver%20Pot%20With%20Glass%20Cap/1.png');
INSERT INTO images (product_id, url) VALUES (72, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Slotted%20Turner/1.png');
INSERT INTO images (product_id, url) VALUES (73, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Spice%20Rack/1.png');
INSERT INTO images (product_id, url) VALUES (74, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Spoon/1.png');
INSERT INTO images (product_id, url) VALUES (75, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Tray/1.png');
INSERT INTO images (product_id, url) VALUES (76, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Wooden%20Rolling%20Pin/1.png');
INSERT INTO images (product_id, url) VALUES (77, 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Yellow%20Peeler/1.png');
INSERT INTO images (product_id, url) VALUES (78, 'https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/1.png');
INSERT INTO images (product_id, url) VALUES (78, 'https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/2.png');
INSERT INTO images (product_id, url) VALUES (78, 'https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/3.png');
INSERT INTO images (product_id, url) VALUES (79, 'https://cdn.dummyjson.com/products/images/laptops/Asus%20Zenbook%20Pro%20Dual%20Screen%20Laptop/1.png');
INSERT INTO images (product_id, url) VALUES (79, 'https://cdn.dummyjson.com/products/images/laptops/Asus%20Zenbook%20Pro%20Dual%20Screen%20Laptop/2.png');
INSERT INTO images (product_id, url) VALUES (79, 'https://cdn.dummyjson.com/products/images/laptops/Asus%20Zenbook%20Pro%20Dual%20Screen%20Laptop/3.png');
INSERT INTO images (product_id, url) VALUES (80, 'https://cdn.dummyjson.com/products/images/laptops/Huawei%20Matebook%20X%20Pro/1.png');
INSERT INTO images (product_id, url) VALUES (80, 'https://cdn.dummyjson.com/products/images/laptops/Huawei%20Matebook%20X%20Pro/2.png');
INSERT INTO images (product_id, url) VALUES (80, 'https://cdn.dummyjson.com/products/images/laptops/Huawei%20Matebook%20X%20Pro/3.png');
INSERT INTO images (product_id, url) VALUES (81, 'https://cdn.dummyjson.com/products/images/laptops/Lenovo%20Yoga%20920/1.png');
INSERT INTO images (product_id, url) VALUES (81, 'https://cdn.dummyjson.com/products/images/laptops/Lenovo%20Yoga%20920/2.png');
INSERT INTO images (product_id, url) VALUES (81, 'https://cdn.dummyjson.com/products/images/laptops/Lenovo%20Yoga%20920/3.png');
INSERT INTO images (product_id, url) VALUES (82, 'https://cdn.dummyjson.com/products/images/laptops/New%20DELL%20XPS%2013%209300%20Laptop/1.png');
INSERT INTO images (product_id, url) VALUES (82, 'https://cdn.dummyjson.com/products/images/laptops/New%20DELL%20XPS%2013%209300%20Laptop/2.png');
INSERT INTO images (product_id, url) VALUES (82, 'https://cdn.dummyjson.com/products/images/laptops/New%20DELL%20XPS%2013%209300%20Laptop/3.png');
INSERT INTO images (product_id, url) VALUES (83, 'https://cdn.dummyjson.com/products/images/mens-shirts/Blue%20&%20Black%20Check%20Shirt/1.png');
INSERT INTO images (product_id, url) VALUES (83, 'https://cdn.dummyjson.com/products/images/mens-shirts/Blue%20&%20Black%20Check%20Shirt/2.png');
INSERT INTO images (product_id, url) VALUES (83, 'https://cdn.dummyjson.com/products/images/mens-shirts/Blue%20&%20Black%20Check%20Shirt/3.png');
INSERT INTO images (product_id, url) VALUES (83, 'https://cdn.dummyjson.com/products/images/mens-shirts/Blue%20&%20Black%20Check%20Shirt/4.png');
INSERT INTO images (product_id, url) VALUES (84, 'https://cdn.dummyjson.com/products/images/mens-shirts/Gigabyte%20Aorus%20Men%20Tshirt/1.png');
INSERT INTO images (product_id, url) VALUES (84, 'https://cdn.dummyjson.com/products/images/mens-shirts/Gigabyte%20Aorus%20Men%20Tshirt/2.png');
INSERT INTO images (product_id, url) VALUES (84, 'https://cdn.dummyjson.com/products/images/mens-shirts/Gigabyte%20Aorus%20Men%20Tshirt/3.png');
INSERT INTO images (product_id, url) VALUES (84, 'https://cdn.dummyjson.com/products/images/mens-shirts/Gigabyte%20Aorus%20Men%20Tshirt/4.png');
INSERT INTO images (product_id, url) VALUES (85, 'https://cdn.dummyjson.com/products/images/mens-shirts/Man%20Plaid%20Shirt/1.png');
INSERT INTO images (product_id, url) VALUES (85, 'https://cdn.dummyjson.com/products/images/mens-shirts/Man%20Plaid%20Shirt/2.png');
INSERT INTO images (product_id, url) VALUES (85, 'https://cdn.dummyjson.com/products/images/mens-shirts/Man%20Plaid%20Shirt/3.png');
INSERT INTO images (product_id, url) VALUES (85, 'https://cdn.dummyjson.com/products/images/mens-shirts/Man%20Plaid%20Shirt/4.png');
INSERT INTO images (product_id, url) VALUES (86, 'https://cdn.dummyjson.com/products/images/mens-shirts/Man%20Short%20Sleeve%20Shirt/1.png');
INSERT INTO images (product_id, url) VALUES (86, 'https://cdn.dummyjson.com/products/images/mens-shirts/Man%20Short%20Sleeve%20Shirt/2.png');
INSERT INTO images (product_id, url) VALUES (86, 'https://cdn.dummyjson.com/products/images/mens-shirts/Man%20Short%20Sleeve%20Shirt/3.png');
INSERT INTO images (product_id, url) VALUES (86, 'https://cdn.dummyjson.com/products/images/mens-shirts/Man%20Short%20Sleeve%20Shirt/4.png');
INSERT INTO images (product_id, url) VALUES (87, 'https://cdn.dummyjson.com/products/images/mens-shirts/Men%20Check%20Shirt/1.png');
INSERT INTO images (product_id, url) VALUES (87, 'https://cdn.dummyjson.com/products/images/mens-shirts/Men%20Check%20Shirt/2.png');
INSERT INTO images (product_id, url) VALUES (87, 'https://cdn.dummyjson.com/products/images/mens-shirts/Men%20Check%20Shirt/3.png');
INSERT INTO images (product_id, url) VALUES (87, 'https://cdn.dummyjson.com/products/images/mens-shirts/Men%20Check%20Shirt/4.png');
INSERT INTO images (product_id, url) VALUES (88, 'https://cdn.dummyjson.com/products/images/mens-shoes/Nike%20Air%20Jordan%201%20Red%20And%20Black/1.png');
INSERT INTO images (product_id, url) VALUES (88, 'https://cdn.dummyjson.com/products/images/mens-shoes/Nike%20Air%20Jordan%201%20Red%20And%20Black/2.png');
INSERT INTO images (product_id, url) VALUES (88, 'https://cdn.dummyjson.com/products/images/mens-shoes/Nike%20Air%20Jordan%201%20Red%20And%20Black/3.png');
INSERT INTO images (product_id, url) VALUES (88, 'https://cdn.dummyjson.com/products/images/mens-shoes/Nike%20Air%20Jordan%201%20Red%20And%20Black/4.png');
INSERT INTO images (product_id, url) VALUES (89, 'https://cdn.dummyjson.com/products/images/mens-shoes/Nike%20Baseball%20Cleats/1.png');
INSERT INTO images (product_id, url) VALUES (89, 'https://cdn.dummyjson.com/products/images/mens-shoes/Nike%20Baseball%20Cleats/2.png');
INSERT INTO images (product_id, url) VALUES (89, 'https://cdn.dummyjson.com/products/images/mens-shoes/Nike%20Baseball%20Cleats/3.png');
INSERT INTO images (product_id, url) VALUES (89, 'https://cdn.dummyjson.com/products/images/mens-shoes/Nike%20Baseball%20Cleats/4.png');
INSERT INTO images (product_id, url) VALUES (90, 'https://cdn.dummyjson.com/products/images/mens-shoes/Puma%20Future%20Rider%20Trainers/1.png');
INSERT INTO images (product_id, url) VALUES (90, 'https://cdn.dummyjson.com/products/images/mens-shoes/Puma%20Future%20Rider%20Trainers/2.png');
INSERT INTO images (product_id, url) VALUES (90, 'https://cdn.dummyjson.com/products/images/mens-shoes/Puma%20Future%20Rider%20Trainers/3.png');
INSERT INTO images (product_id, url) VALUES (90, 'https://cdn.dummyjson.com/products/images/mens-shoes/Puma%20Future%20Rider%20Trainers/4.png');
INSERT INTO images (product_id, url) VALUES (91, 'https://cdn.dummyjson.com/products/images/mens-shoes/Sports%20Sneakers%20Off%20White%20&%20Red/1.png');
INSERT INTO images (product_id, url) VALUES (91, 'https://cdn.dummyjson.com/products/images/mens-shoes/Sports%20Sneakers%20Off%20White%20&%20Red/2.png');
INSERT INTO images (product_id, url) VALUES (91, 'https://cdn.dummyjson.com/products/images/mens-shoes/Sports%20Sneakers%20Off%20White%20&%20Red/3.png');
INSERT INTO images (product_id, url) VALUES (91, 'https://cdn.dummyjson.com/products/images/mens-shoes/Sports%20Sneakers%20Off%20White%20&%20Red/4.png');
INSERT INTO images (product_id, url) VALUES (92, 'https://cdn.dummyjson.com/products/images/mens-shoes/Sports%20Sneakers%20Off%20White%20Red/1.png');
INSERT INTO images (product_id, url) VALUES (92, 'https://cdn.dummyjson.com/products/images/mens-shoes/Sports%20Sneakers%20Off%20White%20Red/2.png');
INSERT INTO images (product_id, url) VALUES (92, 'https://cdn.dummyjson.com/products/images/mens-shoes/Sports%20Sneakers%20Off%20White%20Red/3.png');
INSERT INTO images (product_id, url) VALUES (92, 'https://cdn.dummyjson.com/products/images/mens-shoes/Sports%20Sneakers%20Off%20White%20Red/4.png');
INSERT INTO images (product_id, url) VALUES (93, 'https://cdn.dummyjson.com/products/images/mens-watches/Brown%20Leather%20Belt%20Watch/1.png');
INSERT INTO images (product_id, url) VALUES (93, 'https://cdn.dummyjson.com/products/images/mens-watches/Brown%20Leather%20Belt%20Watch/2.png');
INSERT INTO images (product_id, url) VALUES (93, 'https://cdn.dummyjson.com/products/images/mens-watches/Brown%20Leather%20Belt%20Watch/3.png');
INSERT INTO images (product_id, url) VALUES (94, 'https://cdn.dummyjson.com/products/images/mens-watches/Longines%20Master%20Collection/1.png');
INSERT INTO images (product_id, url) VALUES (94, 'https://cdn.dummyjson.com/products/images/mens-watches/Longines%20Master%20Collection/2.png');
INSERT INTO images (product_id, url) VALUES (94, 'https://cdn.dummyjson.com/products/images/mens-watches/Longines%20Master%20Collection/3.png');
INSERT INTO images (product_id, url) VALUES (95, 'https://cdn.dummyjson.com/products/images/mens-watches/Rolex%20Cellini%20Date%20Black%20Dial/1.png');
INSERT INTO images (product_id, url) VALUES (95, 'https://cdn.dummyjson.com/products/images/mens-watches/Rolex%20Cellini%20Date%20Black%20Dial/2.png');
INSERT INTO images (product_id, url) VALUES (95, 'https://cdn.dummyjson.com/products/images/mens-watches/Rolex%20Cellini%20Date%20Black%20Dial/3.png');
INSERT INTO images (product_id, url) VALUES (96, 'https://cdn.dummyjson.com/products/images/mens-watches/Rolex%20Cellini%20Moonphase/1.png');
INSERT INTO images (product_id, url) VALUES (96, 'https://cdn.dummyjson.com/products/images/mens-watches/Rolex%20Cellini%20Moonphase/2.png');
INSERT INTO images (product_id, url) VALUES (96, 'https://cdn.dummyjson.com/products/images/mens-watches/Rolex%20Cellini%20Moonphase/3.png');
INSERT INTO images (product_id, url) VALUES (97, 'https://cdn.dummyjson.com/products/images/mens-watches/Rolex%20Datejust/1.png');
INSERT INTO images (product_id, url) VALUES (97, 'https://cdn.dummyjson.com/products/images/mens-watches/Rolex%20Datejust/2.png');
INSERT INTO images (product_id, url) VALUES (97, 'https://cdn.dummyjson.com/products/images/mens-watches/Rolex%20Datejust/3.png');
INSERT INTO images (product_id, url) VALUES (98, 'https://cdn.dummyjson.com/products/images/mens-watches/Rolex%20Submariner%20Watch/1.png');
INSERT INTO images (product_id, url) VALUES (98, 'https://cdn.dummyjson.com/products/images/mens-watches/Rolex%20Submariner%20Watch/2.png');
INSERT INTO images (product_id, url) VALUES (98, 'https://cdn.dummyjson.com/products/images/mens-watches/Rolex%20Submariner%20Watch/3.png');
INSERT INTO images (product_id, url) VALUES (99, 'https://cdn.dummyjson.com/products/images/mobile-accessories/Amazon%20Echo%20Plus/1.png');
INSERT INTO images (product_id, url) VALUES (99, 'https://cdn.dummyjson.com/products/images/mobile-accessories/Amazon%20Echo%20Plus/2.png');
INSERT INTO images (product_id, url) VALUES (100, 'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Airpods/1.png');
INSERT INTO images (product_id, url) VALUES (100, 'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Airpods/2.png');
INSERT INTO images (product_id, url) VALUES (100, 'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Airpods/3.png');

-- Inserts for user_data
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('owen.sullivan@x.dummyjson.com', 'Owen', 'Sullivan', 'xx-xx-xx-xx-xx', 'owen.sullivan@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('max.parker@x.dummyjson.com', 'Max', 'Parker', 'xx-xx-xx-xx-xx', 'max.parker@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('ellie.stewart@x.dummyjson.com', 'Ellie', 'Stewart', 'xx-xx-xx-xx-xx', 'ellie.stewart@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('daniel.taylor@x.dummyjson.com', 'Daniel', 'Taylor', 'xx-xx-xx-xx-xx', 'daniel.taylor@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('layla.young@x.dummyjson.com', 'Layla', 'Young', 'xx-xx-xx-xx-xx', 'layla.young@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('ella.cook@x.dummyjson.com', 'Ella', 'Cook', 'xx-xx-xx-xx-xx', 'ella.cook@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('harper.turner@x.dummyjson.com', 'Harper', 'Turner', 'xx-xx-xx-xx-xx', 'harper.turner@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('bella.grant@x.dummyjson.com', 'Bella', 'Grant', 'xx-xx-xx-xx-xx', 'bella.grant@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('noah.hernandez@x.dummyjson.com', 'Noah', 'Hernandez', 'xx-xx-xx-xx-xx', 'noah.hernandez@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('james.davis@x.dummyjson.com', 'James', 'Davis', 'xx-xx-xx-xx-xx', 'james.davis@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('victoria.mcdonald@x.dummyjson.com', 'Victoria', 'McDonald', 'xx-xx-xx-xx-xx', 'victoria.mcdonald@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('aria.parker@x.dummyjson.com', 'Aria', 'Parker', 'xx-xx-xx-xx-xx', 'aria.parker@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('natalie.price@x.dummyjson.com', 'Natalie', 'Price', 'xx-xx-xx-xx-xx', 'natalie.price@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('mason.parker@x.dummyjson.com', 'Mason', 'Parker', 'xx-xx-xx-xx-xx', 'mason.parker@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('claire.foster@x.dummyjson.com', 'Claire', 'Foster', 'xx-xx-xx-xx-xx', 'claire.foster@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('wyatt.perry@x.dummyjson.com', 'Wyatt', 'Perry', 'xx-xx-xx-xx-xx', 'wyatt.perry@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('elijah.stewart@x.dummyjson.com', 'Elijah', 'Stewart', 'xx-xx-xx-xx-xx', 'elijah.stewart@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('carter.baker@x.dummyjson.com', 'Carter', 'Baker', 'xx-xx-xx-xx-xx', 'carter.baker@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('chloe.morales@x.dummyjson.com', 'Chloe', 'Morales', 'xx-xx-xx-xx-xx', 'chloe.morales@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('leo.rivera@x.dummyjson.com', 'Leo', 'Rivera', 'xx-xx-xx-xx-xx', 'leo.rivera@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('aurora.rodriguez@x.dummyjson.com', 'Aurora', 'Rodriguez', 'xx-xx-xx-xx-xx', 'aurora.rodriguez@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('elijah.cruz@x.dummyjson.com', 'Elijah', 'Cruz', 'xx-xx-xx-xx-xx', 'elijah.cruz@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('dylan.wells@x.dummyjson.com', 'Dylan', 'Wells', 'xx-xx-xx-xx-xx', 'dylan.wells@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('julian.newton@x.dummyjson.com', 'Julian', 'Newton', 'xx-xx-xx-xx-xx', 'julian.newton@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('mia.miller@x.dummyjson.com', 'Mia', 'Miller', 'xx-xx-xx-xx-xx', 'mia.miller@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('gabriel.hayes@x.dummyjson.com', 'Gabriel', 'Hayes', 'xx-xx-xx-xx-xx', 'gabriel.hayes@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('grayson.coleman@x.dummyjson.com', 'Grayson', 'Coleman', 'xx-xx-xx-xx-xx', 'grayson.coleman@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('jackson.morales@x.dummyjson.com', 'Jackson', 'Morales', 'xx-xx-xx-xx-xx', 'jackson.morales@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('liam.gonzalez@x.dummyjson.com', 'Liam', 'Gonzalez', 'xx-xx-xx-xx-xx', 'liam.gonzalez@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('penelope.king@x.dummyjson.com', 'Penelope', 'King', 'xx-xx-xx-xx-xx', 'penelope.king@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('hunter.gordon@x.dummyjson.com', 'Hunter', 'Gordon', 'xx-xx-xx-xx-xx', 'hunter.gordon@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('liam.garcia@x.dummyjson.com', 'Liam', 'Garcia', 'xx-xx-xx-xx-xx', 'liam.garcia@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('aubrey.wagner@x.dummyjson.com', 'Aubrey', 'Wagner', 'xx-xx-xx-xx-xx', 'aubrey.wagner@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('sadie.morales@x.dummyjson.com', 'Sadie', 'Morales', 'xx-xx-xx-xx-xx', 'sadie.morales@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('bella.gonzalez@x.dummyjson.com', 'Bella', 'Gonzalez', 'xx-xx-xx-xx-xx', 'bella.gonzalez@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('mason.pearson@x.dummyjson.com', 'Mason', 'Pearson', 'xx-xx-xx-xx-xx', 'mason.pearson@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('emma.wilson@x.dummyjson.com', 'Emma', 'Wilson', 'xx-xx-xx-xx-xx', 'emma.wilson@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('alexander.jones@x.dummyjson.com', 'Alexander', 'Jones', 'xx-xx-xx-xx-xx', 'alexander.jones@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('gabriel.adams@x.dummyjson.com', 'Gabriel', 'Adams', 'xx-xx-xx-xx-xx', 'gabriel.adams@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('avery.scott@x.dummyjson.com', 'Avery', 'Scott', 'xx-xx-xx-xx-xx', 'avery.scott@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('lily.torres@x.dummyjson.com', 'Lily', 'Torres', 'xx-xx-xx-xx-xx', 'lily.torres@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('michael.johnson@x.dummyjson.com', 'Michael', 'Johnson', 'xx-xx-xx-xx-xx', 'michael.johnson@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('daniel.cook@x.dummyjson.com', 'Daniel', 'Cook', 'xx-xx-xx-xx-xx', 'daniel.cook@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('eli.ward@x.dummyjson.com', 'Eli', 'Ward', 'xx-xx-xx-xx-xx', 'eli.ward@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('hazel.evans@x.dummyjson.com', 'Hazel', 'Evans', 'xx-xx-xx-xx-xx', 'hazel.evans@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('nova.cooper@x.dummyjson.com', 'Nova', 'Cooper', 'xx-xx-xx-xx-xx', 'nova.cooper@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('elijah.hill@x.dummyjson.com', 'Elijah', 'Hill', 'xx-xx-xx-xx-xx', 'elijah.hill@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('mason.wright@x.dummyjson.com', 'Mason', 'Wright', 'xx-xx-xx-xx-xx', 'mason.wright@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('nathan.reed@x.dummyjson.com', 'Nathan', 'Reed', 'xx-xx-xx-xx-xx', 'nathan.reed@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('olivia.anderson@x.dummyjson.com', 'Olivia', 'Anderson', 'xx-xx-xx-xx-xx', 'olivia.anderson@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('addison.ward@x.dummyjson.com', 'Addison', 'Ward', 'xx-xx-xx-xx-xx', 'addison.ward@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('lincoln.kelly@x.dummyjson.com', 'Lincoln', 'Kelly', 'xx-xx-xx-xx-xx', 'lincoln.kelly@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('avery.carter@x.dummyjson.com', 'Avery', 'Carter', 'xx-xx-xx-xx-xx', 'avery.carter@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('evan.reed@x.dummyjson.com', 'Evan', 'Reed', 'xx-xx-xx-xx-xx', 'evan.reed@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('emily.johnson@x.dummyjson.com', 'Emily', 'Johnson', 'xx-xx-xx-xx-xx', 'emily.johnson@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('ava.taylor@x.dummyjson.com', 'Ava', 'Taylor', 'xx-xx-xx-xx-xx', 'ava.taylor@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('gavin.stanley@x.dummyjson.com', 'Gavin', 'Stanley', 'xx-xx-xx-xx-xx', 'gavin.stanley@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('alexander.hernandez@x.dummyjson.com', 'Alexander', 'Hernandez', 'xx-xx-xx-xx-xx', 'alexander.hernandez@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('lucas.allen@x.dummyjson.com', 'Lucas', 'Allen', 'xx-xx-xx-xx-xx', 'lucas.allen@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('elena.long@x.dummyjson.com', 'Elena', 'Long', 'xx-xx-xx-xx-xx', 'elena.long@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('mateo.bennett@x.dummyjson.com', 'Mateo', 'Bennett', 'xx-xx-xx-xx-xx', 'mateo.bennett@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('logan.lee@x.dummyjson.com', 'Logan', 'Lee', 'xx-xx-xx-xx-xx', 'logan.lee@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('mateo.perez@x.dummyjson.com', 'Mateo', 'Perez', 'xx-xx-xx-xx-xx', 'mateo.perez@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('william.gonzalez@x.dummyjson.com', 'William', 'Gonzalez', 'xx-xx-xx-xx-xx', 'william.gonzalez@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('luna.russell@x.dummyjson.com', 'Luna', 'Russell', 'xx-xx-xx-xx-xx', 'luna.russell@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('addison.wright@x.dummyjson.com', 'Addison', 'Wright', 'xx-xx-xx-xx-xx', 'addison.wright@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('henry.turner@x.dummyjson.com', 'Henry', 'Turner', 'xx-xx-xx-xx-xx', 'henry.turner@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('zoe.nicholson@x.dummyjson.com', 'Zoe', 'Nicholson', 'xx-xx-xx-xx-xx', 'zoe.nicholson@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('david.martinez@x.dummyjson.com', 'David', 'Martinez', 'xx-xx-xx-xx-xx', 'david.martinez@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('mateo.nguyen@x.dummyjson.com', 'Mateo', 'Nguyen', 'xx-xx-xx-xx-xx', 'mateo.nguyen@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('mia.rodriguez@x.dummyjson.com', 'Mia', 'Rodriguez', 'xx-xx-xx-xx-xx', 'mia.rodriguez@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('elena.baker@x.dummyjson.com', 'Elena', 'Baker', 'xx-xx-xx-xx-xx', 'elena.baker@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('gabriel.mitchell@x.dummyjson.com', 'Gabriel', 'Mitchell', 'xx-xx-xx-xx-xx', 'gabriel.mitchell@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('liam.smith@x.dummyjson.com', 'Liam', 'Smith', 'xx-xx-xx-xx-xx', 'liam.smith@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('carter.rivera@x.dummyjson.com', 'Carter', 'Rivera', 'xx-xx-xx-xx-xx', 'carter.rivera@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('ethan.martinez@x.dummyjson.com', 'Ethan', 'Martinez', 'xx-xx-xx-xx-xx', 'ethan.martinez@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('benjamin.foster@x.dummyjson.com', 'Benjamin', 'Foster', 'xx-xx-xx-xx-xx', 'benjamin.foster@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('maya.reed@x.dummyjson.com', 'Maya', 'Reed', 'xx-xx-xx-xx-xx', 'maya.reed@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('ruby.andrews@x.dummyjson.com', 'Ruby', 'Andrews', 'xx-xx-xx-xx-xx', 'ruby.andrews@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('harper.garcia@x.dummyjson.com', 'Harper', 'Garcia', 'xx-xx-xx-xx-xx', 'harper.garcia@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('james.garcia@x.dummyjson.com', 'James', 'Garcia', 'xx-xx-xx-xx-xx', 'james.garcia@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('natalie.harris@x.dummyjson.com', 'Natalie', 'Harris', 'xx-xx-xx-xx-xx', 'natalie.harris@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('leah.henderson@x.dummyjson.com', 'Leah', 'Henderson', 'xx-xx-xx-xx-xx', 'leah.henderson@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('caleb.perkins@x.dummyjson.com', 'Caleb', 'Perkins', 'xx-xx-xx-xx-xx', 'caleb.perkins@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('samantha.howard@x.dummyjson.com', 'Samantha', 'Howard', 'xx-xx-xx-xx-xx', 'samantha.howard@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('clara.berry@x.dummyjson.com', 'Clara', 'Berry', 'xx-xx-xx-xx-xx', 'clara.berry@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('jacob.cooper@x.dummyjson.com', 'Jacob', 'Cooper', 'xx-xx-xx-xx-xx', 'jacob.cooper@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('isabella.anderson@x.dummyjson.com', 'Isabella', 'Anderson', 'xx-xx-xx-xx-xx', 'isabella.anderson@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('aaliyah.hanson@x.dummyjson.com', 'Aaliyah', 'Hanson', 'xx-xx-xx-xx-xx', 'aaliyah.hanson@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('madison.collins@x.dummyjson.com', 'Madison', 'Collins', 'xx-xx-xx-xx-xx', 'madison.collins@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('abigail.rivera@x.dummyjson.com', 'Abigail', 'Rivera', 'xx-xx-xx-xx-xx', 'abigail.rivera@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('stella.hughes@x.dummyjson.com', 'Stella', 'Hughes', 'xx-xx-xx-xx-xx', 'stella.hughes@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('lila.hudson@x.dummyjson.com', 'Lila', 'Hudson', 'xx-xx-xx-xx-xx', 'lila.hudson@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('aaron.cook@x.dummyjson.com', 'Aaron', 'Cook', 'xx-xx-xx-xx-xx', 'aaron.cook@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('eleanor.tyler@x.dummyjson.com', 'Eleanor', 'Tyler', 'xx-xx-xx-xx-xx', 'eleanor.tyler@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('grace.perry@x.dummyjson.com', 'Grace', 'Perry', 'xx-xx-xx-xx-xx', 'grace.perry@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('henry.hill@x.dummyjson.com', 'Henry', 'Hill', 'xx-xx-xx-xx-xx', 'henry.hill@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('aria.flores@x.dummyjson.com', 'Aria', 'Flores', 'xx-xx-xx-xx-xx', 'aria.flores@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('sofia.mitchell@x.dummyjson.com', 'Sofia', 'Mitchell', 'xx-xx-xx-xx-xx', 'sofia.mitchell@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('xavier.wright@x.dummyjson.com', 'Xavier', 'Wright', 'xx-xx-xx-xx-xx', 'xavier.wright@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('nicholas.edwards@x.dummyjson.com', 'Nicholas', 'Edwards', 'xx-xx-xx-xx-xx', 'nicholas.edwards@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('oscar.powers@x.dummyjson.com', 'Oscar', 'Powers', 'xx-xx-xx-xx-xx', 'oscar.powers@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('nolan.bryant@x.dummyjson.com', 'Nolan', 'Bryant', 'xx-xx-xx-xx-xx', 'nolan.bryant@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('asher.scott@x.dummyjson.com', 'Asher', 'Scott', 'xx-xx-xx-xx-xx', 'asher.scott@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('nicholas.bailey@x.dummyjson.com', 'Nicholas', 'Bailey', 'xx-xx-xx-xx-xx', 'nicholas.bailey@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('tyler.davis@x.dummyjson.com', 'Tyler', 'Davis', 'xx-xx-xx-xx-xx', 'tyler.davis@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('levi.hicks@x.dummyjson.com', 'Levi', 'Hicks', 'xx-xx-xx-xx-xx', 'levi.hicks@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('ava.harrison@x.dummyjson.com', 'Ava', 'Harrison', 'xx-xx-xx-xx-xx', 'ava.harrison@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('nora.russell@x.dummyjson.com', 'Nora', 'Russell', 'xx-xx-xx-xx-xx', 'nora.russell@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('chloe.roberts@x.dummyjson.com', 'Chloe', 'Roberts', 'xx-xx-xx-xx-xx', 'chloe.roberts@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('lily.lee@x.dummyjson.com', 'Lily', 'Lee', 'xx-xx-xx-xx-xx', 'lily.lee@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('julian.james@x.dummyjson.com', 'Julian', 'James', 'xx-xx-xx-xx-xx', 'julian.james@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('hannah.robinson@x.dummyjson.com', 'Hannah', 'Robinson', 'xx-xx-xx-xx-xx', 'hannah.robinson@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('scarlett.wright@x.dummyjson.com', 'Scarlett', 'Wright', 'xx-xx-xx-xx-xx', 'scarlett.wright@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('john.doe@x.dummyjson.com', 'John', 'Doe', 'xx-xx-xx-xx-xx', 'john.doe@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('nolan.gonzalez@x.dummyjson.com', 'Nolan', 'Gonzalez', 'xx-xx-xx-xx-xx', 'nolan.gonzalez@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('sophia.jones@x.dummyjson.com', 'Sophia', 'Jones', 'xx-xx-xx-xx-xx', 'sophia.jones@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('charlotte.davis@x.dummyjson.com', 'Charlotte', 'Davis', 'xx-xx-xx-xx-xx', 'charlotte.davis@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('jace.smith@x.dummyjson.com', 'Jace', 'Smith', 'xx-xx-xx-xx-xx', 'jace.smith@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('leah.gutierrez@x.dummyjson.com', 'Leah', 'Gutierrez', 'xx-xx-xx-xx-xx', 'leah.gutierrez@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('stella.morris@x.dummyjson.com', 'Stella', 'Morris', 'xx-xx-xx-xx-xx', 'stella.morris@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('charlotte.lopez@x.dummyjson.com', 'Charlotte', 'Lopez', 'xx-xx-xx-xx-xx', 'charlotte.lopez@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('logan.lawson@x.dummyjson.com', 'Logan', 'Lawson', 'xx-xx-xx-xx-xx', 'logan.lawson@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('nora.mills@x.dummyjson.com', 'Nora', 'Mills', 'xx-xx-xx-xx-xx', 'nora.mills@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('jack.ward@x.dummyjson.com', 'Jack', 'Ward', 'xx-xx-xx-xx-xx', 'jack.ward@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('leah.hughes@x.dummyjson.com', 'Leah', 'Hughes', 'xx-xx-xx-xx-xx', 'leah.hughes@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('ava.harris@x.dummyjson.com', 'Ava', 'Harris', 'xx-xx-xx-xx-xx', 'ava.harris@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('jonathan.pierce@x.dummyjson.com', 'Jonathan', 'Pierce', 'xx-xx-xx-xx-xx', 'jonathan.pierce@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('paisley.bell@x.dummyjson.com', 'Paisley', 'Bell', 'xx-xx-xx-xx-xx', 'paisley.bell@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('brayden.hill@x.dummyjson.com', 'Brayden', 'Hill', 'xx-xx-xx-xx-xx', 'brayden.hill@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('avery.perez@x.dummyjson.com', 'Avery', 'Perez', 'xx-xx-xx-xx-xx', 'avery.perez@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('amelia.perez@x.dummyjson.com', 'Amelia', 'Perez', 'xx-xx-xx-xx-xx', 'amelia.perez@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('cameron.perez@x.dummyjson.com', 'Cameron', 'Perez', 'xx-xx-xx-xx-xx', 'cameron.perez@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('grace.green@x.dummyjson.com', 'Grace', 'Green', 'xx-xx-xx-xx-xx', 'grace.green@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('madeline.simpson@x.dummyjson.com', 'Madeline', 'Simpson', 'xx-xx-xx-xx-xx', 'madeline.simpson@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('aria.roberts@x.dummyjson.com', 'Aria', 'Roberts', 'xx-xx-xx-xx-xx', 'aria.roberts@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('owen.fisher@x.dummyjson.com', 'Owen', 'Fisher', 'xx-xx-xx-xx-xx', 'owen.fisher@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('evelyn.gonzalez@x.dummyjson.com', 'Evelyn', 'Gonzalez', 'xx-xx-xx-xx-xx', 'evelyn.gonzalez@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('avery.barnes@x.dummyjson.com', 'Avery', 'Barnes', 'xx-xx-xx-xx-xx', 'avery.barnes@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('max.russell@x.dummyjson.com', 'Max', 'Russell', 'xx-xx-xx-xx-xx', 'max.russell@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('brayden.fleming@x.dummyjson.com', 'Brayden', 'Fleming', 'xx-xx-xx-xx-xx', 'brayden.fleming@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('emily.brown@x.dummyjson.com', 'Emily', 'Brown', 'xx-xx-xx-xx-xx', 'emily.brown@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('caleb.nelson@x.dummyjson.com', 'Caleb', 'Nelson', 'xx-xx-xx-xx-xx', 'caleb.nelson@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('mila.hernandez@x.dummyjson.com', 'Mila', 'Hernandez', 'xx-xx-xx-xx-xx', 'mila.hernandez@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('lucas.gray@x.dummyjson.com', 'Lucas', 'Gray', 'xx-xx-xx-xx-xx', 'lucas.gray@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('emma.miller@x.dummyjson.com', 'Emma', 'Miller', 'xx-xx-xx-xx-xx', 'emma.miller@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('aurora.barnes@x.dummyjson.com', 'Aurora', 'Barnes', 'xx-xx-xx-xx-xx', 'aurora.barnes@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('lillian.simmons@x.dummyjson.com', 'Lillian', 'Simmons', 'xx-xx-xx-xx-xx', 'lillian.simmons@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('henry.adams@x.dummyjson.com', 'Henry', 'Adams', 'xx-xx-xx-xx-xx', 'henry.adams@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('evelyn.sanchez@x.dummyjson.com', 'Evelyn', 'Sanchez', 'xx-xx-xx-xx-xx', 'evelyn.sanchez@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('ethan.fletcher@x.dummyjson.com', 'Ethan', 'Fletcher', 'xx-xx-xx-xx-xx', 'ethan.fletcher@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('ethan.thompson@x.dummyjson.com', 'Ethan', 'Thompson', 'xx-xx-xx-xx-xx', 'ethan.thompson@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('autumn.gomez@x.dummyjson.com', 'Autumn', 'Gomez', 'xx-xx-xx-xx-xx', 'autumn.gomez@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('logan.torres@x.dummyjson.com', 'Logan', 'Torres', 'xx-xx-xx-xx-xx', 'logan.torres@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('hazel.gardner@x.dummyjson.com', 'Hazel', 'Gardner', 'xx-xx-xx-xx-xx', 'hazel.gardner@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);
INSERT INTO user_data (email, first_name, last_name, phone, email_secondary, country, state, zip, company, address, region, city, purchases) VALUES ('sophia.brown@x.dummyjson.com', 'Sophia', 'Brown', 'xx-xx-xx-xx-xx', 'sophia.brown@x.dummyjson.com', 'united states', 'active', 'xxxxx', '', 'united states......', 'noreste', 'washington', 0);

-- Inserts for comments
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('john.doe@x.dummyjson.com', 'John Doe', 1, 2, 'Very unhappy with my purchase!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('nolan.gonzalez@x.dummyjson.com', 'Nolan Gonzalez', 1, 2, 'Not as described!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('scarlett.wright@x.dummyjson.com', 'Scarlett Wright', 1, 5, 'Very satisfied!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('liam.garcia@x.dummyjson.com', 'Liam Garcia', 2, 4, 'Very satisfied!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('nora.russell@x.dummyjson.com', 'Nora Russell', 2, 1, 'Very disappointed!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('elena.baker@x.dummyjson.com', 'Elena Baker', 2, 5, 'Highly impressed!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('ethan.thompson@x.dummyjson.com', 'Ethan Thompson', 3, 5, 'Very happy with my purchase!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('levi.hicks@x.dummyjson.com', 'Levi Hicks', 3, 4, 'Great value for money!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('hazel.gardner@x.dummyjson.com', 'Hazel Gardner', 3, 5, 'Highly impressed!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('leo.rivera@x.dummyjson.com', 'Leo Rivera', 4, 5, 'Great product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('oscar.powers@x.dummyjson.com', 'Oscar Powers', 4, 4, 'Very pleased!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('carter.rivera@x.dummyjson.com', 'Carter Rivera', 4, 5, 'Very pleased!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('leo.rivera@x.dummyjson.com', 'Leo Rivera', 5, 5, 'Very pleased!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('evan.reed@x.dummyjson.com', 'Evan Reed', 5, 5, 'Great product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('evelyn.sanchez@x.dummyjson.com', 'Evelyn Sanchez', 5, 4, 'Highly recommended!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('sophia.brown@x.dummyjson.com', 'Sophia Brown', 6, 5, 'Great value for money!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('madison.collins@x.dummyjson.com', 'Madison Collins', 6, 3, 'Very disappointed!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('maya.reed@x.dummyjson.com', 'Maya Reed', 6, 1, 'Poor quality!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('lincoln.kelly@x.dummyjson.com', 'Lincoln Kelly', 7, 1, 'Disappointing product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('lincoln.kelly@x.dummyjson.com', 'Lincoln Kelly', 7, 4, 'Great product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('lucas.allen@x.dummyjson.com', 'Lucas Allen', 7, 4, 'Excellent quality!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('zoe.nicholson@x.dummyjson.com', 'Zoe Nicholson', 8, 5, 'Fast shipping!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('addison.wright@x.dummyjson.com', 'Addison Wright', 8, 4, 'Excellent quality!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('clara.berry@x.dummyjson.com', 'Clara Berry', 8, 4, 'Would buy again!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('xavier.wright@x.dummyjson.com', 'Xavier Wright', 9, 4, 'Very satisfied!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('mila.hernandez@x.dummyjson.com', 'Mila Hernandez', 9, 1, 'Poor quality!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('sophia.brown@x.dummyjson.com', 'Sophia Brown', 9, 5, 'Very happy with my purchase!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('aria.parker@x.dummyjson.com', 'Aria Parker', 10, 5, 'Great value for money!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('natalie.harris@x.dummyjson.com', 'Natalie Harris', 10, 4, 'Excellent quality!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('ava.harris@x.dummyjson.com', 'Ava Harris', 10, 4, 'Fast shipping!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('julian.newton@x.dummyjson.com', 'Julian Newton', 11, 4, 'Great value for money!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('madison.collins@x.dummyjson.com', 'Madison Collins', 11, 5, 'Would buy again!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('clara.berry@x.dummyjson.com', 'Clara Berry', 11, 4, 'Would buy again!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('tyler.davis@x.dummyjson.com', 'Tyler Davis', 12, 5, 'Very satisfied!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('hannah.robinson@x.dummyjson.com', 'Hannah Robinson', 12, 5, 'Excellent quality!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('madison.collins@x.dummyjson.com', 'Madison Collins', 12, 3, 'Waste of money!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('john.doe@x.dummyjson.com', 'John Doe', 13, 5, 'Very happy with my purchase!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('avery.carter@x.dummyjson.com', 'Avery Carter', 13, 4, 'Highly recommended!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('evelyn.sanchez@x.dummyjson.com', 'Evelyn Sanchez', 13, 4, 'Very pleased!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('leah.gutierrez@x.dummyjson.com', 'Leah Gutierrez', 14, 4, 'Very happy with my purchase!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('nolan.gonzalez@x.dummyjson.com', 'Nolan Gonzalez', 14, 4, 'Would buy again!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('stella.morris@x.dummyjson.com', 'Stella Morris', 14, 2, 'Waste of money!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('charlotte.lopez@x.dummyjson.com', 'Charlotte Lopez', 15, 5, 'Highly recommended!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('william.gonzalez@x.dummyjson.com', 'William Gonzalez', 15, 1, 'Would not recommend!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('ava.harrison@x.dummyjson.com', 'Ava Harrison', 15, 2, 'Not worth the price!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('logan.lee@x.dummyjson.com', 'Logan Lee', 16, 4, 'Great product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('elena.long@x.dummyjson.com', 'Elena Long', 16, 4, 'Great product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('grayson.coleman@x.dummyjson.com', 'Grayson Coleman', 16, 1, 'Not as described!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('ethan.martinez@x.dummyjson.com', 'Ethan Martinez', 17, 4, 'Very pleased!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('owen.fisher@x.dummyjson.com', 'Owen Fisher', 17, 3, 'Disappointing product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('scarlett.wright@x.dummyjson.com', 'Scarlett Wright', 17, 4, 'Very happy with my purchase!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('mateo.bennett@x.dummyjson.com', 'Mateo Bennett', 18, 5, 'Very pleased!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('aurora.barnes@x.dummyjson.com', 'Aurora Barnes', 18, 5, 'Very pleased!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('ellie.stewart@x.dummyjson.com', 'Ellie Stewart', 18, 5, 'Great value for money!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('sophia.jones@x.dummyjson.com', 'Sophia Jones', 19, 5, 'Very satisfied!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('maya.reed@x.dummyjson.com', 'Maya Reed', 19, 5, 'Great value for money!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('harper.turner@x.dummyjson.com', 'Harper Turner', 19, 4, 'Highly recommended!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('mason.parker@x.dummyjson.com', 'Mason Parker', 20, 5, 'Would buy again!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('jonathan.pierce@x.dummyjson.com', 'Jonathan Pierce', 20, 3, 'Poor quality!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('alexander.hernandez@x.dummyjson.com', 'Alexander Hernandez', 20, 5, 'Would buy again!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('elijah.hill@x.dummyjson.com', 'Elijah Hill', 21, 4, 'Very satisfied!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('liam.garcia@x.dummyjson.com', 'Liam Garcia', 21, 5, 'Fast shipping!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('ella.cook@x.dummyjson.com', 'Ella Cook', 21, 4, 'Excellent quality!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('leo.rivera@x.dummyjson.com', 'Leo Rivera', 22, 5, 'Highly impressed!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('alexander.jones@x.dummyjson.com', 'Alexander Jones', 22, 4, 'Highly recommended!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('addison.wright@x.dummyjson.com', 'Addison Wright', 22, 4, 'Would buy again!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('mateo.perez@x.dummyjson.com', 'Mateo Perez', 23, 2, 'Very unhappy with my purchase!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('cameron.perez@x.dummyjson.com', 'Cameron Perez', 23, 4, 'Very happy with my purchase!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('aurora.barnes@x.dummyjson.com', 'Aurora Barnes', 23, 5, 'Very happy with my purchase!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('michael.johnson@x.dummyjson.com', 'Michael Johnson', 24, 5, 'Great value for money!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('julian.newton@x.dummyjson.com', 'Julian Newton', 24, 4, 'Would buy again!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('lila.hudson@x.dummyjson.com', 'Lila Hudson', 24, 5, 'Excellent quality!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('maya.reed@x.dummyjson.com', 'Maya Reed', 25, 4, 'Excellent quality!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('madison.collins@x.dummyjson.com', 'Madison Collins', 25, 4, 'Would buy again!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('ethan.thompson@x.dummyjson.com', 'Ethan Thompson', 25, 5, 'Would buy again!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('mateo.bennett@x.dummyjson.com', 'Mateo Bennett', 26, 2, 'Disappointing product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('natalie.price@x.dummyjson.com', 'Natalie Price', 26, 5, 'Very pleased!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('avery.barnes@x.dummyjson.com', 'Avery Barnes', 26, 4, 'Very satisfied!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('nicholas.bailey@x.dummyjson.com', 'Nicholas Bailey', 27, 4, 'Fast shipping!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('gabriel.hayes@x.dummyjson.com', 'Gabriel Hayes', 27, 5, 'Awesome product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('james.garcia@x.dummyjson.com', 'James Garcia', 27, 5, 'Highly impressed!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('elena.baker@x.dummyjson.com', 'Elena Baker', 28, 5, 'Great product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('madeline.simpson@x.dummyjson.com', 'Madeline Simpson', 28, 5, 'Highly impressed!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('caleb.nelson@x.dummyjson.com', 'Caleb Nelson', 28, 5, 'Very happy with my purchase!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('leo.rivera@x.dummyjson.com', 'Leo Rivera', 29, 4, 'Very satisfied!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('ethan.martinez@x.dummyjson.com', 'Ethan Martinez', 29, 2, 'Not worth the price!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('max.parker@x.dummyjson.com', 'Max Parker', 29, 4, 'Excellent quality!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('nora.russell@x.dummyjson.com', 'Nora Russell', 30, 5, 'Very pleased!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('dylan.wells@x.dummyjson.com', 'Dylan Wells', 30, 5, 'Very pleased!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('noah.hernandez@x.dummyjson.com', 'Noah Hernandez', 30, 5, 'Great product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('lucas.gray@x.dummyjson.com', 'Lucas Gray', 31, 4, 'Highly recommended!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('henry.hill@x.dummyjson.com', 'Henry Hill', 31, 5, 'Great product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('elena.long@x.dummyjson.com', 'Elena Long', 31, 4, 'Awesome product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('daniel.cook@x.dummyjson.com', 'Daniel Cook', 32, 5, 'Very pleased!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('nora.mills@x.dummyjson.com', 'Nora Mills', 32, 5, 'Awesome product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('jacob.cooper@x.dummyjson.com', 'Jacob Cooper', 32, 4, 'Great value for money!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('leah.henderson@x.dummyjson.com', 'Leah Henderson', 33, 5, 'Very satisfied!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('leah.hughes@x.dummyjson.com', 'Leah Hughes', 33, 1, 'Not as described!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('carter.baker@x.dummyjson.com', 'Carter Baker', 33, 5, 'Great product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('nolan.gonzalez@x.dummyjson.com', 'Nolan Gonzalez', 34, 4, 'Great product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('carter.baker@x.dummyjson.com', 'Carter Baker', 34, 4, 'Very pleased!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('emily.johnson@x.dummyjson.com', 'Emily Johnson', 34, 4, 'Highly impressed!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('sophia.brown@x.dummyjson.com', 'Sophia Brown', 35, 5, 'Very pleased!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('gabriel.mitchell@x.dummyjson.com', 'Gabriel Mitchell', 35, 1, 'Would not recommend!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('elijah.stewart@x.dummyjson.com', 'Elijah Stewart', 35, 5, 'Awesome product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('logan.lawson@x.dummyjson.com', 'Logan Lawson', 36, 1, 'Very dissatisfied!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('julian.james@x.dummyjson.com', 'Julian James', 36, 3, 'Poor quality!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('hazel.evans@x.dummyjson.com', 'Hazel Evans', 36, 1, 'Very unhappy with my purchase!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('james.davis@x.dummyjson.com', 'James Davis', 37, 5, 'Very happy with my purchase!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('chloe.morales@x.dummyjson.com', 'Chloe Morales', 37, 2, 'Would not recommend!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('aaron.cook@x.dummyjson.com', 'Aaron Cook', 37, 3, 'Very dissatisfied!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('hazel.gardner@x.dummyjson.com', 'Hazel Gardner', 38, 5, 'Highly impressed!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('gabriel.adams@x.dummyjson.com', 'Gabriel Adams', 38, 4, 'Great value for money!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('jack.ward@x.dummyjson.com', 'Jack Ward', 38, 4, 'Awesome product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('ella.cook@x.dummyjson.com', 'Ella Cook', 39, 3, 'Very dissatisfied!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('liam.garcia@x.dummyjson.com', 'Liam Garcia', 39, 4, 'Highly impressed!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('autumn.gomez@x.dummyjson.com', 'Autumn Gomez', 39, 4, 'Awesome product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('charlotte.lopez@x.dummyjson.com', 'Charlotte Lopez', 40, 5, 'Highly recommended!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('grace.green@x.dummyjson.com', 'Grace Green', 40, 5, 'Great product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('logan.torres@x.dummyjson.com', 'Logan Torres', 40, 1, 'Disappointing product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('stella.morris@x.dummyjson.com', 'Stella Morris', 41, 4, 'Great product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('harper.turner@x.dummyjson.com', 'Harper Turner', 41, 5, 'Very pleased!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('luna.russell@x.dummyjson.com', 'Luna Russell', 41, 5, 'Great product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('lillian.simmons@x.dummyjson.com', 'Lillian Simmons', 42, 4, 'Highly recommended!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('emily.brown@x.dummyjson.com', 'Emily Brown', 42, 4, 'Great product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('cameron.perez@x.dummyjson.com', 'Cameron Perez', 42, 5, 'Great value for money!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('aria.roberts@x.dummyjson.com', 'Aria Roberts', 43, 5, 'Highly recommended!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('caleb.perkins@x.dummyjson.com', 'Caleb Perkins', 43, 5, 'Highly impressed!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('aria.roberts@x.dummyjson.com', 'Aria Roberts', 43, 5, 'Great product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('logan.torres@x.dummyjson.com', 'Logan Torres', 44, 1, 'Disappointing product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('william.gonzalez@x.dummyjson.com', 'William Gonzalez', 44, 4, 'Very pleased!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('amelia.perez@x.dummyjson.com', 'Amelia Perez', 44, 3, 'Disappointing product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('olivia.anderson@x.dummyjson.com', 'Olivia Anderson', 45, 5, 'Great value for money!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('grace.perry@x.dummyjson.com', 'Grace Perry', 45, 2, 'Very unhappy with my purchase!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('emma.wilson@x.dummyjson.com', 'Emma Wilson', 45, 5, 'Highly recommended!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('harper.turner@x.dummyjson.com', 'Harper Turner', 46, 4, 'Fast shipping!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('leah.gutierrez@x.dummyjson.com', 'Leah Gutierrez', 46, 5, 'Awesome product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('sadie.morales@x.dummyjson.com', 'Sadie Morales', 46, 4, 'Highly recommended!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('mateo.nguyen@x.dummyjson.com', 'Mateo Nguyen', 47, 3, 'Not worth the price!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('james.garcia@x.dummyjson.com', 'James Garcia', 47, 5, 'Very satisfied!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('henry.turner@x.dummyjson.com', 'Henry Turner', 47, 1, 'Waste of money!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('olivia.anderson@x.dummyjson.com', 'Olivia Anderson', 48, 4, 'Very happy with my purchase!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('grayson.coleman@x.dummyjson.com', 'Grayson Coleman', 48, 5, 'Fast shipping!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('mia.miller@x.dummyjson.com', 'Mia Miller', 48, 4, 'Great product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('bella.grant@x.dummyjson.com', 'Bella Grant', 49, 4, 'Great value for money!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('layla.young@x.dummyjson.com', 'Layla Young', 49, 2, 'Waste of money!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('wyatt.perry@x.dummyjson.com', 'Wyatt Perry', 49, 2, 'Would not recommend!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('claire.foster@x.dummyjson.com', 'Claire Foster', 50, 1, 'Disappointing product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('sophia.jones@x.dummyjson.com', 'Sophia Jones', 50, 3, 'Would not buy again!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('avery.scott@x.dummyjson.com', 'Avery Scott', 50, 4, 'Great value for money!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('sadie.morales@x.dummyjson.com', 'Sadie Morales', 51, 5, 'Highly recommended!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('elijah.hill@x.dummyjson.com', 'Elijah Hill', 51, 1, 'Very disappointed!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('owen.sullivan@x.dummyjson.com', 'Owen Sullivan', 51, 5, 'Very satisfied!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('grace.green@x.dummyjson.com', 'Grace Green', 52, 4, 'Highly impressed!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('avery.barnes@x.dummyjson.com', 'Avery Barnes', 52, 4, 'Highly impressed!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('aubrey.wagner@x.dummyjson.com', 'Aubrey Wagner', 52, 4, 'Highly recommended!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('emma.miller@x.dummyjson.com', 'Emma Miller', 53, 1, 'Very disappointed!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('nora.mills@x.dummyjson.com', 'Nora Mills', 53, 5, 'Fast shipping!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('evelyn.gonzalez@x.dummyjson.com', 'Evelyn Gonzalez', 53, 4, 'Would buy again!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('bella.gonzalez@x.dummyjson.com', 'Bella Gonzalez', 54, 5, 'Very satisfied!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('alexander.hernandez@x.dummyjson.com', 'Alexander Hernandez', 54, 4, 'Very happy with my purchase!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('ella.cook@x.dummyjson.com', 'Ella Cook', 54, 1, 'Not as described!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('ava.taylor@x.dummyjson.com', 'Ava Taylor', 55, 5, 'Excellent quality!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('nicholas.edwards@x.dummyjson.com', 'Nicholas Edwards', 55, 1, 'Very unhappy with my purchase!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('david.martinez@x.dummyjson.com', 'David Martinez', 55, 5, 'Great product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('samantha.howard@x.dummyjson.com', 'Samantha Howard', 56, 4, 'Great product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('brayden.hill@x.dummyjson.com', 'Brayden Hill', 56, 4, 'Awesome product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('addison.wright@x.dummyjson.com', 'Addison Wright', 56, 2, 'Very dissatisfied!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('jack.ward@x.dummyjson.com', 'Jack Ward', 57, 4, 'Would buy again!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('john.doe@x.dummyjson.com', 'John Doe', 57, 5, 'Fast shipping!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('liam.smith@x.dummyjson.com', 'Liam Smith', 57, 5, 'Excellent quality!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('mia.miller@x.dummyjson.com', 'Mia Miller', 58, 5, 'Fast shipping!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('aurora.rodriguez@x.dummyjson.com', 'Aurora Rodriguez', 58, 4, 'Excellent quality!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('jacob.cooper@x.dummyjson.com', 'Jacob Cooper', 58, 1, 'Very unhappy with my purchase!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('henry.adams@x.dummyjson.com', 'Henry Adams', 59, 1, 'Waste of money!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('hazel.gardner@x.dummyjson.com', 'Hazel Gardner', 59, 4, 'Excellent quality!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('xavier.wright@x.dummyjson.com', 'Xavier Wright', 59, 2, 'Very dissatisfied!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('jackson.morales@x.dummyjson.com', 'Jackson Morales', 60, 4, 'Highly impressed!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('liam.garcia@x.dummyjson.com', 'Liam Garcia', 60, 4, 'Awesome product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('oscar.powers@x.dummyjson.com', 'Oscar Powers', 60, 5, 'Great value for money!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('chloe.morales@x.dummyjson.com', 'Chloe Morales', 61, 4, 'Highly recommended!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('eleanor.tyler@x.dummyjson.com', 'Eleanor Tyler', 61, 5, 'Very pleased!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('stella.morris@x.dummyjson.com', 'Stella Morris', 61, 5, 'Highly impressed!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('mia.miller@x.dummyjson.com', 'Mia Miller', 62, 5, 'Excellent quality!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('emma.miller@x.dummyjson.com', 'Emma Miller', 62, 4, 'Very happy with my purchase!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('isabella.anderson@x.dummyjson.com', 'Isabella Anderson', 62, 4, 'Highly impressed!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('charlotte.davis@x.dummyjson.com', 'Charlotte Davis', 63, 4, 'Awesome product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('leah.hughes@x.dummyjson.com', 'Leah Hughes', 63, 5, 'Great product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('daniel.taylor@x.dummyjson.com', 'Daniel Taylor', 63, 4, 'Great value for money!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('benjamin.foster@x.dummyjson.com', 'Benjamin Foster', 64, 5, 'Great product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('daniel.taylor@x.dummyjson.com', 'Daniel Taylor', 64, 4, 'Awesome product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('hannah.robinson@x.dummyjson.com', 'Hannah Robinson', 64, 5, 'Excellent quality!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('abigail.rivera@x.dummyjson.com', 'Abigail Rivera', 65, 5, 'Great product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('mason.wright@x.dummyjson.com', 'Mason Wright', 65, 4, 'Excellent quality!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('hunter.gordon@x.dummyjson.com', 'Hunter Gordon', 65, 4, 'Very happy with my purchase!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('ava.harrison@x.dummyjson.com', 'Ava Harrison', 66, 5, 'Would buy again!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('liam.gonzalez@x.dummyjson.com', 'Liam Gonzalez', 66, 4, 'Highly impressed!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('avery.carter@x.dummyjson.com', 'Avery Carter', 66, 5, 'Awesome product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('mia.miller@x.dummyjson.com', 'Mia Miller', 67, 3, 'Not as described!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('cameron.perez@x.dummyjson.com', 'Cameron Perez', 67, 1, 'Would not recommend!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('lily.torres@x.dummyjson.com', 'Lily Torres', 67, 1, 'Not worth the price!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('chloe.morales@x.dummyjson.com', 'Chloe Morales', 68, 4, 'Excellent quality!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('sophia.brown@x.dummyjson.com', 'Sophia Brown', 68, 4, 'Awesome product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('max.russell@x.dummyjson.com', 'Max Russell', 68, 5, 'Very happy with my purchase!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('gavin.stanley@x.dummyjson.com', 'Gavin Stanley', 69, 3, 'Poor quality!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('mateo.bennett@x.dummyjson.com', 'Mateo Bennett', 69, 5, 'Great value for money!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('elena.long@x.dummyjson.com', 'Elena Long', 69, 1, 'Very disappointed!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('nolan.bryant@x.dummyjson.com', 'Nolan Bryant', 70, 2, 'Would not recommend!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('elijah.cruz@x.dummyjson.com', 'Elijah Cruz', 70, 5, 'Great product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('nova.cooper@x.dummyjson.com', 'Nova Cooper', 70, 4, 'Great value for money!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('addison.wright@x.dummyjson.com', 'Addison Wright', 71, 5, 'Highly impressed!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('ava.taylor@x.dummyjson.com', 'Ava Taylor', 71, 3, 'Not worth the price!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('avery.scott@x.dummyjson.com', 'Avery Scott', 71, 4, 'Excellent quality!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('julian.newton@x.dummyjson.com', 'Julian Newton', 72, 4, 'Great value for money!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('scarlett.wright@x.dummyjson.com', 'Scarlett Wright', 72, 5, 'Very happy with my purchase!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('leah.hughes@x.dummyjson.com', 'Leah Hughes', 72, 5, 'Very happy with my purchase!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('elena.baker@x.dummyjson.com', 'Elena Baker', 73, 4, 'Fast shipping!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('elijah.cruz@x.dummyjson.com', 'Elijah Cruz', 73, 5, 'Great product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('penelope.king@x.dummyjson.com', 'Penelope King', 73, 5, 'Very happy with my purchase!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('sophia.jones@x.dummyjson.com', 'Sophia Jones', 74, 5, 'Very happy with my purchase!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('wyatt.perry@x.dummyjson.com', 'Wyatt Perry', 74, 5, 'Great product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('chloe.roberts@x.dummyjson.com', 'Chloe Roberts', 74, 5, 'Great value for money!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('lily.lee@x.dummyjson.com', 'Lily Lee', 75, 4, 'Great product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('emma.wilson@x.dummyjson.com', 'Emma Wilson', 75, 3, 'Not worth the price!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('ava.taylor@x.dummyjson.com', 'Ava Taylor', 75, 4, 'Excellent quality!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('brayden.hill@x.dummyjson.com', 'Brayden Hill', 76, 4, 'Great product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('samantha.howard@x.dummyjson.com', 'Samantha Howard', 76, 1, 'Would not recommend!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('ruby.andrews@x.dummyjson.com', 'Ruby Andrews', 76, 4, 'Excellent quality!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('harper.garcia@x.dummyjson.com', 'Harper Garcia', 77, 5, 'Highly impressed!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('liam.garcia@x.dummyjson.com', 'Liam Garcia', 77, 5, 'Highly impressed!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('jacob.cooper@x.dummyjson.com', 'Jacob Cooper', 77, 5, 'Very happy with my purchase!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('hunter.gordon@x.dummyjson.com', 'Hunter Gordon', 78, 5, 'Would buy again!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('emma.wilson@x.dummyjson.com', 'Emma Wilson', 78, 5, 'Would buy again!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('david.martinez@x.dummyjson.com', 'David Martinez', 78, 5, 'Very pleased!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('jack.ward@x.dummyjson.com', 'Jack Ward', 79, 5, 'Very satisfied!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('ava.harris@x.dummyjson.com', 'Ava Harris', 79, 1, 'Very disappointed!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('brayden.fleming@x.dummyjson.com', 'Brayden Fleming', 79, 5, 'Great value for money!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('samantha.howard@x.dummyjson.com', 'Samantha Howard', 80, 4, 'Great value for money!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('daniel.cook@x.dummyjson.com', 'Daniel Cook', 80, 2, 'Would not buy again!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('brayden.fleming@x.dummyjson.com', 'Brayden Fleming', 80, 5, 'Very satisfied!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('paisley.bell@x.dummyjson.com', 'Paisley Bell', 81, 4, 'Very happy with my purchase!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('lincoln.kelly@x.dummyjson.com', 'Lincoln Kelly', 81, 4, 'Very pleased!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('luna.russell@x.dummyjson.com', 'Luna Russell', 81, 4, 'Great product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('julian.newton@x.dummyjson.com', 'Julian Newton', 82, 3, 'Very disappointed!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('grace.perry@x.dummyjson.com', 'Grace Perry', 82, 4, 'Very pleased!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('daniel.taylor@x.dummyjson.com', 'Daniel Taylor', 82, 5, 'Great product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('mason.parker@x.dummyjson.com', 'Mason Parker', 83, 4, 'Highly recommended!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('avery.perez@x.dummyjson.com', 'Avery Perez', 83, 5, 'Highly impressed!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('nathan.reed@x.dummyjson.com', 'Nathan Reed', 83, 5, 'Fast shipping!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('logan.lawson@x.dummyjson.com', 'Logan Lawson', 84, 4, 'Highly recommended!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('logan.lawson@x.dummyjson.com', 'Logan Lawson', 84, 4, 'Great value for money!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('oscar.powers@x.dummyjson.com', 'Oscar Powers', 84, 5, 'Great value for money!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('nora.mills@x.dummyjson.com', 'Nora Mills', 85, 3, 'Would not buy again!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('addison.ward@x.dummyjson.com', 'Addison Ward', 85, 1, 'Very disappointed!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('emily.brown@x.dummyjson.com', 'Emily Brown', 85, 4, 'Awesome product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('caleb.nelson@x.dummyjson.com', 'Caleb Nelson', 86, 5, 'Great value for money!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('emily.johnson@x.dummyjson.com', 'Emily Johnson', 86, 1, 'Disappointing product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('mila.hernandez@x.dummyjson.com', 'Mila Hernandez', 86, 4, 'Great product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('elena.long@x.dummyjson.com', 'Elena Long', 87, 1, 'Would not buy again!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('mason.parker@x.dummyjson.com', 'Mason Parker', 87, 1, 'Very dissatisfied!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('sofia.mitchell@x.dummyjson.com', 'Sofia Mitchell', 87, 4, 'Great product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('victoria.mcdonald@x.dummyjson.com', 'Victoria McDonald', 88, 2, 'Very unhappy with my purchase!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('mason.parker@x.dummyjson.com', 'Mason Parker', 88, 4, 'Great product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('avery.perez@x.dummyjson.com', 'Avery Perez', 88, 5, 'Fast shipping!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('william.gonzalez@x.dummyjson.com', 'William Gonzalez', 89, 5, 'Very happy with my purchase!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('sophia.brown@x.dummyjson.com', 'Sophia Brown', 89, 2, 'Not worth the price!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('gabriel.mitchell@x.dummyjson.com', 'Gabriel Mitchell', 89, 4, 'Very satisfied!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('lucas.allen@x.dummyjson.com', 'Lucas Allen', 90, 5, 'Very happy with my purchase!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('mason.pearson@x.dummyjson.com', 'Mason Pearson', 90, 4, 'Awesome product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('hunter.gordon@x.dummyjson.com', 'Hunter Gordon', 90, 4, 'Very satisfied!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('james.garcia@x.dummyjson.com', 'James Garcia', 91, 3, 'Not worth the price!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('nora.russell@x.dummyjson.com', 'Nora Russell', 91, 1, 'Very unhappy with my purchase!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('aurora.rodriguez@x.dummyjson.com', 'Aurora Rodriguez', 91, 4, 'Excellent quality!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('madeline.simpson@x.dummyjson.com', 'Madeline Simpson', 92, 5, 'Fast shipping!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('mateo.nguyen@x.dummyjson.com', 'Mateo Nguyen', 92, 5, 'Awesome product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('ethan.fletcher@x.dummyjson.com', 'Ethan Fletcher', 92, 4, 'Very pleased!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('oscar.powers@x.dummyjson.com', 'Oscar Powers', 93, 3, 'Very dissatisfied!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('eli.ward@x.dummyjson.com', 'Eli Ward', 93, 4, 'Fast shipping!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('stella.hughes@x.dummyjson.com', 'Stella Hughes', 93, 4, 'Highly impressed!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('jack.ward@x.dummyjson.com', 'Jack Ward', 94, 4, 'Great product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('victoria.mcdonald@x.dummyjson.com', 'Victoria McDonald', 94, 4, 'Highly recommended!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('mia.rodriguez@x.dummyjson.com', 'Mia Rodriguez', 94, 4, 'Highly impressed!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('gavin.stanley@x.dummyjson.com', 'Gavin Stanley', 95, 5, 'Very pleased!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('stella.hughes@x.dummyjson.com', 'Stella Hughes', 95, 4, 'Highly impressed!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('paisley.bell@x.dummyjson.com', 'Paisley Bell', 95, 4, 'Would buy again!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('sophia.jones@x.dummyjson.com', 'Sophia Jones', 96, 4, 'Very happy with my purchase!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('jacob.cooper@x.dummyjson.com', 'Jacob Cooper', 96, 5, 'Very satisfied!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('elijah.cruz@x.dummyjson.com', 'Elijah Cruz', 96, 4, 'Very satisfied!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('max.russell@x.dummyjson.com', 'Max Russell', 97, 5, 'Highly impressed!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('jonathan.pierce@x.dummyjson.com', 'Jonathan Pierce', 97, 4, 'Would buy again!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('asher.scott@x.dummyjson.com', 'Asher Scott', 97, 4, 'Awesome product!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('emily.brown@x.dummyjson.com', 'Emily Brown', 98, 2, 'Very dissatisfied!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('nova.cooper@x.dummyjson.com', 'Nova Cooper', 98, 5, 'Highly impressed!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('julian.james@x.dummyjson.com', 'Julian James', 98, 2, 'Would not recommend!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('nora.mills@x.dummyjson.com', 'Nora Mills', 99, 4, 'Highly recommended!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('ava.taylor@x.dummyjson.com', 'Ava Taylor', 99, 4, 'Fast shipping!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('aria.flores@x.dummyjson.com', 'Aria Flores', 99, 4, 'Very pleased!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('aaliyah.hanson@x.dummyjson.com', 'Aaliyah Hanson', 100, 3, 'Waste of money!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('leah.gutierrez@x.dummyjson.com', 'Leah Gutierrez', 100, 2, 'Waste of money!', '2024-05-23');
INSERT INTO comments (email, name, product_id, rating, comment, date) VALUES ('jace.smith@x.dummyjson.com', 'Jace Smith', 100, 3, 'Not worth the price!', '2024-05-23');