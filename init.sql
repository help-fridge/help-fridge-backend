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

INSERT INTO food_category_tb (idx, name) VALUES
(1, '과일'),
(2, '채소'),
(3, '육류'),
(4, '유제품'),
(5, '가공식품'),
(6, '음료수');

INSERT INTO food_tb (category_idx, name, expiration) VALUES
(1, '사과', 7),
(1, '바나나', 5),
(1, '오렌지', 10),
(2, '상추', 3),
(2, '시금치', 4),
(3, '소고기', 10),
(3, '닭고기', 7),
(4, '우유', 5),
(4, '요구르트', 14),
(5, '라면', 30),
(5, '김치', 14),
(6, '콜라', 90);

INSERT INTO unit_tb (name) VALUES
('개'),
('팩'),
('봉지'),
('통'),
('박스');

INSERT INTO food_unit_tb (food_idx, unit_idx) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 2),
(10, 2),
(11, 3),
(12, 4);

INSERT INTO fridge_tb (storage_idx, food_idx, unit_idx, user_idx, amount) VALUES
(1, 1, 1, 1, 3),
(1, 2, 1, 1, 5),
(1, 3, 1, 1, 2),
(2, 4, 1, 1, 4),
(2, 5, 1, 1, 6),
(3, 6, 1, 1, 8),
(3, 7, 1, 1, 10),
(3, 8, 1, 1, 12),
(2, 9, 2, 1, 20),
(2,10 ,2 ,1 ,15),
(3 ,11 ,3 ,1 ,25),
(3 ,12 ,4 ,1 ,30);

INSERT INTO recipe_tb (id, name) VALUES
(1000, '갈비찌개'),
(1001, '김치찌개'),
(1002, '된장찌개'),
(1003, '버섯찌개'),
(1004, '어묵찌개');

INSERT INTO recipe_food_tb (recipe_idx, food_idx) VALUES
(1, 2),
(1, 7),
(1, 10),
(2, 1),
(2, 3),
(2, 5),
(2, 8),
(3, 4),
(3, 6),
(4, 9),
(4, 12),
(4, 10),
(5, 1),
(5, 5),
(5, 11);