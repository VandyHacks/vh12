import { randFloat, randInt, lerp } from "@/lib/utils";
import { useEffect, useRef } from "react";

const bodyImages: string[] = [
	"background/body/Blue_v2.png",
	"background/body/Brown_v2.png",
	"background/body/Grey_v2.png",
	"background/body/Pink_v2.png",
	"background/body/Red_v2.png",
];

const normalImages: string[] = [
	"background/normal/Blue.png",
	"background/normal/Brown.png",
	"background/normal/Cyan.png",
	"background/normal/Green.png",
	"background/normal/Grey.png",
	"background/normal/Orange.png",
	"background/normal/Pink.png",
	"background/normal/Red.png",
	"background/normal/Yellow.png",
];

const loadImage = (src: string): Promise<HTMLImageElement> => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = reject;
		img.src = src;
	});
}

const isHovering = (sprite: Sprite, mouseX: number, mouseY: number) => {
	const { x, y, rotation, scale, img } = sprite;

	const localX = mouseX - x;
	const localY = mouseY - y;

	const cosR = Math.cos(-rotation);
	const sinR = Math.sin(-rotation);

	const rotatedX = localX * cosR - localY * sinR;
	const rotatedY = localX * sinR + localY * cosR;

	const unscaledX = rotatedX / scale;
	const unscaledY = rotatedY / scale;

	const halfWidth = img.width / 2;
	const halfHeight = img.height / 2;

	return unscaledX >= -halfWidth && unscaledX <= halfWidth && unscaledY >= -halfHeight && unscaledY <= halfHeight;
	
}

type Sprite = {
	img: HTMLImageElement;
	x: number;
	y: number;
	vx: number;
	vy: number;
	scale: number;
	rotation: number;
	vr: number;
	grabbed: boolean;
};

export default function Background() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const rafRef = useRef<number | null>(null);
	const spritesRef = useRef<Sprite[]>([]);
	const imagesRef = useRef<HTMLImageElement[]>([]);
	const lastSpawnRef = useRef<number>(0);
	const deltaRef = useRef<number>(0.016);
	const lastRef = useRef<number>(0);
	const prevImgRef = useRef<number>(12);
	type Coordinate = { x: number, y: number };
	const mousePosRef = useRef<Coordinate>({ x: 0, y: 0});

	useEffect(() => {
		let running = true;
		let cleanup: null | (() => void) = null;
		const isMobile = () => window.matchMedia("(max-width: 767px)").matches;
		(async () => {
			const imgs = await Promise.all([...bodyImages, ...normalImages].map(loadImage));
			imagesRef.current = imgs;
			const cvs = canvasRef.current;
			if (!cvs) return;
			const ctx = cvs.getContext("2d");
			if (!ctx) return;
			const resize = () => {
				const dpr = Math.max(1, window.devicePixelRatio || 1);
				cvs.width = Math.floor(cvs.clientWidth * dpr);
				cvs.height = Math.floor(cvs.clientHeight * dpr);
				ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			};
			resize();
			const onMouseMove = (event: MouseEvent) => {
				mousePosRef.current = { x: event.x, y: event.y };
			}
			const onMouseDown = (event: MouseEvent) => {
				if (!isMobile()) {
					for (const sprite of spritesRef.current) {
						if (isHovering(sprite, mousePosRef.current.x, mousePosRef.current.y)) {
							document.body.style.cursor = "grabbing";
							sprite.grabbed = true;
							break;
						}
					}
				}
			}
			const onMouseUp = (evnet: MouseEvent) => {
				for (const sprite of spritesRef.current) {
					sprite.grabbed = false;
				}
			}
			window.addEventListener("mouseup", onMouseUp);
			window.addEventListener("mousemove", onMouseMove);
			window.addEventListener("mousedown", onMouseDown);
			window.addEventListener("resize", resize);
			const spawn = (initial: boolean) => {
				let imgIndex = randInt(0, imagesRef.current.length - 1);
				while (imgIndex === prevImgRef.current) {
					imgIndex = randInt(0, imagesRef.current.length - 1);
				}
				prevImgRef.current = imgIndex;
				const img: HTMLImageElement = imagesRef.current[imgIndex];
				let maxScale = 0.12;
				let minScale = 0.07;
				if (img.src.includes("background/body")) {
					maxScale = 0.26;
					minScale = 0.12;
				}
				const scale: number = randFloat(minScale, maxScale);
				spritesRef.current.push({
					img,
					x: -img.width * scale,
					y: randInt(100, cvs.clientHeight - 50),
					vx: randInt(30, 60),
					vy: randInt(-10, 10),
					scale,
					rotation: randFloat(0, 2 * Math.PI),
					vr: Math.random() < 0.5 ? randFloat(0.2, 0.7) : randFloat(-0.7, -0.2),
					grabbed: false
				});
			};
			spritesRef.current.push({
				img: imagesRef.current[12],
				x: -imagesRef.current[12].width * 0.1,
				y: cvs.clientHeight / 2 - 50,
				vx: 45,
				vy: 3,
				scale: 0.1,
				rotation: Math.PI,
				vr: 0.4,
				grabbed: false
			})
			const step = (timestamp: number) => {
				spritesRef.current = spritesRef.current.filter((sprite) => sprite.x < cvs.clientWidth + 150);
				if (!running) return;
				if (lastRef.current === 0) {
					lastRef.current = timestamp;      
				}
				deltaRef.current = (timestamp - lastRef.current) / 1000;     
				lastRef.current = timestamp;
				if (lastSpawnRef.current >= 8) {
					spawn(false);
					lastSpawnRef.current = 0;
				}
				lastSpawnRef.current += deltaRef.current;
				ctx.clearRect(0, 0, cvs.clientWidth, cvs.clientHeight);
				for (const sprite of spritesRef.current) {
					ctx.save();
					ctx.translate(sprite.x, sprite.y);
					ctx.rotate(sprite.rotation);
					ctx.drawImage(sprite.img, -sprite.img.width * sprite.scale / 2, -sprite.img.height * sprite.scale / 2, sprite.img.width * sprite.scale, sprite.img.height * sprite.scale);
					ctx.restore();
					if (sprite.grabbed) {
						sprite.vx = lerp(sprite.vx, mousePosRef.current.x - sprite.x, 0.01);
						sprite.vy = lerp(sprite.vy, mousePosRef.current.y - sprite.y, 0.01);
					}
					sprite.x += sprite.vx * deltaRef.current;
					sprite.y += sprite.vy * deltaRef.current;
					sprite.rotation += sprite.vr * deltaRef.current;
					
				}
				let hovering = false;
				if (!isMobile()) {
					for (const sprite of spritesRef.current) {
						if (isHovering(sprite, mousePosRef.current.x, mousePosRef.current.y)) {
							document.body.style.cursor = "grab";
							hovering = true;
						}
					}
				}
				if (!hovering) {
					document.body.style.cursor = "default";
				}
				rafRef.current = requestAnimationFrame(step);
			};
			rafRef.current = requestAnimationFrame(step);
			cleanup = () => {
				running = false;
				if (rafRef.current) cancelAnimationFrame(rafRef.current);
				window.removeEventListener("resize", resize);
				window.removeEventListener("mousemove", onMouseMove);
				window.removeEventListener("mousedown", onMouseDown);
				window.removeEventListener("mouseup", onMouseUp);
			};
		})();
		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
			if (cleanup) cleanup();
		};
	}, []);

	return (
		<canvas ref={canvasRef} className="absolute w-screen h-screen left-0 top-0 pointer-events-none z-2"/>
	);
}
