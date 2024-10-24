// //libs/gmail.js
import {google} from "googleapis"

// Helper function to extract email content
const getEmailBody = (payload) => {
  let body = '';

  // If the email has multiple parts (e.g., text/plain and text/html)
  if (payload.parts && payload.parts.length) {
    // Loop through each part to find text/html or text/plain
    for (let part of payload.parts) {
      if (part.mimeType === 'text/html') {
        body = Buffer.from(part.body.data, 'base64').toString('utf-8');
        break;  // Prioritize HTML content
      } else if (part.mimeType === 'text/plain') {
        body = Buffer.from(part.body.data, 'base64').toString('utf-8');
      }
    }
  } else {
    // If the email has no parts (simple emails), use the body directly
    body = Buffer.from(payload.body.data, 'base64').toString('utf-8');
  }

  return body;
};

// Function to fetch and process emails
export async function getEmails(auth) {
  const gmail = google.gmail({ version: 'v1', auth });
  
  // Fetch the list of messages
  const res = await gmail.users.messages.list({
    userId: 'me',
    q: 'label:Newsletters',
    maxResults: 10,
  });

  const messages = res.data.messages || [];

  const emails = await Promise.all(
    messages.map(async (message) => {
      // Fetch the full message by ID
      const email = await gmail.users.messages.get({
        userId: 'me',
        id: message.id,
      });

      // Extract the body content from the payload
      const emailBody = getEmailBody(email.data.payload);

      return {
        id: email.data.id,
        snippet: email.data.snippet,
        subject: email.data.payload.headers.find(h => h.name === 'Subject')?.value,
        from: email.data.payload.headers.find(h => h.name === 'From')?.value,
        body: emailBody
      };
    })
  );

  return emails;
}