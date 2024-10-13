import { composeRenderProps } from 'react-aria-components';
import { type NavLinkProps, NavLink as RRNavLink } from 'react-router';

import { type VariantProps, tv } from '#/utils/tv';
import { menuItemStyles } from '../styles';

const styles = tv({
  base: '',
  variants: {
    variant: {
      default: '',
      menuitem: menuItemStyles(),
    },
    isActive: {
      true: 'bg-content-active text-selected hover:text-selected',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

namespace NavLink {
  export interface Props extends NavLinkProps, VariantProps<typeof styles> {}
}

export function NavLink({ className, variant, ...props }: NavLink.Props) {
  return (
    <RRNavLink
      className={composeRenderProps(className, (className, renderProps) =>
        styles({ ...renderProps, variant, className }),
      )}
      type="button"
      {...props}
    />
  );
}
