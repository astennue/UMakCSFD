import { useState } from 'react';
import { FileCheck, ChevronRight, ChevronLeft, User, GraduationCap, BookOpen, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { dropdownConfig } from '@/data/config';

type Classification = 'current' | 'graduate' | 'previous';

interface FormData {
  classification: Classification;
  givenName: string;
  surname: string;
  middleName: string;
  extensionName: string;
  sex: string;
  studentNumber: string;
  college: string;
  yearLevel: string;
  yearGraduated: string;
  lastLevelAttended: string;
  email: string;
  purpose: string;
  requirements: string;
}

const initialFormData: FormData = {
  classification: 'current',
  givenName: '',
  surname: '',
  middleName: '',
  extensionName: '',
  sex: '',
  studentNumber: '',
  college: '',
  yearLevel: '',
  yearGraduated: '',
  lastLevelAttended: '',
  email: '',
  purpose: '',
  requirements: '',
};

const steps = [
  { id: 1, label: 'Classification' },
  { id: 2, label: 'Personal Info' },
  { id: 3, label: 'Academic Info' },
  { id: 4, label: 'Purpose' },
  { id: 5, label: 'Review' },
];

export default function GoodMoralRequest() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
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
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const requestNumber = `GMCR-${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`;
    toast.success('Request submitted successfully!', {
      description: `Your request number is ${requestNumber}. Please check your email for updates.`,
    });
    setIsSubmitting(false);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return !!formData.classification;
      case 2:
        return (
          !!formData.givenName &&
          !!formData.surname &&
          !!formData.sex &&
          !!formData.email
        );
      case 3:
        if (formData.classification === 'current') {
          return (
            !!formData.studentNumber &&
            !!formData.college &&
            !!formData.yearLevel
          );
        } else if (formData.classification === 'graduate') {
          return (
            !!formData.studentNumber &&
            !!formData.college &&
            !!formData.yearGraduated
          );
        } else {
          return (
            !!formData.studentNumber &&
            !!formData.college &&
            !!formData.lastLevelAttended
          );
        }
      case 4:
        return !!formData.purpose && !!formData.requirements;
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
              Select your classification
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              <button
                onClick={() => updateFormData('classification', 'current')}
                className={`p-6 text-left border-2 rounded-xl transition-all ${
                  formData.classification === 'current'
                    ? 'border-umak-blue bg-umak-blue/5 dark:bg-umak-blue/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-umak-blue/50'
                }`}
              >
                <BookOpen className={`w-8 h-8 mb-4 ${
                  formData.classification === 'current' ? 'text-umak-blue' : 'text-gray-400'
                }`} />
                <h4 className="font-semibold text-gray-900 dark:text-white">Current Student</h4>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Currently enrolled at UMak
                </p>
              </button>

              <button
                onClick={() => updateFormData('classification', 'graduate')}
                className={`p-6 text-left border-2 rounded-xl transition-all ${
                  formData.classification === 'graduate'
                    ? 'border-umak-blue bg-umak-blue/5 dark:bg-umak-blue/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-umak-blue/50'
                }`}
              >
                <GraduationCap className={`w-8 h-8 mb-4 ${
                  formData.classification === 'graduate' ? 'text-umak-blue' : 'text-gray-400'
                }`} />
                <h4 className="font-semibold text-gray-900 dark:text-white">Graduate</h4>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Completed degree at UMak
                </p>
              </button>

              <button
                onClick={() => updateFormData('classification', 'previous')}
                className={`p-6 text-left border-2 rounded-xl transition-all ${
                  formData.classification === 'previous'
                    ? 'border-umak-blue bg-umak-blue/5 dark:bg-umak-blue/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-umak-blue/50'
                }`}
              >
                <User className={`w-8 h-8 mb-4 ${
                  formData.classification === 'previous' ? 'text-umak-blue' : 'text-gray-400'
                }`} />
                <h4 className="font-semibold text-gray-900 dark:text-white">Previous Student</h4>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Formerly enrolled at UMak
                </p>
              </button>
            </div>
          </div>
        );

      case 2:
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

      case 3:
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
            
            {formData.classification === 'current' && (
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
            )}
            
            {formData.classification === 'graduate' && (
              <div className="space-y-2">
                <Label htmlFor="yearGraduated">Year Graduated *</Label>
                <Input
                  id="yearGraduated"
                  value={formData.yearGraduated}
                  onChange={(e) => updateFormData('yearGraduated', e.target.value)}
                  placeholder="e.g., 2024"
                />
              </div>
            )}
            
            {formData.classification === 'previous' && (
              <div className="space-y-2">
                <Label htmlFor="lastLevelAttended">Last Level & Year Attended *</Label>
                <Input
                  id="lastLevelAttended"
                  value={formData.lastLevelAttended}
                  onChange={(e) => updateFormData('lastLevelAttended', e.target.value)}
                  placeholder="e.g., 2nd Year - 2023"
                />
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Purpose & Requirements
            </h3>
            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose of Request *</Label>
              <Select value={formData.purpose} onValueChange={(value) => updateFormData('purpose', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  {dropdownConfig.gmcPurposes.map((purpose) => (
                    <SelectItem key={purpose} value={purpose}>
                      {purpose}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="requirements">Additional Requirements/Notes</Label>
              <textarea
                id="requirements"
                value={formData.requirements}
                onChange={(e) => updateFormData('requirements', e.target.value)}
                placeholder="Enter any additional requirements or notes..."
                className="w-full min-h-[100px] px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-umak-blue focus:border-transparent outline-none transition-all resize-y"
              />
            </div>
            <Alert>
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>
                Please ensure all information is accurate. Processing time is 3-5 working days.
                You will receive an email notification once your certificate is ready.
              </AlertDescription>
            </Alert>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Review Your Information
            </h3>
            <div className="p-6 space-y-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-500">Classification</p>
                  <p className="font-medium text-gray-900 dark:text-white capitalize">
                    {formData.classification} Student
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formData.givenName} {formData.middleName} {formData.surname} {formData.extensionName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Sex</p>
                  <p className="font-medium text-gray-900 dark:text-white">{formData.sex}</p>
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
                  <p className="text-sm text-gray-500">College/Institute</p>
                  <p className="font-medium text-gray-900 dark:text-white">{formData.college}</p>
                </div>
                {formData.yearLevel && (
                  <div>
                    <p className="text-sm text-gray-500">Year/Grade Level</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formData.yearLevel}</p>
                  </div>
                )}
                {formData.yearGraduated && (
                  <div>
                    <p className="text-sm text-gray-500">Year Graduated</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formData.yearGraduated}</p>
                  </div>
                )}
                {formData.lastLevelAttended && (
                  <div>
                    <p className="text-sm text-gray-500">Last Level Attended</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formData.lastLevelAttended}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Purpose</p>
                  <p className="font-medium text-gray-900 dark:text-white">{formData.purpose}</p>
                </div>
                {formData.requirements && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500">Additional Notes</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formData.requirements}</p>
                  </div>
                )}
              </div>
            </div>
            <Alert>
              <CheckCircle className="w-4 h-4" />
              <AlertDescription>
                By submitting this request, you confirm that all information provided is true and accurate.
                False information may result in the rejection of your request.
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
            Good Moral Certificate
          </Badge>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white font-marcellus">
            Good Moral Certificate Request
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Fill out the form below to request your Certificate of Good Moral Character.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm ${
                    currentStep >= step.id
                      ? 'bg-umak-blue text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  }`}
                >
                  {step.id}
                </div>
                <span
                  className={`hidden ml-2 text-sm font-medium md:block ${
                    currentStep >= step.id ? 'text-umak-blue' : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 h-1 mx-2 md:w-16 ${
                      currentStep > step.id ? 'bg-umak-blue' : 'bg-gray-200 dark:bg-gray-700'
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
              
              {currentStep < steps.length ? (
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
                  <FileCheck className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
