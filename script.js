function visSeksjon(id, el) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (el) el.classList.add('active');
    
    document.querySelectorAll('.tab-content').forEach(section => {
        section.classList.add('hidden');
    });
    
    document.getElementById(id).classList.remove('hidden');
}

function sjekkLogin() {
    const pin = document.getElementById('pinCode').value;
    if (pin === "1234") {
        alert("Lærer-tilgang bekreftet!");
    } else {
        alert("Feil PIN-kode.");
    }
}