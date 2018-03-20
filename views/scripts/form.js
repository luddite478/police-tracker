// ...................SHOW DOWNLOADED PICTURES IN NEW POST .................
function readURL(input) {
  if (input.files && input.files[0]) {
    let reader = new FileReader();
    reader.onload = function (e) {
      let amountOfPhoto = sessionCash.uploadeListBase64.length + 1
      if(domCsh.$photoWrapper.children().length == 0) {
        domCsh.photoWrapper.style.display= "grid"
        addPhoto(1, e.target.result)
        sessionCash.uploadeListBase64.push(e.target.result)
        domCsh.uploaded.style.display= "flex"
        $(domCsh.uploaded).find('span').text("Uploaded: " + amountOfPhoto)
      }
      else if (domCsh.$photoWrapper.children().length == 1) {
        addPhoto(2, e.target.result)
        sessionCash.uploadeListBase64.push(e.target.result)
        $(domCsh.uploaded).find('span').text("Uploaded: " + amountOfPhoto)
      }
      else if (domCsh.$photoWrapper.children().length == 2) {
        addPhoto(3, e.target.result)
        sessionCash.uploadeListBase64.push(e.target.result)
        $(domCsh.uploaded).find('span').text("Uploaded: " + amountOfPhoto)
      } else {
        sessionCash.uploadeListBase64.push(e.target.result)
        $(domCsh.uploaded).find('span').text("Uploaded: " + amountOfPhoto)
      }
    }
  reader.readAsDataURL(input.files[0]);
}
  addPhotoToList(input.files[0])
}
function addPhotoToList(file){
  sessionCash.uploadeList.push(file)
}


function addPhoto(num,img){
  let photoSlot = document.createElement('div')
  if(num == 1){
    photoSlot.setAttribute('class','_1---1-1')
  }
  if(num == 2){
    photoSlot.setAttribute('class','_2---1-2')
    document.querySelector('._1---1-1').setAttribute('class','_1---1-2')
  }
  if(num == 3){
    photoSlot.setAttribute('class','_3---1-3')
    document.querySelector('._2---1-2').setAttribute('class','_2---1-3')
  }
  photoSlot.style.backgroundImage = 'url(' + img + ')'
  addElem(photoSlot)
}

function addElem(el){
  return domCsh.photoWrapper.appendChild(el)
}




  // $( "li.third-item" ).prev()
