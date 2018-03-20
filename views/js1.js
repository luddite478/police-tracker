const domCsh = {
   formPhoto1: document.getElementById('form-photo1'),
   formPhoto2: document.getElementById('form-photo2'),
   formPhoto3: document.getElementById('form-photo3'),
   deleteBtn1: document.querySelector('#delete-photo1'),
   deleteBtn2: document.querySelector('#delete-photo2'),
   deleteBtn3: document.querySelector('#delete-photo3'),
   photoWrapper: document.querySelector('#formPhotos'),
   uploaded: document.querySelector('#uploaded'),
   $photoWrapper: $('#formPhotos')
}

const sessionCash = {
  targetPostId: '',
  targetPostPhotoLinks: '',
  curentChoosenImage: '',
  currentPhotoIndex: 0,
  setTargetPostPhotoLinks: function(){
    data.forEach((post) => {
      if(post.id == this.targetPostId){
       this.targetPostPhotoLinks= post.photoLinks.slice().filter(e => !e == '')
      }
    })
  },
  setCurrentImageIndex: function(){
    this.currentPhotoIndex = this.targetPostPhotoLinks.indexOf(this.curentChoosenImage)
    return this.currentPhotoIndex
  },
  uploadeList: [],
  uploadeListBase64: [],
}


// ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

$('#search-button, #close-search').on('click', (event) => {
  $('#menu').toggle(0, () => {
     $('#search-wrapper').toggle(0);
  })
})

// ..................SEARCHING EVENT.....................
$('#search>input[type="text"]').on('keyup', search)

function search() {
  let input = $('#search>input[type="text"]').val()
  let id;
    data.forEach((post) => {
        id =  post.id;
        if(post.text.indexOf(input) > -1 ){
          $(`.message-wrapper[data-post-id=${id}]`).show()
        } else {
          $(`.message-wrapper[data-post-id=${id}]`).hide()
        }
    })
}
// '''''''''''''''''''''''''''''''''''''''''''''''''''''
$('#report').on('click', () => {
    $('#new-message-form-wrapper').slideToggle(500)
    $('#set-location-btn').addClass('blinking-button')
})

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
//...........................SHOW ABOUT MESSAGE ..........................
let toggleAbout = false;
$('#nav-about').on('click', closeAbout)
$('.close-icon').on('click', closeAbout)
function closeAbout()  {
    if(!toggleAbout) {
        $('#about-info').css('visibility','visible')
        $('#about-info').animate({opacity: 1}, 200);
        $('#content-wrapper').addClass('visible')
        toggleAbout = true;
    } else {
        $('#about-info').css('visibility','hidden')
        $('#content-wrapper').removeClass('visible')
        toggleAbout = false;
    }
}

//'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//......................... LOCATION BUTTON HANDLING .......................
const eventLocationBtn = document.getElementById('set-location-btn')
eventLocationBtn.addEventListener('click', first)
let allowedToSetEventLocation = false;

function first(e){
  e.stopImmediatePropagation();
  this.removeEventListener("click", first);
  document.onclick = second;
  $('#map').animate({borderWidth: '4px'}, 60).css({borderColor: 'blue'})
  $('*').css({cursor: 'url(../imgs/location-cursor.png) 16 32, default'})
  allowedToSetEventLocation = true;
}
function second(){
  $('*').css({cursor: ''})
  $('#map').animate({borderWidth: '0px'}, 60).css({borderColor: 'black'})
  eventLocationBtn.addEventListener('click', first)
}

// ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

const fileSelect = document.getElementById("addPhotos");
const fileElem = document.getElementById("upload");
fileSelect.addEventListener("click", function (e) {
// ..........REDIRECT CLICK FILE INPUT...........
  if (fileElem) {
    fileElem.click();
  }
  e.preventDefault();
}, false);
//''''''''''''''''''''''''''''''''''''''''''''''

let response = {}
let coords;
let address;
let form = new FormData();
const publish = document.getElementById("publish-report");
const hiddenFormSubmit = document.getElementById("hidden-form-submit");

publish.addEventListener("click", function (e) {

  if (fileElem) {
    hiddenFormSubmit.click();
  }
  e.preventDefault();

  let post = {
      userName: $('#form-user-name').val(),
      text: document.querySelector('#form-text').innerHTML,
      address: address,
      time: new Date(),
      coords: coords
    }

  for ( let key in post ) {
      form.append(key, post[key]);
  }
  sessionCash.uploadeList.forEach((file) => {
    form.append('myImage', file);
  })

    fetch("/upload", {
      method: "POST",
      body: form
    }).then(res => res.json())
      .then(res => {
        if(res === "error"){
          alert("Only jpeg/jpg/png/gif allowed")
        }
        createNewPost(res)
        deleteInformationInForm()
        creaResponseObj(res)
    })
      .catch(err => alert(err));
}, false);




function creaResponseObj(res){
  response.userName =  res.userName,
  response.time = res.time,
  response.address = res.address,
  response.text = res.text
}

function deleteInformationInForm(){
  document.querySelector('#form-text').innerHTML = ''
  $('#form-user-name').val('')
  $('#form-address-input').val('')
  $(domCsh.photoWrapper).empty()
  domCsh.photoWrapper.style.display= "none"
  domCsh.uploaded.style.display= "none"
}
