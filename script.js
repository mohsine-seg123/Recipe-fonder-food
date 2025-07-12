
 const recipeContainer=document.querySelector("#recipe_container");
 const txtSearch=document.querySelector("#txtSearch");
 const btnFind=document.querySelector(".btn")

 btnFind.addEventListener("click",()=>loadRecipes(txtSearch.value.trim()));

 txtSearch.addEventListener("keyup", (e) => {
  const inputVal = txtSearch.value.trim();
  if (e.key === "Enter" && inputVal !== "") {
    loadRecipes(inputVal);
  }
});

const setScrollPosition=()=>{
    recipeContainer.scrollTo({top:0, behavior: "smooth"});
}

function loadRecipes(type = 'chicken') {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(type)}`;
  fetch(url)
    .then(res => res.json())
    .then((data) => 
         renderRecipies(data.meals))
    .catch((error) => console.log(error))
    .finally(() => setScrollPosition())
}

loadRecipes(); 

const getRecipeStepsStr = (instructions = "") => {
  const steps = instructions.split(/\r?\n/).filter(step => step.trim() !== '');

  let str = "";
  for (const step of steps) {
    str += `<li>${step.trim()}</li>`;
  }
  return str;
}

const renderRecipies = (recipeList =[]) =>{
    recipeContainer.innerHTML=";"
    recipeList.forEach((meal)=>{
        const {
            strMeal: recipeTitle,
            strInstructions: ingredientLines,
            strMealThumb: image,
        } = meal;

   console.log(ingredientLines);
       const recipeStepStr = getRecipeStepsStr(ingredientLines);
        const htmlStr =` 
            <div class="recipe">
               <div class="recipe_title">${recipeTitle}</div>
               <div class="recipe_img">
                   <img alt="Recipe" src="${image}">
               </div> 
               <div class="recipe_text">
                 <ul>
                   ${recipeStepStr};
                 </ul>
               </div>
            </div>
        </div>`;
        recipeContainer.insertAdjacentHTML("beforeend",htmlStr)
    }
)
}
