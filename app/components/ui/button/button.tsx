import {
  type ButtonProps,
  Button as RACButton,
  composeRenderProps,
} from 'react-aria-components';

import { type VariantProps, tv } from '#/utils/tv';
import { focusRingStyles, interactiveContentStyles } from '../theme';

const styles = tv({
  extend: focusRingStyles,
  base: 'inline-flex items-center p-1.5',
  variants: {
    variant: {
      default: 'px-4 py-2',
      ghost: `${interactiveContentStyles.base()} data-[pressed]:scale-95`,
      menuitem: interactiveContentStyles.base(),
    },
    isHovered: {
      true: '',
    },
  },
  compoundVariants: [
    {
      variant: ['menuitem', 'ghost'],
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
