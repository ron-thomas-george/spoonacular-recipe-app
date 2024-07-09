import { useEffect, useState } from "react";
import { RecipeSummary } from "../types";
import { getRecipeSummary } from "../API";

interface Props {
  recipeId: string;
  onClose: () => void;
}

const RecipeModal: React.FC<Props> = ({ recipeId, onClose }) => {
  const [recipeSummary, setRecipeSummary] = useState<RecipeSummary | null>(
    null
  );
  useEffect(() => {
    const fetchRecipeSummary = async () => {
      try {
        const summary = await getRecipeSummary(recipeId);
        setRecipeSummary(summary);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipeSummary();
  }, [recipeId]);
  return (
    <>
      <div className="overlay">
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <span className="close-button" onClick={onClose}>
                &times;
              </span>
              <h2>{recipeSummary?.title}</h2>
              <p>{recipeSummary?.summary}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default RecipeModal;
