import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.NEXT_PUBLIC_CLIENT_ID,
    process.env.NEXT_PUBLIC_CLIENT_SECRET,
    process.env.NEXT_PUBLIC_REDIRECT_URI
  );

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Here, I might need to save the refresh_token to your database
    // associated with the user's account ( later on )

    // Redirect to the main page with the access token
    return NextResponse.redirect(new URL(`/?token=${tokens.refresh_token}`, request.url));
  } catch (error) {
    console.error('Error getting tokens:', error);
    return NextResponse.json({ error: 'Failed to authenticate' }, { status: 500 });
  }
}
