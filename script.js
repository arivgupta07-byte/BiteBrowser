const searchBox=document.querySelector(".searchBox")
const searchBtn=document.querySelector(".searchBtn")
const recipeContainer=document.querySelector(".recipe-container")


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


        recipeContainer.appendChild(recipeDiv)

    });





}

searchBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    const searchInput=searchBox.value.trim();
    fetchRecipies(searchInput)

    
})
