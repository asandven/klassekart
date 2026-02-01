:root { --brand-dark: #6b121e; --top-bar: #1e293b; --bg: #f8fafc; }

body { 
    margin: 0; 
    font-family: 'Inter', sans-serif; 
    background: var(--bg);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.top-bar { 
    background: var(--top-bar); 
    height: 80px; 
    display: flex; 
    align-items: center; 
    position: sticky; 
    top: 0; 
    z-index: 1000;
    width: 100%;
}

.nav-container { 
    width: 100%; 
    max-width: 1200px; 
    margin: 0 auto; 
    padding: 0 20px; 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
}

.brand { display: flex; align-items: center; gap: 10px; }
.brand-img { height: 45px; }
.brand-text { color: white; font-size: 1.2rem; font-weight: 800; }
.highlight { color: var(--bg); }

.nav-links { list-style: none; display: flex; gap: 10px; margin: 0; padding: 0; }
.nav-btn { background: transparent; color: white; border: 1px solid rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 8px; cursor: pointer; font-weight: 600; }
.nav-btn.active { background: var(--brand-dark); border-color: var(--brand-dark); }

.menu-toggle { display: none; background: none; border: 1px solid rgba(255,255,255,0.2); color: white; font-size: 1.5rem; padding: 5px 12px; border-radius: 8px; }

@media (max-width: 850px) {
    .menu-toggle { display: block; }
    .nav-links { 
        display: none; 
        position: absolute; 
        top: 80px; left: 0; width: 100%; 
        background: var(--top-bar); 
        flex-direction: column; 
        padding: 20px; 
        box-sizing: border-box; 
    }
    .nav-links.show { display: flex; }
    .action-card { flex-direction: column; text-align: center; }
}

.main-content { 
    flex: 1;
    max-width: 1000px; 
    margin: 0 auto; 
    padding: 30px 20px;
    width: 100%;
    box-sizing: border-box;
}

.action-card { 
    background: white; 
    padding: 30px; 
    border-radius: 20px; 
    display: flex; 
    align-items: center; 
    gap: 30px; 
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}

.calendar-icon { width: 60px; height: 70px; background: #fff1f2; border-radius: 10px; overflow: hidden; display: flex; flex-direction: column; flex-shrink: 0; }
.cal-top { height: 18px; background: var(--brand-dark); }
.cal-body { flex: 1; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; font-weight: 800; color: var(--brand-dark); }

.btn-main { background: var(--brand-dark); color: white; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: 700; display: inline-block; margin-top: 15px; }

.hidden { display: none !important; }

/* Login-spesifikk stil */
.auth-card { background: white; padding: 40px; border-radius: 20px; max-width: 400px; margin: 40px auto; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
.auth-card input { width: 100%; padding: 12px; margin: 20px 0; border: 1px solid #ddd; border-radius: 8px; font-size: 1.2rem; text-align: center; box-sizing: border-box; }