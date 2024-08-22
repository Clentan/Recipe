import React, { useState, useEffect } from 'react';
import styles from './Recipe.module.css'; // Import the CSS module

const Recipe = () => {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]); // State to hold fetched recipes
  const key = '16d42f48-a895-44cb-87ea-d1e85e1d046f';

  useEffect(() => {
    const fetchData = async () => {
      if (search) { // Fetch only if search term is available
        try {
          const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${search}&key=${key}`);
          const data = await response.json();
          setRecipes(data.data.recipes); // Store recipes in state
          console.log(data); 
        } catch (error) {
          console.error('Error fetching the data:', error);
        }
      }
    };

    fetchData(); // Invoke the function

  }, [search]); // Dependency array to trigger fetch on search change

  return (
    <div className={styles.recipeContainer}>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent form submission
          
        }}
      >
        <input 
          type="text" 
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Update state on input change
          placeholder="Search for a recipe"
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>Search</button>
      </form>

      <div className={styles.recipeList}>
        {recipes.map((recipe) => (
          <div key={recipe.id} className={styles.recipeItem}>
            <h3>{recipe.title}</h3>
            <img src={recipe.image_url} alt={recipe.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipe;
