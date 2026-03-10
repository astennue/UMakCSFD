import { useState } from 'react';
import {
  FileCheck,
  Shirt,
  Baby,
  Users,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Sample analytics data
const requestStats = [
  { label: 'Good Moral Request', value: 101, icon: FileCheck, color: 'bg-blue-500', href: '/admin/gmc-requests' },
  { label: 'Uniform Exemption', value: 31, icon: Shirt, color: 'bg-green-500', href: '/admin/encode-violation' },
  { label: 'Child Admission', value: 1, icon: Baby, color: 'bg-purple-500', href: '#' },
  { label: 'Cross-Dressing', value: 5, icon: Users, color: 'bg-pink-500', href: '#' },
  { label: 'Complaints', value: 4, icon: AlertTriangle, color: 'bg-red-500', href: '/admin/complaints' },
];

const summaryStats = [
  { label: 'Pending Community Service', value: 456, trend: 'up', change: 12 },
  { label: 'Rendered Community Service', value: 512, trend: 'up', change: 8 },
  { label: 'Good Moral Certificate Request', value: 2149, trend: 'up', change: 15 },
  { label: 'Issued Good Moral Certificate', value: 2140, trend: 'down', change: 3 },
];

const dailyProgress = [
  { label: 'Filed Complaint - Pending', current: 19, total: 24, color: 'bg-blue-500' },
  { label: 'Filed Complaint - Resolved', current: 90, total: 100, color: 'bg-green-500' },
  { label: 'Violation Citation - Resolved', current: 60, total: 100, color: 'bg-orange-500' },
];

const monthlyProgress = [
  { label: 'Filed Complaint - Pending', current: 19, total: 24, color: 'bg-blue-500' },
  { label: 'Filed Complaint - Resolved', current: 90, total: 100, color: 'bg-green-500' },
  { label: 'Violation Citation - Resolved', current: 60, total: 100, color: 'bg-orange-500' },
];

const violationData = [
  { name: 'Minor', value: 65, color: '#F59E0B' },
  { name: 'Major', value: 25, color: '#EF4444' },
  { name: 'Others', value: 10, color: '#6B7280' },
];

const monthlyRequests = [
  { month: 'Jan', requests: 45 },
  { month: 'Feb', requests: 52 },
  { month: 'Mar', requests: 38 },
  { month: 'Apr', requests: 65 },
  { month: 'May', requests: 48 },
  { month: 'Jun', requests: 72 },
];

// Sample announcements
const recentAnnouncements = [
  {
    id: '1',
    headline: 'Important: New Dress Code Policy',
    date: '2026-01-15',
    isNew: true,
  },
  {
    id: '2',
    headline: 'Good Moral Certificate Processing Schedule',
    date: '2026-02-01',
    isNew: false,
  },
];

export default function AdminDashboard() {
  const [announcements] = useState(recentAnnouncements);

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-marcellus">
          Welcome to CSFD Admin Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Here&apos;s an overview of the current status and activities.
        </p>
      </div>

      {/* Request Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        {requestStats.map((stat) => (
          <a key={stat.label} href={stat.href}>
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className={`inline-flex p-3 rounded-lg ${stat.color} mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>

      {/* Announcements Section */}
      <Card className="bg-umak-blue text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-marcellus flex items-center gap-2">
              <span className="text-2xl">📢</span> Announcement
            </CardTitle>
            <a href="/admin/compose-announcement">
              <Button size="sm" className="bg-umak-gold text-umak-blue hover:bg-umak-gold-dark">
                + Add announcement
              </Button>
            </a>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="flex items-start justify-between p-4 bg-white/10 rounded-lg"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{announcement.headline}</h3>
                    {announcement.isNew && (
                      <Badge className="bg-umak-gold text-umak-blue">New</Badge>
                    )}
                  </div>
                  <p className="text-sm text-white/70">
                    Posted on {new Date(announcement.date).toLocaleDateString()}
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analytics & Reports */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white font-marcellus mb-4">
          Analytics & Reports
        </h3>
        
        {/* Summary Stats */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-4">
              {summaryStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value.toLocaleString()}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</p>
                  <div className={`flex items-center justify-center gap-1 mt-2 text-sm ${
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {stat.change}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Charts Row */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Daily Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-marcellus">Daily Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dailyProgress.map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                      <span className="font-medium">{item.current}/{item.total}</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all`}
                        style={{ width: `${(item.current / item.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-marcellus">Monthly Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyProgress.map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                      <span className="font-medium">{item.current}/{item.total}</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all`}
                        style={{ width: `${(item.current / item.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Violation Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-marcellus">Violation Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={violationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      dataKey="value"
                    >
                      {violationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-4">
                {violationData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Requests Chart */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg font-marcellus">Monthly Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRequests}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="requests" fill="#0E2A5C" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        <a href="/admin/compose-announcement">
          <Button className="shadow-lg bg-umak-blue hover:bg-umak-blue-light">
            <span className="mr-2">✎</span> Compose an announcement
          </Button>
        </a>
        <a href="/admin/encode-complaint">
          <Button className="shadow-lg bg-red-500 hover:bg-red-600">
            <AlertTriangle className="w-4 h-4 mr-2" /> Encode Complaint
          </Button>
        </a>
        <a href="/admin/encode-violation">
          <Button className="shadow-lg bg-umak-gold text-umak-blue hover:bg-umak-gold-dark">
            <FileCheck className="w-4 h-4 mr-2" /> Encode Violation Citation
          </Button>
        </a>
      </div>
    </div>
  );
}
