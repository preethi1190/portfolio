const canvas = document.getElementById("animationCanvas");
const ctx = canvas.getContext("2d");

const frameCount = 240;
const images = [];
let currentFrame = 0;

// Resize canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  renderFrame(currentFrame);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Generate frame path
function getFramePath(index) {
  return `frames/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;
}

// Preload images
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = getFramePath(i);
  images.push(img);
}

// Draw frame
function renderFrame(index) {
  const img = images[index];
  if (!img.complete) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Maintain aspect ratio
  const scale = Math.max(
    canvas.width / img.width,
    canvas.height / img.height
  );

  const x = (canvas.width / 2) - (img.width / 2) * scale;
  const y = (canvas.height / 2) - (img.height / 2) * scale;

  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    x,
    y,
    img.width * scale,
    img.height * scale
  );
}

// Scroll control
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScroll;

  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  if (frameIndex !== currentFrame) {
    currentFrame = frameIndex;
    requestAnimationFrame(() => renderFrame(currentFrame));
  }
});

// Draw first frame once loaded
images[0].onload = () => {
  renderFrame(0);
};
