document.addEventListener('DOMContentLoaded', () => {

    // === AUDIO SETUP ===
    const bgMusic = new Audio('sfx/bg_musicc.mp3');
    bgMusic.loop = true;
    bgMusic.volume = 0.25; // 25% hlasitost hudby

    const clickSound = new Audio('sfx/click.mp3');
    clickSound.volume = 0.3; // 30% hlasitost kliknutí

    let musicStarted = false;
    let muted = false;

    // Spustí hudbu při prvním kliknutí kdekoliv
    function startMusic() {
        if (!musicStarted) {
            bgMusic.play().catch(() => {});
            musicStarted = true;
        }
    }

    // Click sound + spuštění hudby při každém kliknutí
    document.addEventListener('click', () => {
        startMusic();
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {});
    });

    // Tlačítko mute
    const muteBtn = document.getElementById('mute-btn');
    if (muteBtn) {
        muteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            muted = !muted;
            bgMusic.muted = muted;
            muteBtn.textContent = muted ? '🔇 Hudba' : '🔊 Hudba';
        });
    }

    // 1. Zobrazení tajného textu
    const showMoreBtn = document.getElementById('show-more-btn');
    const secretText = document.getElementById('secret-text');

    if (showMoreBtn && secretText) {
        showMoreBtn.addEventListener('click', () => {
            secretText.classList.toggle('hidden');
            if (secretText.classList.contains('hidden')) {
                showMoreBtn.textContent = 'Zobrazit temné tajemství';
            } else {
                showMoreBtn.textContent = 'Skrýt tajemství';
            }
        });
    }

    // 2. Přepínání záložek pro postavy
    const tabBtns = document.querySelectorAll('.tab-btn');
    const charPanes = document.querySelectorAll('.char-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            charPanes.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // 3. Kontrola formuláře (Kvíz)
    const cultForm = document.getElementById('cult-form');
    const formResult = document.getElementById('form-result');

    if (cultForm && formResult) {
        cultForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const sacrificeInput = document.getElementById('sacrifice').value.trim();
            const siblingChoice = document.getElementById('sibling-choice').value;

            if (sacrificeInput.length < 3) {
                formResult.textContent = 'Vaše oběť není dostatečná...';
                formResult.style.color = '#ff4444';
                formResult.classList.remove('hidden', 'success');
                return;
            }

            formResult.textContent = `Vítejte v kultu. Vybrali jste si cestu s ${siblingChoice === 'andy' ? 'Andym' : 'Leyley'}. Vaše oběť ("${sacrificeInput}") byla přijata.`;
            formResult.classList.remove('hidden');
            formResult.classList.add('success');
            formResult.style.color = '';
            cultForm.reset();
        });
    }
});
