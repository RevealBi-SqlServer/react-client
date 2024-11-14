import { redirect } from 'react-router-dom';
import Viewer from './viewer/viewer';
import Editor from './editor/editor';
import BasicView from './basic-view/basic-view';
import Headers from './headers/headers';
import Themes from './themes/themes';
import CustomMenus from './custom-menus/custom-menus';

export const routes = [
  { index: true, loader: () => redirect('basic-view') },
  { path: 'basic-view', element: <BasicView />, text: 'Load Dashboard' },
  { path: 'viewer', element: <Viewer />, text: 'Dashboard Picker' },
  { path: 'editor', element: <Editor />, text: 'Create Dashboards' },
  { path: 'headers', element: <Headers />, text: 'Dynamic Customer Header' },
  { path: 'themes', element: <Themes />, text: 'Theme Switcher' },
  { path: 'custom-menus', element: <CustomMenus />, text: 'Custom Menus' }

];
