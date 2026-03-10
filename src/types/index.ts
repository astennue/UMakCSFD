// User Types
export interface User {
  id: string;
  username: string;
  role: 'superadmin' | 'director' | 'staff';
  name: string;
  email: string;
}

// Student Types
export interface Student {
  studentNumber: string;
  givenName: string;
  surname: string;
  middleName?: string;
  extensionName?: string;
  sex: 'Male' | 'Female';
  college: string;
  yearLevel: string;
  email: string;
}

// Violation Types
export type ViolationType = 'Minor' | 'Major' | 'Others';

export interface Violation {
  id: string;
  caseViolation: string;
  violationType: ViolationType;
  student: Student;
  dateOfInfraction: string;
  attachments?: string[];
  status: 'First Offense' | 'Second Offense' | 'Third Offense' | 'Resolved';
  createdAt: string;
}

// Complaint Types
export type ComplaintCategory = 'Major' | 'Minor' | 'Others';
export type ComplaintStatus = 'Pending' | 'Resolved' | 'Under Review';

export interface Complainant {
  givenName: string;
  surname: string;
  middleName?: string;
  extensionName?: string;
  sex: 'Male' | 'Female';
  studentNumber: string;
  college: string;
  email: string;
  yearLevel: string;
}

export interface Complaint {
  id: string;
  complaintNumber: string;
  subject: string;
  category: ComplaintCategory;
  detailedDescription: string;
  desiredOutcome: string;
  dateOfIncident: string;
  location: string;
  isOngoing: boolean;
  witnessesPresent?: string;
  previousReports?: string;
  supportingDocuments?: string[];
  mainComplainant: Complainant;
  coComplainant?: Complainant;
  mainRespondent: Complainant;
  coRespondent?: Complainant;
  status: ComplaintStatus;
  createdAt: string;
  progress?: ComplaintProgress[];
}

export interface ComplaintProgress {
  date: string;
  subject: string;
  description: string;
  supportingDocument?: string;
}

// Good Moral Certificate Types
export type GMCClassification = 'Current Student' | 'Graduate' | 'Previous Student';
export type GMCStatus = 'New' | 'For Processing' | 'Due' | 'Over Due' | 'Issued' | 'Hold';

export interface GoodMoralRequest {
  id: string;
  requestNumber: string;
  student: Student;
  classification: GMCClassification;
  purpose: string;
  requirements: string;
  status: GMCStatus;
  hasPendingViolation: boolean;
  violationHistory?: {
    major: number;
    minor: number;
    others: number;
  };
  holdRemarks?: string;
  heldBy?: string;
  createdAt: string;
}

// Announcement Types
export interface Announcement {
  id: string;
  headline: string;
  details: string;
  postedFrom: string;
  postedTo: string;
  dateFrom: string;
  dateTo: string;
  attachments?: string[];
  createdAt: string;
  createdBy: string;
}

// Certificate Template Types
export interface CertificateTemplate {
  id: string;
  name: string;
  type: 'good_moral' | 'uniform_exemption' | 'child_admission' | 'cross_dressing';
  content: string;
  variables: string[];
  ccEmail?: string;
}

// Analytics Types
export interface AnalyticsData {
  pendingCommunityService: number;
  renderedCommunityService: number;
  goodMoralCertificateRequest: number;
  issuedGoodMoralCertificate: number;
  dailySummary: {
    filedComplaintPending: number;
    filedComplaintResolved: number;
    violationCitationResolved: number;
  };
  monthlySummary: {
    filedComplaintPending: number;
    filedComplaintResolved: number;
    violationCitationResolved: number;
  };
}

// Request Types (Uniform Exemption, Child Admission, Cross-Dressing)
export interface ServiceRequest {
  id: string;
  requestNumber: string;
  student: Student;
  requestType: 'uniform_exemption' | 'child_admission' | 'cross_dressing';
  reason: string;
  supportingDocuments?: string[];
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;
}

// Dropdown Configuration
export interface DropdownConfig {
  colleges: string[];
  yearLevels: string[];
  minorViolations: string[];
  majorViolations: string[];
  otherViolations: string[];
  complaintCategories: string[];
  gmcPurposes: string[];
}
