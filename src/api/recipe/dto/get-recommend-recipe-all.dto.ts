import { Type } from "class-transformer";
import { RecommendType, recommendType } from "../common/constants/recommend-type.constant";
import { IsIn } from "class-validator";

export class GetRecommendRecipeAllDto {
  @Type(() => Number)
  @IsIn(Object.values(recommendType))
  type?: RecommendType
}