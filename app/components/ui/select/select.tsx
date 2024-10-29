import {
  ListBox,
  ListBoxItem,
  type ListBoxItemProps,
  Select as RACSelect,
  type SelectProps,
  SelectValue,
  composeRenderProps,
} from 'react-aria-components';

import { tv } from '#/utils/tv';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';
import { Label } from '../label/label';
import { Popover } from '../popover/popover';
import { interactiveContentStyles } from '../theme';

const styles = tv({
  slots: {
    selectStyles: 'flex flex-col gap-y-2',
    listboxStyles: 'space-y-1 p-1.5',
  },
});

const { selectStyles, listboxStyles } = styles();

const listItemStyles = tv({
  base: [
    'relative flex items-center justify-between',
    'cursor-default select-none outline-none',
    'px-4 py-1.5',
    interactiveContentStyles.base(),
  ],
  variants: {
    isSelected: { true: '' },
    isFocused: { true: '' },
  },
  compoundVariants: [
    {
      isSelected: false,
      isHovered: true,
      class: interactiveContentStyles.hover(),
    },
    {
      isSelected: true,
      class: interactiveContentStyles.active(),
    },
  ],
});

namespace Select {
  export interface Props<T extends object>
    extends Omit<SelectProps<T>, 'children'> {
    label: string;
    children: React.ReactNode | ((item: T) => React.ReactNode);
  }
}

export function Select<T extends object>({
  children,
  className,
  label,
  ...props
}: Select.Props<T>) {
  return (
    <RACSelect
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        selectStyles({ ...renderProps, className }),
      )}
    >
      <Label>{label}</Label>
      <Button variant="select">
        <SelectValue />
        <Icon name="chevrons-up-down" />
      </Button>
      <Popover className="w-[var(--trigger-width)] rounded">
        <ListBox
          className={composeRenderProps('', (className, renderProps) =>
            listboxStyles({ ...renderProps, className }),
          )}
        >
          {children}
        </ListBox>
      </Popover>
    </RACSelect>
  );
}

export function SelectItem({ className, ...props }: ListBoxItemProps) {
  return (
    <ListBoxItem
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        listItemStyles({ ...renderProps, className }),
      )}
    />
  );
}
