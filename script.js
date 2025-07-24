function searchRecipes(){
    const searchInput = document.getElementById('searchInput').value || "chicken"; // Corrected: getElementById (singular 'Element')
    const recipesDiv = document.getElementById('recipes'); // Corrected: Changed 'notFound' to 'recipes' to target the correct div
    const notFoundDiv = document.getElementById('notFound'); // Added to correctly target the notFound div
   
    recipesDiv.innerHTML = ''; // Added to clear previous search results
    notFoundDiv.style.display='none'; // Hide the notFound message when recipes are found

    if(searchInput.trim() === ''){
        notFoundDiv.innerHTML = 'Please enter a recipe name to search';
        notFoundDiv.style.display='block';
        return;
    } 
    
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`) // Corrected: Added 'https://' to the API URL
    .then(response => response.json())
    .then(data => {
     if(!data.meals){
      notFoundDiv.innerHTML= 'Recipe not found, try another search !'; // Corrected: Used 'notFoundDiv'
      notFoundDiv.style.display='block'; // Corrected: Used 'notFoundDiv'
      
     }
     else{
      data.meals.forEach(meal => {
       const card = document.createElement('div');
       card.classList.add('recipe-card');
       card.innerHTML= `
        <img src = "${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
        <p>${meal.strCategory}</p>
        <p>${meal.strArea}</p>
        <button onclick="viewRecipe('${meal.idMeal}')">
         View Recipes </button>
        `;
   

       recipesDiv.appendChild(card);
       
      });
     }
    })
   
   }
   
   function viewRecipe(mealId){
    const popupCard =document.getElementById('popupCard');
    const recipeTitle = document.getElementById('recipeTitle');
    const recipeDetails = document.getElementById('recipeDetails');   

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    

    .then(response => response.json())
    .then(data => {
        const meal =data.meals[0];
        recipeTitle.innerText = meal.strMeal;
        recipeDetails.innerText = meal.strInstructions;
        popupCard.style.display = 'block'; 

    })

  }
 function closeRecipe(){

    document.getElementById('popupCard').style.display ='none';

 }

 document.getElementById('searchInput').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      searchRecipes(); // Call the searchRecipes function
    }
  });


searchRecipes();