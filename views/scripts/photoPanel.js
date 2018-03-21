$('.photos').on('click', enlargePhoto)
$('#nextBtn, #enlargedPhoto').on('click', changePhotoNext)
$('#backBtn').on('click', changePhotoBack)
$('#close-photo-panel').on('click', closePhotoPanel)

function morePhoto(btn){
  sessionCash.targetPostId = $(btn).parents('.message-wrapper').attr('data-post-id');
  sessionCash.setTargetPostPhotoLinks()
  $('#enlargedPhoto').css('background-image',`url(${sessionCash.targetPostPhotoLinks[3]})`);
  $('#enlargedPhotoPanel').css('display','grid')
}
function enlargePhoto(event){
  let targetImgLink =  $(event.target).attr('style').slice(22).slice(0, -1);
  sessionCash.targetPostId = $(event.target).parents('.message-wrapper').attr('data-post-id');
  sessionCash.curentChoosenImage = targetImgLink;
  $('#enlargedPhoto').css('background-image',`url(${targetImgLink})`);
  $('#enlargedPhotoPanel').css('display','grid')
  sessionCash.setTargetPostPhotoLinks()
  sessionCash.setCurrentImageIndex()
  console.log(targetImgLink);
}

function changePhotoNext() {
  if(sessionCash.currentPhotoIndex < sessionCash.targetPostPhotoLinks.length-1){
    sessionCash.currentPhotoIndex++
    $('#enlargedPhoto').css('background-image',`url(${sessionCash.targetPostPhotoLinks[sessionCash.currentPhotoIndex]})`);
  } else {
    sessionCash.currentPhotoIndex = 0;
    $('#enlargedPhoto').css('background-image',`url(${sessionCash.targetPostPhotoLinks[sessionCash.currentPhotoIndex]})`);
  }
}
function changePhotoBack() {
  if(sessionCash.currentPhotoIndex > 0){
    sessionCash.currentPhotoIndex--
    $('#enlargedPhoto').css('background-image',`url(${sessionCash.targetPostPhotoLinks[sessionCash.currentPhotoIndex]})`);
  } else {
    sessionCash.currentPhotoIndex = sessionCash.targetPostPhotoLinks.length-1;
    $('#enlargedPhoto').css('background-image',`url(${sessionCash.targetPostPhotoLinks[sessionCash.currentPhotoIndex]})`);
  }
}

function closePhotoPanel(){
  $('#enlargedPhotoPanel').hide()
}
