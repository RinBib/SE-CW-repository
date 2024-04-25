CREATE TABLE `Users` (
 `id` int NOT NULL,
 `email` varchar(255) NOT NULL,
 `password` varchar(255) NOT NULL
);

--test data
INSERT INTO `Users` (`id`, `email`, `password`) VALUES
(1, 'zeeshan@zeeshan.com', ''),
(2, 'rin@rin.com', ''),
(3, 'evie@evie.com', ''),
(4, 'betty@betty.com', '');

--set primary key
ALTER TABLE `Users`
 ADD PRIMARY KEY (`id`);

--auto generate new ids
ALTER TABLE `Users`
 MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;