import { createSvg } from '@/utils';

let uid = 0;

const nextId = (prefix) => `${prefix}-${uid++}`;

export function createDivider(className) {
  const id = nextId('divider');

  const leftGradient = createSvg(
    'linearGradient',
    {
      id: `${id}-l`,
      gradientUnits: 'userSpaceOnUse',
      x1: '0',
      x2: '108',
    },
    createSvg('stop', {
      offset: '0',
      'stop-color': '#c9a45c',
      'stop-opacity': '0',
    }),
    createSvg('stop', {
      offset: '1',
      'stop-color': '#f3dc9a',
    }),
  );

  const rightGradient = createSvg(
    'linearGradient',
    {
      id: `${id}-r`,
      gradientUnits: 'userSpaceOnUse',
      x1: '152',
      x2: '260',
    },
    createSvg('stop', {
      offset: '0',
      'stop-color': '#f3dc9a',
    }),
    createSvg('stop', {
      offset: '1',
      'stop-color': '#c9a45c',
      'stop-opacity': '0',
    }),
  );

  const svg = createSvg(
    'svg',
    {
      viewBox: '0 0 260 14',
      fill: 'none',
      'aria-hidden': 'true',
      focusable: 'false',
    },
    createSvg('defs', {}, leftGradient, rightGradient),
    createSvg('path', {
      d: 'M0 7H108',
      stroke: `url(#${id}-l)`,
    }),
    createSvg('path', {
      d: 'M152 7H260',
      stroke: `url(#${id}-r)`,
    }),
    createSvg('path', {
      d: 'M130 1 137 7 130 13 123 7Z',
      fill: '#f3dc9a',
    }),
    createSvg('path', {
      d: 'M130 4 133.5 7 130 10 126.5 7Z',
      fill: '#14100b',
    }),
    createSvg('circle', {
      cx: '113',
      cy: '7',
      r: '2',
      fill: '#f3dc9a',
    }),
    createSvg('circle', {
      cx: '147',
      cy: '7',
      r: '2',
      fill: '#f3dc9a',
    }),
  );

  if (className) {
    svg.classList.add(...className.split(/\s+/).filter(Boolean));
  }

  return svg;
}

export function createHourglass(className) {
  const svg = createSvg(
    'svg',
    {
      viewBox: '0 0 80 120',
      fill: 'none',
      'aria-hidden': 'true',
      focusable: 'false',
    },
    createSvg('path', {
      d: 'M21 14H59C59 40 44 49 40 60C36 49 21 40 21 14Z',
      fill: '#f0cf86',
      'fill-opacity': '0.08',
      stroke: '#e8d3a0',
      'stroke-width': '1.6',
    }),
    createSvg('path', {
      d: 'M40 60C44 71 59 80 59 106H21C21 80 36 71 40 60Z',
      fill: '#f0cf86',
      'fill-opacity': '0.08',
      stroke: '#e8d3a0',
      'stroke-width': '1.6',
    }),
    createSvg('path', {
      d: 'M29 20H51C50 32 44 40 40 47C36 40 30 32 29 20Z',
      fill: '#f0cf86',
      'fill-opacity': '0.35',
    }),
    createSvg('path', {
      d: 'M40 52V88',
      stroke: '#f0cf86',
      'stroke-width': '1.2',
      'stroke-opacity': '0.8',
    }),
    createSvg('path', {
      d: 'M24 106C26 92 34 84 40 80C46 84 54 92 56 106Z',
      fill: '#f0cf86',
    }),
    createSvg('rect', {
      x: '12',
      y: '5',
      width: '56',
      height: '9',
      rx: '3',
      fill: '#8a6a35',
    }),
    createSvg('rect', {
      x: '12',
      y: '106',
      width: '56',
      height: '9',
      rx: '3',
      fill: '#8a6a35',
    }),
    createSvg('rect', {
      x: '12',
      y: '5',
      width: '56',
      height: '2.5',
      rx: '1.2',
      fill: '#e0c681',
    }),
    createSvg('rect', {
      x: '12',
      y: '106',
      width: '56',
      height: '2.5',
      rx: '1.2',
      fill: '#e0c681',
    }),
    createSvg('rect', {
      x: '15',
      y: '14',
      width: '3.5',
      height: '92',
      fill: '#b8924a',
    }),
    createSvg('rect', {
      x: '61.5',
      y: '14',
      width: '3.5',
      height: '92',
      fill: '#b8924a',
    }),
  );

  if (className) {
    svg.classList.add(...className.split(/\s+/).filter(Boolean));
  }

  return svg;
}
