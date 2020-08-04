import App from './App.svelte';
import './firebase';
import 'toastr/build/toastr.js';
import 'toastr/build/toastr.css';

const app = new App({
	target: document.body,
	props: {
	}
});

export default app;