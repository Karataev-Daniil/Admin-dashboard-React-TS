export type User = {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'viewer' | 'manager';
  status: 'active' | 'inactive';
  createdAt: string;
  password: string;
};

export type RoleControlsProps = {
  role: 'all' | 'admin' | 'viewer' | 'manager'
  onRoleChange: (newRole: 'all' | 'admin' | 'viewer' | 'manager') => void
}

export type StatusControlsProps = {
  status: 'all' | 'active' | 'inactive'
  onStatusChange: (newStatus: 'all' | 'active' | 'inactive') => void
}

export type SortControlsProps = {
  sortBy: 'all' | 'name_asc' | 'name_desc' | 'date_asc' | 'date_desc'
  onSortChange: (newSortBy: 'all' | 'name_asc' | 'name_desc' | 'date_asc' | 'date_desc') => void
}

const mockUsers: User[] = [
  { id: 101, name: 'Alice Johnson', email: 'alice@example.com', role: 'admin',   status: 'active',   createdAt: '2024-01-15', password: '12345' },
  { id: 102, name: 'Bob Smith',     email: 'bob@example.com',   role: 'viewer',  status: 'inactive', createdAt: '2023-11-02', password: '12345' },
  { id: 103, name: 'Charlie Brown', email: 'charlie@example.com', role: 'manager', status: 'active', createdAt: '2024-03-08', password: '12345' },
  { id: 104, name: 'Diana Prince',  email: 'diana@example.com', role: 'admin',   status: 'active',   createdAt: '2024-02-21', password: '12345' },
  { id: 105, name: 'Ethan Hunt',    email: 'ethan@example.com', role: 'viewer',  status: 'inactive', createdAt: '2023-12-10', password: '12345' },
  { id: 106, name: 'Fiona Gallagher', email: 'fiona@example.com', role: 'manager', status: 'active', createdAt: '2024-04-01', password: '12345' },
  { id: 107, name: 'George Martin', email: 'george@example.com', role: 'viewer',  status: 'active',   createdAt: '2024-01-30', password: '12345' },
  { id: 108, name: 'Hannah Baker',  email: 'hannah@example.com', role: 'admin',   status: 'inactive', createdAt: '2023-10-18', password: '12345' },
  { id: 109, name: 'Ian Fleming',   email: 'ian@example.com',   role: 'manager', status: 'active',   createdAt: '2024-02-05', password: '12345' },
  { id: 110, name: 'Julia Roberts', email: 'julia@example.com', role: 'viewer',  status: 'active',   createdAt: '2024-03-25', password: '12345' },
];

export default mockUsers;