const canvas =
	document.getElementById(
		"backgroundCanvas"
	);
const ctx =
	canvas.getContext("2d");

let width, height;
const triangles = [];
const triangleColor =
	"#ff3131"; // Color of the triangles

function resizeCanvas() {
	width = window.innerWidth;
	height = window.innerHeight;
	canvas.width = width;
	canvas.height = height;
}

function createTriangle() {
	const size =
		Math.random() * 20 + 20; // Slightly larger triangles
	const x =
		Math.random() * width;
	const y =
		Math.random() * height;
	const dx =
		(Math.random() - 0.5) *
		0.5; // Slower movement
	const dy =
		(Math.random() - 0.5) *
		0.5; // Slower movement
	const opacity =
		Math.random() * 0.5 + 0.5;
	triangles.push({
		x,
		y,
		size,
		dx,
		dy,
		opacity
	});
}

function drawTriangle(
	triangle
) {
	const {
		x,
		y,
		size,
		opacity
	} = triangle;
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(
		x + size,
		y + size / 2
	);
	ctx.lineTo(x, y + size);
	ctx.closePath();
	ctx.fillStyle = `rgba(255, 49, 49, ${opacity})`; // Triangle color
	ctx.fill();
}

function updateTriangles() {
	triangles.forEach(
		(triangle) => {
			triangle.x +=
				triangle.dx;
			triangle.y +=
				triangle.dy;

			if (
				triangle.x > width ||
				triangle.x < 0
			) {
				triangle.dx =
					-triangle.dx;
			}
			if (
				triangle.y > height ||
				triangle.y < 0
			) {
				triangle.dy =
					-triangle.dy;
			}
		}
	);
}

function animate() {
	ctx.clearRect(
		0,
		0,
		width,
		height
	);
	triangles.forEach(
		drawTriangle
	);
	updateTriangles();
	requestAnimationFrame(
		animate
	);
}

window.addEventListener(
	"resize",
	resizeCanvas
);

resizeCanvas();
for (let i = 0; i < 3; i++) {
	createTriangle();
}
animate();
