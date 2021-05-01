var card = (recipe) => {

    var img = document.createElement('img')
    img.setAttribute('class', 'image')
    img.setAttribute('src', recipe.img)

    
    var picture = document.createElement('picture')
    picture.setAttribute('class', 'picture')
    picture.appendChild(img)
    
    
    var h3 = document.createElement('h3')
    h3.appendChild(document.createTextNode(recipe.title))

    var category = document.createElement('span')
    category.setAttribute('class', 'category')
    category.appendChild(document.createTextNode(recipe.category))
    
    var user = document.createElement('span')
    user.setAttribute('class', 'user')
    user.appendChild(document.createTextNode(recipe.author))

    var favorites = document.createElement('span')
    favorites.setAttribute('class', 'favorites')
    favorites.appendChild(document.createTextNode(recipe.favorites))
    
    var divCategory = document.createElement('div')
    divCategory.setAttribute('class', 'container-category')
    divCategory.appendChild(category)
    divCategory.appendChild(user)
    divCategory.appendChild(favorites)
    
    var div = document.createElement('div')
    div.setAttribute('class', 'info')
    div.appendChild(h3)
    div.appendChild(divCategory)

    var a = document.createElement('a')
    a.href = recipe.link
    a.appendChild(picture)
    a.appendChild(div)
    
    
    var li = document.createElement('li')
    li.setAttribute('class', 'recipe-card')
    li.appendChild(a)

    
    return li
}

function getRecipes(json){
    var rootElement = document.getElementById('root')

    var lu = document.createElement('ul')
    
    var recipes = json.recipes

    for(var i = 0; i < recipes.length; i++){
        lu.appendChild(card(recipes[i]))
    }

    rootElement.appendChild(lu)
}


(async () => {
    console.log('Hello!')
    await fetch('http://192.168.0.10:3000/busca?page=1&q=farofa')
        .then(response => response.json())
        .then(getRecipes)
        .catch(err => console.err(err))
})()


//var rootElement = document.getElementById('root')