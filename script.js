const alphabet = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
let currentLetter = '';
let mode = 'letter'; // 'letter' para lectura de letras, 'fonema' para fonemas
let isDarkMode = false;
let textSize = 'large'; // 'large' para texto grande, 'medium' para texto mediano

// Alterna entre modos de lectura usando TAB
document.addEventListener('keydown', function(event) {
    if (event.key === "Tab") {
        event.preventDefault();
        mode = (mode === 'letter') ? 'fonema' : 'letter';
        document.getElementById('instructions').textContent = `Modo actual: ${mode === 'letter' ? 'Lectura de letras' : 'Lectura de fonemas'}.`;
    }
});

// Alterna el modo de contraste
function toggleContrast() {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
    } else {
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
    }
}

// Ajusta el tamaño del texto
function toggleTextSize() {
    textSize = (textSize === 'large') ? 'medium' : 'large';
    document.getElementById('letter').style.fontSize = (textSize === 'large') ? '100px' : '70px';
    document.getElementById('instructions').style.fontSize = (textSize === 'large') ? '24px' : '18px';
}

// Reproduce la letra o fonema según el modo
document.addEventListener('keydown', function(event) {
    const pressedKey = event.key.toUpperCase();

    if (alphabet.includes(pressedKey)) {
        currentLetter = pressedKey;
        document.getElementById('letter').textContent = pressedKey;
        
        if (mode === 'letter') {
            speakLetter(pressedKey);
        } else {
            playFonema(pressedKey);
        }
    } else if (event.ctrlKey && currentLetter) {
        if (mode === 'letter') {
            speakLetter(currentLetter);
        } else {
            playFonema(currentLetter);
        }
    }
});

// Función para nombrar la letra usando la API del navegador
function speakLetter(letter) {
    const msg = new SpeechSynthesisUtterance(letter);
    msg.lang = 'es-ES';
    window.speechSynthesis.speak(msg);
}

// Función para reproducir el fonema de la letra usando un archivo de audio
function playFonema(letter) {
    const audioFile = `sounds/fonema/${letter.toLowerCase()}.mp3`;
    const audio = new Audio(audioFile);
    audio.play();
}
