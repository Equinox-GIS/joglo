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
// var carousel = document.getElementById("animation-carousel");

// Tombol untuk deskripsi, sarana, dan indeks
// var btnDeskripsi = document.getElementById("profile-tab");
// var btnSarana = document.getElementById("dashboardberanda-tab");
// var btnIndeks = document.getElementById("settings-tab");
// // shp
// var btnShp = document.getElementById("shp-tab");
// // kontak
// var btnKontak = document.getElementById("kontak-tab");

// // Fungsi untuk menampilkan carousel
// btnDeskripsi.addEventListener("click", function () {
//   carousel.style.display = "block";
// });

// // Fungsi untuk menyembunyikan carousel
// btnSarana.addEventListener("click", function () {
//   carousel.style.display = "none";
// });

// btnIndeks.addEventListener("click", function () {
//   carousel.style.display = "none";
// });

// btnShp.addEventListener("click", function () {
//   carousel.style.display = "none";
// });

// btnKontak.addEventListener("click", function () {
//   carousel.style.display = "none";
// });

// Ambil referensi ke semua elemen yang diperlukan
var video = document.getElementById("video-detail-beranda");

// Fungsi untuk memulai video
function playVideo() {
  video.play();
}

// Fungsi untuk menghentikan dan me-reset video
function stopAndResetVideo() {
  video.pause();
  video.currentTime = 0;
}

// Fungsi untuk mengatur event listener pada tab
function setTabListeners() {
  var btnDeskripsi = document.getElementById("profile-tab");
  var tabs = [
    document.getElementById("threetourberanda-tab"),
    document.getElementById("spekberanda-tab"),
    document.getElementById("dashboardberanda-tab"),
    document.getElementById("settings-tab"),
    document.getElementById("shp-tab"),
    document.getElementById("kontak-tab"),
  ];

  // Event listener untuk tab 'profile-tab' yang akan memutar video
  btnDeskripsi.addEventListener("click", playVideo);

  // Event listener untuk tab-tab lain yang akan menghentikan video
  tabs.forEach(function (tab) {
    tab.addEventListener("click", stopAndResetVideo);
  });
}

// Inisialisasi event listener pada tab saat dokumen siap
document.addEventListener("DOMContentLoaded", setTabListeners);

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

var ctx1 = document.getElementById("myRadarChartPencarian").getContext("2d");
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
var ctx3 = document
  .getElementById("myInvestmentIndexChartPencarian")
  .getContext("2d");
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

function addVideoEventHandlers(selector) {
  $(selector).on(
    "beforeChange",
    function (event, slick, currentSlide, nextSlide) {
      // If the current slide has a video, pause it
      let currentVideo = $(slick.$slides[currentSlide]).find("video");
      if (currentVideo.length) {
        currentVideo[0].pause();
      }
    }
  );

  $(selector).on("afterChange", function (event, slick, currentSlide) {
    // If the new slide has a video, play it
    let currentVideo = $(slick.$slides[currentSlide]).find("video");
    if (currentVideo.length) {
      currentVideo[0].play();
    }
  });
}

function destroySlick(element) {
  if ($(element).hasClass("slick-initialized")) {
    $(element).slick("unslick");
  }
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
        resizePlayer($(".slider-card-info video"));
      }, 0);
    })
    .slick(getSliderDefaultOptions());
}

