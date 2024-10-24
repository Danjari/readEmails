

// 'use client';

// import { useEffect, useState } from 'react';
// import EmailBox from './components/emailbox';  // Import the EmailBox component

// interface Email {
//   id: string;
//   subject: string;
//   snippet: string;
//   from: string;
//   body: string;
// }

// export default function Dashboard() {
//   const [emails, setEmails] = useState<Email[]>([]);
//   const [token, setToken] = useState<string | null>(null);

//   // Fetch token from URL query params (if coming from OAuth callback)
//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const tokenFromURL = urlParams.get('token');
//     if (tokenFromURL) {
//       setToken(tokenFromURL);
//     }
//   }, []);

//   // Fetch emails if token is available
//   useEffect(() => {
//     if (token) {
//       const fetchEmails = async () => {
//         const res = await fetch(`/api/email?token=${token}`);
//         const data = await res.json();
//         setEmails(data.emails || []);
//       };

//       fetchEmails();
//     }
//   }, [token]);

//   return (
//     <div>
//       <h1>Your Newsletters</h1>

//       {token ? (
//         <ul>
//           {emails.length > 0 ? (
//             emails.map((email) => (
//               <li key={email.id} style={{ listStyle: 'none', marginBottom: '20px' }}>
//                 <EmailBox email={email} />  {/* Render each email using EmailBox */}
//               </li>
//             ))
//           ) : (
//             <p>No emails found.</p>
//           )}
//         </ul>
//       ) : (
//         <a href="/api/auth">Connect Gmail</a>
//       )}
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import Hero from './components/hero';  // Import the Hero component (landing page)
import Dashboard from './components/Dashboard';  // Import the Dashboard component

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state to handle async token check

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromURL = urlParams.get('token');
    
    if (tokenFromURL) {
      setToken(tokenFromURL); // Set token if found in URL params
    }
    
    setIsLoading(false); // Once token is checked, stop loading
  }, []);

  // While loading, you can show a loading spinner or text (optional)
  if (isLoading) {
    return <div className="text-center text-lg text-gray-600">Loading...</div>;
  }

  // Render Dashboard if authenticated, otherwise show Hero (landing page)
  return token ? <Dashboard /> : <Hero />;
}