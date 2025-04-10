import { NavLink } from 'react-router';
import { Todos } from './Todos/Todos';

export function AppNav() {
  return (
    <nav>
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/about" end>
        About
      </NavLink>
      <Todos />
    </nav>
  );
}
