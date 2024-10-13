import { Form, Link } from 'react-router';
import { Logo } from '#/components/logo';
import { Button, NavLink } from '#/components/ui';

export function ManagerNav() {
  return (
    <div className="flex grow flex-col overflow-y-auto">
      <div className="p-2">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="flex grow flex-col gap-y-2 p-2">
        <NavLink to="/manager" end variant="menuitem">
          Dashboard
        </NavLink>
        <NavLink to="/manager/hr2425" end variant="menuitem">
          Turnier
        </NavLink>
        <NavLink to="/manager/hr2425/spiele" variant="menuitem">
          Spiele
        </NavLink>
        <NavLink to="/manager/hr2425/tipps" variant="menuitem">
          Tipps
        </NavLink>
        <NavLink to="/manager/hr2425/ergebnisse" variant="menuitem">
          Ergebnisse
        </NavLink>
        <NavLink to="/manager/hr2425/zusatzpunkte" variant="menuitem">
          Zusatzpunkte
        </NavLink>
        <NavLink to="/manager/sync" variant="menuitem">
          Synchronisierung
        </NavLink>
      </div>
      <div>
        <h3 className="pb-2 pl-4 font-medium text-app/50">Stammdaten</h3>
        <div className="flex flex-col gap-y-2 border-t p-2">
          <NavLink to="/manager/turniere" variant="menuitem">
            Turniere
          </NavLink>
          <NavLink to="/manager/spieler" variant="menuitem">
            Spieler
          </NavLink>
          <NavLink to="/manager/teams" variant="menuitem">
            Teams
          </NavLink>
          <NavLink to="/manager/ligen" variant="menuitem">
            Ligen
          </NavLink>
          <NavLink to="/manager/regelwerke" variant="menuitem">
            Regelwerke
          </NavLink>
        </div>
      </div>
      <Form
        action="/logout"
        method="post"
        className="flex flex-col border-t p-2"
      >
        <Button type="submit" variant="menuitem">
          Log Out
        </Button>
      </Form>
    </div>
  );
}
