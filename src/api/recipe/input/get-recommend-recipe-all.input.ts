import { RecommendType } from '../common/constants/recommend-type.constant';

export class GetRecommendRecipeAllInput {
  userIdx: number;
  type?: RecommendType;
}
