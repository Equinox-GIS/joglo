// function toggle
function toggleDropdown(id) {
  const menuButtons = document.querySelectorAll("[id^='menu-button-']");
  const dropdownMenus = document.querySelectorAll("[id^='dropdown-menu-']");
  const selectedMenuButton = document.getElementById(`menu-button-${id}`);
  const selectedDropdownMenu = document.getElementById(`dropdown-menu-${id}`);
  const isExpanded =
    selectedMenuButton.getAttribute("aria-expanded") === "true";

  // Toggle the current dropdown menu
  selectedMenuButton.setAttribute("aria-expanded", !isExpanded);
  selectedDropdownMenu.classList.toggle("hidden", isExpanded);

  // Rotate arrow
  const arrow = selectedMenuButton.querySelector("svg");
  arrow.style.transform = isExpanded ? "rotate(0deg)" : "rotate(180deg)";

  // Close all other dropdown menus
  menuButtons.forEach((button, index) => {
    if (button.id !== selectedMenuButton.id) {
      button.setAttribute("aria-expanded", false);
      dropdownMenus[index].classList.add("hidden");

      // Rotate other arrows back
      const otherArrow = button.querySelector("svg");
      otherArrow.style.transform = "rotate(0deg)";
    }
  });
}

// ---------------------------------------------------------------------------------------------

// Inisialisasi peta Mapbox
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

// Initialize the map
var map = new mapboxgl.Map({
  container: "mapJoglo",
  style: "mapbox://styles/mapbox/streets-v11", // This can be your default style too, but for now, it's set to streets as given.
  zoom: 14.5,
  center: [106.8295257, -6.210588],
  preserveDrawingBuffer: true,
  attributionControl: false,
});

map.addControl(new mapboxgl.NavigationControl());

var controlGroup = document.querySelector(
  ".mapboxgl-ctrl-top-right .mapboxgl-ctrl-group"
);

var compass = controlGroup.querySelector(".mapboxgl-ctrl-compass");
if (compass) {
  compass.style.setProperty("display", "none", "important");
}

// Jika grup kontrol ditemukan
if (controlGroup) {
  // Kode untuk tombol kustom Anda di sini

  var myLocationButton = document.createElement("button");
  myLocationButton.className =
    "mapboxgl-ctrl-icon custom-control-button my-location-button";
  myLocationButton.setAttribute("type", "button");
  myLocationButton.setAttribute("aria-label", "My Location");
  myLocationButton.innerHTML =
    '<span class="mapboxgl-ctrl-icon" aria-hidden="true" title="My Location"></span>';

  myLocationButton.addEventListener("click", function () {
    alert("My Location button clicked!");
  });

  // Dapatkan tombol zoom-in dan zoom-out
  var zoomInButton = controlGroup.querySelector(".mapboxgl-ctrl-zoom-in");
  var zoomOutButton = controlGroup.querySelector(".mapboxgl-ctrl-zoom-out");

  // Hapus tombol zoom-in dan zoom-out dari DOM
  controlGroup.removeChild(zoomInButton);
  controlGroup.removeChild(zoomOutButton);

  // Membuat dan menambahkan tombol layer setelah tombol my location
  var layerButton = document.createElement("button");
  layerButton.className =
    "mapboxgl-ctrl-icon custom-control-button layer-button";
  layerButton.setAttribute("type", "button");
  layerButton.setAttribute("aria-label", "Layer");
  layerButton.innerHTML =
    '<span class="mapboxgl-ctrl-icon" aria-hidden="true" title="Layer"></span>';

  // Create dropdown
  var dropdown = document.createElement("div");
  dropdown.id = "dropdownDelay";
  dropdown.className =
    "z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 absolute";
  dropdown.style.right = "100%"; // mengatur posisi ke kanan
  dropdown.style.marginRight = "10px"; // memberikan margin ke kanan
  dropdown.style.marginTop = "-1.5rem";
  dropdown.innerHTML = `
    <div class="mt-3">
    <div class="flex items-center mb-4 px-2 pt-3">
        <input id="radio-default" type="radio" value="Default" name="map-layer" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:outline-none focus:ring-0">
        <label for="radio-default" class="ml-2 text-xs font-medium cursor-pointer text-gray-900 dark:text-gray-300">Default</label>
    </div>
    <div class="flex items-center mb-4 px-2">
        <input id="radio-satellite" type="radio" value="Satellite" name="map-layer" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:outline-none focus:ring-0">
        <label for="radio-satellite" class="ml-2 text-xs font-medium cursor-pointer text-gray-900 dark:text-gray-300">Satellite</label>
    </div>
    <div class="flex items-center px-2 pb-3">
        <input checked id="radio-street" type="radio" value="Street" name="map-layer" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:outline-none focus:ring-0">
        <label for="radio-street" class="ml-2 text-xs font-medium cursor-pointer text-gray-900 dark:text-gray-300">Street</label>
    </div>
    <div>`;

  layerButton.addEventListener("click", function () {
    // Show or hide dropdown
    if (dropdown.classList.contains("hidden")) {
      dropdown.classList.remove("hidden");
    } else {
      dropdown.classList.add("hidden");
    }
  });

  controlGroup.appendChild(layerButton);
  controlGroup.appendChild(dropdown); // Add dropdown to control group
  controlGroup.appendChild(myLocationButton);
  controlGroup.appendChild(zoomInButton);
  controlGroup.appendChild(zoomOutButton);
}

