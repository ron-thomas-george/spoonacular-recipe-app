import { FormEvent, useRef, useState } from "react";
import "./App.css";
import { Recipe } from "./types";
import RecipeCard from "./components/RecipeCard";
import { searchRecipes } from "./API";
import RecipeModal from "./components/RecipeModal";
function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
    undefined
  );

  const pageNumber = useRef(0);

  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const { results } = await searchRecipes(searchTerm, 1);
      setRecipes(results);
      pageNumber.current = 1;
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewMoreClick = async () => {
    try {
      const nextPage = pageNumber.current + 1;
      const nextRecipes = await searchRecipes(searchTerm, nextPage);
      setRecipes((prevRecipes) => [...prevRecipes, ...nextRecipes.results]);
      pageNumber.current = nextPage;
    } catch (error) {}
  };

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };
  return (
    <>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          required
          placeholder="Enter a search term"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {recipes.map((recipe: Recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onClick={() => handleRecipeClick(recipe)}
        />
      ))}
      <button onClick={handleViewMoreClick}>View More</button>
      <div>
        {selectedRecipe && (
          <RecipeModal
            recipeId={selectedRecipe.id.toString()}
            onClose={() => setSelectedRecipe(undefined)}
          />
        )}
      </div>
    </>
  );
}

export default App;
