'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, 
  BookOpen, 
  Calendar, 
  FileText, 
  Award,
  LogOut,
  Loader2,
  GraduationCap
} from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { profileService, StudentBasicInfo, StudentDetailedInfo, AcademicYear } from '@/services/profile.service';
import { toast } from 'sonner';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [basicInfo, setBasicInfo] = useState<StudentBasicInfo | null>(null);
  const [detailedInfo, setDetailedInfo] = useState<StudentDetailedInfo | null>(null);
  const [academicYear, setAcademicYear] = useState<AcademicYear | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    loadProfileData();
  }, [isAuthenticated, router]);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      
      // Load data in parallel
      const [basic, year] = await Promise.all([
        profileService.getStudentBasicInfo(),
        profileService.getCurrentAcademicYear(),
      ]);
      
      setBasicInfo(basic);
      setAcademicYear(year);
      
      // Load detailed info after we have the academic year
      if (year) {
        const detailed = await profileService.getStudentDetailedInfo(year.id);
        setDetailedInfo(detailed);
      }
    } catch (error: any) {
      console.error('Error loading profile:', error);
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Progres Portal</h1>
                <p className="text-sm text-gray-600">Student Dashboard</p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, {basicInfo?.prenomLatin}!
          </h2>
          <p className="text-primary-100">
            Here's your academic overview
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Profile Card */}
          <div className="card card-hover">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Profile</h3>
            <p className="text-sm text-gray-600">
              {basicInfo?.prenomLatin} {basicInfo?.nomLatin}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {detailedInfo?.numeroInscription}
            </p>
          </div>

          {/* Academic Year Card */}
          <div className="card card-hover">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Academic Year</h3>
            <p className="text-sm text-gray-600">
              {academicYear?.code}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {detailedInfo?.niveauLibelleLongLt}
            </p>
          </div>

          {/* Status Card */}
          <div className="card card-hover">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Status</h3>
            <p className="text-sm text-gray-600">
              {detailedInfo?.refLibelleCycle}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Active Student
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all">
              <BookOpen className="w-8 h-8 text-primary-600 mb-2" />
              <p className="font-semibold text-gray-900">Academic Records</p>
              <p className="text-xs text-gray-600 mt-1">View your performance</p>
            </button>

            <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all">
              <FileText className="w-8 h-8 text-primary-600 mb-2" />
              <p className="font-semibold text-gray-900">Transcript</p>
              <p className="text-xs text-gray-600 mt-1">Download transcripts</p>
            </button>

            <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all">
              <Calendar className="w-8 h-8 text-primary-600 mb-2" />
              <p className="font-semibold text-gray-900">Schedule</p>
              <p className="text-xs text-gray-600 mt-1">View timetable</p>
            </button>

            <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all">
              <User className="w-8 h-8 text-primary-600 mb-2" />
              <p className="font-semibold text-gray-900">Profile</p>
              <p className="text-xs text-gray-600 mt-1">Manage account</p>
            </button>
          </div>
        </div>

        {/* Personal Information */}
        <div className="card mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-600">Full Name (Latin)</label>
              <p className="font-semibold text-gray-900 mt-1">
                {basicInfo?.prenomLatin} {basicInfo?.nomLatin}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Full Name (Arabic)</label>
              <p className="font-semibold text-gray-900 mt-1">
                {basicInfo?.prenomArabe} {basicInfo?.nomArabe}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Birth Date</label>
              <p className="font-semibold text-gray-900 mt-1">
                {basicInfo?.dateNaissance}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Birth Place</label>
              <p className="font-semibold text-gray-900 mt-1">
                {basicInfo?.lieuNaissance}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Registration Number</label>
              <p className="font-semibold text-gray-900 mt-1">
                {detailedInfo?.numeroInscription}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Transport Status</label>
              <p className="font-semibold text-gray-900 mt-1">
                {detailedInfo?.transportPaye ? (
                  <span className="text-green-600">✓ Paid</span>
                ) : (
                  <span className="text-red-600">✗ Unpaid</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

