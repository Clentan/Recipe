import React, { useState, useEffect } from 'react';
import Pagenav from '../component/pagenav';
import Display from '../component/Display';
import RecipeHeader from '../component/RecipeHeader';
import styles from '../component/Recipe.module.css'; // Assuming this CSS module is correctly imported

export default function Home() {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(13); // Number of recipes per page
  const [addRecipeTitle, setAddRecipeTitle] = useState('');
  const [addRecipeDescription, setAddRecipeDescription] = useState('');
  const [addRecipeInstructions, setAddRecipeInstructions] = useState('');
  const [addedRecipes, setAddedRecipes] = useState([]);
  const key = '16d42f48-a895-44cb-87ea-d1e85e1d046f';

  useEffect(() => {
    const fetchData = async () => {
      if (search) {
        try {
          const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${search}&key=${key}`);
          const data = await response.json();
          setRecipes(data.data.recipes);
          setCurrentPage(1); // Reset to first page on new search
          console.log(data);
        } catch (error) {
          console.error('Error fetching the data:', error);
        }
      }
    };

    fetchData();
  }, [search]);

  useEffect(() => {
    // Load recipes from localStorage when component mounts
    const storedRecipes = JSON.parse(localStorage.getItem('addedRecipes')) || [];
    setAddedRecipes(storedRecipes);
  }, []);

  useEffect(() => {
    // Save recipes to localStorage whenever addedRecipes changes
    localStorage.setItem('addedRecipes', JSON.stringify(addedRecipes));
  }, [addedRecipes]);

  const handleRecipeClick = async (recipe) => {
    try {
      const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${recipe.id}?key=${key}`);
      const data = await response.json();
      setSelectedRecipe(data.data.recipe);
    } catch (error) {
      console.error('Error fetching the selected recipe:', error);
    }
  };

  const handleAddRecipe = (e) => {
    e.preventDefault();
    if (addRecipeTitle.trim()) {
      const newRecipe = {
        title: addRecipeTitle,
        description: addRecipeDescription,
        instructions: addRecipeInstructions,
      };
      setAddedRecipes([...addedRecipes, newRecipe]);
      setAddRecipeTitle(''); // Clear the input fields
      setAddRecipeDescription('');
      setAddRecipeInstructions('');
    }
  };

  const handleRemoveRecipe = (index) => {
    const updatedRecipes = addedRecipes.filter((_, i) => i !== index);
    setAddedRecipes(updatedRecipes);
  };

  // Get current recipes for pagination
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  // Handle page change
  const nextPage = () => {
    if (currentPage < Math.ceil(recipes.length / recipesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      {/* Navigation Component */}
      <Pagenav />

      {/* Display Component */}
      <Display />

      {/* Recipe Header Component */}
      <RecipeHeader />

      {/* Recipe Search and List */}
      <div className={styles.recipeContainer}>
        <form onSubmit={(e) => e.preventDefault()}>
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)} // Update search state
            placeholder="Search for a recipe"
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>Search</button>
        </form>
      </div>

      {/* Static List/Table Elements */}
      <div className='tableList'>
        {/* List of Searched Recipes with Pagination */}
        <div>
          <ul className='table'>
            <h1>List</h1>
            {currentRecipes.map((recipe) => (
              <li 
                key={recipe.id} 
                className='list' 
                onClick={() => handleRecipeClick(recipe)}
              >
                {recipe.title}
              </li>
            ))}
          </ul>
          <div className='pagination'>
            <button className='previus' onClick={prevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <button className='next' onClick={nextPage} disabled={currentPage === Math.ceil(recipes.length / recipesPerPage)}>
              Next
            </button>
          </div>
        </div>

        {/* Selected Recipe Display */}
        <div>
          <ul className='table'>
            <h1>Selected</h1>
            {selectedRecipe && (
              <li className='list'>
                <h3>{selectedRecipe.title}</h3>
                <img 
                  src={selectedRecipe.image_url} 
                  alt={selectedRecipe.title} 
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
                <div className='instructions'>
                  <h4>Instructions:</h4>
                  <p>{selectedRecipe.instructions}</p>
                </div>
              </li>
            )}
          </ul>
        </div>

        {/* Add Recipe Section */}
        <div>
          <ul className='table'>
          <h1>Add Recipe</h1>
          <form className='OwnRecipe' onSubmit={handleAddRecipe}>
              <input
                value={addRecipeTitle}
                onChange={(e) => setAddRecipeTitle(e.target.value)}
                type="text"
                placeholder="Enter Recipe Title"
              />
              <input
                value={addRecipeDescription}
                onChange={(e) => setAddRecipeDescription(e.target.value)}
                type="text"
                placeholder="Enter Recipe Description"
              />
              <textarea
                value={addRecipeInstructions}
                onChange={(e) => setAddRecipeInstructions(e.target.value)}
                placeholder="Enter Recipe Instructions"
              />
              <button type="submit">ADD</button>
            </form>
           
          
            <ul>
              {addedRecipes.map((recipe, index) => (
                <li key={index} className='list'>
                  <h3>{recipe.title}</h3>
                  <p>{recipe.description}</p>
                  <div className='instructions'>
                    <h4>Instructions:</h4>
                    <p>{recipe.instructions}</p>
                  </div>
                  <button onClick={() => handleRemoveRecipe(index)}>Remove</button>
                </li>
              ))}
            </ul>
          </ul>
        </div>
      </div> 
    </div>
  );
}
