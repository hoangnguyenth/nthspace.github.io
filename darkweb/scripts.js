document.getElementById("returnButton").addEventListener("click", function () {
	window.location.href = "../"
});

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

const title = document.getElementById("title")
const subtitle = document.getElementById("subtitle")
const returnButton = document.getElementById("returnButton");

function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function drawLight(x, y) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	const gradient = ctx.createRadialGradient(x, y, 0, x, y, 300);
	gradient.addColorStop(0, 'rgba(216, 188, 132, 0.8)'); // #d8bc84 with 80% opacity
	gradient.addColorStop(0.5, 'rgba(216, 188, 132, 0.2)'); // Fade out
	gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	updateElementVisibility(title, x, y);
	updateElementVisibility(subtitle, x, y);
	updateElementVisibility(returnButton, x, y)
}

function updateElementVisibility(element, lightX, lightY) {
	const rect = element.getBoundingClientRect();
	const elementX = rect.left + rect.width / 2;
	const elementY = rect.top + rect.height / 2;
	
	const distance = Math.sqrt(Math.pow(elementX - lightX, 2) + Math.pow(elementY - lightY, 2));
	const maxDistance = 300; // Same as the light radius
	
	if (distance < maxDistance) {
		const opacity = 1 - (distance / maxDistance);
		element.style.opacity = opacity;
	} else {
		element.style.opacity = 0;
	}
}

window.addEventListener('resize', resizeCanvas);
window.addEventListener('mousemove', (e) => drawLight(e.clientX, e.clientY));

resizeCanvas();
drawLight(canvas.width / 2, canvas.height / 2);