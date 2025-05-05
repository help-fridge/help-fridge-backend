CREATE USER help_fridge_admin WITH PASSWORD '1234';

CREATE DATABASE help_fridge OWNER help_fridge_admin;

\c help_fridge help_fridge_admin

CREATE TABLE category_tb
(
  code                 int     NOT NULL,
  name                 varchar NOT NULL UNIQUE,
  parent_category_code int    ,
  PRIMARY KEY (code)
);

CREATE TABLE food_history_tb
(
  idx        int                      NOT NULL GENERATED ALWAYS AS IDENTITY,
  food_idx   int                      NOT NULL,
  user_idx   int                      NOT NULL,
  reason_idx int                      NOT NULL,
  amount     decimal                  NOT NULL,
  added_at   timestamp with time zone NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT NOW(),
  PRIMARY KEY (idx)
);

CREATE TABLE food_tb
(
  idx           int     NOT NULL GENERATED ALWAYS AS IDENTITY,
  category_code int     NOT NULL,
  unit_idx      int     NOT NULL,
  name          varchar NOT NULL UNIQUE,
  PRIMARY KEY (idx)
);

CREATE TABLE reason_tb
(
  idx  int     NOT NULL GENERATED ALWAYS AS IDENTITY,
  name varchar NOT NULL UNIQUE,
  PRIMARY KEY (idx)
);

CREATE TABLE recipe_ingredient_tb
(
  food_idx   int     NOT NULL,
  recipe_idx int     NOT NULL,
  amount     decimal NOT NULL,
  PRIMARY KEY (food_idx, recipe_idx)
);

CREATE TABLE recipe_tb
(
  idx  int     NOT NULL GENERATED ALWAYS AS IDENTITY,
  name varchar NOT NULL UNIQUE,
  PRIMARY KEY (idx)
);

CREATE TABLE fridge_tb
(
  idx        int                      NOT NULL GENERATED ALWAYS AS IDENTITY,
  food_idx   int                      NOT NULL,
  user_idx   int                      NOT NULL,
  amount     decimal                  NOT NULL,
  added_at   timestamp with time zone NOT NULL DEFAULT NOW(),
  expired_at timestamp with time zone NOT NULL,
  PRIMARY KEY (idx)
);

CREATE TABLE unit_tb
(
  idx  int     NOT NULL GENERATED ALWAYS AS IDENTITY,
  name varchar NOT NULL UNIQUE,
  PRIMARY KEY (idx)
);

CREATE TABLE user_tb
(
  idx  int     NOT NULL GENERATED ALWAYS AS IDENTITY,
  id   varchar NOT NULL UNIQUE,
  pw   varchar NOT NULL,
  nickname varchar NOT NULL,
  PRIMARY KEY (idx)
);

ALTER TABLE fridge_tb
  ADD CONSTRAINT FK_user_tb_TO_fridge_tb
    FOREIGN KEY (user_idx)
    REFERENCES user_tb (idx);

ALTER TABLE fridge_tb
  ADD CONSTRAINT FK_food_tb_TO_fridge_tb
    FOREIGN KEY (food_idx)
    REFERENCES food_tb (idx);

ALTER TABLE recipe_ingredient_tb
  ADD CONSTRAINT FK_food_tb_TO_recipe_ingredient_tb
    FOREIGN KEY (food_idx)
    REFERENCES food_tb (idx);

ALTER TABLE recipe_ingredient_tb
  ADD CONSTRAINT FK_recipe_tb_TO_recipe_ingredient_tb
    FOREIGN KEY (recipe_idx)
    REFERENCES recipe_tb (idx);

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
    FOREIGN KEY (food_idx)
    REFERENCES food_tb (idx);

ALTER TABLE food_history_tb
  ADD CONSTRAINT FK_user_tb_TO_food_history_tb
    FOREIGN KEY (user_idx)
    REFERENCES user_tb (idx);

ALTER TABLE food_history_tb
  ADD CONSTRAINT FK_reason_tb_TO_food_history_tb
    FOREIGN KEY (reason_idx)
    REFERENCES reason_tb (idx);

ALTER TABLE category_tb
  ADD CONSTRAINT FK_category_tb_TO_category_tb
    FOREIGN KEY (parent_category_code)
    REFERENCES category_tb (code);