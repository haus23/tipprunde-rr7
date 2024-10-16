import { useSubmit } from 'react-router';
import { Button, Menu, MenuItem, MenuItems } from './ui';
import { Icon } from './ui/icon/icon';

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
