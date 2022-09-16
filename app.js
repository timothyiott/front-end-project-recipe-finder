$.get("https://www.themealdb.com/api/json/v1/1/search.php?s=pizza", (data) => {
  console.log(data);
  // var results = JSON.parse(data); // The data comes to us in JSON format, it must be parsed in to an object that we can use
  console.log(results);
});

let inputString = ''
let parseData = {}
let spanIdArray = ['firstSpan', 'secondSpan', 'thirdSpan', 'fourthSpan', 'fifthSpan', 'sixthSpan', 'seventhSpan', 'eighthSpan', 'ninthSpan', 'tenthSpan']
let spanDivIdArray = ['firstSpanDiv', 'secondSpanDiv', 'thirdSpanDiv', 'fourthSpanDiv', 'fifthSpanDiv', 'sixthSpanDiv', 'seventhSpanDiv', 'eighthSpanDiv', 'ninthSpanDiv', 'tenthSpanDiv']

//extractInfo function will grab the information from the parseData variable, create new divs, and append those divs to the 'results' div
function extractInfo(index){
  $("#results").append(`<span id=${spanIdArray[index]} class='result-card'></span>`)
    $(`#${spanIdArray[index]}`).append(`<h1 class='card-title'>${parseData['meals'][index].strMeal}</h1>`)
    $(`#${spanIdArray[index]}`).append(`<img class='card-image-left' src=${parseData['meals'][index].strMealThumb}></img>`)
    $(`#${spanIdArray[index]}`).append(`<button class="recipeDetailsButton" onClick="generateRecipeDetails(${parseData['meals'][index].idMeal})">Recipe Details</button>`)
}

//when the submit button is clicked it will request data from the requested website, delete all of the divs, and then run the extractInfo function to reload the results
$("#submit").click(function(){
  inputString = $('#search').val()

  $.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputString}`, (data) => {
    parseData = data
    $('#results').empty()
    for(let i = 0; i < 10; i++)
      extractInfo(i)
  })
})

function generateRecipeDetails(mealid){
  let recipeData = fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`)
    .then(response => response.json())
    .then(data => {
      $(`#detailResults`).empty()
      $(`#detailResults`).append(`<h1 class="card-title">${data['meals'][0].strMeal}</h1>`)
      $(`#detailResults`).append(`<div><h2 class="small-margin">Area: ${data['meals'][0].strArea}</h2><h2 class="small-margin">Category: ${data['meals'][0].strCategory}</h2></div>`)
      $(`#detailResults`).append(`<div id="ingredientsPictureInstructions"></div>`)
        $(`#ingredientsPictureInstructions`).append(`<div id="ingredientsPicture" class="flex-inner-container small-margin"></div>`)
          $(`#ingredientsPicture`).append(`<span id="listOfIngredients"></span>`)
          $(`#listOfIngredients`).append(`<h3>Ingredients</h3>`)
            for(let i = 1; i < 21; i++){
              let ingredient = data['meals'][0]["strIngredient" + i]
              let amount = data['meals'][0]["strMeasure" + i]
              if(ingredient !== "" && amount !== null){
                $(`#listOfIngredients`).append(`<li>${ingredient} - ${amount}</li>`)
              }
            }
          $(`#ingredientsPicture`).append(`<img class="card-image-right" src="${data['meals'][0].strMealThumb}"></ul>`)
        $(`#ingredientsPictureInstructions`).append(`<span id="instructions"></span>`)
          $(`#instructions`).append(`<h3 class="small-margin">Instructions:</h3>`)
          $(`#instructions`).append(`<p class="small-margin">${data['meals'][0].strInstructions}</p>`)
    })
}
