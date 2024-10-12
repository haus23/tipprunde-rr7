import type { ReactNode } from 'react';
import {
  type PopoverProps,
  Popover as RACPopover,
  composeRenderProps,
} from 'react-aria-components';

import { tv } from '#/utils/tv';

const styles = tv({
  base: 'border bg-popover',
});

namespace Popover {
  export interface Props extends PopoverProps {
    children: ReactNode;
  }
}

export function Popover({ className, ...props }: Popover.Props) {
  return (
    <RACPopover
      className={composeRenderProps(className, (className, renderProps) =>
        styles({ ...renderProps, className }),
      )}
      containerPadding={8}
      offset={8}
      {...props}
    />
  );
}
