function toggleMenu() { document.getElementById('navLinks').classList.toggle('show'); }

function visSeksjon(id, el) {
    document.getElementById('navLinks').classList.remove('show');
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    if (el) el.classList.add('active');
    
    document.querySelectorAll('.tab-content').forEach(section => section.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

function sjekkLogin() {
    // Endret PIN til noe litt mer "rocka" hvis du vil, eller behold 1234
    if (document.getElementById('pinCode').value === "1234") {
        alert("Logget inn! Klar for å redigere klassekart.");
        // Her legger vi inn funksjonen for klassekartet etterpå
    } else {
        alert("Feil PIN.");
    }
}