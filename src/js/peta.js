function getSliderDefaultOptions() {
  return {
    dots: true,
    infinite: false,
    arrows: true,
    pauseOnHover: false,
    swipe: false,
    prevArrow: `<button type="button" class="slick-prev left-prev-custom" onclick="event.stopPropagation();">
                  <div class="img-wrapper">
                    <img style="margin-right: 1px;" class="custom-img-slick" src="./src/images/prev.png" alt="Previous">
                  </div>
                </button>`,
    nextArrow: `<button type="button" class="slick-next right-next-custom" onclick="event.stopPropagation();">
                  <div class="img-wrapper">
                    <img style="margin-left: 1px;" class="custom-img-slick" src="./src/images/next.png" alt="Next">
                  </div>
                </button>`,
  };
}

function moveDotsToCustomContainer() {
  const dots = $(".slider-card-info-detail-peta .slick-dots");
  $(".custom-dot-slick").append(dots);
}

function addClickHandlerToDots() {
  $(".slider-card-info-detail-peta .slick-dots li").on(
    "click",
    function (event) {
      event.stopPropagation();
    }
  );
}

function addClickHandlerToDots() {
  $(".slider-card-info-detail-peta .slick-dots li").on(
    "click",
    function (event) {
      event.stopPropagation();
    }
  );
}

function disableClickHandlerToDots() {
  $(".slick-dots li button")
    .off("click")
    .click(function (e) {
      e.preventDefault();
      return false;
    });
}

function resizePlayer(videos) {
  if (!videos[0]) return;

  var container = $(".slider-card-info-detail-peta"),
    containerWidth = container.width(),
    containerHeight = container.height();

  videos.each(function () {
    var video = $(this)[0];
    var videoRatio = video.videoWidth / video.videoHeight;

    var newWidth, newHeight;

    // Jika rasio kontainer lebih besar dari rasio video
    if (containerWidth / containerHeight > videoRatio) {
      newWidth = containerWidth;
      newHeight = containerWidth / videoRatio;
    } else {
      newWidth = containerHeight * videoRatio;
      newHeight = containerHeight;
    }

    $(this)
      .width(newWidth)
      .height(newHeight)
      .css({
        left: (containerWidth - newWidth) / 2,
        top: (containerHeight - newHeight) / 2,
      });
  });
}
//

function initSlickCardPeta(name) {
  $(name)
    .on("init", function () {
      setTimeout(function () {
        moveDotsToCustomContainer();
        addClickHandlerToDots();
        disableClickHandlerToDots();
        resizePlayer($(".slider-card-info-detail-peta video"));
      }, 0);
    })
    .slick(getSliderDefaultOptions());
}

mapboxgl.accessToken =
  "pk.eyJ1IjoibWVudGhvZWxzciIsImEiOiJja3M0MDZiMHMwZW83MnVwaDZ6Z2NhY2JxIn0.vQFxEZsM7Vvr-PX3FMOGiQ";

document.addEventListener("DOMContentLoaded", function () {
  // Attach a change event to the radio buttons with name 'map-layer'
  document
    .querySelectorAll('input[name="map-layer"]')
    .forEach(function (radio) {
      radio.addEventListener("change", function () {
        switch (this.value) {
          case "Default":
            map.setStyle(
              "mapbox://styles/menthoelsr/ckp4wrapq11m117pf2lr49l5t"
            );
            break;
          case "Satellite":
            map.setStyle(
              "mapbox://styles/menthoelsr/ckp6i54ay22u818lrq15ffcnr"
            );
            break;
          case "Street":
            map.setStyle("mapbox://styles/mapbox/streets-v11");
            break;
        }
      });
    });
});

const map = new mapboxgl.Map({
  container: "mapJoglo",
  style: "mapbox://styles/menthoelsr/ckp6i54ay22u818lrq15ffcnr",
  zoom: 14.5,
  center: [106.8295257, -6.210588],
  preserveDrawingBuffer: true,
});

