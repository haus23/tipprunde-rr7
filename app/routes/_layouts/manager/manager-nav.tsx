import { Form, Link, NavLink } from 'react-router';
import { Logo } from '#/components/logo';
import { Button } from '#/components/ui';

export function ManagerNav() {
  return (
    <div className="flex grow flex-col overflow-y-auto">
      <div className="p-2">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="flex grow flex-col gap-y-2 p-2">
        <NavLink to="/manager">Dashboard</NavLink>
        <NavLink to="/manager/hr2425">Turnier</NavLink>
        <NavLink to="/manager/hr2425/spiele">Spiele</NavLink>
        <NavLink to="/manager/hr2425/tipps">Tipps</NavLink>
        <NavLink to="/manager/hr2425/ergebnisse">Ergebnisse</NavLink>
        <NavLink to="/manager/hr2425/zusatzpunkte">Zusatzpunkte</NavLink>
        <NavLink to="/manager/sync">Synchronisierung</NavLink>
      </div>
      <div>
        <h3 className="pb-2 pl-4">Stammdaten</h3>
        <div className="flex flex-col gap-y-2 border-t p-2">
          <NavLink to="/manager/turniere">Turniere</NavLink>
          <NavLink to="/manager/spieler">Spieler</NavLink>
          <NavLink to="/manager/teams">Teams</NavLink>
          <NavLink to="/manager/ligen">Ligen</NavLink>
          <NavLink to="/manager/regelwerke">Regelwerke</NavLink>
        </div>
      </div>
      <Form action="/logout" method="post" className="border-t p-2">
        <Button type="submit" className="p-0">
          Logs Out
        </Button>
      </Form>
    </div>
  );
}
