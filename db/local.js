const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: './views/uploads/',
  filename: function(req, file, cb){
    cb(null,  req.postID + '-' + Date.now() + path.extname(file.originalname));
  }
})

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

const upload = multer({
  storage: storage,
  limits: {fileSize: 10000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).array('myImage', 10);

module.exports = upload
