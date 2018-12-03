import HomePage from './pages/home.vue';
import CreatePartyPage from './pages/create-party.vue';

export default [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/create-party',
    component: CreatePartyPage
  },
  {
    path: '(.*)',
    component: HomePage
  }
];
