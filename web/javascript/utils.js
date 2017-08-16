export function getIcon(messageType) {
  let icon;
  switch(messageType) {
    case "danger":
      icon = "error-circle-o";
      break;
    case "success":
      icon = "ok";
      break;
    case "warning":
      icon = "warning-triangle-o";
      break;
    default:
      icon = "info";
      break;
  }
  return icon;
}
