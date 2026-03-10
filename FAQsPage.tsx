import { useState } from 'react';
import { FileText, Eye, Edit2, Save, X, Mail, Settings } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface CertificateTemplate {
  id: string;
  name: string;
  type: 'good_moral' | 'uniform_exemption' | 'child_admission' | 'cross_dressing';
  content: string;
  ccEmail: string;
  variables: string[];
}

const initialTemplates: CertificateTemplate[] = [
  {
    id: '1',
    name: 'Good Moral Certificate Template',
    type: 'good_moral',
    content: `CERTIFICATE OF GOOD MORAL CHARACTER

This is to certify that {{student_name}}, {{student_number}}, a {{year_level}} student of {{college}}, has been a student of the University of Makati since {{enrollment_date}}.

{{he_she}} has shown satisfactory performance in both academic and non-academic activities and has maintained a good moral character during {{his_her}} stay in the University.

This certification is being issued upon the request of the above-named student for {{purpose}} purposes.

Issued this {{date}} at the University of Makati, J.P. Rizal Extension, West Rembo, Makati City.

{{signature}}
{{position}}`,
    ccEmail: 'csfd@umak.edu.ph',
    variables: ['student_name', 'student_number', 'year_level', 'college', 'enrollment_date', 'he_she', 'his_her', 'purpose', 'date', 'signature', 'position'],
  },
  {
    id: '2',
    name: 'Uniform Exemption Certificate',
    type: 'uniform_exemption',
    content: `UNIFORM EXEMPTION CERTIFICATE

This certifies that {{student_name}}, Student No. {{student_number}}, is granted exemption from wearing the prescribed school uniform for {{exemption_type}} reasons.

Exemption Period: {{start_date}} to {{end_date}}

Approved by: {{approver_name}}
Date: {{date}}`,
    ccEmail: 'csfd@umak.edu.ph',
    variables: ['student_name', 'student_number', 'exemption_type', 'start_date', 'end_date', 'approver_name', 'date'],
  },
];

const typeLabels: Record<string, string> = {
  good_moral: 'Good Moral',
  uniform_exemption: 'Uniform Exemption',
  child_admission: 'Child Admission',
  cross_dressing: 'Cross-Dressing',
};

const typeColors: Record<string, string> = {
  good_moral: 'bg-blue-500',
  uniform_exemption: 'bg-green-500',
  child_admission: 'bg-purple-500',
  cross_dressing: 'bg-pink-500',
};

export default function CertificateTemplates() {
  const [templates, setTemplates] = useState<CertificateTemplate[]>(initialTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<CertificateTemplate | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [editedCcEmail, setEditedCcEmail] = useState('');

  const handleEdit = (template: CertificateTemplate) => {
    setSelectedTemplate(template);
    setEditedContent(template.content);
    setEditedCcEmail(template.ccEmail);
    setIsEditMode(true);
  };

  const handleSave = () => {
    if (selectedTemplate) {
      setTemplates(templates.map((t) =>
        t.id === selectedTemplate.id
          ? { ...t, content: editedContent, ccEmail: editedCcEmail }
          : t
      ));
      toast.success('Template saved successfully!');
      setIsEditMode(false);
      setSelectedTemplate(null);
    }
  };

  const handlePreview = (template: CertificateTemplate) => {
    // Replace variables with sample data for preview
    let preview = template.content
      .replace(/{{student_name}}/g, 'JUAN A. DELA CRUZ SR.')
      .replace(/{{student_number}}/g, 'K12042424')
      .replace(/{{year_level}}/g, 'Fourth Year')
      .replace(/{{college}}/g, 'College of Computing and Information Sciences')
      .replace(/{{enrollment_date}}/g, '2022')
      .replace(/{{he_she}}/g, 'He')
      .replace(/{{his_her}}/g, 'his')
      .replace(/{{purpose}}/g, 'scholarship')
      .replace(/{{date}}/g, new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }))
      .replace(/{{signature}}/g, '_____________________\nCSFD Director')
      .replace(/{{position}}/g, 'Center for Student Formation and Discipline')
      .replace(/{{exemption_type}}/g, 'medical')
      .replace(/{{start_date}}/g, 'January 1, 2026')
      .replace(/{{end_date}}/g, 'June 30, 2026')
      .replace(/{{approver_name}}/g, 'CSFD Director');

    return preview;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-marcellus">
          Certificate Templates
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Configure certificate templates (Autocrat-like functionality).
        </p>
      </div>

      {/* Templates Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {templates.map((template) => (
          <Card key={template.id} className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${typeColors[template.type]}`}>
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{template.name}</h3>
                    <Badge variant="outline" className="mt-1">{typeLabels[template.type]}</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-xs text-gray-500">CC Email</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {template.ccEmail}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Available Variables</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {template.variables.slice(0, 5).map((v) => (
                      <code key={v} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                        {'{{'}{v}{'}}'}
                      </code>
                    ))}
                    {template.variables.length > 5 && (
                      <span className="text-xs text-gray-500">+{template.variables.length - 5} more</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => { setSelectedTemplate(template); setIsEditMode(false); }}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleEdit(template)}
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Variables Reference */}
      <Card className="bg-umak-blue text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-6 h-6 text-umak-gold" />
            <h3 className="text-lg font-semibold">Template Variables Guide</h3>
          </div>
          <p className="text-white/80 mb-4">
            Use these variables in your templates. They will be automatically replaced with actual data when generating certificates.
          </p>
          <div className="grid gap-2 md:grid-cols-3">
            {['student_name', 'student_number', 'year_level', 'college', 'email', 'date', 'purpose'].map((v) => (
              <code key={v} className="bg-white/10 px-3 py-2 rounded text-sm">
                {'{{'}{v}{'}}'}
              </code>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <Dialog open={!!selectedTemplate && !isEditMode} onOpenChange={() => setSelectedTemplate(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-marcellus">Template Preview</DialogTitle>
          </DialogHeader>
          {selectedTemplate && (
            <div className="mt-4">
              <div className="p-8 border rounded-lg bg-white dark:bg-gray-800 whitespace-pre-wrap font-serif">
                {handlePreview(selectedTemplate)}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!selectedTemplate && isEditMode} onOpenChange={() => { setSelectedTemplate(null); setIsEditMode(false); }}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-marcellus">Edit Template</DialogTitle>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>CC Email (will receive copies)</Label>
                <Input
                  value={editedCcEmail}
                  onChange={(e) => setEditedCcEmail(e.target.value)}
                  placeholder="Enter CC email"
                />
              </div>
              <div className="space-y-2">
                <Label>Template Content</Label>
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full min-h-[400px] px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono text-sm focus:ring-2 focus:ring-umak-blue focus:border-transparent outline-none transition-all resize-y"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setIsEditMode(false)}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
