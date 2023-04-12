
DELETE FROM size;
DELETE FROM fiber_type ;
DELETE  FROM yarn_table;


-- Insert data into size table
INSERT INTO size (size_name) VALUES ('0 - Lace');
INSERT INTO size (size_name) VALUES ('1 - Super Fine');
INSERT INTO size (size_name) VALUES ('2 - Fine');
INSERT INTO size (size_name) VALUES ('3 - Light');
INSERT INTO size (size_name) VALUES ('4 - Medium');
INSERT INTO size (size_name) VALUES ('5 - Bulky');
INSERT INTO size (size_name) VALUES ('6 - Super Bulky');
INSERT INTO size (size_name) VALUES ('7 - Jumbo');

-- Insert data into fiber_type table
INSERT INTO fiber_type (fiber_name) VALUES ('Cotton');
INSERT INTO fiber_type (fiber_name) VALUES ('Acrylic');
INSERT INTO fiber_type (fiber_name) VALUES ('Polyester');
INSERT INTO fiber_type (fiber_name) VALUES ('Silk');
INSERT INTO fiber_type (fiber_name) VALUES ('Wool');
INSERT INTO fiber_type (fiber_name) VALUES ('Merino Wool');

-- Insert data into yarn_table table
INSERT INTO yarn_table (name_, brand, size_id, fiber_type1, color, length_, quantity)
SELECT 'Yarn Bee True Colors', 'Hobby Lobby', size.id, 2, 'Mauve', 76, 2
FROM size
WHERE size.size_name = '7 - Jumbo';
INSERT INTO yarn_table (name_, brand, size_id, fiber_type1, fiber_type2, color, length_, quantity) VALUES ('Comfy Cotton Blend', 'Lion Brand', 4, 1, 3, 'Mochaccino', 392, 1);
INSERT INTO yarn_table (name_, brand, size_id, fiber_type1, fiber_type2, color, length_, quantity) VALUES ('Comfy Cotton Blend', 'Lion Brand', 4, 1, 3, 'Whipped Cream', 392, 1);
INSERT INTO yarn_table (name_, brand, size_id, fiber_type1, fiber_type2, color, length_, quantity) VALUES ('Comfy Cotton Blend', 'Lion Brand', 4, 1, 3, 'Poppy', 392, 1);
INSERT INTO yarn_table (name_, brand, size_id, fiber_type1, fiber_type2, color, length_, quantity) VALUES ('Comfy Cotton Blend', 'Lion Brand', 4, 1, 3, 'Spectrum', 392, 1);
INSERT INTO yarn_table (name_, brand, size_id, fiber_type1, color, length_, quantity) VALUES ('I Love This Cotton', 'Hobby Lobby', 5, 1, 'Buttercup', 180, 2);
INSERT INTO yarn_table (name_, brand, size_id, fiber_type1, fiber_type2, color, length_, quantity) VALUES ('Metallic DK', 'Paintbo', 4, 1, 3, 'Tequila Sunrise', 131, 10);
INSERT INTO yarn_table (name_, brand, size_id, fiber_type1, color, length_, quantity) VALUES ('Super Saver Jumbo Stripes', 'Red Heart', 5, 2, ');
