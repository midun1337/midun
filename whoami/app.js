 // --- fallback IP lookup ---
    function fallbackIP() {
      fetch("https://ipapi.co/json/")
        .then(res => res.json())
        .then(data => {
          document.getElementById("info").innerHTML = `
            <b>Lokasi Perkiraan (IP)</b><br>
            IP Publik: ${data.ip}<br>
            Negara: ${data.country_name}<br>
            Provinsi: ${data.region}<br>
            Kota: ${data.city}<br>
            ISP: ${data.org}<br>
            Lat, Long: ${data.latitude}, ${data.longitude}<br>
          `;
        })
        .catch(() => {
          document.getElementById("info").innerHTML = "Gagal mengambil lokasi (IP).";
        });
    }

    // --- coba GPS dulu ---
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          document.getElementById("info").innerHTML = `
            <b>Lokasi Akurat (GPS/Device)</b><br>
            Latitude: ${pos.coords.latitude}<br>
            Longitude: ${pos.coords.longitude}<br>
            Akurasi: ${pos.coords.accuracy} meter<br>
          `;
        },
        (err) => {
          document.getElementById("info").innerHTML = `
            Gagal GPS (${err.message})<br>
            Menggunakan fallback IP...<br><br>
          `;
          fallbackIP();
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 } // opsi GPS
      );
    } else {
      fallbackIP();
    }
