// === RESERVIERUNG SPEICHERN ===
document.addEventListener("DOMContentLoaded", () => {
  const resForm = document.getElementById("reservierungForm");
  if (resForm) {
    resForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const datum = document.getElementById("datum").value;
      const zeit = document.getElementById("zeit").value;
      const personen = document.getElementById("personen").value;
      const wunsch = document.getElementById("wunsch").value;

      const neueReservierung = {
        name,
        date: datum,
        time: zeit,
        guests: personen,
        notes: wunsch,
      };

      const gespeichert = JSON.parse(localStorage.getItem("reservierungen")) || [];
      gespeichert.push(neueReservierung);
      localStorage.setItem("reservierungen", JSON.stringify(gespeichert));

      document.getElementById("feedback").textContent = "Reservierung erfolgreich gespeichert!";
      resForm.reset();
    });
  }

  // === ADMINBEREICH: LOGIN-CHECK BEI SEITENLADUNG ===
  const adminUserField = document.getElementById("admin-user");
  if (adminUserField) {
    loadIfLoggedIn();
  }

  // === Scroll-Animation für fade-in Elemente ===
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach((el) => {
    observer.observe(el);
  });
});

function checkLogin() {
  const user = document.getElementById("admin-user").value;
  const pass = document.getElementById("admin-pass").value;
  const msg = document.getElementById("login-msg");

  if (user === "admin" && pass === "1234") {
    localStorage.setItem("adminLoggedIn", "true");
    loadIfLoggedIn();
  } else {
    msg.textContent = "Zugangsdaten falsch!";
  }
}

function loadIfLoggedIn() {
  if (localStorage.getItem("adminLoggedIn") === "true") {
    document.getElementById("login-area").style.display = "none";
    document.getElementById("admin-area").style.display = "block";
    zeigeReservierungen();
  }
}

function logout() {
  localStorage.removeItem("adminLoggedIn");
  location.reload();
}

function zeigeReservierungen() {
  const daten = JSON.parse(localStorage.getItem("reservierungen")) || [];
  const tbody = document.getElementById("res-liste");
  if (!tbody) return;

  tbody.innerHTML = "";
  daten.forEach((eintrag) => {
    const zeile = document.createElement("tr");
    zeile.innerHTML = `
      <td>${eintrag.name}</td>
      <td>${eintrag.date}</td>
      <td>${eintrag.time}</td>
      <td>${eintrag.guests}</td>
      <td>${eintrag.notes}</td>
    `;
    tbody.appendChild(zeile);
  });
}
