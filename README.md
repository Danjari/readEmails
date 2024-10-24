# readEmails 📧 🎧

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Gmail API](https://img.shields.io/badge/Gmail%20API-EA4335?style=flat-square&logo=gmail&logoColor=white)](https://developers.google.com/gmail/api)
[![ElevenLabs](https://img.shields.io/badge/ElevenLabs-5A67D8?style=flat-square)](https://elevenlabs.io/)

readEmails is web application designed to help users organize, view, and listen to their email newsletters effortlessly. It integrates with Gmail using the Gmail API to fetch emails and uses ElevenLabs to convert email content into speech for users to listen to their emails/newsletters. This tool is especially useful for users who want to manage and consume their email content in a more convenient and efficient way, anywhere and anytime.

## 🎯 The Problem It Solves

I face two main problems when it comes to emails/newsletter:

1. **Information Overload**: 
   - My inbox is flooded with countless emails
   - Important newsletters get lost in the noise
   - No easy way to filter and focus on your favorite content

2. **Limited Time & Mobility**:
   - Busy urban lifestyle leaves little time for reading
   - Morning commutes, workouts, or walks through New York streets are perfect opportunities to consume content
   - Reading while walking isn't practical or safe

readEmails transforms these challenges into opportunities:

- **Smart Filtering**: Focus only on the newsletters that matter to you most
- **Audio Freedom**: Turn your favorite newsletters into your personal podcast
- **Urban Companion**: Stay informed while navigating city life, whether you're:


## ✨ Features

- **Smart Email Management** - Seamlessly connect with Gmail to organize and filter your newsletters
- **Audio Transformation** - Convert email content to high-quality speech using ElevenLabs
- **Secure Storage** - Store and manage audio files securely with Firebase
- **User-Friendly Interface** - Built with Next.js for a smooth, responsive experience

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:

- Node.js (v16 or higher)
- npm or yarn
- Google Cloud account
- Firebase account
- ElevenLabs account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/readEmails.git
cd readEmails
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Environment Setup**

Create a `.env.local` file in the project root:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_MEASUREMENT_ID= your_measurement_id

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_REDIRECT_URI= http://localhost:3000/api/callback

# ElevenLabs API
NEXT_PUBLIC_ELEVENLABS_API_KEY=your_elevenlabs_api_key
```

### 🔧 Configuration

#### Gmail API Setup

1. Visit the [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the Gmail API
4. Configure OAuth consent screen
5. Create credentials (OAuth 2.0 Client ID)
6. Download the client configuration file

#### Firebase Setup

1. Go to the [Firebase Console](https://console.firebase.google.com)
2. Create a new project or select an existing one
3. Enable Firebase Storage
4. Configure Storage Rules:

```rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

### 🏃‍♂️ Running the Application

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` to see your application.

## 🔌 API Integration Details

### Gmail API
- **Purpose**: Fetches and manages email newsletters
- **Authentication**: OAuth 2.0
- **Documentation**: [Gmail API Guide](https://developers.google.com/gmail/api/guides)
- **Scope Required**: `https://www.googleapis.com/auth/gmail.readonly`

### ElevenLabs API
- **Purpose**: High-quality text-to-speech conversion
- **Authentication**: API Key
- **Documentation**: [ElevenLabs API Docs](https://api.elevenlabs.io/docs)
- **Features Used**: Text to Speech, Voice Selection

## 🛠️ Tech Stack

- **Frontend**: Next.js, React
- **Authentication**: Google OAuth 2.0
- **Storage**: Firebase Storage
- **APIs**: Gmail API, ElevenLabs API
- **Styling**: Tailwind CSS

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Firebase for secure and scalable storage
- ElevenLabs for high-quality text-to-speech
- OpenAI for AI-powered code assistance

## ✌️ AI Support
- Claude: for generating the README
- CHAT GPT: Debugging parts of the gmail token retrieval and code comments ( make more readable) 
- CHATGPT: Reusing old code (landing page from another project of mine)
- CHATGPT: Help retrieve precise information in Google and elevenlabs documentations 
  

## 📞 Support

If you have any questions or need help, please:
- Open an issue
- Contact the maintainers
- Check our [Documentation](docs/README.md)

---

Made with ❤️ by Moudja
