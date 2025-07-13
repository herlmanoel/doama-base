export const ROUTES = {
  home: {
    name: 'Home',
    path: '/',
    description: 'Página inicial do sistema'
  },
  login: {
    name: 'Login',
    path: '/login',
    description: 'Autenticação de usuários'
  },
  dashboard: {
    name: 'Dashboard',
    path: '/dashboard',
    description: 'Área principal do sistema após login',
    children: {
      kanban: {
        name: 'Kanban',
        path: '/dashboard/kanban',
        description: 'Quadro visual de tarefas'
      },
      overview: {
        name: 'Overview',
        path: '/dashboard/overview',
        description: 'Resumo geral e métricas'
      },
      product: {
        name: 'Product',
        path: '/dashboard/product',
        description: 'Gestão de produtos ou itens'
      },
      profile: {
        name: 'Profile',
        path: '/dashboard/profile',
        description: 'Informações do usuário e configurações'
      }
    }
  }
} as const;
