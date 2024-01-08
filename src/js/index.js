import prevArrowImg from "../images/prev.png";
import nextArrowImg from "../images/next.png";

// Menyiapkan objek untuk menyimpan userName dan elemen terkait
var userElements = {};

// Memilih semua elemen dengan kelas 'name-user'
var nameUserElements = document.querySelectorAll(".name-user");

nameUserElements.forEach(function (element) {
  var nameElement = element.querySelector("p");
  if (nameElement) {
    var userName = nameElement.textContent;
    userElements[userName] = element;
  }
});

// Fungsi untuk menambahkan kelas 'aktif-menu-pesan' ke elemen yang diklik
// function addActiveClass() {
//   // Menghapus kelas 'aktif-menu-pesan' dari semua elemen terlebih dahulu
//   nameUserElements.forEach(function (el) {
//     el.classList.remove("aktif-menu-pesan");
//   });

//   // Menambahkan kelas 'aktif-menu-pesan' ke elemen yang diklik
//   element.classList.add("aktif-menu-pesan");
// }

// Menambahkan event listener ke setiap elemen
// nameUserElements.forEach(function (element) {
//   element.addEventListener("click", function () {
//     addActiveClass(element);
//   });
// });

// function toggle
// function toggleDropdown(id) {
//   const menuButtons = document.querySelectorAll("[id^='menu-button-']");
//   const dropdownMenus = document.querySelectorAll("[id^='dropdown-menu-']");
//   const selectedMenuButton = document.getElementById(`menu-button-${id}`);
//   const selectedDropdownMenu = document.getElementById(`dropdown-menu-${id}`);
//   const isExpanded =
//     selectedMenuButton.getAttribute("aria-expanded") === "true";

//   // Toggle the current dropdown menu
//   selectedMenuButton.setAttribute("aria-expanded", !isExpanded);
//   selectedDropdownMenu.classList.toggle("hidden", isExpanded);

//   // Rotate arrow
//   const arrow = selectedMenuButton.querySelector("svg");
//   arrow.style.transform = isExpanded ? "rotate(0deg)" : "rotate(180deg)";

//   // Close all other dropdown menus
//   menuButtons.forEach((button, index) => {
//     if (button.id !== selectedMenuButton.id) {
//       button.setAttribute("aria-expanded", false);
//       dropdownMenus[index].classList.add("hidden");

//       // Rotate other arrows back
//       const otherArrow = button.querySelector("svg");
//       otherArrow.style.transform = "rotate(0deg)";
//     }
//   });
// }

document.getElementById("luas1").innerHTML = "<100";
document.getElementById("btn1").innerHTML = "<100";

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

window.showAddFormStories = function (element) {
  event.preventDefault();
  event.stopPropagation();

  // resetAllCards();

  // Favorit
  // hideElement(".card-info-detail-favorit");

  // // Pencarian
  // ".card-info-pencarian";
  // hideElement(".card-detail-beranda");

  // // Pencarian Dua
  // hideElement(".card-info-favorit-dua");
  // showElement(".card-info-detail-favorit-dua");
  hideElement(".story-galeri-off");
  hideElement(".story-galeri-on");
  hideElement(".story-galeri-on-tujuh");
  hideElement(".story-galeri-on-delapan");
  hideElement(".story-galeri-on-sembilan");
  showElement(".story-add-form");
};

// ------------Start Drodpdown------------------

// Fungsi umum untuk mengganti tampilan dropdown
function toggleDropdown(dropdownMenu, arrowIcon, isOpen) {
  // Mengganti status dropdown dan memperbarui tampilan
  isOpen = !isOpen;
  dropdownMenu.classList.toggle("hidden", !isOpen);
  arrowIcon.style.transform = isOpen ? "rotate(180deg)" : "rotate(0deg)";
  return isOpen; // Mengembalikan status terbaru
}

// Fungsi untuk menangani pemilihan item dropdown
function selectDropdownItem(
  selectedItemElement,
  dropdownMenu,
  arrowIcon,
  isOpen
) {
  return function (event) {
    // Cek jika yang diklik adalah item menu
    if (event.target.getAttribute("role") === "menuitem") {
      selectedItemElement.textContent = event.target.textContent.trim();
      // Menutup dropdown setelah pemilihan item
      isOpen = false;
      dropdownMenu.classList.add("hidden");
      arrowIcon.style.transform = "rotate(0deg)";
    }
  };
}

// Fungsi untuk menutup dropdown jika klik di luar area dropdown
function closeDropdownOnClickOutside(dropdownButton, dropdownMenu, arrowIcon) {
  return function (event) {
    if (
      !dropdownButton.contains(event.target) &&
      !dropdownMenu.contains(event.target)
    ) {
      dropdownMenu.classList.add("hidden");
      arrowIcon.style.transform = "rotate(0deg)";
    }
  };
}

// Inisialisasi Dropdown Pencarian
const dropdownButtonPencarian = document.getElementById(
  "dropdown-button-pencarian"
);
const dropdownMenuPencarian = document.getElementById(
  "dropdown-menu-pencarian"
);
const arrowIconPencarian = document.getElementById("arrow-icon-pencarian");
const selectedItemPencarian = document.getElementById(
  "selected-item-pencarian"
);
let isDropdownPencarianOpen = false;

dropdownButtonPencarian.addEventListener("click", () => {
  isDropdownPencarianOpen = toggleDropdown(
    dropdownMenuPencarian,
    arrowIconPencarian,
    isDropdownPencarianOpen
  );
});
dropdownMenuPencarian.addEventListener(
  "click",
  selectDropdownItem(
    selectedItemPencarian,
    dropdownMenuPencarian,
    arrowIconPencarian,
    isDropdownPencarianOpen
  )
);

// Inisialisasi Dropdown Pencarian
const dropdownButtonPencarianPertama = document.getElementById(
  "dropdown-button-pencarian-pertama"
);
const dropdownMenuPencarianPertama = document.getElementById(
  "dropdown-menu-pencarian-pertama"
);
const arrowIconPencarianPertama = document.getElementById(
  "arrow-icon-pencarian-pertama"
);
const selectedItemPencarianPertama = document.getElementById(
  "selected-item-pencarian-pertama"
);
let isDropdownPencarianOpenPertama = false;

dropdownButtonPencarianPertama.addEventListener("click", () => {
  isDropdownPencarianOpenPertama = toggleDropdown(
    dropdownMenuPencarianPertama,
    arrowIconPencarianPertama,
    isDropdownPencarianOpenPertama
  );
});
dropdownMenuPencarianPertama.addEventListener(
  "click",
  selectDropdownItem(
    selectedItemPencarianPertama,
    dropdownMenuPencarianPertama,
    arrowIconPencarianPertama,
    isDropdownPencarianOpenPertama
  )
);

// Inisialisasi Dropdown Agent
const dropdownButtonAgent = document.getElementById("dropdown-button-agent");
const dropdownMenuAgent = document.getElementById("dropdown-menu-agent");
const arrowIconAgent = document.getElementById("arrow-icon-agent");
const selectedItemAgent = document.getElementById("selected-item-agent");
let isDropdownAgentOpen = false;

dropdownButtonAgent.addEventListener("click", () => {
  isDropdownAgentOpen = toggleDropdown(
    dropdownMenuAgent,
    arrowIconAgent,
    isDropdownAgentOpen
  );
});
dropdownMenuAgent.addEventListener(
  "click",
  selectDropdownItem(
    selectedItemAgent,
    dropdownMenuAgent,
    arrowIconAgent,
    isDropdownAgentOpen
  )
);

// Inisialisasi Dropdown Disukai
const dropdownButtonDisukai = document.getElementById(
  "dropdown-disukai-button"
);
const dropdownMenuDisukai = document.getElementById("dropdown-disukai-menu");
const arrowIconDisukai = document.getElementById("dropdown-disukai-arrow-icon");
const selectedItemDisukai = document.getElementById(
  "dropdown-disukai-selected-item"
);
let isDropdownDisukaiOpen = false;

