export type MenuItem = {
  label: string;
  href: string;
  icon?: string;
  roles?: string[];
  children?: Omit<MenuItem, 'children'>[];
};

export const menuStructure: MenuItem[] = [
  {
    label: 'start',
    href: '/start',
    icon: 'HomeIcon'
  },
  /*
  {
    label: 'projects',
    href: '/projects',
    icon: 'BriefcaseIcon',
    children: [
      { label: 'newProject', href: '/projects/new', roles: ['client'] }
    ]
  },*/
  {
    label: 'workTypes',
    href: '/work-types',
    icon: 'HardHatIcon',
    children: [
      { label: 'newWorkType',
        icon: 'PlusIcon',
        href: '/work-types/new', roles: ['admin'] }
    ]
  },
  {
    label: 'users',
    href: '/users',
    icon: 'UsersIcon',
    roles: ['admin']
  }
];