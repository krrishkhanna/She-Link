# SheLink

**SheLink** is a decentralized peer-to-peer community platform built exclusively for women. It empowers secure communication, privacy, and community governance using modern technologies like TypeScript, Supabase, Azure Web PubSub, and WebRTC.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)

---

## Overview

SheLink provides a secure online space for women to connect, communicate, and collaborate. It leverages decentralized technologies to ensure privacy and autonomy while fostering community-driven governance.

---

## Features

- **Secure Authentication**: Facial recognition for women-only access
- **Real-time Chat**: Instant messaging using Azure Web PubSub
- **Peer-to-Peer Communication**: End-to-end encrypted messaging via WebRTC
- **Health & Wellness Forums**: Dedicated discussion spaces
- **Privacy Controls**: Customizable privacy settings
- **Community Governance**: Decentralized rule-making and moderation
- **Token Exchange System**: Blockchain-based secure transactions

---

## Technology Stack

### **Frontend**
- TypeScript
- React.js
- Tailwind CSS

### **Backend**
- Supabase (PostgreSQL database + authentication)

### **Realtime Communication**
- Azure Web PubSub
- WebRTC

### **Facial Recognition**
- Azure Face API

### **Deployment**
- Vercel

---

## Getting Started

### Prerequisites

Before running the project locally, ensure you have the following installed:
1. **Node.js** (v18 or higher)
2. **npm** or **pnpm**
3. **Supabase account** (for authentication and database setup)
4. **Azure account** (for Web PubSub and Face API)

---

### Installation

1. Clone the repository:
  git clone https://github.com/lostboysrtk/SheLink.git
  cd SheLink
2. Install dependencies:

---

### Environment Setup

1. Create a `.env.local` file in the root directory with the following variables:
Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

Azure Web PubSub Configuration
NEXT_PUBLIC_AZURE_WEBPUBSUB_CONNECTION_STRING=Endpoint=https://chatroom.webpubsub.azure.com;AccessKey=3AAAAAWPSNyxo;Version=1.0;
NEXT_PUBLIC_AZURE_WEBPUBSUB_HUB=chat

Azure Face API Configuration
NEXT_PUBLIC_AZURE_FACE_API_KEY=your_face_api_key
NEXT_PUBLIC_AZURE_FACE_API_ENDPOINT=https://chatroom.webpubsub.azure.com/

2. Set up Supabase tables:
- Run the SQL scripts provided in the `supabase` folder to create necessary tables (`profiles`, `chats`, `messages`).
- Enable Row-Level Security (RLS) policies.
- Configure real-time subscriptions for `messages`.

3. Start the development server:
npm run dev
or if using pnpm
pnpm dev


4. Open your browser and navigate to `http://localhost:3000`.

---

## Scripts

Here are some useful scripts to manage the project:

| Command                | Description                                  |
|------------------------|----------------------------------------------|
| `npm run dev`          | Starts the development server               |
| `npm run build`        | Builds the project for production           |
| `npm run start`        | Starts the production server                |
| `npm run lint`         | Runs ESLint to check for code issues        |
| `npm run format`       | Formats code using Prettier                 |

---

## Project Structure


---

## Usage

1. Sign in or sign up using your email.
2. Set up your profile with a username and avatar.
3. Join chatrooms powered by Azure Web PubSub.
4. Send messages in real-time to other users in the chatroom.
5. Participate in forums and discussions.
6. Manage privacy settings and customize your experience.

---

## Contributing

We welcome contributions to SheLink! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to your branch (`git push origin feature/new-feature`).
5. Open a pull request.