dropdownButtonDisukai.addEventListener("click", () => {
  isDropdownDisukaiOpen = toggleDropdown(
    dropdownMenuDisukai,
    arrowIconDisukai,
    isDropdownDisukaiOpen
  );
});
dropdownMenuDisukai.addEventListener(
  "click",
  selectDropdownItem(
    selectedItemDisukai,
    dropdownMenuDisukai,
    arrowIconDisukai,
    isDropdownDisukaiOpen
  )
);

// Inisialisasi Dropdown DetailAgent
const dropdownButtonDetailAgent = document.getElementById(
  "dropdown-agen-button"
);
const dropdownMenuDetailAgent = document.getElementById("dropdown-agen-menu");
const arrowIconDetailAgent = document.getElementById(
  "dropdown-agen-arrow-icon"
);
const selectedItemDetailAgent = document.getElementById(
  "dropdown-agen-selected-item"
);
let isDropdownDetailAgentOpen = false;

dropdownButtonDetailAgent.addEventListener("click", () => {
  isDropdownDetailAgentOpen = toggleDropdown(
    dropdownMenuDetailAgent,
    arrowIconDetailAgent,
    isDropdownDetailAgentOpen
  );
});
dropdownMenuDetailAgent.addEventListener(
  "click",
  selectDropdownItem(
    selectedItemDetailAgent,
    dropdownMenuDetailAgent,
    arrowIconDetailAgent,
    isDropdownDetailAgentOpen
  )
);

// Menambahkan event listener ke window untuk menutup dropdown jika klik di luar
window.addEventListener(
  "click",
  closeDropdownOnClickOutside(
    dropdownButtonPencarian,
    dropdownMenuPencarian,
    arrowIconPencarian
  )
);
window.addEventListener(
  "click",
  closeDropdownOnClickOutside(
    dropdownButtonDisukai,
    dropdownMenuDisukai,
    arrowIconDisukai
  )
);

// ------------End Drodpdown------------------

// Fungsi Play dan Pause Video Menu Beranda, Favorit

// Fungsi untuk memulai video berdasarkan ID
function playVideoById(videoId) {
  var videoElement = document.getElementById(videoId);
  // console.log(videoElement);
  if (videoElement) {
    // Periksa jika video sudah siap untuk diputar
    if (videoElement.readyState >= 3) {
      videoElement.play();
    } else {
      // Tambahkan event listener jika video belum siap
      videoElement.addEventListener("canplay", function () {
        videoElement.play();
      });
    }
  }
}

// Fungsi untuk menghentikan dan mereset video berdasarkan ID
function stopAndResetVideoById(videoId) {
  var videoElement = document.getElementById(videoId);
  if (videoElement) {
    videoElement.pause(); // Menghentikan video
    videoElement.currentTime = 0; // Mereset waktu video ke awal
  }
}

// Fungsi untuk mereset gaya pada semua tab dan menandai tab 'Tampak Ruang' sebagai aktif
function resetTabStyles(tabsSelector, activeTabId) {
  var tabs = document.querySelectorAll(tabsSelector);
  tabs.forEach(function (tab) {
    // Menghapus kelas gaya untuk tab aktif
    tab.classList.remove(
      "text-blue-600",
      "border-blue-600",
      "dark:text-blue-500",
      "dark:border-blue-500"
    );
    // Menambahkan kelas gaya untuk tab tidak aktif
    tab.classList.add(
      "hover:text-gray-700",
      "hover:border-gray-300",
      "dark:border-transparent",
      "text-gray-500",
      "dark:text-gray-400",
      "border-gray-100",
      "dark:border-gray-700",
      "dark:hover:text-gray-300"
    );
    // Menandai semua tab sebagai tidak terpilih
    tab.setAttribute("aria-selected", "false");
  });

  // Menandai tab default sebagai terpilih
  var defaultTab = document.getElementById(activeTabId);
  if (defaultTab) {
    defaultTab.classList.remove(
      "hover:text-gray-700",
      "hover:border-gray-300",
      "dark:border-transparent",
      "text-gray-500",
      "dark:text-gray-400",
      "border-gray-100",
      "dark:border-gray-700",
      "dark:hover:text-gray-300"
    );
    defaultTab.classList.add(
      "text-blue-600",
      "border-blue-600",
      "dark:text-blue-500",
      "dark:border-blue-500"
    );
    defaultTab.setAttribute("aria-selected", "true");
  }
}

// Fungsi untuk menyembunyikan semua konten tab dan menampilkan konten untuk tab default
function resetActiveTabContent(contentsSelector, defaultContentId) {
  var contents = document.querySelectorAll(contentsSelector);
  // console.log(contents);
  contents.forEach(function (content) {
    content.classList.add("hidden");
  });

  var defaultContent = document.getElementById(defaultContentId);
  if (defaultContent) {
    defaultContent.classList.remove("hidden");
  }
}

// Fungsi untuk mengaktifkan tab dan kontennya berdasarkan ID
function setActiveTab(tabButtonId, tabContentId) {
  var activeTab = document.getElementById(tabButtonId);
  var activeContent = document.getElementById(tabContentId);

  if (activeTab && activeContent) {
    // Reset semua tab dan konten
    resetTabStyles(
      '#DetailBeranda [role="tab"], #DetailFavorit [role="tab"]',
      tabButtonId
    );
    resetActiveTabContent(
      '#DetailBerandaContent [role="tabpanel"], #DetailFavoritContent [role="tabpanel"]',
      tabContentId
    );

    // Mengatur gaya dan atribut 'aria-selected' untuk tab aktif
    activeTab.classList.remove(
      "hover:text-gray-700",
      "hover:border-gray-300",
      "dark:border-transparent",
      "text-gray-500",
      "dark:text-gray-400",
      "border-gray-100",
      "dark:border-gray-700",
      "dark:hover:text-gray-300"
    );
    activeTab.classList.add(
      "text-blue-600",
      "border-blue-600",
      "dark:text-blue-500",
      "dark:border-blue-500"
    );
    activeTab.setAttribute("aria-selected", "true");

    // Menampilkan konten tab yang aktif
    activeContent.classList.remove("hidden");

    // Jika tab 'detail-beranda-satu' atau 'detail-favorit-satu' yang diaktifkan, putar videonya
    if (tabButtonId === "detail-beranda-satu-tab") {
      // Nonaktifkan video 'detail-favorit-satu' jika sedang diputar
      // playVideoById("video-detail-beranda");
    } else if (tabButtonId === "detail-favorit-satu-tab") {
      playVideoById("video-detail-favorit"); // Pastikan ID ini sesuai dengan ID video Anda
    } else {
      // Jika tab lain yang diaktifkan, hentikan dan reset video 'detail-beranda-satu'
      stopAndResetVideoById("video-detail-beranda"); // Pastikan ID ini sesuai dengan ID video Anda
      stopAndResetVideoById("video-detail-favorit"); // Pastikan ID ini sesuai dengan ID video Anda
    }
  }
}

// Fungsi untuk menambahkan event listener pada setiap tab
function setTabListeners() {
  var tabs = document.querySelectorAll(
    '#DetailBeranda [role="tab"], #DetailFavorit [role="tab"]'
  );
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      setActiveTab(tab.id, tab.getAttribute("aria-controls"));
    });
  });
}

// Fungsi untuk menambahkan event listener pada setiap tab favorit
// function setFavoritTabListeners() {
//   var tabs = document.querySelectorAll('#DetailFavorit [role="tab"]');
//   tabs.forEach(function (tab) {
//     tab.addEventListener("click", function () {
//       setActiveTab(tab.id, tab.getAttribute("aria-controls"));
//     });
//   });
// }

