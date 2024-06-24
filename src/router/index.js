import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/DashboardView.vue';
import LogInView from '../views/LogInView.vue';
import AdminView from '../views/AdminView.vue';
import AddAdminView from '../views/admins/AddView.vue';
import EditAdmin from '../views/admins/EditView.vue';
import ShowUser from '../views/admins/ShowUserView.vue';
import UserView from '../views/UserView.vue';
import AddUser from '../views/users/AddView.vue';
import PlantByUser from '../views/users/PlantByUserView.vue';
import EditUser from '../views/users/EditView.vue';
import PlantsView from '../views/PlantsView.vue';
import Cookies from 'js-cookie';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LogInView,
    },
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
    },
    
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/add',
      name: 'AddAdmin',
      component: AddAdminView,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/:id/edit',
      name: 'EditAdmin',
      component: EditAdmin,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/:id',
      name: 'ShowUser',
      component: ShowUser,
      meta: { requiresAuth: true }
    },
    {
      path: '/users',
      name: 'user',
      component: UserView,
      meta: { requiresAuth: true }
    },
    {
      path: '/users/add',
      name: 'AddUser',
      component: AddUser,
      meta: { requiresAuth: true }
    },
    {
      path: '/user/:id',
      name: 'PlantByUser',
      component: PlantByUser,
      meta: { requiresAuth: true }
    },
    {
      path: '/user/:id/edit',
      name: 'EditUser',
      component: EditUser,
      meta: { requiresAuth: true }
    },
    {
      path: '/plants',
      name: 'plants',
      component: PlantsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
});
router.beforeEach((to, from, next) => {
  const token = Cookies.get('token');
  const isAuthenticated = !!token; // Check if token exists in cookies
  console.log("isAuthenticated=>",isAuthenticated)

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Redirect to login if authentication is required but token is not present
    if (!isAuthenticated) {
      next('/login');
    } else {
      next();
    }
  } else if (to.path === '/' && !isAuthenticated) {
    next('/login');
  
  } else if (to.path === '/login' && isAuthenticated) {
    // Redirect to dashboard if already authenticated and trying to access login
    next('/');
  } else {
    next(); // Continue navigation
  }
});

export default router;
