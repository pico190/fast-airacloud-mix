export default function partyMode(aira) {

    if (window.aira.settings.getSettings().experiments?.alwaysPartyMode) {
        window.aira.partyMode = true;                    
    }

    var date = new Date();
    var day = {
        day: date.getDay(),
        month: date.getMonth()
    }

    if (day === 11 && month === 2) {
        window.aira.partyMode = true;
        window.aira.partyModeModal = true;
    }

                    if (window.aira.partyMode && window.aira.editor.registerUpdateEvent) {
                        window.aira.editor.registerUpdateEvent((data) => {
                            if (data.docChanged) {
                                var scalar = 2;
                                var pineapple = confetti.shapeFromText({ text: '🍍', scalar });
                                function getNormalizedCoordinates(element) {
                                    var rect = element.getBoundingClientRect();
                                    var x = rect.left + (rect.width / 2);
                                    var y = rect.top + (rect.height / 2);
                                    var normalizedX = x / window.innerWidth;
                                    var normalizedY = y / window.innerHeight;
                                    return { normalizedX, normalizedY };
                                }
                                var cursorpos = getNormalizedCoordinates(document.querySelector(".cm-cursor-primary"));
                                confetti({
                                    shapes: [pineapple],
                                    origin: {
                                        x: cursorpos.normalizedX,
                                        y: cursorpos.normalizedY
                                    },
                                    scalar
                                });
                            }
                        })
                    }
}