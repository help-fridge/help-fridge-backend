CREATE USER help_fridge_admin WITH PASSWORD '1234';

CREATE DATABASE help_fridge OWNER help_fridge_admin;

\c help_fridge help_fridge_admin

CREATE TABLE category_tb
(
  code       varchar(4)  NOT NULL,
  name       varchar(50) NOT NULL,
  expiration int         NOT NULL,
  PRIMARY KEY (code)
);

CREATE TABLE food_history_tb
(
  idx        int                      NOT NULL GENERATED ALWAYS AS IDENTITY,
  food_id    varchar(7)               NOT NULL,
  user_idx   int                      NOT NULL,
  reason_idx int                      NOT NULL,
  amount     int                      NOT NULL,
  added_at   timestamp with time zone NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT NOW(),
  PRIMARY KEY (idx)
);

CREATE TABLE food_tb
(
  id            varchar(7)  NOT NULL,
  name          varchar(50) NOT NULL,
  category_code char(4)     NOT NULL,
  unit_idx      int         NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE fridge_tb
(
  idx         int                      NOT NULL GENERATED ALWAYS AS IDENTITY,
  food_id     varchar(7)               NOT NULL,
  user_idx    int                      NOT NULL,
  storage_idx int                      NOT NULL,
  amount      int                      NOT NULL,
  added_at    timestamp with time zone NOT NULL DEFAULT NOW(),
  expired_at  timestamp with time zone NOT NULL,
  updated_at  timestamp with time zone NOT NULL DEFAULT NOW(),
  PRIMARY KEY (idx)
);

CREATE TABLE reason_tb
(
  idx  int         NOT NULL GENERATED ALWAYS AS IDENTITY,
  name varchar(10) NOT NULL UNIQUE,
  PRIMARY KEY (idx)
);

CREATE TABLE recipe_food_tb
(
  recipe_id int        NOT NULL,
  food_id   varchar(7) NOT NULL,
  PRIMARY KEY (recipe_id, food_id)
);

CREATE TABLE recipe_tb
(
  id     int         NOT NULL,
  name   varchar(50) NOT NULL,
  amount varchar(50),
  time   varchar(30),
  PRIMARY KEY (id)
);

CREATE TABLE storage_tb
(
  idx  int        NOT NULL GENERATED ALWAYS AS IDENTITY,
  name varchar(6) NOT NULL,
  PRIMARY KEY (idx)
);

CREATE TABLE unit_tb
(
  idx  int        NOT NULL GENERATED ALWAYS AS IDENTITY,
  name varchar(3) NOT NULL UNIQUE,
  PRIMARY KEY (idx)
);

CREATE TABLE user_tb
(
  idx      int          NOT NULL GENERATED ALWAYS AS IDENTITY,
  id       varchar(20)  NOT NULL UNIQUE,
  pw       varchar(100) NOT NULL,
  nickname varchar(6)   NOT NULL,
  PRIMARY KEY (idx)
);

ALTER TABLE fridge_tb
  ADD CONSTRAINT FK_user_tb_TO_fridge_tb
    FOREIGN KEY (user_idx)
    REFERENCES user_tb (idx);

ALTER TABLE fridge_tb
  ADD CONSTRAINT FK_food_tb_TO_fridge_tb
    FOREIGN KEY (food_id)
    REFERENCES food_tb (id);

ALTER TABLE recipe_food_tb
  ADD CONSTRAINT FK_food_tb_TO_recipe_food_tb
    FOREIGN KEY (food_id)
    REFERENCES food_tb (id);

ALTER TABLE recipe_food_tb
  ADD CONSTRAINT FK_recipe_tb_TO_recipe_food_tb
    FOREIGN KEY (recipe_id)
    REFERENCES recipe_tb (id);

ALTER TABLE food_tb
  ADD CONSTRAINT FK_category_tb_TO_food_tb
    FOREIGN KEY (category_code)
    REFERENCES category_tb (code);

ALTER TABLE food_tb
  ADD CONSTRAINT FK_unit_tb_TO_food_tb
    FOREIGN KEY (unit_idx)
    REFERENCES unit_tb (idx);

ALTER TABLE food_history_tb
  ADD CONSTRAINT FK_food_tb_TO_food_history_tb
    FOREIGN KEY (food_id)
    REFERENCES food_tb (id);

ALTER TABLE food_history_tb
  ADD CONSTRAINT FK_user_tb_TO_food_history_tb
    FOREIGN KEY (user_idx)
    REFERENCES user_tb (idx);

ALTER TABLE food_history_tb
  ADD CONSTRAINT FK_reason_tb_TO_food_history_tb
    FOREIGN KEY (reason_idx)
    REFERENCES reason_tb (idx);

ALTER TABLE fridge_tb
  ADD CONSTRAINT FK_storage_tb_TO_fridge_tb
    FOREIGN KEY (storage_idx)
    REFERENCES storage_tb (idx);