import { type LabelProps, Label as RACLabel } from 'react-aria-components';
import { tv } from '#/utils/tv';

const styles = tv({
  base: 'w-fit font-medium text-sm text-subtle',
});

namespace Label {
  export interface Props extends LabelProps {}
}

export function Label({ className, ...props }: Label.Props) {
  return <RACLabel className={styles({ className })} {...props} />;
}
