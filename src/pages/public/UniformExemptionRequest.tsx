import { useState } from 'react';
import { Shirt, ChevronRight, ChevronLeft, Upload, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { dropdownConfig } from '@/data/config';

interface FormData {
  givenName: string;
  surname: string;
  middleName: string;
  extensionName: string;
  sex: string;
  studentNumber: string;
  college: string;
  yearLevel: string;
  email: string;
  exemptionType: string;
  reason: string;
  duration: string;
  supportingDocuments: string[];
}

const initialFormData: FormData = {
  givenName: '',
  surname: '',
  middleName: '',
  extensionName: '',
  sex: '',
  studentNumber: '',
  college: '',
  yearLevel: '',
  email: '',
  exemptionType: '',
  reason: '',
  duration: '',
  supportingDocuments: [],
};

const exemptionTypes = [
  { value: 'medical', label: 'Medical Condition', description: 'Health-related reasons with medical certificate' },
  { value: 'religious', label: 'Religious Beliefs', description: 'Religious practices and beliefs' },
  { value: 'temporary', label: 'Temporary', description: 'Short-term exemption for specific situations' },
];

export default function UniformExemptionRequest() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const requestNumber = `UER-${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`;
    toast.success('Request submitted successfully!', {
      description: `Your request number is ${requestNumber}. Please check your email for updates.`,
    });
    setIsSubmitting(false);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          !!formData.givenName &&
          !!formData.surname &&
          !!formData.sex &&
          !!formData.email
        );
      case 2:
        return (
          !!formData.studentNumber &&
          !!formData.college &&
          !!formData.yearLevel
        );
      case 3:
        return (
          !!formData.exemptionType &&
          !!formData.reason &&
          !!formData.duration
        );
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Personal Information
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="givenName">Given Name *</Label>
                <Input
                  id="givenName"
                  value={formData.givenName}
                  onChange={(e) => updateFormData('givenName', e.target.value)}
                  placeholder="Enter given name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="surname">Surname *</Label>
                <Input
                  id="surname"
                  value={formData.surname}
                  onChange={(e) => updateFormData('surname', e.target.value)}
                  placeholder="Enter surname"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="middleName">Middle Name</Label>
                <Input
                  id="middleName"
                  value={formData.middleName}
                  onChange={(e) => updateFormData('middleName', e.target.value)}
                  placeholder="Enter middle name"
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="extensionName">Extension Name</Label>
                <Input
                  id="extensionName"
                  value={formData.extensionName}
                  onChange={(e) => updateFormData('extensionName', e.target.value)}
                  placeholder="Jr., Sr., III, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sex">Sex *</Label>
                <Select value={formData.sex} onValueChange={(value) => updateFormData('sex', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sex" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                placeholder="Enter your email address"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Academic Information
            </h3>
            <div className="space-y-2">
              <Label htmlFor="studentNumber">UMak Student Number *</Label>
              <Input
                id="studentNumber"
                value={formData.studentNumber}
                onChange={(e) => updateFormData('studentNumber', e.target.value)}
                placeholder="e.g., K12042424"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="college">College/Institute *</Label>
              <Select value={formData.college} onValueChange={(value) => updateFormData('college', value)}>
                <SelectTrigger>
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
              <Label htmlFor="yearLevel">Year/Grade Level *</Label>
              <Select value={formData.yearLevel} onValueChange={(value) => updateFormData('yearLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select year/grade level" />
                </SelectTrigger>
                <SelectContent>
                  {dropdownConfig.yearLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Exemption Details
            </h3>
            <div className="space-y-4">
              <Label>Exemption Type *</Label>
              <div className="grid gap-4 md:grid-cols-3">
                {exemptionTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => updateFormData('exemptionType', type.value)}
                    className={`p-4 text-left border-2 rounded-xl transition-all ${
                      formData.exemptionType === type.value
                        ? 'border-umak-blue bg-umak-blue/5 dark:bg-umak-blue/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-umak-blue/50'
                    }`}
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white">{type.label}</h4>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{type.description}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Exemption *</Label>
              <textarea
                id="reason"
                value={formData.reason}
                onChange={(e) => updateFormData('reason', e.target.value)}
                placeholder="Please provide detailed reason for your exemption request..."
                className="w-full min-h-[120px] px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-umak-blue focus:border-transparent outline-none transition-all resize-y"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Requested Duration *</Label>
              <Select value={formData.duration} onValueChange={(value) => updateFormData('duration', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1_week">1 Week</SelectItem>
                  <SelectItem value="2_weeks">2 Weeks</SelectItem>
                  <SelectItem value="1_month">1 Month</SelectItem>
                  <SelectItem value="1_semester">1 Semester</SelectItem>
                  <SelectItem value="permanent">Permanent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Supporting Documents</Label>
              <div className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center">
                <Upload className="w-8 h-8 mx-auto mb-3 text-gray-400" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  Supported: PDF, DOC, DOCX, JPG, PNG (Max 5MB)
                </p>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  multiple
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Review Your Information
            </h3>
            <div className="p-6 space-y-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formData.givenName} {formData.middleName} {formData.surname} {formData.extensionName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900 dark:text-white">{formData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Student Number</p>
                  <p className="font-medium text-gray-900 dark:text-white">{formData.studentNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">College</p>
                  <p className="font-medium text-gray-900 dark:text-white">{formData.college}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Exemption Type</p>
                  <p className="font-medium text-gray-900 dark:text-white capitalize">
                    {formData.exemptionType?.replace('_', ' ')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium text-gray-900 dark:text-white capitalize">
                    {formData.duration?.replace('_', ' ')}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Reason</p>
                  <p className="font-medium text-gray-900 dark:text-white">{formData.reason}</p>
                </div>
              </div>
            </div>
            <Alert>
              <CheckCircle className="w-4 h-4" />
              <AlertDescription>
                By submitting this request, you confirm that all information provided is true and accurate.
                Supporting documents may be required for verification.
              </AlertDescription>
            </Alert>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="px-4 mx-auto max-w-4xl lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <Badge className="mb-4 text-umak-blue bg-umak-gold hover:bg-umak-gold-dark">
            Uniform Exemption
          </Badge>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white font-marcellus">
            Uniform Exemption Request
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Apply for uniform exemption for valid medical or religious reasons.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm ${
                    currentStep >= step
                      ? 'bg-umak-blue text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  }`}
                >
                  {step}
                </div>
                {index < 3 && (
                  <div
                    className={`w-12 h-1 mx-2 md:w-20 ${
                      currentStep > step ? 'bg-umak-blue' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <Card>
          <CardContent className="p-8">
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              {currentStep < 4 ? (
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="bg-umak-blue hover:bg-umak-blue-light"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-umak-gold text-umak-blue hover:bg-umak-gold-dark"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  <Shirt className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
