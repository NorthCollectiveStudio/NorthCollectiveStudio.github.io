const audioTrack = document.getElementById('danceAudio');
        const startAudio = () => {
            if (audioTrack.paused) {
                audioTrack.play().then(() => {
                    removeListeners();
                }).catch(error => {
                    console.log("Ждем действий пользователя: ", error);
                });
            }
        };
        const removeListeners = () => {
            ['click', 'touchstart', 'keydown', 'scroll'].forEach(evt => {
                document.removeEventListener(evt, startAudio);
            });
        };
        ['click', 'touchstart', 'keydown', 'scroll'].forEach(evt => {
            document.addEventListener(evt, startAudio);
        });

const facts = [
            {
                name: "Rosem",
                text: "Ну и где я нахуй",
                sprite: "img/rosask/o_o.png"
            },
            {
                name: "Rosem",
                text: "Ладно, раз уж я в своей комнате, то похуй",
                sprite: "img/rosask/normal.png"
            },
            {
                name: "Rosem",
                text: "Мне кажется, что кто-то сидит и смотрит на меня",
                sprite: "img/rosask/nevermind.png"
            },
            {
                name: "Rosem",
                text: "Так и есть, бляя",
                sprite: "img/rosask/fuck.png"
            },
            {
                name: "Rosem",
                text: "Хочется вернуть старые временна....",
                sprite: "img/rosask/sad.png"
            },
            {
                name: "Rosem",
                text: "Я только щас вспомнил, что через несколько минут должна...как её....Хикки прийти",
                sprite: "img/rosask/nappy.png"
            },
            {
                name: "Rosem",
                text: "Я немного Хикки побаиваюсь. Вдруг зарежет",
                sprite: "img/rosask/o_o.png"
            },
            {
                name: "Rosem",
                text: "Надеюсь, что реня не будет спать в это время",
                sprite: "img/rosask/o_o.png"
            },
            {
                name: "Rosem",
                text: "Бля, мне мама долго не звонит. Почему?",
                sprite: "img/rosask/sad.png"
            },
            {
                name: "Rosem",
                text: "Дингробесе",
                sprite: "img/rosask/normal.png"
            },
            {
                name: "Rosem",
                text: "Надеюсь, что не усну до прихода Хикки",
                sprite: "img/rosask/normal.png"
            },
            {
                name: "Rosem",
                text: "Что ты любишь?",
                sprite: "img/rosask/nevermind.png"
            },
            {
                name: "Rosem",
                text: "Кстати скоро кое-что выйдет....",
                sprite: "img/rosask/nappy.png"
            },
            {
                name: "Rosem",
                text: "Как же я боюсь взрослеть",
                sprite: "img/rosask/sad.png"
            },
            {
                name: "Rosem",
                text: "ПРОСТИТЕ ПРОСТИТЕ ПРОСТИТЕ ПРОСТИТЕ ПРОСТИТЕ ПРОСТИТЕ ПРОСТИТЕ ПРОСТИТЕ ПРОСТИТЕ ПРОСТИТЕ ПРОСТИТЕ ПРОСТИТЕ",
                sprite: "img/rosask/sad.png"
            }
        ];

        let lastIndex = -1;
        let isStarted = false; 

        const gameBox = document.getElementById('game-box');
        const startScreen = document.getElementById('start-screen');
        const characterImg = document.getElementById('character');
        const dialogueText = document.getElementById('dialogue');
        const nameTag = document.getElementById('char-name');
        const bgm = document.getElementById('bgm');

        function getRandomFact() {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * facts.length);
            } while (randomIndex === lastIndex && facts.length > 1);

            lastIndex = randomIndex;
            return facts[randomIndex];
        }

        function nextFact() {
            const fact = getRandomFact();
            dialogueText.textContent = fact.text;
            characterImg.src = fact.sprite;
            nameTag.textContent = fact.name || "???";
        }

        gameBox.addEventListener('click', () => {
            if (!isStarted) {
                isStarted = true;
                startScreen.style.display = 'none'; 
                
                bgm.play().catch(error => {
                    console.log("Автовоспроизведение музыки заблокировано браузером. Потребуется еще клик.", error);
                });
                nextFact(); 
            } else {
                nextFact();
            }
        });

function playEffect(card, originalSrc, altSrc) {
            const img = card.querySelector('.staff-photo img');
            const sound = document.getElementById('click-sound');
            if (img) {
                img.src = altSrc;
            }
            if (sound) {
                sound.currentTime = 0;
                sound.play().catch(e => {
                    console.log("Интеракция: звук заблокирован политикой браузера до первого клика.");
                });
            }
            setTimeout(() => {
                if (img) {
                    img.src = originalSrc;
                }
            }, 250);
        }