const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('config')
const app = express();

function getCurrentTime(){
  let date = new Date();
  let minutes = date.getMinutes()
  let hours = date.getHours()
  minutes =  minutes < 10 ? '0' + minutes : minutes;
  hours = hours < 10 ? '0' + hours : hours;
  return hours + ":" + minutes
}

app.set('view engine', 'ejs')
app.use(express.static('views'));

app.use(bodyParser.json());

  mongoose.connect(`mongodb://${config.mongoPath}`);

  const post = new mongoose.Schema({
    coords: String,
    id: String,
    userName: String,
    text: String,
    address: String,
    time: String,
    photoLinks: String
  })
  const postModel = mongoose.model('posts', post)

app.use(bodyParser.urlencoded({ extended: false }));

// set storage engine
const storage = multer.diskStorage({
  destination: './views/uploads/',
  filename: function(req, file, cb){
    let ip = getIP(req).split('')
                       .map(e => e == ':' || e == '.' ? e = '-' : e )
                       .join('')
    cb(null,  req.postID + '-' + Date.now()  + path.extname(file.originalname));
  }
});

//init upload
const upload = multer({
  storage: storage,
  limits: {fileSize: 10000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).array('myImage', 10);

//check file type

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

app.get('/', (req,res) => {
postModel.find({}, (err, posts) => {
  for (let i = 0; i < posts.length; i++) {
    posts[i] = posts[i].toObject()
    delete posts[i].__v
    delete posts[i]._id
    let photoLinks = posts[i].photoLinks.split('===')
    posts[i].photoLinks = photoLinks
  }
    if (err) throw err;
    res.render('index', {data: posts})
  })
});

//..................suport functions...................
function getAttachedPhoto(photoArr) {
  photoLinksString = '';
  photoArr.forEach(photo => {
    photoLinksString += "===" + "uploads/"+ path.basename(photo.path)
  })
  return photoLinksString
}


// GET-REQ-IP FUNCTION
function getIP(req){
  return req.headers['x-forwarded-for'] ||

     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);
}
function googleCoordsToString(coords){
  let newCords = coords.slice(0,-1)
                 .slice(1)
                 .split(', ')
  let obj = {
    lat: newCords[0],
    lng: newCords[1]
  }
  return JSON.stringify(obj)
}
//'''''''''''''''''''''''''''''''''''''''''''''''..

app.post('/upload', (req,res) => {
  req.postID = Math.floor(Math.random() * 99999999);
  upload(req, res, (err) => {
    if(err){
      res.send(JSON.stringify(err))
    } else {
      if(req.file == 'undifined'){
        res.send(JSON.stringify('error'))
      } else {
        console.log(req.body);
          let response = {
            coords: googleCoordsToString(req.body.coords),
            id: req.postID,
            address: req.body.address,
            userName: req.body.userName,
            text: req.body.text,
            time: getCurrentTime(),
            photoLinks: getAttachedPhoto(req.files)
          }

          postModel(response).save((err) => {
            if(err) throw err
          })
        res.send(JSON.stringify(response))
      }
    }
  })
})
app.listen(3000, () => console.log('port 3000'))