// Fungsi untuk menambahkan titik
const IzinAjib = () => {
  fetch(
    `https://jakarta.pintoinvest.com/v1/geojson_izin_galian/galian_utilitas_izin.geojson`
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data); // Mencetak data ke konsol
      map.addSource("layer-ajib-galian", {
        type: "geojson",
        data: data,
      });

      // Menambahkan lapisan setelah sumber berhasil ditambahkan
      map.addLayer({
        id: "layer-ajib-galian",
        type: "circle",
        source: "layer-ajib-galian",
        paint: {
          "circle-color": "#ef1e28",
          "circle-stroke-color": "#ef1e28",
          "circle-stroke-width": 1,
          "circle-radius": 4,
          "circle-opacity": 0.8,
        },
        layout: {
          visibility: "visible",
        },
      });
    })
    .catch((error) => {
      console.error("Terjadi kesalahan:", error); // Menangani potensi kesalahan
    });

  // Defining the popup
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

  // Pop up
  map.on("mouseenter", "layer-ajib-galian", (e) => {
    console.log(e.features[0].properties);

    map.getCanvas().style.cursor = "pointer";
    const coordinates = e.features[0].geometry.coordinates.slice();
    const data = e.features[0].properties; // Extract properties from the event object
    const content = `
  <div class="p-0 w-full">
    <div class="">
      <h6 class="mt-0 text-sm leading-4 mb-2">${data["jenis_usaha"]}</h6>
      <div class="border-b mb-2"></div>
      <div class="leading-5">
        <div class="grid grid-cols-2">
          <div><span>NO SK</span></div>
          <div><span class="block truncate"> ${data["jenis_usaha"]}</span></div>
        </div>
        <div class="grid grid-cols-2">
          <div><span>Izin</span></div>
          <div><span class="block truncate"> ${data["jenis_usaha"]}</span></div>
        </div>
        <div class="grid grid-cols-2">
          <div><span>Badan Usaha</span></div>
          <div><span class="block truncate"> ${data["badan_usaha"]}</span></div>
        </div>
        <div class="grid grid-cols-2">
          <div><span>Jenis Usaha</span></div>
          <div><span class="block truncate"> ${data["jenis_usaha"]}</span></div>
        </div>
        <div class="grid grid-cols-2">
          <div><span>Pelaksana</span></div>
          <div><span class="block truncate"> ${data["jenis_usaha"]}</span></div>
        </div>
      </div>
    </div>
  </div>
`;

    popup.setLngLat(coordinates).setHTML(content).addTo(map);

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
  });

  // map.on("mouseleave", "layer-ajib-galian", () => {
  //   map.getCanvas().style.cursor = "";
  //   popup.remove();
  // });
};

// Panggil fungsi setelah peta selesai dimuat
map.on("load", IzinAjib);

// ---------------------------------------------------------------------------------------------

let currentPopup; // Menyimpan referensi ke popup saat ini