function resizePlayer(videos) {
  if (!videos[0]) return;

  var container = $(".slider-card-info"),
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

function initSlickFavoritDua() {
  $(".slider-favorit-dua")
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
  // initSlickCardPeta();
  // initSlickFavoritDua();
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

function playInFullscreen(videoElement) {
  console.log(videoElement);
  if (videoElement.requestFullscreen) {
    videoElement.requestFullscreen();
  } else if (videoElement.webkitRequestFullscreen) {
    videoElement.webkitRequestFullscreen();
  } else if (videoElement.mozRequestFullScreen) {
    videoElement.mozRequestFullScreen();
  } else if (videoElement.msRequestFullscreen) {
    videoElement.msRequestFullscreen();
  }
}

$(document).ready(function () {
  // Rest of your code ...

  // Beranda
  $(".slider-card-info video").on("mouseover", function () {
    $(this).get(0).play();
  });

  $(".slider-card-info video").on("mouseout", function () {
    $(this).get(0).pause();
  });
  resizePlayer($(".slider-card-info video"));

  // Favorit
  $(".slider-favorit video").on("mouseover", function () {
    $(this).get(0).play();
  });

  $(".slider-favorit video").on("mouseout", function () {
    $(this).get(0).pause();
  });
  resizePlayer($(".slider-favorit video"));

  // Pencarian
  $(".slider-favorit-dua video").on("mouseover", function () {
    $(this).get(0).play();
  });

  $(".slider-favorit-dua video").on("mouseout", function () {
    $(this).get(0).pause();
  });
  resizePlayer($(".slider-favorit-dua video"));
});

function stopVideoInWrapper(wrapperSelector) {
  let videoElement = $(wrapperSelector).find("video");
  if (videoElement.length) {
    videoElement[0].pause();
    videoElement[0].currentTime = 0; // Untuk mereset video ke awal
  }
}

function closeTab() {
  // Stop Video Dalam Detail Card Info
  stopAndResetVideo();

  // Pencarian
  showElement(".card-info-pencarian");
  hideElement(".card-info-detail-pencarian");

  // Stop the video within video-wrapper-autoplay (if it exists)
  stopVideoInWrapper(".video-wrapper-autoplay");
}

function closeTabDisukai() {
  showElement(".card-info-favorit");
  hideElement(".card-info-detail-favorit");
  initSlickFavorit();
}

function closeTabPencarianDua() {
  showElement(".card-info-favorit-dua");
  hideElement(".card-info-detail-favorit-dua");

  initSlickFavoritDua();
}

function playVideoInWrapper(wrapperSelector) {
  let videoElement = $(wrapperSelector).find("video");
  if (videoElement.length) {
    videoElement[0].play();
  }
}

// function toggleAgenView() {
//   const tagSearchAgen = document.getElementById("tagSearchAgen");
//   const tagSearchAll = document.getElementById("tagSearchAll");
//   const tagTeksBerjalan = document.getElementById("tagTeksBerjalan");

//   if (tagSearchAgen.classList.contains("hidden")) {
//     tagSearchAgen.classList.remove("hidden");
//     tagSearchAll.classList.add("hidden");
//     tagTeksBerjalan.classList.add("hidden");
//   } else if (tagSearchAll.classList.contains("hidden")) {
//     tagSearchAgen.classList.add("hidden");
//     tagSearchAll.classList.remove("hidden");
//     tagTeksBerjalan.classList.remove("hidden");
//   } else if (tagTeksBerjalan.classList.contains("hidden")) {
//     tagSearchAgen.classList.add("hidden");
//     tagSearchAll.classList.remove("hidden");
//     tagTeksBerjalan.classList.remove("hidden");
//   }
// }

// function resetToHomeView() {
//   const tagSearchAgen = document.getElementById("tagSearchAgen");
//   const tagSearchAll = document.getElementById("tagSearchAll");

//   // Tampilkan tagSearchAll
//   tagSearchAll.classList.remove("hidden");

//   // Sembunyikan tagSearchAgen
//   tagSearchAgen.classList.add("hidden");
// }

function showCardInfoDetail(element) {
  // console.log(element);

  const activeTab = element.getAttribute("data-active-tab");

  resetAllCards();

  switch (activeTab) {
    case "1":
      // Pencarian
      showElement(".card-info-detail-pencarian");
      hideElement(".card-info-pencarian");

      // Favorit
      showElement(".card-info-favorit");
      hideElement(".card-info-detail-favorit");

      // Pencarian Dua
      showElement(".card-info-favorit-dua");
      hideElement(".card-info-detail-favorit-dua");

      if (!$(".slider-card-info-detail").hasClass("slick-initialized")) {
        setTimeout(function () {
          initSlick(".slider-card-info-detail", getSliderDefaultOptions());
          addVideoEventHandlers(".slider-card-info-detail");

          $(".slider-card-info-detail").slick("resize");
        }, 100);

        // Play the first video (if it exists)
        let firstVideo = $(".slider-card-info-detail").find(
          "div.slick-current video"
        );
        if (firstVideo.length) {
          firstVideo[0].play();
        }
      }

      //
      playVideoInWrapper(".video-wrapper-autoplay");

      //
      // Mengambil elemen dengan kelas "hiddenSearchRunning"
      const hiddenSearchRunningElement = document.querySelector(
        ".hiddenSearchRunning"
      );

      // Menghapus kelas "hidden" dari elemen
      hiddenSearchRunningElement.classList.remove("hidden");

      //
      break;

    case "2":
      // Favorit
      showElement(".card-info-detail-favorit");
      hideElement(".card-info-favorit");

      // Pencarian
      showElement(".card-info-pencarian");
      hideElement(".card-info-detail-pencarian");

      // Pencarian Dua
      showElement(".card-info-favorit-dua");
      hideElement(".card-info-detail-favorit-dua");

      if (!$(".slider-favorit").hasClass("slick-initialized")) {
        initSlick(".slider-favorit", getSliderDefaultOptions());
      }

      if (!$(".slider-card-info-disukai").hasClass("slick-initialized")) {
        initSlick(".slider-card-info-disukai", getSliderDefaultOptions());

        setTimeout(function () {
          initSlick(".slider-card-info-disukai", getSliderDefaultOptions());
          addVideoEventHandlers(".slider-card-info-disukai");

          $(".slider-card-info-disukai").slick("resize");
        }, 100);

        // Play the first video (if it exists)
        let firstVideo = $(".slider-card-info-disukai").find(
          "div.slick-current video"
        );
        if (firstVideo.length) {
          firstVideo[0].play();
        }
      }

      //
      playVideoInWrapper(".video-wrapper-autoplay");

      //

      break;
    case "3":
      // Favorit
      showElement(".card-info-favorit");
      hideElement(".card-info-detail-favorit");

      // Pencarian
      ".card-info-pencarian";
      hideElement(".card-info-detail-pencarian");

      // Pencarian Dua
      hideElement(".card-info-favorit-dua");
      showElement(".card-info-detail-favorit-dua");

      if (!$(".slider-favorit-dua").hasClass("slick-initialized")) {
        initSlick(".slider-favorit-dua", getSliderDefaultOptions());
      }

      if (!$(".slider-card-info-disukai-dua").hasClass("slick-initialized")) {
        initSlick(".slider-card-info-disukai-dua", getSliderDefaultOptions());

        setTimeout(function () {
          initSlick(".slider-card-info-disukai-dua", getSliderDefaultOptions());
          addVideoEventHandlers(".slider-card-info-disukai-dua");

          $(".slider-card-info-disukai-dua").slick("resize");
        }, 100);

        // Play the first video (if it exists)
        let firstVideo = $(".slider-card-info-disukai-dua").find(
          "div.slick-current video"
        );
        if (firstVideo.length) {
          firstVideo[0].play();
        }
      }

      //
      playVideoInWrapper(".video-wrapper-autoplay");

      //

      break;
    // agen
    case "4":
      break;
  }
}

function resetAllCards() {
  hideElement(".card-info-pencarian");
  hideElement(".card-info-detail-pencarian");
  hideElement(".card-info-favorit");
  hideElement(".card-info-detail-favorit");
  hideElement(".card-info-favorit-dua");
  hideElement(".card-info-detail-favorit-dua");
}

function hideElement(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => el.classList.add("hidden"));
}

function showElement(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => el.classList.remove("hidden"));
}

