import { useState } from 'react';
import { AlertTriangle, ChevronRight, ChevronLeft, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { dropdownConfig } from '@/data/config';

interface PersonInfo {
  givenName: string;
  surname: string;
  middleName: string;
  extensionName: string;
  sex: string;
  studentNumber: string;
  college: string;
  yearLevel: string;
  email: string;
}

interface ComplaintData {
  // Complainant
  mainComplainant: PersonInfo;
  hasCoComplainant: boolean;
  coComplainant?: PersonInfo;
  // Respondent
  mainRespondent: PersonInfo;
  hasCoRespondent: boolean;
  coRespondent?: PersonInfo;
  // Complaint Details
  subject: string;
  category: string;
  detailedDescription: string;
  desiredOutcome: string;
  // Timeline
  dateOfIncident: string;
  location: string;
  isOngoing: boolean;
  frequency: string;
  witnesses: string;
  previousReports: string;
  supportingDocuments: string[];
}

const emptyPerson: PersonInfo = {
  givenName: '',
  surname: '',
  middleName: '',
  extensionName: '',
  sex: '',
  studentNumber: '',
  college: '',
  yearLevel: '',
  email: '',
};

const initialComplaintData: ComplaintData = {
  mainComplainant: { ...emptyPerson },
  hasCoComplainant: false,
  mainRespondent: { ...emptyPerson },
  hasCoRespondent: false,
  subject: '',
  category: '',
  detailedDescription: '',
  desiredOutcome: '',
  dateOfIncident: '',
  location: '',
  isOngoing: false,
  frequency: '',
  witnesses: '',
  previousReports: '',
  supportingDocuments: [],
};

const steps = [
  { id: 1, label: 'Instructions' },
  { id: 2, label: 'Complainant' },
  { id: 3, label: 'Respondent' },
  { id: 4, label: 'Details' },
  { id: 5, label: 'Evidence' },
  { id: 6, label: 'Review' },
];

export default function ComplaintForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [complaintData, setComplaintData] = useState<ComplaintData>(initialComplaintData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updatePerson = (type: 'mainComplainant' | 'coComplainant' | 'mainRespondent' | 'coRespondent', field: keyof PersonInfo, value: string) => {
    setComplaintData((prev) => ({
      ...prev,
      [type]: {
        ...(prev[type] as PersonInfo),
        [field]: value,
      },
    }));
  };

  const updateComplaint = (field: keyof ComplaintData, value: unknown) => {
    setComplaintData((prev) => ({ ...prev, [field]: value }));
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
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const complaintNumber = `COMP-${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`;
    toast.success('Complaint filed successfully!', {
      description: `Your complaint number is ${complaintNumber}. Please check your email for updates on your complaint status.`,
    });
    setIsSubmitting(false);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return true;
      case 2:
        const mc = complaintData.mainComplainant;
        return (
          !!mc.givenName &&
          !!mc.surname &&
          !!mc.sex &&
          !!mc.studentNumber &&
          !!mc.college &&
          !!mc.yearLevel &&
          !!mc.email
        );
      case 3:
        const mr = complaintData.mainRespondent;
        return (
          !!mr.givenName &&
          !!mr.surname &&
          !!mr.sex &&
          !!mr.studentNumber &&
          !!mr.college &&
          !!mr.yearLevel
        );
      case 4:
        return (
          !!complaintData.subject &&
          !!complaintData.category &&
          !!complaintData.detailedDescription &&
          !!complaintData.desiredOutcome &&
          !!complaintData.dateOfIncident &&
          !!complaintData.location
        );
      case 5:
        return true;
      default:
        return true;
    }
  };

  const renderPersonForm = (
    type: 'mainComplainant' | 'coComplainant' | 'mainRespondent' | 'coRespondent',
    title: string,
    isRequired: boolean
  ) => {
    const person = complaintData[type] || emptyPerson;
    return (
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          {title}
          {isRequired && <span className="text-red-500">*</span>}
        </h4>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label>Given Name {isRequired && '*'}</Label>
            <Input
              value={person.givenName}
              onChange={(e) => updatePerson(type, 'givenName', e.target.value)}
              placeholder="Enter given name"
            />
          </div>
          <div className="space-y-2">
            <Label>Surname {isRequired && '*'}</Label>
            <Input
              value={person.surname}
              onChange={(e) => updatePerson(type, 'surname', e.target.value)}
              placeholder="Enter surname"
            />
          </div>
          <div className="space-y-2">
            <Label>Middle Name</Label>
            <Input
              value={person.middleName}
              onChange={(e) => updatePerson(type, 'middleName', e.target.value)}
              placeholder="Enter middle name"
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label>Extension Name</Label>
            <Input
              value={person.extensionName}
              onChange={(e) => updatePerson(type, 'extensionName', e.target.value)}
              placeholder="Jr., Sr., etc."
            />
          </div>
          <div className="space-y-2">
            <Label>Sex {isRequired && '*'}</Label>
            <Select value={person.sex} onValueChange={(value) => updatePerson(type, 'sex', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select sex" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Student Number {isRequired && '*'}</Label>
            <Input
              value={person.studentNumber}
              onChange={(e) => updatePerson(type, 'studentNumber', e.target.value)}
              placeholder="e.g., K12042424"
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>College/Institute {isRequired && '*'}</Label>
            <Select value={person.college} onValueChange={(value) => updatePerson(type, 'college', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select college" />
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
            <Label>Year/Grade Level {isRequired && '*'}</Label>
            <Select value={person.yearLevel} onValueChange={(value) => updatePerson(type, 'yearLevel', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select year level" />
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
        <div className="space-y-2">
          <Label>Email Address {isRequired && '*'}</Label>
          <Input
            type="email"
            value={person.email}
            onChange={(e) => updatePerson(type, 'email', e.target.value)}
            placeholder="Enter email address"
          />
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Complaint Process
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full font-semibold">1</div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Accomplish this Complaint Form</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Fill out all required information accurately.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full font-semibold">2</div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Wait for Validation</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Once validated, an email will be sent for initial dialogue.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-purple-500 text-white rounded-full font-semibold">3</div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Proceed to CSFD Office</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Bring your official complaint letter to the CSFD office.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-orange-500 text-white rounded-full font-semibold">4</div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Wait for Case Hearing</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Details will be sent through formal invitation via email.</p>
                </div>
              </div>
            </div>
            <Alert>
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>
                All complaints are handled with strict confidentiality. False complaints may result in disciplinary action.
              </AlertDescription>
            </Alert>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {renderPersonForm('mainComplainant', 'Main Complainant Information', true)}
            
            <div className="pt-4 border-t">
              <div className="flex items-center gap-2 mb-4">
                <Checkbox
                  id="hasCoComplainant"
                  checked={complaintData.hasCoComplainant}
                  onCheckedChange={(checked) => updateComplaint('hasCoComplainant', checked)}
                />
                <Label htmlFor="hasCoComplainant" className="cursor-pointer">
                  Add Co-Complainant
                </Label>
              </div>
              
              {complaintData.hasCoComplainant && (
                <div className="mt-4">
                  {renderPersonForm('coComplainant', 'Co-Complainant Information', false)}
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {renderPersonForm('mainRespondent', 'Main Respondent Information', true)}
            
            <div className="pt-4 border-t">
              <div className="flex items-center gap-2 mb-4">
                <Checkbox
                  id="hasCoRespondent"
                  checked={complaintData.hasCoRespondent}
                  onCheckedChange={(checked) => updateComplaint('hasCoRespondent', checked)}
                />
                <Label htmlFor="hasCoRespondent" className="cursor-pointer">
                  Add Co-Respondent
                </Label>
              </div>
              
              {complaintData.hasCoRespondent && (
                <div className="mt-4">
                  {renderPersonForm('coRespondent', 'Co-Respondent Information', false)}
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Complaint Details
            </h3>
            <div className="space-y-2">
              <Label htmlFor="subject">Complaint Title/Subject *</Label>
              <Input
                id="subject"
                value={complaintData.subject}
                onChange={(e) => updateComplaint('subject', e.target.value)}
                placeholder="e.g., Late salary payment for March 2024"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Complaint Category *</Label>
              <Select value={complaintData.category} onValueChange={(value) => updateComplaint('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {dropdownConfig.complaintCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="detailedDescription">Detailed Description *</Label>
              <textarea
                id="detailedDescription"
                value={complaintData.detailedDescription}
                onChange={(e) => updateComplaint('detailedDescription', e.target.value)}
                placeholder="Provide a full narrative of what happened - be specific about actions, words, incidents..."
                className="w-full min-h-[150px] px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-umak-blue focus:border-transparent outline-none transition-all resize-y"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="desiredOutcome">Desired Outcome/Resolution *</Label>
              <textarea
                id="desiredOutcome"
                value={complaintData.desiredOutcome}
                onChange={(e) => updateComplaint('desiredOutcome', e.target.value)}
                placeholder="What do you want to happen? (apology, payment, policy change, etc.)"
                className="w-full min-h-[100px] px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-umak-blue focus:border-transparent outline-none transition-all resize-y"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="dateOfIncident">Date of Incident *</Label>
                <Input
                  id="dateOfIncident"
                  type="date"
                  value={complaintData.dateOfIncident}
                  onChange={(e) => updateComplaint('dateOfIncident', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={complaintData.location}
                  onChange={(e) => updateComplaint('location', e.target.value)}
                  placeholder="e.g., Classroom, Office, Oval"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="isOngoing"
                checked={complaintData.isOngoing}
                onCheckedChange={(checked) => updateComplaint('isOngoing', checked)}
              />
              <Label htmlFor="isOngoing" className="cursor-pointer">
                Is this an ongoing issue?
              </Label>
            </div>
            {complaintData.isOngoing && (
              <div className="space-y-2">
                <Label htmlFor="frequency">How often does this occur?</Label>
                <Input
                  id="frequency"
                  value={complaintData.frequency}
                  onChange={(e) => updateComplaint('frequency', e.target.value)}
                  placeholder="e.g., Daily, Weekly, Monthly"
                />
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Evidence & Documentation
            </h3>
            <div className="space-y-2">
              <Label htmlFor="witnesses">Witnesses Present</Label>
              <textarea
                id="witnesses"
                value={complaintData.witnesses}
                onChange={(e) => updateComplaint('witnesses', e.target.value)}
                placeholder="Names of people who saw/heard the incident (if any)"
                className="w-full min-h-[80px] px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-umak-blue focus:border-transparent outline-none transition-all resize-y"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="previousReports">Previous Reports</Label>
              <textarea
                id="previousReports"
                value={complaintData.previousReports}
                onChange={(e) => updateComplaint('previousReports', e.target.value)}
                placeholder="Has this been reported before? If yes, show date and to whom..."
                className="w-full min-h-[80px] px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-umak-blue focus:border-transparent outline-none transition-all resize-y"
              />
            </div>
            <div className="space-y-2">
              <Label>Supporting Documents</Label>
              <div className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center">
                <Upload className="w-8 h-8 mx-auto mb-3 text-gray-400" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Upload a copy of your evidence
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  Maximum file size: 100MB. For further evidence, upload to cloud storage and email CSFD.
                </p>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4,.mov"
                  multiple
                />
                <Button type="button" variant="outline" onClick={() => {}}>
                  Select Files
                </Button>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Review Your Complaint
            </h3>
            <div className="p-6 space-y-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div>
                <p className="text-sm text-gray-500">Complainant</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {complaintData.mainComplainant.givenName} {complaintData.mainComplainant.surname}
                </p>
                <p className="text-sm text-gray-600">{complaintData.mainComplainant.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Respondent</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {complaintData.mainRespondent.givenName} {complaintData.mainRespondent.surname}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Subject</p>
                <p className="font-medium text-gray-900 dark:text-white">{complaintData.subject}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-medium text-gray-900 dark:text-white">{complaintData.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date & Location</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {complaintData.dateOfIncident} | {complaintData.location}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="font-medium text-gray-900 dark:text-white">{complaintData.detailedDescription}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Desired Outcome</p>
                <p className="font-medium text-gray-900 dark:text-white">{complaintData.desiredOutcome}</p>
              </div>
            </div>
            <Alert>
              <CheckCircle className="w-4 h-4" />
              <AlertDescription>
                By submitting this complaint, you confirm that all information provided is true and accurate 
                to the best of your knowledge. False complaints may result in disciplinary action.
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
          <Badge className="mb-4 text-white bg-red-500 hover:bg-red-600">
            Complaint Form
          </Badge>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white font-marcellus">
            File a Complaint
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Report incidents or file complaints regarding student welfare and discipline.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[500px]">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold text-xs ${
                    currentStep >= step.id
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  }`}
                >
                  {step.id}
                </div>
                <span
                  className={`hidden ml-2 text-xs font-medium sm:block ${
                    currentStep >= step.id ? 'text-red-500' : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 h-1 mx-2 sm:w-12 ${
                      currentStep > step.id ? 'bg-red-500' : 'bg-gray-200 dark:bg-gray-700'
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
                  className="bg-red-500 hover:bg-red-600"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-red-500 hover:bg-red-600"
                >
                  {isSubmitting ? 'Submitting...' : 'File Complaint'}
                  <AlertTriangle className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