function getDataCard(element) {
  // Tutup popup saat ini jika ada
  if (currentPopup) {
    currentPopup.remove();
  }

  const activePanduan = parseInt(element.getAttribute("data-card-map"));

  // Mendefinisikan popup
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

  // Loop melalui sumber data geojson untuk mencari OBJECTID yang cocok
  map.getSource("layer-ajib-galian")._data.features.forEach((feature) => {
    if (feature.properties.OBJECTID === activePanduan) {
      const coordinates = feature.geometry.coordinates.slice();
      const data = feature.properties;
      const content = `
      <div class="p-0 w-full">
        <div class="">
          <h6 class="mt-0 text-sm leading-4 mb-2">${data["OBJECTID"]}</h6>
          <h6 class="mt-0 text-sm leading-4 mb-2">${data["kegiatan"]}</h6>
          <div class="border-b mb-2"></div>
          <div class="leading-5">
            <div class="grid grid-cols-2">
              <div><span>NO SK</span></div>
              <div><span class="block truncate"> ${data["nama_obj"]}</span></div>
            </div>
            <div class="grid grid-cols-2">
              <div><span>Izin</span></div>
              <div><span class="block truncate"> ${data["nama_petugas"]}</span></div>
            </div>
            <div class="grid grid-cols-2">
              <div><span>Badan Usaha</span></div>
              <div><span class="block truncate"> ${data["pemilik"]}</span></div>
            </div>
            <div class="grid grid-cols-2">
              <div><span>Jenis Usaha</span></div>
              <div><span class="block truncate"> ${data["statusproyek"]}</span></div>
            </div>
            <div class="grid grid-cols-2">
              <div><span>Pelaksana</span></div>
              <div><span class="block truncate"> ${data["komentar"]}</span></div>
            </div>
          </div>
        </div>
      </div>
    `;

      popup.setLngLat(coordinates).setHTML(content).addTo(map);
      currentPopup = popup; // Simpan referensi ke popup saat ini

      while (Math.abs(map.getCenter().lng - coordinates[0]) > 180) {
        coordinates[0] += map.getCenter().lng > coordinates[0] ? 360 : -360;
      }
    }
  });
}

function removePopup() {
  // Tutup popup saat ini jika ada
  if (currentPopup) {
    currentPopup.remove();
    currentPopup = null;
  }
}

// Hide Show Konten

function changeTab(event) {
  event.preventDefault(); // Menghindari perilaku default link

  const tab = event.target;
  const tabName = tab.getAttribute("data-tab");

  // Sembunyikan semua tab pane
  const tabPanes = document.querySelectorAll(".tab-pane");
  tabPanes.forEach((pane) => pane.classList.add("hidden"));

  // Tampilkan tab pane yang sesuai
  const activePane = document.getElementById(tabName);
  activePane.classList.remove("hidden");

  // Hapus border dari semua tab
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => tab.classList.remove("border-gray-400"));
  tabs.forEach((tab) => tab.classList.add("border-transparent"));

  // Tambahkan border ke tab yang aktif
  tab.classList.remove("border-transparent");
  tab.classList.add("border-gray-400");
}

// Function Dropdown Filter

// Function Dropdown Filter untuk Pencarian
const dropdownButtonPencarian = document.getElementById(
  "dropdown-button-pencarian"
);
const dropdownMenuPencarian = document.getElementById(
  "dropdown-menu-pencarian"
);
const arrowIconPencarian = document.getElementById("arrow-icon-pencarian");
const selectedItemPencarian = document.getElementById("selected-item");
const itemsPencarian =
  dropdownMenuPencarian.querySelectorAll('[role="menuitem"]');
let isDropdownOpen = false;

function toggleDropdownPencarian() {
  isDropdownOpen = !isDropdownOpen;
  dropdownMenuPencarian.classList.toggle("hidden", !isDropdownOpen);
  arrowIconPencarian.style.transform = isDropdownOpen
    ? "rotate(180deg)"
    : "rotate(0deg)";
}

itemsPencarian.forEach((item) => {
  item.addEventListener("click", () => {
    selectedItemPencarian.textContent = item.textContent.trim();
    isDropdownOpen = false;
    dropdownMenuPencarian.classList.add("hidden");
    arrowIconPencarian.style.transform = "rotate(0deg)";
  });
});

