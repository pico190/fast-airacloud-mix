/**
 * Return a string to use in an onclick html event.
 * @param {String} url - The url to redirect
 * @param {boolean} newPage - To open the url in a new tab
 */
function replaceUrl(url, newPage) {
    return newPage ? `window.open("https://${window.location.host}/${url}", "_blank");` : `window.location.replace("https://${window.location.host}/${url}"); window.location.hash = "https://${window.location.host}/${url}";`
}
    
/**
 * It loads the engine version message
 * @returns {String} - The HTML DOM.
 */
export function engineVersion() {
    window.aira.prototype = {
        engineClick: () => {
            
        }
    }
    return `
    <div class="sb_separator"></div>
    <div class="aira_info">
            <img onclick="window.aira.prototype.engineClick()" width="44px" src="https://swiftlystatic.vercel.app/airacloud/favicon.svg" loading="lazy" alt="" style="height: fit-content;" >
            <span>
                <font style="font-size: 26px; color: #C3C3C4"><b>AiraCloud</b> Release ${window.aira.clientVersion}</font>
                <br><font style="font-size: 16px; color: #4B4C4F">Engine v${window.aira.engineVersion}</font>
                <br><font style="font-size: 16px; color: #878889">(c) 2024 <b>Aira</b> / Made with <img alt="" loading="lazy" src="https://swiftlystatic.vercel.app/airacloud/emoji.svg" width="15px" height="15px" style="transform: translateY(15%)"> by Swiftly</font>
            </span>
    </div>`;
}

/**
 * It loads the account sidebar menu
 * @returns {String} - The HTML DOM.
 */
export function account() {
    
    return `
    <div class="account airacloud-component">
        <div class="account-icon" onclick='${replaceUrl("settings/", true)}'><img lightinvert src="https://swiftlystatic.vercel.app/airacloud/icon?icon=settings&fill=whitesmoke" loading="lazy" alt="" ></div>

        <div class="account-separator"></div>
        <div class="account-icon"><img lightinvert src="https://swiftlystatic.vercel.app/airacloud/icon?icon=search&fill=whitesmoke" loading="lazy" alt="" ></div>

        <div class="account-separator"></div>
        <div class="account-icon"><img lightinvert src="https://swiftlystatic.vercel.app/airacloud/icon?icon=notifications&fill=whitesmoke" loading="lazy" alt="" ></div>
    </div>`;
}
