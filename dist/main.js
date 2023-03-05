const source = $("#recipes-template").html()
const template = Handlebars.compile(source)


let recipes = []
let pagination = 0 


const render = function(Recipes){
    recipes = Recipes
    $("#recipes").empty()
    Recipes = SpecificPagination(0)
    let newHtml = template({Recipes})
    $("#recipes").append(newHtml)
}

const renderPagination = function(Recipes){
    recipes = Recipes
    $("#recipes").empty()
    let newHtml = template({Recipes})
    $("#recipes").append(newHtml)
}

const addPaginations = function(pagination){
    $("#pagination").empty()
    for(let i=0;i<pagination;i++){
        $(".pagination").append(`<button id="${i}" onclick=getRecipesForSpecificPagination(this.id) name="button" type="button">${i}`) 
    }
}

const SpecificPagination = function(id){
    let range = id*4
    const recipesRange = []
    for(let i=range;i<range+4;i++){
        recipesRange.push(recipes[i])
    }
    // render(recipesRange)
    return recipesRange
}

const getRecipesForSpecificPagination = function(id){
    let range = id*4
    const recipesRange = []
    for(let i=range;i<range+4;i++){
        recipesRange.push(recipes[i])
    }

    console.log(recipesRange);
    // render(recipesRange)
    renderPagination(recipesRange)
}

const fetchData = function(){
    console.log("asdasdasdas");
    const ingredient = $('#ingredient-input').val()
    const filterRecipes = []
    let Recipes = []
    $.get(`/recipes/${ingredient}`, function(response){
        const contain = $('#contain-input').val()
        if(contain!==""){
            for(let res of response){
                if(!res.ingredients.includes(contain)){
                    filterRecipes.push(res)
                }
            }
            render(filterRecipes)
            pagination = Math.round(filterRecipes.length/4)
            addPaginations(pagination)
        }
        else {
            Recipes = copyResponse(response)
            render(Recipes)
            pagination = Math.round(Recipes.length/4)
            addPaginations(pagination)
        }
        
    })
}
const copyResponse = function(response){
    const Recipes = []
    for(let res of response){
        Recipes.push(res)
    }
    console.log(Recipes);
    return Recipes
}
const exa = function(ingredients,id){
    // $(`#${id}`).name
    let ingredient = recipes.find(x => x.idMeal === id).ingredients[0]
    alert(ingredient)
}

fetchData()