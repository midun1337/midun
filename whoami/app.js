const infoDiv = document.getElementById("info");

    // Coba pakai geolocation bawaan browser
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          let lat = pos.coords.latitude;
          let lon = pos.coords.longitude;

          try {
            // Reverse geocoding dengan ipapi berdasarkan lat/lon
            let res = await fetch(`https://ipapi.co/${lat},${lon}/json/`);
            let data = await res.json();

            infoDiv.innerHTML = `
              <h3>Lokasi Akurat (GPS)</h3>
              Negara: ${data.country_name}<br>
              Provinsi: ${data.region}<br>
              Kota: ${data.city}<br>
              ISP: ${data.org}<br>
              LatLong: ${lat}, ${lon}<br>
            `;
          } catch (e) {
            infoDiv.innerHTML = "Gagal mengambil detail lokasi akurat!";
          }
        },
        (err) => {
          // Kalau user tolak izin → fallback IP API biasa
          fetch("https://ipapi.co/json/")
            .then(r => r.json())
            .then(d => {
              infoDiv.innerHTML = `
                <h3>Lokasi Perkiraan (IP API)</h3>
                IP Publik: ${d.ip}<br>
                Negara: ${d.country_name}<br>
                Provinsi: ${d.region}<br>
                Kota: ${d.city}<br>
                ISP: ${d.org}<br>
                LatLong: ${d.latitude}, ${d.longitude}<br>
              `;
            })
            .catch(() => {
              infoDiv.innerHTML = "Gagal mengambil lokasi!";
            });
        }
      );
    } else {
      infoDiv.innerHTML = "Browser tidak mendukung Geolocation!";
    }
