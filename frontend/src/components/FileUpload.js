import React, { useState } from 'react';
import axios from 'axios';
import { Upload, FileText } from 'lucide-react';
import { UPLOAD_API_URL } from '../config';

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(UPLOAD_API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onUpload(response.data);
      setFile(null);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4">
        <div className="flex items-center justify-center mb-4">
          <Upload className="w-8 h-8 text-blue-500 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Upload Contract PDF</h2>
        </div>
        <div className="mt-4">
          <label className="block mb-2">
            <span className="sr-only">Choose file</span>
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
              "
            />
          </label>
        </div>
        {file && (
          <div className="mt-2 flex items-center text-sm text-gray-600">
            <FileText className="w-4 h-4 mr-2" />
            <span className="truncate">{file.name}</span>
          </div>
        )}
        <div className="mt-4">
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className={`w-full px-4 py-2 text-white font-semibold rounded-lg ${!file || uploading
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
              } transition duration-300 ease-in-out`}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
