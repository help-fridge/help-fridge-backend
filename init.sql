CREATE USER help_fridge_admin WITH PASSWORD '1234';

CREATE DATABASE help_fridge OWNER help_fridge_admin;

\c help_fridge help_fridge_admin

CREATE TABLE food_category_tb
(
  idx  int     NOT NULL,
  name varchar NOT NULL,
  PRIMARY KEY (idx)
);

CREATE TABLE food_tb
(
  idx          int     NOT NULL GENERATED ALWAYS AS IDENTITY,
  category_idx int     NOT NULL,
  name         varchar NOT NULL,
  expiration   int     NOT NULL,
  PRIMARY KEY (idx)
);

CREATE TABLE food_unit_tb
(
  food_idx int NOT NULL,
  unit_idx int NOT NULL,
  PRIMARY KEY (food_idx, unit_idx)
);

CREATE TABLE fridge_tb
(
  idx         int                      NOT NULL GENERATED ALWAYS AS IDENTITY,
  storage_idx int                      NOT NULL,
  food_idx     int                      NOT NULL,
  unit_idx    int                      NOT NULL,
  user_idx    int                      NOT NULL,
  amount      int                      NOT NULL,
  created_at  timestamp with time zone NOT NULL DEFAULT NOW(),
  expired_at  timestamp with time zone NOT NULL,
  PRIMARY KEY (idx)
);

CREATE TABLE local_account_tb
(
  idx int     NOT NULL,
  id  varchar NOT NULL,
  pw  varchar NOT NULL,
  PRIMARY KEY (idx)
);

CREATE TABLE storage_tb
(
  idx  int     NOT NULL GENERATED ALWAYS AS IDENTITY,
  name varchar NOT NULL,
  PRIMARY KEY (idx)
);

CREATE TABLE unit_tb
(
  idx  int     NOT NULL GENERATED ALWAYS AS IDENTITY,
  name varchar NOT NULL,
  PRIMARY KEY (idx)
);

CREATE TABLE user_tb
(
  idx        int                      NOT NULL GENERATED ALWAYS AS IDENTITY,
  nickname   varchar                  NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT NOW(),
  PRIMARY KEY (idx)
);

ALTER TABLE fridge_tb
  ADD CONSTRAINT FK_storage_tb_TO_fridge_tb
    FOREIGN KEY (storage_idx)
    REFERENCES storage_tb (idx);

ALTER TABLE food_tb
  ADD CONSTRAINT FK_food_category_tb_TO_food_tb
    FOREIGN KEY (category_idx)
    REFERENCES food_category_tb (idx);

ALTER TABLE fridge_tb
  ADD CONSTRAINT FK_food_tb_TO_fridge_tb
    FOREIGN KEY (food_idx)
    REFERENCES food_tb (idx);

ALTER TABLE fridge_tb
  ADD CONSTRAINT FK_unit_tb_TO_fridge_tb
    FOREIGN KEY (unit_idx)
    REFERENCES unit_tb (idx);

ALTER TABLE fridge_tb
  ADD CONSTRAINT FK_user_tb_TO_fridge_tb
    FOREIGN KEY (user_idx)
    REFERENCES user_tb (idx);

ALTER TABLE food_unit_tb
  ADD CONSTRAINT FK_food_tb_TO_food_unit_tb
    FOREIGN KEY (food_idx)
    REFERENCES food_tb (idx);

ALTER TABLE food_unit_tb
  ADD CONSTRAINT FK_unit_tb_TO_food_unit_tb
    FOREIGN KEY (unit_idx)
    REFERENCES unit_tb (idx);

ALTER TABLE local_account_tb
  ADD CONSTRAINT FK_user_tb_TO_local_account_tb
    FOREIGN KEY (idx)
    REFERENCES user_tb (idx);
