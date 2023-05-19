INSERT INTO users (name, email, password) 
VALUES ('Tausif Khan', 'engr.tausifkhan@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Jhon Lennon','john@gmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Markas Brown', 'mark@gmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Jeremy Holman','jeremy@gmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Andy Lindsay','andy@hotmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Kenny Teng','kenny@yahoo.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.')
;

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (
  1,'Beach House',
  'Description',
  'https://blog1.fkimg.com/wp-content/uploads/2015/03/Ko-Samui-Villa1.jpg',
  'https://blog1.fkimg.com/wp-content/uploads/2015/03/Ko-Samui-Villa1.jpg',
  200,1,3,5,
  'Philippines','22nd St', 'Boracay', 'Palawan', 'A12B342',
  TRUE
),
(
  3, 'Town House',
  'Description',
  'https://blog1.fkimg.com/wp-content/uploads/2015/03/Ko-Samui-Villa1.jpg',
  'https://blog1.fkimg.com/wp-content/uploads/2015/03/Ko-Samui-Villa1.jpg',
  180,0,2,2,
  'Thailand','1 St', 'Krabi', 'Krabi', 'A54BZ42',
  TRUE
),
(
  2, 'Cottege',
  'Description',
  'https://blog1.fkimg.com/wp-content/uploads/2015/03/Ko-Samui-Villa1.jpg',
  'https://blog1.fkimg.com/wp-content/uploads/2015/03/Ko-Samui-Villa1.jpg',
  150,1,1,2,
  'Philippines','22nd St', 'El Nido', 'Palawan', 'VS2B342',
  TRUE
),
(
  1, 'Tree House',
  'Description',
  'https://blog1.fkimg.com/wp-content/uploads/2015/03/Ko-Samui-Villa1.jpg',
  'https://blog1.fkimg.com/wp-content/uploads/2015/03/Ko-Samui-Villa1.jpg',
  100,0,1,1,
  'Turkey','31St', 'Istanbul', 'Istanbul', '24JK45L',
  FALSE
),
(
  4, 'Condo',
  'Description',
  'https://blog1.fkimg.com/wp-content/uploads/2015/03/Ko-Samui-Villa1.jpg',
  'https://blog1.fkimg.com/wp-content/uploads/2015/03/Ko-Samui-Villa1.jpg',
  60,1,1,1,
  'Vietnam','1st Street', 'Halong Bay', 'Hochinmin City', 'AN75342',
  TRUE
),
(
  3, 'Villa',
  'Description',
  'https://blog1.fkimg.com/wp-content/uploads/2015/03/Ko-Samui-Villa1.jpg',
  'https://blog1.fkimg.com/wp-content/uploads/2015/03/Ko-Samui-Villa1.jpg',
  100,1,2,4,
  'Bangladesh','34th Street', 'Dhaka', 'Dhaka', '1206',
  FALSE
);

INSERT INTO reservations (start_date, end_date, property_id, guest_id) 
VALUES 
('2018-09-11', '2018-09-26', 1, 2),
('2017-04-11', '2017-05-26', 2, 4),
('2019-01-20', '2019-03-15', 3, 1),
('2012-05-01', '2012-08-06', 1, 2),
('2016-07-17', '2016-09-22', 4, 3),
('2014-04-27', '2015-08-27', 3, 6)
;

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) 
VALUES 
(2, 1, 1, 5, 'message'),
(4, 2, 2, 1, 'message'),
(1, 3, 3, 5, 'message'),
(2, 1, 4, 1, 'message'),
(3, 4, 5, 3, 'message'),
(6, 3, 6, 4, 'message')
;