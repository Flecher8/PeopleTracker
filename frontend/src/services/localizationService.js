export default function text(text) {
	return JSON.parse(localStorage["Localization"])[text];
}
