// Running Text Marquee

// let isTeksBerjalanActive = false;

// function teksBerjalan() {
//   if (isTeksBerjalanActive) {
//     $(".teks-berjalan-pencarian").marquee({
//       duration: 15500,
//       delayBeforeStart: 0,
//       direction: "left",
//       pauseOnHover: true,
//     });
//   }
// }

// teksBerjalan();

$(".teks-berjalan-pencarian").marquee({
  duration: 15500,
  delayBeforeStart: 0,
  direction: "left",
  pauseOnHover: true,
});

// Function Search & Navigation
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
    MenuSatuTab: document.getElementById("MenuSatuTab"),
    //
    MenuDuaTab: document.getElementById("MenuDuaTab"),
    MenuTigaTab: document.getElementById("MenuTigaTab"),
    //
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

  function toggleMenuSearch(elemnt_konten_search, konten_element) {
    // Menyembunyikan semua elemen pencarian
    Object.values(elemnt_konten_search).forEach((element) => {
      element.classList.add("hidden");
    });

    // Menampilkan elemen yang sesuai dengan konten_element yang diberikan
    if (konten_element && elemnt_konten_search[konten_element]) {
      elemnt_konten_search[konten_element].classList.remove("hidden");

      // Mengaktifkan fungsi teksBerjalan jika konten_element adalah "tagTeksBerjalan"
      if (konten_element === "tagTeksBerjalan") {
        isTeksBerjalanActive = true;
        teksBerjalan();
      } else {
        isTeksBerjalanActive = false;
      }
    }
  }

  element_btn_search.MenuSatuTab.addEventListener("click", function () {
    toggleMenuSearch(elemnt_konten_search, "tagSearchAll");
  });

  element_btn_search.MenuDuaTab.addEventListener("click", function () {
    toggleMenuSearch(elemnt_konten_search, "tagTeksBerjalan");
  });

  element_btn_search.MenuTigaTab.addEventListener("click", function () {
    toggleMenuSearch(elemnt_konten_search, "tagTeksBerjalan");
  });

  element_btn_search.MenuEmpatTab.addEventListener("click", function () {
    toggleMenuSearch(elemnt_konten_search, "tagSearchAgen");
  });

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

    const isActive = parentDiv.classList.contains("bg-aktif-menu");
    elements.tabs.forEach((t) =>
      t.closest(".menus").classList.remove("bg-aktif-menu")
    );
    parentDiv.classList.toggle("bg-aktif-menu", !isActive);

    hideAllContent();

    switch (tab.id) {
      case "MenuSatuTab":
        enable();
        if (!$(".slider-card-info").hasClass("slick-initialized")) {
          initSlickCardInfo();
        }
        break;
      case "MenuDuaTab":
        disable();
        break;
      case "MenuTigaTab":
        disable();

        initSlickFavorit();
        break;
      case "MenuEmpatTab":
        enable();
        break;
      case "MenuLimaTab":
        disable();
        break;
      case "MenuEnamTab":
        // enable();

        initSlickFavoritDua();

        break;
      case "MenuTujuhTab":
        disable();
        break;
      default:
        disable();
        break;
    }
  }

  elements.tabs.forEach((tab) => {
    tab.addEventListener("click", () => toggleTab(tab));
    if (tab.id === "MenuSatuTab") {
      enable();
    } else if (tab.id === "MenuEmpatTab") {
      enable();
    }
  });
});
