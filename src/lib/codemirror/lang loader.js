/**
 * ? langLoader
 * It loads a lang.
 */

// region CodeMirror imports 
import { autocompletion, snippetCompletion as snip } from "@codemirror/autocomplete"
import { EditorView } from "@codemirror/view";
import { decode } from "js-base64";
import { addCss, removeCss } from "../cssManager";
import changeSettings from "../settings";
import { syntaxTree, LRLanguage, StreamLanguage } from "@codemirror/language";
import { console_custom } from "../debug/console";
import { cmlangs } from "./default langs";
import { getPositionType, getPositionElem, getElementType } from "./load details";
import { completeCSS } from "./intelli/css";

window.aira.editor.getPositionType = getPositionType;
window.aira.editor.getPositionElem = getPositionElem;
window.aira.editor.getElementType = getElementType;

// region Official langs
// ? 21 langs here
import { angular, angularLanguage } from "@codemirror/lang-angular";
import { css, cssLanguage } from "@codemirror/lang-css";
import { cpp, cppLanguage } from "@codemirror/lang-cpp";
import { go, goLanguage } from "@codemirror/lang-go";
import { html, htmlLanguage } from "@codemirror/lang-html";
import { java, javaLanguage } from "@codemirror/lang-java";
import {
    javascript,
    jsxLanguage,
    tsxLanguage,
    javascriptLanguage,
    typescriptLanguage,
    snippets,
    autoCloseTags,
} from "@codemirror/lang-javascript";
import { json, jsonLanguage } from "@codemirror/lang-json";
import { liquid, liquidLanguage } from "@codemirror/lang-liquid";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { php, phpLanguage } from "@codemirror/lang-php";
import { python, pythonLanguage } from "@codemirror/lang-python";
import { rust, rustLanguage } from "@codemirror/lang-rust";
import { sass, sassLanguage } from "@codemirror/lang-sass";
import { vue, vueLanguage } from "@codemirror/lang-vue";
import { xml, xmlLanguage } from "@codemirror/lang-xml";
import { yaml, yamlLanguage } from "@codemirror/lang-yaml";
import { wast, wastLanguage } from "@codemirror/lang-wast";
import { lezer, lezerLanguage } from "@codemirror/lang-lezer";
import {
    sql,
    StandardSQL,
    SQLite,
    MySQL,
    PostgreSQL
 } from "@codemirror/lang-sql";

// region Unnoficial langs
// ? 12 langs here
import { elixir } from "codemirror-lang-elixir";
import { golfScript, golfScriptLanguage } from "codemirror-lang-golfscript";
import { handlebarsLanguage } from "@xiechao/codemirror-lang-handlebars";
import { hcl } from "codemirror-lang-hcl";
import { j, jLanguage } from "codemirror-lang-j";
import { janet, JanetLanguage } from "codemirror-lang-janet";
import { julia } from "@plutojl/lang-julia";
import { nix, nixLanguage } from "@replit/codemirror-lang-nix";
import { r, rLanguage } from "codemirror-lang-r";
import { sparql, SparqlLanguage } from "codemirror-lang-sparql";
import { svelte, svelteLanguage } from "@replit/codemirror-lang-svelte";
import { brainfuck, brainfuckLanguage } from "codemirror-lang-brainfuck";

