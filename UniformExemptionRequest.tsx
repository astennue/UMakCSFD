import { useState } from 'react';
import { Save, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { dropdownConfig } from '@/data/config';

interface ComplaintFormData {
  subject: string;
  category: string;
  complainantName: string;
  complainantStudentNumber: string;
  complainantCollege: string;
  complainantEmail: string;
  respondentName: string;
  respondentStudentNumber: string;
  respondentCollege: string;
  detailedDescription: string;
  dateOfIncident: string;
  location: string;
}

const initialFormData: ComplaintFormData = {
  subject: '',
  category: '',
  complainantName: '',
  complainantStudentNumber: '',
  complainantCollege: '',
  complainantEmail: '',
  respondentName: '',
  respondentStudentNumber: '',
  respondentCollege: '',
  detailedDescription: '',
  dateOfIncident: '',
  location: '',
};

export default function EncodeComplaint() {
  const [formData, setFormData] = useState<ComplaintFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (field: keyof ComplaintFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const complaintNumber = `COMP-${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`;
    toast.success('Complaint encoded successfully!', {
      description: `Complaint number: ${complaintNumber}`,
    });
    setFormData(initialFormData);
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-marcellus">
          Encode Complaint
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Record a new complaint filed by a student.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="bg-umak-blue dark:bg-gray-800">
          <CardContent className="p-8 space-y-8">
            {/* Complaint Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Complaint Details</h3>
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-white">
                  Complaint Subject <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => updateFormData('subject', e.target.value)}
                  placeholder="Enter complaint subject/title"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-white">
                  Category <span className="text-red-400">*</span>
                </Label>
                <Select value={formData.category} onValueChange={(value) => updateFormData('category', value)}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Major">Major</SelectItem>
                    <SelectItem value="Minor">Minor</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Complainant Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Complainant Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="complainantName" className="text-white">Full Name *</Label>
                  <Input
                    id="complainantName"
                    value={formData.complainantName}
                    onChange={(e) => updateFormData('complainantName', e.target.value)}
                    placeholder="Enter complainant's name"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="complainantStudentNumber" className="text-white">Student Number *</Label>
                  <Input
                    id="complainantStudentNumber"
                    value={formData.complainantStudentNumber}
                    onChange={(e) => updateFormData('complainantStudentNumber', e.target.value)}
                    placeholder="e.g., K12042424"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="complainantCollege" className="text-white">College/Institute *</Label>
                  <Select value={formData.complainantCollege} onValueChange={(value) => updateFormData('complainantCollege', value)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select college" />
                    </SelectTrigger>
                    <SelectContent>
                      {dropdownConfig.colleges.map((college) => (
                        <SelectItem key={college} value={college}>{college}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="complainantEmail" className="text-white">Email Address *</Label>
                  <Input
                    id="complainantEmail"
                    type="email"
                    value={formData.complainantEmail}
                    onChange={(e) => updateFormData('complainantEmail', e.target.value)}
                    placeholder="email@umak.edu.ph"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Respondent Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Respondent Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="respondentName" className="text-white">Full Name *</Label>
                  <Input
                    id="respondentName"
                    value={formData.respondentName}
                    onChange={(e) => updateFormData('respondentName', e.target.value)}
                    placeholder="Enter respondent's name"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="respondentStudentNumber" className="text-white">Student Number *</Label>
                  <Input
                    id="respondentStudentNumber"
                    value={formData.respondentStudentNumber}
                    onChange={(e) => updateFormData('respondentStudentNumber', e.target.value)}
                    placeholder="e.g., K12042424"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="respondentCollege" className="text-white">College/Institute *</Label>
                <Select value={formData.respondentCollege} onValueChange={(value) => updateFormData('respondentCollege', value)}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select college" />
                  </SelectTrigger>
                  <SelectContent>
                    {dropdownConfig.colleges.map((college) => (
                      <SelectItem key={college} value={college}>{college}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Incident Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Incident Details</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="dateOfIncident" className="text-white">Date of Incident *</Label>
                  <Input
                    id="dateOfIncident"
                    type="date"
                    value={formData.dateOfIncident}
                    onChange={(e) => updateFormData('dateOfIncident', e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-white">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => updateFormData('location', e.target.value)}
                    placeholder="e.g., Classroom, Oval"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="detailedDescription" className="text-white">Detailed Description *</Label>
                <textarea
                  id="detailedDescription"
                  value={formData.detailedDescription}
                  onChange={(e) => updateFormData('detailedDescription', e.target.value)}
                  placeholder="Provide detailed description of the incident..."
                  className="w-full min-h-[120px] px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:ring-2 focus:ring-umak-gold focus:border-transparent outline-none transition-all resize-y"
                  required
                />
              </div>
            </div>

            {/* Attachments */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Supporting Documents</h3>
              <div className="p-6 border-2 border-dashed border-white/30 rounded-lg text-center">
                <Upload className="w-8 h-8 mx-auto mb-3 text-white/70" />
                <p className="text-sm text-white/70 mb-2">Click to upload supporting documents</p>
                <p className="text-xs text-white/50">Max 5MB per file</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormData(initialFormData)}
                className="border-white/30 text-white hover:bg-white/10"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-umak-gold text-umak-blue hover:bg-umak-gold-dark"
              >
                {isSubmitting ? 'Saving...' : 'Save'}
                <Save className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
