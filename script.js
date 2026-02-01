function toggleMenu() {
    const nav = document.getElementById('navLinks');
    nav.classList.toggle('show');
}

function visSeksjon(id, el) {
    // Skjul mobilmenyen etter valg
    const nav = document.getElementById('navLinks');
    nav.classList.remove('show');

    // Oppdater aktive knapper
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    if (el) el.classList.add('active');
    
    // Vis riktig innhold
    document.querySelectorAll('.tab-content').forEach(section => section.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    
    // Scroll til toppen av innholdet på mobil
    window.scrollTo(0, 0);
}

function sjekkLogin() {
    const pin = document.getElementById('pinCode').value;
    if (pin === "1234") {
        alert("Innlogget!");
    } else {
        alert("Feil PIN.");
    }
}