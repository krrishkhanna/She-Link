SheLink
SheLink is a decentralized peer-to-peer community platform built exclusively for women. It empowers secure communication, privacy, and community governance using modern technologies like TypeScript, Supabase, Azure Web PubSub, and WebRTC.

Table of Contents
Overview

Features

Technology Stack

Getting Started

Prerequisites

Installation

Environment Setup

Scripts

Project Structure

Usage

Contributing

License

Overview
SheLink provides a secure online space for women to connect, communicate, and collaborate. It leverages decentralized technologies to ensure privacy and autonomy while fostering community-driven governance.

Features
Secure Authentication: Facial recognition for women-only access

Real-time Chat: Instant messaging using Azure Web PubSub

Peer-to-Peer Communication: End-to-end encrypted messaging via WebRTC

Health & Wellness Forums: Dedicated discussion spaces

Privacy Controls: Customizable privacy settings

Community Governance: Decentralized rule-making and moderation

Token Exchange System: Blockchain-based secure transactions

Technology Stack
Frontend
TypeScript

React.js

Tailwind CSS

Backend
Supabase (PostgreSQL database + authentication)

Realtime Communication
Azure Web PubSub

WebRTC

Facial Recognition
Azure Face API

Deployment
Vercel

Getting Started
Prerequisites
Before running the project locally, ensure you have the following installed:

Node.js (v18 or higher)

npm or pnpm

Supabase account (for authentication and database setup)

Azure account (for Web PubSub and Face API)

Installation
Clone the repository:

bash
git clone https://github.com/lostboysrtk/SheLink.git
cd SheLink
Install dependencies:

bash
npm install
# or if you prefer pnpm:
pnpm install
Environment Setup
Create a .env.local file in the root directory with the following variables:

text
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Azure Web PubSub Configuration
NEXT_PUBLIC_AZURE_WEBPUBSUB_CONNECTION_STRING=Endpoint=https://chatroom.webpubsub.azure.com;AccessKey=3AAAAAWPSNyxo;Version=1.0;
NEXT_PUBLIC_AZURE_WEBPUBSUB_HUB=chat

# Azure Face API Configuration
NEXT_PUBLIC_AZURE_FACE_API_KEY=your_face_api_key
NEXT_PUBLIC_AZURE_FACE_API_ENDPOINT=https://chatroom.webpubsub.azure.com/
Set up Supabase tables:

Run the SQL scripts provided in the supabase folder to create necessary tables (profiles, chats, messages).

Enable Row-Level Security (RLS) policies.

Configure real-time subscriptions for messages.

Start the development server:

bash
npm run dev
# or if using pnpm:
pnpm dev
Open your browser and navigate to http://localhost:3000.

Scripts
Here are some useful scripts to manage the project:

Command	Description
npm run dev	Starts the development server
npm run build	Builds the project for production
npm run start	Starts the production server
npm run lint	Runs ESLint to check for code issues
npm run format	Formats code using Prettier
Project Structure
text
SheLink/
├── public/                # Static assets (images, favicon, etc.)
├── src/
│   ├── components/        # React components (UI + logic)
│   │   ├── auth/          # Authentication-related components (Login/Signup)
│   │   ├── chat/          # Chatroom components (Chat UI + functionality)
│   │   ├── profile/       # Profile management components
│   │   └── layout/        # Layout components (Header/Footer/Sidebar)
│   ├── lib/               # Utility functions (Supabase/Azure integrations)
│   ├── pages/             # Next.js pages (Home/Dashboard/Profile/etc.)
│   ├── styles/            # Tailwind CSS stylesheets
│   └── types/             # TypeScript type definitions
├── supabase/              # SQL scripts for database setup
├── .env.local.example     # Example environment variables file
├── package.json           # Project dependencies and scripts
├── README.md              # Project documentation
└── tsconfig.json          # TypeScript configuration file
Usage
Sign in or sign up using your email.

Set up your profile with a username and avatar.

Join chatrooms powered by Azure Web PubSub.

Send messages in real-time to other users in the chatroom.

Participate in forums and discussions.

Manage privacy settings and customize your experience.

Contributing
We welcome contributions to SheLink! To contribute:

Fork the repository.

Create a new branch (git checkout -b feature/new-feature).

Commit your changes (git commit -m 'Add new feature').

Push to your branch (git push origin feature/new-feature).

Open a pull request.
