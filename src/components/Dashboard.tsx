import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Download, Plus, Trash2, LogOut } from 'lucide-react';
import ResumeForm from './ResumeForm';
import { generatePDF } from '../utils/pdfGenerator';

interface Resume {
  id: string;
  name: string;
  title: string;
  data: any;
}

const Dashboard = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [showForm, setShowForm] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAddResume = (resumeData: any) => {
    const newResume = {
      id: Date.now().toString(),
      name: resumeData.fullName,
      title: resumeData.jobTitle,
      data: resumeData,
    };
    setResumes([...resumes, newResume]);
    setShowForm(false);
  };

  const handleDeleteResume = (id: string) => {
    setResumes(resumes.filter(resume => resume.id !== id));
  };

  const handleDownload = (resume: Resume) => {
    generatePDF(resume.data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-gray-900">Resume Dashboard</h1>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm ? (
          <ResumeForm onSubmit={handleAddResume} onCancel={() => setShowForm(false)} />
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">My Resumes</h2>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                New Resume
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {resumes.map((resume) => (
                <div
                  key={resume.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{resume.name}</h3>
                      <p className="text-sm text-gray-500">{resume.title}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDownload(resume)}
                        className="p-2 text-gray-400 hover:text-gray-500"
                      >
                        <Download className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteResume(resume.id)}
                        className="p-2 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {resumes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No resumes yet. Create your first resume!</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;