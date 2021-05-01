var express = require('express')

var routes = require('./routes.js')

var app = express()



app.use('/', routes)


app.listen(3000, function(){
  console.log('Servidor funcionando! Acesse: http://localhost:3000')
})