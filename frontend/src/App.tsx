import { FormEvent, useState } from "react";
import "./App.css";
import searchRecipes from "./API";
import { Recipe } from "./types";

function App() {
  // const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const { results } = await searchRecipes("pizza", 1);
      setRecipes(results);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSearchSubmit}>
        <button type="submit">Submit</button>
      </form>
      {recipes.map((recipe: Recipe) => (
        <ul>
          <li key={recipe.id}>{recipe.title}</li>
        </ul>
      ))}
    </>
  );
}

export default App;
