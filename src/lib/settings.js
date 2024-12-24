import { encode, decode } from "js-base64";

/**
 * It changes the user settings
 * @param {Function} action - A function to do to change the user settings. That function should return the new settings.
 */
export default function changeSettings(action) {
  localStorage.setItem(
    "DATA__SETTINGS",
    encode(
      JSON.stringify(
        action(JSON.parse(decode(localStorage.getItem("DATA__SETTINGS"))))
      )
    )
  );
}
