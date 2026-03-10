import { useState } from 'react';
import { Plus, Eye, Trash2, Shield, User, Key } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface AdminUser {
  id: string;
  username: string;
  name: string;
  email: string;
  role: 'superadmin' | 'director' | 'staff';
  password: string;
}

const initialUsers: AdminUser[] = [
  {
    id: '1',
    username: '@CSFDSARein03082026',
    name: 'Super Admin',
    email: 'superadmin@csfd.umak.edu.ph',
    role: 'superadmin',
    password: 'SuperAdmin@CSFD2026',
  },
  {
    id: '2',
    username: '@CSFDDIRPoms03082026',
    name: 'Admin Director',
    email: 'director@csfd.umak.edu.ph',
    role: 'director',
    password: 'Director@CSFD2026',
  },
  {
    id: '3',
    username: '@CSFDAS1SAM03082026',
    name: 'Admin CSFD Staff SAM',
    email: 'sam@csfd.umak.edu.ph',
    role: 'staff',
    password: 'StaffSAM@CSFD2026',
  },
  {
    id: '4',
    username: '@CSFDAS2ALMA03082026',
    name: 'Admin CSFD Staff ALMA',
    email: 'alma@csfd.umak.edu.ph',
    role: 'staff',
    password: 'StaffALMA@CSFD2026',
  },
];

const roleColors: Record<string, string> = {
  superadmin: 'bg-purple-500',
  director: 'bg-blue-500',
  staff: 'bg-green-500',
};

export default function UserManagement() {
  const { user } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    email: '',
    role: 'staff' as 'staff' | 'director',
    password: '',
  });

  // Only superadmin can access this page
  if (user?.role !== 'superadmin') {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Shield className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h2>
        <p className="text-gray-600 dark:text-gray-400">Only Super Admin can access this page.</p>
      </div>
    );
  }

  const handleCreateUser = () => {
    const userToAdd: AdminUser = {
      id: String(users.length + 1),
      ...newUser,
    };
    setUsers([...users, userToAdd]);
    setIsCreateDialogOpen(false);
    setNewUser({ name: '', username: '', email: '', role: 'staff', password: '' });
    toast.success('User created successfully!');
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((u) => u.id !== userId));
    toast.success('User deleted successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-marcellus">
            User Management
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage admin accounts and permissions.
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create User
        </Button>
      </div>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Username</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-umak-blue flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={roleColors[user.role]}>
                        {user.role === 'superadmin' ? 'Super Admin' : user.role === 'director' ? 'Director' : 'Staff'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" onClick={() => { setSelectedUser(user); setShowPassword(false); }}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        {user.role !== 'superadmin' && (
                          <Button size="sm" variant="ghost" className="text-red-500" onClick={() => handleDeleteUser(user.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Create User Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-marcellus">Create New User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="Enter full name"
              />
            </div>
            <div className="space-y-2">
              <Label>Username</Label>
              <Input
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                placeholder="@CSFD..."
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="email@umak.edu.ph"
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value as 'staff' | 'director' })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
              >
                <option value="staff">Staff</option>
                <option value="director">Director</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                placeholder="Enter password"
              />
            </div>
            <Button onClick={handleCreateUser} className="w-full">Create User</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View User Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-marcellus">User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 mt-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{selectedUser.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Username</p>
                <p className="font-medium">{selectedUser.username}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{selectedUser.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <Badge className={roleColors[selectedUser.role]}>
                  {selectedUser.role === 'superadmin' ? 'Super Admin' : selectedUser.role === 'director' ? 'Director' : 'Staff'}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-500">Password</p>
                <div className="flex items-center gap-2">
                  <code className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded">
                    {showPassword ? selectedUser.password : '••••••••••••'}
                  </code>
                  <Button size="sm" variant="ghost" onClick={() => setShowPassword(!showPassword)}>
                    <Key className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
