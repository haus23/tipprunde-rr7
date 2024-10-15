import {
  type DialogProps,
  DialogTrigger,
  type DialogTriggerProps,
  Modal,
  ModalOverlay,
  Dialog as RACDialog,
} from 'react-aria-components';
import { type VariantProps, tv } from '#/utils/tv';

const dialogStyles = tv({
  slots: {
    modal: 'bg-app',
    panel: 'focus:outline-none',
  },
  variants: {
    position: {
      left: {
        modal: 'flex h-dvh',
        panel: 'flex grow',
      },
    },
  },
});

const { modal, panel } = dialogStyles();

namespace Dialog {
  export interface Props extends DialogTriggerProps {}
}

export function Dialog({ ...props }: Dialog.Props) {
  return <DialogTrigger {...props} />;
}

namespace DialogPanel {
  export interface Props
    extends DialogProps,
      VariantProps<typeof dialogStyles> {
    width?: string;
  }
}

export function DialogPanel({
  className,
  position,
  width,
  ...props
}: DialogPanel.Props) {
  return (
    <ModalOverlay className="fixed inset-0 z-20 backdrop-blur-sm" isDismissable>
      <Modal className={modal({ position, className: width })}>
        <RACDialog className={panel({ position, className })} {...props} />
      </Modal>
    </ModalOverlay>
  );
}
