import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Upload, FileText, X, Check } from 'lucide-react';

interface AssignmentSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignment: {
    id: string;
    title: string;
    description: string;
    submissionType: 'file' | 'text' | 'both';
    maxGrade: number;
  };
  onSubmit: (data: { text?: string; files?: File[] }) => void;
}

export const AssignmentSubmissionModal: React.FC<AssignmentSubmissionModalProps> = ({
  isOpen,
  onClose,
  assignment,
  onSubmit
}) => {
  const [textSubmission, setTextSubmission] = React.useState('');
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [dragActive, setDragActive] = React.useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragActive(false);
    const files = Array.from(event.dataTransfer.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const submissionData: { text?: string; files?: File[] } = {};
    
    if (assignment.submissionType === 'text' || assignment.submissionType === 'both') {
      submissionData.text = textSubmission;
    }
    
    if (assignment.submissionType === 'file' || assignment.submissionType === 'both') {
      submissionData.files = selectedFiles;
    }
    
    onSubmit(submissionData);
    onClose();
  };

  const canSubmit = () => {
    if (assignment.submissionType === 'text') {
      return textSubmission.trim().length > 0;
    }
    if (assignment.submissionType === 'file') {
      return selectedFiles.length > 0;
    }
    if (assignment.submissionType === 'both') {
      return textSubmission.trim().length > 0 && selectedFiles.length > 0;
    }
    return false;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-right">إرسال الحل - {assignment.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Assignment Description */}
          <Card className="lems-card">
            <div className="space-y-2">
              <h4 className="font-semibold">وصف الواجب</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {assignment.description}
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">الدرجة الكاملة: {assignment.maxGrade}</span>
                <span className="text-primary">
                  نوع التسليم: {
                    assignment.submissionType === 'file' ? 'ملف فقط' :
                    assignment.submissionType === 'text' ? 'نص فقط' : 'ملف + نص'
                  }
                </span>
              </div>
            </div>
          </Card>

          {/* Text Submission */}
          {(assignment.submissionType === 'text' || assignment.submissionType === 'both') && (
            <div className="space-y-3">
              <Label htmlFor="textSubmission">الإجابة النصية</Label>
              <Textarea
                id="textSubmission"
                value={textSubmission}
                onChange={(e) => setTextSubmission(e.target.value)}
                placeholder="اكتب إجابتك هنا..."
                className="min-h-32 lems-input"
                rows={6}
              />
              <div className="text-xs text-muted-foreground">
                عدد الكلمات: {textSubmission.trim().split(/\s+/).filter(word => word.length > 0).length}
              </div>
            </div>
          )}

          {/* File Upload */}
          {(assignment.submissionType === 'file' || assignment.submissionType === 'both') && (
            <div className="space-y-3">
              <Label>رفع الملفات</Label>
              
              {/* Drag and Drop Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-primary bg-primary/5' 
                    : 'border-muted-foreground/25 hover:border-primary/50'
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
              >
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-sm font-medium">اسحب الملفات هنا أو</p>
                  <Label htmlFor="fileInput" className="cursor-pointer">
                    <Button type="button" variant="outline" size="sm">
                      اختر الملفات
                    </Button>
                    <Input
                      id="fileInput"
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.xlsx,.xls,.ppt,.pptx,.jpg,.jpeg,.png"
                    />
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    الملفات المدعومة: PDF, Word, Excel, PowerPoint, الصور
                  </p>
                </div>
              </div>

              {/* Selected Files */}
              {selectedFiles.length > 0 && (
                <div className="space-y-2">
                  <Label>الملفات المحددة</Label>
                  <div className="space-y-2">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-primary" />
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Submission Guidelines */}
          <Card className="lems-card bg-primary/5 border-primary/20">
            <div className="space-y-2">
              <h4 className="font-semibold text-primary">إرشادات التسليم</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• تأكد من مراجعة إجابتك قبل الإرسال</li>
                <li>• لا يمكن تعديل الإجابة بعد الإرسال</li>
                <li>• احفظ نسخة من عملك قبل الإرسال</li>
                <li>• الحد الأقصى لحجم الملف الواحد: 10 MB</li>
              </ul>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button variant="outline" onClick={onClose}>
              إلغاء
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!canSubmit()}
              className="lems-button-primary"
            >
              <Check className="h-4 w-4 ml-2" />
              إرسال الحل
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};