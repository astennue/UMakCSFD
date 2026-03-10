import { useState } from 'react';
import { Search, Eye, CheckCircle, RotateCcw, Filter, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Complaint {
  id: string;
  complaintNumber: string;
  complainantName: string;
  complainantCollege: string;
  subject: string;
  category: 'Major' | 'Minor' | 'Others';
  dateFiled: string;
  status: 'Pending' | 'Resolved' | 'Under Review';
}

const sampleComplaints: Complaint[] = [
  {
    id: '1',
    complaintNumber: 'COMP-000001',
    complainantName: 'Juan Dela Cruz',
    complainantCollege: 'CCIS',
    subject: 'Harassment incident in classroom',
    category: 'Major',
    dateFiled: '2026-03-10',
    status: 'Pending',
  },
  {
    id: '2',
    complaintNumber: 'COMP-000002',
    complainantName: 'Maria Santos',
    complainantCollege: 'CBFM',
    subject: 'Uniform exemption request denied',
    category: 'Minor',
    dateFiled: '2026-03-09',
    status: 'Under Review',
  },
  {
    id: '3',
    complaintNumber: 'COMP-000003',
    complainantName: 'Pedro Reyes',
    complainantCollege: 'CET',
    subject: 'Discrimination concern',
    category: 'Major',
    dateFiled: '2026-03-08',
    status: 'Resolved',
  },
];

const categoryColors: Record<string, string> = {
  Major: 'bg-red-500',
  Minor: 'bg-yellow-500',
  Others: 'bg-gray-500',
};

const statusColors: Record<string, string> = {
  Pending: 'bg-yellow-500',
  'Under Review': 'bg-blue-500',
  Resolved: 'bg-green-500',
};

export default function ComplaintManagement() {
  const [complaints] = useState<Complaint[]>(sampleComplaints);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.complaintNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.complainantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || complaint.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAction = (action: string, complaint: Complaint) => {
    toast.success(`${action} action applied to ${complaint.complaintNumber}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-marcellus">
          Complaint Management
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          View and manage all filed complaints.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <Button variant="outline" className="bg-umak-blue text-white">All Complaints</Button>
        <Button variant="outline">Pending</Button>
        <Button variant="outline">Resolved</Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label>Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search complaints..."
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Major">Major</SelectItem>
                  <SelectItem value="Minor">Minor</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" className="w-full" onClick={() => { setSearchQuery(''); setCategoryFilter('all'); setStatusFilter('all'); }}>
                <Filter className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Complaints Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Complaint No.</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Complainant</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Subject</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Date Filed</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredComplaints.map((complaint) => (
                  <tr key={complaint.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {complaint.complaintNumber}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{complaint.complainantName}</p>
                        <p className="text-xs text-gray-500">{complaint.complainantCollege}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">
                      {complaint.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={categoryColors[complaint.category]}>{complaint.category}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {new Date(complaint.dateFiled).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={statusColors[complaint.status]}>{complaint.status}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" onClick={() => setSelectedComplaint(complaint)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        {complaint.status === 'Pending' && (
                          <Button size="sm" variant="ghost" className="text-blue-500" onClick={() => handleAction('Evaluate', complaint)}>
                            <FileText className="w-4 h-4" />
                          </Button>
                        )}
                        {complaint.status !== 'Resolved' && (
                          <Button size="sm" variant="ghost" className="text-green-500" onClick={() => handleAction('Resolve', complaint)}>
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        {complaint.status === 'Resolved' && (
                          <Button size="sm" variant="ghost" className="text-orange-500" onClick={() => handleAction('Re-open', complaint)}>
                            <RotateCcw className="w-4 h-4" />
                          </Button>
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

      {/* Complaint Details Dialog */}
      <Dialog open={!!selectedComplaint} onOpenChange={() => setSelectedComplaint(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-marcellus">Complaint Details</DialogTitle>
          </DialogHeader>
          {selectedComplaint && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Complaint Number</p>
                  <p className="font-medium">{selectedComplaint.complaintNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <Badge className={statusColors[selectedComplaint.status]}>{selectedComplaint.status}</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Complainant</p>
                  <p className="font-medium">{selectedComplaint.complainantName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">College</p>
                  <p className="font-medium">{selectedComplaint.complainantCollege}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <Badge className={categoryColors[selectedComplaint.category]}>{selectedComplaint.category}</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date Filed</p>
                  <p className="font-medium">{new Date(selectedComplaint.dateFiled).toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Subject</p>
                <p className="font-medium">{selectedComplaint.subject}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
