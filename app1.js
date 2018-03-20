
// AIzaSyD7IM_w5G6ITDISLXlfTrDJeIWGIxbgkLE

const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');

app.set('view engine', 'ejs')
app.use(express.static('views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// .................................MONGO.......................................
mongoose.connect('mongodb://finda-poliz:finda-poliz@ds261128.mlab.com:61128/finda-poliz');

const post = new mongoose.Schema({
  ip: String,
  userName: String,
  text: String,
  address: String,
  time: String,
  id: Number
})
const postModel = mongoose.model('posts', post)
//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''


// ................................MULTER...................................
const storage = multer.diskStorage({
  destination: './views/uploads/',
  filename: function(req, file, cb){
    let ip = getIP(req).split('')
                       .map(e => e == ':' || e == '.' ? e = '-' : e )
                       .join('')
    cb(null,  req.postID + '-' + Date.now()  + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {fileSize: 1000000},
  fileFilter: function(req, file, cb){
    console.log(req.postID);

    checkFileType(file, cb);
  }
}).array('myImage', 3);

function checkFileType(file, cb){
  //allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  //check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //Check mine
  const mimetype = filetypes.test(file.mimetype);
  if(mimetype && extname){
    return cb(null, true);
  } else {
    cb('Error: Images only');
  }
}
//'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''





//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''



// .......................GET HANDLER................................

app.get('/', (req,res) => {

  var dirPath = path.join(__dirname, 'views/uploads');
  var photoNames = [];

  // MAKING PHOTO-NAMES ARRAY FROM /uploads
  fs.readdir(dirPath, function(err, list){
      if(err) throw err;
      for(let i = 0; i < list.length; i++){
          if(path.extname(list[i])=== '.jpg'
          || path.extname(list[i])=== '.png'
          || path.extname(list[i])=== '.jpeg'
          || path.extname(list[i])=== '.gif' ){
               photoNames.push(list[i]);
          }
      }
  });

  // ..................ATTACH PHOTOLINKS FUNCTION.........................

  function attachPhotoLinks(posts) {
    console.log(posts);
    for(let i = 0; i < posts.length; i++){
      posts[i] = posts[i].toObject();
      delete obj._id;
      delete obj.__v;
      posts[i].photoLinks = [];
      let postID = posts[i].id;
      for(let j = 0; j < photoNames.length; j++){
        if(postID == photoNames[j].slice(0,8)){
          posts[i].photoLinks.push("/uploads/" + photoNames[j])
        }
      }
    }
    return posts
  }


// FINDING POSTS IN DB AND ATTACHING PHOTO LINKS FROM FOLDER /uploads
let dataForFrontend;
postModel.find({}, (err, posts) => {

    if (err) throw err;
    dataForFrontend = attachPhotoLinks(posts).slice()
    console.log(2);
    //render page
    console.log(dataForFrontend);
    res.render('index', {data: dataForFrontend})
  })
});
//'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''


function getDate(){
  let date = new Date();
  return date.getHours() + ":" + date.getMinutes()
}

// GET-REQ-IP FUNCTION
function getIP(req){
  return req.headers['x-forwarded-for'] ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);
}

// .........BUILD RESPONSE FUNCTION.........
function buildResponse(res) {
  res.ip = getIP(req);
  res.id = req.postID;
  res.time = getDate();
  res = attachPhotoLinks(res, false)
}
//'''''''''''''''''''''''''''''''''''''''''''

//..................POST HANDLER...................
app.post('/upload', (req,res) => {

  req.postID = Math.floor(Math.random() * 99999999);

  upload(req, res, (err) => {
    if(err){
      res.send(JSON.stringify(err))
    } else {
      if(req.file == 'undifined'){
        res.send(JSON.stringify('error'))
      } else {
          let response = buildResponse(req.body);
          postModel(response).save((err) => {
            if(err) throw err
          })
        res.send(JSON.stringify(response))
      }
    }
  })
})
//''''''''''''''''''''''''''''''''''''''''''''''''


app.listen(3000, () => console.log('port 3000'))
