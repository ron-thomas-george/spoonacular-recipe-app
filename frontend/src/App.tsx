import { FormEvent, useRef, useState } from "react";
import "./App.css";
import searchRecipes from "./API";
import { Recipe } from "./types";
import RecipeCard from "./components/RecipeCard";
function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);

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
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
      <button onClick={handleViewMoreClick}>View More</button>
    </>
  );
}

export default App;
