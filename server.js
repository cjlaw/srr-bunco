//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/bunco'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname,'/dist/bunco/index.html'));
});

// Start the app by listening on the default Heroku port
let port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Express server listening on port ${port}!`);
});