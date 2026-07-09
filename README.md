<div align="center">
  <img src="https://via.placeholder.com/150/050505/FFFFFF?text=TrustNet+AI" alt="TrustNet AI Logo" width="150" />

  # TrustNet AI

  **Building a Safer Digital Society with AI**

  *An intelligent platform designed to combat online scams, fake news, phishing attempts, and malicious websites using advanced AI analysis and trust scoring.*

  <p align="center">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express" />
    <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
    <img src="https://img.shields.io/badge/Gemini_AI-8E75B2?style=for-the-badge&logo=google&logoColor=white" alt="Gemini" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  </p>
  
  <p align="center">
    <a href="https://github.com/Arpit599222/TrustNet/stargazers"><img src="https://img.shields.io/github/stars/Arpit599222/TrustNet?style=for-the-badge&color=yellow" alt="Stars" /></a>
    <a href="https://github.com/Arpit599222/TrustNet/issues"><img src="https://img.shields.io/github/issues/Arpit599222/TrustNet?style=for-the-badge&color=red" alt="Issues" /></a>
    <a href="https://github.com/Arpit599222/TrustNet/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Arpit599222/TrustNet?style=for-the-badge&color=blue" alt="License" /></a>
  </p>
</div>

---

## 🏆 Hackathon Project

**Track:** Responsible Digital Society 🌍

TrustNet AI was developed as a solution to help people identify online scams, fake news, phishing attempts, and malicious websites using AI-powered analysis and trust scoring.

---

## 📖 About

In today's hyper-connected world, digital threats are evolving faster than ever. Every day, millions of users fall victim to sophisticated attacks. TrustNet AI was built with a clear motivation: to protect users by providing an intelligent safety layer for the internet.

We are combating the increasing risks of:
- 🎣 **Phishing:** Fraudulent attempts to obtain sensitive information.
- 📰 **Fake News:** Misinformation campaigns designed to manipulate public opinion.
- 📱 **Scam Messages:** Fraudulent SMS, WhatsApp, and email schemes.
- 🎭 **Deepfakes:** Synthetic media used for deception and fraud.
- 🌐 **Fraud Websites:** Fake e-commerce and banking clones.
- 🔳 **QR Code Scams (Quishing):** Malicious QR codes leading to credential harvesting.
- 👥 **Online Impersonation:** Fake profiles mimicking trusted authorities.

**TrustNet AI** empowers users to make safer digital decisions by acting as an intelligent co-pilot that scans, analyzes, and verifies digital content in real-time.

---

## ✨ Features

- 🛡 **AI Scam Detector:** Instantly analyze texts and emails for malicious intent and psychological manipulation.
- 🌐 **Website Trust Checker:** Deep-scan domains for SSL validity, domain age, and known threat signatures.
- 📰 **Fake News Verification:** Cross-reference claims against trusted databases to combat misinformation.
- 🖼 **Image Analysis:** Detect deepfakes and manipulated media using computer vision.
- 🤖 **AI Safety Assistant:** An interactive conversational agent providing real-time security advice.
- 📊 **Community Dashboard:** A crowdsourced threat intelligence feed alerting users to trending scams.
- 📈 **Reports & Analytics:** Detailed scan history logs and personalized risk assessments.
- 🔐 **Secure Authentication:** Robust multi-provider login system backed by enterprise-grade security.

---

## 💻 Tech Stack

### Frontend
- **Framework:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js

### Database & Auth
- **Database:** Supabase PostgreSQL
- **Authentication:** Firebase Auth (Google) + Supabase Auth (Email/Password)

### AI Integration
- **LLM Engine:** Google Gemini Pro

### Deployment
- **Frontend:** Vercel *(Planned)*
- **Backend:** Render *(Planned)*

---

## 🏗 Architecture

```mermaid
graph TD
    Client[React Frontend] -->|REST API| Server[Express Backend]
    Client -->|OAuth| Firebase[Firebase Auth]
    Server -->|JWT Verification| Firebase
    Server -->|SQL Queries| DB[(Supabase PostgreSQL)]
    Server -->|Prompt Engineering| Gemini[Google Gemini API]
    
    subgraph Frontend Features
        Dashboard
        Scanner
        Community
        AIAssistant
    end
    
    Frontend Features --> Client
```

---

## 📂 Folder Structure

```text
TrustNet/
├── client/                 # React Frontend
│   ├── public/             # Static Assets
│   ├── src/
│   │   ├── components/     # Reusable UI Components
│   │   ├── config/         # Firebase/Client Configs
│   │   ├── context/        # React Context Providers (Auth, Theme)
│   │   ├── pages/          # Application Views
│   │   ├── utils/          # Helper Functions
│   │   ├── App.tsx         # Main Routing Layer
│   │   └── index.css       # Global Styles & Theme Tokens
│   ├── package.json
│   └── vite.config.ts
├── server/                 # Express Backend
│   ├── src/
│   │   ├── config/         # Supabase/Server Configs
│   │   ├── controllers/    # Route Logic (Auth, Scanner, etc.)
│   │   ├── middleware/     # JWT Verification
│   │   ├── routes/         # API Endpoints
│   │   └── index.ts        # Server Entry Point
│   ├── package.json
│   └── tsconfig.json
├── README.md
└── .gitignore
```

