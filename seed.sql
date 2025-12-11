-- ============================================
-- CHARLAS - Demo Data
-- ============================================
-- Nota: Esta es una versión de demostración con datos ficticios
-- En producción, los usuarios se crearían a través de autenticación

-- ============================================
-- INSERT DEMO USERS
-- ============================================
INSERT INTO users (username, email, display_name, bio, avatar_url) VALUES
('juan_perez', 'juan@example.com', 'Juan Pérez', 'Desarrollador de software apasionado por Next.js', 'https://i.pravatar.cc/150?u=juan'),
('maria_garcia', 'maria@example.com', 'María García', 'Diseñadora gráfica y amante del café ☕', 'https://i.pravatar.cc/150?u=maria'),
('carlos_lopez', 'carlos@example.com', 'Carlos López', 'Fotógrafo profesional | Viajero', 'https://i.pravatar.cc/150?u=carlos'),
('ana_martinez', 'ana@example.com', 'Ana Martínez', 'Product Manager en startup tech', 'https://i.pravatar.cc/150?u=ana'),
('lucas_torres', 'lucas@example.com', 'Lucas Torres', 'Ingeniero Backend | Python enthusiast', 'https://i.pravatar.cc/150?u=lucas'),
('sofia_rivera', 'sofia@example.com', 'Sofia Rivera', 'Community Manager | Content Creator', 'https://i.pravatar.cc/150?u=sofia')
ON CONFLICT DO NOTHING;

-- ============================================
-- INSERT DEMO POSTS
-- ============================================
INSERT INTO posts (user_id, content) 
SELECT id, '¡Hola a todos! Bienvenidos a Charlas, nuestra nueva red social. Estoy muy emocionado de compartir este proyecto con ustedes 🚀'
FROM users WHERE username = 'juan_perez'
ON CONFLICT DO NOTHING;

INSERT INTO posts (user_id, content)
SELECT id, 'Me encanta esta plataforma, es muy intuitiva y fácil de usar. La experiencia de usuario es increíble 💙'
FROM users WHERE username = 'maria_garcia'
ON CONFLICT DO NOTHING;

INSERT INTO posts (user_id, content)
SELECT id, 'Compartiendo una foto hermosa del atardecer 🌅 ¿Alguien más ama los sunsets tanto como yo?'
FROM users WHERE username = 'carlos_lopez'
ON CONFLICT DO NOTHING;

INSERT INTO posts (user_id, content)
SELECT id, 'Acabo de terminar un proyecto increíble en el trabajo. Feeling productive! 💪'
FROM users WHERE username = 'ana_martinez'
ON CONFLICT DO NOTHING;

INSERT INTO posts (user_id, content)
SELECT id, 'Tips de Python que todo developer debe saber. Aquí van mis favoritos: 1) List comprehensions, 2) Decorators, 3) Context managers'
FROM users WHERE username = 'lucas_torres'
ON CONFLICT DO NOTHING;

INSERT INTO posts (user_id, content)
SELECT id, 'Nuevo video en mi canal sobre las mejores prácticas de community management. ¡No olviden subscribirse! 🎥'
FROM users WHERE username = 'sofia_rivera'
ON CONFLICT DO NOTHING;

-- ============================================
-- INSERT DEMO FRIENDSHIPS (accepted)
-- ============================================
INSERT INTO friendships (user_id_1, user_id_2, status)
SELECT 
  CASE WHEN u1.id < u2.id THEN u1.id ELSE u2.id END,
  CASE WHEN u1.id < u2.id THEN u2.id ELSE u1.id END,
  'accepted'
FROM users u1, users u2
WHERE u1.username = 'juan_perez' AND u2.username = 'maria_garcia'
ON CONFLICT DO NOTHING;

INSERT INTO friendships (user_id_1, user_id_2, status)
SELECT 
  CASE WHEN u1.id < u2.id THEN u1.id ELSE u2.id END,
  CASE WHEN u1.id < u2.id THEN u2.id ELSE u1.id END,
  'accepted'
FROM users u1, users u2
WHERE u1.username = 'juan_perez' AND u2.username = 'carlos_lopez'
ON CONFLICT DO NOTHING;

INSERT INTO friendships (user_id_1, user_id_2, status)
SELECT 
  CASE WHEN u1.id < u2.id THEN u1.id ELSE u2.id END,
  CASE WHEN u1.id < u2.id THEN u2.id ELSE u1.id END,
  'accepted'
FROM users u1, users u2
WHERE u1.username = 'maria_garcia' AND u2.username = 'sofia_rivera'
ON CONFLICT DO NOTHING;

INSERT INTO friendships (user_id_1, user_id_2, status)
SELECT 
  CASE WHEN u1.id < u2.id THEN u1.id ELSE u2.id END,
  CASE WHEN u1.id < u2.id THEN u2.id ELSE u1.id END,
  'accepted'
FROM users u1, users u2
WHERE u1.username = 'carlos_lopez' AND u2.username = 'ana_martinez'
ON CONFLICT DO NOTHING;

-- ============================================
-- INSERT DEMO LIKES
-- ============================================
INSERT INTO likes (user_id, post_id)
SELECT u.id, p.id
FROM users u, posts p
WHERE u.username = 'maria_garcia' AND p.user_id = (SELECT id FROM users WHERE username = 'juan_perez')
ON CONFLICT DO NOTHING;

INSERT INTO likes (user_id, post_id)
SELECT u.id, p.id
FROM users u, posts p
WHERE u.username = 'carlos_lopez' AND p.user_id = (SELECT id FROM users WHERE username = 'juan_perez')
ON CONFLICT DO NOTHING;

INSERT INTO likes (user_id, post_id)
SELECT u.id, p.id
FROM users u, posts p
WHERE u.username = 'juan_perez' AND p.user_id = (SELECT id FROM users WHERE username = 'maria_garcia')
ON CONFLICT DO NOTHING;

-- ============================================
-- INSERT DEMO MESSAGES
-- ============================================
INSERT INTO messages (sender_id, recipient_id, content, read)
SELECT 
  (SELECT id FROM users WHERE username = 'juan_perez'),
  (SELECT id FROM users WHERE username = 'maria_garcia'),
  '¡Hola María! ¿Cómo estás?',
  TRUE
ON CONFLICT DO NOTHING;

INSERT INTO messages (sender_id, recipient_id, content, read)
SELECT 
  (SELECT id FROM users WHERE username = 'maria_garcia'),
  (SELECT id FROM users WHERE username = 'juan_perez'),
  'Bien, gracias por preguntar! ¿Y tú qué tal?',
  TRUE
ON CONFLICT DO NOTHING;

INSERT INTO messages (sender_id, recipient_id, content, read)
SELECT 
  (SELECT id FROM users WHERE username = 'juan_perez'),
  (SELECT id FROM users WHERE username = 'maria_garcia'),
  'Excelente! Acabo de terminar el proyecto',
  TRUE
ON CONFLICT DO NOTHING;
