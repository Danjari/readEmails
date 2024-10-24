import { google } from 'googleapis';
import { getEmails } from '../../libs/gmail';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    
    if (!token) {
      throw new Error('No token provided');
    }

    const oAuth2Client = new google.auth.OAuth2(
      process.env.NEXT_PUBLIC_CLIENT_ID,
      process.env.NEXT_PUBLIC_CLIENT_SECRET,
      process.env.NEXT_PUBLIC_REDIRECT_URI
    );
    
    // Use the refresh token to set credentials
    oAuth2Client.setCredentials({ refresh_token: token });

    // Fetch emails
    const emails = await getEmails(oAuth2Client);
    
    return NextResponse.json({ emails });
  } catch (error) {
    console.error('Error fetching emails:', error);
    return NextResponse.json({ error: 'Failed to retrieve emails' }, { status: 500 });
  }
}
