import { Recipe } from "../types";

interface Props {
  recipe: Recipe;
  onClick: () => void;
}

const RecipeCard = ({ recipe, onClick }: Props) => {
  return (
    <>
      <div onClick={onClick}>
        <img src={recipe.image}></img>
        <h3>{recipe.title}</h3>
      </div>
    </>
  );
};

export default RecipeCard;
