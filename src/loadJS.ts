export default function loadJS(src: string): Promise<void> {
	return new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.src = src;
		script.addEventListener('load', () => {
			document.body.removeChild(script);
			resolve();
		});
		script.addEventListener('error', (e: any) => {
			document.body.removeChild(script);
			reject(e);
		});
		document.body.appendChild(script);
	});
}