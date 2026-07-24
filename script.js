const steak = document.getElementById("steak");
const game = document.querySelector(".game");

let hovered = false;
let mouseDown = false;

let currentScale = 1;
let mouseX = 0;
let mouseY = 0;

let lastTime = performance.now();

const floatingTexts = [];

function lerp(a, b, t) {
    return a + (b - a) * t;
}

game.addEventListener("mousemove", (e) => {
    const rect = game.getBoundingClientRect();

    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});

steak.addEventListener("mouseenter", () => {
    hovered = true;
});

steak.addEventListener("mouseleave", () => {
    hovered = false;
});

steak.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;

    mouseDown = true;
});

window.addEventListener("mouseup", (e) => {
    if (!mouseDown) return;

    mouseDown = false;

    // Award point here
    console.log("+1 Steak");

    createFloatingText(mouseX, mouseY);
});

function createFloatingText(x, y) {

    const div = document.createElement("div");

    div.className = "floating-text";
    div.textContent = "+1";

    game.appendChild(div);

    floatingTexts.push({
        element: div,
        x: x,
        y: y,
        opacity: 1
    });
}

function gameLoop(now) {

    const dt = (now - lastTime) / 1000;
    lastTime = now;

    const smoothness = 14;
    const t = 1 - Math.exp(-smoothness * dt);

    let targetScale = 1;

    if (hovered)
        targetScale = 1.2;

    if (hovered && mouseDown)
        targetScale = 1.1;

    currentScale = lerp(currentScale, targetScale, t);

    steak.style.transform = `scale(${currentScale})`;

    for (let i = floatingTexts.length - 1; i >= 0; i--) {

        const text = floatingTexts[i];

        text.y -= 70 * dt;
        text.opacity -= 2 * dt;

        text.element.style.left = `${text.x}px`;
        text.element.style.top = `${text.y}px`;
        text.element.style.opacity = text.opacity;

        if (text.opacity <= 0) {
            text.element.remove();
            floatingTexts.splice(i, 1);
        }
    }

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
