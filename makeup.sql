CREATE DATABASE Makeup;
GO
USE Makeup;
GO

-- Table for storing product information
CREATE TABLE Product (
    product_id INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100),
    stock_quantity INT NOT NULL CHECK (stock_quantity >= 0)
);



INSERT INTO Product (name, description, price, category, stock_quantity) VALUES
('Lipstick - Red Matte', 'Long-lasting matte lipstick in red shade', 1200.00, 'Lipstick', 50),
('Foundation - Ivory', 'Full coverage liquid foundation for fair skin', 2500.00, 'Foundation', 30),
('Primer - Hydrating', 'Oil-free hydrating primer for smooth makeup base', 1800.00, 'Primer', 40),
('Mascara - Waterproof', 'Long-lasting waterproof mascara for volume', 1500.00, 'Mascara', 20),
('Lip Gloss - Nude', 'Shiny, non-sticky lip gloss for everyday wear', 1100.00, 'Lippies', 25),
('Blush - Peach', 'Silky smooth powder blush for a natural glow', 1300.00, 'Blush', 35),
('Highlighter - Glow', 'Shimmer highlighter for a radiant finish', 2000.00, 'Highlighter', 15),
('Eyeshadow Palette - Nude', '12 shades of highly pigmented eyeshadow', 3200.00, 'Eyeshadow', 10);
INSERT INTO Product (name, description, price, category, stock_quantity) VALUES
-- Rare Beauty
('Rare Beauty Soft Pinch Liquid Blush - Happy', 'Viral lightweight liquid blush with a natural radiant finish', 2800.00, 'Blush', 45),

-- Fenty Beauty
('Fenty Gloss Bomb - Fenty Glow', 'High shine lip gloss with a universal nude shade, loved by Rihanna', 3200.00, 'Lip Gloss', 30),

-- Charlotte Tilbury
('Charlotte Tilbury Hollywood Flawless Filter', 'Glow booster used as primer, highlighter or foundation enhancer', 4200.00, 'Primer', 20),

-- Dior
('Dior Lip Glow Oil - Cherry', 'Color-reviving lip oil for juicy hydrated lips, trending on TikTok', 3900.00, 'Lip Oil', 25),

-- Huda Beauty
('Huda Beauty FauxFilter Luminous Matte Foundation', 'Full coverage, long-wear matte foundation for camera-ready glam', 4500.00, 'Foundation', 15),

-- Pat McGrath Labs
('Pat McGrath Mothership Eyeshadow Palette - Sublime', 'Luxury eyeshadow palette with creamy, pigmented shades', 9800.00, 'Eyeshadow', 8),

-- Selena Gomez Line
('Rare Beauty Perfect Strokes Mascara', 'Weightless, long-wear mascara for volume and definition', 2900.00, 'Mascara', 20),

-- Kylie Cosmetics
('Kylie Lip Kit - Candy K', 'Matte liquid lipstick and liner duo for the signature Kylie look', 3500.00, 'Lipstick', 18),

-- Glossier
('Glossier Cloud Paint - Beam', 'Sheer gel-cream blush that blends seamlessly', 2600.00, 'Blush', 22),

-- Armani Beauty
('Armani Luminous Silk Foundation', 'Lightweight, silky foundation loved by celebrity makeup artists', 5800.00, 'Foundation', 12);

INSERT INTO Product (name, description, price, category, stock_quantity) VALUES
('gloss - Nude', 'shinny', 200.00, 'Lippies', 0);

----------------

SELECT * FROM Product;

CREATE PROCEDURE InsertProduct
    @name VARCHAR(255),
    @description TEXT,
    @price DECIMAL(10,2),
    @category VARCHAR(255),
    @stock_quantity INT
AS
BEGIN
    INSERT INTO Product (name, description, price, category, stock_quantity)
    VALUES (@name, @description, @price, @category, @stock_quantity);
END;

CREATE PROCEDURE GetAllProducts
AS
BEGIN
    SELECT * FROM Product;
END;


CREATE PROCEDURE UpdateProduct
    @productId INT,
    @name VARCHAR(255),
    @description TEXT,
    @price DECIMAL(10,2),
    @category VARCHAR(255),
    @stock_quantity INT
AS
BEGIN
    UPDATE Product
    SET
        name = @name,
        description = @description,
        price = @price,
        category = @category,
        stock_quantity = @stock_quantity
    WHERE product_id = @productId;
END;


EXEC sp_help 'Cart';
EXEC sp_help 'Wishlist';
EXEC sp_help 'Rating';
EXEC sp_help 'Viewing_History';
EXEC sp_help 'Complaint';
EXEC sp_help 'Product_Promotion';
EXEC sp_help 'Order_Detail';
EXEC sp_help 'Stock';
EXEC sp_help 'Product';


CREATE PROCEDURE DeleteProduct
    @productId INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- 1. Delete related records from dependent tables
        DELETE FROM Cart WHERE product_id = @productId;
        DELETE FROM Wishlist WHERE product_id = @productId;
        DELETE FROM Rating WHERE product_id = @productId;
        DELETE FROM Viewing_History WHERE product_id = @productId;
        DELETE FROM Complaint WHERE product_id = @productId;
        DELETE FROM Product_Promotion WHERE product_id = @productId;
        DELETE FROM Order_Detail WHERE product_id = @productId;
        DELETE FROM Stock WHERE product_id = @productId;

        -- 2. Finally delete from Product
        DELETE FROM Product WHERE product_id = @productId;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;

        -- Return the error
        THROW;
    END CATCH
END;


CREATE PROCEDURE GetProductsByPriceRange
  @MinPrice DECIMAL(10, 2),
  @MaxPrice DECIMAL(10, 2)
AS
BEGIN
  SELECT * FROM Product
  WHERE Price BETWEEN @MinPrice AND @MaxPrice;
END;

CREATE PROCEDURE GetProductById
    @productId INT
AS
BEGIN
    SELECT * FROM product
    WHERE product_id = @productId;
END;


-------------
-- Table for suppliers
CREATE TABLE Supplier (
    supplier_id INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(255) NOT NULL,
    contact_info VARCHAR(255)
);
INSERT INTO Supplier (name, contact_info) VALUES
('Maybelline', 'maybelline@contact.com'),
('L\Oreal', 'loreal@contact.com'),
('MAC Cosmetics', 'mac@contact.com'),
('Huda Beauty', 'hudabeauty@contact.com'),
('Fenty Beauty', 'fenty@contact.com'),
('NYX Professional', 'nyx@contact.com'),
('Sephora', 'sephora@contact.com');

SELECT * FROM Supplier;
--SP
CREATE PROCEDURE GetAllSuppliers
AS
BEGIN
    SELECT 
        supplier_id, 
        name AS supplier_name, 
        contact_info
    FROM Supplier;
END;
GO



-- Table for managing stock
CREATE TABLE Stock (
    stock_id INT PRIMARY KEY IDENTITY(1,1),
    product_id INT NOT NULL,
    supplier_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity >= 0),
    FOREIGN KEY (product_id) REFERENCES Product(product_id),
    FOREIGN KEY (supplier_id) REFERENCES Supplier(supplier_id)
);

