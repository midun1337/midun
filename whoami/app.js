    function tampilkanData(ipData, gpsData = null) {
      let output = `
        <b>IP Publik:</b> ${ipData.ip}<br>
        <b>Negara:</b> ${ipData.country_name}<br>
        <b>Provinsi:</b> ${ipData.region}<br>
        <b>Kota:</b> ${ipData.city}<br>
        <b>ISP:</b> ${ipData.org}<br>
      `;

      if (gpsData) {
        // Jika GPS diizinkan
        output += `
          <b>Lokasi Akurat (GPS):</b><br>
          Lat, Long: ${gpsData.coords.latitude}, ${gpsData.coords.longitude}<br>
          Akurasi: ${gpsData.coords.accuracy} meter<br>
        `;
      } else {
        // Jika GPS ditolak → fallback ke ipapi lat/long
        output += `
          <b>Lokasi (IP Based):</b><br>
          Lat, Long: ${ipData.latitude}, ${ipData.longitude}<br>
        `;
      }

      document.getElementById("info").innerHTML = output;
    }

    // --- Ambil IP & info negara/prov/kota/ISP ---
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(ipData => {
        // --- Coba GPS dulu ---
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              tampilkanData(ipData, pos);
            },
            (err) => {
              // Kalau GPS ditolak → pakai IP-based saja
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
