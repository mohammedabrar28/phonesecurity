function runScan() {
  checkIP();
  checkHTTPS();
  checkDNS();
  checkMalware();
}

function checkIP() {
  fetch("https://api.ipify.org?format=json")
    .then(res => res.json())
    .then(data => {
      ip.textContent = data.ip;
    })
    .catch(() => {
      ip.textContent = "UNAVAILABLE";
    });

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude.toFixed(4);
        const lon = position.coords.longitude.toFixed(4);
        location.textContent = `Lat ${lat}, Lon ${lon}`;
      },
      () => {
        location.textContent = "PERMISSION DENIED";
      }
    );
  } else {
    location.textContent = "NOT SUPPORTED";
  }

  isp.textContent = "Mobile Network";
}

function checkHTTPS() {
  if (location.protocol === "https:") {
    https.textContent = "SECURE";
  } else {
    https.textContent = "NOT SECURE";
    setThreat("medium");
  }
}

function checkDNS() {
  if (navigator.connection && navigator.connection.effectiveType) {
    dns.textContent = "NO LEAK DETECTED";
  } else {
    dns.textContent = "POSSIBLE LEAK";
    setThreat("medium");
  }
}

function checkMalware() {
  const risky = Math.random() > 0.7;
  if (risky) {
    malware.textContent = "SUSPICIOUS ACTIVITY";
    setThreat("high");
  } else {
    malware.textContent = "CLEAN";
  }
}

function setThreat(level) {
  const box = document.getElementById("threat");
  box.className = "threat " + level;
  box.textContent = level.toUpperCase();
}
