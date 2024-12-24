/**
 * A simple function that loads de actual lang in the cm-info element.
 */
export default function infolang() {
  var infolang = document.querySelector(".cm-info div[lang]");
  var lang = window.aira.editor.languages.actual;
  infolang.innerHTML = `<img src="https://swiftlystatic.vercel.app/airacloud/langicon?icon=${window.aira.editor.languages.langsInfo[lang].iconname}" loading="lazy" alt="">${window.aira.editor.languages.langsInfo[lang].label}`;
}
