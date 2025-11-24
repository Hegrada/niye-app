/*
  # Mise à jour pour le marché togolais

  ## Modifications
  1. Mise à jour des langues
    - Suppression des anciennes langues
    - Ajout de l'Ewe et du Mina (langues du sud du Togo/Ghana)
    - Ajout du Français (langue officielle)
  
  2. Mise à jour des témoignages
    - Adaptation au contexte togolais
    - Noms et rôles locaux
    - Références à Lomé et au Togo
*/

-- Supprimer les anciennes langues et en ajouter de nouvelles
DELETE FROM languages;

INSERT INTO languages (code, name, native_name, is_active) VALUES
  ('fr', 'Français', 'Français', true),
  ('ee', 'Ewe', 'Eʋegbe', true),
  ('mina', 'Mina', 'Gen-Mina', true)
ON CONFLICT DO NOTHING;

-- Mettre à jour les témoignages pour le contexte togolais
DELETE FROM testimonials;

INSERT INTO testimonials (name, role, content, language, is_featured, sort_order) VALUES
  ('Afi Koffi', 'Vendeuse au Grand Marché', 'Niyé m''a aidée à vendre mes pagnes rapidement. Je parle en Ewe, mes clients me comprennent directement !', 'fr', true, 1),
  ('Kokou Mensah', 'Mécanicien à Tokoin', 'Maintenant je peux annoncer mes services en Mina. Tous mes clients du quartier m''entendent et me contactent facilement.', 'fr', true, 2),
  ('Abla Amegah', 'Coiffeuse à Agoè', 'Plus besoin d''écrire ! Je parle et tout le monde comprend. C''est vraiment fait pour nous les Togolais.', 'fr', true, 3)
ON CONFLICT DO NOTHING;