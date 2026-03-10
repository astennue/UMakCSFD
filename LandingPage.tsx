import { useState } from 'react';
import { Send, X, Upload, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface AnnouncementFormData {
  subject: string;
  details: string;
  postedFrom: string;
  postedTo: string;
  dateFrom: string;
  dateTo: string;
}

const initialFormData: AnnouncementFormData = {
  subject: '',
  details: '',
  postedFrom: '',
  postedTo: '',
  dateFrom: '',
  dateTo: '',
};

export default function ComposeAnnouncement() {
  const [formData, setFormData] = useState<AnnouncementFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (field: keyof AnnouncementFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast.success('Announcement posted successfully!');
    setFormData(initialFormData);
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-marcellus">
          Compose Announcement
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Create and publish a new announcement for students.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent className="p-8 space-y-8">
            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject">
                Subject <span className="text-red-500">*</span>
              </Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => updateFormData('subject', e.target.value)}
                placeholder="Enter announcement headline"
                required
              />
            </div>

            {/* Details */}
            <div className="space-y-2">
              <Label htmlFor="details">
                Details <span className="text-red-500">*</span>
              </Label>
              <textarea
                id="details"
                value={formData.details}
                onChange={(e) => updateFormData('details', e.target.value)}
                placeholder="Provide the details of the announcement..."
                className="w-full min-h-[200px] px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-umak-blue focus:border-transparent outline-none transition-all resize-y"
                required
              />
            </div>

            {/* Date Range */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <Label>Posted From *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="date"
                    value={formData.dateFrom}
                    onChange={(e) => updateFormData('dateFrom', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-4">
                <Label>Posted To *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="date"
                    value={formData.dateTo}
                    onChange={(e) => updateFormData('dateTo', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Posted By/To */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="postedFrom">Posted By</Label>
                <Input
                  id="postedFrom"
                  value={formData.postedFrom}
                  onChange={(e) => updateFormData('postedFrom', e.target.value)}
                  placeholder="e.g., CSFD Director"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postedTo">Posted To</Label>
                <Input
                  id="postedTo"
                  value={formData.postedTo}
                  onChange={(e) => updateFormData('postedTo', e.target.value)}
                  placeholder="e.g., All Students"
                />
              </div>
            </div>

            {/* Attachments */}
            <div className="space-y-2">
              <Label>Attachments (Optional)</Label>
              <div className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center">
                <Upload className="w-8 h-8 mx-auto mb-3 text-gray-400" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  Supported: PDF, DOC, DOCX, JPG, PNG (Max 5MB)
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormData(initialFormData)}
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-umak-blue hover:bg-umak-blue-light"
              >
                {isSubmitting ? 'Posting...' : 'Post'}
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
