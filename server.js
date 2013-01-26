var express = require('express');
var app = express();

// Defining configuration
app.configure(function(){
       app.set('port', 3000);
       app.use(express.static(__dirname + '/public'));
})

app.get('/', function(req, res){
       res.send('Home');
})

app.listen(app.get('port'));
console.log('Listening on port ', app.get('port'));
