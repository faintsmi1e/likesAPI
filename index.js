const http = require('http');
const fs = require('fs');
const port = process.env.PORT || 8080;

const server = new http.Server();

server.on('request', function(req, res) {
  res.setHeader('Content-type','application/json');
 
  
  fs.readFile('likes.json', 'utf8', function (error, data) {
    if (!data) {
      const newJson = {
        likes: 0,
      };
      let json = JSON.stringify(newJson);
      
      fs.writeFile('likes.json', json, 'utf8', (err) => {
        console.log('Окей, ты меня запустил. Ты доволен?');
        if (err) {
          console.log(err);
        }
      });
      
    }else {
      const likesObject = JSON.parse(data);
      switch(req.url) {
          case '/stats': 
            res.writeHead(200);
            res.write(JSON.stringify(likesObject));
            break;
          case '/like': 
            res.writeHead(200);
            likesObject.likes += 1;
            break;
          case '/dislike': 
            res.writeHead(200);
            likesObject.likes -= 1;
            break;
          default : 
            res.writeHead(404);
            res.write(JSON.stringify({status : 'err'}));


      }
      let json = JSON.stringify(likesObject);
      fs.writeFile('likes.json', json, 'utf8', (err) => {
        if (err) {
          console.log(err);
        }
      });
      
      
    };
    res.end();
  });
  
  
});

server.listen(port);