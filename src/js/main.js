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

var map = new mapboxgl.Map({
  container: "mapJoglo",
  style: "mapbox://styles/mapbox/streets-v11",
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

  layerButton.addEventListener("click", function () {
    alert("Layer button clicked!");
  });

  controlGroup.appendChild(layerButton);
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
const dropdownButton = document.getElementById("dropdown-button");
const dropdownMenu = document.getElementById("dropdown-menu");
const arrowIcon = document.getElementById("arrow-icon");
const selectedItem = document.getElementById("selected-item");
const items = dropdownMenu.querySelectorAll('[role="menuitem"]');
let isDropdownOpen = false;

function toggleDropdown() {
  isDropdownOpen = !isDropdownOpen;
  dropdownMenu.classList.toggle("hidden", !isDropdownOpen);
  arrowIcon.style.transform = isDropdownOpen
    ? "rotate(180deg)"
    : "rotate(0deg)";
}

items.forEach((item) => {
  item.addEventListener("click", () => {
    selectedItem.textContent = item.textContent.trim();
    isDropdownOpen = false;
    dropdownMenu.classList.add("hidden");
    arrowIcon.style.transform = "rotate(0deg)";
  });
});

dropdownButton.addEventListener("click", toggleDropdown);

window.addEventListener("click", (event) => {
  if (
    !dropdownButton.contains(event.target) &&
    !dropdownMenu.contains(event.target)
  ) {
    isDropdownOpen = false;
    dropdownMenu.classList.add("hidden");
    arrowIcon.style.transform = "rotate(0deg)";
  }
});

// Dropdown disukai

// Function Dropdown Filter
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

function toggleDropdown() {
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

dropdownButtonDisukai.addEventListener("click", toggleDropdown);

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

// Hide show card active
function showCardInfoDetail(element) {
  const cardInfo = document.querySelector(".card-info");
  const cardDisukai = document.querySelector(".card-disukai");

  const cardInfoDetail = document.querySelector(".card-info-detail");
  const cardDetailDisukai = document.querySelector(".card-disukai-detail");

  const cardInfoDetailDua = document.querySelector(".card-info-judul");

  if (element.getAttribute("data-active-tab") === "1") {
    cardInfo.classList.add("hidden");
    cardInfoDetail.classList.remove("hidden");
    cardInfoDetailDua.classList.add("hidden");

    $(".slider-card-info-detail").slick({
      infinite: false,

      prevArrow:
        '<button type="button" class="slick-prev" onclick="event.stopPropagation();">' +
        '<img class="custom-img-slick" src="./src/images/prev.png" alt="Previous">' +
        "</button>",
      nextArrow:
        '<button type="button" class="slick-next" onclick="event.stopPropagation();">' +
        '<img class="custom-img-slick" src="./src/images/next.png"" alt="Next">' +
        "</button>",
    });

    // Menghancurkan Slick slider
    destroyCardInfo();
  }
  // Disukai
  else if (element.getAttribute("data-active-tab") === "2") {
    cardDisukai.classList.add("hidden");
    cardDetailDisukai.classList.remove("hidden");

    $(".slider-disukai").slick({
      infinite: false,

      prevArrow:
        '<button type="button" class="slick-prev" onclick="event.stopPropagation();">' +
        '<img class="custom-img-slick" src="./src/images/prev.png" alt="Previous">' +
        "</button>",
      nextArrow:
        '<button type="button" class="slick-next" onclick="event.stopPropagation();">' +
        '<img class="custom-img-slick" src="./src/images/next.png"" alt="Next">' +
        "</button>",
    });

    // Menghancurkan Slick slider
    destroyCardInfo();
  }
  // Lainnya
  else {
    cardInfo.classList.remove("hidden");
    cardInfoDetail.classList.add("hidden");
    cardInfoDetailDua.classList.remove("hidden");

    // Menginisialisasi ulang Slick slider
    initSlickCardInfo();

    if ($(".slider-card-info-detail").hasClass("slick-initialized")) {
      $(".slider-card-info-detail").slick("unslick");
    }
    if ($(".slider-disukai").hasClass("slick-initialized")) {
      $(".slider-disukai").slick("unslick");
    }
  }
}

function closeTab() {
  const cardInfo = document.querySelector(".card-info");
  const cardInfoDetail = document.querySelector(".card-info-detail");
  const cardInfoDetailDua = document.querySelector(".card-info-judul");

  // Menginisialisasi ulang Slick slider
  initSlickCardInfo();

  if ($(".slider-card-info-detail").hasClass("slick-initialized")) {
    $(".slider-card-info-detail").slick("unslick");
  }

  cardInfo.classList.remove("hidden");
  cardInfoDetail.classList.add("hidden");
  cardInfoDetailDua.classList.remove("hidden");
}

function closeTabDisukai() {
  const cardDisukai = document.querySelector(".card-disukai");
  const cardDetailDisukai = document.querySelector(".card-disukai-detail");

  // Menginisialisasi ulang Slick slider
  initSlickCardInfo();

  if ($(".slider-disukai").hasClass("slick-initialized")) {
    $(".slider-disukai").slick("unslick");
  }

  cardDisukai.classList.remove("hidden");
  cardDetailDisukai.classList.add("hidden");
}

function initSlickCardInfo() {
  $(".slider-card-info")
    .on("init", function (event, slick) {
      setTimeout(function () {
        moveDotsToCustomContainer();
        addClickHandlerToDots();
        disableClickHandlerToDots();
      }, 0);
    })
    .slick({
      dots: true,
      infinite: false,
      arrows: true,
      pauseOnHover: false,
      swipe: false,
      prevArrow: `<button type="button" class="slick-prev" onclick="event.stopPropagation();">' +
        '<div class="img-wrapper">' +
        '<img style="
        margin-right: 1px;
        " class="custom-img-slick" src="./src/images/prev.png" alt="Previous">' +
        "</div>" +
        "</button>`,
      nextArrow: `<button type="button" class="slick-next" onclick="event.stopPropagation();">' +
        '<div class="img-wrapper">' +
        '<img style="
        margin-left: 1px;
      " class="custom-img-slick" src="./src/images/next.png"" alt="Next">' +
        "</div>" +
        "</button>`,
    });
}

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
function destroyCardInfo() {
  if ($(".slider-card-info").hasClass("slick-initialized")) {
    $(".slider-card-info").slick("unslick");
  }
}

// memuat kode di bawah ini setelah DOM selesai dimuat
$(document).ready(function () {
  initSlickCardInfo();
  // initSlickDisukai();
});

// Function Slick

if ($(".slider-disukai").hasClass("slick-initialized")) {
  $(".slider-disukai").slick("unslick");
}

$(".slider-disukai").slick({
  dots: true,
  infinite: false,
  arrows: true,
  pauseOnHover: false,
  swipe: false,
  prevArrow: `<button type="button" class="slick-prev" onclick="event.stopPropagation();">' +
        '<div class="img-wrapper">' +
        '<img style="
        margin-right: 1px;
        " class="custom-img-slick" src="./src/images/prev.png" alt="Previous">' +
        "</div>" +
        "</button>`,
  nextArrow: `<button type="button" class="slick-next" onclick="event.stopPropagation();">' +
        '<div class="img-wrapper">' +
        '<img style="
        margin-left: 1px;
      " class="custom-img-slick" src="./src/images/next.png"" alt="Next">' +
        "</div>" +
        "</button>`,
});

function initSlickDisukai() {
  $(".slider-disukai").slick({
    infinite: false,

    prevArrow:
      '<button type="button" class="slick-prev" onclick="event.stopPropagation();">' +
      '<img class="custom-img-slick" src="./src/images/prev.png" alt="Previous">' +
      "</button>",
    nextArrow:
      '<button type="button" class="slick-next" onclick="event.stopPropagation();">' +
      '<img class="custom-img-slick" src="./src/images/next.png"" alt="Next">' +
      "</button>",
  });
}

function destroyDisukai() {
  if ($(".slider-disukai").hasClass("slick-initialized")) {
    $(".slider-disukai").slick("unslick");
  }
}

// End Function Slick

// Function untuk pindah Menu Navigation
document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll('#kontenMenuTab [role="tab"]');
  const InputanSearch = document.querySelector("#InputanSearch");
  const IconInputanSearch = document.querySelector("#IconInputanSearch");
  const searchButton = document.querySelector("#btnSearch");
  const btnTerapkan = document.querySelector("#btnTerapkan");
  const garisBatas = document.querySelector("#garisBatas");
  const svgIcon = document.querySelector("#IconInputanSearch svg");

  const btnHarga = document.querySelector("#btnHarga");
  const btnKamar = document.querySelector("#btnKamar");
  const btnPenjual = document.querySelector("#btnPenjual");
  const btnJenisProperti = document.querySelector("#btnJenisProperti");
  const btnJenisRumah = document.querySelector("#btnJenisSurat");
  const btnJscore = document.querySelector("#btnJscore");

  InputanSearch.disabled = true;
  searchButton.disabled = true;
  btnTerapkan.disabled = true;
  IconInputanSearch.disabled = true;
  garisBatas.classList.add("cursor-not-allowed");
  InputanSearch.classList.add("cursor-not-allowed");
  searchButton.classList.add("cursor-not-allowed");
  btnTerapkan.classList.add("cursor-not-allowed");
  IconInputanSearch.classList.add("cursor-not-allowed");
  garisBatas.classList.add("cursor-not-allowed");
  btnHarga.classList.add("cursor-not-allowed");
  btnKamar.classList.add("cursor-not-allowed");
  btnPenjual.classList.add("cursor-not-allowed");
  btnJenisProperti.classList.add("cursor-not-allowed");
  btnJenisRumah.classList.add("cursor-not-allowed");
  btnJscore.classList.add("cursor-not-allowed");

  function toggleTab(tab) {
    const parentDiv = tab.closest(".menus");
    const contentDiv = document.getElementById(
      tab.getAttribute("aria-controls")
    );

    if (!parentDiv || !contentDiv) {
      console.warn("Element tidak ditemukan");
      return;
    }

    if (parentDiv.classList.contains("bg-aktif-menu")) {
      parentDiv.classList.remove("bg-aktif-menu");
      contentDiv.classList.add("hidden");
      disableInputAndButton();
    } else {
      tabs.forEach((t) => {
        t.closest(".menus").classList.remove("bg-aktif-menu");
        document
          .getElementById(t.getAttribute("aria-controls"))
          .classList.add("hidden");
      });

      parentDiv.classList.add("bg-aktif-menu");
      contentDiv.classList.remove("hidden");
      enableInputAndButton();
    }
  }

  function enableInputAndButton() {
    if ($(".slider-disukai").hasClass("slick-initialized")) {
      $(".slider-disukai").slick("unslick");
    }

    $(".slider-disukai").slick({
      dots: true,
      infinite: false,
      arrows: true,
      pauseOnHover: false,
      swipe: false,
      prevArrow: `<button type="button" class="slick-prev" onclick="event.stopPropagation();">' +
        '<div class="img-wrapper">' +
        '<img style="
        margin-right: 1px;
        " class="custom-img-slick" src="./src/images/prev.png" alt="Previous">' +
        "</div>" +
        "</button>`,
      nextArrow: `<button type="button" class="slick-next" onclick="event.stopPropagation();">' +
        '<div class="img-wrapper">' +
        '<img style="
        margin-left: 1px;
      " class="custom-img-slick" src="./src/images/next.png"" alt="Next">' +
        "</div>" +
        "</button>`,
    });

    InputanSearch.disabled = true;
    IconInputanSearch.disabled = true;
    searchButton.disabled = true;

    IconInputanSearch.classList.remove("cursor-not-allowed", "bg-gray-200");
    InputanSearch.classList.remove("cursor-not-allowed", "bg-gray-200");

    searchButton.classList.remove(
      "cursor-not-allowed",
      "bg-gray-200",
      "text-gray-500"
    );
    searchButton.classList.add(
      "active_btn_search",
      "text-white",
      "hover_btn_search"
    );

    btnTerapkan.classList.remove(
      "cursor-not-allowed",
      "bg-gray-200",
      "text-gray-500"
    );

    btnTerapkan.classList.add(
      "active_btn_search",
      "text-white",
      "hover_btn_search"
    );

    garisBatas.classList.remove(
      "cursor-not-allowed",
      "bg-gray-200",
      "text-gray-500"
    );

    garisBatas.classList.add(
      "bg-white",
      "text-black",
      "hover:bg-gray-100",
      "hover:text-blue-700"
    );

    svgIcon.classList.remove("text-gray-400");

    btnHarga.classList.remove(
      "cursor-not-allowed",
      "bg-gray-200",
      "text-gray-400"
    );
    btnHarga.classList.add("bg-white", "text-black");

    btnKamar.classList.remove(
      "cursor-not-allowed",
      "bg-gray-200",
      "text-gray-400"
    );
    btnKamar.classList.add("bg-white", "text-black");

    btnPenjual.classList.remove(
      "cursor-not-allowed",
      "bg-gray-200",
      "text-gray-400"
    );
    btnPenjual.classList.add("bg-white", "text-black");

    // Jenis Properti
    btnJenisProperti.classList.remove(
      "cursor-not-allowed",
      "bg-gray-200",
      "text-gray-400"
    );

    btnJenisProperti.classList.add("bg-white", "text-black");

    // Jenis Rumah
    btnJenisRumah.classList.remove(
      "cursor-not-allowed",
      "bg-gray-200",
      "text-gray-400"
    );

    btnJenisRumah.classList.add("bg-white", "text-black");

    // JScore
    btnJscore.classList.remove(
      "cursor-not-allowed",
      "bg-gray-200",
      "text-gray-400"
    );

    btnJscore.classList.add("bg-white", "text-black");

    // InputanSearch.style.filter = "unset";
  }

  function disableInputAndButton() {
    InputanSearch.disabled = false;
    IconInputanSearch.disabled = false;
    searchButton.disabled = false;
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => toggleTab(tab));
  });

  var ibadahTab = document.getElementById("sarprasIbadahTab");
  var miniMarketTab = document.getElementById("sarprasMiniMarketTab");
  var graduationTab = document.getElementById("sarprasSekolahTab");
  var sporkTab = document.getElementById("sarprasRestoranTab");
  var cyclingTab = document.getElementById("sarprasTransportasiTab");

  // indeks tab
  var ecciTab = document.getElementById("indeksECCITab");
  var livabilityTab = document.getElementById("indeksLivabilityTab");
  var investmentTab = document.getElementById("indeksInvesmentTab");

  // kalkulasi tab
  var kprTab = document.getElementById("kalkulatorkprTab");
  var hargaWajarTab = document.getElementById("kalkulatorhargawajarTab");

  // Elemen gambar - sarpras
  var ibadahImg = ibadahTab.querySelector("img");
  var miniMarketImg = miniMarketTab.querySelector("img");
  var graduationImg = graduationTab.querySelector("img");
  var sporkImg = sporkTab.querySelector("img");
  var cyclingImg = cyclingTab.querySelector("img");

  // Elemen gambar - indeks
  var ecciImg = ecciTab.querySelector("img");
  var livabilityImg = livabilityTab.querySelector("img");
  var investmentImg = investmentTab.querySelector("img");

  // Elemen gambar - kalkulasi
  var kprImg = kprTab.querySelector("img");
  var hargaWajarImg = hargaWajarTab.querySelector("img");

  // Fungsi untuk mengganti gambar
  function updateImages(selectedTab) {
    // sarpras
    if (selectedTab === "ibadah") {
      ibadahImg.src = "./src/images/sarpras/mosque-on.png";
      miniMarketImg.src = "./src/images/sarpras/market-off.png";
      graduationImg.src = "./src/images/sarpras/graduation-off.png";
      sporkImg.src = "./src/images/sarpras/spoon-and-fork-off.png";
      cyclingImg.src = "./src/images/sarpras/cycling-off.png";
    } else if (selectedTab === "minimarket") {
      ibadahImg.src = "./src/images/sarpras/mosque-off.png";
      miniMarketImg.src = "./src/images/sarpras/market-on.png";
      graduationImg.src = "./src/images/sarpras/graduation-off.png";
      sporkImg.src = "./src/images/sarpras/spoon-and-fork-off.png";
      cyclingImg.src = "./src/images/sarpras/cycling-off.png";
    } else if (selectedTab === "graduation") {
      ibadahImg.src = "./src/images/sarpras/mosque-off.png";
      miniMarketImg.src = "./src/images/sarpras/market-off.png";
      graduationImg.src = "./src/images/sarpras/graduation-on.png";
      sporkImg.src = "./src/images/sarpras/spoon-and-fork-off.png";
      cyclingImg.src = "./src/images/sarpras/cycling-off.png";
    } else if (selectedTab === "spork") {
      ibadahImg.src = "./src/images/sarpras/mosque-off.png";
      miniMarketImg.src = "./src/images/sarpras/market-off.png";
      graduationImg.src = "./src/images/sarpras/graduation-off.png";
      sporkImg.src = "./src/images/sarpras/spoon-and-fork-on.png";
      cyclingImg.src = "./src/images/sarpras/cycling-off.png";
    } else if (selectedTab === "cycling") {
      ibadahImg.src = "./src/images/sarpras/mosque-off.png";
      miniMarketImg.src = "./src/images/sarpras/market-off.png";
      graduationImg.src = "./src/images/sarpras/graduation-off.png";
      sporkImg.src = "./src/images/sarpras/spoon-and-fork-off.png";
      cyclingImg.src = "./src/images/sarpras/cycling-on.png";
    }
    // indeks
    else if (selectedTab === "ecci") {
      ecciImg.src = "./src/images/indeks/plant-on.png";
      livabilityImg.src = "./src/images/indeks/tent-off.png";
      investmentImg.src = "./src/images/indeks/invest-off.png";
    } else if (selectedTab === "livability") {
      ecciImg.src = "./src/images/indeks/plant-off.png";
      livabilityImg.src = "./src/images/indeks/tent-on.png";
      investmentImg.src = "./src/images/indeks/invest-off.png";
    } else if (selectedTab === "investment") {
      ecciImg.src = "./src/images/indeks/plant-off.png";
      livabilityImg.src = "./src/images/indeks/tent-off.png";
      investmentImg.src = "./src/images/indeks/invest-on.png";
    }
    // kalkulasi
    else if (selectedTab === "kpr") {
      kprImg.src = "./src/images/kalkulator/tag-on.png";
      hargaWajarImg.src = "./src/images/kalkulator/keys-off.png";
    } else if (selectedTab === "hargaWajar") {
      kprImg.src = "./src/images/kalkulator/tag-off.png";
      hargaWajarImg.src = "./src/images/kalkulator/keys-on.png";
    }
  }

  // Event listener untuk tombol tab
  // sarpras
  ibadahTab.addEventListener("click", function () {
    updateImages("ibadah");
  });

  miniMarketTab.addEventListener("click", function () {
    updateImages("minimarket");
  });

  graduationTab.addEventListener("click", function () {
    updateImages("graduation");
  });

  sporkTab.addEventListener("click", function () {
    updateImages("spork");
  });

  cyclingTab.addEventListener("click", function () {
    updateImages("cycling");
  });

  //  indeks
  ecciTab.addEventListener("click", function () {
    updateImages("ecci");
  });

  livabilityTab.addEventListener("click", function () {
    updateImages("livability");
  });

  investmentTab.addEventListener("click", function () {
    updateImages("investment");
  });
  // kalkulasi
  kprTab.addEventListener("click", function () {
    updateImages("kpr");
  });

  hargaWajarTab.addEventListener("click", function () {
    updateImages("hargaWajar");
  });
  // Function Untuk Search, Harga, Kamar, Terapkan dan Garis Batas
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
    minInput.classList.add("bg-gray-200", "cursor-not-allowed");
    maxInput.classList.add("bg-gray-200", "cursor-not-allowed");
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
