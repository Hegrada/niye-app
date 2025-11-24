/*
  # Niyé Platform Database Schema

  ## Overview
  Complete schema for audio-based classifieds platform targeting African language speakers.
  
  ## New Tables
  
  ### `profiles`
  - `id` (uuid, references auth.users)
  - `phone` (text) - User phone number
  - `preferred_language` (text) - User's primary language
  - `neighborhood` (text) - User's neighborhood/area
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### `listings`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `audio_url` (text) - Firebase Storage URL
  - `audio_duration` (integer) - Duration in seconds
  - `category` (text) - Listing category
  - `language` (text) - Language of audio
  - `neighborhood` (text) - Location
  - `contact_phone` (text) - Contact number
  - `contact_whatsapp` (text) - WhatsApp number
  - `is_active` (boolean) - Listing status
  - `views_count` (integer) - Number of views
  - `plays_count` (integer) - Number of plays
  - `created_at` (timestamptz)
  - `expires_at` (timestamptz)
  
  ### `categories`
  - `id` (uuid, primary key)
  - `name_en` (text) - English name
  - `name_fr` (text) - French name
  - `name_local` (text) - Local language name
  - `icon_name` (text) - Icon identifier
  - `color` (text) - Brand color
  - `sort_order` (integer)
  
  ### `languages`
  - `id` (uuid, primary key)
  - `code` (text) - Language code
  - `name` (text) - Language name
  - `native_name` (text) - Name in the language itself
  - `is_active` (boolean)
  
  ### `testimonials`
  - `id` (uuid, primary key)
  - `name` (text)
  - `role` (text)
  - `content` (text)
  - `language` (text)
  - `avatar_url` (text)
  - `is_featured` (boolean)
  - `sort_order` (integer)
  
  ### `investor_contacts`
  - `id` (uuid, primary key)
  - `name` (text)
  - `email` (text)
  - `company` (text)
  - `message` (text)
  - `created_at` (timestamptz)
  
  ## Security
  - Enable RLS on all tables
  - Profiles: users can read all, update own
  - Listings: public read, authenticated create/update own
  - Categories/Languages: public read only
  - Testimonials: public read only
  - Investor contacts: authenticated create only
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  phone text,
  preferred_language text DEFAULT 'fr',
  neighborhood text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view profiles"
  ON profiles FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Listings table
CREATE TABLE IF NOT EXISTS listings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  audio_url text NOT NULL,
  audio_duration integer DEFAULT 0,
  category text NOT NULL,
  language text NOT NULL,
  neighborhood text,
  contact_phone text,
  contact_whatsapp text,
  is_active boolean DEFAULT true,
  views_count integer DEFAULT 0,
  plays_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz DEFAULT (now() + interval '30 days')
);

ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active listings"
  ON listings FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can create listings"
  ON listings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own listings"
  ON listings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own listings"
  ON listings FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_en text NOT NULL,
  name_fr text NOT NULL,
  name_local text,
  icon_name text NOT NULL,
  color text DEFAULT '#F97316',
  sort_order integer DEFAULT 0
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO public
  USING (true);

-- Languages table
CREATE TABLE IF NOT EXISTS languages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  native_name text NOT NULL,
  is_active boolean DEFAULT true
);

ALTER TABLE languages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view languages"
  ON languages FOR SELECT
  TO public
  USING (is_active = true);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  role text NOT NULL,
  content text NOT NULL,
  language text DEFAULT 'fr',
  avatar_url text,
  is_featured boolean DEFAULT false,
  sort_order integer DEFAULT 0
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view testimonials"
  ON testimonials FOR SELECT
  TO public
  USING (true);

-- Investor contacts table
CREATE TABLE IF NOT EXISTS investor_contacts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE investor_contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create investor contact"
  ON investor_contacts FOR INSERT
  TO public
  WITH CHECK (true);

-- Insert initial categories
INSERT INTO categories (name_en, name_fr, name_local, icon_name, color, sort_order) VALUES
  ('Jobs', 'Emplois', 'Travaux', 'briefcase', '#F59E0B', 1),
  ('Housing', 'Logement', 'Maisons', 'home', '#10B981', 2),
  ('Services', 'Services', 'Services', 'wrench', '#3B82F6', 3),
  ('Goods', 'Produits', 'Marchandises', 'shopping-bag', '#EF4444', 4),
  ('Vehicles', 'Véhicules', 'Voitures', 'car', '#8B5CF6', 5),
  ('Community', 'Communauté', 'Communauté', 'users', '#EC4899', 6)
ON CONFLICT DO NOTHING;

-- Insert initial languages
INSERT INTO languages (code, name, native_name, is_active) VALUES
  ('fr', 'French', 'Français', true),
  ('wo', 'Wolof', 'Wolof', true),
  ('bm', 'Bambara', 'Bamanankan', true),
  ('ff', 'Fulfulde', 'Fulfulde', true),
  ('ha', 'Hausa', 'Hausa', true),
  ('yo', 'Yoruba', 'Yorùbá', true),
  ('ig', 'Igbo', 'Igbo', true)
ON CONFLICT DO NOTHING;

-- Insert sample testimonials
INSERT INTO testimonials (name, role, content, language, is_featured, sort_order) VALUES
  ('Fatou Diallo', 'Vendeuse de tissus', 'Niyé m''a aidée à vendre mes tissus rapidement. Je n''ai pas besoin de lire ou écrire, je parle simplement !', 'fr', true, 1),
  ('Amadou Koné', 'Mécanicien', 'Maintenant mes clients peuvent m''entendre directement. C''est comme si je parlais avec eux au marché.', 'fr', true, 2),
  ('Aïcha Traoré', 'Coiffeuse', 'Je peux annoncer mes services en bambara. Tout le quartier me comprend maintenant !', 'fr', true, 3)
ON CONFLICT DO NOTHING;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_listings_category ON listings(category);
CREATE INDEX IF NOT EXISTS idx_listings_language ON listings(language);
CREATE INDEX IF NOT EXISTS idx_listings_neighborhood ON listings(neighborhood);
CREATE INDEX IF NOT EXISTS idx_listings_created_at ON listings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_listings_active ON listings(is_active) WHERE is_active = true;