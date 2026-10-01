document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Interaktivní prvek: Zobrazení tajného textu (Zobrazit více)
    const showMoreBtn = document.getElementById('show-more-btn');
    const secretText = document.getElementById('secret-text');

    if (showMoreBtn && secretText) {
        showMoreBtn.addEventListener('click', () => {
            // Přepínání CSS třídy pro zobrazení/skrytí
            secretText.classList.toggle('hidden');
            
            // Změna textu tlačítka
            if (secretText.classList.contains('hidden')) {
                showMoreBtn.textContent = 'Zobrazit temné tajemství';
            } else {
                showMoreBtn.textContent = 'Skrýt tajemství';
            }
        });
    }

    // 2. Interaktivní prvek: Přepínání záložek (Tabs) pro postavy
    const tabBtns = document.querySelectorAll('.tab-btn');
    const charPanes = document.querySelectorAll('.char-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Odstranění třídy 'active' ze všech tlačítek a panelů
            tabBtns.forEach(b => b.classList.remove('active'));
            charPanes.forEach(p => p.classList.remove('active'));

            // Přidání třídy 'active' na kliknuté tlačítko
            btn.classList.add('active');

            // Získání cílového panelu z data atributu
            const targetId = btn.getAttribute('data-target');
            const targetPane = document.getElementById(targetId);
            
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // 3. Interaktivní prvek: Kontrola formuláře (Kvíz)
    const cultForm = document.getElementById('cult-form');
    const formResult = document.getElementById('form-result');

    if (cultForm && formResult) {
        cultForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Zabráníme odeslání formuláře (obnovení stránky)

            const sacrificeInput = document.getElementById('sacrifice').value.trim();
            const siblingChoice = document.getElementById('sibling-choice').value;

            // Jednoduchá kontrola
            if (sacrificeInput.length < 3) {
                formResult.textContent = 'Vaše oběť není dostatečná...';
                formResult.style.color = '#ff4444';
                formResult.classList.remove('hidden', 'success');
                return;
            }

            // Pokud je vše v pořádku
            formResult.textContent = `Vítejte v kultu. Vybrali jste si cestu s ${siblingChoice === 'andy' ? 'Andym' : 'Leyley'}. Vaše oběť ("${sacrificeInput}") byla přijata.`;
            formResult.classList.remove('hidden');
            formResult.classList.add('success');
            formResult.style.color = ''; // Reset barvy

            // Vyresetování formuláře po úspěchu
            cultForm.reset();
        });
    }
});