// Function untuk pindah Menu Navigation
document.addEventListener("DOMContentLoaded", function () {
  const elements = {
    tabs: document.querySelectorAll('#kontenMenuTab [role="tab"]'),
    InputanSearch: document.querySelector("#InputanSearch"),
    InputanSearchAgen: document.querySelector("#InputanSearchAgen"),
    garisBatas: document.querySelector("#garisBatas"),
    btnHarga: document.getElementById("btnHarga"),
    btnCicilan: document.getElementById("btnCicilan"),
    btnKamar: document.getElementById("btnKamar"),
    btnPenjual: document.getElementById("btnPenjual"),
    btnJenisProperti: document.getElementById("btnJenisProperti"),
    btnJenisRumah: document.getElementById("btnJenisSurat"),
    btnJscore: document.getElementById("btnJscore"),
    btnJscoreAgent: document.getElementById("btnJscoreAgent"),
  };

  const element_btn_search = {
    // Search Default
    MenuSatuTab: document.getElementById("MenuSatuTab"),
    // Teks Berjalan
    MenuDuaTab: document.getElementById("MenuDuaTab"),
    MenuTigaTab: document.getElementById("MenuTigaTab"),
    MenuLimaTab: document.getElementById("MenuLimaTab"),
    MenuEnamTab: document.getElementById("MenuEnamTab"),
    MenuTujuhTab: document.getElementById("MenuTujuhTab"),
    MenuDelapanTab: document.getElementById("MenuDelapanTab"),
    MenuSembilanTab: document.getElementById("MenuSembilanTab"),
    MenuSepuluhTab: document.getElementById("MenuSepuluhTab"),
    MenuSebelasTab: document.getElementById("MenuSebelasTab"),
    MenuDuabelasTab: document.getElementById("MenuDuabelasTab"),
    // Search Agen
    MenuEmpatTab: document.getElementById("MenuEmpatTab"),
  };

  const elemnt_konten_search = {
    tagSearchAgen: document.getElementById("tagSearchAgen"),
    tagSearchAll: document.getElementById("tagSearchAll"),
    tagTeksBerjalan: document.getElementById("tagTeksBerjalan"),
  };

  const konten_element = {
    kontenBtnHarga: document.getElementById("kontenBtnHarga"),
    kontenBtnCicilan: document.getElementById("kontenBtnCicilan"),
    kontenBtnKamar: document.getElementById("kontenBtnKamar"),
    kontenBtnPenjual: document.getElementById("kontenBtnPenjual"),
    kontenBtnJenisProperti: document.getElementById("kontenBtnJenisProperti"),
    kontenBtnJenisRumah: document.getElementById("kontenBtnJenisSurat"),
    kontenBtnJscore: document.getElementById("kontenBtnJscore"),
    kontenBtnJscoreAgent: document.getElementById("kontenBtnJscoreAgent"),
  };

  const svg_element = {
    ArrowIconHarga: document.getElementById("arrow-icon-harga"),
    ArrowIconKamar: document.getElementById("arrow-icon-kamar"),
    ArrowIconPenjual: document.getElementById("arrow-icon-penjual"),
    ArrowIconJenisProperti: document.getElementById(
      "arrow-icon-jenis-properti"
    ),
    ArrowIconJenisRumah: document.getElementById("arrow-icon-jenis-surat"),
    ArrowIconJscore: document.getElementById("arrow-icon-jscore"),
  };

  const element_button = {
    searchButton: document.querySelector("#btnSearch"),
    btnTerapkan: document.querySelector("#btnTerapkan"),
  };

  //

  function toggleContent(element, konten, svgArrow) {
    if (konten.classList.contains("hidden")) {
      // jika konten sedang tertutup
      hideAllContent();
      konten.classList.remove("hidden");
      svgArrow.classList.add("rotate-180");
    } else {
      // jika konten sedang terbuka
      konten.classList.add("hidden");
      svgArrow.classList.remove("rotate-180");
    }
  }

  //

  function toggleMenuSearch(elemnt_konten_search, konten_element) {
    // Menyembunyikan semua elemen pencarian
    Object.values(elemnt_konten_search).forEach((element) => {
      element.classList.add("hidden");
    });

    // Menampilkan elemen yang sesuai dengan konten_element yang diberikan
    if (konten_element && elemnt_konten_search[konten_element]) {
      elemnt_konten_search[konten_element].classList.remove("hidden");

      // Mengaktifkan atau menonaktifkan teksBerjalan berdasarkan tab yang dipilih
      isTeksBerjalanActive = konten_element === "tagTeksBerjalan";
      if (isTeksBerjalanActive) {
        teksBerjalan();
      }
    }
  }

  //

  element_btn_search.MenuSatuTab.addEventListener("click", function () {
    toggleMenuSearch(elemnt_konten_search, "tagSearchAll");
  });

  element_btn_search.MenuDuaTab.addEventListener("click", function () {
    toggleMenuSearch(elemnt_konten_search, "tagTeksBerjalan");
  });

  element_btn_search.MenuTigaTab.addEventListener("click", function () {
    toggleMenuSearch(elemnt_konten_search, "tagTeksBerjalan");
  });

  // element_btn_search.MenuLimaTab.addEventListener("click", function () {
  //   toggleMenuSearch(elemnt_konten_search, "tagTeksBerjalan");
  // });

  // element_btn_search.MenuEnamTab.addEventListener("click", function () {
  //   toggleMenuSearch(elemnt_konten_search, "tagTeksBerjalan");
  // });

  element_btn_search.MenuTujuhTab.addEventListener("click", function () {
    toggleMenuSearch(elemnt_konten_search, "tagTeksBerjalan");
  });

  element_btn_search.MenuDelapanTab.addEventListener("click", function () {
    toggleMenuSearch(elemnt_konten_search, "tagTeksBerjalan");
  });

  // element_btn_search.MenuSembilanTab.addEventListener("click", function () {
  //   toggleMenuSearch(elemnt_konten_search, "tagTeksBerjalan");
  // });

  // element_btn_search.MenuSepuluhTab.addEventListener("click", function () {
  //   toggleMenuSearch(elemnt_konten_search, "tagTeksBerjalan");
  // });

  // element_btn_search.MenuSebelasTab.addEventListener("click", function () {
  //   toggleMenuSearch(elemnt_konten_search, "tagTeksBerjalan");
  // });

  // element_btn_search.MenuDuabelasTab.addEventListener("click", function () {
  //   toggleMenuSearch(elemnt_konten_search, "tagTeksBerjalan");
  // });

  element_btn_search.MenuEmpatTab.addEventListener("click", function () {
    toggleMenuSearch(elemnt_konten_search, "tagSearchAgen");
  });

  //

  elements.btnHarga.addEventListener("click", function () {
    toggleContent(
      elements.btnHarga,
      konten_element.kontenBtnHarga,
      svg_element.ArrowIconHarga
    );
  });

  elements.btnCicilan.addEventListener("click", function () {
    toggleContent(
      elements.btnCicilan,
      konten_element.kontenBtnCicilan,
      svg_element.ArrowIconCicilan
    );
  });

  elements.btnKamar.addEventListener("click", function () {
    toggleContent(
      elements.btnKamar,
      konten_element.kontenBtnKamar,
      svg_element.ArrowIconKamar
    );
  });

  elements.btnPenjual.addEventListener("click", function () {
    toggleContent(
      elements.btnPenjual,
      konten_element.kontenBtnPenjual,
      svg_element.ArrowIconPenjual
    );
  });

  elements.btnJenisProperti.addEventListener("click", function () {
    toggleContent(
      elements.btnJenisProperti,
      konten_element.kontenBtnJenisProperti,
      svg_element.ArrowIconJenisProperti
    );
  });

  elements.btnJenisRumah.addEventListener("click", function () {
    toggleContent(
      elements.btnJenisRumah,
      konten_element.kontenBtnJenisRumah,
      svg_element.ArrowIconJenisRumah
    );
  });

  elements.btnJscore.addEventListener("click", function () {
    toggleContent(
      elements.btnJscore,
      konten_element.kontenBtnJscore,
      svg_element.ArrowIconJscore
    );
  });

  elements.btnJscoreAgent.addEventListener("click", function () {
    toggleContent(
      elements.btnJscoreAgent,
      konten_element.kontenBtnJscoreAgent,
      svg_element.ArrowIconJscoreAgent
    );
  });

  function disable() {
    Object.values(elements).forEach((el) => {
      if (el.classList) {
        el.disabled = true;
        el.classList.add("bg-gray-200", "text-gray-500");
        el.classList.remove("bg-white");
      }
    });

    Object.values(element_button).forEach((el) => {
      el.disabled = true;
      el.classList.add("bg-gray-200", "text-gray-500");
      el.classList.remove("bg-blue-500", "text-white", "active_btn_search");
    });

    // document.getElementById("btnSaveInstagram").src =
    //   "./src/images/save-instagram-off.png";
  }

  function enable() {
    Object.values(elements).forEach((el) => {
      if (el.classList) {
        el.disabled = false;
        el.classList.add("bg-white");
        el.classList.remove("bg-gray-200", "text-gray-500");
      }
    });

    Object.values(element_button).forEach((el) => {
      el.disabled = false;
      el.classList.remove("bg-gray-200", "text-gray-500");
      el.classList.add("active_btn_search");
    });

    // document.getElementById("btnSaveInstagram").src =
    //   "./src/images/save-instagram-on.png";
  }

  function hideAllContent() {
    Object.values(konten_element).forEach((el) => {
      if (el.classList) {
        el.classList.add("hidden");
      }
    });

    Object.values(svg_element).forEach((el) => {
      if (el.id && el.id.startsWith("arrow-icon")) {
        el.classList.remove("rotate-180");
      }
    });
  }

  function toggleTab(tab) {
    const parentDiv = tab.closest(".menus");
    const contentDiv = document.getElementById(
      tab.getAttribute("aria-controls")
    );

    if (!parentDiv || !contentDiv) {
      console.warn("Element tidak ditemukan");
      return;
    }

    hideAllContent();

    switch (tab.id) {
      case "MenuSatuTab":
        isTeksBerjalanActive = false;
        closeTab();
        enable();
        stopAndResetVideo();
        if (!$(".slider-card-info").hasClass("slick-initialized")) {
          initSlickCardInfo();
        }
        break;
      case "MenuDuaTab":
        disable();
        closeTab();
        stopAndResetVideo();
        isTeksBerjalanActive = true;
        $(".teks-berjalan-pencarian").show();
        teksBerjalan();
        break;
      case "MenuTigaTab":
        // console.log("MenuTigaTab");
        initSlickFavorit();
        closeTab();
        stopAndResetVideo();
        enable();
        isTeksBerjalanActive = true;
        $(".teks-berjalan-pencarian").show();
        teksBerjalan();
        break;
      case "MenuEmpatTab":
        enable();
        closeTab();
        stopAndResetVideo();
        isTeksBerjalanActive = false;
        break;
      case "MenuLimaTab":
        stopAndResetVideo();
        closeTab();
        isTeksBerjalanActive = true;
        $(".teks-berjalan-pencarian").show();
        teksBerjalan();
        disable();
        break;
      case "MenuEnamTab":
        stopAndResetVideo();
        closeTab();
        isTeksBerjalanActive = true;
        $(".teks-berjalan-pencarian").show();
        teksBerjalan();
        initSlickFavoritDua();

        break;
      case "MenuTujuhTab":
        stopAndResetVideo();
        closeTab();
        isTeksBerjalanActive = true;
        $(".teks-berjalan-pencarian").show();
        teksBerjalan();
        disable();
        break;
      case "MenuDelapanTab":
        stopAndResetVideo();
        closeTab();
        isTeksBerjalanActive = true;
        $(".teks-berjalan-pencarian").show();
        teksBerjalan();
        disable();
        break;
      case "MenuSembilanTab":
        stopAndResetVideo();
        closeTab();
        isTeksBerjalanActive = true;
        $(".teks-berjalan-pencarian").show();
        teksBerjalan();
        disable();
        break;
      case "MenuSepuluhTab":
        stopAndResetVideo();
        closeTab();
        isTeksBerjalanActive = true;
        $(".teks-berjalan-pencarian").show();
        teksBerjalan();
        disable();
        break;
      case "MenuSebelasTab":
        stopAndResetVideo();
        closeTab();
        isTeksBerjalanActive = true;
        $(".teks-berjalan-pencarian").show();
        teksBerjalan();
        disable();
        break;
      case "MenuDuaBelasTab":
        stopAndResetVideo();
        closeTab();
        isTeksBerjalanActive = true;
        $(".teks-berjalan-pencarian").show();
        teksBerjalan();
        disable();
        break;
      default:
        disable();
        stopAndResetVideo();
        isTeksBerjalanActive = false;
        break;
    }
  }

  function activateTab(tab) {
    // Remove active class from all tabs
    elements.tabs.forEach((t) => {
      t.classList.remove("bg-aktif-menu");
      t.setAttribute("aria-selected", false);
    });
    // Add active class to the clicked tab
    tab.classList.add("bg-aktif-menu");
    tab.setAttribute("aria-selected", true);
  }

  elements.tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activateTab(tab);
      toggleTab(tab);

      if (tab.id === "MenuSatuTab") {
        enable();
      } else if (
        (tab.id === "MenuEmpatTab" || tab.id === "MenuTigaTab",
        tab.id === "MenuTujuhTab",
        tab.id === "MenuDelapanTab")
      ) {
        enable();
        toggleMenuSearch(elemnt_konten_search, "tagSearchAll");
      } else {
        disable();
      }
    });
  });
  //
});

