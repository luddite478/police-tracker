const domCsh = {
   formPhoto1: document.getElementById('form-photo1'),
   formPhoto2: document.getElementById('form-photo2'),
   formPhoto3: document.getElementById('form-photo3'),
   deleteBtn1: document.querySelector('#delete-photo1'),
   deleteBtn2: document.querySelector('#delete-photo2'),
   deleteBtn3: document.querySelector('#delete-photo3'),
   photoWrapper: document.querySelector('#formPhotos'),
   uploaded: document.querySelector('#uploaded'),
   hiddenFormSubmit: document.getElementById("hidden-form-submit"),
   publish: document.getElementById("publish-report"),
   $photoWrapper: $('#formPhotos'),
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
  coords: '',
  address: '',
  toggleAbout: false,
  allowedToSetEventLocation: false,
  form: new FormData()
}
// ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
