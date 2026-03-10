import { useState } from 'react';
import { Search, FileText, AlertCircle, CheckCircle, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface DisciplinaryRecord {
  id: string;
  studentNumber: string;
  studentName: string;
  sex: string;
  infraction: string;
  receivedDate: string;
  status: string;
  college: string;
  violationType: 'Minor' | 'Major' | 'Others';
}

// Sample data
const sampleRecords: DisciplinaryRecord[] = [
  {
    id: '1',
    studentNumber: 'K12042424',
    studentName: 'Juan A. Dela Cruz Sr.',
    sex: 'Male',
    infraction: 'Not wearing Prescribed uniform',
    receivedDate: '2026-01-23',
    status: 'First Offense',
    college: 'College of Computing and Information Sciences',
    violationType: 'Minor',
  },
  {
    id: '2',
    studentNumber: 'K12042425',
    studentName: 'Maria Clara De Jesus',
    sex: 'Female',
    infraction: 'Unauthorized possession of examination materials',
    receivedDate: '2026-02-15',
    status: 'Under Review',
    college: 'College of Business and Financial Management',
    violationType: 'Major',
  },
  {
    id: '3',
    studentNumber: 'K12042426',
    studentName: 'Pedro Santos',
    sex: 'Male',
    infraction: 'Loitering',
    receivedDate: '2026-03-01',
    status: 'Resolved',
    college: 'College of Engineering Technology',
    violationType: 'Minor',
  },
];

export default function DisciplinaryRecords() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [records] = useState<DisciplinaryRecord[]>(sampleRecords);

  const filteredRecords = records.filter((record) => {
    const matchesSearch = 
      record.studentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || record.violationType.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'first offense':
        return <Badge className="bg-yellow-500">First Offense</Badge>;
      case 'second offense':
        return <Badge className="bg-orange-500">Second Offense</Badge>;
      case 'third offense':
        return <Badge className="bg-red-500">Third Offense</Badge>;
      case 'resolved':
        return <Badge className="bg-green-500">Resolved</Badge>;
      case 'under review':
        return <Badge className="bg-blue-500">Under Review</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getViolationBadge = (type: string) => {
    switch (type.toLowerCase()) {
      case 'minor':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-600">Minor</Badge>;
      case 'major':
        return <Badge variant="outline" className="border-red-500 text-red-600">Major</Badge>;
      case 'others':
        return <Badge variant="outline" className="border-gray-500 text-gray-600">Others</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="px-4 mx-auto max-w-7xl lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <Badge className="mb-4 text-umak-blue bg-umak-gold hover:bg-umak-gold-dark">
            Public Records
          </Badge>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white font-marcellus">
            Disciplinary Records
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Search and view disciplinary records. For privacy reasons, only limited information is displayed publicly.
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="search">Search by Student Number or Name</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter student number or name..."
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="filter">Filter by Violation Type</Label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="minor">Minor</SelectItem>
                    <SelectItem value="major">Major</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button variant="outline" className="w-full" onClick={() => { setSearchQuery(''); setFilterType('all'); }}>
                  <Filter className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alert */}
        <Alert className="mb-6">
          <AlertCircle className="w-4 h-4" />
          <AlertDescription>
            This is a public view with limited information. For detailed records or to dispute a record, 
            please visit the CSFD office or contact us at csfd@umak.edu.ph
          </AlertDescription>
        </Alert>

        {/* Records Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Student Number
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Sex
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Infraction
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredRecords.length > 0 ? (
                    filteredRecords.map((record) => (
                      <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
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
                          {getViolationBadge(record.violationType)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                          {new Date(record.receivedDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(record.status)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center">
                        <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p className="text-gray-500">No records found</p>
                        <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Minor Violations</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Less serious infractions</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Major Violations</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Serious infractions</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Resolved</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Case has been resolved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
