import Tiptap from './Tiptap'
import { Routes, Route } from 'react-router-dom';
import Menu from './Menu';
import DnDExample from './drag-and-drop-example';

export default function App() {
  return (
    <div>
      <Menu />
      <Routes>
        <Route path='/' element={<p>Choose an example</p>} />
        <Route path='basic' element={<Tiptap />} />
        <Route path='dnd' element={<DnDExample />} />
      </Routes>
    </div>
  );
}
