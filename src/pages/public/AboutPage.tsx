import { Building2, Target, Eye, Heart, Users, Shield, BookOpen, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CONTACT_INFO } from '@/data/config';

const values = [
  {
    icon: Shield,
    title: 'Integrity',
    description: 'We uphold the highest standards of honesty and ethical behavior in all our dealings.',
  },
  {
    icon: Users,
    title: 'Respect',
    description: 'We treat all students with dignity and respect, regardless of their background.',
  },
  {
    icon: Heart,
    title: 'Compassion',
    description: 'We approach every situation with empathy and understanding.',
  },
  {
    icon: BookOpen,
    title: 'Excellence',
    description: 'We strive for excellence in student formation and discipline.',
  },
];

const services = [
  'Student Discipline and Welfare',
  'Good Moral Certificate Issuance',
  'Complaint Resolution',
  'Violation Documentation',
  'Community Service Coordination',
  'Student Counseling Referrals',
  'Policy Implementation',
  'Student Formation Programs',
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="py-20 bg-umak-blue">
        <div className="px-4 mx-auto max-w-7xl lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 text-umak-blue bg-umak-gold hover:bg-umak-gold-dark">
              About Us
            </Badge>
            <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl font-marcellus">
              Center for Student Formation
              <span className="block text-umak-gold">and Discipline</span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-white/80">
              Committed to fostering a safe, respectful, and disciplined learning environment 
              for all University of Makati students.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="px-4 mx-auto max-w-7xl lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-umak-blue">
                    <Target className="w-8 h-8 text-umak-gold" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-marcellus">
                    Our Mission
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  To develop responsible, disciplined, and morally upright students through 
                  comprehensive formation programs and fair discipline policies. We aim to create 
                  a campus environment that promotes respect, integrity, and academic excellence 
                  while nurturing the holistic development of every student.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-umak-gold">
                    <Eye className="w-8 h-8 text-umak-blue" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-marcellus">
                    Our Vision
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  To be a leading center for student formation and discipline that produces 
                  graduates who embody the University of Makati&apos;s core values of character, 
                  competence, and commitment to service. We envision a community where every 
                  student thrives in a safe, inclusive, and supportive environment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="px-4 mx-auto max-w-7xl lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-marcellus mb-4">
              Our Core Values
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
              These principles guide our actions and decisions in serving the UMak community.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title} className="card-hover text-center">
                <CardContent className="p-6">
                  <div className="inline-flex p-4 rounded-xl bg-umak-blue/10 dark:bg-umak-blue/20 mb-4">
                    <value.icon className="w-8 h-8 text-umak-blue" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="px-4 mx-auto max-w-7xl lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-marcellus mb-6">
                What We Do
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                The Center for Student Formation and Discipline provides a wide range of services 
                to support student welfare and maintain campus discipline. Our team is dedicated 
                to ensuring a conducive learning environment for all.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {services.map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
                  >
                    <Award className="w-5 h-5 text-umak-gold" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-umak-blue rounded-2xl transform rotate-3 opacity-10" />
              <Card className="relative">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Building2 className="w-12 h-12 text-umak-blue" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Contact Information
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">We&apos;re here to help</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Direct Line</p>
                      <p className="font-medium text-gray-900 dark:text-white">{CONTACT_INFO.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Cellphone</p>
                      <p className="font-medium text-gray-900 dark:text-white">{CONTACT_INFO.cellphone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900 dark:text-white">{CONTACT_INFO.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Office Hours</p>
                      <p className="font-medium text-gray-900 dark:text-white">Monday - Friday, 8:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-umak-blue">
        <div className="px-4 mx-auto max-w-4xl text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white font-marcellus mb-4">
            Need Assistance?
          </h2>
          <p className="text-white/80 mb-8">
            Our team is ready to assist you with any concerns regarding student discipline 
            and formation. Reach out to us through any of our channels.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-umak-blue bg-umak-gold hover:bg-umak-gold-dark rounded-lg transition-colors"
            >
              Our Services
            </a>
            <a
              href="/faqs"
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white border-2 border-white hover:bg-white/10 rounded-lg transition-colors"
            >
              View FAQs
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
