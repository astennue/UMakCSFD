import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Menu, Sun, Moon, Facebook, Globe, Mail, Phone } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CONTACT_INFO } from '@/data/config';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Complaint', href: '/complaint' },
  { label: 'Disciplinary Records', href: '/disciplinary-records' },
  { label: 'About', href: '/about' },
  { label: 'FAQs', href: '/faqs' },
];

function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-umak-blue shadow-lg">
      <div className="flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
            <span className="text-lg font-bold text-umak-blue font-marcellus">U</span>
          </div>
          <span className="hidden text-sm font-semibold text-white sm:block font-marcellus lg:text-base">
            Center for Student Formation and Discipline
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm text-white/90 hover:text-umak-gold transition-colors rounded-md hover:bg-white/10"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-white hover:bg-white/10"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

          {/* Admin Login Link - Desktop */}
          <a
            href="/admin/login"
            className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-umak-blue bg-umak-gold hover:bg-umak-gold-dark rounded-md transition-colors"
          >
            Admin
          </a>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-umak-blue border-umak-blue-dark">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between pb-4 border-b border-white/20">
                  <span className="text-lg font-semibold text-white font-marcellus">Menu</span>
                </div>
                <nav className="flex flex-col gap-1 py-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-3 text-white/90 hover:text-umak-gold hover:bg-white/10 rounded-md transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                  <a
                    href="/admin/login"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 mt-2 text-center font-medium text-umak-blue bg-umak-gold hover:bg-umak-gold-dark rounded-md transition-colors"
                  >
                    Admin Login
                  </a>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold font-marcellus">Contact us</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`https://facebook.com/${CONTACT_INFO.facebook.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-umak-gold transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                  {CONTACT_INFO.facebook}
                </a>
              </li>
              <li>
                <a
                  href={`https://${CONTACT_INFO.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-umak-gold transition-colors"
                >
                  <Globe className="w-5 h-5" />
                  {CONTACT_INFO.website}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="flex items-center gap-2 text-gray-400 hover:text-umak-gold transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  {CONTACT_INFO.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* General Concern */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-umak-gold uppercase tracking-wider">
              For general concern
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Complaint Concern */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-umak-gold uppercase tracking-wider">
              For complaint concern
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.complaintEmail}`}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {CONTACT_INFO.complaintEmail}
                </a>
              </li>
            </ul>
          </div>

          {/* Good Moral Concern */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-umak-gold uppercase tracking-wider">
              For request of good moral certificate concern
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={`https://${CONTACT_INFO.goodMoralWebsite}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  {CONTACT_INFO.goodMoralWebsite}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.goodMoralEmail}`}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {CONTACT_INFO.goodMoralEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-gray-800">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} University of Makati - Center for Student Formation and Discipline. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">University of Makati. University of Character.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
