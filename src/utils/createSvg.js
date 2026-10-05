const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

function createSvg(tagName, attributes = {}, ...children) {
  const element = document.createElementNS(SVG_NAMESPACE, tagName);

  Object.entries(attributes).forEach(([name, value]) => {
    element.setAttribute(name, value);
  });

  const childNodes = children.length === 1 && Array.isArray(children[0]) ? children[0] : children;

  childNodes.forEach((child) => {
    element.append(child);
  });

  return element;
}

export { createSvg };
