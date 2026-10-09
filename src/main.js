import '@fontsource/cinzel/400.css';
import '@fontsource/cinzel/600.css';
import '@fontsource/cinzel/700.css';

import { App } from '@/App';
import { CURSOR_URL, POINTER_URL } from '@/data';
import '@/styles/variables.css';
import '@/styles/globals.css';

document.documentElement.style.setProperty('--cursor-url', `url("${CURSOR_URL}")`);
document.documentElement.style.setProperty('--pointer-url', `url("${POINTER_URL}")`);

const root = document.body;
const app = new App(root);

app.start();
