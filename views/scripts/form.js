// .....................OPEN................................
$('#report').on('click', () => {
    $('#new-message-form-wrapper').slideToggle(500)
    $('#set-location-btn').addClass('blinking-button')
})
//''''''''''''''''''''''''''''''''''''''''''''''''''''''''
$('#toggle-anonymity-btn').on('click', () => {
  let usrNm = $('#form-user-name')
    if(usrNm.val() !== 'Anonymous'){
        usrNm.val('Anonymous')
             .css({
               backgroundColor: 'rgba(118, 128, 143, 0.17)',
               color: 'grey'
             })
             .attr('readonly', true);
    } else {
        usrNm.val('')
             .css({
               backgroundColor: '#eee',
               color: 'rgb(20, 20, 20)'
             })
             .attr('readonly', false);
         }
})

//'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//......................... LOCATION BUTTON HANDLING .......................
const eventLocationBtn = document.getElementById('set-location-btn')
eventLocationBtn.addEventListener('click', first)


function first(e){
  e.stopImmediatePropagation();
  this.removeEventListener("click", first);
  document.onclick = second;
  $('#map').animate({borderWidth: '4px'}, 60).css({borderColor: 'blue'})
  $('*').css({cursor: 'url(../imgs/location-cursor.png) 16 32, default'})
  sessionCash.allowedToSetEventLocation = true;
}
function second(){
  $('*').css({cursor: ''})
  $('#map').animate({borderWidth: '0px'}, 60).css({borderColor: 'black'})
  eventLocationBtn.addEventListener('click', first)
}

// ..........REDIRECT CLICK FILE INPUT...........
const fileSelect = document.getElementById("addPhotos");
const fileElem = document.getElementById("upload");
fileSelect.addEventListener("click", function (e) {
  if (fileElem) {
    fileElem.click();
  }
  e.preventDefault();
}, false);
//''''''''''''''''''''''''''''''''''''''''''''''



// ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

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

//.................... PUBLISHING POST FETCH.................................

domCsh.publish.addEventListener("click", function (e) {
  if (fileElem) {
    domCsh.hiddenFormSubmit.click();
  }
  e.preventDefault();

  let post = {
      userName: $('#form-user-name').val(),
      text: document.querySelector('#form-text').innerHTML,
      address: sessionCash.address,
      time: new Date(),
      coords: sessionCash.coords
    }

  for ( let key in post ) {
    sessionCash.form.append(key, post[key]);
  }
  sessionCash.uploadeList.forEach((file) => {
    sessionCash.form.append('myImage', file);
  })

    fetch("/upload", {
      method: "POST",
      body: sessionCash.form
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        if(res === "error"){
          alert("Only jpeg/jpg/png/gif allowed")
        }

        createNewPost(res)
        deleteInformationInForm()
    })
      .catch(err => alert(err));
}, false);

function deleteInformationInForm(){
  document.querySelector('#form-text').innerHTML = ''
  $('#form-user-name').val('')
  $('#form-address-input').val('')
  $(domCsh.photoWrapper).empty()
  domCsh.photoWrapper.style.display= "none"
  domCsh.uploaded.style.display= "none"
}