// region Legacy langs
// ? 92 langs here
import { lua } from "@codemirror/legacy-modes/mode/lua";
import { clojure } from "@codemirror/legacy-modes/mode/clojure";
import { http } from "@codemirror/legacy-modes/mode/http";
import { asciiArmor } from "@codemirror/legacy-modes/mode/asciiarmor";
import { asn1 } from "@codemirror/legacy-modes/mode/asn1";
import { asterisk } from "@codemirror/legacy-modes/mode/asterisk";
import { c, csharp, kotlin, scala, objectiveC, dart } from "@codemirror/legacy-modes/mode/clike";
import { fSharp } from "@codemirror/legacy-modes/mode/mllike";
import { cmake } from "@codemirror/legacy-modes/mode/cmake";
import { cobol } from "@codemirror/legacy-modes/mode/cobol";
import { coffeeScript } from "@codemirror/legacy-modes/mode/coffeescript";
import { commonLisp } from "@codemirror/legacy-modes/mode/commonlisp";
import { crystal } from "@codemirror/legacy-modes/mode/crystal";
import { cypher } from "@codemirror/legacy-modes/mode/cypher";
import { d } from "@codemirror/legacy-modes/mode/d";
import { dockerFile } from "@codemirror/legacy-modes/mode/dockerfile";
import { dtd } from "@codemirror/legacy-modes/mode/dtd";
import { dylan } from "@codemirror/legacy-modes/mode/dylan";
import { ebnf } from "@codemirror/legacy-modes/mode/ebnf";
import { ecl } from "@codemirror/legacy-modes/mode/ecl";
import { eiffel } from "@codemirror/legacy-modes/mode/eiffel";
import { elm } from "@codemirror/legacy-modes/mode/elm";
import { erlang } from "@codemirror/legacy-modes/mode/erlang";
import { factor } from "@codemirror/legacy-modes/mode/factor";
import { fcl } from "@codemirror/legacy-modes/mode/fcl";
import { forth } from "@codemirror/legacy-modes/mode/forth";
import { fortran } from "@codemirror/legacy-modes/mode/fortran";
import { gas } from "@codemirror/legacy-modes/mode/gas";
import { gherkin } from "@codemirror/legacy-modes/mode/gherkin";
import { groovy } from "@codemirror/legacy-modes/mode/groovy";
import { haskell } from "@codemirror/legacy-modes/mode/haskell";
import { haxe } from "@codemirror/legacy-modes/mode/haxe";
import { idl } from "@codemirror/legacy-modes/mode/idl";
import { jinja2 } from "@codemirror/legacy-modes/mode/jinja2";
import { liveScript } from "@codemirror/legacy-modes/mode/livescript";
import { mathematica } from "@codemirror/legacy-modes/mode/mathematica";
import { mbox } from "@codemirror/legacy-modes/mode/mbox";
import { mirc } from "@codemirror/legacy-modes/mode/mirc";
import { modelica } from "@codemirror/legacy-modes/mode/modelica";
import { mscgen } from "@codemirror/legacy-modes/mode/mscgen";
import { mumps } from "@codemirror/legacy-modes/mode/mumps";
import { nginx } from "@codemirror/legacy-modes/mode/nginx";
import { nsis } from "@codemirror/legacy-modes/mode/nsis";
import { ntriples } from "@codemirror/legacy-modes/mode/ntriples";
import { octave } from "@codemirror/legacy-modes/mode/octave";
import { oz } from "@codemirror/legacy-modes/mode/oz";
import { pascal } from "@codemirror/legacy-modes/mode/pascal";
import { pegjs } from "@codemirror/legacy-modes/mode/pegjs";
import { perl } from "@codemirror/legacy-modes/mode/perl";
import { pig } from "@codemirror/legacy-modes/mode/pig";
import { powerShell } from "@codemirror/legacy-modes/mode/powershell";
import { properties } from "@codemirror/legacy-modes/mode/properties";
import { protobuf } from "@codemirror/legacy-modes/mode/protobuf";
import { pug } from "@codemirror/legacy-modes/mode/pug";
import { puppet } from "@codemirror/legacy-modes/mode/puppet";
import { q } from "@codemirror/legacy-modes/mode/q";
import { ruby } from "@codemirror/legacy-modes/mode/ruby";
import { sas } from "@codemirror/legacy-modes/mode/sas";
import { scheme } from "@codemirror/legacy-modes/mode/scheme";
import { shell } from "@codemirror/legacy-modes/mode/shell";
import { sieve } from "@codemirror/legacy-modes/mode/sieve";
import { smalltalk } from "@codemirror/legacy-modes/mode/smalltalk";
import { solr } from "@codemirror/legacy-modes/mode/solr";
import { spreadsheet } from "@codemirror/legacy-modes/mode/spreadsheet";
import { stex } from "@codemirror/legacy-modes/mode/stex";
import { stylus } from "@codemirror/legacy-modes/mode/stylus";
import { swift } from "@codemirror/legacy-modes/mode/swift";
import { tcl } from "@codemirror/legacy-modes/mode/tcl";
import { textile } from "@codemirror/legacy-modes/mode/textile";
import { tiddlyWiki } from "@codemirror/legacy-modes/mode/tiddlywiki";
import { tiki } from "@codemirror/legacy-modes/mode/tiki";
import { toml } from "@codemirror/legacy-modes/mode/toml";
import { troff } from "@codemirror/legacy-modes/mode/troff";
import { ttcnCfg } from "@codemirror/legacy-modes/mode/ttcn-cfg";
import { ttcn } from "@codemirror/legacy-modes/mode/ttcn";
import { turtle } from "@codemirror/legacy-modes/mode/turtle";
import { vb } from "@codemirror/legacy-modes/mode/vb";
import { vbScript } from "@codemirror/legacy-modes/mode/vbscript";
import { velocity } from "@codemirror/legacy-modes/mode/velocity";
import { verilog } from "@codemirror/legacy-modes/mode/verilog";
import { vhdl } from "@codemirror/legacy-modes/mode/vhdl";
import { webIDL } from "@codemirror/legacy-modes/mode/webidl";
import { xQuery } from "@codemirror/legacy-modes/mode/xquery";
import { yacas } from "@codemirror/legacy-modes/mode/yacas";
import { z80 } from "@codemirror/legacy-modes/mode/z80";
import { jsonld } from "@codemirror/legacy-modes/mode/javascript";

