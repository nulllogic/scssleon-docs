// src/components/MyReactComponent.jsx

import styles from './button.module.scss';
import clsx from 'clsx';

export default function Button({ single = false }) {
  return (
    <div class={clsx({'small' : single}, 'btn clipboard', styles.button)}>
      <svg class={'icon'} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
        <path stroke="rgb(74, 109, 71)" fill="none" fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"></path>
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
      </svg>
      <span class="text">Copy</span>
    </div>
  );
}

// export default function InitButton(html, css) {
//
//   const button_template = `<a class="clipboard has-tooltip btn btn-link"
//     href="#" type="button" style="font-size: 0.925rem;gap: 5px;">
//         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
//             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//             <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
//             <path stroke="rgb(74, 109, 71)" fill="none" fill-rule="evenodd"
//                 d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                 clip-rule="evenodd"></path>
//             <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
//         </svg>
//         <span class="text">Copy</span>
//   </a>`;
//
//   class Button extends HTMLElement {
//     constructor() {
//
//       super();
//       const shadow = this.attachShadow({mode: 'open'});
//
//       // // Find inside elements scoped to this specific component instance
//       // const button = this.querySelector('button');
//       // const countSpan = this.querySelector('span');
//       //
//       // // Get the initial count state passed from the Astro server
//       // let count = parseInt(this.dataset.count || '0', 10);
//       //
//       // button?.addEventListener('click', () => {
//       //   count++;
//       //   if (countSpan) countSpan.textContent = count.toString();
//       //   this.dataset.count = count.toString(); // Sync state back to DOM attribute
//       // });
//
//     }
//
//     // Initialize the component
//     init() {
//       this.render();
//     }
//
//     render() {
//       // Create a temporary template element instance
//       const tmpl = document.createElement('template');
//       tmpl.innerHTML = button_template;
//       console.log(button_template);
//
//       this.shadowRoot.appendChild(tmpl.content.cloneNode(true));
//     }
//
//     connectedCallback() {
//       if (document.readyState !== 'loading') {
//         this.init();
//         return;
//       }
//     }
//   }
//
// // Register the custom element with the browser
//   customElements.define('xii-button', Button);
// }