INSERT INTO Stock (product_id, supplier_id, quantity) VALUES
(1, 1, 100),  -- Lipstick from Maybelline
(2, 2, 80),   -- Foundation from L'Oreal
(3, 3, 60),   -- Primer from MAC Cosmetics
(4, 4, 50),   -- Mascara from Huda Beauty
(5, 5, 70),   -- Lip Gloss from Fenty Beauty
(6, 6, 90),   -- Blush from NYX Professional
(7, 7, 40),   -- Highlighter from Sephora
(8, 1, 30);   -- Eyeshadow from Maybelline
SELECT S.stock_id, P.name AS Product, SP.name AS Supplier, S.quantity 
FROM Stock S
JOIN Product P ON S.product_id = P.product_id
JOIN Supplier SP ON S.supplier_id = SP.supplier_id;

SELECT * from Stock;
CREATE PROCEDURE get_stock_details
AS
BEGIN
    SELECT 
        S.stock_id, 
        P.name AS Product, 
        SP.name AS Supplier, 
        S.quantity 
    FROM Stock S
    JOIN Product P ON S.product_id = P.product_id
    JOIN Supplier SP ON S.supplier_id = SP.supplier_id;
END;

-- Table for users
CREATE TABLE Users (
    user_id INT PRIMARY KEY IDENTITY(1,1),
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);
INSERT INTO Users (username, email, password_hash) VALUES
('aima123', 'aima@example.com', 'hashed_password_1'),
('areej456', 'areej@example.com', 'hashed_password_2'),
('amna789', 'amna@example.com', 'hashed_password_3'),
('sana_glam', 'sana@example.com', 'hashed_password_4'),
('maria_makeup', 'maria@example.com', 'hashed_password_5');
SELECT * FROM Users;
--sp to insert user
CREATE PROCEDURE InsertUser
    @username VARCHAR(255),
    @email VARCHAR(255),
    @password_hash VARCHAR(255)
AS
BEGIN
    INSERT INTO Users (username, email, password_hash)
    VALUES (@username, @email, @password_hash);
END;
-------------------------------

--Stored Procedure to Update a User:

CREATE PROCEDURE UpdateUser
    @user_id INT,
    @username VARCHAR(255),
    @email VARCHAR(255),
    @password_hash VARCHAR(255)
AS
BEGIN
    UPDATE Users
    SET username = @username, email = @email, password_hash = @password_hash
    WHERE user_id = @user_id;
END;

--Stored Procedure to Delete a User:

CREATE PROCEDURE DeleteUser
    @user_id INT
AS
BEGIN
    DELETE FROM Users
    WHERE user_id = @user_id;
END;
--Stored Procedure to Get All Users:

CREATE PROCEDURE GetAllUsers
AS
BEGIN
    SELECT * FROM Users;
END;
-- Table for carts
CREATE TABLE Cart (
    cart_id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
);

INSERT INTO Cart (user_id, product_id, quantity) VALUES
(1, 2, 1), 
(1, 4, 2), 
(2, 1, 1),  
(2, 5, 3), 
(3, 3, 1),  
(4, 6, 2), 
(5, 8, 1); 
SELECT C.cart_id, U.username, P.name AS Product, C.quantity 
FROM Cart C
JOIN Users U ON C.user_id = U.user_id
JOIN Product P ON C.product_id = P.product_id;
--sp
-- Get all cart items
CREATE PROCEDURE GetCartItems
AS
BEGIN
    SELECT * FROM Cart;
END;

CREATE PROCEDURE AddToCart
    @user_id INT,
    @product_id INT,
    @quantity INT
AS
BEGIN
    INSERT INTO Cart (user_id, product_id, quantity)
    VALUES (@user_id, @product_id, @quantity);
END;

-- Remove an item from the cart
CREATE PROCEDURE RemoveFromCart
  @user_id INT ,
  @product_id INT
AS
BEGIN
  DELETE FROM Cart
  WHERE user_id = @user_id AND product_id = @product_id;
END;


-- Table for wishlists
CREATE TABLE Wishlist (
    wishlist_id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
);
INSERT INTO Wishlist (user_id, product_id) VALUES
(1, 3), 
(1, 7), 
(2, 1),  
(2, 8),  
(3, 5), 
(4, 2), 
(5, 6);  
SELECT W.wishlist_id, U.username, P.name AS Product 
FROM Wishlist W
JOIN Users U ON W.user_id = U.user_id
JOIN Product P ON W.product_id = P.product_id;


