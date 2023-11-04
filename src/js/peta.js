const gambarPeta = (name) => {
  $(name).slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    arrows: true,
    dots: true,
  });
};

const SamarkanNoSk = (teks) => {
  // split teks menjadi array dengan delimiter /
  const arrTeks = teks.split("/");

  // loop melalui array dan samarkan teks pada elemen array ke-2 sampai sebelum elemen terakhir
  for (let i = 1; i < arrTeks.length - 2; i++) {
    arrTeks[i] = "*".repeat(arrTeks[i].length);
  }

  // gabungkan kembali array menjadi string
  const samarTeks = arrTeks.join("/");

  // kembalikan string yang sudah di-samarkan, tetapi bagian sebelum / pertama dan setelah / terakhir tidak di-samarkan
  return (
    arrTeks[0] +
    "/" +
    samarTeks.slice(samarTeks.indexOf("/") + 1, samarTeks.lastIndexOf("/")) +
    "/" +
    arrTeks[arrTeks.length - 1]
  );
};

mapboxgl.accessToken =
  "pk.eyJ1IjoibWVudGhvZWxzciIsImEiOiJja3M0MDZiMHMwZW83MnVwaDZ6Z2NhY2JxIn0.vQFxEZsM7Vvr-PX3FMOGiQ";
const map = new mapboxgl.Map({
  container: "mapJoglo",
  style: "mapbox://styles/menthoelsr/ckp6i54ay22u818lrq15ffcnr",
  zoom: 15.5,
  center: [106.8295257, -6.210588],
  preserveDrawingBuffer: true,
});

// Navigator
map.addControl(new mapboxgl.NavigationControl());

// disable map zoom when using scroll
map.scrollZoom.disable();

const popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: true,
});

const getDataGalian = () => {
  $.ajax({
    url: `https://jakarta.pintoinvest.com/v1/geojson_izin_galian/galian_utilitas_izin.geojson`,
    type: "GET",
    dataType: "json",
    success: (e) => {
      let hitung_izin_galian = e.features.length;
      $("#hitung_izin_galian").text(hitung_izin_galian);
    },
  });
};
getDataGalian();

