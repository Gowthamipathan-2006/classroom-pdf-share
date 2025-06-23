
export interface SharedPDF {
  id: string;
  name: string;
  roomNumber: string;
  uploadedAt: Date;
  file: File;
}

const STORAGE_KEY = 'faculty_pdfs';

export const savePDFToRoom = (file: File, roomNumber: string): void => {
  const existingPDFs = getPDFsForAllRooms();
  
  const newPDF: SharedPDF = {
    id: Date.now().toString(),
    name: file.name,
    roomNumber,
    uploadedAt: new Date(),
    file
  };

  const updatedPDFs = [...existingPDFs, newPDF];
  
  // Store the PDFs (note: in a real app, you'd use proper file storage)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPDFs.map(pdf => ({
    ...pdf,
    uploadedAt: pdf.uploadedAt.toISOString(),
    // We can't store the actual file in localStorage, so we'll store file info
    fileInfo: {
      name: pdf.file.name,
      size: pdf.file.size,
      type: pdf.file.type
    }
  }))));
  
  console.log(`PDF "${file.name}" saved to Room ${roomNumber}`);
};

export const getPDFsForRoom = (roomNumber: string): SharedPDF[] => {
  const allPDFs = getPDFsForAllRooms();
  return allPDFs.filter(pdf => pdf.roomNumber === roomNumber);
};

export const getPDFsForAllRooms = (): SharedPDF[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    return parsed.map((item: any) => ({
      ...item,
      uploadedAt: new Date(item.uploadedAt),
      // Create a mock file object for display purposes
      file: new File([''], item.fileInfo.name, { type: item.fileInfo.type })
    }));
  } catch (error) {
    console.error('Error loading PDFs:', error);
    return [];
  }
};

export const clearPDFsForRoom = (roomNumber: string): void => {
  const allPDFs = getPDFsForAllRooms();
  const filteredPDFs = allPDFs.filter(pdf => pdf.roomNumber !== roomNumber);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPDFs.map(pdf => ({
    ...pdf,
    uploadedAt: pdf.uploadedAt.toISOString(),
    fileInfo: {
      name: pdf.file.name,
      size: pdf.file.size,
      type: pdf.file.type
    }
  }))));
  
  console.log(`Cleared all PDFs for Room ${roomNumber}`);
};