// Tag
document.addEventListener("DOMContentLoaded", () => {
  // Tag Harga
  const buttonsHarga = [
    document.getElementById("btn1M"),
    document.getElementById("btn2M"),
    document.getElementById("btn3M"),
    document.getElementById("btnMore3M"),
  ];

  const minInput = document.getElementById("minInput");
  const maxInput = document.getElementById("maxInput");

  const deactivateButtonsHarga = () => {
    buttonsHarga.forEach((button) => button.classList.remove("active_btn_tag"));
  };

  const adjustInputs = (disabled, withBorder) => {
    [minInput, maxInput].forEach((input) => {
      input.disabled = disabled;
      input.classList.toggle("bg-transparent", !disabled);
      input.classList.toggle("bg-gray-200", disabled);
      if (withBorder) {
        input.style.borderBottom = "1px solid";
      } else {
        input.style.border = "none";
      }
    });
  };

  buttonsHarga.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("active_btn_tag")) {
        btn.classList.remove("active_btn_tag");
        adjustInputs(false, true); // enable the inputs with border
      } else {
        deactivateButtonsHarga();
        btn.classList.add("active_btn_tag");
        adjustInputs(true, false); // disable the inputs without border
      }
    });
  });

  const handleInputChange = () => {
    const isValuePresent = !!minInput.value || !!maxInput.value;
    if (isValuePresent) {
      deactivateButtonsHarga();
      adjustInputs(false, true); // enable the inputs with border
    }
  };

  minInput.addEventListener("input", handleInputChange);
  maxInput.addEventListener("input", handleInputChange);

  // Tag Luas
  const allButtonsLuas = document.querySelectorAll(".btn-price");

  const deactivateButtonsLuas = (buttons) => {
    buttons.forEach((button) => {
      button.classList.remove("active_btn_tag");
    });
  };

  allButtonsLuas.forEach((button) => {
    button.addEventListener("click", () => {
      const siblingButtons =
        button.parentElement.parentElement.querySelectorAll(".btn-price");

      if (button.classList.contains("active_btn_tag")) {
        button.classList.remove("active_btn_tag");
      } else {
        deactivateButtonsLuas(siblingButtons);

        button.classList.add("active_btn_tag");
      }
    });
  });

  // Tag Kamar

  const kamarButtons = document.querySelectorAll(".room-button");

  const deactivateButtonsKamar = (buttons) => {
    buttons.forEach((button) => {
      button.classList.remove("active_btn_kamar");
    });
  };

  kamarButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const siblingButtons =
        button.parentElement.parentElement.querySelectorAll(".room-button");

      if (button.classList.contains("active_btn_kamar")) {
        button.classList.remove("active_btn_kamar");
      } else {
        deactivateButtonsKamar(siblingButtons);

        button.classList.add("active_btn_kamar");
      }
    });
  });

  //
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
      ibadah: [
        ...document.querySelectorAll(".favoritSarprasIbadahTab"),
        ...document.querySelectorAll(".sarprasIbadahTab"),
      ],
      miniMarket: [
        ...document.querySelectorAll(".favoritSarprasMiniMarketTab"),
        ...document.querySelectorAll(".sarprasMiniMarketTab"),
      ],
      graduation: [
        ...document.querySelectorAll(".favoritSarprasSekolahTab"),
        ...document.querySelectorAll(".sarprasSekolahTab"),
      ],
      spork: [
        ...document.querySelectorAll(".favoritSarprasRestoranTab"),
        ...document.querySelectorAll(".sarprasRestoranTab"),
      ],
      cycling: [
        ...document.querySelectorAll(".favoritSarprasTransportasiTab"),
        ...document.querySelectorAll(".sarprasTransportasiTab"),
      ],
    },
    indeks: {
      ecci: [
        ...document.querySelectorAll(".favoritIndeksECCITab"),
        ...document.querySelectorAll(".indeksECCITab"),
      ],
      livability: [
        ...document.querySelectorAll(".favoritIndeksLivabilityTab"),
        ...document.querySelectorAll(".indeksLivabilityTab"),
      ],
      investment: [
        ...document.querySelectorAll(".favoritIndeksInvesmentTab"),
        ...document.querySelectorAll(".indeksInvesmentTab"),
      ],
    },
    kalkulasi: {
      kpr: [
        ...document.querySelectorAll(".favoritKalkulatorkprTab"),
        ...document.querySelectorAll(".kalkulatorkprTab"),
      ],
      hargaWajar: [
        ...document.querySelectorAll(".favoritKalkulatorhargawajarTab"),
        ...document.querySelectorAll(".kalkulatorhargawajarTab"),
      ],
    },
  };

  const images = {};
  for (let category in tabs) {
    images[category] = {};
    for (let tab in tabs[category]) {
      images[category][tab] = tabs[category][tab].map((tabElement) =>
        tabElement.querySelector("img")
      );
    }
  }

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

