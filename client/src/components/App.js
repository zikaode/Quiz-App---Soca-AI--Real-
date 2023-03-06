import '../styles/App.css';
import NavBar from './NavBar'
import Main from './Main'
import Quiz from './Quiz'
import Result from './Result'
import Editor from './Editor'
import EditorQuestion from './EditorQuestion'

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
const router = createBrowserRouter([
  {
    path: '/',
    element: <><NavBar /><Main /></>
  }, {
    path: '/quiz',
    element: <Navigate to="/" />
  }, {
    path: '/quiz/:id',
    element: <><NavBar /><Quiz /></>
  }, {
    path: '/result',
    element: <><NavBar /><Result /></>
  }, {
    path: '/editor',
    element: <><NavBar /><Editor /></>
  }, {
    path: '/editor/quiz/:id',
    element: <><NavBar /><EditorQuestion /></>
  }
]);

function App() {
  return (
    <div className='container mt-3'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
