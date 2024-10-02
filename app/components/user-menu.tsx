import { Button, Menu, MenuItem, MenuItems } from './ui';
import { Icon } from './ui/icon/icon';

export function UserMenu() {
  return (
    <Menu>
      <Button>
        <Icon name="user" />
      </Button>
      <MenuItems>
        <MenuItem href="/manager">Manager</MenuItem>
        <MenuItem href="/logout">Log Out</MenuItem>
      </MenuItems>
    </Menu>
  );
}
