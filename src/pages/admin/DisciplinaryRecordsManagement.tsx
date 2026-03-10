import { useState } from 'react';
import { Search, Eye, Filter, Download } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface DisciplinaryRecord {
  id: string;
  studentNumber: string;
  studentName: string;
  sex: string;
  college: string;
  email: string;
  infraction: string;
  violationType: 'Minor' | 'Major' | 'Others';
  receivedDate: string;
  status: string;
}

const sampleRecords: DisciplinaryRecord[] = [
  {
    id: '1',
    studentNumber: 'K12042424',
    studentName: 'Juan A. Dela Cruz Sr.',
    sex: 'Male',
    college: 'College of Computing and Information Sciences',
    email: 'juandelacruzsr@gmail.com',
    infraction: 'Not wearing Prescribed uniform',
    violationType: 'Minor',
    receivedDate: '2026-01-23',
    status: 'First Offense',
  },
  {
    id: '2',
    studentNumber: 'K12042425',
    studentName: 'Maria Clara De Jesus',
    sex: 'Female',
    college: 'College of Business and Financial Management',
    email: 'mariaclaradelacruz@gmail.com',
    infraction: 'Unauthorized possession of examination materials',
    violationType: 'Major',
    receivedDate: '2026-02-15',
    status: 'Under Review',
  },
  {
    id: '3',
    studentNumber: 'K12042426',
    studentName: 'Pedro Santos',
    sex: 'Male',
    college: 'College of Engineering Technology',
    email: 'pedrosantos@gmail.com',
    infraction: 'Loitering',
    violationType: 'Minor',
    receivedDate: '2026-03-01',
    status: 'Resolved',
  },
];

const violationColors: Record<string, string> = {
  Minor: 'bg-yellow-500',
  Major: 'bg-red-500',
  Others: 'bg-gray-500',
};

const statusColors: Record<string, string> = {
  'First Offense': 'bg-yellow-500',
  'Second Offense': 'bg-orange-500',
  'Third Offense': 'bg-red-500',
  Resolved: 'bg-green-500',
  'Under Review': 'bg-blue-500',
};

export default function DisciplinaryRecordsManagement() {
  const [records] = useState<DisciplinaryRecord[]>(sampleRecords);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState<DisciplinaryRecord | null>(null);

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.studentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || record.violationType === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleExport = () => {
    toast.success('Records exported successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-marcellus">
          Disciplinary Records
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Master list of all disciplinary records and violations.
        </p>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2 md:col-span-2">
              <Label>Search by Student Number or Name</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter student number or name..."
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Filter by Type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Minor">Minor</SelectItem>
                  <SelectItem value="Major">Major</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end gap-2">
              <Button variant="outline" className="flex-1" onClick={() => { setSearchQuery(''); setTypeFilter('all'); }}>
                <Filter className="w-4 h-4 mr-2" />
                Clear
              </Button>
              <Button variant="outline" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Records Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">#</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Student Number</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Sex</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Infraction</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredRecords.map((record, index) => (
                  <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {record.studentNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {record.studentName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {record.sex}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">
                      {record.infraction}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={violationColors[record.violationType]}>{record.violationType}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {new Date(record.receivedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={statusColors[record.status] || 'bg-gray-500'}>{record.status}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button size="sm" variant="ghost" onClick={() => setSelectedRecord(record)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Record Details Dialog */}
      <Dialog open={!!selectedRecord} onOpenChange={() => setSelectedRecord(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-marcellus">Disciplinary Record Details</DialogTitle>
          </DialogHeader>
          {selectedRecord && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Student Number</p>
                  <p className="font-medium">{selectedRecord.studentNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{selectedRecord.studentName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Sex</p>
                  <p className="font-medium">{selectedRecord.sex}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">College</p>
                  <p className="font-medium">{selectedRecord.college}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedRecord.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date Received</p>
                  <p className="font-medium">{new Date(selectedRecord.receivedDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Violation Type</p>
                  <Badge className={violationColors[selectedRecord.violationType]}>{selectedRecord.violationType}</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <Badge className={statusColors[selectedRecord.status] || 'bg-gray-500'}>{selectedRecord.status}</Badge>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Infraction</p>
                <p className="font-medium">{selectedRecord.infraction}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
