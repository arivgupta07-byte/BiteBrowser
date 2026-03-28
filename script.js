const searchBox=document.querySelector(".searchBox")
const searchBtn=document.querySelector(".searchBtn")
const recipeContainer=document.querySelector(".recipe-container")
const recipeDetailsContent=document.querySelector(".recipe-details-content")
const recipeDetails=document.querySelector(".recipe-details")
const recipeCloseBtn=document.querySelector(".recipe-close-btn")


// fetching recipies
async function fetchRecipies(query){
    recipeContainer.innerHTML=`<h2>Fetching Recipes...</h2>`;
    
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





}

const openRecipePopup =(meals)=>{
    recipeDetailsContent.innerHTML=`
    <h2>${meals.strMeal}</h2>
    
    `

    recipeDetails.style.display="block";



}


searchBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    const searchInput=searchBox.value.trim();
    fetchRecipies(searchInput)

    
})
