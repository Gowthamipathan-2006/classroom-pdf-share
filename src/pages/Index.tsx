
import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, Monitor, FileText, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Index = () => {
  const [selectedRoom, setSelectedRoom] = React.useState<string>('');
  const classrooms = ['101', '102', '103', '104', '105', '201', '202', '203', '204', '205'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Faculty PDF Sharing System
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Seamlessly share PDFs between faculty and classrooms. Upload once, access anywhere.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Faculty Card */}
          <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600"></div>
            <CardHeader className="relative text-white">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8" />
              </div>
              <CardTitle className="text-2xl">Faculty Uploader</CardTitle>
              <CardDescription className="text-blue-100">
                Upload and share PDFs with specific classrooms
              </CardDescription>
            </CardHeader>
            <CardContent className="relative text-white">
              <ul className="space-y-2 mb-6 text-blue-100">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  Select PDF files
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  Choose target classroom
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  Share instantly
                </li>
              </ul>
              <Link to="/faculty">
                <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                  <Share className="w-4 h-4 mr-2" />
                  Access Faculty Portal
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Classroom Card */}
          <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600"></div>
            <CardHeader className="relative text-white">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Monitor className="w-8 h-8" />
              </div>
              <CardTitle className="text-2xl">Classroom Receiver</CardTitle>
              <CardDescription className="text-green-100">
                View and download PDFs shared with your classroom
              </CardDescription>
            </CardHeader>
            <CardContent className="relative text-white space-y-4">
              <ul className="space-y-2 text-green-100">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  Real-time PDF updates
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  Download and view files
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  Manage classroom content
                </li>
              </ul>
              
              <div className="space-y-3">
                <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                  <SelectTrigger className="w-full bg-white/10 border-white/20 text-white placeholder:text-green-200">
                    <SelectValue placeholder="Select your classroom..." />
                  </SelectTrigger>
                  <SelectContent>
                    {classrooms.map((room) => (
                      <SelectItem key={room} value={room}>
                        Room {room}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {selectedRoom ? (
                  <Link to={`/classroom/${selectedRoom}`}>
                    <Button className="w-full bg-white text-green-600 hover:bg-green-50 font-semibold">
                      <FileText className="w-4 h-4 mr-2" />
                      Access Room {selectedRoom}
                    </Button>
                  </Link>
                ) : (
                  <Button disabled className="w-full bg-white/50 text-green-300 cursor-not-allowed">
                    <FileText className="w-4 h-4 mr-2" />
                    Select Room First
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-900">How It Works</CardTitle>
            <CardDescription>Simple, fast, and reliable PDF sharing for educational environments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">1. Upload</h3>
                <p className="text-gray-600 text-sm">Faculty selects PDF files and target classroom</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Share className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">2. Share</h3>
                <p className="text-gray-600 text-sm">Files are instantly sent to the selected classroom</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Monitor className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">3. Receive</h3>
                <p className="text-gray-600 text-sm">Classroom devices automatically display new PDFs</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
