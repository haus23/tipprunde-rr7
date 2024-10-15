import { useFocusRing, useHover } from 'react-aria';
import {
  LinkContext,
  composeRenderProps,
  useSlottedContext,
} from 'react-aria-components';
import { type NavLinkProps, NavLink as RRNavLink } from 'react-router';

import { type VariantProps, tv } from '#/utils/tv';
import { focusRingStyles, interactiveContentStyles } from '../theme';

const styles = tv({
  extend: focusRingStyles,
  base: 'flex items-center px-2 py-1.5',
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

  // Delegate click event to press event context handler
  const linkContext = useSlottedContext(LinkContext);
  function handleClick() {
    if (linkContext?.onPress) {
      linkContext.onPress(null as never);
    }
  }

  return (
    <RRNavLink
      {...focusProps}
      {...hoverProps}
      onClick={handleClick}
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
