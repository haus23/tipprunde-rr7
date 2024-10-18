import { useSubmit } from 'react-router';

import { Button } from './ui/button/button';
import { Icon } from './ui/icon/icon';
import { Menu, MenuItem, MenuItems } from './ui/menu/menu';

export function UserMenu() {
  const submit = useSubmit();

  function handleAction(key: React.Key) {
    if (key === 'logout') {
      submit(null, { method: 'post', action: '/logout' });
    }
  }

  return (
    <Menu>
      <Button variant="ghost">
        <Icon name="user" />
      </Button>
      <MenuItems onAction={handleAction}>
        <MenuItem href="/manager">Manager</MenuItem>
        <MenuItem id="logout">Log Out</MenuItem>
      </MenuItems>
    </Menu>
  );
}
