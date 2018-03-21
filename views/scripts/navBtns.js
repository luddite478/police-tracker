// ..................SEARCH BUTTON.....................
$('#search>input[type="text"]').on('keyup', search)

$('#search-button, #close-search').on('click', (event) => {
  $('#menu').toggle(0, () => {
     $('#search-wrapper').toggle(0);
  })
})

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

//...........................SHOW ABOUT MESSAGE ..........................

$('#nav-about').on('click', closeAbout)
$('.close-icon').on('click', closeAbout)
function closeAbout()  {
    if(!sessionCash.toggleAbout) {
        $('#about-info').css('visibility','visible')
        $('#about-info').animate({opacity: 1}, 200);
        $('#content-wrapper').addClass('visible')
        sessionCash.toggleAbout = true;
    } else {
        $('#about-info').css('visibility','hidden')
        $('#content-wrapper').removeClass('visible')
        sessionCash.toggleAbout = false;
    }
}
//'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
