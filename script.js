const steak = document.getElementById("steak");

let currentScale = 1;
let hovered = false;

let lastTime = performance.now();

function lerp(a, b, t) {
    return a + (b - a) * t;
}

steak.addEventListener("mouseenter", () => {
    hovered = true;
});

steak.addEventListener("mouseleave", () => {
    hovered = false;
});

steak.addEventListener("click", () => {
    currentScale -= 0.1;
});

function gameLoop(now) {

    const dt = (now - lastTime) / 1000;
    lastTime = now;

    const targetScale = hovered ? 1.2 : 1;

    // Frame-rate independent smoothing
    const smoothness = 14;
    const t = 1 - Math.exp(-smoothness * dt);

    currentScale = lerp(currentScale, targetScale, t);

    if (Math.abs(currentScale - targetScale) < 0.001) {
        currentScale = targetScale;
    }

    steak.style.transform = `scale(${currentScale})`;

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
