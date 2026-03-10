import { useState } from 'react';
import { Users, ChevronRight, ChevronLeft, Upload, Shield } from 'lucide-react';
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
  genderIdentity: string;
  studentNumber: string;
  college: string;
  yearLevel: string;
  email: string;
  phone: string;
  accommodationType: string;
  reason: string;
  preferredName: string;
  preferredPronouns: string;
  supportingDocuments: string[];
}

const initialFormData: FormData = {
  givenName: '',
  surname: '',
  middleName: '',
  extensionName: '',
  sex: '',
  genderIdentity: '',
  studentNumber: '',
  college: '',
  yearLevel: '',
  email: '',
  phone: '',
  accommodationType: '',
  reason: '',
  preferredName: '',
  preferredPronouns: '',
  supportingDocuments: [],
};

const accommodationTypes = [
  { 
    value: 'uniform', 
    label: 'Uniform Accommodation', 
    description: 'Permission to wear uniform aligned with gender identity' 
  },
  { 
    value: 'facilities', 
    label: 'Facilities Access', 
    description: 'Access to facilities aligned with gender identity' 
  },
  { 
    value: 'documentation', 
    label: 'Documentation Update', 
    description: 'Update name/gender marker in university records' 
  },
  { 
    value: 'comprehensive', 
    label: 'Comprehensive', 
    description: 'Multiple accommodations needed' 
  },
];

const pronounOptions = [
  'He/Him',
  'She/Her',
  'They/Them',
  'He/They',
  'She/They',
  'Other',
];

export default function CrossDressingRequest() {
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
    
    const requestNumber = `CDR-${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`;
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
          !!formData.accommodationType &&
          !!formData.reason
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
                <Label htmlFor="sex">Sex (as per records) *</Label>
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
            <div className="grid gap-4 md:grid-cols-2">
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
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  placeholder="e.g., 09123456789"
                />
              </div>
            </div>
            <Alert className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
              <Shield className="w-4 h-4 text-purple-600" />
              <AlertDescription className="text-purple-800 dark:text-purple-200">
                All information provided will be kept strictly confidential and will only be used 
                to process your accommodation request.
              </AlertDescription>
            </Alert>
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
              Accommodation Details
            </h3>
            <div className="space-y-4">
              <Label>Type of Accommodation Needed *</Label>
              <div className="grid gap-4 md:grid-cols-2">
                {accommodationTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => updateFormData('accommodationType', type.value)}
                    className={`p-4 text-left border-2 rounded-xl transition-all ${
                      formData.accommodationType === type.value
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                    }`}
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white">{type.label}</h4>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{type.description}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="preferredName">Preferred Name (Optional)</Label>
                <Input
                  id="preferredName"
                  value={formData.preferredName}
                  onChange={(e) => updateFormData('preferredName', e.target.value)}
                  placeholder="Name you prefer to be called"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredPronouns">Preferred Pronouns (Optional)</Label>
                <Select value={formData.preferredPronouns} onValueChange={(value) => updateFormData('preferredPronouns', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pronouns" />
                  </SelectTrigger>
                  <SelectContent>
                    {pronounOptions.map((pronoun) => (
                      <SelectItem key={pronoun} value={pronoun}>
                        {pronoun}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Request *</Label>
              <textarea
                id="reason"
                value={formData.reason}
                onChange={(e) => updateFormData('reason', e.target.value)}
                placeholder="Please share why you need this accommodation..."
                className="w-full min-h-[120px] px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-y"
              />
            </div>
            <div className="space-y-2">
              <Label>Supporting Documents (Optional)</Label>
              <div className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center">
                <Upload className="w-8 h-8 mx-auto mb-3 text-gray-400" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  Medical certificates, legal documents, etc. (Max 5MB)
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
                  <p className="text-sm text-gray-500">Accommodation Type</p>
                  <p className="font-medium text-gray-900 dark:text-white capitalize">
                    {formData.accommodationType?.replace('_', ' ')}
                  </p>
                </div>
                {formData.preferredName && (
                  <div>
                    <p className="text-sm text-gray-500">Preferred Name</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formData.preferredName}</p>
                  </div>
                )}
                {formData.preferredPronouns && (
                  <div>
                    <p className="text-sm text-gray-500">Preferred Pronouns</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formData.preferredPronouns}</p>
                  </div>
                )}
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Reason</p>
                  <p className="font-medium text-gray-900 dark:text-white">{formData.reason}</p>
                </div>
              </div>
            </div>
            <Alert className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
              <Shield className="w-4 h-4 text-purple-600" />
              <AlertDescription className="text-purple-800 dark:text-purple-200">
                Your request will be handled with utmost confidentiality and respect. 
                CSFD is committed to supporting all students regardless of gender identity.
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
          <Badge className="mb-4 text-white bg-purple-500 hover:bg-purple-600">
            Cross-Dressing Request
          </Badge>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white font-marcellus">
            Cross-Dressing Accommodation Request
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Request accommodation for gender expression. All requests are handled confidentially.
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
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  }`}
                >
                  {step}
                </div>
                {index < 3 && (
                  <div
                    className={`w-12 h-1 mx-2 md:w-20 ${
                      currentStep > step ? 'bg-purple-500' : 'bg-gray-200 dark:bg-gray-700'
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
                  className="bg-purple-500 hover:bg-purple-600"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-purple-500 hover:bg-purple-600"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  <Users className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
