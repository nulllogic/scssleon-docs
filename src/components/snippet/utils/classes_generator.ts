import * as sass from 'sass';
import path from 'path';
import {$output} from "zod";

const scss_importes = [
  {
    // An importer that redirects relative URLs starting with "~" to
    // `node_modules`.
    findFileUrl(url) {
      if (url.startsWith('~')) {
        // console.log(path.resolve(process.cwd()), url.substring(1));
        // console.log(path.resolve(process.cwd()) + '/src' + url.substring(1));
        return new URL(
          `file://` + path.resolve(process.cwd()) + '/src' + url.substring(1));
      }
      if (url.startsWith('@')) {
        return import.meta.env.PROD ?
          new URL(
            `file://` + path.resolve(process.cwd()) + '/node_modules/@' +
            url.substring(1)) :
          new URL(
            `file://` + path.resolve(process.cwd()) + '/src/styles/scss/' +
            url.substring(1).replace('nulllogic/scssleon/scss/', ''));
      }

      return null;
    },
  }];

export async function component_classes(scss) {
  let compiled_css = '';

  // ⚠️ Note: this is a minified version;;
  const base_style = await sass.compileStringAsync(`
  @use 'sass:list';
  @use 'sass:meta';
  @use 'sass:map';

  @forward '~/styles/scss/mixins';
  @forward '~/styles/scss/functions';
  
  ${scss}
`, {importers: scss_importes});
  compiled_css += base_style.css;
  return compiled_css;
}

