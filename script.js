const steak = document.getElementById("steak");
const game = document.querySelector(".game");

let currentScale = 1;
let hovered = false;
let mouseDown = false;

let lastTime = performance.now();

let mouseX = 0;
let mouseY = 0;

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

steak.addEventListener("mousedown", () => {
    mouseDown = true;

    // TODO: Add steak here
    console.log("+1 Steak");

    createFloatingText(mouseX, mouseY);
});

window.addEventListener("mouseup", () => {
    mouseDown = false;
});

function createFloatingText(x, y) {
    const div = document.createElement("div");

    div.className = "floating-text";
    div.textContent = "+1";

    game.appendChild(div);

    floatingTexts.push({
        element: div,
        x,
        y,
        alpha: 1
    });
}

function gameLoop(now) {

    const dt = (now - lastTime) / 1000;
    lastTime = now;

    const smoothness = 14;
    const t = 1 - Math.exp(-smoothness * dt);

    let targetScale;

    if (mouseDown && hovered)
        targetScale = 1.1;
    else if (hovered)
        targetScale = 1.2;
    else
        targetScale = 1;

    currentScale = lerp(currentScale, targetScale, t);

    steak.style.transform = `scale(${currentScale})`;

    for (let i = floatingTexts.length - 1; i >= 0; i--) {

        const text = floatingTexts[i];

        text.y -= 80 * dt;
        text.alpha -= 2 * dt;

        text.element.style.left = `${text.x}px`;
        text.element.style.top = `${text.y}px`;
        text.element.style.opacity = text.alpha;

        if (text.alpha <= 0) {
            text.element.remove();
            floatingTexts.splice(i, 1);
        }
    }

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
