const searchBox=document.querySelector(".searchBox")
const searchBtn=document.querySelector(".searchBtn")
const recipeContainer=document.querySelector(".recipe-container")
const recipeDetailsContent=document.querySelector(".recipe-details-content")
const recipeDetails=document.querySelector(".recipe-details")
const recipeCloseBtn=document.querySelector(".recipe-close-btn")


// fetching recipies
async function fetchRecipies(query){
    recipeContainer.innerHTML=`<h2>Fetching Recipes...</h2>`;
    try{

        const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response= await data.json();
        // console.log(response.meals[0])
        // console.log(r esponse.meals)
        recipeContainer.innerHTML=``;
        
        response.meals.forEach(meals =>{
            const recipeDiv= document.createElement("div");
            recipeDiv.className = "recipe";
            recipeDiv.innerHTML=
            `
            <img src="${meals.strMealThumb}">
            <h3><span>${meals.strMeal}</span></h3>
            <p><span>${meals.strArea}</span> Dish</p>
            <p>Belongs to <span>${meals.strCategory}</span> Category</p>
            `
            
            const button= document.createElement(`button`);
            button.textContent="View Recipe";
            recipeDiv.appendChild(button)
            // adding event listener 
            button.addEventListener("click",()=>{
                openRecipePopup(meals);
                
            });
            
            
            
            recipeContainer.appendChild(recipeDiv)
        });
    } catch(error){
        recipeContainer.innerHTML=`<h2>Error in Fetching Recipes...</h2>`;


    }





}



// function to fetch ingredients
const fetchIngredients = (meals) => {
    
  let ingredientsList = "";

  for (let i = 1; i <= 20; i++) {
    const ingredient = meals[`strIngredient${i}`];
    
    if (ingredient) {
        const measure = meals[`strMeasure${i}`];
        ingredientsList += `<li>${measure} ${ingredient}</li>`;
    }
    else{
        break
    }
  }

  return ingredientsList;
};



const openRecipePopup =(meals)=>{
    recipeDetailsContent.innerHTML=`
    <h2 class="recipeName">${meals.strMeal}</h2>
    <h3>Ingredents:</h3>
    <ul class="ingredientsList">${fetchIngredients(meals)}</ul>
    <div class="recipeInstructions">
        <h3>Instructions:</h3>
        <p>${meals.strInstructions }</p>
    <div/>
    `

    

    recipeDetails.style.display="block";



}


// close btn
recipeCloseBtn.addEventListener("click",()=>{
    recipeDetails.style.display="none";

})




searchBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    const searchInput=searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML=`
        <h2>Type the meal in the search box.</h2>
        `;
        return;

    }
    fetchRecipies(searchInput)

    
})
