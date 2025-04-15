// Scroll-Animation für Spezialitäten
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("scroll-visible");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".gericht").forEach(el => observer.observe(el));
});

// === Reservierung speichern ===
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reservierungForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const datum = document.getElementById("datum").value;
      const zeit = document.getElementById("zeit").value;
      const personen = document.getElementById("personen").value;
      const wunsch = document.getElementById("wunsch").value;

      const eintrag = { name, datum, zeit, personen, wunsch };
      const alle = JSON.parse(localStorage.getItem("reservierungen") || "[]");
      alle.push(eintrag);
      localStorage.setItem("reservierungen", JSON.stringify(alle));

      document.getElementById("feedback").textContent = "Reservierung gespeichert!";
      form.reset();
    });
  }

  // === Admin Login ===
  if (document.getElementById("admin-user")) {
    loadIfLoggedIn();
  }
});

function checkLogin() {
  const user = document.getElementById("admin-user").value;
  const pass = document.getElementById("admin-pass").value;
  if (user === "admin" && pass === "1234") {
    localStorage.setItem("adminLoggedIn", "true");
    loadIfLoggedIn();
  } else {
    document.getElementById("login-msg").textContent = "Falscher Benutzername oder Code.";
  }
}

function loadIfLoggedIn() {
  if (localStorage.getItem("adminLoggedIn") === "true") {
    document.getElementById("login-area").style.display = "none";
    document.getElementById("admin-area").style.display = "block";
    ladeReservierungen();
  }
}

function logout() {
  localStorage.removeItem("adminLoggedIn");
  location.reload();
}

function ladeReservierungen() {
  const daten = JSON.parse(localStorage.getItem("reservierungen") || "[]");
  const tbody = document.getElementById("res-liste");
  if (!tbody) return;
  tbody.innerHTML = "";
  daten.forEach(eintrag => {
    const zeile = document.createElement("tr");
    zeile.innerHTML = `
      <td>${eintrag.name}</td>
      <td>${eintrag.datum}</td>
      <td>${eintrag.zeit}</td>
      <td>${eintrag.personen}</td>
      <td>${eintrag.wunsch}</td>
    `;
    tbody.appendChild(zeile);
  });
}
