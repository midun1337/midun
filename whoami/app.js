function tampilkanDataIP() {
      fetch("https://ipapi.co/json/")
        .then(res => res.json())
        .then(data => {
          document.getElementById("info").innerHTML = `
            <b>Lokasi Perkiraan (IP)</b><br>
            IP: ${data.ip}<br>
            Negara: ${data.country_name}<br>
            Provinsi: ${data.region}<br>
            Kota: ${data.city}<br>
            ISP: ${data.org}<br>
            Lat,Long: ${data.latitude}, ${data.longitude}<br>
          `;
        })
        .catch(() => {
          document.getElementById("info").innerHTML = "Gagal mengambil lokasi IP!";
        });
    }

    // coba minta lokasi akurat (akan munculkan pop-up)
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
          // kalau ditolak / error → fallback ke ipapi
          tampilkanDataIP();
        }
      );
    } else {
      tampilkanDataIP();
    }
