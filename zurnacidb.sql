-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 27 Ara 2024, 11:37:45
-- Sunucu sürümü: 10.4.32-MariaDB
-- PHP Sürümü: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `zurnacidb`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `foods`
--

CREATE TABLE `foods` (
  `Id` int(11) NOT NULL,
  `Name` longtext NOT NULL,
  `Description` longtext NOT NULL,
  `Price` decimal(65,30) NOT NULL,
  `Image` longtext NOT NULL,
  `Category` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `foods`
--

INSERT INTO `foods` (`Id`, `Name`, `Description`, `Price`, `Image`, `Category`) VALUES
(1, '35+ Zurna', 'Food provides essential nutrients for overall health and well-being', 12.000000000000000000000000000000, 'food_1.png', 'Zurna'),
(2, 'Iskenderun Zurna', 'Food provides essential nutrients for overall health and well-being', 18.000000000000000000000000000000, 'food_2.png', 'Zurna'),
(3, 'Hatay Usulu 70cm Zurna', 'Food provides essential nutrients for overall health and well-being', 16.000000000000000000000000000000, 'food_3.png', 'Zurna'),
(4, 'Et Zurna', 'Food provides essential nutrients for overall health and well-being', 24.000000000000000000000000000000, 'food_4.png', 'Zurna'),
(5, 'Greek salad', 'Food provides essential nutrients for overall health and well-being', 14.000000000000000000000000000000, 'food_5.png', 'Salad'),
(6, 'Veg salad', 'Food provides essential nutrients for overall health and well-being', 12.000000000000000000000000000000, 'food_6.png', 'Salad'),
(7, 'Clover Salad', 'Food provides essential nutrients for overall health and well-being', 20.000000000000000000000000000000, 'food_7.png', 'Salad'),
(8, 'Chicken Salad', 'Food provides essential nutrients for overall health and well-being', 15.000000000000000000000000000000, 'food_8.png', 'Salad'),
(9, 'Ripple Ice Cream', 'Food provides essential nutrients for overall health and well-being', 14.000000000000000000000000000000, 'food_9.png', 'Deserts'),
(10, 'Fruit Ice Cream', 'Food provides essential nutrients for overall health and well-being', 22.000000000000000000000000000000, 'food_10.png', 'Deserts'),
(11, 'Jar Ice Cream', 'Food provides essential nutrients for overall health and well-being', 10.000000000000000000000000000000, 'food_11.png', 'Deserts'),
(12, 'Vanilla Ice Cream', 'Food provides essential nutrients for overall health and well-being', 12.000000000000000000000000000000, 'food_12.png', 'Deserts'),
(13, 'Chicken Sandwich', 'Food provides essential nutrients for overall health and well-being', 12.000000000000000000000000000000, 'food_13.png', 'Sandwich'),
(14, 'Vegan Sandwich', 'Food provides essential nutrients for overall health and well-being', 18.000000000000000000000000000000, 'food_14.png', 'Sandwich'),
(15, 'Grilled Sandwich', 'Food provides essential nutrients for overall health and well-being', 16.000000000000000000000000000000, 'food_15.png', 'Sandwich'),
(16, 'Bread Sandwich', 'Food provides essential nutrients for overall health and well-being', 24.000000000000000000000000000000, 'food_16.png', 'Sandwich'),
(17, 'Cup Cake', 'Food provides essential nutrients for overall health and well-being', 14.000000000000000000000000000000, 'food_17.png', 'Cake'),
(18, 'Vegan Cake', 'Food provides essential nutrients for overall health and well-being', 12.000000000000000000000000000000, 'food_18.png', 'Cake'),
(19, 'Butterscotch Cake', 'Food provides essential nutrients for overall health and well-being', 20.000000000000000000000000000000, 'food_19.png', 'Cake'),
(20, 'Sliced Cake', 'Food provides essential nutrients for overall health and well-being', 15.000000000000000000000000000000, 'food_20.png', 'Cake'),
(21, 'Garlic Mushroom', 'Food provides essential nutrients for overall health and well-being', 14.000000000000000000000000000000, 'food_21.png', 'Pure Veg'),
(22, 'Fried Cauliflower', 'Food provides essential nutrients for overall health and well-being', 22.000000000000000000000000000000, 'food_22.png', 'Pure Veg'),
(23, 'Mix Veg Pulao', 'Food provides essential nutrients for overall health and well-being', 10.000000000000000000000000000000, 'food_23.png', 'Pure Veg'),
(24, 'Rice Zucchini', 'Food provides essential nutrients for overall health and well-being', 12.000000000000000000000000000000, 'food_24.png', 'Pure Veg'),
(25, 'Cheese Pasta', 'Food provides essential nutrients for overall health and well-being', 12.000000000000000000000000000000, 'food_25.png', 'Pasta'),
(26, 'Tomato Pasta', 'Food provides essential nutrients for overall health and well-being', 18.000000000000000000000000000000, 'food_26.png', 'Pasta'),
(27, 'Creamy Pasta', 'Food provides essential nutrients for overall health and well-being', 16.000000000000000000000000000000, 'food_27.png', 'Pasta'),
(28, 'Chicken Pasta', 'Food provides essential nutrients for overall health and well-being', 24.000000000000000000000000000000, 'food_28.png', 'Pasta'),
(29, 'Buttter Noodles', 'Food provides essential nutrients for overall health and well-being', 14.000000000000000000000000000000, 'food_29.png', 'Noodles'),
(30, 'Veg Noodles', 'Food provides essential nutrients for overall health and well-being', 12.000000000000000000000000000000, 'food_30.png', 'Noodles'),
(31, 'Somen Noodles', 'Food provides essential nutrients for overall health and well-being', 20.000000000000000000000000000000, 'food_31.png', 'Noodles'),
(32, 'Cooked Noodles', 'Food provides essential nutrients for overall health and well-being', 15.000000000000000000000000000000, 'food_32.png', 'Noodles'),
(36, 'fsdasdasd', 'sdfasdasd', 33.000000000000000000000000000000, '8a03831a-dc0c-40fe-84e6-2ed2569dacdd_20241224_160609.jpg', 'Deserts'),
(37, 'asasdasdasdd', 'asdasdasdasd', 232.000000000000000000000000000000, 'aae02708-1250-4caa-97df-6f96f87b87c8_20241224_160620.jpg', 'Sandwich');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `orders`
--

CREATE TABLE `orders` (
  `Id` int(11) NOT NULL,
  `UserId` longtext NOT NULL,
  `Items` longtext NOT NULL,
  `Amount` decimal(65,30) NOT NULL,
  `Address` longtext NOT NULL,
  `Status` longtext NOT NULL,
  `Date` datetime(6) NOT NULL,
  `Payment` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

CREATE TABLE `users` (
  `Id` int(11) NOT NULL,
  `Name` longtext NOT NULL,
  `Email` longtext NOT NULL,
  `Password` longtext NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `balance` int(11) NOT NULL,
  `CartData` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`Id`, `Name`, `Email`, `Password`, `isAdmin`, `balance`, `CartData`) VALUES
(1, 'deneme', 'user@example.com', 'aaaa', 1, 0, 'string'),
(2, 'deneme', 'user1@example.com', 'aaaa', 1, 10000, 'string'),
(3, 'deneme', 'user2@example.com', 'aaaa', 0, 10000, 'string'),
(4, 'deneme', 'user3@example.com', 'aaaa', 0, 10000, 'string'),
(5, 'deneme', 'user4@example.com', 'aaaa', 0, 10000, 'string'),
(6, 'deneme', 'user5@example.com', 'aaaa', 0, 10000, 'string'),
(7, 'aa', 'aa@gmail.com', 'aaaa', 1, 11111, 'string'),
(8, 'aazxcszs', 'aaaaa@gmai.com', 'aaaa', 1, 123123, 'string');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `__efmigrationshistory`
--

CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `__efmigrationshistory`
--

INSERT INTO `__efmigrationshistory` (`MigrationId`, `ProductVersion`) VALUES
('20241223190439_initial', '8.0.2');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `foods`
--
ALTER TABLE `foods`
  ADD PRIMARY KEY (`Id`);

--
-- Tablo için indeksler `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`Id`);

--
-- Tablo için indeksler `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`);

--
-- Tablo için indeksler `__efmigrationshistory`
--
ALTER TABLE `__efmigrationshistory`
  ADD PRIMARY KEY (`MigrationId`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `foods`
--
ALTER TABLE `foods`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- Tablo için AUTO_INCREMENT değeri `orders`
--
ALTER TABLE `orders`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
