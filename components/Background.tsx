import { randFloat, randInt } from "@/lib/utils";
import { del } from "motion/react-client";
import { useEffect, useRef } from "react";

const bodyImages: string[] = [
	"background/body/Blue.png",
	"background/body/Brown.png",
	"background/body/Grey.png",
	"background/body/Pink.png",
	"background/body/Red.png",
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

type Sprite = {
	img: HTMLImageElement;
	x: number;
	y: number;
	vx: number;
	vy: number;
	scale: number;
	rotation: number;
	vr: number;
};

export default function Background() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const rafRef = useRef<number | null>(null);
	const spritesRef = useRef<Sprite[]>([]);
	const imagesRef = useRef<HTMLImageElement[]>([]);
	const lastSpawnRef = useRef<number>(0);
	const deltaRef = useRef<number>(0.016);
	const lastRef = useRef<number>(0);

	useEffect(() => {
		let running = true;
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
			window.addEventListener("resize", resize);
			const spawn = () => {
				const img: HTMLImageElement = imagesRef.current[randInt(0, imagesRef.current.length - 1)];
				const scale: number = randFloat(0.1, 0.23);
				spritesRef.current.push({
					img,
					x: -img.width * scale - randFloat(20, 200.0),
					y: randInt(10, cvs.height),
					vx: randInt(30, 80),
					vy: randInt(-10, 10),
					scale,
					rotation: randFloat(0, 2 * Math.PI),
					vr: randFloat(-0.7, 0.7)
				});
			};
			for (let i = 0; i < Math.floor(cvs.height / 300); i++) {
				spawn();
			}
			spritesRef.current.filter((sprite) => sprite.x < cvs.clientWidth + 150);
			const step = (timestamp: number) => {
				if (!running) return;
				if (lastRef.current === 0) {
					lastRef.current = timestamp;      
				}
				deltaRef.current = (timestamp - lastRef.current) / 1000;     
				lastRef.current = timestamp;
				if (lastSpawnRef.current >= 3) {
					spawn();
					lastSpawnRef.current = 0;
				}
				lastSpawnRef.current += deltaRef.current;
				ctx.clearRect(0, 0, cvs.clientWidth, cvs.clientHeight);
				for (const sprite of spritesRef.current) {
					ctx.save();
					ctx.translate(sprite.x + sprite.img.naturalWidth * sprite.scale / 2, sprite.y - sprite.img.naturalHeight / 2);
					ctx.rotate(sprite.rotation);
					ctx.scale(sprite.scale, sprite.scale);
					ctx.drawImage(sprite.img, -sprite.img.naturalWidth / 2, -sprite.img.naturalHeight / 2);
					ctx.restore();
					sprite.x += sprite.vx * deltaRef.current;
					sprite.y += sprite.vy * deltaRef.current;
					sprite.rotation += sprite.vr * deltaRef.current;
				}
				rafRef.current = requestAnimationFrame(step);
			};
			rafRef.current = requestAnimationFrame(step);
			return () => {
				running = false;
				if (rafRef.current) cancelAnimationFrame(rafRef.current);
				window.removeEventListener("resize", resize);
			};
		})();
		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
	}, []);

	return (
		<canvas ref={canvasRef} className="fixed inset-0 w-[100dvw] h-[100dvh] pointer-events-none z-0"/>
	);
}
