const steak = document.getElementById("steak");

let currentScale = 1;
let clickOffset = 0;
let hovered = false;

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
    clickOffset -= 0.2;
});

function gameLoop() {
    const targetScale = hovered ? 1.20 : 1;

    clickOffset = lerp(clickOffset, 0, 0.3);
    currentScale = lerp(currentScale, targetScale + clickOffset, 0.3);

    steak.style.transform = `scale(${currentScale})`;

    requestAnimationFrame(gameLoop);
}

gameLoop();