// Navigator
map.addControl(new mapboxgl.NavigationControl());

var controlGroup = document.querySelector(
  ".mapboxgl-ctrl-top-right .mapboxgl-ctrl-group"
);

var compass = controlGroup.querySelector(".mapboxgl-ctrl-compass");
if (compass) {
  compass.style.setProperty("display", "none", "important");
}

if (controlGroup) {
  // Custom Button
  var customButton = document.createElement("button");
  customButton.className = "mapboxgl-ctrl-icon custom-control-button btn-layer";
  customButton.setAttribute("type", "button");
  customButton.setAttribute("aria-label", "Custom Layer Action");
  customButton.innerHTML =
    '<span class="mapboxgl-ctrl-icon custom-layer" aria-hidden="true" title="Custom Layer Action"></span>';
  customButton.addEventListener("click", function () {
    alert("Layer button clicked!");
  });

  // My Location Button
  var myLocationButton = document.createElement("button");
  myLocationButton.className =
    "mapboxgl-ctrl-icon custom-control-button btn-location";
  myLocationButton.setAttribute("type", "button");
  myLocationButton.setAttribute("aria-label", "My Location");
  myLocationButton.innerHTML =
    '<span class="mapboxgl-ctrl-icon" aria-hidden="true" title="My Location"></span>';
  myLocationButton.addEventListener("click", function () {
    alert("My Location button clicked!");
  });

  // Stick Button 1
  var stickButton1 = document.createElement("button");
  stickButton1.className = "mapboxgl-ctrl-icon custom-control-button btn-stick";
  stickButton1.setAttribute("type", "button");
  stickButton1.setAttribute("aria-label", "Stick Action 1");
  stickButton1.addEventListener("click", function () {
    alert("Stick button 1 clicked!");
  });

  // Stick Button 2
  var stickButton2 = document.createElement("button");
  stickButton2.className =
    "mapboxgl-ctrl-icon custom-control-button btn-stick2";
  stickButton2.setAttribute("type", "button");
  stickButton2.setAttribute("aria-label", "Stick Action 1");
  stickButton2.addEventListener("click", function () {
    alert("Stick button 1 clicked!");
  });

  // Stick Button 3
  var stickButton3 = document.createElement("button");
  stickButton3.className =
    "mapboxgl-ctrl-icon custom-control-button btn-stick3";
  stickButton3.setAttribute("type", "button");
  stickButton3.setAttribute("aria-label", "Stick Action 3");
  stickButton3.addEventListener("click", function () {
    alert("Stick button 3 clicked!");
  });

  // Get Zoom In and Zoom Out buttons
  var zoomInButton = controlGroup.querySelector(".mapboxgl-ctrl-zoom-in");
  var zoomOutButton = controlGroup.querySelector(".mapboxgl-ctrl-zoom-out");

  // Remove zoom buttons from the DOM
  controlGroup.removeChild(zoomInButton);
  controlGroup.removeChild(zoomOutButton);

  // Separator
  var separator = document.createElement("div");
  separator.style.marginTop = "4vh";
  separator.style.boxShadow = "none";

  // Add buttons to control group in the desired order
  controlGroup.appendChild(stickButton1);
  controlGroup.appendChild(stickButton2);
  controlGroup.appendChild(stickButton3);
  controlGroup.appendChild(separator);
  controlGroup.appendChild(myLocationButton);
  controlGroup.appendChild(customButton);
  controlGroup.appendChild(zoomInButton);
  controlGroup.appendChild(zoomOutButton);
}

// disable map zoom when using scroll
map.scrollZoom.disable();

const popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: true,
});

const IzinGalian = () => {
  map.addSource("layer-peta-joglo", {
    type: "geojson",
    data: `https://4aksi.com/joglo/dataa.geojson`,
  });

  map.addLayer({
    id: "layer-peta-joglo",
    type: "circle",
    source: "layer-peta-joglo",
    paint: {
      "circle-color": "#2727d5",
      "circle-stroke-color": "#2727d5",
      "circle-stroke-width": 1,
      "circle-radius": 4,
      "circle-opacity": 0.8,
    },
    layout: {
      visibility: "visible",
    },
  });
};

