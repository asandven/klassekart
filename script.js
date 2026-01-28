let elever = [];
let dragSrcEl = null;
let manualLockedSeats = {}; 
let rightClickedIdx = null;

window.addEventListener('contextmenu', e => {
    const pult = e.target.closest('.pult');
    if (pult && pult.innerText !== "Ledig") {
        e.preventDefault();
        const allElements = Array.from(document.getElementById('klasserom').children);
        rightClickedIdx = allElements.indexOf(pult);
        const menu = document.getElementById('contextMenu');
        menu.style.top = `${e.pageY}px`;
        menu.style.left = `${e.pageX}px`;
        menu.classList.remove('hidden');
    }
});

window.addEventListener('click', () => document.getElementById('contextMenu').classList.add('hidden'));

function handleMenuSelection() {
    if (rightClickedIdx === null) return;
    const pult = document.getElementById('klasserom').children[rightClickedIdx];
    const navn = pult.innerText;
    if (manualLockedSeats[rightClickedIdx]) {
        delete manualLockedSeats[rightClickedIdx];
        pult.classList.remove('locked');
    } else {
        manualLockedSeats[rightClickedIdx] = navn;
        pult.classList.add('locked');
    }
}

function genererKart() {
    const fileInput = document.getElementById('csvFile');
    if (fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            elever = e.target.result.split(/\r?\n/).filter(l => l.trim() !== "").map(l => {
                const d = l.split(',');
                return { navn: d[0].trim(), kjonn: d[1] ? d[1].trim().toUpperCase() : 'G' };
            });
            plasserElever();
        };
        reader.readAsText(fileInput.files[0]);
    } else { alert("Velg en CSV-fil!"); }
}

function plasserElever() {
    const container = document.getElementById('klasserom');
    container.innerHTML = ""; 
    const getVal = (id) => document.getElementById(id) ? document.getElementById(id).value.trim().toLowerCase() : "";
    const rules = getVal('rulesInput').split('\n').filter(l => l.includes(',')).map(l => l.split(',').map(n => n.trim()));
    const skalMikse = document.getElementById('miksKjonn').checked;

    const layout = [
        ['D','D','D', 'G', 'P','P', 'G', 'D','P','P'], 
        ['P','P','D', 'G', 'P','P', 'G', 'D','P','P'], 
        ['P','P','D', 'G', 'P','P', 'G', 'D','P','P'], 
        ['P','P','P', 'G', 'P','P', 'G', 'P','P','P']
    ];

    let attempts = 0;
    let finalPlacement = [];

    while (attempts < 20000) {
        attempts++;
        let currentMap = new Array(40).fill("SKEP_SPACE");
        let pool = [...elever].sort(() => Math.random() - 0.5);
        let success = true;

        // 1. Plasser låste elever
        for (let idx in manualLockedSeats) {
            const sIdx = pool.findIndex(s => s.navn === manualLockedSeats[idx]);
            if (sIdx !== -1) {
                currentMap[parseInt(idx)] = pool.splice(sIdx, 1)[0];
            }
        }

        // 2. Fyll resten
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 10; c++) {
                const i = r * 10 + c;
                if (layout[r][c] === 'P' && currentMap[i] === "SKEP_SPACE") {
                    const foundIdx = pool.findIndex(s => !hasConflict(s, i, currentMap, rules, skalMikse));
                    if (foundIdx !== -1) {
                        currentMap[i] = pool.splice(foundIdx, 1)[0];
                    } else { success = false; break; }
                }
            }
            if (!success) break;
        }
        if (success) { finalPlacement = currentMap; break; }
    }

    if (finalPlacement.length === 0) {
        alert("Klarte ikke å lage et kart som oppfyller alle krav. Prøv å låse opp noen elever.");
    }
    render(finalPlacement, container);
}

function hasConflict(student, idx, map, rules, mix) {
    const col = idx % 10;
    const neighbors = [];
    if (col > 0 && ![3, 7].includes(col)) neighbors.push(idx - 1);
    if (col < 9 && ![2, 6].includes(col)) neighbors.push(idx + 1);
    
    for (let nIdx of neighbors) {
        const n = map[nIdx];
        if (n && n !== "SKEP_SPACE") {
            // Sjekk Miks: To gutter kan ikke sitte ved siden av hverandre
            if (mix && student.kjonn === 'G' && n.kjonn === 'G') return true;
            // Sjekk Uvenner
            if (rules.some(r => r.includes(student.navn.toLowerCase()) && r.includes(n.navn.toLowerCase()))) return true;
        }
    }
    
    // Sjekk bak/foran (Vertikalt): Bare sjekk pulten RETT foran eller RETT bak for å være mindre streng
    const verticalCheckIdx = [idx - 10, idx + 10];
    for (let vIdx of verticalCheckIdx) {
        if (vIdx >= 0 && vIdx < 40) {
            const vNeighbor = map[vIdx];
            if (mix && student.kjonn === 'G' && vNeighbor && vNeighbor.kjonn === 'G') return true;
        }
    }

    return false;
}

function render(map, container) {
    if (map.length === 0) return;
    map.forEach((val, i) => {
        const pos = i % 10;
        const el = document.createElement('div');
        if (val === "SKEP_SPACE") {
            el.className = (pos === 3 || pos === 6) ? 'gang' : 'tom-plass';
        } else {
            el.className = 'pult ' + (val ? (val.kjonn === 'G' ? 'gutt' : 'jente') : '');
            if (manualLockedSeats[i]) el.classList.add('locked');
            el.innerText = val ? val.navn : 'Ledig';
            el.draggable = true;
            el.addEventListener('dragstart', e => { dragSrcEl = el; });
            el.addEventListener('dragover', e => e.preventDefault());
            el.addEventListener('drop', e => {
                if (dragSrcEl !== el) {
                    let tT = el.innerText, tC = el.className;
                    el.innerText = dragSrcEl.innerText; el.className = dragSrcEl.className;
                    dragSrcEl.innerText = tT; dragSrcEl.className = tC;
                    manualLockedSeats = {}; 
                    document.querySelectorAll('.pult').forEach(p => p.classList.remove('locked'));
                }
            });
        }
        container.appendChild(el);
    });
}

function toggleElevModus() {
    const s = document.getElementById('advancedSettings'), b = document.getElementById('modusBtn');
    const isH = s.classList.toggle('hidden');
    b.innerText = isH ? "Elev-modus: PÅ" : "Elev-modus: AV";
    b.style.backgroundColor = isH ? "#28a745" : "#6c757d";
}

function lagreSomBilde() {
    const area = document.getElementById('captureArea');
    html2canvas(area, { backgroundColor: "#f0f2f5", scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'klassekart.png';
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}