import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import { Upload, FileText, CheckCircle, AlertCircle, Loader2, Download } from 'lucide-react';
import { bulkAddTours } from '../lib/dbService';
import { useAuth } from '../lib/AuthContext';

const AdminPage: React.FC = () => {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simple admin check (in a real app, this would check a custom claim or specific admin emails)
  const isAdmin = user && (user.email === 'viiding@gmail.com' || user.email?.includes('admin'));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
        setErrorMessage('Please upload a valid CSV file.');
        setUploadStatus('error');
        return;
      }
      setFile(selectedFile);
      setUploadStatus('idle');
      setErrorMessage('');
      parseCSV(selectedFile);
    }
  };

  const parseCSV = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          console.error('CSV Parsing Errors:', results.errors);
          setErrorMessage('Error parsing CSV. Please check the format.');
          setUploadStatus('error');
          return;
        }
        
        // Transform and validate data
        const transformedData = results.data.map((row: any) => {
          const tags = typeof row.tags === 'string' ? row.tags.split(',').map((t: string) => t.trim()) : [];
          
          let day_by_day = [];
          try {
            if (row.day_by_day) {
              day_by_day = JSON.parse(row.day_by_day);
            }
          } catch (e) {
            console.warn('Failed to parse day_by_day JSON for row', row.id, e);
          }
          
          return {
            ...row,
            price: row.price ? Number(row.price) : 0,
            days: row.days ? Number(row.days) : 0,
            rating: row.rating ? Number(row.rating) : 0,
            reviews: row.reviews ? Number(row.reviews) : 0,
            operator_in_kenya: row.operator_in_kenya === 'true' || row.operator_in_kenya === 'TRUE',
            tags,
            day_by_day,
            // Ensure title exists (fallback to operator + location if missing)
            title: row.title || `${row.days || 0}-Day Safari by ${row.operator || 'Operator'}`
          };
        });

        setParsedData(transformedData);
      },
      error: (error) => {
        console.error('PapaParse Error:', error);
        setErrorMessage('Failed to read the file.');
        setUploadStatus('error');
      }
    });
  };

  const handleUpload = async () => {
    if (parsedData.length === 0) return;
    
    setIsUploading(true);
    setUploadStatus('idle');
    setErrorMessage('');

    try {
      await bulkAddTours(parsedData);
      setUploadStatus('success');
      setFile(null);
      setParsedData([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error: any) {
      console.error('Upload failed:', error);
      setUploadStatus('error');
      setErrorMessage(error.message || 'Failed to upload tours to the database.');
    } finally {
      setIsUploading(false);
    }
  };

  const downloadTemplate = () => {
    const templateData = [{
      id: 'tour_1',
      tid: 't36760',
      operator: 'Back of Africa Adventure',
      price: 1540,
      days: 5,
      image: 'https://cloudfront.safaribookings.com/lib/kenya/tour/480x240/Lake_Nakuru_National_Park_027.jpg',
      image_hd: 'https://cloudfront.safaribookings.com/lib/kenya/tour/744x372/Lake_Nakuru_National_Park_027.jpg',
      category: 'safari',
      location: 'Kenya',
      start_location: 'Mombasa',
      end_location: 'Mombasa',
      parks_visited: 'Tsavo East NP, Amboseli NP, Tsavo West NP, Taita Hills WS, Diani Beach',
      comfort_level: 'Luxury',
      tour_type: 'Private',
      accommodation_type: 'Lodge & Tented Camp',
      rating: 5,
      reviews: 90,
      tags: 'safari,luxury,private,best_seller',
      operator_in_kenya: true,
      description: 'The 5-day safari from Mombasa/Diani takes you to the land of the famous man-eating lions...',
      tour_features: 'Tour Features Luxury tour This luxury tour uses lodges and tented camps...',
      activities_transportation: 'Activities & Transportation Activities: game drives...',
      accommodation_meals_detail: 'Accommodation & Meals Additional accommodation before and at the end of the tour...',
      day_by_day: JSON.stringify([
        {
          day_num: 0,
          header: 'Arrival',
          content: "You'll be collected from the airport."
        },
        {
          day_num: 1,
          header: 'Mombasa – Tsavo East National Park',
          content: "You'll be picked up from the airport or your hotel early in the morning..."
        }
      ]),
      rates_notes: 'Important to Know This tour is not available to solo travelers...',
      rates_table: 'Start dates Solo 1 room 2 people...',
      included: 'Included Park fees (For non-residents)...',
      excluded: 'Excluded International flights (From/to home)...',
      getting_there: 'Getting There This tour starts and ends in Mombasa...',
      offered_by: 'This Tour Is Offered By Back of Africa Adventure Limited...'
    }];
    
    const csv = Papa.unparse(templateData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'tour_upload_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-obsidian mb-2">Access Denied</h1>
          <p className="text-obsidian/70">You do not have permission to view the admin dashboard. Please sign in with an administrator account.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-obsidian mb-4">Admin Dashboard</h1>
        <p className="text-lg text-obsidian/70">Bulk upload tours to the platform database.</p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-black/5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-obsidian">Bulk Upload Tours</h2>
            <p className="text-obsidian/60 mt-1">Upload a CSV file containing tour data.</p>
          </div>
          <button 
            onClick={downloadTemplate}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-obsidian bg-black/5 hover:bg-black/10 rounded-full transition-colors"
          >
            <Download size={16} />
            Download CSV Template
          </button>
        </div>

        {/* Upload Area */}
        <div 
          className={`border-2 border-dashed rounded-2xl p-12 text-center transition-colors ${
            file ? 'border-acacia-green bg-acacia-green/5' : 'border-black/10 hover:border-black/20 bg-black/5'
          }`}
        >
          <input 
            type="file" 
            accept=".csv" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          
          {file ? (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-acacia-green/20 text-acacia-green rounded-full flex items-center justify-center mb-4">
                <FileText size={32} />
              </div>
              <h3 className="text-lg font-bold text-obsidian">{file.name}</h3>
              <p className="text-obsidian/60 mt-1">{parsedData.length} tours found</p>
              <button 
                onClick={() => {
                  setFile(null);
                  setParsedData([]);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="mt-4 text-sm text-red-500 hover:underline"
              >
                Remove file
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white text-obsidian/40 rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Upload size={32} />
              </div>
              <h3 className="text-lg font-bold text-obsidian mb-2">Select a CSV file to upload</h3>
              <p className="text-obsidian/60 mb-6 max-w-md mx-auto">
                Ensure your CSV matches the template format.
              </p>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 bg-obsidian text-white font-medium rounded-full hover:bg-obsidian/90 transition-colors"
              >
                Browse Files
              </button>
            </div>
          )}
        </div>

        {/* Status Messages */}
        {uploadStatus === 'error' && (
          <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
            <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="font-bold text-red-800">Upload Error</h4>
              <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
            </div>
          </div>
        )}

        {uploadStatus === 'success' && (
          <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-xl flex items-start gap-3">
            <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="font-bold text-green-800">Upload Successful!</h4>
              <p className="text-green-600 text-sm mt-1">The tours have been added to the database.</p>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleUpload}
            disabled={!file || parsedData.length === 0 || isUploading}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all ${
              !file || parsedData.length === 0 || isUploading
                ? 'bg-black/5 text-obsidian/30 cursor-not-allowed'
                : 'bg-acacia-green text-white hover:bg-acacia-green/90 shadow-lg hover:shadow-xl hover:-translate-y-0.5'
            }`}
          >
            {isUploading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload size={20} />
                Upload {parsedData.length > 0 ? `${parsedData.length} Tours` : 'Tours'}
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Preview Section */}
      {parsedData.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xl font-bold text-obsidian mb-4">Data Preview</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-black/5 text-obsidian/60 font-medium">
                  <tr>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Operator</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Days</th>
                    <th className="px-6 py-4">Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {parsedData.slice(0, 5).map((row, i) => (
                    <tr key={i} className="hover:bg-black/5 transition-colors">
                      <td className="px-6 py-4 font-medium text-obsidian truncate max-w-[200px]">{row.title || '-'}</td>
                      <td className="px-6 py-4 text-obsidian/70">{row.operator || '-'}</td>
                      <td className="px-6 py-4 text-obsidian/70">${row.price || 0}</td>
                      <td className="px-6 py-4 text-obsidian/70">{row.days || 0}</td>
                      <td className="px-6 py-4 text-obsidian/70">{row.location || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {parsedData.length > 5 && (
              <div className="px-6 py-4 bg-black/5 text-center text-sm text-obsidian/60">
                Showing 5 of {parsedData.length} rows
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
