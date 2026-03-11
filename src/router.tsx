import { createBrowserRouter } from 'react-router';
import RootLayout from './layout/RootLayout.tsx';
import Home from './pages/Home.tsx';
import CreatePost from './pages/CreatePost.tsx';
import UpdatePost from './pages/UpdatePost.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: 'create-post', Component: CreatePost },
      { path: 'update-post/:id', Component: UpdatePost },
    ],
  },
]);

export default router;
