import { useState } from 'react';
import { Search, Eye, CheckCircle, Clock, Filter, History } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface GMCRequest {
  id: string;
  requestNumber: string;
  studentName: string;
  email: string;
  classification: string;
  purpose: string;
  status: 'New' | 'For Processing' | 'Due' | 'Over Due' | 'Issued' | 'Hold';
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

const sampleRequests: GMCRequest[] = [
  {
    id: '1',
    requestNumber: 'GMCR-0000001',
    studentName: 'Juan A. Dela Cruz Sr.',
    email: 'juandelacruzsr@gmail.com',
    classification: 'Current Student',
    purpose: 'CCA Requirement',
    status: 'Issued',
    hasPendingViolation: false,
    createdAt: '2026-01-23',
  },
  {
    id: '2',
    requestNumber: 'GMCR-0000002',
    studentName: 'Maria Clara De Jesus',
    email: 'mariaclaradelacruz@gmail.com',
    classification: 'Graduate',
    purpose: 'LANI Scholarship',
    status: 'Hold',
    hasPendingViolation: true,
    violationHistory: { major: 1, minor: 2, others: 0 },
    holdRemarks: 'Has pending violation - needs to settle at CSFD office',
    heldBy: 'Staff SAM',
    createdAt: '2026-01-24',
  },
  {
    id: '3',
    requestNumber: 'GMCR-0000003',
    studentName: 'Reiner Nuevas',
    email: 'reinernuevas.work@gmail.com',
    classification: 'Previous Student',
    purpose: 'Admission to other University',
    status: 'New',
    hasPendingViolation: false,
    createdAt: '2026-01-25',
  },
];

const statusColors: Record<string, string> = {
  New: 'bg-blue-500',
  'For Processing': 'bg-yellow-500',
  Due: 'bg-orange-500',
  'Over Due': 'bg-red-500',
  Issued: 'bg-green-500',
  Hold: 'bg-purple-500',
};

export default function GMCRequestManagement() {
  const [requests] = useState<GMCRequest[]>(sampleRequests);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<GMCRequest | null>(null);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.requestNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAction = (action: string, request: GMCRequest) => {
    toast.success(`${action} action applied to ${request.requestNumber}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-marcellus">
          Good Moral Certificate Request
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Manage and process good moral certificate requests.
        </p>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Search by Request No.</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter request number..."
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Filter by Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="For Processing">For Processing</SelectItem>
                  <SelectItem value="Due">Due</SelectItem>
                  <SelectItem value="Over Due">Over Due</SelectItem>
                  <SelectItem value="Issued">Issued</SelectItem>
                  <SelectItem value="Hold">Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" className="w-full" onClick={() => { setSearchQuery(''); setStatusFilter('all'); }}>
                <Filter className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requests Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Request No.</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Student Info</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Purpose</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Violation History</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {request.requestNumber}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{request.studentName}</p>
                        <p className="text-xs text-gray-500">{request.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {request.classification}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">
                      {request.purpose}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={statusColors[request.status]}>{request.status}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {request.hasPendingViolation ? (
                        <div className="flex items-center gap-2">
                          <span className="text-red-500 font-medium">Has Violations</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setSelectedRequest(request);
                              setIsHistoryDialogOpen(true);
                            }}
                          >
                            <History className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <span className="text-green-500 font-medium">Cleared</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" onClick={() => setSelectedRequest(request)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        {request.status !== 'Issued' && request.status !== 'Hold' && (
                          <>
                            <Button size="sm" variant="ghost" className="text-green-500" onClick={() => handleAction('Issue', request)}>
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-purple-500" onClick={() => handleAction('Hold', request)}>
                              <Clock className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Request Details Dialog */}
      <Dialog open={!!selectedRequest && !isHistoryDialogOpen} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-marcellus">Request Details</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Request Number</p>
                  <p className="font-medium">{selectedRequest.requestNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <Badge className={statusColors[selectedRequest.status]}>{selectedRequest.status}</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Student Name</p>
                  <p className="font-medium">{selectedRequest.studentName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedRequest.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Classification</p>
                  <p className="font-medium">{selectedRequest.classification}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Purpose</p>
                  <p className="font-medium">{selectedRequest.purpose}</p>
                </div>
              </div>
              {selectedRequest.hasPendingViolation && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium">Violation History:</p>
                  <p className="text-sm text-red-600 dark:text-red-400">
                    Major: {selectedRequest.violationHistory?.major}, 
                    Minor: {selectedRequest.violationHistory?.minor}, 
                    Others: {selectedRequest.violationHistory?.others}
                  </p>
                  {selectedRequest.holdRemarks && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                      Hold Remarks: {selectedRequest.holdRemarks}
                    </p>
                  )}
                  {selectedRequest.heldBy && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      Held By: {selectedRequest.heldBy}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Violation History Dialog */}
      <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-marcellus">Violation History</DialogTitle>
          </DialogHeader>
          {selectedRequest?.violationHistory && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-lg text-center">
                  <p className="text-2xl font-bold text-red-600">{selectedRequest.violationHistory.major}</p>
                  <p className="text-sm text-red-600">Major</p>
                </div>
                <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg text-center">
                  <p className="text-2xl font-bold text-yellow-600">{selectedRequest.violationHistory.minor}</p>
                  <p className="text-sm text-yellow-600">Minor</p>
                </div>
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-center">
                  <p className="text-2xl font-bold text-gray-600">{selectedRequest.violationHistory.others}</p>
                  <p className="text-sm text-gray-600">Others</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This student has pending violations. Please verify before issuing the certificate.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
