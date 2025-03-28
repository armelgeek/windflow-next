import { Icons } from "@/components/ui/icons";

const kAppName = "Windflow";
const kAppAbbr = "W";
const kAppTagline = "The visual builder for developers";
const kAppDescription = `The visual builder for developers.`;

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;


export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/d',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: []
  },
  {
    title: 'Projects',
    url: '/d/master/project',
    icon: 'post',
    shortcut: ['p', 'p'],
    isActive: false,
    items: []
  }
];

export { kAppName, kAppAbbr, kAppTagline, kAppDescription };
