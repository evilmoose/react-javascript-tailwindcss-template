/**
 * Dashboard page component.
 */

import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';

const Dashboard = () => {
  const { currentUser, isAdmin } = useAuth();

  return (
    <Layout>
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <h1 className="text-2xl font-bold text-primary mb-6">
          {isAdmin ? 'Admin Dashboard' : 'Dashboard'}
        </h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Welcome, {currentUser?.first_name || 'User'}!</h2>
          <p className="text-neutral-600">
            {isAdmin 
              ? 'This is your admin dashboard where you can manage content, users, and system settings.'
              : 'This is your personal dashboard where you can manage your workflows and settings.'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-neutral-100 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-primary mb-2">My Workflows</h3>
            <p className="text-neutral-600 mb-4">
              Create and manage your custom workflows.
            </p>
            <button className="text-accent-blue hover:underline font-medium">
              View Workflows
            </button>
          </div>
          
          <div className="bg-neutral-100 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-primary mb-2">PDF Processing</h3>
            <p className="text-neutral-600 mb-4">
              Upload and process PDF documents with AI.
            </p>
            <Link to="/pdf-upload" className="text-accent-blue hover:underline font-medium">
              Go to PDF Upload
            </Link>
          </div>
          
          <div className="bg-neutral-100 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-primary mb-2">Settings</h3>
            <p className="text-neutral-600 mb-4">
              Manage your account and preferences.
            </p>
            <button className="text-accent-blue hover:underline font-medium">
              View Settings
            </button>
          </div>
          
          {isAdmin && (
            <>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-medium text-primary mb-2">Blog Management</h3>
                <p className="text-neutral-600 mb-4">
                  Create and edit blog posts.
                </p>
                <Link to="/blog/new" className="text-accent-blue hover:underline font-medium">
                  Create New Post
                </Link>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-medium text-primary mb-2">User Management</h3>
                <p className="text-neutral-600 mb-4">
                  Manage user accounts and permissions.
                </p>
                <button className="text-accent-blue hover:underline font-medium">
                  View Users
                </button>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-medium text-primary mb-2">Analytics</h3>
                <p className="text-neutral-600 mb-4">
                  View system analytics and reports.
                </p>
                <button className="text-accent-blue hover:underline font-medium">
                  View Analytics
                </button>
              </div>
            </>
          )}
        </div>
        
        <div className="mt-12 border-t border-neutral-200 pt-6">
          <h3 className="text-lg font-medium text-primary mb-4">Recent PDF Documents</h3>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard; 