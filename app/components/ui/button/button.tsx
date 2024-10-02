import {
  type ButtonProps,
  Button as RACButton,
  composeRenderProps,
} from 'react-aria-components';

import { type VariantProps, tv } from '#/utils/tv';

const styles = tv({
  base: 'inline-flex items-center p-1.5',
});

namespace Button {
  export interface Props extends ButtonProps, VariantProps<typeof styles> {}
}

export function Button({ className, ...props }: Button.Props) {
  return (
    <RACButton
      className={composeRenderProps(className, (className, renderProps) =>
        styles({ className }),
      )}
      type="button"
      {...props}
    />
  );
}
