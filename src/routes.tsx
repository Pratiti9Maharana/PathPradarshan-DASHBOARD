import { createBrowserRouter } from 'react-router';
import Root from './layouts/Root';
import Dashboard from './pages/Dashboard';
import NetworkAnalysis from './pages/NetworkAnalysis';
import Simulation from './pages/Simulation';
import TopologicalHealing from './pages/TopologicalHealing';
import Planning from './pages/Planning';
import Reports from './pages/Reports';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
      { path: 'network', Component: NetworkAnalysis },
      { path: 'simulation', Component: Simulation },
      { path: 'healing', Component: TopologicalHealing },
      { path: 'planning', Component: Planning },
      { path: 'reports', Component: Reports },
    ],
  },
]);
