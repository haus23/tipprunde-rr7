import { useEffect, useState } from 'react';
import { Button } from '#/components/ui/button/button';
import { Dialog, DialogPanel } from '#/components/ui/dialog/dialog';
import { Icon } from '#/components/ui/icon/icon';

import { LinkContext } from 'react-aria-components';
import { ManagerNav } from './manager-nav';

export function ManagerHeader() {
  const [isOpen, setOpen] = useState(false);

  function handleOpenChange(isOpen: boolean) {
    // Fix for: open click triggers immediatly the underlying home link
    setTimeout(() => setOpen(isOpen), 50);
  }

  useEffect(() => {
    function closeDialog(ev: MediaQueryListEvent) {
      ev.matches && setOpen(false);
    }

    const query = window.matchMedia('(min-width: 768px)');

    query.addEventListener('change', closeDialog);
    return () => query.removeEventListener('change', closeDialog);
  }, []);

  function closeOnClick() {
    setOpen(false);
  }

  return (
    <div>
      <div className="fixed inset-y-0 hidden w-52 border-r shadow-xl md:flex dark:border-0">
        <ManagerNav />
      </div>
      <div className="fixed inset-x-0 flex h-14 items-center gap-x-2 bg-content px-2 md:left-52">
        <div className="md:hidden">
          <Dialog isOpen={isOpen} onOpenChange={handleOpenChange}>
            <Button variant="ghost">
              <Icon name="menu" />
            </Button>
            <DialogPanel
              className="relative border-r shadow-xl dark:border-0"
              position="left"
              width="w-52"
            >
              {({ close }) => (
                <>
                  <Button
                    onPress={close}
                    variant="ghost"
                    className="absolute top-3 right-2"
                  >
                    <Icon name="x" />
                  </Button>
                  <LinkContext.Provider value={{ onPress: closeOnClick }}>
                    <ManagerNav />
                  </LinkContext.Provider>
                </>
              )}
            </DialogPanel>
          </Dialog>
        </div>
        <h1 className="grow text-2xl">Verwaltung</h1>
        <div>
          <Button variant="ghost">
            <Icon name="moon" />
          </Button>
        </div>
      </div>
    </div>
  );
}
