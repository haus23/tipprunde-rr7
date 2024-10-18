import { Form, Link } from 'react-router';

import { Logo } from '#/components/logo';
import { Button } from '#/components/ui/button/button';
import { Icon } from '#/components/ui/icon/icon';
import { NavLink } from '#/components/ui/link/link';

export function ManagerNav() {
  return (
    <div className="flex grow flex-col overflow-y-auto">
      <div className="flex h-14 items-center border-transparent border-b px-2">
        <Link className="my-2" to="/">
          <Logo />
        </Link>
      </div>
      <div className="flex grow flex-col gap-y-2 p-2">
        <NavLink to="/manager" end variant="menuitem">
          <Icon name="house">Dashboard</Icon>
        </NavLink>
        <NavLink to="/manager/hr2425" end variant="menuitem">
          <Icon name="folder">Turnier</Icon>
        </NavLink>
        <NavLink to="/manager/hr2425/spiele" variant="menuitem">
          <Icon name="calendar">Spiele</Icon>
        </NavLink>
        <NavLink to="/manager/hr2425/tipps" variant="menuitem">
          <Icon name="dices">Tipps</Icon>
        </NavLink>
        <NavLink to="/manager/hr2425/ergebnisse" variant="menuitem">
          <Icon name="scale">Ergebnisse</Icon>
        </NavLink>
        <NavLink to="/manager/hr2425/zusatzpunkte" variant="menuitem">
          <Icon name="smile-plus">Zusatzpunkte</Icon>
        </NavLink>
        <NavLink to="/manager/sync" variant="menuitem">
          <Icon name="folder-sync">Synchronisierung</Icon>
        </NavLink>
      </div>
      <div className="mt-4">
        <h3 className="pb-2 pl-4 font-medium text-app/50">Stammdaten</h3>
        <div className="flex flex-col gap-y-2 border-t p-2">
          <NavLink to="/manager/turniere" variant="menuitem">
            <Icon name="folders">Turniere</Icon>
          </NavLink>
          <NavLink to="/manager/spieler" variant="menuitem">
            <Icon name="users">Spieler</Icon>
          </NavLink>
          <NavLink to="/manager/teams" variant="menuitem">
            <Icon name="shield">Teams</Icon>
          </NavLink>
          <NavLink to="/manager/ligen" variant="menuitem">
            <Icon name="trophy">Ligen</Icon>
          </NavLink>
          <NavLink to="/manager/regelwerke" variant="menuitem">
            <Icon name="pilcrow">Regelwerke</Icon>
          </NavLink>
        </div>
      </div>
      <Form
        action="/logout"
        method="post"
        className="flex flex-col border-t p-2"
      >
        <Button type="submit" variant="menuitem">
          <Icon name="log-out">Log Out</Icon>
        </Button>
      </Form>
    </div>
  );
}
