import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  AlertTriangle,
  Megaphone,
  Award,
  Users,
  Settings,
  LogOut,
  Menu,
  Sun,
  Moon,
  ChevronRight,
  BarChart3,
  ScrollText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet';

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Encode Violation', href: '/admin/encode-violation', icon: FileText },
  { label: 'Encode Complaint', href: '/admin/encode-complaint', icon: AlertTriangle },
  { label: 'Compose Announcement', href: '/admin/compose-announcement', icon: Megaphone },
  { label: 'GMC Requests', href: '/admin/gmc-requests', icon: Award },
  { label: 'Complaints', href: '/admin/complaints', icon: ScrollText },
  { label: 'Disciplinary Records', href: '/admin/disciplinary-records', icon: BarChart3 },
  { label: 'Certificate Templates', href: '/admin/certificate-templates', icon: Settings },
  { label: 'User Management', href: '/admin/users', icon: Users },
];

function Sidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 p-6 border-b border-white/10">
        <div className="flex items-center justify-center w-10 h-10 bg-umak-gold rounded-full">
          <span className="text-lg font-bold text-umak-blue font-marcellus">U</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">CSFD Admin</p>
          <p className="text-xs text-white/60">{user?.role === 'superadmin' ? 'Super Admin' : user?.role === 'director' ? 'Director' : 'Staff'}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-umak-gold text-umak-blue font-medium'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-white/10">
        <div className="mb-4 px-4">
          <p className="text-sm text-white/60">Logged in as</p>
          <p className="text-sm font-medium text-white">{user?.name}</p>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );

  if (isOpen !== undefined) {
    return <SidebarContent />;
  }

  return (
    <aside className="hidden lg:flex w-72 flex-col bg-umak-blue fixed inset-y-0 left-0 z-50">
      <SidebarContent />
    </aside>
  );
}

function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const currentPage = navItems.find((item) => item.href === location.pathname);

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white font-marcellus">
            {currentPage?.label || 'Dashboard'}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
}

export default function AdminLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-72 p-0 bg-umak-blue border-umak-blue">
          <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="lg:ml-72">
        <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