export async function snippet_classes() {
  let compiled_css = '';

  // ⚠️ Note: this is a minified version;;
  const base_style = await sass.compileStringAsync(`
  @use 'sass:list';
  @use 'sass:meta';
  @use 'sass:map';

  @forward '~/styles/scss/mixins';
  @forward '~/styles/scss/functions';

  @use '~/styles/app.scss' as app with (
    $overwrite : (
      enable: (
        web_components: true,
      )
    )
  );
  
  // ↓ Root
  @use '~/styles/scss/root' with (
    $config: app.$config,
    $theme: app.$theme
  );

  // Great reset
  @use '~/styles/scss/reset' with (
    $config: app.$config,
    $theme: app.$theme
  );

  // Base
  // Special utility, that will dynamically generate CSS
  // properties for HTML tags, specified in theme
  @use '~/styles/scss/base' with (
    $config: app.$config,
    $theme: app.$theme
  );

  // ↓ Buttons
  @use '~/styles/scss/components/button' with (
    $config: app.$config,
    $theme: app.$theme
  );
  
  // ↓ Navigation bar
  @use '~/styles/scss/components/navbar' with (
    $config: app.$config,
    $theme: app.$theme
  );

  // ↓ Nav
  @use '~/styles/scss/components/nav' with (
    $config: app.$config,
    $theme: app.$theme
  );
`, {importers: scss_importes});

  compiled_css += base_style.css;

  const output = await sass.compileStringAsync(`
  :host(.outline) {
    body { outline: 1px solid #2980b9 !important; }
    article { outline: 1px solid #3498db !important; }
    nav { outline: 1px solid #0088c3 !important; }
    aside { outline: 1px solid #33a0ce !important; }
    section { outline: 1px solid #66b8da !important; }
    header { outline: 1px solid #99cfe7 !important; }
    footer { outline: 1px solid #cce7f3 !important; }
    h1 { outline: 1px solid #162544 !important; }
    h2 { outline: 1px solid #314e6e !important; }
    h3 { outline: 1px solid #3e5e85 !important; }
    h4 { outline: 1px solid #449baf !important; }
    h5 { outline: 1px solid #c7d1cb !important; }
    h6 { outline: 1px solid #4371d0 !important; }
    main { outline: 1px solid #2f4f90 !important; }
    address { outline: 1px solid #1a2c51 !important; }
    div { outline: 1px solid #036cdb !important; }
    p { outline: 1px solid #ac050b !important; }
    hr { outline: 1px solid #ff063f !important; }
    pre { outline: 1px solid #850440 !important; }
    blockquote { outline: 1px solid #f1b8e7 !important; }
    ol { outline: 1px solid #ff050c !important; }
    ul { outline: 1px solid #d90416 !important; }
    li { outline: 1px solid #d90416 !important; }
    dl { outline: 1px solid #fd3427 !important; }
    dt { outline: 1px solid #ff0043 !important; }
    dd { outline: 1px solid #e80174 !important; }
    figure { outline: 1px solid #ff00bb !important; }
    figcaption { outline: 1px solid #bf0032 !important; }
    table { outline: 1px solid #00cc99 !important; }
    caption { outline: 1px solid #37ffc4 !important; }
    thead { outline: 1px solid #98daca !important; }
    tbody { outline: 1px solid #64a7a0 !important; }
    tfoot { outline: 1px solid #22746b !important; }
    tr { outline: 1px solid #86c0b2 !important; }
    th { outline: 1px solid #a1e7d6 !important; }
    td { outline: 1px solid #3f5a54 !important; }
    col { outline: 1px solid #6c9a8f !important; }
    colgroup { outline: 1px solid #6c9a9d !important; }
    button { outline: 1px solid #da8301 !important; }
    datalist { outline: 1px solid #c06000 !important; }
    fieldset { outline: 1px solid #d95100 !important; }
    form { outline: 1px solid #d23600 !important; }
    input { outline: 1px solid #fca600 !important; }
    keygen { outline: 1px solid #b31e00 !important; }
    label { outline: 1px solid #ee8900 !important; }
    legend { outline: 1px solid #de6d00 !important; }
    meter { outline: 1px solid #e8630c !important; }
    optgroup { outline: 1px solid #b33600 !important; }
    option { outline: 1px solid #ff8a00 !important; }
    output { outline: 1px solid #ff9619 !important; }
    progress { outline: 1px solid #e57c00 !important; }
    select { outline: 1px solid #e26e0f !important; }
    textarea { outline: 1px solid #cc5400 !important; }
    details { outline: 1px solid #33848f !important; }
    summary { outline: 1px solid #60a1a6 !important; }
    command { outline: 1px solid #438da1 !important; }
    menu { outline: 1px solid #449da6 !important; }
    del { outline: 1px solid #bf0000 !important; }
    ins { outline: 1px solid #400000 !important; }
    img { outline: 1px solid #22746b !important; }
    iframe { outline: 1px solid #64a7a0 !important; }
    embed { outline: 1px solid #98daca !important; }
    object { outline: 1px solid #00cc99 !important; }
    param { outline: 1px solid #37ffc4 !important; }
    video { outline: 1px solid #6ee866 !important; }
    audio { outline: 1px solid #027353 !important; }
    source { outline: 1px solid #012426 !important; }
    canvas { outline: 1px solid #a2f570 !important; }
    track { outline: 1px solid #59a600 !important; }
    map { outline: 1px solid #7be500 !important; }
    area { outline: 1px solid #305900 !important; }
    a { outline: 1px solid #ff62ab !important; }
    em { outline: 1px solid #800b41 !important; }
    strong { outline: 1px solid #ff1583 !important; }
    i { outline: 1px solid #803156 !important; }
    b { outline: 1px solid #cc1169 !important; }
    u { outline: 1px solid #ff0430 !important; }
    s { outline: 1px solid #f805e3 !important; }
    small { outline: 1px solid #d107b2 !important; }
    abbr { outline: 1px solid #4a0263 !important; }
    q { outline: 1px solid #240018 !important; }
    cite { outline: 1px solid #64003c !important; }
    dfn { outline: 1px solid #b4005a !important; }
    sub { outline: 1px solid #dba0c8 !important; }
    sup { outline: 1px solid #cc0256 !important; }
    time { outline: 1px solid #d6606d !important; }
    code { outline: 1px solid #e04251 !important; }
    kbd { outline: 1px solid #5e001f !important; }
    samp { outline: 1px solid #9c0033 !important; }
    var { outline: 1px solid #d90047 !important; }
    mark { outline: 1px solid #ff0053 !important; }
    bdi { outline: 1px solid #bf3668 !important; }
    bdo { outline: 1px solid #6f1400 !important; }
    ruby { outline: 1px solid #ff7b93 !important; }
    rt { outline: 1px solid #ff2f54 !important; }
    rp { outline: 1px solid #803e49 !important; }
    span { outline: 1px solid #cc2643 !important; }
    br { outline: 1px solid #db687d !important; }
    wbr { outline: 1px solid #db175b !important; }
  }
`);

  compiled_css += output.css;

  const snippet = await sass.compileStringAsync(`
  @use 'sass:list';
  @use 'sass:string';
  @use 'sass:meta';
  @use 'sass:map';

  @use '~/styles/app.scss' as app;

  $code: (
    padding: 0,
    line-height: 1.72,
    border-radius: .425rem,
    _subclasses : (
      'code' : (
        background: none,
        display: block,
        counter-reset: step,
        counter-increment: step 0,
        _subclasses: (
          '& .line' : (
            display: inline-block,
            width: 100%,
            padding: 0 .825rem,
            _subclasses: (
              '&:first-child' : (
                padding-top: 8px
              ),
              '&:last-child' : (
                padding-bottom: 8px
              ),
            )
          ),
          '& .line.highlighted' : (
            background-color: rgb(21, 27, 35),
            //width: calc(100% + 48px),
            //margin: 0px -24px,
            //padding: 0px 24px,
            transition: background-color 0.5s,
          ),
          '& .diff' : (
            background: rgba(248, 81, 73, 0.1),
          ),
          '&[show-line-numbers] pre.shiki .line.diff:before' : (
            display: inline-block,
            text-align: right,
            color: #cb7676,
            content: "-",
          ),
          '& .add' : (
            background: rgba(46, 160, 67, 0.15),
            width: 100%,
          ),
          '&[show-line-numbers] pre.shiki .line.add:before' : (
            display: inline-block,
            text-align: right,
            content: "+",
            color: #3dd68c,
          ),
          '&[show-line-numbers] pre.shiki .line:before' : (
            content: counter(step),
            counter-increment: step,
            width: 2ch,
            margin-right: 1rem,
            margin-left: .525rem,
            display: inline-block,
            text-align: right,
            color: rgba(115, 138, 148, .4),
          )
        )
      )
    )
  );
  
  $snippet-top : (
    background: #0d1117,
    border-radius: 0 .425rem .425rem 0,
  );
  
  $snippet-bottom : (
    background: #0d1117,
    border-radius: .425rem 0 0 .425rem,
  );

  $snippet: (
    /*background: var(--background),*/
    box-shadow: var(--shadow),
    z-index: 1,
    text-align: left,
    padding: 0,
    display: block,
    margin: 0,
    border: 1px solid #3d444d,
    border-radius: .425rem,
    _subclasses : (
      '.shiki' : $code,
      '.code' : (
        position: relative,
        _subclasses : (
          '.top' : $snippet-top,
          '.bottom' : $snippet-bottom,
          '.clipboard' : (
            --padding: 0.25rem 0.5rem,
            right: 8px,
            top: 8px,
            position: absolute,
          ),
          '&.single' : (
            _subclasses : (
              '.line' : (
                padding: 0 2.5rem 0 0.825rem,
              ),
              '.clipboard' : (
                --padding: 0.25rem,
                top: 50%,
                transform: translateY(-50%),
                _subclasses : (
                  '.text' : (
                    display: none
                  )
                )
              ),
            )
          ),
        )
      )
    ),
  );

  @include app.generate-component($snippet, ':host(.snippet)', app.$config, app.$theme);
  `, {importers: scss_importes});

  compiled_css += snippet.css;
  return compiled_css;
}