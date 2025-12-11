-- ============================================
-- FIX RLS - Crear trigger para auto-crear usuarios
-- ============================================

-- Crear función que se dispara al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_username TEXT;
  v_display_name TEXT;
BEGIN
  -- Intenta obtener username y display_name de metadata
  v_username := new.raw_user_meta_data->>'username';
  v_display_name := new.raw_user_meta_data->>'display_name';
  
  -- Si no existen, usa el email como fallback
  IF v_username IS NULL OR v_username = '' THEN
    v_username := SPLIT_PART(new.email, '@', 1);
  END IF;
  
  IF v_display_name IS NULL OR v_display_name = '' THEN
    v_display_name := SPLIT_PART(new.email, '@', 1);
  END IF;
  
  INSERT INTO public.users (auth_id, email, username, display_name)
  VALUES (new.id, new.email, v_username, v_display_name);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Crear trigger que ejecuta la función
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- ACTUALIZAR POLÍTICAS RLS PARA PERMITIR INSERT
-- ============================================

-- Eliminar las políticas antiguas
DROP POLICY IF EXISTS "Users can insert their own profile" ON users;
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
