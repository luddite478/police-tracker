function searchPostByMarker(searchId) {
    data.forEach((post) => {
        if(searchId == post.id){
          $(`.message-wrapper`).hide()
          $(`.message-wrapper[data-post-id=${searchId}]`).show(0)
                                                         .css('padding-top', '0px')
                                                         .addClass('newMessageBlink')
          }
          $(`#backToNewsFeed`).css('display','flex')
    })
}
$('.backToNewsFeed').on('click', backToNewsFeed)

$('#backToNewsFeed').on('click', backToNewsFeed)
function backToNewsFeed(){
  $(`#backToNewsFeed`).css('display','none')
  $(`.message-wrapper:not(#new-message)`).show()
}


var numberOfPolicemen = Math.floor(Math.random(2)* 5);


function initMap() {
  // Map options
  const options = {
    mapTypeControl: false,
    zoom: 13,
    center: {lat: 59.9342802, lng: 30.3350986}
  }

  // New map
  const map = new google.maps.Map(document.getElementById("map"),options);
  const geocoder = new google.maps.Geocoder;


function getAddress(event){
    let deferred = $.Deferred()
    document.geoCodeRequestCompleteFlag = 0;

    geocoder.geocode({'latLng': event.latLng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            let address = results[0].address_components[1].short_name + ' ' +
            results[0].address_components[0].short_name + ', ' +
            results[0].address_components[2].short_name

            deferred.resolve(address);
          } else {
            deferred.reject(status);
          }
        }
      });
    return deferred.promise();
}

  //CLICK ON THE MAP & SET ADDRESS VARIABLE
  google.maps.event.addListener(map, 'click', (event) => {

    if(allowedToSetEventLocation){
      addMarker({
        coords: event.latLng
       });
      getAddress(event)
        .then((newAddress) => {
          address = newAddress;
          $('#form-address-input').val(newAddress);
          $('#set-location-btn').removeClass('blinking-button')
        })
        .catch(err => console.log(err));
    }
      allowedToSetEventLocation = false;
  })



let markers = [];
function renderMarkers(){
  for (let i = 0; i < data.length; i++) {
      let dataCoords = JSON.parse(data[i].coords)
      let lat = parseFloat(dataCoords.lat)
      let lng = parseFloat(dataCoords.lng)
      let photo;
      markers[i] = {
        coords: {
          lat: lat,
          lng: lng
        },
        content:  `
                  <div id="markerInfoWrapper">
                        <div id="markerPostInfo">
                          <span> <strong>${data[i].userName}</strong></span>
                          <span> <strong>${data[i].time}</strong> </span>
                        </div>
                        <div id="markerInfoAddress">
                          <span> <strong>${data[i].address} </strong> </span>
                        </div>
                        <div id="markerPostText"><span>
                          ${data[i].text}
                        </span></div>
                        <div id="markerMoreInfo" onclick="searchPostByMarker(${data[i].id})"> <strong>More info</strong></div>
                      </div>
                    `


        }
  }

  markers.forEach( e => {
      addMarker(e)
    })
  }
  renderMarkers()

  function addMarker(props){

    coords = props.coords
    let marker = new google.maps.Marker({
      position: props.coords,
      map: map,
      icon: 'imgs/policeman.svg'
    });

    //check for custopmicon
    if(props.content){
      let infoWindow = new google.maps.InfoWindow({
        content: props.content
      });

      marker.addListener('click', () => {
        infoWindow.open(marker.get('map'), marker);
      });
    }
  }
}
