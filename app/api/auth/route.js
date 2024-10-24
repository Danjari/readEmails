import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.NEXT_PUBLIC_CLIENT_ID,
    process.env.NEXT_PUBLIC_CLIENT_SECRET,
    process.env.NEXT_PUBLIC_REDIRECT_URI
  );

  const scopes = [
    'https://www.googleapis.com/auth/gmail.readonly',
  ];

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });

  return NextResponse.redirect(authUrl);
}
