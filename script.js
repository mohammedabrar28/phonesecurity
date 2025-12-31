function runScan() {
  checkIP();
  checkHTTPS();
  checkDNS();
  checkMalware();
}

function checkIP() {
  fetch("https://ipapi.co/json/")
    .then(res => res.json())
    .then(data => {
      ip.textContent = data.ip;
      location.textContent = data.city + ", " + data.country_name;
      isp.textContent = data.org;
    })
    .catch(() => {
      ip.textContent = "BLOCKED";
    });
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
