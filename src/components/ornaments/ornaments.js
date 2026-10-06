import { createSvg } from '@/utils';

let uid = 0;

const nextId = (prefix) => `${prefix}-${uid++}`;

const WREATH_COLORS = {
  gold: {
    fill: '#c9a45c',
    highlight: '#f3dc9a',
  },
  silver: {
    fill: '#9da3ad',
    highlight: '#e4e7eb',
  },
  bronze: {
    fill: '#a85f32',
    highlight: '#e6a06d',
  },
};

function createDivider(className) {
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

function createLaurelWreath(className, variant = 'gold') {
  const colors = WREATH_COLORS[variant] ?? WREATH_COLORS.gold;

  const svg = createSvg(
    'svg',
    {
      viewBox: '0 0 100 100',
      fill: 'none',
      'aria-hidden': 'true',
      focusable: 'false',
    },
    createSvg(
      'g',
      {
        fill: colors.fill,
        stroke: colors.highlight,
        'stroke-width': '1.2',
        'stroke-linejoin': 'round',
      },
      createSvg('path', {
        d: 'M35 82C22 75 15 63 15 48C15 32 23 18 36 10',
        fill: 'none',
        'stroke-width': '2',
      }),
      createSvg('path', {
        d: 'M65 82C78 75 85 63 85 48C85 32 77 18 64 10',
        fill: 'none',
        'stroke-width': '2',
      }),
      createSvg('path', {
        d: 'M25 70Q15 68 10 60Q20 59 28 65Z',
      }),
      createSvg('path', {
        d: 'M20 58Q10 55 7 46Q17 48 24 54Z',
      }),
      createSvg('path', {
        d: 'M18 45Q9 40 9 31Q18 34 23 41Z',
      }),
      createSvg('path', {
        d: 'M21 32Q14 25 17 17Q24 23 26 30Z',
      }),
      createSvg('path', {
        d: 'M28 21Q23 13 28 7Q33 14 32 21Z',
      }),
      createSvg('path', {
        d: 'M75 70Q85 68 90 60Q80 59 72 65Z',
      }),
      createSvg('path', {
        d: 'M80 58Q90 55 93 46Q83 48 76 54Z',
      }),
      createSvg('path', {
        d: 'M82 45Q91 40 91 31Q82 34 77 41Z',
      }),
      createSvg('path', {
        d: 'M79 32Q86 25 83 17Q76 23 74 30Z',
      }),
      createSvg('path', {
        d: 'M72 21Q77 13 72 7Q67 14 68 21Z',
      }),
    ),
  );

  if (className) {
    svg.classList.add(...className.split(/\s+/).filter(Boolean));
  }

  return svg;
}

function createHourglass(className) {
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

export { createDivider, createLaurelWreath, createHourglass };
