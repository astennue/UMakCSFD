import { useState } from 'react';
import { Save, X, Upload, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { dropdownConfig } from '@/data/config';

interface ViolationFormData {
  caseViolation: string;
  violationType: string;
  fullName: string;
  studentNumber: string;
  college: string;
  email: string;
  sex: string;
  dateOfInfraction: string;
  attachments: string[];
}

const initialFormData: ViolationFormData = {
  caseViolation: '',
  violationType: '',
  fullName: '',
  studentNumber: '',
  college: '',
  email: '',
  sex: '',
  dateOfInfraction: '',
  attachments: [],
};

const violationTypes = [
  { value: 'Minor', label: 'Minor Violation', violations: dropdownConfig.minorViolations },
  { value: 'Major', label: 'Major Violation', violations: dropdownConfig.majorViolations },
  { value: 'Others', label: 'Other Violations', violations: dropdownConfig.otherViolations },
];

export default function EncodeViolation() {
  const [formData, setFormData] = useState<ViolationFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (field: keyof ViolationFormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast.success('Violation encoded successfully!');
    setFormData(initialFormData);
    setIsSubmitting(false);
  };

  const getViolationOptions = () => {
    const type = violationTypes.find((t) => t.value === formData.violationType);
    return type?.violations || [];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-marcellus">
          Encode Violation Citation
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Record a new violation citation for a student.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="bg-umak-blue dark:bg-gray-800">
          <CardContent className="p-8 space-y-8">
            {/* Violation Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Violation Details</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="violationType" className="text-white">
                    Violation Type <span className="text-red-400">*</span>
                  </Label>
                  <Select
                    value={formData.violationType}
                    onValueChange={(value) => {
                      updateFormData('violationType', value);
                      updateFormData('caseViolation', '');
                    }}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select violation type" />
                    </SelectTrigger>
                    <SelectContent>
                      {violationTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="caseViolation" className="text-white">
                    Case Violation <span className="text-red-400">*</span>
                  </Label>
                  <Select
                    value={formData.caseViolation}
                    onValueChange={(value) => updateFormData('caseViolation', value)}
                    disabled={!formData.violationType}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select specific violation" />
                    </SelectTrigger>
                    <SelectContent>
                      {getViolationOptions().map((violation) => (
                        <SelectItem key={violation} value={violation}>
                          {violation.length > 100 ? violation.substring(0, 100) + '...' : violation}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Student Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Student Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-white">
                    Full Name <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => updateFormData('fullName', e.target.value)}
                    placeholder="Enter student's full name"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studentNumber" className="text-white">
                    Student Number <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="studentNumber"
                    value={formData.studentNumber}
                    onChange={(e) => updateFormData('studentNumber', e.target.value)}
                    placeholder="e.g., K12042424"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="college" className="text-white">
                    College/Institute <span className="text-red-400">*</span>
                  </Label>
                  <Select value={formData.college} onValueChange={(value) => updateFormData('college', value)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select college/institute" />
                    </SelectTrigger>
                    <SelectContent>
                      {dropdownConfig.colleges.map((college) => (
                        <SelectItem key={college} value={college}>
                          {college}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    UMak Email Address <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    placeholder="student@umak.edu.ph"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="sex" className="text-white">
                    Sex <span className="text-red-400">*</span>
                  </Label>
                  <Select value={formData.sex} onValueChange={(value) => updateFormData('sex', value)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select sex" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfInfraction" className="text-white">
                    Date of Infraction <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="dateOfInfraction"
                    type="date"
                    value={formData.dateOfInfraction}
                    onChange={(e) => updateFormData('dateOfInfraction', e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Attachments */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Attachments (Optional)</h3>
              <div className="p-6 border-2 border-dashed border-white/30 rounded-lg text-center">
                <Upload className="w-8 h-8 mx-auto mb-3 text-white/70" />
                <p className="text-sm text-white/70 mb-2">Click to upload or drag and drop</p>
                <p className="text-xs text-white/50">Supported: PDF, DOC, DOCX, JPG, PNG (Max 5MB)</p>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  multiple
                />
              </div>
            </div>

            {/* Alert */}
            <Alert className="bg-yellow-500/20 border-yellow-500/50">
              <AlertCircle className="w-4 h-4 text-yellow-400" />
              <AlertDescription className="text-yellow-100">
                Please verify all information before saving. Violation records cannot be easily modified once saved.
              </AlertDescription>
            </Alert>

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
