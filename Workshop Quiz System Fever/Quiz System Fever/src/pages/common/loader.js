import { html } from '../../library.js';

export const overlay = () => html`
<div class="loading-overlay working"></div>`;

export function createOverlay() {
    const element = document.createElement('div');
    element.className = 'loading-overlay working';

    return element;
}

export const cube = () => html`
<div class="pad-large alt-page async">
    <div class="sk-cube-grid">
        <div class="sk-cube sk-cube1"></div>
        <div class="sk-cube sk-cube2"></div>
        <div class="sk-cube sk-cube3"></div>
        <div class="sk-cube sk-cube4"></div>
        <div class="sk-cube sk-cube5"></div>
        <div class="sk-cube sk-cube6"></div>
        <div class="sk-cube sk-cube7"></div>
        <div class="sk-cube sk-cube8"></div>
        <div class="sk-cube sk-cube9"></div>
    </div>
</div>`;

export const line = () => html`
<div class="spinner black">
    <div class="rect1"></div>
    <div class="rect2"></div>
    <div class="rect3"></div>
    <div class="rect4"></div>
    <div class="rect5"></div>
</div>`;