// * 119 total default langs
// ? VSCODE: 30 default langs

// Lang registrer
var defaultLangs = {
    angular: () => ({
        lezerLang: angularLanguage,
        langSupport: angular(),
    }),
    css: () => ({
        lezerLang: cssLanguage,
        langSupport: css(),
        syntaxes: ["css"],
    }),
    cpp: () => ({
        lezerLang: cppLanguage,
        langSupport: cpp(),
    }),
    go: () => ({
        lezerLang: goLanguage,
        langSupport: go(),
    }),
    html: () => ({
        lezerLang: htmlLanguage,
        langSupport: html({ matchClosingTags: false }),
        syntaxes: ["html"],
    }),
    java: () => ({
        lezerLang: javaLanguage,
        langSupport: java(),
    }),
    javascript: () => ({
        lezerLang: javascriptLanguage,
        langSupport: javascript(),
    }),
    json: () => ({
        lezerLang: jsonLanguage,
        langSupport: json(),
    }),
    liquid: () => ({
        lezerLang: liquidLanguage,
        langSupport: liquid(),
    }),
    markdown: () => ({
        lezerLang: markdownLanguage,
        langSupport: markdown(),
        syntaxes: ["html"],
        extensions: [autoCloseTags],
    }),
    php: () => ({
        lezerLang: phpLanguage,
        langSupport: php({ jsx: true }),
    }),
    python: () => ({
        lezerLang: pythonLanguage,
        langSupport: python(),
    }),
    typescript: () => ({
        lezerLang: typescriptLanguage,
        langSupport: javascript({ typescript: true }),
    }),
    javascriptreact: () => ({
        lezerLang: jsxLanguage,
        langSupport: javascript({ jsx: true }),
        html2: true,
        extensions: [autoCloseTags],
    }),
    typescriptreact: () => ({
        lezerLang: tsxLanguage,
        langSupport: javascript({ jsx: true, typescript: true }),
        html2: true,
        extensions: [autoCloseTags],
    }),
    rust: () => ({
        lezerLang: rustLanguage,
        langSupport: rust(),
    }),
    sass: () => ({
        lezerLang: sassLanguage,
        langSupport: sass(),
    }),
    vue: () => ({
        lezerLang: vueLanguage,
        langSupport: vue(),
    }),
    xml: () => ({
        lezerLang: xmlLanguage,
        langSupport: xml(),
    }),
    yaml: () => ({
        lezerLang: yamlLanguage,
        langSupport: yaml(),
    }),
    elixir: () => ({
        langSupport: elixir(),
    }),
    webAssembly: () => ({
        lezerLang: wastLanguage,
        langSupport: wast()
    }),
    lezer: () => ({
        lezerLang: lezerLanguage,
        langSupport: lezer()
    }),
    golfScript: () => ({
        lezerLang: golfScriptLanguage,
        langSupport: golfScript(),
    }),
    handlebars: () => ({
        langSupport: handlebarsLanguage,
    }),
    hcl: () => ({
        langSupport: hcl(),
    }),
    j: () => ({
        lezerLang: jLanguage,
        langSupport: j(),
    }),
    janet: () => ({
        lezerLang: JanetLanguage,
        langSupport: janet(),
    }),
    julia: () => ({
        langSupport: julia(),
    }),
    nix: () => ({
        langSupport: nix(),
    }),
    r: () => ({
        lezerLang: rLanguage,
        langSupport: r(),
    }),
    sparql: () => ({
        langSupport: sparql(),
    }),
    svelte: () => ({
        langSupport: svelte(),
    }),
    brainfuck: () => ({
        langSupport: brainfuck(),
        lezerLang: brainfuckLanguage,
    }),
    sql: () => ({
        langSupport: sql({dialect: StandardSQL}),
        lezerLang: StandardSQL.language,
    }),
    sqlite: () => ({
        langSupport: sql({dialect: SQLite}),
        lezerLang: SQLite.language,
    }),
    mysql: () => ({
        langSupport: sql({dialect: MySQL}),
        lezerLang: MySQL.language,
    }),
    postgresql: () => ({
        langSupport: sql({dialect: PostgreSQL}),
        lezerLang: PostgreSQL.language,
    }),
    default: () => ({
        langSupport: null,
        lezerLang: null,
    }),
    lua: () => ({
        langSupport: StreamLanguage.define(lua),
    }),
    clojure: () => ({
        langSupport: StreamLanguage.define(clojure),
    }),
    http: () => ({
        langSupport: StreamLanguage.define(http),
    }),
    asciiArmor: () => ({
        langSupport: StreamLanguage.define(asciiArmor),
    }),
    asn1: () => ({
        langSupport: StreamLanguage.define(asn1),
    }),
    asterisk: () => ({
        langSupport: StreamLanguage.define(asterisk),
    }),
    c: () => ({
        langSupport: StreamLanguage.define(c),
    }),
    csharp: () => ({
        langSupport: StreamLanguage.define(csharp),
    }),
    kotlin: () => ({
        langSupport: StreamLanguage.define(kotlin),
    }),
    cmake: () => ({
        langSupport: StreamLanguage.define(cmake),
    }),
    cobol: () => ({
        langSupport: StreamLanguage.define(cobol),
    }),
    coffeeScript: () => ({
        langSupport: StreamLanguage.define(coffeeScript),
    }),
    commonLisp: () => ({
        langSupport: StreamLanguage.define(commonLisp),
    }),
    crystal: () => ({
        langSupport: StreamLanguage.define(crystal),
    }),
    d: () => ({
        langSupport: StreamLanguage.define(d),
    }),
    fSharp: () => ({
        langSupport: StreamLanguage.define(fSharp),
    }),
    scala: () => ({
        langSupport: StreamLanguage.define(scala),
    }),
    objectiveC: () => ({
        langSupport: StreamLanguage.define(objectiveC),
    }),
    dart: () => ({
        langSupport: StreamLanguage.define(dart),
    }),
    diff: () => ({
        langSupport: StreamLanguage.define(diff),
    }),
    dockerFile: () => ({
        langSupport: StreamLanguage.define(dockerFile),
    }),
    dtd: () => ({
        langSupport: StreamLanguage.define(dtd),
    }),
    dylan: () => ({
        langSupport: StreamLanguage.define(dylan),
    }),
    ebnf: () => ({
        langSupport: StreamLanguage.define(ebnf),
    }),
    ecl: () => ({
        langSupport: StreamLanguage.define(ecl),
    }),
    edn: () => ({
        langSupport: StreamLanguage.define(edn),
    }),
    eiffel: () => ({
        langSupport: StreamLanguage.define(eiffel),
    }),
    elm: () => ({
        langSupport: StreamLanguage.define(elm),
    }),
    erlang: () => ({
        langSupport: StreamLanguage.define(erlang),
    }),
    factor: () => ({
        langSupport: StreamLanguage.define(factor),
    }),
    fcl: () => ({
        langSupport: StreamLanguage.define(fcl),
    }),
    forth: () => ({
        langSupport: StreamLanguage.define(forth),
    }),
    fortran: () => ({
        langSupport: StreamLanguage.define(fortran),
    }),
    gas: () => ({
        langSupport: StreamLanguage.define(gas),
    }),
    gherkin: () => ({
        langSupport: StreamLanguage.define(gherkin),
    }),
    groovy: () => ({
        langSupport: StreamLanguage.define(groovy),
    }),
    haskell: () => ({
        langSupport: StreamLanguage.define(haskell),
    }),
    haxe: () => ({
        langSupport: StreamLanguage.define(haxe),
    }),
    idl: () => ({
        langSupport: StreamLanguage.define(idl),
    }),
    jinja2: () => ({
        langSupport: StreamLanguage.define(jinja2),
    }),
    liveScript: () => ({
        langSupport: StreamLanguage.define(liveScript),
    }),
    mathematica: () => ({
        langSupport: StreamLanguage.define(mathematica),
    }),
    mbox: () => ({
        langSupport: StreamLanguage.define(mbox),
    }),
    mirc: () => ({
        langSupport: StreamLanguage.define(mirc),
    }),
    modelica: () => ({
        langSupport: StreamLanguage.define(modelica),
    }),
    mscgen: () => ({
        langSupport: StreamLanguage.define(mscgen),
    }),
    mumps: () => ({
        langSupport: StreamLanguage.define(mumps),
    }),
    nginx: () => ({
        langSupport: StreamLanguage.define(nginx),
    }),
    nsis: () => ({
        langSupport: StreamLanguage.define(nsis),
    }),
    ntriples: () => ({
        langSupport: StreamLanguage.define(ntriples),
    }),
    octave: () => ({
        langSupport: StreamLanguage.define(octave),
    }),
    oz: () => ({
        langSupport: StreamLanguage.define(oz),
    }),
    pascal: () => ({
        langSupport: StreamLanguage.define(pascal),
    }),
    pegjs: () => ({
        langSupport: StreamLanguage.define(pegjs),
    }),
    perl: () => ({
        langSupport: StreamLanguage.define(perl),
    }),
    pig: () => ({
        langSupport: StreamLanguage.define(pig),
    }),
    powerShell: () => ({
        langSupport: StreamLanguage.define(powerShell),
    }),
    properties: () => ({
        langSupport: StreamLanguage.define(properties),
    }),
    protobuf: () => ({
        langSupport: StreamLanguage.define(protobuf),
    }),
    pug: () => ({
        langSupport: StreamLanguage.define(pug),
    }),
    puppet: () => ({
        langSupport: StreamLanguage.define(puppet),
    }),
    q: () => ({
        langSupport: StreamLanguage.define(q),
    }),
    ruby: () => ({
        langSupport: StreamLanguage.define(ruby),
    }),
    sas: () => ({
        langSupport: StreamLanguage.define(sas),
    }),
    scheme: () => ({
        langSupport: StreamLanguage.define(scheme),
    }),
    shell: () => ({
        langSupport: StreamLanguage.define(shell),
    }),
    sieve: () => ({
        langSupport: StreamLanguage.define(sieve),
    }),
    smalltalk: () => ({
        langSupport: StreamLanguage.define(smalltalk),
    }),
    solr: () => ({
        langSupport: StreamLanguage.define(solr),
    }),
    spreadsheet: () => ({
        langSupport: StreamLanguage.define(spreadsheet),
    }),
    stex: () => ({
        langSupport: StreamLanguage.define(stex),
    }),
    stylus: () => ({
        langSupport: StreamLanguage.define(stylus),
    }),
    swift: () => ({
        langSupport: StreamLanguage.define(swift),
    }),
    tcl: () => ({
        langSupport: StreamLanguage.define(tcl),
    }),
    textile: () => ({
        langSupport: StreamLanguage.define(textile),
    }),
    tiddlyWiki: () => ({
        langSupport: StreamLanguage.define(tiddlyWiki),
    }),
    tiki: () => ({
        langSupport: StreamLanguage.define(tiki),
    }),
    toml: () => ({
        langSupport: StreamLanguage.define(toml),
    }),
    troff: () => ({
        langSupport: StreamLanguage.define(troff),
    }),
    ttcnCfg: () => ({
        langSupport: StreamLanguage.define(ttcnCfg),
    }),
    ttcn: () => ({
        langSupport: StreamLanguage.define(ttcn),
    }),
    turtle: () => ({
        langSupport: StreamLanguage.define(turtle),
    }),
    vb: () => ({
        langSupport: StreamLanguage.define(vb),
    }),
    vbScript: () => ({
        langSupport: StreamLanguage.define(vbScript),
    }),
    velocity: () => ({
        langSupport: StreamLanguage.define(velocity),
    }),
    verilog: () => ({
        langSupport: StreamLanguage.define(verilog),
    }),
    vhdl: () => ({
        langSupport: StreamLanguage.define(vhdl),
    }),
    webIDL: () => ({
        langSupport: StreamLanguage.define(webIDL),
    }),
    xQuery: () => ({
        langSupport: StreamLanguage.define(xQuery),
    }),
    yacas: () => ({
        langSupport: StreamLanguage.define(yacas),
    }),
    z80: () => ({
        langSupport: StreamLanguage.define(z80),
    }),
    jsonc: () => ({
        langSupport: StreamLanguage.define(jsonld),
    }),
};

