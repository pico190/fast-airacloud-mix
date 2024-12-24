export default function loadNav(project) {
    document.querySelector(".nav").innerHTML = `
                <div class="aira_logo_small">
                        <img src='https://swiftlystatic.vercel.app/airacloud/favicon.svg' loading="lazy" alt=""/>
                        <div class="aira_logo_title">
                            <span>AiraCloud</span>
                        </div>
                </div>

                        <button class="nav-button cm-info-first-right" onclick='window.aira.editor.appareance.toggleZenMode()'>Zen Mode</button>

                        <button class="nav-button primary cm-info-first-right" onclick='alert("Soon")'>Share</button>
                        
                </div>`
}