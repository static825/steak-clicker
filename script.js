const steak = document.getElementById("steak");
const game = document.querySelector(".game");

let hovered = false;
let mouseDown = false;

let currentScale = 1;

let lastTime = performance.now();

const floatingTexts = [];

function lerp(a, b, t) {
    return a + (b - a) * t;
}

steak.draggable = false;

steak.addEventListener("dragstart", (e) => {
    e.preventDefault();
});

steak.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});

steak.addEventListener("mouseenter", () => {
    hovered = true;
});

steak.addEventListener("mouseleave", () => {
    hovered = false;
    mouseDown = false;
});

steak.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;

    e.preventDefault();
    mouseDown = true;
});

window.addEventListener("mouseup", (e) => {

    if (!mouseDown || !hovered) {
        mouseDown = false;
        return;
    }

    mouseDown = false;

    // TODO: Add steak counter here
    console.log("+1 Steak");

    const rect = game.getBoundingClientRect();

    createFloatingText(
        e.clientX - rect.left,
        e.clientY - rect.top - 20
    );
});

function createFloatingText(x, y) {

    const div = document.createElement("div");

    div.className = "floating-text";
    div.textContent = "+1";

    game.appendChild(div);

    floatingTexts.push({
        element: div,
        x: x + (Math.random() * 12 - 6),
        y: y + (Math.random() * 8 - 4),
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

        text.y -= 50 * dt;
        text.opacity -= 0.5 * dt;

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
