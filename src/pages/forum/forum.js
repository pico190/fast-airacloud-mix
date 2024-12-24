// region DISCONTINUED
/**
 * ! Warning: This file is being discontinued and abandoned. The forum idea it **maybe** will
 * ! be developed later.
 */

export default function Settings() {
  window.addEventListener("onload", () => {
    eval(`function url(redirect) {
            window.location.replace(redirect);
            window.location.href = redirect;
    
            var hash = window.location.hash.replace("#", "");
            var elems = document.querySelectorAll('[data-name]');
            elems.forEach((elem) => {
                if (elem.getAttribute('data-name') === hash) {
                    elem.classList.add('active');
                } else {
                    elem.classList.remove('active')
                }
            });
        }`);
  });

  document.querySelector("#app").innerHTML = `
  <div class="content full">
    <div class="title">
        <img loading="lazy" alt="" src="https://swiftlystatic.vercel.app/airacloud/icon?icon=settings&amp;fill=white">
        <h1>Settings</h1>
    </div>
  
    <div class="content-display">
        <div class="fcontent-itemselector">
            <div data-name="principal" class="fcontent-item active" onclick="url('#principal')"><img loading="lazy" alt="" src="https://swiftlystatic.vercel.app/airacloud/icon?icon=settings&amp;fill=white&amp;regular=true"><span>Principal</span></div>
            <div data-name="editor-settings" class="fcontent-item" onclick="url('#editor-settings')"><img loading="lazy" alt="" src="https://swiftlystatic.vercel.app/airacloud/icon?icon=code-slash&amp;fill=white&amp;regular=true"><span>Editor Settings</span></div>
            <div data-name="themes" class="fcontent-item" onclick="url('#themes')"><img loading="lazy" alt="" src="https://swiftlystatic.vercel.app/airacloud/icon?icon=color-fill&amp;fill=white&amp;regular=true"><span>Themes</span></div>
            <div data-name="experiments" class="fcontent-item" onclick="url('#experiments')"><img loading="lazy" alt="" src="https://swiftlystatic.vercel.app/airacloud/icon?icon=flask&amp;fill=white&amp;regular=true"><span>Experiments</span></div>
        </div>
    
        <div class="content-display-content">
            <div class="cdc-info">
                <img loading="lazy" alt="" src="https://swiftlystatic.vercel.app/airacloud/icon?icon=warning&amp;fill=white&amp;regular=true">
                <div class="cdc-info-content">
                   <b>Warning</b>
                   <span>You have not synced your settings with your Swiftly ID account, click sync or enable <code>settings auto-sync</code></span>
                </div>
                <button>
                    <img loading="lazy" alt="" src="https://swiftlystatic.vercel.app/airacloud/icon?icon=sync&amp;fill=white&amp;regular=true"> 
                    Sync
                </button>
            </div>
        </div>
    </div>
  </div>
   `;
}
