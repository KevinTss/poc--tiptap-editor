import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <div>
      <Link to='/basic'>Basic</Link>
      <Link to='/dnd'>DnD</Link>
    </div>
  );
}
