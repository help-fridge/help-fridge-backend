CREATE USER help_fridge_admin WITH PASSWORD '1234';

CREATE DATABASE help_fridge OWNER help_fridge_admin;

\c help_fridge help_fridge_admin

CREATE TABLE food_category_tb
(
  idx  int     NOT NULL GENERATED ALWAYS AS IDENTITY,
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

CREATE TABLE fridge_history_tb
(
  idx        int                      NOT NULL GENERATED ALWAYS AS IDENTITY,
  user_idx   int                      NOT NULL,
  food_idx   int                      NOT NULL,
  unit_idx   int                      NOT NULL,
  reason_idx int                      NOT NULL,
  amount     int                      NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT NOW(),
  PRIMARY KEY (idx)
);

COMMENT ON TABLE fridge_history_tb IS '냉장고 음식 처리 기록 테이블';

CREATE TABLE fridge_tb
(
  idx         int                      NOT NULL GENERATED ALWAYS AS IDENTITY,
  storage_idx int                      NOT NULL,
  food_idx    int                      NOT NULL,
  unit_idx    int                      NOT NULL,
  user_idx    int                      NOT NULL,
  amount      int                      NOT NULL,
  created_at  timestamp with time zone NOT NULL DEFAULT NOW(),
  expired_at  timestamp with time zone,
  PRIMARY KEY (idx)
);

COMMENT ON TABLE fridge_tb IS '냉장고와 음식 매핑 테이블';

CREATE TABLE history_reason_tb
(
  idx  int     NOT NULL GENERATED ALWAYS AS IDENTITY,
  name varchar NOT NULL,
  PRIMARY KEY (idx)
);

CREATE TABLE local_account_tb
(
  idx int     NOT NULL,
  id  varchar NOT NULL UNIQUE,
  pw  varchar NOT NULL,
  PRIMARY KEY (idx)
);

CREATE TABLE recipe_food_tb
(
  recipe_idx int NOT NULL,
  food_idx   int NOT NULL,
  PRIMARY KEY (recipe_idx, food_idx)
);

CREATE TABLE recipe_tb
(
  idx  int     NOT NULL GENERATED ALWAYS AS IDENTITY,
  id   int     NOT NULL,
  name varchar NOT NULL,
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

ALTER TABLE fridge_history_tb
  ADD CONSTRAINT FK_user_tb_TO_fridge_history_tb
    FOREIGN KEY (user_idx)
    REFERENCES user_tb (idx);

ALTER TABLE fridge_history_tb
  ADD CONSTRAINT FK_food_tb_TO_fridge_history_tb
    FOREIGN KEY (food_idx)
    REFERENCES food_tb (idx);

ALTER TABLE fridge_history_tb
  ADD CONSTRAINT FK_unit_tb_TO_fridge_history_tb
    FOREIGN KEY (unit_idx)
    REFERENCES unit_tb (idx);

ALTER TABLE fridge_history_tb
  ADD CONSTRAINT FK_history_reason_tb_TO_fridge_history_tb
    FOREIGN KEY (reason_idx)
    REFERENCES history_reason_tb (idx);

ALTER TABLE recipe_food_tb
  ADD CONSTRAINT FK_recipe_tb_TO_recipe_food_tb
    FOREIGN KEY (recipe_idx)
    REFERENCES recipe_tb (idx);

ALTER TABLE recipe_food_tb
  ADD CONSTRAINT FK_food_tb_TO_recipe_food_tb
    FOREIGN KEY (food_idx)
    REFERENCES food_tb (idx);


-- USER seed
INSERT INTO user_tb (nickname) VALUES 
('user1'); -- 1

-- LOCAL ACCOUNT seed
INSERT INTO local_account_tb (idx, id, pw) VALUES 
(1, 'guest1234', '$2b$10$02Dvy3Oh5uo7OqJM0NgNou76PQLUqL2rkUj5FTOKZ7d8YmB8so9fa');

-- HISTORY REASON seed
INSERT INTO history_reason_tb (name) VALUES
('폐기'),
('섭취');

INSERT INTO storage_tb (name) VALUES
('냉장'),
('냉동'),
('서랍');