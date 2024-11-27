//-----> Landing <---------------

import { StaticImageData } from "next/image";

//navbar
export enum SelectedPage {
  Home = "home",
  AboutUs = "aboutus",
  Classes = "classes",
  Contact = "contact"
}

export interface ClassType{
  name: string,
  description?: string,
  image: StaticImageData,
}

// Prima Schema

export interface Account {
  id: string; // Corresponds to the MongoDB ObjectId
  userId: string; // Foreign key to the User model, also an ObjectId
  type: string; // Type of the account (e.g., OAuth, credentials)
  provider: string; // Provider name (e.g., Google, GitHub)
  providerAccountId: string; // Unique identifier for the account from the provider
  refresh_token?: string | null; // Optional refresh token
  access_token?: string | null; // Optional access token
  expires_at?: number | null; // Optional expiration timestamp
  token_type?: string | null; // Optional token type
  scope?: string | null; // Optional scope of the account
  id_token?: string | null; // Optional ID token
  session_state?: string | null; // Optional session state
  createdAt: Date; // Timestamp of account creation
  updatedAt: Date; // Timestamp of the last update

  // Relation
  user: string; // The associated User model
}



export interface NutritionProfile {
  userId: string;       // A unique identifier,
  proteinKcal: number;  // Protein energy in kilocalories
  proteinGrams: number; // Protein weight in grams
  carbKcal: number;     // Carbohydrate energy in kilocalories
  carbGrams: number;    // Carbohydrate weight in grams
  fatKcal: number;      // Fat energy in kilocalories
  fatGrams: number;     // Fat weight in grams
}