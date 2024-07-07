// Create a new dateTimeFormat object
const dateTimeFormat = new Intl.DateTimeFormat([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
});

export const iframe = () => {
    const hooks = [
        `astro:config:setup`,
        `astro:config:done`,
        `astro:server:setup`,
        `astro:server:start`,
        `astro:server:done`,
        `astro:build:start`,
        `astro:build:setup`,
        `astro:build:generated`,
        `astro:build:ssr`,
        `astro:build:done`,
    ];

    // base integration structure. "hooks" will be updated
    let integration = {
        name: "astro-lifecycle-logs",
        hooks: {},
    };

    // loop over the hooks list and add the name and log
    for (const hook of hooks) {
        if (hook === 'astro:config:setup') {
            integration.hooks[hook] = ({updateConfig}) => {
                updateConfig({
                    vite: {}
                })
            }
        }

//         if (hook === 'astro:server:setup') {
//             integration.hooks[hook] = ({server}) => {
//                 server.middlewares.use(
//                     function middleware(req, res, next) {
//
//                         if (!req.url.match(/^\/iframe($|\?)/)) {
//                             next();
//                             return;
//                         }
//
//                         let html = `
// <!doctype html>
// <!--suppress HtmlUnknownTarget -->
// <html lang="en">
// <head>
//     <meta charset="utf-8"/>
//     <title>Storybook</title>
//     <meta name="viewport" content="width=device-width, initial-scale=1"/>
//     <script>
//         window.CONFIG_TYPE = '[CONFIG_TYPE HERE]';
//         window.LOGLEVEL = '[LOGLEVEL HERE]';
//         window.FRAMEWORK_OPTIONS = '[FRAMEWORK_OPTIONS HERE]';
//         window.CHANNEL_OPTIONS = '[CHANNEL_OPTIONS HERE]';
//         window.FEATURES = '[FEATURES HERE]';
//         window.STORIES = '[STORIES HERE]';
//         window.DOCS_OPTIONS = '[DOCS_OPTIONS HERE]';
//         window.TAGS_OPTIONS = '[TAGS_OPTIONS HERE]';
//
//         ('OTHER_GLOBLALS HERE');
//
//         // We do this so that "module && module.hot" etc. in Storybook source code
//         // doesn't fail (it will simply be disabled)
//         window.module = undefined;
//         window.global = window;
//     </script>
//     <!-- [HEAD HTML SNIPPET HERE] -->
// </head>
//
// <body>
// <!-- [BODY HTML SNIPPET HERE] -->
// <div id="storybook-root"></div>
// <div id="storybook-docs"></div>
// <script type="module" src="./sb-preview/runtime.js"></script>
// <script type="module" src="/virtual:/@storybook/builder-vite/vite-app.js"></script>
// </body>
// </html>
//                         `
//
//                         res.setHeader('Content-Type', 'text/html');
//                         res.end(html);
//                     }
//                 );
//             }
//         } else {
//             integration.hooks[hook] = () => {
//                 // 👀 Get a new date string
//                 const date = dateTimeFormat.format(new Date());
//
//                 // log with kleur colours and formatting
//                 console.log(`${date} ${"[lifecycle-log]"} ${hook}
//         `);
//             };
//         }
    }

    return integration;
};

export default iframe;