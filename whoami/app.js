    function tampilkanData(ipData, gpsData = null) {
      let output = `
        <b>Who?</b><br>
        <b>IP :</b> ${ipData.ip}<br>
        <b>Negara :</b> ${ipData.country_name}<br>
        <b>Provinsi :</b> ${ipData.region}<br>
        <b>Kota :</b> ${ipData.city}<br>
        <b>ISP :</b> ${ipData.org}<br>
      `;

      if (gpsData) {
        output += `
          <b>Loc :</b> ${gpsData.coords.latitude}, ${gpsData.coords.longitude}<br>
          <b>Akurasi :</b> ${gpsData.coords.accuracy} meter<br>
        `;
      } else {
        output += `
          <b>Loc :</b> ${ipData.latitude}, ${ipData.longitude}<br>
        `;
      }

      document.getElementById("info").innerHTML = output;
    }

    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(ipData => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              tampilkanData(ipData, pos);
            },
            (err) => {
              tampilkanData(ipData);
            }
          );
        } else {
          tampilkanData(ipData);
        }
      })
      .catch(err => {
        document.getElementById("info").innerHTML = "Gagal ambil data lokasi!";
      });
