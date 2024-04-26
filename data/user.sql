CREATE TABLE Users (
 id int NOT NULL,
 email varchar(255) NOT NULL,
 password varchar(255) NOT NULL
);

--test data
INSERT INTO Users (id, email, password) VALUES
(1, 'zeeshan@zeeshan.com', 'zeeshan123'),
(2, 'rin@rin.com', 'rin123'),
(3, 'evie@evie.com', 'evie123'),
(4, 'betty@betty.com', 'betty123');

--set primary key
ALTER TABLE Users
 ADD PRIMARY KEY (id);

--auto generate new ids
ALTER TABLE Users
 MODIFY id int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;