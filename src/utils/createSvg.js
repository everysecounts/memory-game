const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

export function createSvg(tagName, attributes = {}, children = []) {
  const element = document.createElementNS(SVG_NAMESPACE, tagName);

  Object.entries(attributes).forEach(([name, value]) => {
    element.setAttribute(name, value);
  });

  children.forEach((child) => {
    element.append(child);
  });

  return element;
}
