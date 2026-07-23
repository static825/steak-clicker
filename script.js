const steak = document.getElementById("steak");

let hovered = false;
let clickScale = 1;

steak.addEventListener("mouseenter", () => {
    hovered = true;
});

steak.addEventListener("mouseleave", () => {
    hovered = false;
});

steak.addEventListener("click", () => {
    clickScale -= 0.18;
    updateScale();
});

function updateScale() {
    const hoverScale = hovered ? 1.15 : 1;
    steak.style.transform = `scale(${hoverScale * clickScale})`;
}

function gameLoop() {
    // Recover from click squash
    clickScale += (1 - clickScale) * 0.35;

    updateScale();

    requestAnimationFrame(gameLoop);
}

gameLoop();
