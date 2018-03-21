
function createNewPost(res){
  let newsFeedWrapper = document.querySelector('#newsfeed-wrapper')
  let messages = document.querySelectorAll('.message-wrapper')
  let newMessage = document.createElement('div')
  newMessage.setAttribute('class','message-wrapper')
  newMessage.setAttribute('data-post-id',`${res.id}`)
  let linksArr = res.photoLinks.split('===').filter(e => !e == '')
  let photos;
  if(linksArr.length > 0){
      if(linksArr.length == 1){
          photos = `<div class="photos">
                        <div class="photo-slot _1---1-1" style="background-image: url(../${linksArr[0]} )"> </div>
                   </div>`
      } else if(linksArr.length == 2){
          photos = `<div class="photos">
                        <div class="photo-slot _1---1-2" style="background-image: url(../${linksArr[0]} )"> </div>
                        <div class="photo-slot _2---1-2" style="background-image: url(../${linksArr[1]} )"> </div>
                   </div>`
      } else if(linksArr.length == 3) {
          photos = `<div class="photos">
                        <div class="photo-slot _1---1-3" style="background-image: url(../${linksArr[0]} )"> </div>
                        <div class="photo-slot _2---1-3" style="background-image: url(../${linksArr[1]} )"> </div>
                        <div class="photo-slot _3---1-3" style="background-image: url(../${linksArr[2]} )"> </div>
                   </div>`
      } else {
          photos = `<div class="morePhotoBtn" >
                       <span> Show more photo ${linksArr.length - 3} </span>
                    </div>
                    <div class="photos">
                        <div class="photo-slot _1---1-3" style="background-image: url(../${linksArr[0]} )"> </div>
                        <div class="photo-slot _2---1-3" style="background-image: url(../${linksArr[1]} )"> </div>
                        <div class="photo-slot _3---1-3" style="background-image: url(../${linksArr[2]} )"> </div>
                    </div>`
      }
  } else {
      photos = ''
  }

  newMessage.innerHTML = `  <div class="message">
                                <div class="message-author-city-time">
                                    <div>
                                        <span> ${res.userName} |</span>
                                        <span> ${res.address} </span>
                                    </div>
                                    <span> ${res.time} </span>
                                </div></br>
                                <div class="breaking-line"></div>
                                <div class="text-container">
                                    <span>
                                         ${res.text}
                                    </span>
                                </div>`
                                + photos +
                              `</div>`

  newsFeedWrapper.insertBefore(newMessage,messages[0])
  $('#new-message-form-wrapper').slideUp(200)
  sessionCash.form = new FormData();
}
