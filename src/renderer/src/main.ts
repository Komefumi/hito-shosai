import './assets/style.css';
import App from './App.svelte';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bulma/css/bulma.min.css';

const app = new App({
  target: document.getElementById('app'),
});

export default app;
