//Project: Dashboard APP
// Module: Typescript Library
// Component: types.tsx
// Author: Advyta
// Date: 28/06/2025
// Logic:
// This component is used to define the types

export type FormField = {
  label: string;
  name: string;
  type: string;
  required: boolean;
  error?: string;
  placeholder?: string;
};

export type FormData = {
  [key: string]: string;
};

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "success";

export type ButtonSize = "sm" | "md" | "lg";


export interface UserData {
  _id: string;
  username: string;
  email: string;
  github?: string;
  bio?: string;
  location?: string;
  website?: string;
  phone?: string;
  theme?: "light" | "dark";
  isVerified?: boolean;
  isAdmin?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type Location = {
  lat: number | null;
  lon: number | null;
};

export type newsArticle = {
  article_id: string;
  title: string;
  link: string;
  keywords: string[];
  creator: string[];
  description: string;
  content: string;
  pubDate: string;
  pubDateTZ: string;
  image_url: string;
  video_url: string | null;
  source_id: string;
  source_name: string;
  source_priority: number;
  source_url: string;
  source_icon: string;
  language: string;
  country: string[];
  category: string[];
  sentiment: string;
  sentiment_stats: string;
  ai_tag: string;
  ai_region: string;
  ai_org: string;
  ai_summary: string;
  ai_content: string;
  duplicate: boolean;
};
