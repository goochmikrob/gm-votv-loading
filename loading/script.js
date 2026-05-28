// ========== 1. ЛОГИ ЗАГРУЗКИ (левая верхняя панель) ==========
const logs = [
    "> FastNet: прослушивание портов...",
    "> OptiSuperuser: загрузка прав...",
    "> GTableManips: восстановление БД...",
    "> UI Library: компиляция HUD...",
    "> Сигналы: калибровка радара...",
    "> Система монет: синхронизация...",
    "> Дрон-транспортёр: проверка узлов...",
    "> Система холода: датчики OK",
    "> Отопление: газовые клапаны...",
    "> Энтити: загрузка моделей...",
    "> Достижения: импорт списков...",
    "> Радар: активация апертуры...",
    "> FastNet: обнаружено 5 узлов",
    "> GM-VoTV: ядро готово"
];

let logIndex = 0;
const logsContainer = document.getElementById('logsContainer');

function addLog() {
    const line = document.createElement('div');
    line.className = 'log-line';
    line.textContent = logs[logIndex % logs.length];
    logsContainer.appendChild(line);
    logsContainer.scrollTop = logsContainer.scrollHeight;
    
    // Оставляем не более 15 строк
    while(logsContainer.children.length > 15) {
        logsContainer.removeChild(logsContainer.firstChild);
    }
    logIndex++;
    
    // Продолжаем бесконечно, но медленнее после "готово"
    let delay = logIndex < logs.length ? 400 : 2000;
    setTimeout(addLog, delay);
}

// ========== 2. СПЕКТРОАНАЛИЗАТОР (правая верхняя панель) ==========
const canvas = document.getElementById('spectrumCanvas');
const ctx = canvas.getContext('2d');
const lettersDiv = document.getElementById('randomLetters');

// Устанавливаем реальный размер canvas (чтобы не размывало)
canvas.width = 400;
canvas.height = 150;

const barsCount = 32;
let amplitudes = new Array(barsCount).fill(0);

function drawSpectrum() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Плавно меняем амплитуды (имитация звука)
    for (let i = 0; i < barsCount; i++) {
        // Случайные изменения, но с инерцией
        let target = Math.random() * 0.8 + 0.2;
        amplitudes[i] = amplitudes[i] * 0.85 + target * 0.15;
        
        let barHeight = amplitudes[i] * canvas.height;
        let barWidth = canvas.width / barsCount - 2;
        let x = i * (barWidth + 2);
        let y = canvas.height - barHeight;
        
        // Градиент от зелёного к красному
        let intensity = amplitudes[i];
        let r = Math.floor(80 + intensity * 175);
        let g = Math.floor(80 + intensity * 100);
        let b = 60;
        
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Эффект свечения
        ctx.shadowBlur = 4;
        ctx.shadowColor = `rgba(0, 255, 0, ${intensity * 0.5})`;
    }
    ctx.shadowBlur = 0;
    
    requestAnimationFrame(drawSpectrum);
}

// Генерация случайных букв над спектром
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
function updateRandomLetters() {
    let length = Math.floor(Math.random() * 12) + 8;
    let text = "";
    for (let i = 0; i < length; i++) {
        text += chars[Math.floor(Math.random() * chars.length)];
    }
    lettersDiv.textContent = text;
    setTimeout(updateRandomLetters, Math.random() * 500 + 200);
}

// ========== 3. ИНФОРМАЦИЯ О СЕРВЕРЕ (нижний левый угол) ==========
function updateServerInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    
    let map = urlParams.get('map') || 'gm_construct';
    let players = urlParams.get('players') || '0';
    let maxPlayers = urlParams.get('maxplayers') || '5';
    let gamemode = urlParams.get('gamemode') || 'sandbox';
    
    // Очищаем и обновляем
    const infoDiv = document.getElementById('infoContent');
    infoDiv.innerHTML = `
        <div>MAP: ${map}</div>
        <div>PLAYERS: ${players}/${maxPlayers}</div>
        <div>MODE: GM-VoTV / ${gamemode}</div>
        <div>VERSION: 0.5.3-dev</div>
        <div>STATUS: ONLINE</div>
    `;
    
    // Обновляем каждые 5 секунд (на случай изменения)
    setTimeout(updateServerInfo, 5000);
}

// ========== 4. ПРИВЯЗКА К ПРОГРЕССУ ЗАГРУЗКИ ==========
function updateLoadingProgress() {
    const urlParams = new URLSearchParams(window.location.search);
    let progress = parseFloat(urlParams.get('loading'));
    if (isNaN(progress)) progress = 0;
    
    // Меняем цвет рамки панелей в зависимости от прогресса
    const panels = document.querySelectorAll('.panel');
    let intensity = Math.min(255, Math.floor(progress * 2.55));
    panels.forEach(panel => {
        panel.style.borderColor = `rgb(${intensity}, ${100 + intensity/2}, ${50})`;
    });
    
    requestAnimationFrame(() => setTimeout(updateLoadingProgress, 300));
}

setTimeout(() => {
    addLog();               // Запускаем бегущие логи
    drawSpectrum();         // Запускаем анимацию спектра
    updateRandomLetters();  // Запускаем случайные буквы
    updateServerInfo();     // Запускаем мониторинг параметров сервера
    updateLoadingProgress(); // Эффект изменения рамок
}, 100);

const backgrounds = [
    "wallpaper1.png",
    "wallpaper2.png",
    "wallpaper3.png",
    "wallpaper4.png",
    "wallpaper6.png",
    "wallpaper7.png",
    "wallpaper8.png"
];

let currentBgIndex = 0;
const bgDiv = document.querySelector('.bg');

// Меняем фон через интервал
function changeBackground() {
    currentBgIndex = (currentBgIndex + 1) % backgrounds.length;
    bgDiv.style.backgroundImage = `url('${backgrounds[currentBgIndex]}')`;
    
    // Плавный переход (опционально)
    bgDiv.style.transition = "background-image 1s ease-in-out";
}

// Запускаем смену каждые 5 секунд (5000 мс)
setInterval(changeBackground, 5000);