import { Recipe } from "../types";

interface Props {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: Props) => {
  return (
    <>
      <img src={recipe.image}></img>
      <h3>{recipe.title}</h3>
    </>
  );
};

export default RecipeCard;
