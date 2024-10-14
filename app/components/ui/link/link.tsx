import { useFocusRing, useHover } from 'react-aria';
import { composeRenderProps } from 'react-aria-components';
import { type NavLinkProps, NavLink as RRNavLink } from 'react-router';

import { type VariantProps, tv } from '#/utils/tv';
import { focusRingStyles, interactiveContentStyles } from '../theme';

const styles = tv({
  extend: focusRingStyles,
  base: 'px-2 py-1.5',
  variants: {
    variant: {
      default: '',
      menuitem: interactiveContentStyles.base(),
    },
    isActive: {
      true: '',
    },
    isHovered: {
      true: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
  compoundVariants: [
    {
      variant: 'menuitem',
      isActive: false,
      isHovered: true,
      class: interactiveContentStyles.hover(),
    },
    {
      variant: 'menuitem',
      isActive: true,
      class: interactiveContentStyles.active(),
    },
  ],
});

namespace NavLink {
  export interface Props extends NavLinkProps, VariantProps<typeof styles> {}
}

export function NavLink({ className, variant, ...props }: NavLink.Props) {
  const { focusProps, isFocusVisible } = useFocusRing();
  const { hoverProps, isHovered } = useHover({});
  return (
    <RRNavLink
      {...focusProps}
      {...hoverProps}
      className={composeRenderProps(className, (className, renderProps) =>
        styles({
          ...renderProps,
          isFocusVisible,
          isHovered,
          variant,
          className,
        }),
      )}
      type="button"
      {...props}
    />
  );
}
