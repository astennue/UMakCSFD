import { useState } from 'react';
import { Megaphone, Calendar, ArrowRight, FileText, AlertTriangle, Users, CheckCircle, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { Announcement } from '@/types';

// Sample announcements data
const sampleAnnouncements: Announcement[] = [
  {
    id: '1',
    headline: 'Important: New Dress Code Policy Effective Next Semester',
    details: 'The University of Makati will be implementing a new dress code policy starting next semester. All students are required to wear the prescribed uniform. Please refer to the student handbook for more details.',
    postedFrom: '2026-01-15',
    postedTo: '2026-06-30',
    dateFrom: '2026-01-15',
    dateTo: '2026-06-30',
    createdAt: '2026-01-15',
    createdBy: 'CSFD Director',
  },
  {
    id: '2',
    headline: 'Good Moral Certificate Processing Schedule',
    details: 'Good Moral Certificate requests will be processed every Tuesday and Thursday. Please submit your requests at least 3 working days before your deadline.',
    postedFrom: '2026-02-01',
    postedTo: '2026-12-31',
    dateFrom: '2026-02-01',
    dateTo: '2026-12-31',
    createdAt: '2026-02-01',
    createdBy: 'CSFD Staff',
  },
  {
    id: '3',
    headline: 'Community Service Opportunities Available',
    details: 'Students who need to render community service as part of their disciplinary sanction may inquire at the CSFD office. Various opportunities are available within the university.',
    postedFrom: '2026-03-01',
    postedTo: '2026-05-31',
    dateFrom: '2026-03-01',
    dateTo: '2026-05-31',
    createdAt: '2026-03-01',
    createdBy: 'CSFD Staff',
  },
];

const services = [
  {
    title: 'Good Moral Certificate',
    description: 'Request a certificate of good moral character for scholarship, employment, or transfer purposes.',
    icon: FileText,
    href: '/services/good-moral',
    color: 'bg-blue-500',
  },
  {
    title: 'Uniform Exemption',
    description: 'Apply for uniform exemption for valid medical or religious reasons.',
    icon: CheckCircle,
    href: '/services/uniform-exemption',
    color: 'bg-green-500',
  },
  {
    title: 'Child Admission',
    description: 'Request permission to bring your child to campus for valid reasons.',
    icon: Users,
    href: '/services/child-admission',
    color: 'bg-purple-500',
  },
  {
    title: 'Cross-Dressing Request',
    description: 'Submit a request for cross-dressing accommodation.',
    icon: Users,
    href: '/services/cross-dressing',
    color: 'bg-pink-500',
  },
  {
    title: 'File a Complaint',
    description: 'Report incidents or file complaints regarding student welfare and discipline.',
    icon: AlertTriangle,
    href: '/complaint',
    color: 'bg-red-500',
  },
  {
    title: 'Disciplinary Records',
    description: 'View your disciplinary records and violation history.',
    icon: FileText,
    href: '/disciplinary-records',
    color: 'bg-orange-500',
  },
];

export default function LandingPage() {
  const [announcements] = useState<Announcement[]>(sampleAnnouncements);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-umak-blue">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-umak-gold/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-umak-gold/10 rounded-full blur-3xl" />
        
        <div className="relative px-4 mx-auto max-w-7xl lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 text-umak-blue bg-umak-gold hover:bg-umak-gold-dark">
              University of Makati
            </Badge>
            <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl font-marcellus">
              Center for Student Formation
              <span className="block text-umak-gold">and Discipline</span>
            </h1>
            <p className="max-w-2xl mx-auto mb-8 text-lg text-white/80">
              University of Makati. University of Character.
            </p>
            <p className="max-w-3xl mx-auto mb-10 text-white/70">
              The CSFD is committed to fostering a safe, respectful, and disciplined learning environment 
              for all students. Access our services, file complaints, and request documents online.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/services">
                <Button size="lg" className="bg-umak-gold text-umak-blue hover:bg-umak-gold-dark font-semibold">
                  Our Services
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <a href="/complaint">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  File a Complaint
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="px-4 mx-auto max-w-7xl lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-lg bg-umak-blue">
              <Megaphone className="w-6 h-6 text-umak-gold" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-marcellus">
              Announcements
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {announcements.map((announcement) => (
              <Card
                key={announcement.id}
                className="cursor-pointer card-hover border-l-4 border-l-umak-blue"
                onClick={() => setSelectedAnnouncement(announcement)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {new Date(announcement.postedFrom).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                    {announcement.headline}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                    {announcement.details}
                  </p>
                  <div className="flex items-center gap-2 mt-4 text-sm font-medium text-umak-blue dark:text-umak-gold">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="px-4 mx-auto max-w-7xl lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white font-marcellus">
              Our Services
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
              Access various CSFD services online. Click on any service to get started.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <a key={service.title} href={service.href}>
                <Card className="h-full card-hover">
                  <CardContent className="p-6">
                    <div className={`inline-flex p-3 rounded-lg ${service.color} mb-4`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-umak-blue">
        <div className="px-4 mx-auto max-w-7xl lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-white/10">
                <Phone className="w-8 h-8 text-umak-gold" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">Contact Us</h3>
              <p className="text-white/70">
                Direct Line: 8883-1875<br />
                Cellphone: 0995 822 5262
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-white/10">
                <Calendar className="w-8 h-8 text-umak-gold" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">Office Hours</h3>
              <p className="text-white/70">
                Monday - Friday<br />
                8:00 AM - 5:00 PM
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-white/10">
                <Mail className="w-8 h-8 text-umak-gold" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">Email Us</h3>
              <p className="text-white/70">
                csfd@umak.edu.ph<br />
                csfdgoodmoralcertificate@gmail.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Announcement Dialog */}
      <Dialog open={!!selectedAnnouncement} onOpenChange={() => setSelectedAnnouncement(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-marcellus">
              {selectedAnnouncement?.headline}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>Posted: </span>
              {selectedAnnouncement && new Date(selectedAnnouncement.postedFrom).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {selectedAnnouncement?.details}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
