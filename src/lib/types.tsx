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