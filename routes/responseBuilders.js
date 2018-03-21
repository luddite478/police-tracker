const path = require('path')

function getCurrentTime(){
  let date = new Date();
  let minutes = date.getMinutes()
  let hours = date.getHours()
  minutes =  minutes < 10 ? '0' + minutes : minutes;
  hours = hours < 10 ? '0' + hours : hours;
  return hours + ":" + minutes
}

function getAttachedPhoto(photoArr) {
  photoLinksString = '';
  photoArr.forEach(photo => {
    photoLinksString += "===" + "uploads/"+ path.basename(photo.path)
  })
  return photoLinksString
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
module.exports = {getCurrentTime, googleCoordsToString, getAttachedPhoto}
