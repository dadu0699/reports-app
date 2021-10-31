import App from "./App.svelte";

const app = new App({
	target: document.body,
	props: {
		api: "http://127.0.0.1:3000"
	}
});

export default app;