dropdownButtonPencarian.addEventListener("click", toggleDropdownPencarian);

window.addEventListener("click", (event) => {
  if (
    !dropdownButtonPencarian.contains(event.target) &&
    !dropdownMenuPencarian.contains(event.target)
  ) {
    isDropdownOpen = false;
    dropdownMenuPencarian.classList.add("hidden");
    arrowIconPencarian.style.transform = "rotate(0deg)";
  }
});

// Function Dropdown Filter untuk Disukai
const dropdownButtonDisukai = document.getElementById(
  "dropdown-disukai-button"
);
const dropdownMenuDisukai = document.getElementById("dropdown-disukai-menu");
const arrowIconDisukai = document.getElementById("dropdown-disukai-arrow-icon");
const selectedItemDisukai = document.getElementById(
  "dropdown-disukai-selected-item"
);
const itemsDisukai = dropdownMenuDisukai.querySelectorAll('[role="menuitem"]');
let isDropdownDisukaiOpen = false;

function toggleDropdownDisukai() {
  isDropdownDisukaiOpen = !isDropdownDisukaiOpen;
  dropdownMenuDisukai.classList.toggle("hidden", !isDropdownDisukaiOpen);
  arrowIconDisukai.style.transform = isDropdownDisukaiOpen
    ? "rotate(180deg)"
    : "rotate(0deg)";
}

itemsDisukai.forEach((item) => {
  item.addEventListener("click", () => {
    selectedItemDisukai.textContent = item.textContent.trim();
    isDropdownDisukaiOpen = false;
    dropdownMenuDisukai.classList.add("hidden");
    arrowIconDisukai.style.transform = "rotate(0deg)";
  });
});

dropdownButtonDisukai.addEventListener("click", toggleDropdownDisukai);

window.addEventListener("click", (event) => {
  if (
    !dropdownButtonDisukai.contains(event.target) &&
    !dropdownMenuDisukai.contains(event.target)
  ) {
    isDropdownDisukaiOpen = false;
    dropdownMenuDisukai.classList.add("hidden");
    arrowIconDisukai.style.transform = "rotate(0deg)";
  }
});

// Menu Tab Saran Prasarana

// Menyimpan elemen yang akan diubah ke dalam variabel
var carousel = document.getElementById("animation-carousel");

// Tombol untuk deskripsi, sarana, dan indeks
var btnDeskripsi = document.getElementById("profile-tab");
var btnSarana = document.getElementById("dashboard-tab");
var btnIndeks = document.getElementById("settings-tab");
// shp
var btnShp = document.getElementById("shp-tab");
// kontak
var btnKontak = document.getElementById("kontak-tab");

// Fungsi untuk menampilkan carousel
btnDeskripsi.addEventListener("click", function () {
  carousel.style.display = "block";
});

// Fungsi untuk menyembunyikan carousel
btnSarana.addEventListener("click", function () {
  carousel.style.display = "none";
});

btnIndeks.addEventListener("click", function () {
  carousel.style.display = "none";
});

btnShp.addEventListener("click", function () {
  carousel.style.display = "none";
});

btnKontak.addEventListener("click", function () {
  carousel.style.display = "none";
});

