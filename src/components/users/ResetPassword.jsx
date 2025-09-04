// pages/reset-password.js
'use client'
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import { 
  FiKey, 
  FiAlertTriangle, 
  FiLoader, 
  FiCopy,
  FiDownload
} from 'react-icons/fi';

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const [appNotInstalled, setAppNotInstalled] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    
    if (tokenParam) {
      setToken(tokenParam);
      setLoading(false);
      window.location.href = `spicedirectwholesale://reset-password?token=${tokenParam}`;
      const timer = setTimeout(() => {
        setAppNotInstalled(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`spicedirectwholesale://reset-password?token=${token}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const simulateAppNotFound = () => {
    setAppNotInstalled(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Head>
        <title>Reset Password - Spice Direct Wholesale</title>
        <meta name="description" content="Reset your Spice Direct Wholesale account password" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="rounded-full bg-white p-4 shadow-lg">
            <FiKey className="h-12 w-12 text-indigo-600" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Spice Direct Wholesale
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Secure access to your wholesale account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-gray-100">
          {!appNotInstalled ? (
            <div className="text-center">
              <div className="flex justify-center">
                <div className="animate-pulse">
                  <FiLoader className="animate-spin h-12 w-12 text-indigo-600 mx-auto" />
                </div>
              </div>
              <p className="mt-4 text-lg font-medium text-gray-700">Redirecting to Spice Direct Wholesale App...</p>
              <p className="mt-2 text-sm text-gray-500">Please wait while we open the application</p>
              
             
            </div>
          ) : (
            <div className="text-center">
              <FiAlertTriangle className="mx-auto h-16 w-16 text-yellow-500" />
              <h3 className="mt-4 text-xl font-medium text-gray-900">App Not Found</h3>
              <p className="mt-2 text-sm text-gray-500">
                The app didn't open automatically. Please make sure you have the Spice Direct Wholesale app installed.
              </p>
              <div className="mt-6 space-y-4">
                <a
                  href="https://play.google.com/store/apps/details?id=com.spicedirectwholesale"
                  className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                  <FiDownload className="mr-2" />
                  Download App from Play Store
                </a>
                
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-2">If the app is already installed, copy this link and open it:</p>
                  <div className="mt-2 p-3 bg-gray-50 rounded-md break-all text-xs font-mono text-gray-700 border border-gray-200 flex items-center justify-between">
                    <span>{token ? `spicedirectwholesale://reset-password?token=${token}` : 'No token provided'}</span>
                    <button 
                      onClick={handleCopyLink}
                      className="ml-2 text-indigo-600 hover:text-indigo-800 p-1 rounded hover:bg-indigo-50"
                      title="Copy to clipboard"
                    >
                      <FiCopy />
                    </button>
                  </div>
                  {copied && (
                    <div className="mt-2 text-xs text-green-600">
                      Link copied to clipboard!
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Spice Direct Wholesale. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;