-- Table for orders
CREATE TABLE Orders (
    order_id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT NOT NULL,
    order_date DATETIME DEFAULT GETDATE(),
    status VARCHAR(20) DEFAULT 'Pending',
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
INSERT INTO Orders (user_id, order_date, status) VALUES
(1, GETDATE(), 'Pending'),  
(2, GETDATE(), 'Shipped'),  
(3, GETDATE(), 'Delivered'), 
(4, GETDATE(), 'Pending'),  
(5, GETDATE(), 'Cancelled');
SELECT O.order_id, U.username, O.order_date, O.status 
FROM Orders O
JOIN Users U ON O.user_id = U.user_id;



-- Table for order details
CREATE TABLE OrderDetails (
    order_detail_id INT PRIMARY KEY IDENTITY(1,1),
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
);
INSERT INTO OrderDetails (order_id, product_id, quantity, price) VALUES
(1, 2, 1, 2500.00), 
(1, 4, 2, 1500.00),
(2, 1, 1, 1200.00),
(3, 5, 3, 1100.00), 
(4, 3, 1, 1800.00),
(5, 6, 2, 1300.00); 

SELECT OD.order_detail_id, O.order_id, U.username, P.name AS Product, OD.quantity, OD.price 
FROM OrderDetails OD
JOIN Orders O ON OD.order_id = O.order_id
JOIN Users U ON O.user_id = U.user_id
JOIN Product P ON OD.product_id = P.product_id;
--------------------------------------------------

-- Table for complaints
CREATE TABLE Complaint (
    complaint_id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT NOT NULL,
    order_id INT NOT NULL,
    description varchar(max) NOT NULL,
	created_at DATETIME DEFAULT GETDATE(),
    status VARCHAR(20) DEFAULT 'Pending',
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);

INSERT INTO Complaint (user_id, order_id, description, created_at) VALUES
(1, 2, 'Received wrong shade of lipstick.',getdate() ),  
(2, 3, 'Foundation bottle was leaked.', '2025-03-20 10:00:00'),  
(3, 1, 'Primer quality was not good.','2025-03-21 10:00:00' ),  
(4, 4, 'Mascara was missing from package.',GETDATE() ),  
(5, 5, 'Blush arrived broken.',getdate());

SELECT C.complaint_id, U.username, O.order_id, C.description, C.created_at ,C.status 
FROM Complaint C
JOIN Users U ON C.user_id = U.user_id
JOIN Orders O ON C.order_id = O.order_id;

--RATING
CREATE TABLE Rating (
    rating_id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    rating DECIMAL(2,1) CHECK (rating BETWEEN 1 AND 5), 
    review VARCHAR(1000),  -- Optional user review
    created_at DATETIME DEFAULT GETDATE(),  -- Stores the timestamp

    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
);
select * from Rating;
INSERT INTO Rating (user_id, product_id, rating, review)
VALUES 
(1, 1, 5, 'The red matte lipstick is amazing! Long-lasting and perfect shade.'),
(2, 2, 4, 'Great foundation, but a bit heavy on my skin.'),
(3, 3, 5, 'Absolutely love this primer! Makes my makeup last all day.'),
(4, 4, 3, 'Waterproof mascara is decent, but clumps a bit.'),
(5, 5, 4, 'Love the nude lip gloss! Not sticky and very smooth.'),
(1, 6, 5, 'Peach blush gives a natural glow, perfect for everyday use.'),
(2, 7, 4, 'Highlighter is beautiful but a little too shimmery for me.'),
(3, 8, 5, 'Best eyeshadow palette! Great pigmentation and smooth application.');

SELECT R.rating_id, U.username, P.name AS product_name, R.rating, R.review, R.created_at
FROM Rating as R
JOIN Users U ON R.user_id = U.user_id
JOIN Product P ON R.product_id = P.product_id;
-- history table for recoomendation
CREATE TABLE history (
    history_id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    viewed_at DATETIME DEFAULT GETDATE(),  -- Stores the timestamp when the product was viewed
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
);
INSERT INTo History (user_id, product_id, viewed_at) VALUES
(1, 2, '2024-03-20 14:30:00'), -- Aima viewed Foundation
(1, 4, '2024-03-20 15:00:00'), -- Aima viewed Mascara
(1, 1, '2025-02-02 19:00:00'), -- Aima viewed lipstick
(2, 1, '2024-03-19 10:20:00'), -- Areej viewed Lipstick
(2, 4, '2024-04-20 15:00:00'), -- areej viewed Mascara
(2, 3, '2024-05-20 15:00:00'), -- areej viewed primer
(3, 5, '2024-03-21 16:45:00'), -- Amna viewed Lip Gloss
(3, 4, '2024-03-20 15:00:00'), -- amna viewed Mascara
(4, 4, '2024-03-20 15:00:00'), -- sana viewed Mascara
(4, 3, '2024-03-18 12:15:00'), -- Sana viewed Primer
(5, 3, '2024-03-18 12:15:00'), -- 
(5, 2, '2024-03-18 12:15:00'), -- 
(5, 5, '2024-03-18 12:15:00');
select * from History;
-- promotion table 
CREATE TABLE Promotions (
    promo_id INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(255) NOT NULL,
    discount_percentage DECIMAL(5,2) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);
INSERT INTO Promotions (name, discount_percentage, start_date, end_date) VALUES 
('Eid Special Deal', 10, '2025-04-01', '2025-04-10'),
('Eid Glam Beauty Kit', 25, '2025-03-01', '2025-03-20'),
('50% off on limited stock ', 50, '2025-08-01', '2025-09-01');
select * from Promotions;
CREATE TABLE ProductPromotions (
    product_id INT,
    promo_id INT,
    FOREIGN KEY (product_id) REFERENCES Product(product_id),
    FOREIGN KEY (promo_id) REFERENCES Promotions(promo_id)
);
INSERT INTO ProductPromotions (product_id, promo_id) VALUES
(1, 1),  -- Lipstick in  Eid Special
(2, 1),  -- Foundation in  Eid Special
(3, 2),  -- Primer in Eid Glam Beauty Kit
(4, 2),  -- Mascara in Eid Glam Beauty Kit
(5, 3),  -- Lip Gloss in 50%
(6, 3),  -- Blush in 50%
(1, 3),  -- 50%
(2,3),   -- 50%
(3,3),   -- 50%
(4,3);   -- 50%

select * from ProductPromotions;
--PRINTING TABLE

-- 1 Product Catalog (Available Products)
SELECT * FROM Product;

-- 2 Supplier List
SELECT * FROM Supplier;
DELETE FROM Supplier
WHERE supplier_id = 9;


-- 3 Stock Details (Products with Suppliers & Quantity)
SELECT S.stock_id, P.name AS Product, SP.name AS Supplier, S.quantity 
FROM Stock S
JOIN Product P ON S.product_id = P.product_id
JOIN Supplier SP ON S.supplier_id = SP.supplier_id;

-- 4 Users List
SELECT * FROM Users;

-- 5 Cart Details (User's Added Products)

CREATE PROCEDURE GetCartDetails
AS
BEGIN
    SELECT 
        C.cart_id, 
        U.username, 
        P.name AS Product, 
        C.quantity
    FROM 
        Cart C
    JOIN 
        Users U ON C.user_id = U.user_id
    JOIN 
        Product P ON C.product_id = P.product_id;
END;
exec GetCartDetails;
--add to cart
CREATE PROCEDURE addTocart
  @user_id INT,
  @product_id INT,
  @quantity INT
AS
BEGIN
  INSERT INTO Cart (user_id, product_id, quantity)
  VALUES (@user_id, @product_id, @quantity);
END
EXEC addToCart 
  @user_id = 1, 
  @product_id = 2, 
  @quantity = 1;

  --remove from cart
  CREATE PROCEDURE RemoveFromCart
  @cart_id INT
AS
BEGIN
  DELETE FROM Cart WHERE cart_id = @cart_id;
END
EXEC RemoveFromCart @cart_id = 3;

SELECT C.cart_id, U.username, P.name AS Product, C.quantity 
FROM Cart C
JOIN Users U ON C.user_id = U.user_id
JOIN Product P ON C.product_id = P.product_id;

-- 6 Wishlist Details (User's Saved Products)
SELECT W.wishlist_id, U.username, P.name AS Product 
FROM Wishlist W
JOIN Users U ON W.user_id = U.user_id
JOIN Product P ON W.product_id = P.product_id;
-- Stored Procedure to Add Product to Wishlist
CREATE PROCEDURE AddToWishlist
    @user_id INT,
    @product_id INT
AS
BEGIN
    -- Check if the product is already in the wishlist
    IF NOT EXISTS (SELECT 1 FROM Wishlist WHERE user_id = @user_id AND product_id = @product_id)
    BEGIN
        -- Insert the product into the wishlist if it doesn't already exist
        INSERT INTO Wishlist (user_id, product_id)
        VALUES (@user_id, @product_id);
    END
    ELSE
    BEGIN
        PRINT 'Product already in wishlist';
    END
END;
-- Stored Procedure to View User's Wishlist
CREATE PROCEDURE ViewWishlist
    @user_id INT
AS
BEGIN
    -- Select the wishlist items for a specific user
    SELECT W.wishlist_id, U.username, P.name AS Product
    FROM Wishlist W
    JOIN Users U ON W.user_id = U.user_id
    JOIN Product P ON W.product_id = P.product_id
    WHERE W.user_id = @user_id;
END;

-- 7 Orders List
SELECT O.order_id, U.username, O.order_date, O.status 
FROM Orders O
JOIN Users U ON O.user_id = U.user_id;

-- 8 Order Details (Products in Each Order)
SELECT OD.order_detail_id, O.order_id, U.username, P.name AS Product, OD.quantity, OD.price 
FROM OrderDetails OD
JOIN Orders O ON OD.order_id = O.order_id
JOIN Users U ON O.user_id = U.user_id
JOIN Product P ON OD.product_id = P.product_id;

-- 9 Complaints List
SELECT C.complaint_id, U.username, O.order_id, C.description, C.status 
FROM Complaint C
JOIN Users U ON C.user_id = U.user_id
JOIN Orders O ON C.order_id = O.order_id;
--10
select * from Rating;

SELECT R.rating_id, U.username, P.name AS product_name, R.rating, R.review, R.created_at
FROM Rating as R
JOIN Users U ON R.user_id = U.user_id
JOIN Product P ON R.product_id = P.product_id;


---11
select * from History;


--12
select * from Promotions;


--13
select * from ProductPromotions;
----------------------------------------------------------------------------------------------
--Product Catalog: A list of makeup products with details like name, description, price and availability.
-- Retrieve all products
SELECT product_id, name, description, price, stock_quantity AS availability
FROM Product
WHERE stock_quantity > 0;

--Price Filters: Users can filter products by price range to help them find products within their budget
DECLARE @min_price DECIMAL(10,2) = 1000;  -- Minimum price
DECLARE @max_price DECIMAL(10,2) = 2500;  -- Maximum price

SELECT * FROM Product 
WHERE price BETWEEN @min_price AND @max_price;
--Top Ranking Products: Show products with the best ratings, allowing users to quickly find popular and highly rated makeup products.

SELECT TOP 10 P.product_id, P.name AS product_name, P.category,
       ROUND(AVG(R.rating), 2) AS rating
FROM Product P
JOIN Rating R ON P.product_id = R.product_id
GROUP BY P.product_id, P.name, P.category
HAVING COUNT(R.rating_id) > 0
ORDER BY rating DESC;


--  Fetch Category Wise Top-Rated Products (Example: Lipstick)
DECLARE @category_name VARCHAR(100) = 'Lipstick';

SELECT P.product_id, P.name AS product_name, P.category, 
       ROUND(AVG(R.rating), 2) AS avg_rating, COUNT(R.rating_id) AS total_reviews
FROM Product P
JOIN Rating R ON P.product_id = R.product_id
WHERE P.category = @category_name
GROUP BY P.product_id, P.name, P.category
HAVING AVG(R.rating) IS NOT NULL  -- Ensure product has at least one rating
ORDER BY avg_rating DESC, total_reviews DESC
OFFSET 0 ROWS FETCH NEXT 5 ROWS ONLY;
--STORED PROCEDURE FOR THIS
CREATE PROCEDURE TopRatedProducts
AS
BEGIN
  SELECT TOP 10 
    P.product_id, 
    P.name AS product_name, 
    P.category,
    ROUND(AVG(R.rating), 2) AS rating
  FROM Product P
  JOIN Rating R ON P.product_id = R.product_id
  GROUP BY P.product_id, P.name, P.category
  HAVING COUNT(R.rating_id) > 0
  ORDER BY rating DESC;
END;



--BY CATEGOREY
CREATE PROCEDURE TopRatedProductsByCategory
  @CategoryName VARCHAR(100)
AS
BEGIN
  SELECT 
    P.product_id, 
    P.name AS product_name, 
    P.category, 
    ROUND(AVG(R.rating), 2) AS avg_rating, 
    COUNT(R.rating_id) AS total_reviews
  FROM Product P
  JOIN Rating R ON P.product_id = R.product_id
  WHERE P.category = @CategoryName
  GROUP BY P.product_id, P.name, P.category
  HAVING AVG(R.rating) IS NOT NULL
  ORDER BY avg_rating DESC, total_reviews DESC
  OFFSET 0 ROWS FETCH NEXT 5 ROWS ONLY;
END;


--Special Offers and Packages: Highlight products with discounts, sales, and bundled packages for promotions.
--Get Product Ratings and Reviews:
SELECT R.rating_id, U.username, P.name AS product_name, R.rating, R.review
FROM Rating AS R
JOIN Users U ON R.user_id = U.user_id
JOIN Product P ON R.product_id = P.product_id;
--View Products and Their Promotions:
SELECT P.name, Pr.name AS promo_name, Pr.discount_percentage, Pr.start_date, Pr.end_date
FROM Product P
JOIN ProductPromotions PP ON P.product_id = PP.product_id
JOIN Promotions Pr ON PP.promo_id = Pr.promo_id;
-----stored procedures
-- Stored Procedure: GetProductsWithPromotions
CREATE PROCEDURE GetProductsWithPromotions
AS
BEGIN
    SELECT 
        P.name AS product_name, 
        Pr.name AS promo_name, 
        Pr.discount_percentage, 
        Pr.start_date, 
        Pr.end_date
    FROM Product P
    JOIN ProductPromotions PP ON P.product_id = PP.product_id
    JOIN Promotions Pr ON PP.promo_id = Pr.promo_id;
END;
GO

-- Stored Procedure: GetProductRatingsAndReviews
CREATE PROCEDURE GetProductRatingsAndReviews
AS
BEGIN
    SELECT 
        R.rating_id, 
        U.username, 
        P.name AS product_name, 
        R.rating, 
        R.review
    FROM Rating AS R
    JOIN Users U ON R.user_id = U.user_id
    JOIN Product P ON R.product_id = P.product_id;
END;
GO

--Out of Stock Notifications: Notify users when a product is restocked or when it is about to go out of stock.
-- Out of stock products (quantity = 0)
SELECT product_id, name, description, price
FROM Product
WHERE stock_quantity = 0;

-- Products that are low in stock (e.g., less than 20 items left)
SELECT product_id, name, description, price, stock_quantity
FROM Product
WHERE stock_quantity <= 20;
-------------------------------------------------------------------------------------------
--STORED  PROCEDURE
CREATE PROCEDURE GetStockAlerts
    @LowStockThreshold INT = 20  -- default threshold
AS
BEGIN
    -- Out of stock
    SELECT 
        product_id, 
        name, 
        description, 
        price, 
        stock_quantity,
        'Out of Stock' AS stock_status
    FROM Product
    WHERE stock_quantity = 0;

    -- Low stock (but not out of stock)
    SELECT 
        product_id, 
        name, 
        description, 
        price, 
        stock_quantity,
        'Low Stock' AS stock_status
    FROM Product
    WHERE stock_quantity > 0 AND stock_quantity <= @LowStockThreshold;
END;
GO

select* from Users
select* from product
select* from cart
select* from Orders
-----------------------------------------------------------
CREATE OR ALTER PROCEDURE DeleteProduct
    @productId INT
AS
BEGIN
    -- Delete from dependent tables first
    DELETE FROM Wishlist WHERE product_id = @productId;
    DELETE FROM Cart WHERE product_id = @productId;
    DELETE FROM Stock WHERE product_id = @productId;
    DELETE FROM OrderDetails WHERE product_id = @productId;
    DELETE FROM Rating WHERE product_id = @productId;
    DELETE FROM history WHERE product_id = @productId;
    DELETE FROM ProductPromotions WHERE product_id = @productId;

    -- Now delete the product
    DELETE FROM Product WHERE product_id = @productId;
END;



--PART 2

-- User Interaction Features:


--Search Functionality: Allow users to search for products by name or category.
-- Searching by product name
DECLARE @search_name VARCHAR(255) = 'Lipstick';  -- Example input
SELECT * FROM Product 
WHERE name LIKE '%' + @search_name + '%'AND stock_quantity > 0;

-- Searching by product category
DECLARE @search_category VARCHAR(100) = 'Foundation';  -- Example input
SELECT * FROM Product 
WHERE category LIKE '%' + @search_category + '%';

-- 3 Search Products by Name OR Category (Combined)
DECLARE @search_term VARCHAR(255) = 'Lipstick';  -- Example input
SELECT * FROM Product 
WHERE name LIKE '%' + @search_term + '%' 
   OR category LIKE '%' + @search_term + '%';





--Cart Management:

--Add to Cart
DECLARE @user_id INT = 5;  -- Example User ID
DECLARE @product_id INT = 9;  -- Example Product ID
DECLARE @quantity INT = 200;  -- Example Quantity
DECLARE @available_stock INT;
DECLARE @current_cart_quantity INT = 0;

-- Get the available stock for the product
SELECT @available_stock = stock_quantity 
FROM Product 
WHERE product_id = @product_id;

-- Check if product exists in cart
SELECT @current_cart_quantity = quantity 
FROM Cart 
WHERE user_id = @user_id AND product_id = @product_id;

-- Error handling
IF @available_stock IS NULL
BEGIN
    PRINT 'Error: Product does not exist.';
END
ELSE IF @available_stock = 0
BEGIN
    PRINT 'Error: Product is out of stock.';
END
ELSE IF EXISTS (SELECT 1 FROM Cart WHERE user_id = @user_id AND product_id = @product_id)
BEGIN
    -- Ensure total quantity does not exceed stock
    IF (@current_cart_quantity + @quantity) > @available_stock
    BEGIN
        PRINT 'Error: Not enough stock available.';
    END
    ELSE
    BEGIN
        -- Update the cart with new quantity
        UPDATE Cart
        SET quantity = quantity + @quantity
        WHERE user_id = @user_id AND product_id = @product_id;
        PRINT 'Product quantity updated in cart.';
    END
END
ELSE
BEGIN
    -- Ensure requested quantity does not exceed available stock
    IF @quantity > @available_stock
    BEGIN
        PRINT 'Error: Requested quantity exceeds available stock.';
    END
    ELSE
    BEGIN
        -- Insert new product into cart
        INSERT INTO Cart (user_id, product_id, quantity) 
        VALUES (@user_id, @product_id, @quantity);
        PRINT 'Product added to cart.';
    END
END;


-- View Cart

DECLARE @user_id INT = 4;  -- Example User ID
DECLARE @product_id INT = 9;  -- Example Product ID
DECLARE @quantity INT = 1; 
SELECT C.cart_id, P.name AS Product, P.price, C.quantity, (P.price * C.quantity) AS Total_Price
FROM Cart C
JOIN Product P ON C.product_id = P.product_id
WHERE C.user_id = @user_id;
--  Remove from Cart: Decrease quantity or remove if only 1 remains

DECLARE @user_id INT = 1;  -- Example User ID
DECLARE @product_id INT = 2;  -- Example Product ID
DECLARE @quantity INT = 1;  -- Example Quantity

DECLARE @cart_product_id INT = 2;  -- Example Product ID to remove

IF EXISTS (SELECT 1 FROM Cart WHERE user_id = @user_id AND product_id = @cart_product_id)
BEGIN
    -- Reduce quantity if more than 1, otherwise delete
    IF (SELECT quantity FROM Cart WHERE user_id = @user_id AND product_id = @cart_product_id) > 1
    BEGIN
        UPDATE Cart 
        SET quantity = quantity - 1
        WHERE user_id = @user_id AND product_id = @cart_product_id;
    END
    ELSE
    BEGIN
        DELETE FROM Cart 
        WHERE user_id = @user_id AND product_id = @cart_product_id;
    END
END;

--Wishlist: Users can save their favorite products for future purchase.

-- Add to Wishlist 
DECLARE @user_id INT = 1;  -- Example User ID
DECLARE @product_id INT = 3;  -- Example Product ID
IF NOT EXISTS (SELECT 1 FROM Wishlist WHERE user_id = @user_id AND product_id = @product_id)
BEGIN
    INSERT INTO Wishlist (user_id, product_id) 
    VALUES (@user_id, @product_id);
END;



--  View Wishlist
DECLARE @user_id INT = 1;  -- Example User ID

SELECT W.wishlist_id, P.name AS Product, P.price, P.category
FROM Wishlist W
JOIN Product P ON W.product_id = P.product_id
WHERE W.user_id = @user_id;

-- Remove from Wishlist 

DECLARE @user_id INT = 1;
DECLARE @wishlist_product_id INT = 3;  -- Example Product ID to remove

DELETE FROM Wishlist 
WHERE user_id = @user_id AND product_id = @wishlist_product_id;

-- Order Placement: After selecting products, users can proceed to checkout and complete their orders.

-- Step 1: Create a New Order for the User
DECLARE @user_id INT = 1;  -- Example User ID
DECLARE @new_order_id INT;  -- Variable to hold the new order ID

-- Create a new order with a 'Pending' status
INSERT INTO Orders (user_id, order_date, status) 
VALUES (@user_id, GETDATE(), 'Pending');

-- Step 2: Get the ID of the newly created order
SET @new_order_id = SCOPE_IDENTITY();

-- Step 3: Move All Cart Items to OrderDetails (Checkout Process) with Aggregated Quantities
-- This step moves items from the Cart to the OrderDetails table with aggregated quantities for each product
INSERT INTO OrderDetails (order_id, product_id, quantity, price)
SELECT 
    @new_order_id, 
    C.product_id, 
    SUM(C.quantity) AS quantity,  -- Aggregate quantities for the same product
    P.price
FROM Cart C
JOIN Product P ON C.product_id = P.product_id
WHERE C.user_id = @user_id
GROUP BY C.product_id, P.price;

-- Step 4: Clear Cart After Order Placement
-- Once the order has been placed, clear the user's cart
DELETE FROM Cart WHERE user_id = @user_id;

-- Step 5: Reduce Stock Quantity of Ordered Products
-- After the order is placed, reduce the stock quantity of the ordered products
UPDATE Product
SET stock_quantity = stock_quantity - OD.quantity
FROM Product P
JOIN OrderDetails OD ON P.product_id = OD.product_id
WHERE OD.order_id = @new_order_id;

-- Step 6: Confirm Order Details
-- Return the details of the newly created order
SELECT O.order_id, O.order_date, O.status, P.name AS Product, OD.quantity, OD.price 
FROM Orders O
JOIN OrderDetails OD ON O.order_id = OD.order_id
JOIN Product P ON OD.product_id = P.product_id
WHERE O.order_id = @new_order_id;

-------------------------------------------------
CREATE PROCEDURE PlaceOrder
  @user_id INT
AS
BEGIN
  SET NOCOUNT ON;

  DECLARE @order_id INT;

  -- 1. Insert into Orders table
  INSERT INTO Orders (user_id, order_date, status)
  VALUES (@user_id, GETDATE(), 'Pending');

  -- 2. Get the newly created order_id
  SET @order_id = SCOPE_IDENTITY();

  -- 3. Insert aggregated order items from user's cart
  INSERT INTO OrderDetails (order_id, product_id, quantity, price)
  SELECT 
    @order_id,
    c.product_id,
    SUM(c.quantity),
    p.price
  FROM Cart c
  JOIN Product p ON c.product_id = p.product_id
  WHERE c.user_id = @user_id
  GROUP BY c.product_id, p.price;

  -- 4. Clear the user's cart
  DELETE FROM Cart WHERE user_id = @user_id;

  -- 5. Return detailed product breakdown
  SELECT 
    o.order_id,
    o.order_date,
    o.status,
    pr.name AS Product,
    od.quantity,
    od.price,
    (od.quantity * od.price) AS subtotal
  FROM Orders o
  JOIN OrderDetails od ON o.order_id = od.order_id
  JOIN Product pr ON od.product_id = pr.product_id
  WHERE o.order_id = @order_id;

  -- 6. Return total bill
  SELECT 
    SUM(od.quantity * od.price) AS totalAmount
  FROM OrderDetails od
  WHERE od.order_id = @order_id;
END;

EXEC PlaceOrder @user_id = 2;
SELECT * FROM Cart WHERE user_id = 2;
-- Make sure the product ID exists in Product table
SELECT TOP 2 * FROM Product;

-- Example: Add product with ID 1 to user 1's cart
INSERT INTO Cart (user_id, product_id, quantity)
VALUES (2, 2, 2);  -- 2 units of product_id = 1



------------------------------------------------------------------------------------------------------
--Order Cancellation: Allow users to cancel their orders as long as they have not been shipped
--  Cancel an Order (Only if Status is NOT 'Shipped')
DECLARE @user_id INT = 1;  -- Example User ID
DECLARE @order_id INT = 2;  -- Example Order ID

-- Check if the order is eligible for cancellation
IF EXISTS (SELECT * FROM Orders WHERE order_id = @order_id AND user_id = @user_id AND status NOT IN ('Shipped', 'Delivered'))
BEGIN
    -- Update order status to 'Cancelled'
    UPDATE Orders 
    SET status = 'Cancelled' 
    WHERE order_id = @order_id;

    -- Restore stock for cancelled products
    UPDATE Product
    SET stock_quantity = stock_quantity + OD.quantity
    FROM Product P
    JOIN OrderDetails OD ON P.product_id = OD.product_id
    WHERE OD.order_id = @order_id;

    PRINT 'Order has been successfully cancelled, and stock has been restored.';
END
ELSE
BEGIN
    PRINT 'Order cannot be cancelled. It has already been shipped or delivered.';
END


SELECT* from Wishlist

--  Verify Order Status After Attempting Cancellation
 -- Example Order ID
DECLARE @order_id INT = 2;  
SELECT * FROM Orders WHERE order_id = @order_id;
-----------------------------------------------------------------------------------
--sp
CREATE PROCEDURE CancelOrder
  @user_id INT,
  @order_id INT
AS
BEGIN
  SET NOCOUNT ON;

  -- Check if cancellation is allowed
  IF EXISTS (
    SELECT 1 
    FROM Orders 
    WHERE order_id = @order_id AND user_id = @user_id AND status NOT IN ('Shipped', 'Delivered')
  )
  BEGIN
    -- 1. Cancel the order
    UPDATE Orders
    SET status = 'Cancelled'
    WHERE order_id = @order_id;

    -- 2. Restore stock
    UPDATE Product
    SET stock_quantity = stock_quantity + OD.quantity
    FROM Product P
    JOIN OrderDetails OD ON P.product_id = OD.product_id
    WHERE OD.order_id = @order_id;

    -- 3. Return success message
    SELECT 'Order has been successfully cancelled, and stock has been restored.' AS message;
  END
  ELSE
  BEGIN
    -- Return failure message
    SELECT 'Order cannot be cancelled. It has already been shipped or delivered.' AS message;
  END
END;
EXEC CancelOrder @user_id = 1, @order_id = 2;

--Order Status: Allows users to track their orders i.e the order is to be shipped or is in process etc.

-- Track Order Status for a Specific User
DECLARE @user_id INT = 1;  -- Example User ID

SELECT  O.user_id, O.order_id, O.order_date, O.status,
       P.name AS Product, OD.quantity, OD.price 
FROM Orders O
JOIN OrderDetails OD ON O.order_id = OD.order_id
JOIN Product P ON OD.product_id = P.product_id
WHERE O.user_id = @user_id
ORDER BY O.order_date DESC;

--  Track a Specific Order by Order ID
DECLARE @order_id INT = 2;  -- Example Order ID

SELECT O.order_id, O.order_date, O.status, 
       P.name AS Product, OD.quantity, OD.price 
FROM Orders O
JOIN OrderDetails OD ON O.order_id = OD.order_id
JOIN Product P ON OD.product_id = P.product_id
WHERE O.order_id = @order_id;
-----------------------------------------------------------------
CREATE PROCEDURE TrackOrder
    @user_id INT
AS
BEGIN
    SELECT DISTINCT O.order_id, O.order_date, O.status
    FROM Orders O
    WHERE O.user_id = @user_id
    ORDER BY O.order_date DESC;
END
----------------------------------------this doesnt work(just for my ease)
CREATE PROCEDURE TrackOrder
    @user_id INT
AS
BEGIN
   SELECT DISTINCT O.order_id, O.order_date, O.status, 
          P.name AS Product, OD.quantity, OD.price 
    FROM Orders O
   JOIN OrderDetails OD ON O.order_id = OD.order_id
   JOIN Product P ON OD.product_id = P.product_id
   WHERE O.user_id = @user_id
    ORDER BY O.order_date DESC;
	END
----------------------------------------------------------
drop procedure TrackOrder--(final)
CREATE PROCEDURE TrackOrder
    @user_id INT
AS
BEGIN
    SELECT 
        O.order_id, 
        O.order_date, 
        O.status,
        STRING_AGG(P.name, ', ') AS Products
    FROM Orders O
    JOIN OrderDetails OD ON O.order_id = OD.order_id
    JOIN Product P ON OD.product_id = P.product_id
    WHERE O.user_id = @user_id
    GROUP BY O.order_id, O.order_date, O.status
    ORDER BY O.order_date DESC;
END


----------------------------------------------------------
-- to get complaints of that user_id
CREATE PROCEDURE GetUserComplaints
    @user_id INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        C.complaint_id,
        U.username,
        O.order_id,
        C.description,
        C.status,
        C.created_at
    FROM Complaint C
    JOIN Users U ON C.user_id = U.user_id
    JOIN Orders O ON C.order_id = O.order_id
    WHERE C.user_id = @user_id;
END;
---------------------------------------

--add complaint
CREATE PROCEDURE AddUserComplaint
    @user_id INT,
    @order_id INT,
    @description VARCHAR(500)
AS
BEGIN
    -- Check if the same complaint already exists
    IF NOT EXISTS (
        SELECT 1 FROM Complaint
        WHERE user_id = @user_id
          AND order_id = @order_id
          AND description = @description
          AND status = 'Pending'  -- Optional, based on your logic
    )
    BEGIN
        INSERT INTO Complaint (user_id, order_id, description, status, created_at)
        VALUES (@user_id, @order_id, @description, 'Pending', GETDATE());
    END
END
--------------------------------------------------------------------------------------------------
-- automatically update the complaint status after 1 day it will be inprogress and after 3 days resolved
CREATE PROCEDURE AutoUpdateComplaintStatus
AS
BEGIN
    -- Update complaints older than 1 day but not yet updated
    UPDATE Complaint
    SET status = 'In Progress'
    WHERE status = 'Pending' AND DATEDIFF(DAY, created_at, GETDATE()) >= 1;

    -- Update complaints older than 3 days
    UPDATE Complaint
    SET status = 'Resolved'
    WHERE status = 'In Progress' AND DATEDIFF(DAY, created_at, GETDATE()) >= 3;
END;

EXEC AutoUpdateComplaintStatus;

SELECT * FROM Complaint;
-------------------------------------------------------------------------------------------------
CREATE PROCEDURE AddRating
    @userid INT,
    @product_id INT,
    @rating DECIMAL(2,1),
    @review VARCHAR(1000)
AS
BEGIN
    -- Check if the user has already rated this product
    IF EXISTS (SELECT 1 FROM Rating WHERE user_id = @userid AND product_id = @product_id)
    BEGIN
        SELECT 'Error: User has already rated this product.' AS message;
        RETURN;
    END

    -- Insert new rating
    INSERT INTO Rating (user_id, product_id, rating, review)
    VALUES (@userid, @product_id, @rating, @review);

    SELECT 'Rating added successfully.' AS message;
END;

EXEC AddRating @userid = 5, @product_id = 2, @rating = 4.5, @review = ' good quality.';


-- update the rating
CREATE PROCEDURE UpdateProductRating
    @user_id1 INT,
    @product_id INT,
    @new_rating DECIMAL(2,1),
    @new_review VARCHAR(1000)
AS
BEGIN
    -- Check if rating exists
    IF NOT EXISTS (SELECT 1 FROM Rating WHERE user_id = @user_id1 AND product_id = @product_id)
    BEGIN
        PRINT 'Error: No existing rating found for this product.';
        RETURN;
    END

    -- Update rating
    UPDATE Rating
    SET rating = @new_rating, review = @new_review, created_at = GETDATE()
    WHERE user_id = @user_id1 AND product_id = @product_id;
    
    PRINT 'Rating updated successfully.';
END;
EXEC UpdateProductRating  @user_id1 = 2, @product_id = 5,  @new_rating = 4.8,  @new_review = 'Updated review: Excellent quality and long-lasting lip gloss.';
--get all the rating for a product by a specific user
SELECT R.rating_id, U.username,  R.rating,  R.review, R.created_at
FROM Rating as R
JOIN Users U ON R.user_id = U.user_id
WHERE R.product_id = 3

--get average rating of ALL products
SELECT product_id, 
    AVG(rating) AS average_rating
FROM Rating
GROUP BY product_id;
-------------------------------------------
CREATE PROCEDURE Recommendations
    @user_id INT
AS
BEGIN
    WITH CombinedRecommendations AS (
        -- From Browsing History
        SELECT DISTINCT 
            P.product_id, 
            P.name AS Recommended_Product, 
            'Browsing History' AS Source,
            COALESCE(AVG(R.rating), 0) AS Average_Rating
        FROM History H
        JOIN Product P ON H.product_id = P.product_id
        LEFT JOIN Cart C ON H.product_id = C.product_id AND C.user_id = @user_id
        LEFT JOIN Rating R ON P.product_id = R.product_id
        WHERE H.user_id = @user_id 
          AND (C.product_id IS NULL OR C.user_id <> @user_id)
        GROUP BY P.product_id, P.name

        UNION

        -- From Wishlist
        SELECT DISTINCT 
            P.product_id, 
            P.name AS Recommended_Product, 
            'Wishlist' AS Source,
            COALESCE(AVG(R.rating), 0) AS Average_Rating
        FROM Wishlist W
        JOIN Product P ON W.product_id = P.product_id
        LEFT JOIN Cart C ON W.product_id = C.product_id AND C.user_id = @user_id
        LEFT JOIN Rating R ON P.product_id = R.product_id
        WHERE W.user_id = @user_id 
          AND (C.product_id IS NULL OR C.user_id <> @user_id)
        GROUP BY P.product_id, P.name

        UNION

        -- Frequently bought by others
        SELECT DISTINCT 
            P.product_id, 
            P.name AS Recommended_Product, 
            'Frequently Bought by Others' AS Source,
            COALESCE(AVG(R.rating), 0) AS Average_Rating
        FROM Cart C
        JOIN Product P ON C.product_id = P.product_id
        LEFT JOIN Rating R ON P.product_id = R.product_id
        WHERE C.user_id <> @user_id 
          AND C.product_id IN (
              SELECT product_id 
              FROM Cart 
              WHERE user_id = @user_id
          )
        GROUP BY P.product_id, P.name
    )

    SELECT *
    FROM CombinedRecommendations
    ORDER BY Source;
END;

DROP PROCEDURE IF EXISTS Recommendations;
EXEC sp_helptext 'Recommendations';

EXEC Recommendations @user_id = 1;
---------------------------------------------------------------

------------------------------------------------------------------------------------------
--get prices of the products after discount and all deals details.
SELECT 
    P.product_id AS Product_ID,
    P.name AS Product_Name,
    P.price AS Original_Price,
    PR.discount_percentage AS Discount_Percentage,
    (P.price - (P.price * PR.discount_percentage / 100)) AS Discounted_Price,
    PR.name AS Promotion_Name,
    PR.start_date AS Start_Date,
    PR.end_date AS End_Date
FROM Product P
JOIN ProductPromotions PP ON P.product_id = PP.product_id
JOIN Promotions PR ON PP.promo_id = PR.promo_id
ORDER BY PR.start_date DESC;

--notify user about restocked products
SELECT w.user_id, p.name 
FROM Wishlist w 
JOIN Product p ON w.product_id = p.product_id 
WHERE p.stock_quantity > 0;

--fetching returns(user-speicific)
CREATE PROCEDURE GetReturns
    @user_id INT
AS
BEGIN
    SELECT 
        C.complaint_id AS return_id, 
        U.username, 
        P.name AS Product, 
        C.description AS reason, 
        C.status, 
        C.created_at
    FROM Complaint C
    JOIN Orders O ON C.order_id = O.order_id
    JOIN Users U ON O.user_id = U.user_id
    JOIN OrderDetails OD ON O.order_id = OD.order_id
    JOIN Product P ON OD.product_id = P.product_id
    WHERE O.user_id = @user_id
      --AND C.description LIKE '%return%';
END;


-- Execute for a specific user
EXEC GetReturns @user_id = 2;



DECLARE @user_id INT = 1; 

-- Check if all products in the cart have enough stock
SELECT C.product_id, P.name, P.stock_quantity, C.quantity
FROM Cart C
JOIN Product P ON C.product_id = P.product_id
WHERE C.user_id = @user_id 
AND C.quantity > P.stock_quantity;

BEGIN TRANSACTION;
DECLARE @user_id INT = 1;  
DECLARE @order_id INT;

-- Check stock availability before proceeding
IF NOT EXISTS (
    SELECT 1
    FROM Cart C
    JOIN Product P ON C.product_id = P.product_id
    WHERE C.user_id = @user_id 
    AND C.quantity > P.stock_quantity
)
BEGIN
    -- Insert into Orders table
    INSERT INTO Orders (user_id, order_date, status)
    VALUES (@user_id, GETDATE(), 'Processing');
    SET @order_id = SCOPE_IDENTITY();

    -- Move cart items to OrderDetails and reduce stock
    INSERT INTO OrderDetails (order_id, product_id, quantity, price)
    SELECT @order_id, C.product_id, C.quantity, P.price
    FROM Cart C
    JOIN Product P ON C.product_id = P.product_id
    WHERE C.user_id = @user_id;

    -- Update stock quantity
    UPDATE P
    SET P.stock_quantity = P.stock_quantity - C.quantity
    FROM Product P
    JOIN Cart C ON P.product_id = C.product_id
    WHERE C.user_id = @user_id;

    -- Clear user's cart after successful order placement
    DELETE FROM Cart WHERE user_id = @user_id;

    PRINT 'Order placed successfully!';
    COMMIT TRANSACTION;
END
ELSE
BEGIN
    PRINT 'Checkout failed: Some items are out of stock!';
    ROLLBACK TRANSACTION;
END;
--------------------------------
--procedure to see deals
--procedure to see deals


CREATE PROCEDURE ViewAllDeals
AS
BEGIN
    SET NOCOUNT ON;

    -- Select all promotions with associated products
    SELECT
       P.promo_id,
        P.name AS Promotion_Name,
        P.discount_percentage,
        P.start_date,
        P.end_date,
        STRING_AGG(Pr.name, ', ') WITHIN GROUP (ORDER BY Pr.name) AS Products
    FROM Promotions P
    JOIN ProductPromotions PP ON P.promo_id = PP.promo_id
    JOIN Product Pr ON PP.product_id = Pr.product_id
    GROUP BY
        P.promo_id,
        P.name,
        P.discount_percentage,
        P.start_date,
        P.end_date
    ORDER BY
        P.start_date ASC;  -- Order promotions by start date, upcoming ones first
END;

EXEC ViewAllDeals;

EXEC ViewAllDeals;
--------------------------

DROP PROCEDURE IF EXISTS recommendation
CREATE PROCEDURE recommendation
    @user_id INT
AS
BEGIN
    -- Recommend products from Browsing History that the user hasn't purchased
    SELECT DISTINCT 
        P.product_id, 
        P.name AS Recommended_Product, 
        'Browsing History' AS Source,
        COALESCE(AVG(R.rating), 0) AS Average_Rating  -- Adding the rating column (average rating)
    FROM History H
    JOIN Product P ON H.product_id = P.product_id
    LEFT JOIN Cart C ON H.product_id = C.product_id AND C.user_id = @user_id
    LEFT JOIN Rating R ON P.product_id = R.product_id  -- Join Rating to get the ratings
    WHERE H.user_id = @user_id 
    AND (C.product_id IS NULL OR C.user_id <> @user_id)  -- Ensure it's not purchased
    AND NOT EXISTS (
        SELECT 1
        FROM Wishlist W
        WHERE W.product_id = P.product_id AND W.user_id = @user_id
    )
    AND NOT EXISTS (
        SELECT 1
        FROM Cart C2
        WHERE C2.product_id = P.product_id AND C2.user_id = @user_id
    )
    GROUP BY P.product_id, P.name

    UNION

    -- Recommend products from Wishlist that the user hasn't purchased
    SELECT DISTINCT 
        P.product_id, 
        P.name AS Recommended_Product, 
        'Wishlist' AS Source,
        COALESCE(AVG(R.rating), 0) AS Average_Rating  -- Adding the rating column (average rating)
    FROM Wishlist W
    JOIN Product P ON W.product_id = P.product_id
    LEFT JOIN Cart C ON W.product_id = C.product_id AND C.user_id = @user_id
    LEFT JOIN Rating R ON P.product_id = R.product_id  -- Join Rating to get the ratings
    WHERE W.user_id = @user_id 
    AND (C.product_id IS NULL OR C.user_id <> @user_id)  -- Ensure it's not purchased
    AND NOT EXISTS (
        SELECT 1
        FROM History H
        WHERE H.product_id = P.product_id AND H.user_id = @user_id
    )
    AND NOT EXISTS (
        SELECT 1
        FROM Cart C2
        WHERE C2.product_id = P.product_id AND C2.user_id = @user_id
    )
    GROUP BY P.product_id, P.name

    UNION

    -- Recommend products frequently bought by others who viewed/wishlisted similar items
    SELECT DISTINCT 
        P.product_id, 
        P.name AS Recommended_Product, 
        'Frequently Bought by Others' AS Source,
        COALESCE(AVG(R.rating), 0) AS Average_Rating  -- Adding the rating column (average rating)
    FROM Cart C
    JOIN Product P ON C.product_id = P.product_id
    LEFT JOIN Rating R ON P.product_id = R.product_id  -- Join Rating to get the ratings
    WHERE C.user_id <> @user_id 
    AND C.product_id IN (
        SELECT product_id 
        FROM Cart 
        WHERE user_id = @user_id  -- Avoid recommending already purchased items
    )
    AND NOT EXISTS (
        SELECT 1
        FROM History H
        WHERE H.product_id = P.product_id AND H.user_id = @user_id
    )
    AND NOT EXISTS (
        SELECT 1
        FROM Wishlist W
        WHERE W.product_id = P.product_id AND W.user_id = @user_id
    )
    GROUP BY P.product_id, P.name

    ORDER BY Source;
END;


EXEC recommendation @user_id = 1
--------------------------------------
drop procedure GetProductAverageRating
CREATE PROCEDURE GetProductAverageRating
AS
BEGIN
    SELECT 
        p.name AS product_name,
        AVG(CAST(r.rating AS DECIMAL(3,2))) AS average_rating
    FROM 
        Product p
    LEFT JOIN 
        Rating r ON p.product_id = r.product_id
    GROUP BY 
        p.name
    ORDER BY 
        average_rating DESC;
END;

EXEC GetProductAverageRating;
--------------------------------------------
CREATE PROCEDURE AddSupplier
    @name VARCHAR(255),
    @contact_info VARCHAR(255)
AS
BEGIN
    INSERT INTO Supplier (name, contact_info)
    VALUES (@name, @contact_info);

    SELECT SCOPE_IDENTITY() AS new_supplier_id;
END;
GO
drop procedure AddSupplier
CREATE PROCEDURE AddSupplier
    @name VARCHAR(255),
    @contact_info VARCHAR(255)
AS
BEGIN
    -- Validate input
    IF @name IS NULL OR LTRIM(RTRIM(@name)) = ''
    BEGIN
        RAISERROR('Supplier name cannot be empty.', 16, 1);
        RETURN;
    END

    IF @contact_info IS NULL OR LTRIM(RTRIM(@contact_info)) = ''
    BEGIN
        RAISERROR('Contact info (email) cannot be empty.', 16, 1);
        RETURN;
    END

    -- Insert if valid
    INSERT INTO Supplier (name, contact_info)
    VALUES (@name, @contact_info);

    SELECT SCOPE_IDENTITY() AS new_supplier_id;
END;
GO

EXEC AddSupplier @name = 'Max&More', @contact_info = 'maxnmore@contact.com';
----------------------------------------------------
CREATE PROCEDURE UpdateOrders
    @order_id INT,
    @new_status VARCHAR(20),
    @new_product_id INT = NULL,    -- Optional: New product ID (for adding or updating product)
    @new_quantity INT = NULL,      -- Optional: New quantity for the product
    @new_price DECIMAL(10,2) = NULL -- Optional: New price for the product
AS
BEGIN
    -- 1. Update the status of the order
    UPDATE Orders
    SET status = @new_status
    WHERE order_id = @order_id;

    -- 2. Update order details if new product details are provided
    IF @new_product_id IS NOT NULL AND @new_quantity IS NOT NULL AND @new_price IS NOT NULL
    BEGIN
        -- Update the product in the order details
        UPDATE OrderDetails
        SET product_id = @new_product_id, 
            quantity = @new_quantity, 
            price = @new_price
        WHERE order_id = @order_id;
    END

    -- Optionally, you can add more logic to insert new product details if needed
    -- Example: If the product does not exist in the order, insert a new order detail

    -- Return the updated order and order details
    SELECT O.order_id, O.status, O.order_date, U.username,
           OD.order_detail_id, OD.product_id, OD.quantity, OD.price
    FROM Orders O
    JOIN Users U ON O.user_id = U.user_id
    LEFT JOIN OrderDetails OD ON O.order_id = OD.order_id
    WHERE O.order_id = @order_id;
END
EXEC UpdateOrders 
    @order_id = 1, 
    @new_status = 'Shipped';

-- Example 2: Updating order status and details of a product
EXEC UpdateOrders 
    @order_id = 1, 
    @new_status = 'Shipped', 
    @new_product_id = 2, 
    @new_quantity = 3, 
    @new_price = 2500.00;
	------------------------------------
	CREATE PROCEDURE LowStock
AS
BEGIN
    SELECT 
        name,
        category,
        MIN(stock_quantity) AS stock_quantity  -- or MAX, or AVG depending on use-case
    FROM 
        Product
    WHERE 
        stock_quantity <= 10
    GROUP BY 
        name, category
    ORDER BY 
        stock_quantity;
END;