var ctx1 = document.getElementById("myRadarChart").getContext("2d");
var myRadarChart = new Chart(ctx1, {
  type: "radar",
  data: {
    labels: [
      "Pengelolaan Limbah",
      "Topografi",
      "Kebencanaan",
      "Keseterdian Air",
      "Kualitas Vegetasi",
    ],
    datasets: [
      {
        data: [3, 5, 2, 4, 3],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 5,
        stepSize: 1, // Menambahkan ini agar tidak ada angka desimal
        ticks: {
          precision: 0, // Menambahkan ini agar tidak ada angka desimal
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Menyembunyikan legenda
      },
      tooltip: {
        enabled: true, // Menyembunyikan tooltip
      },
    },
  },
});

var ctx1 = document.getElementById("myRadarChartFavorit").getContext("2d");
var myRadarChartFavorit = new Chart(ctx1, {
  type: "radar",
  data: {
    labels: [
      "Pengelolaan Limbah",
      "Topografi",
      "Kebencanaan",
      "Keseterdian Air",
      "Kualitas Vegetasi",
    ],
    datasets: [
      {
        data: [3, 5, 2, 4, 3],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 5,
        stepSize: 1, // Menambahkan ini agar tidak ada angka desimal
        ticks: {
          precision: 0, // Menambahkan ini agar tidak ada angka desimal
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Menyembunyikan legenda
      },
      tooltip: {
        enabled: true, // Menyembunyikan tooltip
      },
    },
  },
});

var ctx2 = document.getElementById("mySecondRadarChart").getContext("2d");
var mySecondRadarChart = new Chart(ctx2, {
  type: "radar",
  data: {
    labels: [
      "Tingkat Konektivitas Pejalan Kaki",
      "Ruang Terbuka dan Publik",
      "Fasilitas Komunitas",
      "Aktivitas Budaya",
      "Tempat untuk Bekerja",
    ],
    datasets: [
      {
        data: [4, 2, 5, 3, 4],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 5,
        stepSize: 1, // Menambahkan ini agar tidak ada angka desimal
        ticks: {
          precision: 0, // Menambahkan ini agar tidak ada angka desimal
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Menyembunyikan legenda
      },
      tooltip: {
        enabled: true, // Menyembunyikan tooltip
      },
    },
  },
});

var ctx2 = document
  .getElementById("mySecondRadarChartFavorit")
  .getContext("2d");
var mySecondRadarChartFavorit = new Chart(ctx2, {
  type: "radar",
  data: {
    labels: [
      "Tingkat Konektivitas Pejalan Kaki",
      "Ruang Terbuka dan Publik",
      "Fasilitas Komunitas",
      "Aktivitas Budaya",
      "Tempat untuk Bekerja",
    ],
    datasets: [
      {
        data: [4, 2, 5, 3, 4],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 5,
        stepSize: 1, // Menambahkan ini agar tidak ada angka desimal
        ticks: {
          precision: 0, // Menambahkan ini agar tidak ada angka desimal
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Menyembunyikan legenda
      },
      tooltip: {
        enabled: true, // Menyembunyikan tooltip
      },
    },
  },
});
//

// Menambahkan chart radar ketiga untuk Investment Index
var ctx3 = document.getElementById("myInvestmentIndexChart").getContext("2d");
var myInvestmentIndexChart = new Chart(ctx3, {
  type: "radar",
  data: {
    labels: ["Properti", "Saham", "Obligasi", "Emas", "Reksadana"],
    datasets: [
      {
        data: [4, 3, 2, 5, 3],
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 5,
        stepSize: 1,
        ticks: {
          precision: 0,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  },
});

// slick semua
function querySelector(selector) {
  return document.querySelector(selector);
}

function initSlick(element, options) {
  if (!$(element).hasClass("slick-initialized")) {
    $(element).slick(options);
  }
}

function destroySlick(element) {
  if ($(element).hasClass("slick-initialized")) {
    $(element).slick("unslick");
  }
}

function closeTab() {
  const cardInfo = querySelector(".card-info");
  const cardInfoDetail = querySelector(".card-info-detail");
  const cardInfoDetailDua = querySelector(".card-info-judul");

  cardInfo.classList.remove("hidden");
  cardInfoDetail.classList.add("hidden");
  cardInfoDetailDua.classList.remove("hidden");

  // destroySlick(".slider-card-info-detail");
  // initSlickCardInfo();
}

function closeTabDisukai() {
  const cardDisukai = querySelector(".card-disukai");
  const cardDetailDisukai = querySelector(".card-disukai-detail");

  cardDisukai.classList.remove("hidden");
  cardDetailDisukai.classList.add("hidden");

  initSlickCardInfo();
}

function getSliderDefaultOptions() {
  return {
    dots: true,
    infinite: false,
    arrows: true,
    pauseOnHover: false,
    swipe: false,
    prevArrow: `<button type="button" class="slick-prev" onclick="event.stopPropagation();">
                  <div class="img-wrapper">
                    <img style="margin-right: 1px;" class="custom-img-slick" src="./src/images/prev.png" alt="Previous">
                  </div>
                </button>`,
    nextArrow: `<button type="button" class="slick-next" onclick="event.stopPropagation();">
                  <div class="img-wrapper">
                    <img style="margin-left: 1px;" class="custom-img-slick" src="./src/images/next.png" alt="Next">
                  </div>
                </button>`,
  };
}

function initSlickCardInfo() {
  $(".slider-card-info")
    .on("init", function () {
      setTimeout(function () {
        moveDotsToCustomContainer();
        addClickHandlerToDots();
        disableClickHandlerToDots();
      }, 0);
    })
    .slick(getSliderDefaultOptions());
}

function initSlickFavorit() {
  $(".slider-favorit")
    .on("init", function () {
      setTimeout(function () {
        moveDotsToCustomContainer();
        addClickHandlerToDots();
        disableClickHandlerToDots();
      }, 0);
    })
    .slick(getSliderDefaultOptions());
}

$(document).ready(function () {
  initSlickCardInfo();
  // initSlickFavorit();
});

function disableClickHandlerToDots() {
  $(".slick-dots li button")
    .off("click")
    .click(function (e) {
      e.preventDefault();
      return false;
    });
}

function moveDotsToCustomContainer() {
  const dots = $(".slider-card-info .slick-dots");
  $(".custom-dot-slick").append(dots);
}

function addClickHandlerToDots() {
  $(".slider-card-info .slick-dots li").on("click", function (event) {
    event.stopPropagation();
  });
}

function showCardInfoDetail(element) {
  const cardInfo = document.querySelector(".card-info");
  const cardInfoDetail = document.querySelector(".card-info-detail");
  const cardInfoDetailDua = document.querySelector(".card-info-judul");

  const cardDisukai = document.querySelector(".card-disukai");
  const cardDetailDisukai = document.querySelector(".card-disukai-detail");

  const activeTab = element.getAttribute("data-active-tab");

  switch (activeTab) {
    case "1":
      cardInfo.classList.add("hidden");
      cardInfoDetailDua.classList.add("hidden");
      cardInfoDetail.classList.remove("hidden");

      cardDisukai.classList.add("hidden");
      cardDetailDisukai.classList.add("hidden");

      if (!$(".slider-card-info-detail").hasClass("slick-initialized")) {
        initSlick(".slider-card-info-detail", getSliderDefaultOptions());
      }
      break;

    case "2":
      cardInfoDetail.classList.add("hidden"); // Menyembunyikan cardInfoDetail
      cardDisukai.classList.add("hidden");
      cardDetailDisukai.classList.remove("hidden");

      if (!$(".slider-favorit").hasClass("slick-initialized")) {
        initSlick(".slider-favorit", getSliderDefaultOptions());
      }

      if (!$(".slider-card-info-detail").hasClass("slick-initialized")) {
        initSlick(".slider-card-info-detail", getSliderDefaultOptions());
      }
      break;

    default:
      cardInfo.classList.remove("hidden");
      cardInfoDetail.classList.add("hidden");
      cardInfoDetailDua.classList.remove("hidden");
      cardDisukai.classList.remove("hidden"); // Menampilkan kembali cardDisukai
      cardDetailDisukai.classList.add("hidden");
      break;
  }
}

// Function Slick

// End Function Slick

// Function untuk pindah Menu Navigation
document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll('#kontenMenuTab [role="tab"]');
  const elements = {
    InputanSearch: document.querySelector("#InputanSearch"),
    // IconInputanSearch: document.querySelector("#IconInputanSearch"),
    garisBatas: document.querySelector("#garisBatas"),
    btnHarga: document.querySelector("#btnHarga"),
    btnKamar: document.querySelector("#btnKamar"),
    btnPenjual: document.querySelector("#btnPenjual"),
    btnJenisProperti: document.querySelector("#btnJenisProperti"),
    btnJenisRumah: document.querySelector("#btnJenisSurat"),
    btnJscore: document.querySelector("#btnJscore"),

    // SVG
    ArrowIconHarga: document.querySelector("#arrow-icon-harga"),
    ArrowIconKamar: document.querySelector("#arrow-icon-kamar"),
    ArrowIconPenjual: document.querySelector("#arrow-icon-penjual"),
    ArrowIconJenisProperti: document.querySelector(
      "#arrow-icon-jenis-properti"
    ),
    ArrowIconJenisRumah: document.querySelector("#arrow-icon-jenis-surat"),
    ArrowIconJscore: document.querySelector("#arrow-icon-jscore"),
  };

  const element_button = {
    searchButton: document.querySelector("#btnSearch"),
    btnTerapkan: document.querySelector("#btnTerapkan"),
  };

  function disable() {
    Object.values(elements).forEach((el) => {
      el.disabled = true;
      el.classList.add("bg-gray-200", "text-gray-500");
      el.classList.remove("bg-white");
    });
    Object.values(element_button).forEach((el) => {
      el.disabled = true;
      el.classList.add("bg-gray-200", "text-gray-500");
      el.classList.remove("bg-blue-500", "text-white", "active_btn_search");
    });
  }

  function enable() {
    Object.values(elements).forEach((el) => {
      el.disabled = false;
      el.classList.add("bg-white");
      el.classList.remove("bg-gray-200", "text-gray-500");
    });
    Object.values(element_button).forEach((el) => {
      el.disabled = false;
      el.classList.remove("bg-gray-200", "text-gray-500");
      el.classList.add("active_btn_search");
    });
  }

  disable();

  function toggleTab(tab) {
    const parentDiv = tab.closest(".menus");
    const contentDiv = document.getElementById(
      tab.getAttribute("aria-controls")
    );

    if (!parentDiv || !contentDiv) {
      console.warn("Element tidak ditemukan");
      return;
    }

    const isActive = parentDiv.classList.contains("bg-aktif-menu");
    tabs.forEach((t) => t.closest(".menus").classList.remove("bg-aktif-menu"));
    parentDiv.classList.toggle("bg-aktif-menu", !isActive);

    switch (tab.id) {
      case "MenuSatuTab":
        enable();
        if (!$(".slider-card-info").hasClass("slick-initialized")) {
          initSlickCardInfo();
        }
        break;
      case "MenuDuaTab":
        // Anda bisa menambahkan inisialisasi untuk tab kedua di sini, jika diperlukan
        break;
      case "MenuTigaTab":
        initSlickFavorit();

        console.log("MenuTigaTab dipilih");

        if ($(".slider-favorit").length > 0) {
          console.log("Elemen .slider-favorit ditemukan di DOM");
        } else {
          console.log("Elemen .slider-favorit TIDAK ditemukan di DOM");
        }

        // if (!$(".slider-favorit").hasClass("slick-initialized")) {
        //   console.log("Inisialisasi slider-favorit");
        //   initSlickFavorit();
        // }

        // if (!$(".slider-favorit").hasClass("slick-initialized")) {
        //   initSlick(".slider-favorit", getSliderDefaultOptions());
        // }
        // initSlickFavorit;

        // $(".slider-favorit").slick();

        // $(".slider-favorit")
        //   .on("init", function () {
        //     setTimeout(function () {
        //       moveDotsToCustomContainer();
        //       addClickHandlerToDots();
        //       disableClickHandlerToDots();
        //     }, 0);
        //   })
        //   .slick(getSliderDefaultOptions());

        break;
      default:
        disable();
        break;
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => toggleTab(tab));
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const buttons = [
    document.getElementById("btn1M"),
    document.getElementById("btn2M"),
    document.getElementById("btn3M"),
    document.getElementById("btnMore3M"),
  ];

  const minInput = document.getElementById("minInput");
  const maxInput = document.getElementById("maxInput");
  const priceButtons = document.querySelectorAll(".btn-price");

  const deactivateButtons = () => {
    buttons.forEach((button) =>
      button.classList.remove("bg-blue-500", "text-white", "border-white")
    );
  };

  const toggleButton = (btn) => {
    deactivateButtons(); // Deactivate all buttons first

    // Now, activate the clicked button
    btn.classList.add("bg-blue-500", "text-white", "border-white");

    // Disable the input boxes
    minInput.disabled = true;
    maxInput.disabled = true;
    minInput.classList.remove("bg-transparent");
    maxInput.classList.remove("bg-transparent");
    minInput.classList.add("bg-gray-200");
    maxInput.classList.add("bg-gray-200");
  };

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!btn.classList.contains("bg-blue-500")) {
        toggleButton(btn);
      }
    });
  });

  minInput.addEventListener("input", () => {
    priceButtons.forEach(
      (button) => (button.disabled = !!minInput.value || !!maxInput.value)
    );
    if (minInput.value || maxInput.value) {
      deactivateButtons();
    }
  });

  maxInput.addEventListener("input", () => {
    priceButtons.forEach(
      (button) => (button.disabled = !!minInput.value || !!maxInput.value)
    );
    if (minInput.value || maxInput.value) {
      deactivateButtons();
    }
  });
});

// Change Mode
function ChangeModeCard(element) {
  let defaultContent = document.getElementById("konten_mode_card_default");
  let fullContent = document.getElementById("konten_mode_card_full");

  // Jika konten default saat ini ditampilkan, sembunyikan dan tampilkan konten penuh
  if (!defaultContent.classList.contains("hidden")) {
    defaultContent.classList.add("hidden");
    fullContent.classList.remove("hidden");
  }
  // Sebaliknya, tampilkan konten default dan sembunyikan konten penuh
  else {
    defaultContent.classList.remove("hidden");
    fullContent.classList.add("hidden");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const tabs = {
    sarpras: {
      ibadah: document.querySelectorAll(".sarprasIbadahTab"),
      miniMarket: document.querySelectorAll(".sarprasMiniMarketTab"),
      graduation: document.querySelectorAll(".sarprasSekolahTab"),
      spork: document.querySelectorAll(".sarprasRestoranTab"),
      cycling: document.querySelectorAll(".sarprasTransportasiTab"),
    },

    indeks: {
      ecci: document.querySelectorAll(".indeksECCITab"),
      livability: document.querySelectorAll(".indeksLivabilityTab"),
      investment: document.querySelectorAll(".indeksInvesmentTab"),
    },

    kalkulasi: {
      kpr: document.querySelectorAll(".kalkulatorkprTab"),
      hargaWajar: document.querySelectorAll(".kalkulatorhargawajarTab"),
    },
  };

  const images = {
    sarpras: {
      ibadah: Array.from(tabs.sarpras.ibadah).map((tab) =>
        tab.querySelector("img")
      ),
      miniMarket: Array.from(tabs.sarpras.miniMarket).map((tab) =>
        tab.querySelector("img")
      ),
      graduation: Array.from(tabs.sarpras.graduation).map((tab) =>
        tab.querySelector("img")
      ),
      spork: Array.from(tabs.sarpras.spork).map((tab) =>
        tab.querySelector("img")
      ),
      cycling: Array.from(tabs.sarpras.cycling).map((tab) =>
        tab.querySelector("img")
      ),
    },

    indeks: {
      ecci: Array.from(tabs.indeks.ecci).map((tab) => tab.querySelector("img")),
      livability: Array.from(tabs.indeks.livability).map((tab) =>
        tab.querySelector("img")
      ),
      investment: Array.from(tabs.indeks.investment).map((tab) =>
        tab.querySelector("img")
      ),
    },

    kalkulasi: {
      kpr: Array.from(tabs.kalkulasi.kpr).map((tab) =>
        tab.querySelector("img")
      ),
      hargaWajar: Array.from(tabs.kalkulasi.hargaWajar).map((tab) =>
        tab.querySelector("img")
      ),
    },
  };

  const paths = {
    sarpras: "./src/images/sarpras",
    indeks: "./src/images/indeks",
    kalkulasi: "./src/images/kalkulator",
  };

  function updateImages(category, selectedTab) {
    for (let tab in tabs[category]) {
      tabs[category][tab].forEach((tabElement, index) => {
        if (tab === selectedTab) {
          images[category][tab][index].src = `${paths[category]}/${tab}-on.png`;
        } else {
          images[category][tab][
            index
          ].src = `${paths[category]}/${tab}-off.png`;
        }
      });
    }
  }

  for (let category in tabs) {
    for (let tab in tabs[category]) {
      tabs[category][tab].forEach((tabElement) => {
        tabElement.addEventListener("click", function () {
          updateImages(category, tab);
        });
      });
    }
  }
});
