// ===================== LOADS.JS =====================
// 1) Lista de invitados (ejemplo)
const guests = [
  { id: "1", name: "Familia Gutiérrez", passes: 3 },
  { id: "2", name: "Familia Martínez", passes: 4 },
  { id: "3", name: "Familia Cajas", passes: 2 },
  { id: "4", name: "Familia Vasquez", passes: 2 },
  { id: "5", name: "Familia Aroche", passes: 4 },
  { id: "6", name: "Familia Florian", passes: 2 },
  { id: "7", name: "Familia Álvarez", passes: 2 },
  { id: "8", name: "Familia Fajardo", passes: 3 },
  { id: "9", name: "Familia Alvarado", passes: 2 },
  { id: "10", name: "Familia Quiñonez", passes: 3 },
  { id: "11", name: "Familia Gómez", passes: 4 },
  { id: "12", name: "Familia Castellon", passes: 4 },
  { id: "13", name: "Familia Taquira", passes: 2 },
  { id: "14", name: "Familia Macario", passes: 4 },
  { id: "15", name: "Familia Guzman", passes: 2 },
  { id: "16", name: "Familia Batres", passes: 2 },
  { id: "17", name: "Familia Castellanos", passes: 2 },
  { id: "18", name: "Familia Santos", passes: 2 },
  { id: "19", name: "Berta Tiu", passes: 1 },
  { id: "20", name: "Jennifer Salazar", passes: 1 },
  { id: "21", name: "Cristina Osoy", passes: 1 },
  { id: "22", name: "Gabriel Sisimit", passes: 1 },
  { id: "23", name: "Vilma Juarez", passes: 1 },
  { id: "24", name: "Christopher Vernon", passes: 1 },
  { id: "25", name: "Delva Temaj", passes: 1 },
  { id: "26", name: "Linda Bathen", passes: 1 },
  { id: "27", name: "Lucky del Valle", passes: 1 },
  { id: "28", name: "Armando Jimenez", passes: 1 },
  { id: "29", name: "Familia Mendez", passes: 3 },
  { id: "30", name: "Familia Huertas", passes: 3 },
  { id: "31", name: "Familia Monroy", passes: 2 },
  { id: "32", name: "Familia Miranda", passes: 3 },
  { id: "33", name: "Familia Martins", passes: 2 },
  { id: "34", name: "Familia Guzman Monroy", passes: 2 },
  { id: "35", name: "Familia Gonzalez", passes: 2 },
  { id: "36", name: "Familia Subuyuj", passes: 3 },
  { id: "37", name: "Familia Rodriguez", passes: 2 },
  { id: "38", name: "Familia Davila", passes: 3 },
  { id: "39", name: "Rudy Cruz", passes: 1 },
  { id: "40", name: "Familia Monroy Garcia", passes: 2 },
  { id: "41", name: "Lilian de Monroy", passes: 1 },
  { id: "42", name: "Familia Chacon Monroy", passes: 3 },
  { id: "43", name: "Familia Hernandez", passes: 2 },
  { id: "44", name: "Carlos Mogollon", passes: 1 },
  { id: "45", name: "Marvin Cortez", passes: 1 },
  { id: "46", name: "Familia Galindo", passes: 3 },
  { id: "47", name: "William Aroche", passes: 1 },
  { id: "48", name: "Familia Ramirez", passes: 2 },
  { id: "49", name: "Familia Lam", passes: 2 },
  { id: "50", name: "Familia Salguero", passes: 2 },
  { id: "51", name: "Familia Figueroa", passes: 2 },
  { id: "52", name: "Familia Monroy Perez", passes: 2 },
  { id: "53", name: "Familia Blanco", passes: 2 },
  { id: "54", name: "Yanet De De Leon", passes: 1 },
  { id: "55", name: "Familia Guas", passes: 4 },
  { id: "56", name: "Familia Miranda Ochoa", passes: 2 },
  { id: "57", name: "Familia Fernandez", passes: 3 },
  { id: "58", name: "Familia Sique", passes: 4 },
  { id: "59", name: "Familia Lira", passes: 2 },
  { id: "60", name: "Familia Reyes", passes: 3 },
  { id: "61", name: "Familia Ixcoy", passes: 2 },
  { id: "62", name: "Familia Soto", passes: 2 },
  { id: "63", name: "Familia Gomez Estrada", passes: 2 },
  { id: "64", name: "Familia Vasquez", passes: 2 },
];

// Helper: leer parámetros ?id=1
function getQueryParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

document.addEventListener("DOMContentLoaded", () => {
  const guestId = getQueryParam("id");

  // Si no hay id, no marcamos error: solo no hay invitado
  if (!guestId) {
    window.currentGuest = null;
    return;
  }

  const guest = guests.find((g) => String(g.id) === String(guestId));

  if (guest) {
    window.currentGuest = guest;

    // Si tienes estos elementos en alguna parte, los llena (opcional)
    const guestNameEl = document.getElementById("guest-name");
    const passesEl = document.getElementById("passes");

    if (guestNameEl) guestNameEl.textContent = guest.name;
    if (passesEl) {
      const p = Number(guest.passes || 1);
      passesEl.textContent = `${p} ${p === 1 ? "pase" : "pases"}`;
    }
  } else {
    window.currentGuest = null;

    const guestNameEl = document.getElementById("guest-name");
    if (guestNameEl) guestNameEl.textContent = "Invitado no encontrado";
  }
});