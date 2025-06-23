
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload, FileText, Share, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { savePDFToRoom } from '@/utils/pdfStorage';

const FacultyUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [isSharing, setIsSharing] = useState(false);
  const { toast } = useToast();

  const classrooms = ['101', '102', '103', '104', '105', '201', '202', '203', '204', '205'];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      console.log('PDF selected:', file.name);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please select a PDF file.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    if (!selectedFile || !selectedRoom) {
      toast({
        title: "Missing information",
        description: "Please select both a PDF file and a classroom.",
        variant: "destructive",
      });
      return;
    }

    setIsSharing(true);
    
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      savePDFToRoom(selectedFile, selectedRoom);
      
      toast({
        title: "PDF shared successfully!",
        description: `"${selectedFile.name}" has been sent to Room ${selectedRoom}.`,
      });
      
      // Reset form
      setSelectedFile(null);
      setSelectedRoom('');
      // Reset file input
      const fileInput = document.getElementById('pdf-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      toast({
        title: "Sharing failed",
        description: "There was an error sharing the PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Faculty PDF Uploader</h1>
          <p className="text-gray-600">Share PDFs with your classrooms instantly</p>
        </div>

        {/* Main Upload Card */}
        <Card className="shadow-lg border-0">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">Upload & Share PDF</CardTitle>
            <CardDescription>
              Select a PDF file and choose which classroom to share it with
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* File Selection */}
            <div className="space-y-2">
              <Label htmlFor="pdf-upload" className="text-sm font-medium">
                Select PDF File
              </Label>
              <div className="relative">
                <Input
                  id="pdf-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                />
              </div>
              {selectedFile && (
                <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                  <FileText className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium text-green-800">{selectedFile.name}</p>
                    <p className="text-sm text-green-600">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Classroom Selection */}
            <div className="space-y-2">
              <Label htmlFor="classroom-select" className="text-sm font-medium">
                Select Classroom
              </Label>
              <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a classroom..." />
                </SelectTrigger>
                <SelectContent>
                  {classrooms.map((room) => (
                    <SelectItem key={room} value={room}>
                      Room {room}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Share Button */}
            <Button
              onClick={handleShare}
              disabled={!selectedFile || !selectedRoom || isSharing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              size="lg"
            >
              {isSharing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Sharing...
                </>
              ) : (
                <>
                  <Share className="w-5 h-5 mr-2" />
                  Share PDF
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-white text-xs font-bold">i</span>
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">How it works</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Select a PDF file from your computer</li>
                  <li>• Choose the classroom you want to share it with</li>
                  <li>• Click "Share PDF" to send it to the classroom device</li>
                  <li>• The PDF will appear instantly on the classroom's receiver app</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FacultyUploader;