// Event listener yang dijalankan saat halaman web selesai dimuat
document.addEventListener("DOMContentLoaded", function () {
  // nonaktifkan video 'detail-beranda-satu' jika sedang diputar
  resetTabStyles('#DetailBeranda [role="tab"]', "detail-beranda-satu-tab");
  resetActiveTabContent(
    '#DetailBeranda [role="tabpanel"]',
    "detail-beranda-satu"
  );
  setTabListeners();

  // Set tab favorit default
  resetTabStyles('#DetailFavorit [role="tab"]', "detail-favorit-satu-tab");
  resetActiveTabContent(
    '#DetailFavorit [role="tabpanel"]',
    "detail-favorit-satu"
  );
  // Tidak perlu memanggil setFavoritTabListeners karena setTabListeners sudah menangani semua tab
});

// -------------------Start Chart-------------------
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

var ctx1 = document.getElementById("chartFavorit").getContext("2d");
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
var ctx1 = document.getElementById("myRadarChartPencarianDua").getContext("2d");
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

// var ctx2 = document.getElementById("mySecondRadarChart").getContext("2d");
// var mySecondRadarChart = new Chart(ctx2, {
//   type: "radar",
//   data: {
//     labels: [
//       "Pengelolaan Limbah",
//       "Topografi",
//       "Kebencanaan",
//       "Keseterdian Air",
//       "Kualitas Vegetasi",
//     ],
//     datasets: [
//       {
//         data: [3, 5, 2, 4, 3],
//         backgroundColor: "rgba(255, 99, 132, 0.2)",
//         borderColor: "rgba(255, 99, 132, 1)",
//         borderWidth: 1,
//       },
//     ],
//   },
//   options: {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       r: {
//         beginAtZero: true,
//         max: 5,
//         stepSize: 1, // Menambahkan ini agar tidak ada angka desimal
//         ticks: {
//           precision: 0, // Menambahkan ini agar tidak ada angka desimal
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         display: false, // Menyembunyikan legenda
//       },
//       tooltip: {
//         enabled: true, // Menyembunyikan tooltip
//       },
//     },
//   },
// });

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

// -------------------End Chart-------------------