const IzinGalian = () => {
  map.addSource("layer-izin-galian", {
    type: "geojson",
    data: `https://jakarta.pintoinvest.com/v1/geojson_izin_galian/galian_utilitas_izin.geojson`,
  });

  map.addLayer({
    id: "layer-izin-galian",
    type: "circle",
    source: "layer-izin-galian",
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

const IzinAjib = () => {
  map.addSource("layer-ajib-galian", {
    type: "geojson",
    data: `https://jakarta.pintoinvest.com/v1/geojson_izin_galian/galian_utilitas_ajib.geojson`,
  });

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
};

map.on("style.load", () => {
  IzinGalian();
  IzinAjib();

  map.addLayer({
    id: "umkm_fill",
    type: "circle",
    source: "layer-izin-galian",
    paint: {
      "circle-color": "#2727d5",
      "circle-stroke-color": "#2727d5",
      "circle-stroke-width": 1,
      "circle-radius": 4,
      "circle-opacity": 0.8,
    },
    // filter: ["==", ["get", "status"], "berjalan"],
    layout: {
      visibility: "none",
    },
  });

  map.addLayer({
    id: "sedangdibangun",
    type: "circle",
    source: "layer-ajib-galian",
    paint: {
      "circle-color": "#ef1e28",
      "circle-stroke-color": "#ef1e28",
      "circle-stroke-width": 1,
      "circle-radius": 4,
      "circle-opacity": 0.8,
    },
    // filter: ["==", ["get", "komentar"], "berjalan"],
    layout: {
      visibility: "none",
    },
  });
});

$("#btn_dibangun").click(function () {
  $("#radio_dibangun").trigger("click");
  $("#btn_umkm").css("background", "white");
  // $("#btn_titik").css("background", "white");
});

$("#btn_umkm").click(function () {
  $("#radio_umkm").trigger("click");
  $("#btn_dibangun").css("background", "white");
  // $("#btn_titik").css("background", "white");
});

$(".off_layer_umkm").hide();
$(".off_layer_dibangun").hide();

let btn_umkm_disabled = document.getElementById("btn_dibangun");

// layer izin galian
$("#radio_umkm").change(function () {
  if ($(this).prop("checked") == true) {
    // button danger aktif
    $(".off_layer_umkm").show();

    // button normal
    $(".on_layer_umkm").hide();
    $(".on_layer_dibangun").show();

    // button aktif
    $(".off_layer_dibangun").hide();

    // layer
    showLayer("umkm_fill");
    hideLayer("sedangdibangun");
    hideLayer("layer-ajib-galian");
    document.getElementById("btn_dibangun").disabled = true;
  } else {
    $(".off_layer_umkm").hide();

    hideLayer("umkm_fill");
    showLayer("sedangdibangun");
    showLayer("layer-ajib-galian");
  }
});

// layer izin ajib

$("#radio_dibangun").change(function () {
  if ($(this).prop("checked") == true) {
    // button danger aktif
    $(".off_layer_dibangun").show();
    // button normal
    $(".on_layer_dibangun").hide();
    $(".on_layer_umkm").show();
    // button aktif
    $(".off_layer_umkm").hide();

    // layer
    showLayer("sedangdibangun");
    hideLayer("umkm_fill");
    hideLayer("layer-izin-galian");

    document.getElementById("btn_umkm").disabled = true;
  } else {
    $(".on_layer_dibangun").hide();

    hideLayer("sedangdibangun");
    showLayer("umkm_fill");
    showLayer("layer-izin-galian");
  }
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
map.on("mouseenter", "layer-izin-galian", (e) => {
  map.getCanvas().style.cursor = "pointer";
  const coordinates = e.features[0].geometry.coordinates.slice();
  const data = e.features[0].properties;

  let sk = SamarkanNoSk(data["no_sk"]);

  const content = `

                    <div class="p-0">
                        <div class="card-body p-2">
                            <h6 style="font-size:14px; line-height:17px; margin-bottom:8px" class="mt-0 card-title">${data["jenis_kegiatan"]}</h6>

                            <div class="border-bottom" style="margin-bottom: 13px;"></div>

                            <div style="line-height: 1.2; margin-top:7px;">
                                <div class="row">
                                    <div class="col-md-6">
                                        <span>NO SK</span>
                                    </div>
                                    <div class="col-md-6">
                                        <span class="d-block"> ${sk}</span>
                                    </div>
                                </div>
                            </div>

                            <div style="line-height: 1.2; margin-top:7px;">
                                <div class="row">
                                    <div class="col-md-6">
                                        <span>Izin</span>
                                    </div>
                                    <div class="col-md-6">
                                        <span class="d-block"> ${data["izin"]}</span>
                                    </div>
                                </div>
                            </div>

                            <div style="line-height: 1.2; margin-top:7px;">
                                <div class="row">
                                    <div class="col-md-6">
                                        <span>Badan Usaha</span>
                                    </div>
                                    <div class="col-md-6">
                                        <span class="d-block"> ${data["badan_usaha"]}</span>
                                    </div>
                                </div>
                            </div>

                            <div style="line-height: 1.2; margin-top:7px;">
                                <div class="row">
                                    <div class="col-md-6">
                                        <span>Jenis Usaha</span>
                                    </div>
                                    <div class="col-md-6">
                                        <span class="d-block"> ${data["jenis_usaha"]}</span>
                                    </div>
                                </div>
                            </div>

                            <div style="line-height: 1.2; margin-top:7px;">
                                <div class="row">
                                    <div class="col-md-6">
                                        <span>Pelaksana</span>
                                    </div>
                                    <div class="col-md-6">
                                        <span class="d-block"> ${data["pelaksana"]}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
    `;

  popup.setLngLat(coordinates).setHTML(content).addTo(map);
  gambarPeta(".gambar_peta");

  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }
});

map.on("mouseleave", "layer-izin-galian", () => {
  map.getCanvas().style.cursor = "";
  popup.remove();
});

// Umk
map.on("mouseenter", "umkm_fill", (e) => {
  map.getCanvas().style.cursor = "pointer";
  const coordinates = e.features[0].geometry.coordinates.slice();
  const data = e.features[0].properties;

  let sk = SamarkanNoSk(data["no_sk"]);
  // console.log(sk);

  // console.log(data);

  const content = `

                    <div class="p-0">
                        <div class="card-body p-2">
                            <h6 style="font-size:14px; line-height:17px; margin-bottom:8px" class="mt-0 card-title">${data["jenis_kegiatan"]}</h6>

                            <div class="border-bottom" style="margin-bottom: 13px;"></div>

                            <div style="line-height: 1.2; margin-top:7px;">
                                <div class="row">
                                    <div class="col-md-6">
                                        <span>NO SK</span>
                                    </div>
                                    <div class="col-md-6">
                                        <span class="d-block"> ${sk}</span>
                                    </div>
                                </div>
                            </div>

                            <div style="line-height: 1.2; margin-top:7px;">
                                <div class="row">
                                    <div class="col-md-6">
                                        <span>Izin</span>
                                    </div>
                                    <div class="col-md-6">
                                        <span class="d-block"> ${data["izin"]}</span>
                                    </div>
                                </div>
                            </div>

                            <div style="line-height: 1.2; margin-top:7px;">
                                <div class="row">
                                    <div class="col-md-6">
                                        <span>Badan Usaha</span>
                                    </div>
                                    <div class="col-md-6">
                                        <span class="d-block"> ${data["badan_usaha"]}</span>
                                    </div>
                                </div>
                            </div>

                            <div style="line-height: 1.2; margin-top:7px;">
                                <div class="row">
                                    <div class="col-md-6">
                                        <span>Jenis Usaha</span>
                                    </div>
                                    <div class="col-md-6">
                                        <span class="d-block"> ${data["jenis_usaha"]}</span>
                                    </div>
                                </div>
                            </div>

                            <div style="line-height: 1.2; margin-top:7px;">
                                <div class="row">
                                    <div class="col-md-6">
                                        <span>Pelaksana</span>
                                    </div>
                                    <div class="col-md-6">
                                        <span class="d-block"> ${data["pelaksana"]}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
    `;

  popup.setLngLat(coordinates).setHTML(content).addTo(map);
  gambarPeta(".gambar_peta");

  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }
});

map.on("mouseleave", "umkm_fill", () => {
  map.getCanvas().style.cursor = "";
  popup.remove();
});

$("#btn_off_layer_umkm").on("click", function (e) {
  $(".on_layer_umkm").show();
  $(".off_layer_umkm").hide();
  $("#btn_umkm").css("background", "white");
  hideLayer("umkm_fill");
  showLayer("layer-ajib-galian");
  $("#radio_umkm").prop("checked", false);
  document.getElementById("btn_dibangun").disabled = false;
});

// LAYER GALIAN AJIB

map.on("mouseenter", "layer-ajib-galian", (e) => {
  map.getCanvas().style.cursor = "pointer";
  const coordinates = e.features[0].geometry.coordinates.slice();
  const data = e.features[0].properties;

  // console.log(data);

  const content = `

                    <div class="p-0">
                        <div class="card-body p-2">
                            <h6 style="font-size:14px; line-height:17px; margin-bottom:8px" class="mt-0 card-title">${data["kegiatan"]}</h6>

                            <div class="border-bottom" style="margin-bottom: 13px;"></div>

                            <div style="line-height: 1.2; margin-top:7px;">
                                <div class="row">
                                    <div class="col-md-6">
                                        <span>NO SK</span>
                                    </div>
                                    <div class="col-md-6">
                                        <span class="d-block"> ${data["nama_obj"]}</span>
                                    </div>
                                </div>
                            </div>

                            <div style="line-height: 1.2; margin-top:7px;">
                                <div class="row">
                                    <div class="col-md-6">
                                        <span>Izin</span>
                                    </div>
                                    <div class="col-md-6">
                                        <span class="d-block"> ${data["nama_petugas"]}</span>
                                    </div>
                                </div>
                            </div>

                            <div style="line-height: 1.2; margin-top:7px;">
                                <div class="row">
                                    <div class="col-md-6">
                                        <span>Badan Usaha</span>
                                    </div>
                                    <div class="col-md-6">
                                        <span class="d-block"> ${data["pemilik"]}</span>
                                    </div>
                                </div>
                            </div>

                            <div style="line-height: 1.2; margin-top:7px;">
                                <div class="row">
                                    <div class="col-md-6">
                                        <span>Jenis Usaha</span>
                                    </div>
                                    <div class="col-md-6">
                                        <span class="d-block"> ${data["statusproyek"]}</span>
                                    </div>
                                </div>
                            </div>

                            <div style="line-height: 1.2; margin-top:7px;">
                                <div class="row">
                                    <div class="col-md-6">
                                        <span>Pelaksana</span>
                                    </div>
                                    <div class="col-md-6">
                                        <span class="d-block"> ${data["komentar"]}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
    `;

  popup.setLngLat(coordinates).setHTML(content).addTo(map);
  gambarPeta(".gambar_peta");

  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }
});

map.on("mouseleave", "layer-ajib-galian", () => {
  map.getCanvas().style.cursor = "";
  popup.remove();
});

// ajib
map.on("mouseenter", "sedangdibangun", (e) => {
  map.getCanvas().style.cursor = "pointer";
  const coordinates = e.features[0].geometry.coordinates.slice();
  const data = e.features[0].properties;

  const content = `<div class="p-0">
                        <div class="card-body p-2">
                            <h6 style="font-size:14px; line-height:17px; margin-bottom:8px" class="mt-0 card-title">${data["nama_obj"]}</h6>

                            <div class="border-bottom" style="margin-bottom: 13px;"></div>

                            <div style="line-height: 1.2; margin-top:7px;">
                                <div class="row">
                                    <div class="col-md-6">
                                        <span>Nama Petugas</span>
                                    </div>
                                    <div class="col-md-6">
                                        <span class="d-block"> ${data["nama_petugas"]}</span>
                                    </div>
                                </div>
                            </div>

                            <div style="line-height: 1.2; margin-top:7px;">
                                <div class="row">
                                    <div class="col-md-6">
                                        <span>Pemilik</span>
                                    </div>
                                    <div class="col-md-6">
                                        <span class="d-block"> ${data["pemilik"]}</span>
                                    </div>
                                </div>
                            </div>

                            <div style="line-height: 1.2; margin-top:7px;">
                                <div class="row">
                                    <div class="col-md-6">
                                        <span>Kegiatan</span>
                                    </div>
                                    <div class="col-md-6">
                                        <span class="d-block"> ${data["kegiatan"]}</span>
                                    </div>
                                </div>
                            </div>

                            <div style="line-height: 1.2; margin-top:7px;">
                                <div class="row">
                                    <div class="col-md-6">
                                        <span>No Izin</span>
                                    </div>
                                    <div class="col-md-6">
                                        <span class="d-block"> ${data["no_izin"]}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>`;
  popup.setLngLat(coordinates).setHTML(content).addTo(map);
  gambarPeta(".gambar_peta");

  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }
});

map.on("mouseleave", "sedangdibangun", () => {
  map.getCanvas().style.cursor = "";
  popup.remove();
});

$("#btn_off_layer_dibangun").on("click", function (e) {
  $(".on_layer_dibangun").show();
  $(".off_layer_dibangun").hide();
  $("#btn_dibangun").css("background", "white");
  hideLayer("sedangdibangun");
  showLayer("layer-izin-galian");
  $("#radio_dibangun").prop("checked", false);
  document.getElementById("btn_umkm").disabled = false;
});

// Slider Survey Titik Galian
const SliderIzinAjib = () => {
  $.ajax({
    url: `https://jakarta.pintoinvest.com/v1/geojson_izin_galian/galian_utilitas_ajib.geojson`,
    type: "GET",
    dataType: "json",
    success: (e) => {
      data = e.features;
      // sort the data in ascending order based on the OBJECTID property
      data.sort((a, b) => a.properties.OBJECTID - b.properties.OBJECTID);
      // get the first element
      const firstElement = data[0];

      let nama_petugas = firstElement.properties.nama_petugas;
      let kegiatan_ajib = firstElement.properties.kegiatan;
      let nama_obj = firstElement.properties.nama_obj;
      let pemilik_ajib = firstElement.properties.pemilik;
      let no_izin_ajib = firstElement.properties.no_izin;
      let statusproyek = firstElement.properties.statusproyek;

      $("#nama_petugas").text(nama_petugas);
      $("#kegiatan_ajib").text(kegiatan_ajib);
      $("#nama_obj").text(nama_obj);
      $("#pemilik_ajib").text(pemilik_ajib);
      $("#no_izin_ajib").text(no_izin_ajib);
      $("#statusproyek").text(statusproyek);

      console.log(nama_obj);
    },
  });
};
SliderIzinAjib();

const getDataIzinAjib = () => {
  $.ajax({
    url: `https://jakarta.pintoinvest.com/v1/geojson_izin_galian/galian_utilitas_ajib.geojson`,
    type: "GET",
    dataType: "json",
    success: (e) => {
      let data = e.features;
      let thumbnailHtml = "";

      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        let id = element.properties.OBJECTID;

        // console.log(element);

        let imgUrl =
          "https://jakarta.pintoinvest.com/v1/survey/blank_not_image.png"; // Set default image URL here
        // Check if image URL is available and not null
        if (
          element.properties.img_url &&
          element.properties.img_url !== "null"
        ) {
          imgUrl = element.properties.img_url;
        }
        thumbnailHtml += `<div><img id="${id}" class="img_slide_survey_galian_ajib" data-id="${id}" src="${imgUrl}" onclick="SliderTitikGalian('${id}')"  alt="Thumbnail"></div>`;
      }

      $(".slider-thumbnails").html(thumbnailHtml);

      SliderPetaGalian(".slider-thumbnails");

      let count = 1;

      $(".slider-thumbnails .slick-arrow").on("click", function () {
        // console element
        let arr = [];
        let data = $(this).parent().find("img");
        data.each(function (index, element) {
          let id = $(element).data("id");
          arr.push(id);
        });

        if ($(this).hasClass("slick-prev-galian")) {
          count--;
          if (count < 0) {
            count = arr.length - 1;
          }
        } else {
          count++;
          if (count >= arr.length) {
            count = 0;
          }
        }

        // console.log(arr[count]);

        // SliderTitikGalian(arr[count]);

        // if (count > 1) {
        //     SliderTitikGalian(arr[count]);
        // } else {
        //     SliderTitikGalian(9);
        // }

        if (count >= 1 && count <= 1587) {
          SliderTitikGalian(arr[count]);
        }
      });

      let hitung_izin_ajib = data.length;

      // status proses
      let statusProses = data.filter(
        (element) => element.properties.statusproyek === "proses"
      );
      let panjangStatusProses = statusProses.length;

      let statusHold = data.filter(
        (element) => element.properties.statusproyek === "hold"
      );
      let panjangStatusHold = statusHold.length;

      let statusSelesai = data.filter(
        (element) => element.properties.statusproyek === "selesai"
      );
      let panjangStatusSelesai = statusSelesai.length;

      // hitung jumlah petugas
      let distict_nama_petugas = [
        ...new Set(data.map((item) => item.properties.nama_petugas)),
      ];
      count_distict_nama_petugas = distict_nama_petugas.length;

      $("#hitung_izin_ajib").text(hitung_izin_ajib);
      $("#hitung_jumlah_ajib").text(count_distict_nama_petugas);

      $("#panjang_status_proses").text(panjangStatusProses);
      $("#panjang_status_hold").text(panjangStatusHold);
      $("#panjang_status_selesai").text(panjangStatusSelesai);
    },
  });
};

