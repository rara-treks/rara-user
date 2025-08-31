export interface DropdownItem {
  id: string;
  label: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  slug?: string;
  dropdownItems?: DropdownItem[];
}
