/**
 * ? Notification manager:
 * It handles notifications.
 */

/**
 * It creates a inside-web notification
 * @param {*} title - The title of the notification
 * @param {*} html - The html content of the notification
 */
export function createNotification(title, html) {
  var notifications = document.querySelector(".notificationsdiv");
  var notification = document.createElement("div");
  notification.className = "notification";
  notification.innerHTML = `
	<b>${title}</b>
	${html}
  `;
  notifications.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 10000);
}
