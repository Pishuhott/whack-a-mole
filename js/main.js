    const doc = document;
    const currentScore = doc.querySelector('.current__score');
    const btnStart = doc.querySelector('.start');
    const btnsLevl = doc.querySelectorAll('.header__levels button');
    const holes = doc.querySelectorAll('.game__hole');
    const moles = doc.querySelectorAll('.game__mole');

    let lastHole;
    let time;
    let timeUp = false;
    let score = 0;
    let btnClass = 'esy';

    function randomTime(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function randomHole(holes) {
        const idx = Math.floor(Math.random() * holes.length);
        const hole = holes[idx];
        if (hole === lastHole) {
            return randomHole(holes);
        }

        lastHole = hole;
        return hole;
    }

    function peep() {
        const hole = randomHole(holes);
        if (btnClass == 'esy') {
            time = randomTime(250, 1500)
        }

        if (btnClass == 'normal') {
            time = randomTime(200, 1000)
        }

        if (btnClass == 'hard') {
            time = randomTime(100, 500)
        }

        hole.classList.add('up');
        setTimeout(() => {
            if (!timeUp) peep()
            hole.classList.remove('up');
        }, time);
    }

    function startGame() {
        currentScore.textContent = 0;
        timeUp = false;
        score = 0;
        peep();
        setTimeout(() => timeUp = true, 20000);
    }

    function bonk(e) {
        if (!e.isTrusted) return;
        score++;
        this.classList.remove('up');
        currentScore.textContent = score;
    }

    function toggleActive() {
        btnsLevl.forEach(btn => btn.removeAttribute('id', 'active'));
        this.setAttribute('id', 'active');
        currentScore.textContent = 0;
        timeUp = true;
    }

    function classNames() {
        for (let i = 0; i < btnsLevl.length; i++) {
            let btn = btnsLevl[i];
            btn.addEventListener('click', function () {
                btnClass = btn.className;
            });
        }
    }



    moles.forEach(mole => mole.addEventListener('click', bonk));
    btnsLevl.forEach(btn => btn.addEventListener('click', toggleActive));
    btnsLevl.forEach(btn => btn.addEventListener('click', classNames));

    btnStart.addEventListener('click', startGame);
    