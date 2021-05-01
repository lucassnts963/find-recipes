const express = require('express')
const puppeteer = require('puppeteer')


const router = express.Router()


router.use(function timeLog(req, res, next){
    console.log('Time: ', Date.now())
    next()
})

router.use(express.static('public'))

var findRecipes = async (req, res) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(`https://www.tudogostoso.com.br/busca?page=${req.query.page}&q=${req.query.q}`)
  
  
    const tudoGostoso = await page.evaluate(() => {
  
      function getNumFromString(s){
        var newString = ''
        for(var i = 0; i<s.length; i++)
          if(!isNaN(s[i])) newString = newString.concat(s[i])
        
        return parseInt(newString)
      }
  
      function getRecipes(){
        var recipes = []
  
        document.querySelectorAll('.recipe-card a').forEach((item) => {
          var recipe = {}
          recipe.title = item.querySelector('.title').innerText
          recipe.link = item.href
          recipe.img = item.querySelector('.image').src
          recipe.category = item.querySelector('.category span').innerText
          recipe.author = item.querySelector('.user span').innerText
          recipe.favorites = item.querySelector('.favorites').innerText
          recipes.push(recipe)
        })
  
        for(var i = 0; i < 5; i++)
          recipes.pop()
        
        return recipes
      }
  
      function getNumPages(){
        var quantityRecipes = getNumFromString(document.querySelector('.num').innerText)
  
        if (quantityRecipes > 1005){
          return parseInt(1005/15)
        }else{
          return parseInt(quantityRecipes/15) + 1
        }
      }
  
      function getCurrentPage(){
        return parseInt(document.querySelectorAll('.current')[1].innerText)
      }
  
      return {
        recipes: getRecipes(),
        numPages: getNumPages(),
        currentPage: getCurrentPage()
      }
    })
  
    await browser.close()
  
    res.send(tudoGostoso)
  }

router.get('/busca', findRecipes)
  

module.exports = router