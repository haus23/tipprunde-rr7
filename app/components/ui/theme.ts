import { tv } from '#/utils/tv';

export const focusRingStyles = tv({
  base: 'focus:outline-none',
  variants: {
    isFocusVisible: {
      true: 'ring-2 ring-default ring-offset-2 ring-offset-default',
    },
  },
});

const interactiveContent = tv({
  slots: {
    base: 'rounded font-medium text-sm text-subtle transition-colors',
    hover: 'bg-content-hover text-app',
    active: 'bg-content-active text-selected',
  },
});
export const interactiveContentStyles = interactiveContent();
