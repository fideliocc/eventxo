import Fulllayout from '../layouts/fulllayout.jsx'
import Register from '../views/register/register'
import Login from '../views/login/login'
import Landing from '../views/landing/landing'
import ProjectLayout from '../layouts/projectslayout'
import NotFound from '../layouts/notfound'

// TODO: Add Not-Found page
var indexRoutes = [
    { path: '/register', name: 'Register', component: Register },
    { path: '/login', name: 'Login', component: Login },
    { path: '/not-found', name: 'NotFound', component: NotFound },
    { path: '/projects', name: 'Projects', component: ProjectLayout, status: 'Private' },
    { path: '/:id', name: 'Starter', component: Fulllayout, status: 'Private' },
    { path: '/', name: 'Landing', component: Landing }
];

export default indexRoutes;
