const express = require('express')
const mongoose = require('mongoose')
const postModel = require('../db/mongo')
const upload = require('../db/local')
const {getCurrentTime, googleCoordsToString, getAttachedPhoto} = require('./responseBuilders')

module.exports = function(app){

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
  app.use(function(req, res) {
    res.status(404).send('<h1>404 error</h1');
  });
}
