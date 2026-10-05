import { createSvg } from './createSvg';

function createSoundIcon() {
  const gear = createSvg('path', {
    d: `
      M11.982 6.299
      L13.569 2.213
      L18.431 2.213
      L20.018 6.299

      L24.030 4.532
      L27.468 7.970
      L25.701 11.982

      L29.787 13.569
      L29.787 18.431
      L25.701 20.018

      L27.468 24.030
      L24.030 27.468
      L20.018 25.701

      L18.431 29.787
      L13.569 29.787
      L11.982 25.701

      L7.970 27.468
      L4.532 24.030
      L6.299 20.018

      L2.213 18.431
      L2.213 13.569
      L6.299 11.982

      L4.532 7.970
      L7.970 4.532
      Z

      M16 10.75
      A5.25 5.25 0 1 0 16 21.25
      A5.25 5.25 0 1 0 16 10.75
      Z
    `,
    'fill-rule': 'evenodd',
  });

  const svg = createSvg(
    'svg',
    {
      viewBox: '0 0 32 32',
      'aria-hidden': 'true',
    },
    [gear],
  );

  return {
    svg,
    muteLines: [],
  };
}

export { createSoundIcon };
