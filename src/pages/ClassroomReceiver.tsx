
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FileText, Trash2, RefreshCw, Download, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { getPDFsForRoom, clearPDFsForRoom, SharedPDF } from '@/utils/pdfStorage';

const ClassroomReceiver = () => {
  const { roomNumber } = useParams<{ roomNumber: string }>();
  const [pdfs, setPDFs] = useState<SharedPDF[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const loadPDFs = () => {
    if (roomNumber) {
      const roomPDFs = getPDFsForRoom(roomNumber);
      setPDFs(roomPDFs);
      console.log(`Loaded ${roomPDFs.length} PDFs for Room ${roomNumber}`);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    loadPDFs();
    setIsRefreshing(false);
    
    toast({
      title: "Refreshed",
      description: "PDF list has been updated.",
    });
  };

  const handleClearAll = () => {
    if (roomNumber && pdfs.length > 0) {
      clearPDFsForRoom(roomNumber);
      loadPDFs();
      
      toast({
        title: "PDFs cleared",
        description: `All PDFs have been removed from Room ${roomNumber}.`,
      });
    }
  };

  const handleDownload = (pdf: SharedPDF) => {
    // In a real app, this would download the actual file
    toast({
      title: "Download started",
      description: `Downloading "${pdf.name}"...`,
    });
    console.log(`Downloading PDF: ${pdf.name}`);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  useEffect(() => {
    loadPDFs();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadPDFs, 30000);
    return () => clearInterval(interval);
  }, [roomNumber]);

  if (!roomNumber) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p className="text-red-600">Invalid room number</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Room {roomNumber}
              </h1>
              <p className="text-gray-600">Classroom PDF Receiver</p>
            </div>
            <div className="flex space-x-3">
              <Button
                onClick={handleRefresh}
                disabled={isRefreshing}
                variant="outline"
                size="sm"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              {pdfs.length > 0 && (
                <Button
                  onClick={handleClearAll}
                  variant="destructive"
                  size="sm"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* PDF List */}
        {pdfs.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No PDFs available
              </h3>
              <p className="text-gray-600 mb-4">
                Waiting for faculty to share PDFs with Room {roomNumber}
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Auto-refreshing every 30 seconds</span>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Available PDFs ({pdfs.length})
              </h2>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Room {roomNumber}
              </Badge>
            </div>
            
            <div className="grid gap-4">
              {pdfs.map((pdf) => (
                <Card key={pdf.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {pdf.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Shared on {formatDate(pdf.uploadedAt)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="text-xs">
                          PDF
                        </Badge>
                        <Button
                          onClick={() => handleDownload(pdf)}
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Status Info */}
        <Card className="mt-8 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <p className="font-medium text-blue-900">System Status: Online</p>
                <p className="text-sm text-blue-700">
                  This device is connected and ready to receive PDFs for Room {roomNumber}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClassroomReceiver;