document.addEventListener("DOMContentLoaded", function () {
  // Beranda
  const hasilElem = document.getElementById("HasilRangBeranda");
  const controlRangeElem = document.getElementById("ControlRangeBeranda");

  // Fungsi untuk mengupdate tampilan radius
  function updateRadiusDisplay() {
    const radius = controlRangeElem.value;
    hasilElem.textContent = `Radius ${radius} Km`;
  }

  // Event listener untuk perubahan pada input range
  controlRangeElem.addEventListener("input", updateRadiusDisplay);

  // Panggil fungsi untuk set tampilan awal
  updateRadiusDisplay();

  // Favorit
  const hasilElemFavorit = document.getElementById("HasilRangFavorit");
  const controlRangeElemFavorit = document.getElementById(
    "ControlRangeFavorit"
  );

  // Fungsi untuk mengupdate tampilan radius pada favorit
  function updateRadiusDisplayFavorit() {
    const radiusFavorit = controlRangeElemFavorit.value;
    hasilElemFavorit.textContent = `Radius ${radiusFavorit} Km`;
  }

  // Event listener untuk perubahan pada input range favorit
  controlRangeElemFavorit.addEventListener("input", updateRadiusDisplayFavorit);

  // Panggil fungsi untuk set tampilan awal
  updateRadiusDisplayFavorit();
});

// document.addEventListener("DOMContentLoaded", function () {
//   document
//     .getElementById("threetourberanda-tab")
//     .addEventListener("click", function () {
//       initThreeTour();
//     });
// });

$("body>.tooltip").remove();

let isTeksBerjalanActive = false;

function teksBerjalan() {
  if (isTeksBerjalanActive) {
    // Hentikan marquee sebelumnya jika sudah ada
    $(".teks-berjalan-pencarian").marquee("destroy");

    // Inisialisasi ulang marquee
    $(".teks-berjalan-pencarian").marquee({
      duration: 17500,
      delayBeforeStart: 0,
      direction: "left",
      pauseOnHover: true,
      // duplicated: true, // ini akan menduplikasi teks jika teks lebih pendek dari lebar container
      // startVisible: true, // ini akan memastikan bahwa teks akan selalu terlihat ketika animasi dimulai
    });
  }
}
