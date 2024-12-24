/**
 * It logs info at the console.
 * ```[INFO] | data```
 * @param {String} data
 */
export function console_info(data) {
  const info =
    "font-family: 'Atkinson Hyperlegible', 'Poppins', --system-ui, Arial, sans-serif; font-size: 15px;";
  console.info(
    "%cInfo%c | %c" + data,
    info +
      "background-color: rgba(8, 97, 163, 0.25); border-radius: 4px; padding-left: 3px; padding-right: 3px;",
    info + "color: rgba(255, 255, 255, .3);",
    info
  );
}
/**
 * It logs custom type at the console.
 * ```[name] | data```
 * @param {String} name - The name of the custom log type
 * @param {String} data - The content of the log
 * @param {String} color - The color of the custom log type
 */
export function console_custom(name, data, color = "rgba(8, 97, 163, 0.25)") {
  const info =
    "font-family: 'Atkinson Hyperlegible', 'Poppins', --system-ui, Arial, sans-serif; font-size: 15px;";
  console.info(
    "%c" + name + "%c | %c" + data,
    info +
      "background-color: " +
      color +
      "; border-radius: 4px; padding-left: 3px; padding-right: 3px;",
    info + "color: rgba(255, 255, 255, .3);",
    info
  );
}

/**
 * It logs an error at the console.
 * ```[ERROR] | data```
 * @param {String} data
 */
export function console_error(data) {
  const info =
    "font-family: 'Atkinson Hyperlegible', 'Poppins', --system-ui, Arial, sans-serif; font-size: 15px;";
  console.error(
    "%cError%c | %c" + data,
    info +
      "background-color: rgba(163, 8, 8, 0.25); border-radius: 4px; padding-left: 3px; padding-right: 3px;",
    info + "color: rgba(255, 255, 255, .3);",
    info
  );
}

/**
 * It logs a warning at the console.
 * ```[INFO] | data```
 * @param {String} data
 */
export function console_warn(data) {
  const info =
    "font-family: 'Atkinson Hyperlegible', 'Poppins', --system-ui, Arial, sans-serif; font-size: 15px;";
  console.warn(
    "%cWarning%c | %c" + data,
    info +
      "background-color: rgba(163, 126, 8, 0.25); border-radius: 4px; padding-left: 3px; padding-right: 3px;",
    info + "color: rgba(255, 255, 255, .3);",
    info
  );
}

/**
 * It creates a **info** console group.
 * For logging content inside the group, use:
 * ```js
console_group("Group title");
    console_info("Group content");
    console_info("Group content2");
console.endGroup();
```
 * @param {String} data 
 */
export function console_group(data) {
  const info =
    "font-family: 'Atkinson Hyperlegible', 'Poppins', --system-ui, Arial, sans-serif; font-size: 15px;";
  console.group(
    "%cInfo%c | %c" + data,
    info +
      "background-color: rgba(8, 97, 163, 0.25); border-radius: 4px; padding-left: 3px; padding-right: 3px;",
    info + "color: rgba(255, 255, 255, .3);",
    info
  );
}


/**
 * It shows the AiraCloud Title in the console.
 */
export function console_start() {
  console.clear();

  // Title
  console.log(
    "%cAiraCloud",
    "background: linear-gradient(to left, #FF9BFF, #FFCB9B); font-size: 100px; font-family: 'Atkinson Hyperlegible', 'Poppins', --system-ui, Arial, sans-serif; font-weight: bold; -webkit-background-clip: text; -webkit-text-fill-color: transparent; color: transparent;"
  );

  // Info
  const infot =
    "font-family: 'Atkinson Hyperlegible', 'Poppins', --system-ui, Arial, sans-serif; font-size: 20px;";
  const info =
    "font-family: 'Atkinson Hyperlegible', 'Poppins', --system-ui, Arial, sans-serif; font-size: 15px;";
  console.group("%cInfo:", infot);
  console.log("%cEngine v"+window.aira.engineVersion, info);
  console.log(
    "%cUsing %cVite",
    info,
    info +
      "background-color: rgba(164, 74, 8, 0.25); border-radius: 4px; padding-left: 3px; padding-right: 3px;"
  );
  console.groupEnd();
  window.aira.console = {
    info: console_info,
    custom: console_custom,
    error: console_error,
    warn: console_warn,
    group: console_group
  }
}