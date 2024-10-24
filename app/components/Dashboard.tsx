'use client';

import { useEffect, useState } from 'react';
import EmailBox from './emailbox';  // Import the EmailBox component

interface Email {
  id: string;
  subject: string;
  snippet: string;
  from: string;
  body: string;
}

export default function Dashboard() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);  // New loading state

  // Fetch token from URL query params (if coming from OAuth callback)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromURL = urlParams.get('token');
    if (tokenFromURL) {
      setToken(tokenFromURL);
    }
  }, []);

  // Fetch emails if token is available
  useEffect(() => {
    if (token) {
      setIsLoading(true);
      const fetchEmails = async () => {
        try {
          const res = await fetch(`/api/email?token=${token}`);
          const data = await res.json();
          setEmails(data.emails || []);
        } catch (error) {
          console.error('Error fetching emails:', error);
        } finally {
          setIsLoading(false);  // Stop loading
        }
      };

      fetchEmails();
    }
  }, [token]);

  return (
    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <h1 className="text-center text-3xl font-bold mb-10">Your Newsletters</h1>

      {isLoading ? (
        <div className="text-center text-lg text-gray-600">Fetching your emails...</div>
      ) : token ? (
        <ul className="space-y-6">
          {emails.length > 0 ? (
            emails.map((email) => (
              <li key={email.id} className="bg-white shadow rounded-lg p-6">
                <EmailBox email={email} />  {/* Render each email using EmailBox */}
              </li>
            ))
          ) : (
            <p className="text-center text-lg text-gray-600">No emails found.</p>
          )}
        </ul>
      ) : (
        <div className="text-center">
          <a
            href="/api/auth"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Connect Gmail
          </a>
        </div>
      )}
    </div>
  );
}