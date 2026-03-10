import { useState } from 'react';
import { Search, HelpCircle, ChevronDown, MessageCircle, Phone, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FAQS } from '@/data/config';

export default function FAQsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFAQs = FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="py-16 bg-umak-blue">
        <div className="px-4 mx-auto max-w-4xl text-center lg:px-8">
          <Badge className="mb-4 text-umak-blue bg-umak-gold hover:bg-umak-gold-dark">
            Help Center
          </Badge>
          <h1 className="mb-6 text-4xl font-bold text-white font-marcellus">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-white/80 mb-8">
            Find answers to common questions about CSFD services and procedures.
          </p>
          
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for answers..."
              className="pl-12 py-6 text-lg bg-white dark:bg-gray-800 border-0 shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* FAQs List */}
      <section className="py-16">
        <div className="px-4 mx-auto max-w-3xl lg:px-8">
          {filteredFAQs.length > 0 ? (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all ${
                    openIndex === index ? 'ring-2 ring-umak-blue' : ''
                  }`}
                  onClick={() => toggleFAQ(index)}
                >
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-umak-blue/10 dark:bg-umak-blue/20">
                            <HelpCircle className="w-5 h-5 text-umak-blue" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {faq.question}
                          </h3>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-400 transition-transform ${
                            openIndex === index ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                      {openIndex === index && (
                        <div className="mt-4 pl-14">
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No results found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search terms or contact us directly.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="px-4 mx-auto max-w-4xl text-center lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-marcellus mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Can&apos;t find the answer you&apos;re looking for? Please contact our team for assistance.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <a
              href="tel:8883-1875"
              className="flex flex-col items-center gap-3 p-6 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <Phone className="w-8 h-8 text-umak-blue" />
              <span className="font-medium text-gray-900 dark:text-white">Call Us</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">8883-1875</span>
            </a>
            <a
              href="mailto:csfd@umak.edu.ph"
              className="flex flex-col items-center gap-3 p-6 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <Mail className="w-8 h-8 text-umak-blue" />
              <span className="font-medium text-gray-900 dark:text-white">Email Us</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">csfd@umak.edu.ph</span>
            </a>
            <a
              href="/complaint"
              className="flex flex-col items-center gap-3 p-6 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <MessageCircle className="w-8 h-8 text-umak-blue" />
              <span className="font-medium text-gray-900 dark:text-white">File a Complaint</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">Get support</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
