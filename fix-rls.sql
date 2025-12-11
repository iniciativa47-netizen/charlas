-- ============================================
-- FIX RLS - Crear trigger para auto-crear usuarios
-- ============================================

-- Crear función que se dispara al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (auth_id, email, username, display_name)
  VALUES (
    new.id,
    new.email,
    SPLIT_PART(new.email, '@', 1),
    SPLIT_PART(new.email, '@', 1)
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Crear trigger que ejecuta la función
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- ACTUALIZAR POLÍTICAS RLS PARA PERMITIR INSERT
-- ============================================

-- Eliminar la política antigua
DROP POLICY IF EXISTS "Users can update their own profile" ON users;

-- Nueva política que permite insert a usuarios autenticados
CREATE POLICY "Users can insert their own profile"
ON users FOR INSERT
WITH CHECK (auth.uid() = auth_id);

-- Nueva política que permite update solo de su propio perfil
CREATE POLICY "Users can update their own profile"
ON users FOR UPDATE
USING (auth.uid() = auth_id)
WITH CHECK (auth.uid() = auth_id);

-- ============================================
-- PERMITIR QUE LOS USUARIOS VEAN PERFILES
-- ============================================
DROP POLICY IF EXISTS "Users can view all profiles" ON users;
CREATE POLICY "Users can view all profiles"
ON users FOR SELECT
USING (true);

-- ============================================
-- PERMITIR OPERACIONES EN POSTS, LIKES, MENSAJES
-- ============================================
-- Posts: cualquiera puede ver, pero solo el autor puede crear/editar/borrar
DROP POLICY IF EXISTS "Anyone can view posts" ON posts;
CREATE POLICY "Anyone can view posts"
ON posts FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Users can create posts" ON posts;
CREATE POLICY "Users can create posts"
ON posts FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own posts" ON posts;
CREATE POLICY "Users can update their own posts"
ON posts FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own posts" ON posts;
CREATE POLICY "Users can delete their own posts"
ON posts FOR DELETE
USING (auth.uid() = user_id);

-- Likes
DROP POLICY IF EXISTS "Anyone can view likes" ON likes;
CREATE POLICY "Anyone can view likes"
ON likes FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Users can create likes" ON likes;
CREATE POLICY "Users can create likes"
ON likes FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own likes" ON likes;
CREATE POLICY "Users can delete their own likes"
ON likes FOR DELETE
USING (auth.uid() = user_id);

-- Mensajes
DROP POLICY IF EXISTS "Users can view their messages" ON messages;
CREATE POLICY "Users can view their messages"
ON messages FOR SELECT
USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

DROP POLICY IF EXISTS "Users can create messages" ON messages;
CREATE POLICY "Users can create messages"
ON messages FOR INSERT
WITH CHECK (auth.uid() = sender_id);

DROP POLICY IF EXISTS "Users can update message read status" ON messages;
CREATE POLICY "Users can update message read status"
ON messages FOR UPDATE
USING (auth.uid() = recipient_id);
