import { FileText, CheckCircle, Users, AlertTriangle, FileCheck, Shirt, Baby } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const services = [
  {
    title: 'Good Moral Certificate Request',
    description: 'Request a certificate of good moral character for various purposes such as scholarship applications, employment requirements, admission to other universities, or CCA requirements.',
    icon: FileCheck,
    href: '/services/good-moral',
    color: 'bg-blue-500',
    features: [
      'For Current Students',
      'For Graduates',
      'For Previous Students',
      'Online tracking available',
    ],
  },
  {
    title: 'Uniform Exemption Request',
    description: 'Apply for uniform exemption if you have valid medical conditions or religious reasons that prevent you from wearing the prescribed school uniform.',
    icon: Shirt,
    href: '/services/uniform-exemption',
    color: 'bg-green-500',
    features: [
      'Medical exemptions',
      'Religious accommodations',
      'Temporary exemptions',
      'Requires supporting documents',
    ],
  },
  {
    title: 'Child Admission Request',
    description: 'Request permission to bring your child to campus for valid reasons. This service is available for students who need to care for their children during class hours.',
    icon: Baby,
    href: '/services/child-admission',
    color: 'bg-purple-500',
    features: [
      'Temporary child admission',
      'Requires valid reason',
      'Subject to approval',
      'Safety guidelines apply',
    ],
  },
  {
    title: 'Cross-Dressing Request',
    description: 'Submit a request for cross-dressing accommodation. CSFD respects gender identity and expression and provides support for students who need this accommodation.',
    icon: Users,
    href: '/services/cross-dressing',
    color: 'bg-pink-500',
    features: [
      'Gender identity accommodation',
      'Confidential processing',
      'Respectful handling',
      'Support services available',
    ],
  },
];

const otherServices = [
  {
    title: 'File a Complaint',
    description: 'Report incidents, violations, or file complaints regarding student welfare and discipline matters.',
    icon: AlertTriangle,
    href: '/complaint',
    color: 'bg-red-500',
  },
  {
    title: 'Disciplinary Records',
    description: 'View your disciplinary records and check your violation history.',
    icon: FileText,
    href: '/disciplinary-records',
    color: 'bg-orange-500',
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="px-4 mx-auto max-w-7xl lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <Badge className="mb-4 text-umak-blue bg-umak-gold hover:bg-umak-gold-dark">
            iCSFD Services
          </Badge>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white font-marcellus">
            Our Services
          </h1>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            Access various CSFD services online. All requests are processed within 3-5 working days.
            Click on any service to get started.
          </p>
        </div>

        {/* Main Services */}
        <div className="grid gap-8 mb-12 md:grid-cols-2">
          {services.map((service) => (
            <a key={service.title} href={service.href}>
              <Card className="h-full card-hover">
                <CardContent className="p-8">
                  <div className={`inline-flex p-4 rounded-xl ${service.color} mb-6`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                    {service.title}
                  </h2>
                  <p className="mb-6 text-gray-600 dark:text-gray-400">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        {/* Other Services */}
        <div className="mb-8">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white font-marcellus">
            Other Services
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {otherServices.map((service) => (
              <a key={service.title} href={service.href}>
                <Card className="card-hover">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className={`inline-flex p-3 rounded-lg ${service.color} shrink-0`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {service.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="p-8 text-center rounded-2xl bg-umak-blue">
          <h2 className="mb-4 text-2xl font-bold text-white font-marcellus">
            Need Help?
          </h2>
          <p className="max-w-xl mx-auto mb-6 text-white/80">
            If you have any questions or need assistance with any of our services, 
            please don&apos;t hesitate to contact us.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:8883-1875"
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-umak-blue bg-umak-gold hover:bg-umak-gold-dark rounded-lg transition-colors"
            >
              Call Us: 8883-1875
            </a>
            <a
              href="mailto:csfd@umak.edu.ph"
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white border-2 border-white hover:bg-white/10 rounded-lg transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
