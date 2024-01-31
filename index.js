require('dotenv').config()
var express = require('express');
var cors = require('cors');
const { default: mongoose } = require('mongoose');
const multer = require('multer');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

const upload = multer({dest: './public/data/upload'})

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
  console.log("MongoDB connection established")
}).catch(() => {
  console.error("Invalid connection", error)
})

app.get('/', function (req, res) {
  
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single('upfile'), (req, res) => {
//upload('upfile') from html gives us access to req.file
const { originalname, nametype, size } = req.file
res.json({
 name: originalname, 
 type: nametype, 
 size: size
})
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
