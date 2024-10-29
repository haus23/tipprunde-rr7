import {
  type ButtonProps,
  Button as RACButton,
  composeRenderProps,
} from 'react-aria-components';

import { type VariantProps, tv } from '#/utils/tv';
import { focusRingStyles, interactiveContentStyles } from '../theme';

const styles = tv({
  extend: focusRingStyles,
  base: `${interactiveContentStyles.base()} inline-flex items-center p-1.5`,
  variants: {
    variant: {
      default:
        'border bg-content px-4 py-2 text-app data-[pressed]:bg-content-active',
      ghost: 'data-[pressed]:scale-95',
      menuitem: '',
      select: 'justify-between border bg-content text-app',
    },
    isHovered: {
      true: '',
    },
  },
  compoundVariants: [
    {
      variant: ['menuitem', 'ghost', 'select', 'default'],
      isHovered: true,
      class: interactiveContentStyles.hover(),
    },
  ],
  defaultVariants: {
    variant: 'default',
  },
});

namespace Button {
  export interface Props extends ButtonProps, VariantProps<typeof styles> {}
}

export function Button({ className, variant, ...props }: Button.Props) {
  return (
    <RACButton
      className={composeRenderProps(className, (className, renderProps) =>
        styles({ ...renderProps, variant, className }),
      )}
      type="button"
      {...props}
    />
  );
}
