function initThreeTour() {
  PANOLENS.Viewer.prototype.getPosition = function () {
    var intersects, point, panoramaWorldPosition, outputPosition;
    intersects = this.raycaster.intersectObject(this.panorama, true);

    if (intersects.length > 0) {
      point = intersects[0].point;
      panoramaWorldPosition = this.panorama.getWorldPosition();

      // Panorama is scaled -1 on X axis
      outputPosition = new THREE.Vector3(
        -(point.x - panoramaWorldPosition.x).toFixed(2),
        (point.y - panoramaWorldPosition.y).toFixed(2),
        (point.z - panoramaWorldPosition.z).toFixed(2)
      );
    }

    return outputPosition;
  };

  let data = [
    {
      uuid: "1",
      file_name: "images/panorama_1-min.jpg",
      navigation: [
        {
          link_file_name: "images/panorama_2-min.jpg",
          position: {
            x: 4386.06,
            y: -2370.22,
            z: -244.69,
          },
        },
      ],
    },
    {
      uuid: "2",
      file_name: "images/panorama_2-min.jpg",
      navigation: [
        {
          link_file_name: "images/panorama_1-min.jpg",
          position: {
            x: -4282.49,
            y: -2415.06,
            z: 882.21,
          },
        },
        {
          link_file_name: "images/panorama_3-min.jpg",
          position: {
            x: 4372.76,
            y: -2377.37,
            z: -422.05,
          },
        },
        {
          link_file_name: "images/panorama_4-min.jpg",
          position: {
            x: 4780.72,
            y: -1425.1,
            z: -160.39,
          },
        },
        {
          link_file_name: "images/panorama_8-min.jpg",
          position: {
            x: 4106.84,
            y: -1674.37,
            z: -2295.01,
          },
        },
      ],
    },
    {
      uuid: "3",
      file_name: "images/panorama_3-min.jpg",
      navigation: [
        {
          link_file_name: "images/panorama_2-min.jpg",
          position: {
            x: -4287.22,
            y: -2539.12,
            z: 325.86,
          },
        },
        {
          link_file_name: "images/panorama_4-min.jpg",
          position: {
            x: 4647.88,
            y: -1815.39,
            z: 146.63,
          },
        },
        {
          link_file_name: "images/panorama_8-min.jpg",
          position: {
            x: 2185.86,
            y: "-2633.74",
            z: "-3639.90",
          },
        },
      ],
    },
    {
      uuid: "4",
      file_name: "images/panorama_4-min.jpg",
      navigation: [
        {
          link_file_name: "images/panorama_3-min.jpg",
          position: {
            x: -4287.22,
            y: -2539.12,
            z: 325.86,
          },
        },
        {
          link_file_name: "images/panorama_5-min.jpg",
          position: {
            x: 4579.43,
            y: "-1984.52",
            z: "137.17",
          },
        },
        {
          link_file_name: "images/panorama_8-min.jpg",
          position: {
            x: -2469.53,
            y: -2705.72,
            z: -3398.37,
          },
        },
        {
          link_file_name: "images/panorama_9-min.jpg",
          position: {
            x: 2588.45,
            y: -2271.79,
            z: -3622.56,
          },
        },
      ],
    },
    {
      uuid: "5",
      file_name: "images/panorama_5-min.jpg",
      navigation: [
        {
          link_file_name: "images/panorama_4-min.jpg",
          position: {
            x: -4287.22,
            y: -2539.12,
            z: 325.86,
          },
        },
        {
          link_file_name: "images/panorama_6-min.jpg",
          position: {
            x: 838.61,
            y: -2276.17,
            z: 4368.04,
          },
        },
        {
          link_file_name: "images/panorama_9-min.jpg",
          position: {
            x: -1764.13,
            y: -2318.24,
            z: -4059.33,
          },
        },
        {
          link_file_name: "images/panorama_10-min.jpg",
          position: {
            x: 4491.39,
            y: -2169.24,
            z: 192.14,
          },
        },
      ],
    },
    {
      uuid: "6",
      file_name: "images/panorama_6-min.jpg",
      navigation: [
        {
          link_file_name: "images/panorama_7-min.jpg",
          position: {
            x: 352.77,
            y: -2399.83,
            z: 4363.81,
          },
        },
        {
          link_file_name: "images/panorama_9-min.jpg",
          position: {
            x: -1345.45,
            y: -1290.73,
            z: -4629.94,
          },
        },
        {
          link_file_name: "images/panorama_10-min.jpg",
          position: {
            x: 4040.64,
            y: -1953.79,
            z: -2190.01,
          },
        },
      ],
    },
    {
      uuid: "7",
      file_name: "images/panorama_7-min.jpg",
      navigation: [
        {
          link_file_name: "images/panorama_6-min.jpg",
          position: {
            x: -221.03,
            y: -2712.83,
            z: -4184.57,
          },
        },
      ],
    },
    {
      uuid: "8",
      file_name: "images/panorama_8-min.jpg",
      navigation: [
        {
          link_file_name: "images/panorama_3-min.jpg",
          position: {
            x: -2322.71,
            y: -2795.08,
            z: 3422.66,
          },
        },
        {
          link_file_name: "images/panorama_4-min.jpg",
          position: {
            x: 2708.41,
            y: -2317.82,
            z: 3497.03,
          },
        },
      ],
    },
    {
      uuid: "9",
      file_name: "images/panorama_9-min.jpg",
      navigation: [
        {
          link_file_name: "images/panorama_4-min.jpg",
          position: {
            x: -1903.42,
            y: -2039.15,
            z: 4142.56,
          },
        },
        {
          link_file_name: "images/panorama_5-min.jpg",
          position: {
            x: 1815.87,
            y: -2167.33,
            z: 4119.0,
          },
        },
        {
          link_file_name: "images/panorama_3-min.jpg",
          position: {
            x: -4255.2,
            y: -1380.86,
            z: 2210.63,
          },
        },
        {
          link_file_name: "images/panorama_10-min.jpg",
          position: {
            x: 3734.34,
            y: -1293.3,
            z: 3047.02,
          },
        },
      ],
    },
    {
      uuid: "10",
      file_name: "images/panorama_10-min.jpg",
      navigation: [
        {
          link_file_name: "images/panorama_5-min.jpg",
          position: {
            x: -4463.48,
            y: -2219.1,
            z: 286.11,
          },
        },
        {
          link_file_name: "images/panorama_6-min.jpg",
          position: {
            x: -3103.97,
            y: -2119.17,
            z: 3285.93,
          },
        },
      ],
    },
  ];

  let imageContainer = document.querySelector(".image-container");

  let progressElement = document.getElementById("progress");

  const onEnter = (event) => {
    progressElement.style.width = 0;
    progressElement.classList.remove("finish");
  };

  const onProgress = (event) => {
    progress = (event.progress.loaded / event.progress.total) * 100;
    progressElement.style.width = progress + "%";
  };

  let viewer = new PANOLENS.Viewer({
    container: imageContainer,
    autoRotate: false,
    controlBar: false,
    output: "overlay",
    autoHideInfospot: false,
  });

  const panorama = data.map(
    (pano) => new PANOLENS.ImagePanorama(pano.file_name)
  );

  data.forEach((pano, index) => {
    // add navigation
    pano.navigation.forEach((nav) => {
      panorama[index].link(
        panorama.find((pano) => pano.src === nav.link_file_name),
        new THREE.Vector3(nav.position.x, nav.position.y, nav.position.z),
        300
      );
    });

    // add progress bar
    panorama[index].addEventListener("enter", onEnter);

    // add finish class to progress bar
    panorama[index].addEventListener("enter-fade-start", () => {
      progressElement.classList.add("finish");
    });

    panorama[index].addEventListener("progress", onProgress);

    // add event listener click
    panorama[index].addEventListener("click", (event) => {
      let position = viewer.getPosition();
      console.log(position);
    });

    // add panorama to viewer
    viewer.add(panorama[index]);
  });
}