// -------------------Start Slider-------------------
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
                    <img style="margin-right: 1px;" class="custom-img-slick" src="${prevArrowImg}" alt="Previous">
                  </div>
                </button>`,
    nextArrow: `<button type="button" class="slick-next" onclick="event.stopPropagation();">
                  <div class="img-wrapper">
                    <img style="margin-left: 1px;" class="custom-img-slick" src="${nextArrowImg}" alt="Next">
                  </div>
                </button>`,
  };
}

function getSliderStoryGaleri() {
  return {
    slidesToShow: 9,
    slidesToScroll: 5,
    infinite: false,
    dots: false,
    prevArrow: `<button type="button" class="slick-prev slick-prev-story" style="margin-left:-40px !important; onclick="event.stopPropagation();">
    <div>
                  <div class="img-wrapper" style="border: 1.5px solid #afb4b8;">
                    <img style="margin-right: 1px;" class="custom-img-slick" src="${prevArrowImg}" alt="Previous">
                  </div>
                </button>`,
    nextArrow: `<button type="button" class="slick-next slick-next-story" style="margin-right:-46px!important; onclick="event.stopPropagation();">
                  <div class="img-wrapper" style="border: 1.5px solid #afb4b8;">
                    <img style="margin-left: 1px;" class="custom-img-slick" src="${nextArrowImg}" alt="Next">
                  </div>
                </button>`,
  };
}

// Example of initializing the slider and setting up the wheel event handler
$(document).ready(function () {
  var slider = $(".slider-story-galeri");
  var sliderConfig = getSliderStoryGaleri();

  slider.slick(sliderConfig);

  slider.on("wheel", function (e) {
    e.preventDefault();

    // Check horizontal wheel movement (deltaX) for left/right navigation
    if (Math.abs(e.originalEvent.deltaX) > Math.abs(e.originalEvent.deltaY)) {
      if (e.originalEvent.deltaX > 0) {
        slider.slick("slickNext");
      } else {
        slider.slick("slickPrev");
      }
    }
  });
});

function getSliderVideo() {
  return {
    dots: false,
    infinite: false,
    arrows: true,
    pauseOnHover: false,
    swipe: false,
    prevArrow: `<button type="button" class="slick-prev" onclick="event.stopPropagation();">
                  <div class="img-wrapper">
                    <img style="margin-right: 1px;" class="custom-img-slick" src="${prevArrowImg}" alt="Previous">
                  </div>
                </button>`,
    nextArrow: `<button type="button" class="slick-next" onclick="event.stopPropagation();">
                  <div class="img-wrapper">
                    <img style="margin-left: 1px;" class="custom-img-slick" src="${nextArrowImg}" alt="Next">
                  </div>
                </button>`,
  };
}

function getSliderDetail() {
  return {
    dots: true,
    infinite: false,
    arrows: true,
    pauseOnHover: false,
    swipe: false,
    prevArrow: `<button type="button" class="slick-prev" onclick="event.stopPropagation();">
                  <div class="img-wrapper">
                    <img style="margin-right: 1px;" class="custom-img-slick" src="${prevArrowImg}" alt="Previous">
                  </div>
                </button>`,
    nextArrow: `<button type="button" class="slick-next" onclick="event.stopPropagation();">
                  <div class="img-wrapper">
                    <img style="margin-left: 1px;" class="custom-img-slick" src="${nextArrowImg}" alt="Next">
                  </div>
                </button>`,
    dotsClass: "slick-dots custom-dots-class",
  };
}

function getSliderDefaultOptionsPesan() {
  return {
    dots: true,
    infinite: false,
    arrows: true,
    pauseOnHover: false,
    swipe: false,
    prevArrow: `<button type="button" class="slick-prev" onclick="event.stopPropagation();">
                  <div class="img-wrapper-pesan">
                    <img style="margin-right: 1px;" class="custom-img-slick" src="${prevArrowImg}" alt="Previous">
                  </div>
                </button>`,
    nextArrow: `<button type="button" class="slick-next" onclick="event.stopPropagation();">
                  <div class="img-wrapper-pesan">
                    <img style="margin-left: 1px;" class="custom-img-slick" src="${nextArrowImg}" alt="Next">
                  </div>
                </button>`,
  };
}

function initSlickCardInfo(sliderClass) {
  var $slider = $("." + sliderClass);
  var $mediaElements = $slider.find("img, video");
  var mediaLoadedCount = 0;

  $mediaElements.each(function () {
    var $media = $(this);
    if ($media.is("img")) {
      if ($media[0].complete) {
        incrementMediaLoadedCount();
      } else {
        $media.on("load", incrementMediaLoadedCount);
      }
    } else if ($media.is("video")) {
      if ($media[0].readyState >= 4) {
        incrementMediaLoadedCount();
      } else {
        $media.on("canplaythrough", incrementMediaLoadedCount);
      }
    }
  });

  function incrementMediaLoadedCount() {
    mediaLoadedCount++;
    if (mediaLoadedCount === $mediaElements.length) {
      initializeSlider();
    }
  }

  function initializeSlider() {
    $slider
      .on("init", function () {
        moveDotsToCustomContainer();
        addClickHandlerToDots();
        disableClickHandlerToDots();
        resizePlayer($slider.find("video"));
      })
      .slick(getSliderDefaultOptions())
      .css("visibility", "visible")
      .animate({ opacity: 1 }, 600); // Fade in the slider smoothly
  }
}

function resizePlayer(videos) {
  if (!videos[0]) return;

  var container = $(".slider-card-beranda"),
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

function initSlickStoryGaleri() {
  $(".slider-story-galeri")
    .on("init", function () {
      setTimeout(function () {
        moveDotsToCustomContainer();
        addClickHandlerToDots();
        disableClickHandlerToDots();
      }, 0);
    })
    .slick(getSliderStoryGaleri());
}

function initSlickVideo() {
  $(".slider-menu-video")
    .on("init", function () {
      setTimeout(function () {
        moveDotsToCustomContainer();
        addClickHandlerToDots();
        disableClickHandlerToDots();
      }, 0);
    })
    .slick(getSliderVideo());
}

function cardModeTigaFavorit() {
  $(".slider-card-mode-ketiga-fav")
    .on("init", function () {
      setTimeout(function () {
        moveDotsToCustomContainer();
        addClickHandlerToDots();
        disableClickHandlerToDots();
      }, 0);
    })
    .slick(getSliderDefaultOptions());
}

function initSlickPesan() {
  $(".slider-card-info-detail-peta")
    .on("init", function () {
      setTimeout(function () {
        moveDotsToCustomContainer();
        addClickHandlerToDots();
        disableClickHandlerToDots();
      }, 0);
    })
    .slick(getSliderDefaultOptions());
}

function initSlickAgenDetail() {
  $(".slider-detailagen")
    .on("init", function () {
      setTimeout(function () {
        moveDotsToCustomContainer();
        addClickHandlerToDots();
        disableClickHandlerToDots();
      }, 0);
    })
    .slick(getSliderDefaultOptions());
}

function initSlickAgent() {
  $(".slider-agent")
    .on("init", function () {
      setTimeout(function () {
        moveDotsToCustomContainer();
        addClickHandlerToDots();
        disableClickHandlerToDots();
      }, 0);
    })
    .slick(getSliderDefaultOptions());
}

function initSlickPasang() {
  $(".slider-pasang")
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

function disableClickHandlerToDots() {
  $(".slick-dots li button")
    .off("click")
    .click(function (e) {
      e.preventDefault();
      return false;
    });
}

function moveDotsToCustomContainer() {
  const dots = $(".slider-card-beranda .slick-dots");
  $(".custom-dot-slick").append(dots);
}

function addClickHandlerToDots() {
  $(".slider-card-beranda .slick-dots li").on("click", function (event) {
    event.stopPropagation();
  });
}

// -------------------Start Slider-------------------

$(document).ready(function () {
  initSlickCardInfo("slider-card-beranda");
  initSlickStoryGaleri();
  cardModeTiga();
  cardModePesan();

  // cardModeTigaFavorit();
});

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
  // Beranda
  $(".slider-card-beranda video").on("mouseover", function () {
    $(this).get(0).play();
  });

  $(".slider-card-beranda video").on("mouseout", function () {
    $(this).get(0).pause();
  });
  resizePlayer($(".slider-card-beranda video"));

  // Favorit
  $(".slider-favorit video").on("mouseover", function () {
    $(this).get(0).play();
  });

  $(".slider-favorit video").on("mouseout", function () {
    $(this).get(0).pause();
  });
  resizePlayer($(".slider-favorit video"));

  // Video
  $(".slider-menu-video video").on("mouseover", function () {
    $(this).get(0).play();
  });

  $(".slider-menu-video video").on("mouseout", function () {
    $(this).get(0).pause();
  });
  resizePlayer($(".slider-menu-video video"));

  // Detail Agen
  $(".slider-detailagen video").on("mouseover", function () {
    $(this).get(0).play();
  });

  $(".slider-detailagen video").on("mouseout", function () {
    $(this).get(0).pause();
  });
  resizePlayer($(".slider-detailagen video"));

  // Agent
  $(".slider-agent video").on("mouseover", function () {
    $(this).get(0).play();
  });

  $(".slider-agent video").on("mouseout", function () {
    $(this).get(0).pause();
  });
  resizePlayer($(".slider-agent video"));

  // Pasang
  $(".slider-pasang video").on("mouseover", function () {
    $(this).get(0).play();
  });

  $(".slider-pasang video").on("mouseout", function () {
    $(this).get(0).pause();
  });
  resizePlayer($(".slider-pasang video"));

  // Pencarian
  $(".slider-favorit-dua video").on("mouseover", function () {
    $(this).get(0).play();
  });

  $(".slider-favorit-dua video").on("mouseout", function () {
    $(this).get(0).pause();
  });
  resizePlayer($(".slider-favorit-dua video"));

  $(".mode-mini-video video").on("mouseover", function () {
    $(this).get(0).play();
  });

  $(".mode-mini-video video").on("mouseout", function () {
    $(this).get(0).pause();
  });
  resizePlayer($(".mode-mini-video video"));
});

window.closeTab = function (element) {
  var BtnBackStories = document.querySelectorAll(".stories_back");
  BtnBackStories.forEach(function (element) {
    element.classList.add("hidden");
  });
  // Pencarian
  showElement(".card-info-pencarian");
  hideElement(".card-detail-beranda");

  // Pencarian
  showElement(".card-info-pencarian");
  hideElement(".card-detail-beranda");

  showElement(".story-galeri-off");
  hideElement(".story-galeri-on");

  stopAndResetVideoById("video-detail-beranda");

  // Mengubah teks semua elemen dengan class 'judulStory'
  var judulStoryElements = document.querySelectorAll(".judulStory");
  judulStoryElements.forEach(function (element) {
    element.textContent = "Galeri";
  });
};

// Fungsi untuk menampilkan elemen
function showElement(selector) {
  document.querySelector(selector).classList.remove("hidden");
}

// Fungsi untuk menyembunyikan elemen
function hideElement(selector) {
  document.querySelector(selector).classList.add("hidden");
}

window.closeTabDisukai = function (element) {
  stopAndResetVideoById("video-detail-favorit");

  showElement(".card-info-favorit");
  hideElement(".card-info-detail-favorit");

  stopAndResetVideoById("video-detail-favorit");
};

window.closeTabPencarianDua = function (element) {
  showElement(".card-info-favorit-dua");
  hideElement(".card-info-detail-favorit-dua");

  initSlickFavoritDua();
};

window.closeTabPasang = function () {
  showElement(".card-info-pasang");
  hideElement(".card-info-detail-pasang");
};

// Pesan

let lastClickedPesan;

window.showMessage = function (element) {
  // event.stopPropagation();

  lastClickedPesan = element;

  var menuTujuhTab = document.getElementById("MenuTujuhTab");
  if (menuTujuhTab) {
    menuTujuhTab.click();
    // showCardPesantDetail();
    ShowDetailPesanDua();
    let elements = document.getElementsByClassName("bg-aktif-pesan");

    let elements2 = document.getElementsByClassName("hidden-close-tab-pesan");

    for (let element of elements) {
      element.classList.add("bg-slate-200");
    }

    for (let element of elements2) {
      element.classList.remove("hidden");
    }
  } else {
    console.error("MenuTujuhTab not found");
  }
};

//

//

window.CloseTabPesan = function () {
  if (lastClickedPesan) {
    document.getElementById("MenuSatuTab").click();

    // Array.from(
    //   document.getElementsByClassName("hidden-close-tab-pesan")
    // ).forEach((elem) => elem.classList.remove("hidden"));
    //
    Array.from(document.getElementsByClassName("card-detail-beranda")).forEach(
      (elem) => elem.classList.remove("hidden")
    );
    Array.from(document.getElementsByClassName("card-info-pencarian")).forEach(
      (elem) => elem.classList.add("hidden")
    );

    Array.from(document.getElementsByClassName("konten-pesan")).forEach(
      (elem) => elem.classList.remove("hidden")
    );
    Array.from(
      document.getElementsByClassName("konten-not-found-pesan")
    ).forEach((elem) => elem.classList.remove("hidden"));
    Array.from(
      document.getElementsByClassName("konten-with-found-pesan")
    ).forEach((elem) => elem.classList.add("hidden"));
  } else {
    // Jika tidak ada elemen yang diklik sebelumnya, kembalikan tampilan default
    showElement(".konten-not-found-pesan");
    hideElement(".konten-with-found-pesan");
  }
  lastClickedPesan = null;
};

window.showCardPesantDetail = function () {
  showElement(".konten-with-found-pesan");
  hideElement(".konten-not-found-pesan");
};

// Agent

let lastClickedAgent;
window.showCardAgent = function (element) {
  event.stopPropagation();

  lastClickedAgent = element;

  var menuEmpatTab = document.getElementById("MenuEmpatTab");
  if (menuEmpatTab) {
    menuEmpatTab.click();
    showCardAgentDetail();
  } else {
    console.error("MenuEmpatTab not found");
  }
};

window.closeDetailAgent = function () {
  if (lastClickedAgent) {
    document.getElementById("MenuSatuTab").click();

    Array.from(document.getElementsByClassName("card-detail-beranda")).forEach(
      (elem) => elem.classList.remove("hidden")
    );
    Array.from(document.getElementsByClassName("card-info-pencarian")).forEach(
      (elem) => elem.classList.add("hidden")
    );
    Array.from(document.getElementsByClassName("card-agent-detail")).forEach(
      (elem) => elem.classList.add("hidden")
    );
    Array.from(document.getElementsByClassName("card-agent")).forEach((elem) =>
      elem.classList.remove("hidden")
    );
  } else {
    // Jika tidak ada elemen yang diklik sebelumnya, kembalikan tampilan default
    showElement(".card-agent");
    hideElement(".card-agent-detail");
  }
  lastClickedAgent = null; // Reset variabel lastClickedAgent
};

window.showCardAgentDetail = function () {
  showElement(".card-agent-detail");
  hideElement(".card-agent");
};

// BackPesanToGaleri

// let showMessage;

// window.showMessage = function (element) {
//   lastClickedGaleriBack = element;

//   var menuTujuhTab = document.getElementById("MenuTujuhTab");
//   if (menuTujuhTab) {
//     menuTujuhTab.click();
//     showCardPesantDetail();
//   } else {
//     console.error("MenuTujuhTab not found");
//   }
// };

// window.CloseTabPesan = function () {
//   if (lastClickedPesan) {
//     document.getElementById("MenuSatuTab").click();

//     Array.from(document.getElementsByClassName("card-detail-beranda")).forEach(
//       (elem) => elem.classList.remove("hidden")
//     );
//     Array.from(document.getElementsByClassName("card-info-pencarian")).forEach(
//       (elem) => elem.classList.add("hidden")
//     );

//     Array.from(document.getElementsByClassName("konten-pesan")).forEach(
//       (elem) => elem.classList.remove("hidden")
//     );
//     Array.from(
//       document.getElementsByClassName("konten-not-found-pesan")
//     ).forEach((elem) => elem.classList.remove("hidden"));
//     Array.from(
//       document.getElementsByClassName("konten-with-found-pesan")
//     ).forEach((elem) => elem.classList.add("hidden"));
//   } else {
//     // Jika tidak ada elemen yang diklik sebelumnya, kembalikan tampilan default
//     showElement(".konten-not-found-pesan");
//     hideElement(".konten-with-found-pesan");
//   }
//   lastClickedPesan = null;
// };

// window.showCardPesantDetail = function () {
//   showElement(".konten-with-found-pesan");
//   hideElement(".konten-not-found-pesan");
// };

//
//
window.showCardInfoDetail = function (param) {
  let activeTab;

  // Check if param is an element or a string
  if (typeof param === "string" || param instanceof String) {
    // If it's a string, assume it's the activeTab value
    activeTab = param;
  } else if (param && param.getAttribute) {
    // If it's an element, get the activeTab attribute
    activeTab = param.getAttribute("data-active-tab");
  } else {
    // Handle cases where param is neither a string nor an element
    console.error("Invalid parameter passed to showCardInfoDetail");
    return;
  }

  // console.log(activeTab);

  function StoriesGaleri() {
    var judulStoryElements = document.querySelectorAll(".judulStory");
    judulStoryElements.forEach(function (element) {
      element.textContent = "Stories";
    });
  }

  function BackStoriesGaleri() {
    // remove hidden
    var BtnBackStories = document.querySelectorAll(".stories_back");
    BtnBackStories.forEach(function (element) {
      element.classList.remove("hidden");
    });
  }

  switch (activeTab) {
    case "1":
      resetAllCards();

      // Pencarian
      showElement(".card-detail-beranda");
      hideElement(".card-info-pencarian");

      // Favorit
      showElement(".card-info-favorit");
      hideElement(".card-info-detail-favorit");

      // Pencarian Dua
      showElement(".card-info-favorit-dua");
      hideElement(".card-info-detail-favorit-dua");

      if (!$(".slider-card-info-detail").hasClass("slick-initialized")) {
        setTimeout(function () {
          initSlick(".slider-card-info-detail", getSliderDetail());
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
      // playVideoInWrapper(".video-wrapper-autoplay");
      if (!$(".card-detail-beranda").hasClass("hidden")) {
        // nonaktif video play otomatiss
        // playVideoById("video-detail-beranda");
        // setActiveTab("detail-beranda-satu-tab", "detail-beranda-satu");
      }

      //
      // Mengambil elemen dengan kelas "hiddenSearchRunning"
      const hiddenSearchRunningElement = document.querySelector(
        ".hiddenSearchRunning"
      );

      // Menghapus kelas "hidden" dari elemen
      hiddenSearchRunningElement.classList.remove("hidden");

      // Mengaktifkan pulsing dot ketika detail ditampilkan
      // activatePulsingDot();

      //
      break;

    case "2":
      resetAllCards();

      // Favorit
      showElement(".card-info-detail-favorit");
      hideElement(".card-info-favorit");

      // Pencarian
      showElement(".card-info-pencarian");
      hideElement(".card-detail-beranda");

      // Pencarian Dua
      showElement(".card-info-favorit-dua");
      hideElement(".card-info-detail-favorit-dua");

      if (!$(".slider-favorit").hasClass("slick-initialized")) {
        initSlick(".slider-favorit", getSliderDefaultOptions());
      }

      if (!$(".slider-detailagen").hasClass("slick-initialized")) {
        initSlick(".slider-detailagen", getSliderDefaultOptions());
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

      if (!$(".card-info-detail-favorit").hasClass("hidden")) {
        playVideoById("video-detail-favorit"); // Memulai video favorit
        setActiveTab("detail-favorit-satu-tab", "detail-favorit-satu");
      }

      //
      // playVideoInWrapper(".video-wrapper-autoplay");

      //

      break;
    case "3":
      resetAllCards();

      // Favorit
      showElement(".card-info-favorit");
      hideElement(".card-info-detail-favorit");

      // Pencarian
      ".card-info-pencarian";
      hideElement(".card-detail-beranda");

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
      // playVideoInWrapper(".video-wrapper-autoplay");

      //

      break;
    // agen
    case "4":
      resetAllCards();

      // Favorit
      showElement(".card-info-detail-pasang");
      hideElement(".card-info-pasang");

      // Pencarian
      showElement(".card-info-pencarian");
      hideElement(".card-detail-beranda");

      // Pencarian Dua
      showElement(".card-info-favorit-dua");
      hideElement(".card-info-detail-favorit-dua");

      // if (!$(".slider-pasang").hasClass("slick-initialized")) {
      //   initSlick(".slider-pasang", getSliderDefaultOptions());
      // }
      // if (!$(".slider-card-info-disukai").hasClass("slick-initialized")) {
      //   initSlick(".slider-card-info-disukai", getSliderDefaultOptions());

      //   setTimeout(function () {
      //     initSlick(".slider-card-info-disukai", getSliderDefaultOptions());
      //     addVideoEventHandlers(".slider-card-info-disukai");

      //     $(".slider-card-info-disukai").slick("resize");
      //   }, 100);

      //   // Play the first video (if it exists)
      //   let firstVideo = $(".slider-card-info-disukai").find(
      //     "div.slick-current video"
      //   );
      //   if (firstVideo.length) {
      //     firstVideo[0].play();
      //   }
      // }

      // if (!$(".card-info-detail-favorit").hasClass("hidden")) {
      //   playVideoById("video-detail-favorit"); // Memulai video favorit
      //   setActiveTab("detail-favorit-satu-tab", "detail-favorit-satu");
      // }

      //
      break;

    case "5":
      resetAllCards();

      showElement(".card-agent-detail");
      hideElement(".card-agent");

      // if (!$(".slider-pasang").hasClass("slick-initialized")) {
      //   initSlick(".slider-pasang", getSliderDefaultOptions());
      // }

      break;

    // case "6":
    case "6":
      showElement(".story-galeri-on");

      StoriesGaleri();
      BackStoriesGaleri();

      hideElement(".story-galeri-off");
      hideElement(".story-galeri-on-tujuh");
      hideElement(".story-galeri-on-delapan");
      hideElement(".story-galeri-on-sembilan");
      hideElement(".story-add-form");

      break;
    // case "7":
    case "7":
      showElement(".story-galeri-on-tujuh");

      StoriesGaleri();
      BackStoriesGaleri();

      // konten hidden
      hideElement(".story-galeri-off");
      hideElement(".story-galeri-on");
      hideElement(".story-galeri-on-delapan");
      hideElement(".story-galeri-on-sembilan");
      hideElement(".story-add-form");

      break;

    // case "8":
    case "8":
      showElement(".story-galeri-on-delapan");

      StoriesGaleri();
      BackStoriesGaleri();
      // konten hidden
      hideElement(".story-galeri-off");
      hideElement(".story-galeri-on");

      hideElement(".story-galeri-on-tujuh");
      hideElement(".story-galeri-on-sembilan");

      break;

    // case "9":
    case "9":
      showElement(".story-galeri-on-sembilan");

      StoriesGaleri();
      BackStoriesGaleri();

      // konten hidden
      hideElement(".story-galeri-off");
      hideElement(".story-galeri-on");

      hideElement(".story-galeri-on-tujuh");
      hideElement(".story-galeri-on-delapan");

      break;
  }
};

function resetAllCards() {
  hideElement(".card-info-pencarian");
  hideElement(".card-detail-beranda");
  hideElement(".card-info-favorit");
  hideElement(".card-info-detail-favorit");
  hideElement(".card-info-favorit-dua");
  hideElement(".card-info-detail-favorit-dua");
  hideElement(".story-add-form");
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
    ArrowIconJscoreAgent: document.getElementById("arrow-icon-jscore-agent"),
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
    toggleMenuSearch(elemnt_konten_search, "tagTeksBerjalan");
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
    // Object.values(elements).forEach((el) => {
    //   if (el.classList) {
    //     el.disabled = true;
    //     el.classList.add("bg-gray-200", "text-gray-500");
    //     el.classList.remove("bg-white");
    //   }
    // });
    // Object.values(element_button).forEach((el) => {
    //   el.disabled = true;
    //   el.classList.add("bg-gray-200", "text-gray-500");
    //   el.classList.remove("bg-blue-500", "text-white", "active_btn_search");
    // });
    // document.getElementById("btnSaveInstagram").src =
    //   "http://soaraja.com:9000/soaraja/image/semua/save-instagram-off.png";
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
    //   "http://soaraja.com:9000/soaraja/image/semua/save-instagram-on.png";
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
        closeTabDisukai();
        ResetTabBeranda();
        // resetPortofolio();
        // CloseTabPesan();
        enable();
        // stopAndResetVideo();
        // Menginisialisasi setiap slider
        if (!$(".slider-card-beranda").hasClass("slick-initialized")) {
          initSlickCardInfo("slider-card-beranda");
        }

        initSlickStoryGaleri();

        // if (!$(".slider-card-mode-kedua").hasClass("slick-initialized")) {
        //   initSlickCardInfo("slider-card-mode-kedua");
        // }

        // if (!$(".slider-card-mode-keempat").hasClass("slick-initialized")) {
        //   initSlickCardInfo("slider-card-mode-keempat");
        // }
        break;
      case "MenuDuaTab":
        closeTab();
        closeTabDisukai();
        // CloseTabPesan();

        // initSlickPasang();

        disable();

        // stopAndResetVideo();
        isTeksBerjalanActive = true;
        $(".teks-berjalan-pencarian").show();
        teksBerjalan();
        break;
      case "MenuTigaTab":
        // console.log("MenuTigaTab");
        closeTab();
        closeTabDisukai();
        // CloseTabPesan();
        cardModeTiga();

        initSlickFavorit();
        cardModeTigaFavorit();

        // stopAndResetVideo();
        enable();
        isTeksBerjalanActive = true;
        $(".teks-berjalan-pencarian").show();
        teksBerjalan();
        break;
      case "MenuEmpatTab":
        initSlickPasang();

        closeTab();
        closeTabDisukai();
        ResetTabAgen();
        // CloseTabPesan();

        // console.log("MenuEmpatTab");

        // initSlickAgent();
        // initSlickAgenDetail();

        // stopAndResetVideo();
        isTeksBerjalanActive = false;
        break;
      case "MenuLimaTab":
        // stopAndResetVideo();
        closeTab();
        closeTabDisukai();
        // CloseTabPesan();

        isTeksBerjalanActive = true;
        $(".teks-berjalan-pencarian").show();
        teksBerjalan();
        disable();
        break;
      case "MenuEnamTab":
        // stopAndResetVideo();
        closeTab();
        closeTabDisukai();
        // CloseTabPesan();

        isTeksBerjalanActive = true;
        $(".teks-berjalan-pencarian").show();
        teksBerjalan();
        break;
      case "MenuTujuhTab":
        closeTab();
        closeTabDisukai();
        ResetTabPesan();
        // CloseTabPesan();
        cardModeTiga();
        cardModePesan();

        isTeksBerjalanActive = true;
        $(".teks-berjalan-pencarian").show();
        teksBerjalan();
        disable();
        break;
      case "MenuDelapanTab":
        // console.log("MenuTigaTab");
        closeTab();
        closeTabDisukai();
        // CloseTabPesan();
        cardModeTiga();

        // initSlickFavorit();
        initSlickVideo();
        cardModeTigaFavorit();

        // stopAndResetVideo();
        enable();
        isTeksBerjalanActive = true;
        $(".teks-berjalan-pencarian").show();
        teksBerjalan();
        break;
      case "MenuSembilanTab":
        closeTab();
        closeTabDisukai();
        // CloseTabPesan();

        isTeksBerjalanActive = true;
        $(".teks-berjalan-pencarian").show();
        teksBerjalan();
        disable();
        break;
      case "MenuSepuluhTab":
        closeTab();
        closeTabDisukai();
        // CloseTabPesan();

        isTeksBerjalanActive = true;
        $(".teks-berjalan-pencarian").show();
        teksBerjalan();
        disable();
        break;
      case "MenuSebelasTab":
        closeTab();
        closeTabDisukai();
        isTeksBerjalanActive = true;
        $(".teks-berjalan-pencarian").show();
        teksBerjalan();
        CloseTabPesan();

        disable();
        break;
      case "MenuDuaBelasTab":
        // stopAndResetVideo();
        closeTab();
        closeTabDisukai();
        CloseTabPesan();

        isTeksBerjalanActive = true;
        $(".teks-berjalan-pencarian").show();
        teksBerjalan();
        disable();
        break;
      default:
        disable();
        // stopAndResetVideo();
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
  // close konten dropdown button

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
        input.style.borderBottom = "1px solid rgb(229, 231, 235)";
      }
      // else {
      //   input.style.borderBottom = "1px solid";
      // }
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
document.addEventListener("DOMContentLoaded", (event) => {
  function cardModeTigaFavorit() {
    // Elemen untuk slider favorit dan card mode ketiga
    var sliderFavorit = document.querySelector(".slider-favorit");
    var sliderCardModeKetiga = document.querySelector(
      ".slider-card-mode-ketiga"
    );

    // Fungsi untuk menginisialisasi atau menghancurkan Slick
    function handleSlickInitialization(sliderElement) {
      if (sliderElement) {
        if ($(sliderElement).hasClass("slick-initialized")) {
          $(sliderElement).slick("unslick");
        }
        $(sliderElement).slick(/* Opsi Slick di sini */);
      }
    }

    // Cek dan tangani slider favorit
    if (sliderFavorit) {
      handleSlickInitialization(sliderFavorit);
    }

    // Cek dan tangani slider card mode ketiga
    if (sliderCardModeKetiga) {
      handleSlickInitialization(sliderCardModeKetiga);
    }
  }

  let clickCount = 0;
  // window.ChangeModeCard = function (element) {
  //   clickCount++;

  //   let firstMode = document.querySelectorAll(".mode-card-pertama");
  //   let secondMode = document.querySelectorAll(".mode-card-kedua");
  //   let thirdMode = document.querySelectorAll(".mode-card-ketiga");
  //   // let fourthMode = document.querySelectorAll(".mode-card-keempat");

  //   // Sembunyikan semua konten
  //   [firstMode, secondMode, thirdMode].forEach((modeList) => {
  //     modeList.forEach((el) => {
  //       el.classList.add("hidden");
  //     });
  //   });

  //   // Tampilkan konten berdasarkan jumlah klik
  //   if (clickCount % 3 === 1) {
  //     // Tampilkan mode kedua pada klik pertama
  //     secondMode.forEach((el) => {
  //       el.classList.remove("hidden");
  //     });
  //     cardModeTigaFavorit();
  //     initSlickAgenDetail();
  //     cardModeTiga();
  //   } else if (clickCount % 3 === 2) {
  //     // Tampilkan mode ketiga pada klik kedua, hanya jika elemen yang diklik memiliki class 'profil-agent-klik'
  //     if (element.classList.contains("profil-agent-klik")) {
  //       thirdMode.forEach((el) => {
  //         el.classList.remove("hidden");
  //       });
  //     } else {
  //       // Jika tidak ada class 'profil-agent-klik', kembali ke mode pertama
  //       firstMode.forEach((el) => {
  //         el.classList.remove("hidden");
  //       });
  //       cardModeTigaFavorit();
  //       initSlickAgenDetail();
  //       cardModeTiga();
  //     }
  //   } else {
  //     // Tampilkan mode pertama pada klik ketiga
  //     firstMode.forEach((el) => {
  //       el.classList.remove("hidden");
  //     });
  //     cardModeTigaFavorit();
  //     initSlickAgenDetail();
  //     cardModeTiga();
  //   }
  // };

  //
  window.ChangeModeCard = function (element) {
    clickCount++;

    let firstMode = document.querySelectorAll(".mode-card-pertama");
    let secondMode = document.querySelectorAll(".mode-card-kedua");

    // Sembunyikan semua konten
    [firstMode, secondMode].forEach((modeList) => {
      modeList.forEach((el) => {
        el.classList.add("hidden");
      });
    });

    // Tampilkan konten berdasarkan jumlah klik
    if (clickCount % 2 === 1) {
      // Tampilkan mode kedua pada klik pertama
      secondMode.forEach((el) => {
        el.classList.remove("hidden");
      });
      cardModeTigaFavorit();
      initSlickAgenDetail();
      cardModeTiga();
    } else {
      // Tampilkan mode pertama pada klik kedua
      firstMode.forEach((el) => {
        el.classList.remove("hidden");
      });
      cardModeTigaFavorit();
      initSlickAgenDetail();
      cardModeTiga();
    }
  };

  //
});

document.addEventListener("DOMContentLoaded", function () {
  const tabs = {
    sarpras: {
      ibadah: [
        ...document.querySelectorAll(".favoritSarprasIbadahTab"),
        ...document.querySelectorAll(".berandaSarprasIbadahTab"),
      ],
      miniMarket: [
        ...document.querySelectorAll(".favoritSarprasMiniMarketTab"),
        ...document.querySelectorAll(".berandaSarprasMiniMarketTab"),
      ],
      graduation: [
        ...document.querySelectorAll(".favoritSarprasSekolahTab"),
        ...document.querySelectorAll(".berandaSarprasSekolahTab"),
      ],
      spork: [
        ...document.querySelectorAll(".favoritSarprasRestoranTab"),
        ...document.querySelectorAll(".berandaSarprasRestoranTab"),
      ],
      cycling: [
        ...document.querySelectorAll(".favoritSarprasTransportasiTab"),
        ...document.querySelectorAll(".berandaSarprasTransportasiTab"),
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
    sarpras: "http://soaraja.com:9000/soaraja/image/semua/sarpras",
    indeks: "http://soaraja.com:9000/soaraja/image/semua/indeks",
    kalkulasi: "http://soaraja.com:9000/soaraja/image/semua/kalkulator",
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
  const hasilElemBeranda = document.getElementById("HasilRangBeranda");
  const controlRangeElemBeranda = document.getElementById(
    "ControlRangeBeranda"
  );

  // Fungsi untuk mengupdate tampilan radius di Beranda
  function updateRadiusDisplayBeranda() {
    const radius = controlRangeElemBeranda.value;
    hasilElemBeranda.textContent = `Radius ${radius} Km`;
  }

  // Event listener untuk perubahan pada input range di Beranda
  controlRangeElemBeranda.addEventListener("input", updateRadiusDisplayBeranda);

  // Panggil fungsi untuk set tampilan awal di Beranda
  updateRadiusDisplayBeranda();

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

  // Panggil fungsi untuk set tampilan awal pada favorit
  updateRadiusDisplayFavorit();
});

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

window.ShowDetailPesan = function () {
  // Change the class of the default_pesan element
  var defaultPesan = document.querySelector(".default_pesan");
  defaultPesan.classList.remove("default_pesan");
  defaultPesan.classList.add("default_pesan_aktif");

  // Add 'semibold' class to the clicked name
  var activeName = document.querySelector(".nama-pesan-aktif");
  if (activeName) {
    activeName.classList.add("font-semibold");
  }

  var showPesan = document.querySelector(".show-detail-pesan");
  if (showPesan) {
    showPesan.classList.remove("hidden");
  }
};

// Nama Oran di Pesan
window.ShowDetailPesanDua = function () {
  var defaultPesan = document.querySelector(".default_pesan_dua");
  var defaultPesanAktif = document.querySelector(".default_pesan_dua_aktif");

  cardModeTiga();
  cardModePesan();

  // Periksa apakah defaultPesan memiliki kelas 'hidden'
  if (defaultPesan.classList.contains("hidden")) {
    // Jika iya, berarti pesan sedang tersembunyi, maka tampilkan
    defaultPesan.classList.remove("hidden");
    defaultPesanAktif.classList.add("hidden");
    // cardModeTiga();
  } else {
    // Jika tidak, berarti pesan sedang ditampilkan, maka sembunyikan
    defaultPesan.classList.add("hidden");
    defaultPesanAktif.classList.remove("hidden");
    // cardModeTiga();
  }
};

// Nama orang pindah ke profil agen
window.ShowDetailProfilAgen = function () {
  let MenuEmpatTab = document.getElementById("MenuEmpatTab");
  if (MenuEmpatTab) {
    MenuEmpatTab.click();
    showCardAgentDetail();
  }
  // var defaultPesan = document.querySelector(".default_pesan_dua");
  // var defaultPesanAktif = document.querySelector(".default_pesan_dua_aktif");

  // // Periksa apakah defaultPesan memiliki kelas 'hidden'
  // if (defaultPesan.classList.contains("hidden")) {
  //   // Jika iya, berarti pesan sedang tersembunyi, maka tampilkan
  //   defaultPesan.classList.remove("hidden");
  //   defaultPesanAktif.classList.add("hidden");
  // } else {
  //   // Jika tidak, berarti pesan sedang ditampilkan, maka sembunyikan
  //   defaultPesan.classList.add("hidden");
  //   defaultPesanAktif.classList.remove("hidden");
  // }
};

window.closeTabDetailPesan = function () {
  var defaultPesan = document.querySelector(".default_pesan_dua_aktif");
  defaultPesan.classList.remove("default_pesan_dua_aktif");
  defaultPesan.classList.add("default_pesan_dua");

  var activeName = document.querySelector(".nama-pesan-aktif");
  if (activeName) {
    activeName.classList.remove("font-semibold");
  }
};

// Menangani klik pada menu pesan
document.querySelectorAll(".menus-pesan").forEach((item) => {
  item.addEventListener("click", function () {
    // Menghapus class aktif dari semua menu
    document
      .querySelectorAll(".menus-pesan")
      .forEach((el) => el.classList.remove("aktif-menu-pesan"));

    // Menambahkan class aktif ke menu yang diklik
    this.classList.add("aktif-menu-pesan");

    // Menampilkan konten dan menyembunyikan pesan 'not found'
    document
      .querySelector(".konten-with-found-pesan")
      .classList.remove("hidden");
    document.querySelector(".konten-not-found-pesan").classList.add("hidden");
  });
});

// Pesan

document.querySelectorAll(".menus-pesan").forEach((item) => {
  item.addEventListener("click", function () {
    // Menghapus class aktif dari semua menu
    document
      .querySelectorAll(".menus-pesan")
      .forEach((el) => el.classList.remove("aktif-menu-pesan"));

    // Menambahkan class aktif ke menu yang diklik
    this.classList.add("aktif-menu-pesan");

    // Menampilkan konten dan menyembunyikan pesan 'not found'
    document
      .querySelector(".konten-with-found-pesan")
      .classList.remove("hidden");
    document.querySelector(".konten-not-found-pesan").classList.add("hidden");
  });
});

// Menu Beranda

// let lastClickedBerandaCard;

// window.showMessage = function (element) {
//   lastClickedBerandaCard = element;

//   var menuTujuhTab = document.getElementById("MenuTujuhTab");
//   if (menuTujuhTab) {
//     menuTujuhTab.click();
//     showCardPesantDetail();

//     // console.log(nameUserElements);
//   } else {
//     console.error("MenuTujuhTab not found");
//   }
// };

// window.CloseTabPesan = function () {
//   if (lastClickedBerandaCard) {
//     document.getElementById("MenuSatuTab").click();

//     Array.from(document.getElementsByClassName("card-detail-beranda")).forEach(
//       (elem) => elem.classList.remove("hidden")
//     );
//     Array.from(document.getElementsByClassName("card-info-pencarian")).forEach(
//       (elem) => elem.classList.add("hidden")
//     );

//     Array.from(document.getElementsByClassName("konten-pesan")).forEach(
//       (elem) => elem.classList.remove("hidden")
//     );
//     Array.from(
//       document.getElementsByClassName("konten-not-found-pesan")
//     ).forEach((elem) => elem.classList.remove("hidden"));
//     Array.from(
//       document.getElementsByClassName("konten-with-found-pesan")
//     ).forEach((elem) => elem.classList.add("hidden"));
//   } else {
//     // Jika tidak ada elemen yang diklik sebelumnya, kembalikan tampilan default
//     showElement(".konten-not-found-pesan");
//     hideElement(".konten-with-found-pesan");
//   }
//   lastClickedBerandaCard = null;
// };

// window.showCardPesantDetail = function () {
//   showElement(".konten-with-found-pesan");
//   hideElement(".konten-not-found-pesan");
// };

// nameUserElements = null;

window.Portofolio = function () {
  let menuSatuTab = document.getElementById("MenuSatuTab");
  if (menuSatuTab) {
    menuSatuTab.click();
    MenuTabList(1);
  }
};

// MenuSatuTab;

// document.getElementById("MenuSatuTab").addEventListener("click", () => {
//   const tabPanes = document.querySelectorAll(".konten-dijual");
//   tabPanes.forEach((pane) => {
//     pane.classList.remove("hidden");
//   });
// });

const MenuTabList = (count) => {
  const tabPanes = document.querySelectorAll(".konten-dijual");
  // Limit show tabPanes by count
  tabPanes.forEach((pane, index) => {
    if (index + 1 !== count) {
      pane.classList.add("hidden");
    } else {
      pane.classList.remove("hidden");
    }
  });
};

const ResetTabAgen = () => {
  Array.from(document.getElementsByClassName("card-agent")).forEach((elem) =>
    elem.classList.remove("hidden")
  );
  Array.from(document.getElementsByClassName("card-agent-detail")).forEach(
    (elem) => elem.classList.add("hidden")
  );
};

const ResetTabPesan = () => {
  Array.from(document.getElementsByClassName("konten-not-found-pesan")).forEach(
    (elem) => elem.classList.remove("hidden")
  );
  Array.from(
    document.getElementsByClassName("konten-with-found-pesan")
  ).forEach((elem) => elem.classList.add("hidden"));
};

const ResetTabBeranda = () => {
  Array.from(document.getElementsByClassName("konten-dijual")).forEach((elem) =>
    elem.classList.remove("hidden")
  );
};

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    // Lakukan sesuatu dengan file gambar yang diunggah
    console.log("File uploaded:", file.name);
  }
}

$(document).ready(function () {
  // Menambahkan event listener untuk klik pada elemen dengan ID 'detail-statistik-tiga-tab'
  $("#detail-statistik-tiga-tab").on("click", function () {
    // hapus semua class hidden dari ini
  });
  $("#detail-agenprofil-dua-tab").on("click", function () {
    // hapus semua class hidden dari ini
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var tabButtonTiga = document.getElementById("detail-statistik-tiga-tab");
  var tabButtonDua = document.getElementById("detail-agenprofil-dua-tab");

  tabButtonDua.addEventListener("click", function () {
    setTimeout(function () {
      if ($(".slider-card-mode-ketiga").hasClass("slick-initialized")) {
        $(".slider-card-mode-ketiga").slick("setPosition");
      } else {
        initSlick(".slider-card-mode-ketiga", getSliderDefaultOptions());
      }
    }, 100);
  });

  tabButtonTiga.addEventListener("click", function () {
    setTimeout(function () {
      if ($(".slider-card-mode-ketiga").hasClass("slick-initialized")) {
        $(".slider-card-mode-ketiga").slick("setPosition");
      } else {
        initSlick(".slider-card-mode-ketiga", getSliderDefaultOptions());
      }
    }, 100);
  });

  // tabButton.addEventListener("click", function () {
  //   setTimeout(function () {
  //     if ($(".slider-pasang").hasClass("slick-initialized")) {
  //       $(".slider-pasang").slick("setPosition");
  //     } else {
  //       initSlick(".slider-pasang", getSliderDefaultOptions());
  //     }
  //   }, 100);
  // });
});

function cardModeTiga() {
  setTimeout(function () {
    if ($(".slider-card-mode-ketiga").hasClass("slick-initialized")) {
      $(".slider-card-mode-ketiga").slick("setPosition");
    } else {
      initSlick(".slider-card-mode-ketiga", getSliderDefaultOptions());
    }
  }, 100);
}

function cardModePesan() {
  setTimeout(function () {
    if ($(".slider-card-mode-pesan").hasClass("slick-initialized")) {
      $(".slider-card-mode-pesan").slick("setPosition");
    } else {
      initSlick(".slider-card-mode-pesan", getSliderDefaultOptionsPesan());
    }
  }, 100);
}

function activateMenuPesan(clickedElement) {
  const menuPesanElements = document.querySelectorAll(".menu-pesan-area");
  menuPesanElements.forEach((element) => {
    element.classList.remove("bg-aktif-menu-pesan");
  });
  clickedElement.classList.add("bg-aktif-menu-pesan");
}

document.addEventListener("DOMContentLoaded", () => {
  const menuPesanElements = document.querySelectorAll(".menu-pesan-area");
  menuPesanElements.forEach((element) => {
    element.addEventListener("click", function () {
      activateMenuPesan(this);
    });
  });
});

window.toggleActiveInactive = function () {
  var checkBox = document.getElementById("toggleSwitchActiveInactive");
  var text = document.getElementById("toggleTextActiveInactive");

  if (checkBox.checked == true) {
    text.innerHTML = "Active";
  } else {
    text.innerHTML = "Inactive";
  }
};

window.toggleTerjualTersedia = function () {
  var checkBox = document.getElementById("toggleSwitchTerjualTersedia");
  var text = document.getElementById("toggleTextTerjualTersedia");

  if (checkBox.checked == true) {
    text.innerHTML = "Tersedia";
  } else {
    text.innerHTML = "Terjual";
  }
};