---

## 🚀 Installation

### 1. Clone the repository
```bash
git clone https://github.com/Arpit599222/TrustNet.git
cd TrustNet
```

### 2. Install dependencies
Open two terminals. One for the client, one for the server.

**Client:**
```bash
cd client
npm install
```

**Server:**
```bash
cd server
npm install
```

### 3. Environment Variables
See the [Environment Variables](#-environment-variables) section below for required `.env` configurations.

### 4. Run Development Servers

**Start Backend (Server):**
```bash
cd server
npm run dev
```

**Start Frontend (Client):**
```bash
cd client
npm run dev
```

### 5. Production Build
```bash
cd client
npm run build
```

---

## 🔐 Environment Variables

You will need to create `.env` files in both the `client` and `server` directories.

### `server/.env`
```env
PORT=3000
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
JWT_SECRET=your_secure_jwt_secret
GEMINI_API_KEY=your_google_gemini_api_key
```

### `client/.env`
```env
VITE_API_URL=http://localhost:3000/api
```
*(Firebase configuration is injected securely via the client config.)*

---

## 📸 Screenshots

| Landing Page | Authentication |
| :---: | :---: |
| <img src="https://via.placeholder.com/400x250/050505/FFFFFF?text=Landing+Page" alt="Landing Page" /> | <img src="https://via.placeholder.com/400x250/050505/FFFFFF?text=Authentication" alt="Authentication" /> |

| Dashboard | Scanner |
| :---: | :---: |
| <img src="https://via.placeholder.com/400x250/050505/FFFFFF?text=Dashboard" alt="Dashboard" /> | <img src="https://via.placeholder.com/400x250/050505/FFFFFF?text=Scanner" alt="Scanner" /> |

| AI Assistant | Community Feed |
| :---: | :---: |
| <img src="https://via.placeholder.com/400x250/050505/FFFFFF?text=AI+Assistant" alt="AI Assistant" /> | <img src="https://via.placeholder.com/400x250/050505/FFFFFF?text=Community" alt="Community" /> |

| Reports |
| :---: |
| <img src="https://via.placeholder.com/400x250/050505/FFFFFF?text=Reports" alt="Reports" /> |

---

## 🗺 Roadmap

- [x] Initial Repository Setup
- [x] UI/UX Prototyping (Matte Black Theme)
- [x] Supabase Database Integration
- [x] Firebase Google Authentication
- [x] Gemini AI Scanner Logic
- [ ] Connect Live Community Feed
- [ ] Implement Report PDF Exports
- [ ] Add Localization Support

---

## 🔮 Future Features

- 🧩 **Chrome Extension:** Real-time browsing protection.
- 🛡 **Browser Protection:** Intercept malicious downloads natively.
- 📱 **Mobile App:** iOS and Android native clients.
- 🎙 **AI Voice Assistant:** Detect deepfake audio and scam calls.
- 🔌 **Threat Intelligence API:** Open API for other developers to consume our trust scores.
- ⏱ **Real-time Monitoring:** Webhook alerts for emerging threats.

---

## 🔒 Security

At TrustNet AI, security is our primary product and core philosophy.
- **Secure Authentication:** Passwords are mathematically hashed using Bcrypt. OAuth tokens are verified securely on the backend before any session is granted.
- **Data Privacy:** We minimize data collection. Scan histories are encrypted at rest using Supabase's AES-256 encryption.
- **Encryption:** All transit data is strictly enforced over TLS/HTTPS. Internal microservices communicate over secure VPC networking.

---

## 🤝 Contributing

We welcome contributions from the open-source community!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please read our `CONTRIBUTING.md` (coming soon) for detailed guidelines.

---

## 👥 Core Contributors

Made with ❤️ by an incredible team dedicated to internet safety:

| <a href="https://github.com/"><img src="https://via.placeholder.com/100/050505/FFFFFF?text=KV" width="100" style="border-radius:50%;"/><br/><b>Khushi Verma</b></a> | <a href="https://github.com/"><img src="https://via.placeholder.com/100/050505/FFFFFF?text=AR" width="100" style="border-radius:50%;"/><br/><b>Arpit Raj</b></a> | <a href="https://github.com/"><img src="https://via.placeholder.com/100/050505/FFFFFF?text=IG" width="100" style="border-radius:50%;"/><br/><b>Ishani Gupta</b></a> |
| :---: | :---: | :---: |

---

## 🙏 Acknowledgements

- **[React](https://reactjs.org/)** for the incredible UI library.
- **[Supabase](https://supabase.com/)** for the open-source Firebase alternative.
- **[Google Gemini](https://deepmind.google/technologies/gemini/)** for the state-of-the-art LLM capabilities.
- **[Open Source Community](https://github.com/)** for continuous inspiration and support.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p>⭐ If you like this project, please consider giving it a star.</p>
  <b>Building a Safer Digital Society with AI.</b>
</div>