window.aira.editor.languages = {
    registerNewLang: (lang, parser, name, label) => {
        if (lang) {
            var lang_ = lang;
        } else {
            var lang_ = LRLanguage.define({ parser: handlebarsLanguage });
        }

        if (parser) {
            var parser_ = parser;
        } else {
            var parser_ = undefined;
        }

        var totallangs = window.aira.editor.languages.totalLangs;
        var langsInfo = window.aira.editor.languages.langsInfo;

        totallangs[name] = () => {
            completelang = parser_;
            codelang = lang_;
            document
                .querySelector(".editorcontainer")
                .setAttribute("aira-language-editing", name);
        };

        langsInfo[name] = {
            label: label,
            icon: "text",
        };
    },
    totalLangs: defaultLangs,
    langsInfo: cmlangs,
};

/**
 * Fetches a JSON file and *tries* to make a loader for the Editor Loader Animation
   It really don't works the loader, so it just loads the JSON file and it saves it in
   cache.
 * @param {String} url - The url of the JSON file 
 * @param {String} cacheName - a keyword for the cache name
 * @param {Function} progressCallback - a function for the loader info 
 * @returns {JSON}
 */
async function fetchJson(url, cacheName = "json-cache", progressCallback) {
    try {
        // Check if the response is already cached
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(url);
        if (cachedResponse) {
            const jsonData = await cachedResponse.json();
            return jsonData;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const totalBytes = Number(response.headers.get("content-length"));
        let loadedBytes = 0;

        // Creamos una copia del cuerpo de la respuesta para leerlo para el progreso
        const responseClone = response.clone();
        const reader = responseClone.body.getReader();

        // Función para leer el cuerpo de la respuesta para el progreso
        const readChunkForProgress = async () => {
            const { done, value } = await reader.read();
            if (!done) {
                loadedBytes += value.length;
                const percentage = Math.round((loadedBytes / totalBytes) * 100);
                if (progressCallback) {
                    progressCallback(percentage);
                }
                await readChunkForProgress();
            }
        };

        // Comenzamos a leer el cuerpo de la respuesta para el progreso
        await readChunkForProgress();

        // Ahora leemos el cuerpo de la respuesta para obtener el JSON
        const jsonData = await response.json();

        // Cache the response in the browser cache
        await cache.put(url, new Response(JSON.stringify(jsonData)));

        return jsonData;
    } catch (error) {
        throw error;
    }
}

/**
 * It observes changes in a DOM Element.
 * @param {Element} targetElement - The DOM Element
 * @param {Function} callback - A function to do when it changes
 */
function observeChanges(targetElement, callback) {
    var observer = new MutationObserver(function (mutationsList, observer) {
        mutationsList.forEach(function (mutation) {
            if (mutation.type === "childList") {
                callback();
            }
        });
    });

    var config = { childList: true, subtree: true };
    observer.observe(targetElement, config);
}

/**
 * It loads a lang for CodeMirror
 * @param {String} langextension - The name of the lang to load.
 * @returns {Object} - An object containing lang info (intellisense, lang, extensions...)
 */
export async function langLoader(langextension) {
    try {
        var defaultlang = "en";
        var uLang = "es";
        var langextensions = [];
        var intelli = [];
        var extraintellis = {};

        changeSettings((settings) => {
            settings.editor.wordWrap = false;
            return settings;
        });

        var lang = window.aira.editor.languages.totalLangs[langextension]
            ? window.aira.editor.languages.totalLangs[langextension]()
            : window.aira.editor.languages.totalLangs["default"]();
        //var completelang = lang.lezerLang ? lang.lezerLang : undefined;
        var codelang = lang.langSupport;
        var html2 = lang.html2 ? lang.html2 : false;
        var syntaxes = lang.syntaxes ? lang.syntaxes : [];
        lang.extensions
            ? lang.extensions.forEach((extension) => {
                  langextensions.push(extension);
              })
            : false;
        window.aira.editor.languages.actual = window.aira.editor.languages
            .langsInfo[langextension]
            ? langextension
            : "text";

        console_custom(
            "Lang Loader",
            window.aira.editor.languages.langsInfo[
                window.aira.editor.languages.actual
            ].label + " Language loaded"
        );

        const promises = syntaxes.map(async (syntax) => {
            const data = await fetchJson(
                `https://swiftlystatic.vercel.app/airacloud/intelli?syntax=${syntax}&lang=${uLang}`,
                syntax + "intelli",
                (percentage) => {
                    var editorProgress = document.getElementById(
                        "loader-editor-progress"
                    );
                    editorProgress.style.width = percentage + "%";
                    var editorpgMsg = document.getElementById(
                        "loader-editor-progress-message"
                    );
                    editorpgMsg.innerText =
                        "Downloading " + syntax + " Intellisense...";
                }
            );
            if (syntax === "html") {
                    extraintellis.html2 = [];
            } else if (syntax === "css") {
                    extraintellis.properties = [];
                    extraintellis.funcs = [];
                    extraintellis.colors = [];
                    extraintellis.keywords = [];
                    extraintellis.absoluteUnits = [];
                    extraintellis.relativeUnits = [];
            }
            const ELEMTYPES = {
                classes: "classes",
                colors: "colors",
                constants: "constants",
                events: "events",
                fields: "fields",
                files: "files",
                folders: "folders",
                interfaces: "interfaces",
                keywords: "keywords",
                methodsAndFunctions: "methods-and-functions",
                modules: "modules",
                operators: "operators",
                propertiesAndAttributes: "properties-and-attributes",
                references: "references",
                snippetPrefixes: "snippet-prefixes",
                structures: "structures",
                typeParameters: "type-parameters",
                unit: "unit",
                valuesAndEnumerations: "values-and-enumerations",
                vaiables: "variables",
                words: "words"
            }
            data.forEach((elem) => {
                if (elem.type === ELEMTYPES.snippetPrefixes) {
                    var completion = elem.completion;
                    if (syntax === "html") {
                        completion = "<" + elem.completion;
                    }
                    completion = completion.replace(/\|/g, '${}');
                    completion = completion.replace(/`([^`]+)`/g, '${$1}');

                    var obj = snip(completion, {
                        label: elem.name,
                        type: elem.type,
                        info: elem.desc,
                        detail: elem.cat
                    });
                    extraintellis.html2.push(obj);
                } else {
                        intelli.push({
                            label: elem.name,
                            type: elem.type,
                            info: elem.cat ? elem.cat + " | " + elem.desc : elem.desc,
                            detail: elem.cat,
                            apply: elem.completion,
                        });
                }
                if (syntax === "html" && (elem.type !== ELEMTYPES.snippetPrefixes)) {
                        extraintellis.html2.push({
                            label: elem.name,
                            type: elem.type,
                            info: elem.cat ? elem.cat + " | " + elem.desc : elem.desc,
                            detail: elem.cat,
                            apply: "<" + elem.completion,
                        });
                } else if (syntax === "css") {
                    var obj = {
                        label: elem.name,
                        type: elem.type,
                        info: elem.cat ? elem.cat + " | " + elem.desc : elem.desc,
                        detail: elem.cat,
                        apply: elem.completion,
                        values: elem.values ? elem.values : null
                    }
                    switch(elem.type) {
                        case ELEMTYPES.propertiesAndAttributes:
                            obj = snip(elem.name + ": ${};\n${}", {
                                label: elem.name,
                                type: elem.type,
                                info: elem.cat ? elem.cat + " | " + elem.desc : elem.desc,
                                detail: elem.cat,
                                values: elem.values ? elem.values : null
                            });
                            extraintellis.properties.push(obj);
                            break;
                        case ELEMTYPES.valuesAndEnumerations:
                            extraintellis.funcs.push(obj);
                            break;
                        case ELEMTYPES.colors:
                            obj.apply = obj.name + ";";
                            obj.detail = "."
                            extraintellis.colors.push(obj);
                            break;
                        case ELEMTYPES.keywords:
                            extraintellis.keywords.push(obj);
                            break;
                        case ELEMTYPES.unit:
                            if(elem.lengthtype==="absolute") {
                                obj.apply = obj.name + ";";
                                extraintellis.absoluteUnits.push(obj);
                            }
                            if(elem.lengthtype==="relative") {
                                obj.apply = obj.name + ";";
                                extraintellis.relativeUnits.push(obj);
                            }
                            break;
                    }

                }
            });
        });

        await Promise.all(promises);

        function delay(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        }

        async function getCompletionCSS(context) {
            return await completeCSS(context, extraintellis, delay)
        }


        async function completeHTML(context) {
            let before = context.matchBefore(/\w+/);
            var obj = {};

            var word = window.aira.editor.getPositionType();
            if (word.includes("tag-name")) {
                obj = {
                    from: before?.from,
                    options: intelli,
                };
            } else if (word.length === 0) {
                obj = {
                    from: before?.from,
                    options: extraintellis.html2,
                };
            }
            return obj;
        }
        function completeHTML2(context) {
            let before = context.matchBefore(/<.*?/);
            if (before) {
                return {
                    from: before.from,
                    options: intelli,
                };
            } else {
                return null;
            }
        }

        var completionList = [];
        if(window.aira.editor.languages.actual==="css") {
            completionList.push(getCompletionCSS)
        } else {
            if (html2) {
                completionList.push(completeHTML2);
            } else {
                completionList.push(completeHTML);
            }
        }
        var autocomplete = autocompletion({
            activateOnTyping: true,
            override: completionList,
        });
        return {
            lang: codelang,
            autocomplete: autocomplete,
            langextensions: langextensions,
        };
    } catch (error) {
        throw error;
    }
}
