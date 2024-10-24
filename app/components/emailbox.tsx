

'use client';

import { useState } from 'react';
import { ElevenLabsClient } from 'elevenlabs';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../libs/firebase';
import { Readable } from 'stream';

interface Email {
  id: string;
  subject: string;
  snippet: string;
  from: string;
  body: string;
}

interface EmailBoxProps {
  email: Email;
}

export default function EmailBox({ email }: EmailBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  // Initialize ElevenLabs client
  const elevenlabs = new ElevenLabsClient({
    apiKey: process.env.NEXT_PUBLIC_ELEVEN_LABS_API_KEY, 
  });

  const stripHtml = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const plainText = stripHtml(email.body);

  const uploadToFirebase = async (audioBuffer: ArrayBuffer) => {
    const audioBlob = new Blob([audioBuffer], { type: 'audio/mpeg' });
    const audioRef = ref(storage, `audio/${Date.now()}.mp3`); // Unique filename
    
    console.log('Uploading audio to Firebase...');
    // Upload the audio file to Firebase
    await uploadBytes(audioRef, audioBlob);
    console.log('Upload complete. Fetching download URL...');
    // Get and return the download URL
    const downloadUrl = await getDownloadURL(audioRef);
    console.log('Download URL fetched:', downloadUrl);
    return downloadUrl;
  };

  // Helper function to convert Readable to ArrayBuffer
  const readableToArrayBuffer = async (readable: Readable): Promise<ArrayBuffer> => {
    const chunks: Uint8Array[] = [];
    console.log('Converting readable stream to array buffer...');
    for await (const chunk of readable) {
      chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    const buffer = Buffer.concat(chunks);
    console.log('Conversion complete.');
    return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
  };

  const handleTTS = async () => {
    try {
      setIsPlaying(true);
      setAudioUrl(null);
      console.log('Generating audio from ElevenLabs...');
      // Generate audio using ElevenLabs
      const audio = await elevenlabs.generate({
        voice: 'Rachel',
        text: plainText,
        model_id: 'eleven_multilingual_v2',
      });
      console.log('Audio generated:', audio);

      // Convert Readable to ArrayBuffer
      const audioBuffer = await readableToArrayBuffer(audio);
      console.log('Audio converted to ArrayBuffer. Uploading to Firebase...');

      // Upload the audio to Firebase and get the download URL
      const downloadUrl = await uploadToFirebase(audioBuffer);
      console.log('Audio uploaded to Firebase successfully. URL:', downloadUrl);
      setAudioUrl(downloadUrl);  // Set the URL for playback
      setIsPlaying(false);
    } catch (error) {
      console.error('Error generating speech or uploading to Firebase:', error);
      setIsPlaying(false);
    }
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handlePlayAudio = () => {
    if (audioUrl) {
      const audioElement = new Audio(audioUrl);
      audioElement.play();
      audioElement.onended = () => setIsPlaying(false);
    }
  };

  return (
    <div>
      <div
        style={{
          cursor: 'pointer',
          borderBottom: '1px solid #ccc',
          padding: '10px',
        }}
        onClick={toggleOpen}
      >
        <h3>{email.subject}</h3>
        <p><strong>From:</strong> {email.from}</p>
        <p><strong>Snippet:</strong> {email.snippet}</p>
      </div>

      {isOpen && (
        <div style={{ margin: '10px 0', padding: '10px', backgroundColor: '#f9f9f9' }}>
          
          <div dangerouslySetInnerHTML={{ __html: email.body }} />

          <div style={{ marginTop: '10px' }}>
            {/* <h4>Email Body (Plain Text for TTS):</h4>
            <p>{plainText}</p> */}

            {!audioUrl && (
              <button onClick={handleTTS} disabled={isPlaying} className='font-semibold text-indigo-600'>
                {isPlaying ? 'Generating Audio...' : 'Generate Audio'}
              </button>
            )}

            {audioUrl && (
              <button onClick={handlePlayAudio} className='font-semibold text-indigo-600'>
                Play Audio
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}