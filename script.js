const searchBox=document.querySelector(".searchBox")
const searchBtn=document.querySelector(".searchBtn")
const recipeContainer=document.querySelector(".recipe-container")
const recipeDetailsContent=document.querySelector(".recipe-details-content")
const recipeDetails=document.querySelector(".recipe-details")
const recipeCloseBtn=document.querySelector(".recipe-close-btn")
const sortBtn=document.querySelector(".sortBtn")
const filterSelect=document.querySelector(".filterSelect")

let mealsData=[]


// fetch
async function fetchRecipies(query){
    recipeContainer.innerHTML=`<h2>Fetching Recipes...</h2>`;
    try{
        const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response= await data.json();

        if (!response.meals){
            recipeContainer.innerHTML = `<h2>No recipes found.</h2>`;
            return;
        }

        mealsData=response.meals

        recipeContainer.innerHTML="";
        response.meals.forEach(meals=>createCard(meals));

    } catch(error){
        recipeContainer.innerHTML=`<h2>Error in Fetching Recipes...</h2>`;
    }
}



function createCard(meals){
    const recipeDiv= document.createElement("div");
    recipeDiv.className = "recipe";

    recipeDiv.innerHTML=
    `
    <img src="${meals.strMealThumb}">
    <h3><span>${meals.strMeal}</span></h3>
    <p><span>${meals.strArea}</span> Dish</p>
    <p>ID : <span>${meals.idMeal}</span></p>
    <p>Belongs to <span>${meals.strCategory}</span> Category</p>
    `

    const button= document.createElement("button");
    button.textContent="View Recipe";

    button.addEventListener("click",()=>{
        openRecipePopup(meals);
    });

    recipeDiv.appendChild(button)
    recipeContainer.appendChild(recipeDiv)
}


// sort
sortBtn.addEventListener("click",()=>{
    const sorted=[...mealsData].sort((a,b)=>
        Number(a.idMeal)-Number(b.idMeal)
    );

    recipeContainer.innerHTML="";
    sorted.forEach(meals=>createCard(meals));
});


// filter
filterSelect.addEventListener("change",()=>{

    let filtered;

    if(filterSelect.value===""){
        filtered=mealsData;
    }else{
        filtered=mealsData.filter(meals=>
            meals.strCategory===filterSelect.value
        );
    }

    recipeContainer.innerHTML="";
    filtered.forEach(meals=>createCard(meals));
});


// ingredients
const fetchIngredients = (meal) => {
  let ingredients = "";

  Object.keys(meal)
    .filter(key => key.slice(0,13) === "strIngredient" && meal[key] && meal[key].trim() !== "")
    .forEach(key => {
      const index = key.replace("strIngredient", "");
      const ingredient = meal[key];
      const measure = meal[`strMeasure${index}`] || "";

      ingredients += `<li>${measure} ${ingredient}</li>`;
    });

  return ingredients;
};


// popup
const openRecipePopup =(meals)=>{
    recipeDetailsContent.innerHTML=`
        <h2 class="recipeName">${meals.strMeal}</h2>

        <h3>Ingredients:</h3>
        <ul class="ingredientsList">
            ${fetchIngredients(meals)}
        </ul>

        <h3>Instructions:</h3>
        <p>${meals.strInstructions}</p>
    `
    recipeDetails.style.display="block";
}


// close btn
recipeCloseBtn.addEventListener("click",()=>{
    recipeDetails.style.display="none";
})


// search btn
searchBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    const searchInput=searchBox.value.trim();

    if(!searchInput){
        recipeContainer.innerHTML=`<h2>Type the meal in the search box.</h2>`;
        return;
    }

    fetchRecipies(searchInput)
})


// default
fetchRecipies("soup");