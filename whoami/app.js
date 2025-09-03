 // --- fallback IP lookup ---
    function fallbackIP() {
      fetch("https://ipapi.co/json/")
        .then(res => res.json())
        .then(data => {
          document.getElementById("info").innerHTML = `
            <b>Who?</b><br>
            IP: ${data.ip}<br>
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
          let loc = pos.coords.latitude + ", " + pos.coords.longitude;
          document.getElementById("info").innerHTML = `
            <b>I'm is </b><br>
            Loc: ${loc}<br>
            Acc: ${pos.coords.accuracy} meter<br>
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