map.on("style.load", () => {
  IzinGalian();
});

function showLayer(layer) {
  map.setLayoutProperty(layer, "visibility", "visible");
}

function hideLayer(layer) {
  map.setLayoutProperty(layer, "visibility", "none");
}

$(
  ".mapboxgl-ctrl.mapboxgl-ctrl-attrib, .mapboxgl-ctrl-geocoder.mapboxgl-ctrl, a.mapboxgl-ctrl-logo"
).css("visibility", "hidden");

// LAYER GALIAN IZIN
map.on("click", "layer-peta-joglo", (e) => {
  // console.log(e);
  map.getCanvas().style.cursor = "pointer";
  const coordinates = e.features[0].geometry.coordinates.slice();
  // const data = e.features[0].properties;

  const content = `
<div class="w-full h-full">
                      <div
                        class="flex flex-col cursor-pointer"
                      >
                        <div class="w-full relative">
                          <div class="slider-card-info-detail-peta w-full h-full">
                            <!--  -->
                            <div class="relative">
                              <video
                                class="w-full h-full object-cover rounded-t-lg"
                                loop
                                muted
                                preload="metadata"
                                src="./src/video/Video1.mp4"
                              ></video>
                              <div class="absolute h-12 w-12 top-0 end-0 ...">
                                <img src="./src/images/new.png" alt="" />
                              </div>
                            </div>
                            <!--  -->
                            <div class="relative">
                              <img
                                class="w-full h-full object-cover rounded-t-lg"
                                src="./src/images/Hunian/Rmh1/rumaha2.jpg"
                                alt=""
                              />
                              <div class="absolute h-12 w-12 top-0 end-0 ...">
                                <img src="./src/images/new.png" alt="" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="pt-2 bg-white rounded-b-lg"
                          style="user-select: none"
                        >
                            <div class="flex flex-row justify-between">
                              <div>
                                <a href="#">
                                  <div class="inline-flex items-center">
                                    <h5
                                      class="text-sm font-bold tracking-tight text-black"
                                    >
                                      Rp 11.300.000.000
                                    </h5>
                                  </div>
                                </a>
                              </div>
                              <div class="flex justify-between">
                                <div
                                  class="grid grid-cols-3 items-center gap-2 ml-2"
                                >
                                  <div>
                                    <img
                                      class="w-4 h-4 object-cover"
                                      src="./src/images/heart-on.png"
                                      alt=""
                                    />
                                  </div>

                                  <div>
                                    <img
                                      class="w-3 h-3 object-cover"
                                      src="./src/images/share.png"
                                      alt=""
                                    />
                                  </div>

                                  <div>
                                    <img
                                      class="w-4 h-4 object-cover"
                                      src="./src/images/badge3d.svg"
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div
                                  class="grid grid-cols-1 items-center gap-2 ml-2 "
                                >
                                  <div class="">
                                    <img
                                      class="w-4 h-4 object-cover"
                                      src="./src/images/ad-off.png"
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                          <div class="flex flex-col font-normal">
                            <div
                              class="flex items-center text-[11px] text-gray-700"
                            >
                              <span class="mr-2">LT 80 m² |</span>
                              <span class="mr-2">LB 276 m² |</span>
                              <span class="mr-2">2 KT |</span>
                              <span class="mr-2">5 KM</span>
                            </div>
                            <div class="text-xs pt-1 text-gray-700">
                              Sunter, Tanjung Priok, Jakarta Utara
                            </div>
                            <div class="text-[10px] pt-1 text-gray-400">
                              ERA JAKARTA
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

    `;

  popup.setLngLat(coordinates).setHTML(content).addTo(map);
  initSlickCardPeta(".slider-card-info-detail-peta");

  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }
});
