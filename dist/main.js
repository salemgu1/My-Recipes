const source = $("#recipes-template").html()
const template = Handlebars.compile(source)


let recipes = []


const render = function(Recipes){
    recipes = Recipes
    $("#recipes").empty()
    let newHtml = template({Recipes})
    $("#recipes").append(newHtml)
}


const fetchData = function(){
    console.log("asdasdasdas");
    const ingredient = $('#ingredient-input').val()
    const filterRecipes = []
    $.get(`/recipes/${ingredient}`, function(response){
        const contain = $('#contain-input').val()
        if(contain!==""){
            for(let res of response){
                if(!res.ingredients.includes(contain)){
                    filterRecipes.push(res)
                }
            }
            render(filterRecipes)
        }
        else {
            render(response)
        }
        
    })
}

const exa = function(ingredients,id){
    // $(`#${id}`).name
    let ingredient = recipes.find(x => x.idMeal === id).ingredients[0]
    alert(ingredient)
}

fetchData()