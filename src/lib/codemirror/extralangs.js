import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside} from "@codemirror/language";
import {LezerLanguage, parser} from "@lezer/lr";
import {styleTags, tags as t} from "@lezer/highlight";
import {Parser} from "@lezer/common";
import {htmlLanguage} from "@codemirror/lang-html";
import {javascriptLanguage} from "@codemirror/lang-javascript";

const astroParser = Parser.from({
  top: "Document",
  nodes: [
    {name: "Document", repeat: "Element|Script|Style|Comment|Text"},
    {name: "Element", repeat: "Attribute", skip: "whitespace"},
    {name: "Attribute", repeat: "Identifier", skip: "whitespace"},
    {name: "Script", repeat: "Expression|Text"},
    {name: "Style", repeat: "Text"},
    {name: "Comment", repeat: "Text"},
    {name: "Expression", repeat: "Identifier|String|Number"},
    {name: "Text"},
    {name: "Identifier"},
    {name: "String"},
    {name: "Number"},
    {name: "whitespace", pattern: "\\s+"}
  ],
  tokens: [
    {name: "TagName", pattern: "[a-zA-Z][a-zA-Z0-9]*"},
    {name: "AttributeName", pattern: "[a-zA-Z-]+="},
    {name: "AttributeValue", pattern:`'".*?"|'.*?'`},
    {name: "MustacheOpen", pattern: "\\{"},
    {name: "MustacheClose", pattern: "\\}"},
    {name: "Comment", pattern: "<!--.*?-->"},
    {name: "ScriptText", pattern: "<script.*?</script>"},
    {name: "StyleText", pattern: "<style.*?</style>"}
  ]
});

const astroHighlighting = styleTags({
  "TagName": t.tagName,
  "AttributeName": t.attributeName,
  "AttributeValue": t.string,
  "Text": t.content,
  "MustacheOpen MustacheClose": t.brace,
  "Expression": t.interpolation,
  "Comment": t.comment,
  "ScriptText": t.string,
  "StyleText": t.string,
});

function foldHTML(state, start, end) {
  let tree = syntaxTree(state);
  for (let node = tree.resolveInner(start, -1); node; node = node.parent) {
    if (node.name === "Element" && node.from === start) {
      return {from: node.from + node.name.length + 1, to: node.to - 1};
    }
  }
  return null;
}

function foldJS(state, start, end) {
  let tree = syntaxTree(state);
  for (let node = tree.resolveInner(start, -1); node; node = node.parent) {
    if (node.name === "FunctionDeclaration" || node.name === "FunctionExpression") {
      return {from: node.from + node.name.length + 1, to: node.to - 1};
    }
  }
  return null;
}

export const astroLanguage = LRLanguage.define({
  parser: astroParser.configure({
    props: [
      indentNodeProp.add({
        Document: context => context.baseIndent,
        Element: context => context.baseIndent + context.unit,
        Script: context => context.baseIndent + context.unit,
        Style: context => context.baseIndent + context.unit,
        Comment: context => context.baseIndent + context.unit
      }),
      foldNodeProp.add({
        Element: foldHTML,
        FunctionDeclaration: foldJS,
        FunctionExpression: foldJS
      }),
      astroHighlighting
    ]
  }),
  languageData: {
    closeBrackets: { brackets: ["<", "{", "(", "[", "\"", "'"] },
    commentTokens: { block: { open: "<!--", close: "-->" } }
  }
});

export function astro() {
  return new LanguageSupport(astroLanguage);
}
