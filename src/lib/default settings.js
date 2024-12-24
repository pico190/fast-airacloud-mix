export var defaultsettings = {
  principal: {
    fontFamily:
      '"Atkinson Hyperlegible", "atkinson", Poppins, Montserrat, Outfit, Arial, sans-serif, --system-ui;', // fontFamily
    sidebarColorsBg: true //boolean
  },
  editor: {
    fontSize: "16px", // length
    fontFamily: "Consolas, monospace", // fontFamily
    fontLigatures: true, // boolean
    minimap: {
      enabled: true, // boolean
      renderCharacters: true, // boolean
      showOverlay: "mouse-over", // "mouse-over" | "always"
    },
    inlineSuggestionManagers: "None",
    lineNumbers: true, // boolean
    folding: {
      enabled: true, // boolean
      show: "mouse-over", // "mouse-over" | "always"
    }, // boolean
    wordWrap: "auto", // "auto" | "never" | "always"
    "look&Feel": {
      cursorWidth: "2px",
      hideActiveLineWhenSelection: true, // boolean
      cursorAnimation: true, // boolean
      selectionAnimation: false, // boolean
      selectionRoundCorners: true, // boolean
      cursorRoundCorners: true, // boolean
    },
    bracketPairColorization: true, // boolean
    cursorBlinking: "smooth", // "blink" | "smooth" | "expand" | "phase" | "solid"
    selectionMatch: {
      enabled: true, // boolean
      highlightWordAroundCursor: true, // boolean
      onlyWholeWords: true, // boolean
    },
    placeholder:
      "From the cloud to your screen. Start creating with AiraCloud!",
  },
  themes: {
    theme: "dark",
  },
  developerMode: false,
  
};
