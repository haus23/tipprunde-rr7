import {
  type ButtonProps,
  Button as RACButton,
  composeRenderProps,
} from 'react-aria-components';

import { type VariantProps, tv } from '#/utils/tv';
import { menuItemStyles } from '../styles';

const styles = tv({
  base: 'inline-flex items-center',
  variants: {
    variant: {
      default: 'p-1.5',
      menuitem: `${menuItemStyles()}`,
    },
  },
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