const SliderTitikGalian = (id) => {
  id = parseInt(id);
  // console.log(id);
  $.ajax({
    url: `https://jakarta.pintoinvest.com/v1/geojson_izin_galian/galian_utilitas_ajib.geojson`,
    type: "GET",
    dataType: "json",
    success: (data) => {
      // Filter the features based on the specified id

      // membuat foreach
      data.features.forEach((element) => {
        if (element.properties.OBJECTID === id) {
          let nama_petugas = element.properties.nama_petugas;
          let kegiatan = element.properties.kegiatan;
          let nama_obj = element.properties.nama_obj;
          let pemilik = element.properties.pemilik;
          let no_izin = element.properties.no_izin;
          let statusproyek = element.properties.statusproyek;

          $("#nama_petugas").text(nama_petugas);
          $("#kegiatan_ajib").text(kegiatan);
          $("#nama_obj").text(nama_obj);
          $("#pemilik_ajib").text(pemilik);
          $("#no_izin_ajib").text(no_izin);
          $("#statusproyek").text(statusproyek);
        }
      });
    },
    error: (error) => {
      console.log("Error loading GeoJSON data", error);
    },
  });
};

const SliderPetaGalian = (name) => {
  const slider = document.querySelector(name);

  const slick = $(slider).slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    infinite: true,
    arrows: true,
    // prevArrow: '<button class="slide-arrow slick-prev"></button>',
    // nextArrow: '<button class="slide-arrow slick-next"></button>',

    prevArrow:
      '<span class="slide-arrow slick-prev-galian"><i style="font-size: 1.5rem; cursor: pointer;" class="fas fa-chevron-left"></i></span>',
    nextArrow:
      '<span class="slide-arrow slick-next-galian"><i style="font-size: 1.5rem; cursor: pointer;" class="fas fa-chevron-right"></i></span>',
  });

  // Pertama tombol kiri di-disable
  $(".slick-prev-galian").prop("disabled", true);
  $(".slick-prev-galian").addClass("off_opacity_slider_galian");

  // Ketika slide berubah, cek apakah slide pertama atau bukan
  $(slider).on("afterChange", function (event, slick, currentSlide) {
    if (currentSlide === 0) {
      $(".slick-prev-galian").prop("disabled", true);
      $(".slick-next-galian").prop("disabled", false);
    } else if (currentSlide === slick.slideCount - 1) {
      $(".slick-prev-galian").prop("disabled", false);
      $(".slick-next-galian").prop("disabled", true);
    } else {
      $(".slick-prev-galian").prop("disabled", false);
      $(".slick-next-galian").prop("disabled", false);
    }

    if (currentSlide === 0 || currentSlide >= slick.slideCount - 1) {
      $(".slick-prev-galian").addClass("off_opacity_slider_galian");
    } else {
      $(".slick-prev-galian").removeClass("off_opacity_slider_galian");
    }
  });
};
