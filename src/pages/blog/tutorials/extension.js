// FOR EDITING THIS FILES
// SET VSCODE OR AIRACLOUD IN MARKDOWN MODE
// BEFORE SAVING, MAKE SURE TO DONT USE
// A ` BAD, BECAUSE IT COULD MAKE MARKDOWN DETECTOR STOP
// USE \` INSTEAD.

export default function content() {
  return `
---
name: How to create an AiraCloud Extension.
lang: es
lastUpdate: 05/05/2024
by: pico190
---

## 0. ¿De que quieres hacer tu extensión?

En AiraCloud, hay 3 tipos de extensiones: **de apariencia**, **de funcionalidades** o **de IAs**.
Y es que cuando decidimos que queríamos añadir extensiones, queriamos que se pudiese hacer practicamente de todo, y de hecho se puede hacer, porque en realidad, la unica limitación es tu creatividad.

En este tutorial te enseñaremos como crear una extension de cada tipo, para que simplemente una vez tengas claro que quieres añadir, lo programes siguiendo este tutorial, y enseguida puedas probarlo en tu AiraCloud.

## 1. De apariencia (temas)

En AiraCloud, hacer temas es bastante sencillo. Tan sencillo como que solo tienes que programar \`css\`.

Hemos escogido hacerlo en css para que el usuario pueda personalizar absolutamente cada elemento que hay en AiraCloud, escogiendo si quiere eliminarlo, si quiere cambiar la fuente (que tambien puedes hacerlo en ajustes), y otras cosas de AiraCloud.

Lo mas importante en los temas son los colores del editor, que son variables de CSS.

Para empezar crea una carpeta con el nombre de tu extension.
dentro de ella, crearás un archivo json llamado \`manifest.json\`.
Dentro, colocarás la siguiente información:

\`\`\`json
{
  "name": "My Theme",
  "type": "theme",
  "version": "1.0.0",
  "description": "Theme Example",
  "styles": ["src/style.css"]
}
\`\`\`

\`"name"\`: El nombre de tu tema
\`"type"\`: Puede ser \`"theme"\`, \`"functionality"\` o \`"AI"\`. Dejalo en \`"theme"\` para hacer un tema
\`"version"\`: La version de la extensión, no se suele usar para hacer temas, pero si quieres ponerlo se puede poner. Es opcional.
\`"description"\`: La descripción de tu tema. Si no pones nada se pone automáticamente "AiraCloud Extension"
\`"styles"\`: Un array de rutas con ficheros CSS, es decir, puedes incluir mas de un archivo css si lo deseas.

Luego, crea una carpeta llamada src, y dentro de ahi crea otro archivo llamado style.css
Dentro de el archivo style.css, tendrás que programar codigo CSS para AiraCloud.
Si lo que te interesa es cambiar _solo_ los colores, aqui tienes una plantilla con todos los colores tanto del editor como de la interfaz de AiraCloud.

\`\`\`css
/* UI Colors */
[data-color-scheme="dark"] *, [data-color-scheme="dark"] {
  /* Colors */
  --primary-blue: #0064c8;
  --darker-primary-blue: #004993;
  --background: #07080a;
  --default-button: rgb(22, 25, 30);
  --default-button-hover: #1d2128;
  --sb-account: #121418;
  --sb-account-hover: #1e2024;
  --text: white;
  --textrgba: 255, 255, 255;
  --border: #ffffff1c;
  --modal-button: #1d2126;
}


/* Editor colors */
[data-color-scheme="dark"] * {
  /* Editor text content background                            */
  --cm-bg: var(--default-button);
  /* Editor cursor color                                       */
  --cm-cursor: #c6c6c6;
  /* Editor background image                                   */
  --cm-bg-img: none;
  /* Editor text                                               */
  --cm-foreground: #e6e6e6;
  /* Selection color                                           */
  --cm-selectionRgb: 36, 48, 71;
  /* Background of selectionMatch                              */
  --cm-selection-match: #ffffff0a;
  /* Border of selectionMatch                                  */
  --cm-selection-match-border: #ffffff2b;
  /* Background of lineNumbers (defaults to editor background) */
  --cm-gutter-bg: var(--cm-bg);
  /* Color of the line number                                  */
  --cm-gutter-fg: rgba(var(--textrgba), 0.5);
  /* Color of the selected line number                         */
  --cm-gutter-active-foreground: var(--cm-foreground);
  /* Background color of the selected line                     */
  --cm-lineHighlight: #ffffff0f;
  /* Background Color of Search panel                          */
  --cm-search: var(--sb-account-hover);
  /* Color of gutter line error text                           */
  --cm-error-gutter: #ff9c9c;
  /* Error line background                                     */
  --cm-errorLineBg: #422327;
  /* Color of gutter line warn text                            */
  --cm-warn-gutter: #fff59c;
  /* Warn line background                                      */
  --cm-warnLineBg: #423b23;
  /* Text content default color                                */
  --cm-content: var(--cm-foreground);
  /* Left padding for gutter                                   */
  --cm-gutter-padding: 10px;

  --indent-marker-bg-color: #ffffff2f;
  --indent-marker-active-bg-color: #ffffff6e;

  /* ---------------- Completion Colors */
  /* Single line comments   */
  --cm-line-comment: #6a9955;
  /* Multiple line comments */
  --cm-multiple-comment: var(--cm-line-comment);

  /* Is not used in many places */
  --cm-name: #4ec9b0;
  /**/
  --cm-label-name: #ce9178;

  /* At Swiftly Team we don\'t know what is this */
  --cm-namespace: var(--cm-foreground);
  /**/
  --cm-macroname: #dcdcaa;

  /* Types names (null, true, boolean, string) */
  --cm-type-definition: #569cd6;
  /**/
  --cm-type-name: #4ec9b0;
  /**/
  --cm-type-standard: #4ec9b0;

  /* Existing html tags (<html>)              */
  --cm-tag-name-standard: #569cd6;
  /* Custom elements or React JSX elements () */
  --cm-tag-name: #4ec9b0;

  /* Variables                                     */
  --cm-variable-name: #9cdcfe;
  /* Functions and other variable types definition */
  --cm-variable-name-definition: #9cdcfe;
  /* Functions in use (print())                    */
  --cm-variable-name-function: #dcdcaa;

  /* Property name                  */
  --cm-property-name: #9cdcfe;
  /* The variable from the property */
  --cm-property-definition: #569cd6;
  /* definition.function()          */
  --cm-property-function: #dcdcaa;

  /* atribute="value" */
  --cm-attribute-name: #9cdcfe;
  /* atribute="value" */
  --cm-attribute-value: var(--cm-string);
  /* <!DOCTYPE html> */
  --cm-document-meta: rgba(var(--textrgba), 0.3);
  /* <html></html> */
  --cm-angle-bracket: #808080;

  /* (In css) .class           */
  --cm-classname: #dcdcaa;
  /* (In css) .class::constant */
  --cm-classname-constant: #c586c0;

  /* Types */
  --cm-string: #ce9178;
  /**/
  --cm-string-special: var(--cm-string);
  /**/
  --cm-literal: var(--cm-string);
  /**/
  --cm-character: var(--cm-string);
  /**/
  --cm-number: #b5cea8;
  /**/
  --cm-integer: var(--cm-number);
  /**/
  --cm-float: var(--cm-number);
  /**/
  --cm-bool: #569cd6;
  /**/
  --cm-regexp: #d16969;
  /* unknown */
  --cm-escape: #569cd6;
  /**/
  --cm-color: var(--cm-string);
  /**/
  --cm-url: #9ce7fe;
  /* public */
  --cm-keyword: #c586c0;
  /* this */
  --cm-self: #569cd6;
  /* null */
  --cm-null: #569cd680;
  /**/
  --cm-atom: #dcdcaa;
  /* em, px */
  --cm-unit: #569cd6;
  /* var, let */
  --cm-modifier: #569cd6;
  /* operators*/
  --cm-operator: var(--cm-foreground);

  /* (In md) # */
  --cm-heading1: var(--cm-md-meta);
  /**/
  --cm-heading2: var(--cm-md-meta);
  /**/
  --cm-heading3: var(--cm-md-meta);
  /**/
  --cm-heading4: var(--cm-md-meta);
  /**/
  --cm-heading5: var(--cm-md-meta);
  /**/
  --cm-heading6: var(--cm-md-meta);

  /* =>, < */
  --cm-punctuation: var(--cm-foreground);
  /* <>, {} */
  --cm-bracket: var(--cm-foreground);
  /* [] */
  --cm-square-bracket: var(--cm-foreground);
  /* () */
  --cm-paren: var(--cm-foreground);

  --cm-brackets-1: #3aa8eb;
  --cm-brackets-2: #e6b86b;
  --cm-brackets-3: #ce6adf;
  --cm-brackets-4: #02b3be;
  --cm-brackets-5: #8ac55f;
  --cm-brackets-6: #aab2c1;
  --cm-brackets-7: #02b3be;

  /* (In md) Separates */
  --cm-md-content-separator: var(--cm-line-comment);
  /* (In md) Lists */
  --cm-md-list: var(--cm-foreground);
  /* (In md) Quote */
  --cm-md-quote: var(--cm-foreground);
  /* (In md) Quote */
  --cm-md-quote-meta: #6a9955;
  /* (In md) Bold */
  --cm-md-bold: #6796e6;
  /* (In md) Italic */
  --cm-md-emphasis: rgba(var(--textrgba), 0.7);
  /* (In md) Link */
  --cm-md-link: var(--cm-url);
  /* (In md) Monospace */
  --cm-md-monospace: var(--cm-string);
  /* (In md) Strike */
  --cm-md-strikethrough: var(--cm-md-link);
  /* (In md) >>, * */
  --cm-md-meta: #569cd6;

  /* typeof */
  --cm-operator-keyword: #569cd6;
  /* for, if */
  --cm-control-keyword: #c586c0;
  /* function */
  --cm-definition-keyword: #569cd6;
  /* import */
  --cm-module-keyword: #c586c0;
}
\`\`\`

### Cosas a tener en cuenta:

en lugar de poner \`[data-color-scheme="dark"]\` deberías poner el nombre de tu extension o de tu tema. Ej: \`[data-color-scheme="mytheme"]\`

## 2. De funcionalidad

Añadir una funcionalidad a AiraCloud es tan facil como saber JavaScript. Ya que
programarás en JavaScript Vanilla (de navegador) y podras usar diferentes eventos

#### Elementos principales:

- \`settings\`: Un array con todos los ajustes del usuario
- \`sidinfo\`: Swiftly ID Info _(tiene acceso al token pero no tiene HTTPS como dije)_
  > ¿Porque puedes obtener el token através de sidinfo, no seria malo?
  > Por algo tan simple como que aparte de poder usar esto podrias hacer document.cookie y decodificarlo con b64 y pum
- \`url\`: el url (/home/patata) pero en array: \`["home", "patata"]\`
  ...

\`Esta documentación estará disponible pronto\`

### Para el editor

\`Esta documentación estará disponible pronto\`
Esto de aqui son algunas ideas para crear extensiones del editor.
**No es código real debido a que aun no se pueden crear extensiones
de funcionalidad en AiraCloud**.

#### Elementos:

- \`editor\`: Un objeto con informacion del editor
  > Podríamos poner que de cosas como el contenido, los cursores,
  > la gente editando, el lenguaje, toda esa información

#### Eventos:

- \`editor.addEventListener("edit", (data) => {})\`: Cuando cambia el contenido del editor. [\`data\` = Contenido del editor]
- \`editor.addEventListener("change", (state) => {})\`: Cuando cambia cualquier cosa del editor. [\`state\` = [ViewUpdate](https://codemirror.net/docs/ref/#view.ViewUpdate)]

#### Crear extensiones de CodeMirror:

Usa \`editor.addExtension(extension)\`. Tienes una documentacion de como hacer
extensiones [aqui](https://potatoes.com/)

Soon a lot more

## 3. De IA

\`Esta seccion no tiene contenido debido a que las extensiones de IA aún no existen\`

## 4. Publicar a AiraCloud MarketPlace

Si bien es cierto que damos muchisima libertad a la hora de hacer
extensiones, hay algunas limitaciones para subirlas a AiraCloud
Marketplace.

#### Limitaciones

<div class="aira-header-content">
  
  1. **No puede tener solicitudes HTTP** o HTTPS.
  Esto, es sobretodo por seguridad. Debido a que haciendo una solicitud
  HTTP, la extension podría realizar cosas inadecuadas, espiar, o ejecutar
  código malicioso. **Solo las extensiones oficiales pueden usar este tipo de solicitudes**
  
  2. No puedes **ejecutar código codificado**
  Esto incluye encriptación, base64, o cualquier sistema de codificacion
  Si se encuentra codigo codificado posiblemente se rechazará, pero
  solo si ese codigo codificado luego se ejecuta, ya que podria ejecutar
  código malicioso.
  
  3. Extensiones **que rompan la interfaz** serán rechazadas
  Asi que no, no puedes publicar un tema con \`* {display: none}\`
</div>

<div class="aira-info">
  Todas las extensiones publicadas son supervisadas por humanos
</div>

Las extensiones se suben mediante (https://swiftly.ix.tc/airacloud/dev/)[https://swiftly.ix.tc/airacloud/dev/]
Ahí tienes una guía de como subirlas.

--end--
`;
}
