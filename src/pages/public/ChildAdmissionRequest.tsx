import { useState } from 'react';
import { Baby, ChevronRight, ChevronLeft, CheckCircle, AlertCircle } from 'lucide-react';
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
  // Parent/Guardian Info
  parentGivenName: string;
  parentSurname: string;
  parentMiddleName: string;
  parentStudentNumber: string;
  parentCollege: string;
  parentYearLevel: string;
  parentEmail: string;
  parentPhone: string;
  // Child Info
  childName: string;
  childAge: string;
  childRelationship: string;
  // Request Details
  reason: string;
  requestedDates: string;
  duration: string;
  guardianName: string;
  guardianContact: string;
  supportingDocuments: string[];
}

const initialFormData: FormData = {
  parentGivenName: '',
  parentSurname: '',
  parentMiddleName: '',
  parentStudentNumber: '',
  parentCollege: '',
  parentYearLevel: '',
  parentEmail: '',
  parentPhone: '',
  childName: '',
  childAge: '',
  childRelationship: '',
  reason: '',
  requestedDates: '',
  duration: '',
  guardianName: '',
  guardianContact: '',
  supportingDocuments: [],
};

export default function ChildAdmissionRequest() {
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
    
    const requestNumber = `CAR-${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`;
    toast.success('Request submitted successfully!', {
      description: `Your request number is ${requestNumber}. Please check your email for updates.`,
    });
    setIsSubmitting(false);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          !!formData.parentGivenName &&
          !!formData.parentSurname &&
          !!formData.parentStudentNumber &&
          !!formData.parentEmail &&
          !!formData.parentPhone
        );
      case 2:
        return (
          !!formData.parentCollege &&
          !!formData.parentYearLevel
        );
      case 3:
        return (
          !!formData.childName &&
          !!formData.childAge &&
          !!formData.childRelationship &&
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
              Parent/Guardian Information
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="parentGivenName">Given Name *</Label>
                <Input
                  id="parentGivenName"
                  value={formData.parentGivenName}
                  onChange={(e) => updateFormData('parentGivenName', e.target.value)}
                  placeholder="Enter given name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parentSurname">Surname *</Label>
                <Input
                  id="parentSurname"
                  value={formData.parentSurname}
                  onChange={(e) => updateFormData('parentSurname', e.target.value)}
                  placeholder="Enter surname"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parentMiddleName">Middle Name</Label>
                <Input
                  id="parentMiddleName"
                  value={formData.parentMiddleName}
                  onChange={(e) => updateFormData('parentMiddleName', e.target.value)}
                  placeholder="Enter middle name"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="parentStudentNumber">UMak Student Number *</Label>
              <Input
                id="parentStudentNumber"
                value={formData.parentStudentNumber}
                onChange={(e) => updateFormData('parentStudentNumber', e.target.value)}
                placeholder="e.g., K12042424"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="parentEmail">Email Address *</Label>
                <Input
                  id="parentEmail"
                  type="email"
                  value={formData.parentEmail}
                  onChange={(e) => updateFormData('parentEmail', e.target.value)}
                  placeholder="Enter your email address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parentPhone">Phone Number *</Label>
                <Input
                  id="parentPhone"
                  value={formData.parentPhone}
                  onChange={(e) => updateFormData('parentPhone', e.target.value)}
                  placeholder="e.g., 09123456789"
                />
              </div>
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
              <Label htmlFor="parentCollege">College/Institute *</Label>
              <Select value={formData.parentCollege} onValueChange={(value) => updateFormData('parentCollege', value)}>
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
              <Label htmlFor="parentYearLevel">Year/Grade Level *</Label>
              <Select value={formData.parentYearLevel} onValueChange={(value) => updateFormData('parentYearLevel', value)}>
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
              Child Information & Request Details
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="childName">Child&apos;s Full Name *</Label>
                <Input
                  id="childName"
                  value={formData.childName}
                  onChange={(e) => updateFormData('childName', e.target.value)}
                  placeholder="Enter child's full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="childAge">Child&apos;s Age *</Label>
                <Input
                  id="childAge"
                  type="number"
                  value={formData.childAge}
                  onChange={(e) => updateFormData('childAge', e.target.value)}
                  placeholder="Enter child's age"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="childRelationship">Relationship to Child *</Label>
              <Select value={formData.childRelationship} onValueChange={(value) => updateFormData('childRelationship', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="guardian">Legal Guardian</SelectItem>
                  <SelectItem value="sibling">Older Sibling</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Bringing Child *</Label>
              <textarea
                id="reason"
                value={formData.reason}
                onChange={(e) => updateFormData('reason', e.target.value)}
                placeholder="Please provide detailed reason why you need to bring your child to campus..."
                className="w-full min-h-[100px] px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-umak-blue focus:border-transparent outline-none transition-all resize-y"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Requested Duration *</Label>
              <Select value={formData.duration} onValueChange={(value) => updateFormData('duration', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="one_time">One-time only</SelectItem>
                  <SelectItem value="1_week">1 Week</SelectItem>
                  <SelectItem value="2_weeks">2 Weeks</SelectItem>
                  <SelectItem value="1_month">1 Month</SelectItem>
                  <SelectItem value="1_semester">1 Semester</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="requestedDates">Specific Dates (if applicable)</Label>
              <Input
                id="requestedDates"
                value={formData.requestedDates}
                onChange={(e) => updateFormData('requestedDates', e.target.value)}
                placeholder="e.g., March 15-20, 2026"
              />
            </div>
            <Alert>
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>
                Note: Children must be supervised at all times. The university reserves the right to revoke 
                child admission privileges if safety guidelines are not followed.
              </AlertDescription>
            </Alert>
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
                  <p className="text-sm text-gray-500">Parent/Guardian Name</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formData.parentGivenName} {formData.parentMiddleName} {formData.parentSurname}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Student Number</p>
                  <p className="font-medium text-gray-900 dark:text-white">{formData.parentStudentNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contact</p>
                  <p className="font-medium text-gray-900 dark:text-white">{formData.parentEmail} | {formData.parentPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">College</p>
                  <p className="font-medium text-gray-900 dark:text-white">{formData.parentCollege}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Child&apos;s Name</p>
                  <p className="font-medium text-gray-900 dark:text-white">{formData.childName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Child&apos;s Age</p>
                  <p className="font-medium text-gray-900 dark:text-white">{formData.childAge} years old</p>
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
                By submitting this request, you agree to supervise your child at all times while on campus 
                and follow all university safety guidelines.
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
            Child Admission
          </Badge>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white font-marcellus">
            Child Admission Request
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Request permission to bring your child to campus for valid reasons.
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
                  <Baby className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
