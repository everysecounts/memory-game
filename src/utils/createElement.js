export function createElement(tagName, options = {}, children = []) {
  const element = document.createElement(tagName);
  const { className, textContent, attributes = {} } = options;
  if (className) {
    element.className = className;
  }
  if (textContent) {
    element.textContent = textContent;
  }
  Object.entries(attributes).forEach(([name, value]) => {
    element.setAttribute(name, value);
  });
  children.forEach((child) => {
    element.append(child);
  });
  return element;
}
