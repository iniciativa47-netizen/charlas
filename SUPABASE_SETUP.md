# Configuración de Base de Datos Supabase

## ⚠️ URGENTE: EJECUTAR FIX RLS AHORA

Si los posts no se crean/cargan, necesitas ejecutar el `fix-rls.sql`:

### Pasos rápidos:

1. Ve a https://app.supabase.com/ > proyecto **charlas**
2. **SQL Editor** > **New Query**
3. Copia TODO el contenido de `fix-rls.sql` del repositorio
4. Pégalo y haz click **Run**
5. ¡Listo! Ahora puedes crear posts

**Nota:** Si creaste usuarios antes de ejecutar esto, bórralos en **Authentication > Users** y crea uno nuevo.

---

## 📋 Pasos Completos de Configuración Inicial

### 1. Ejecutar SQL Schema en Supabase

1. Ve a tu dashboard de Supabase: https://app.supabase.com
2. Selecciona tu proyecto "charlas"
3. Ve a **SQL Editor**
4. Crea una nueva query
5. Copia el contenido de `database.sql` en este repositorio
6. Ejecuta la query

Esto creará todas las tablas necesarias:
- `users` - Perfiles de usuario
- `posts` - Publicaciones
- `likes` - "Me gustas"
- `friendships` - Relaciones de amistad
- `messages` - Mensajes directos

### 2. Ejecutar Fix RLS (Políticas de Seguridad)

Este es el paso que probablemente te falta si el feed no funciona:

1. Ve a **SQL Editor**
2. Crea una nueva query
3. Copia el contenido de `fix-rls.sql`
4. Ejecuta la query

Esto configura:
- ✅ Trigger auto-creación de perfiles en registro
- ✅ Función `get_current_user_id()` para traducir auth.uid() a users.id
- ✅ Políticas RLS correctas para posts, likes, mensajes

### 3. Insertar Datos Demo (Opcional)

Si quieres cargar datos ficticios para probar:

1. Ve a **SQL Editor**
2. Crea una nueva query
3. Copia el contenido de `seed.sql`
4. Ejecuta la query

Esto creará 6 usuarios demo con posts, amistades y mensajes.

### 4. Habilitar Autenticación por Email

En tu dashboard de Supabase:
1. Ve a **Authentication > Providers**
2. Asegúrate de que "Email" está habilitado
3. Configura las URLs de redireccionamiento si es necesario

## 🔐 Variables de Entorno

Tu archivo `.env.local` ya tiene:
```
NEXT_PUBLIC_SUPABASE_URL=https://oqgvxsvxknwdvkfmdzdo.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_yKtwCFjsVu-2ZLEGROrWPA_wWfsnYx_
```

## 🧪 Usuarios Demo

Después de ejecutar `seed.sql`, tendrás estos usuarios:

| Email | Username | Contraseña |
|-------|----------|-----------|
| juan@example.com | juan_perez | (crear en auth) |
| maria@example.com | maria_garcia | (crear en auth) |
| carlos@example.com | carlos_lopez | (crear en auth) |
| ana@example.com | ana_martinez | (crear en auth) |
| lucas@example.com | lucas_torres | (crear en auth) |
| sofia@example.com | sofia_rivera | (crear en auth) |

## 📝 Notas

- Usa `npm run dev` para iniciar en desarrollo
- El servidor se ejecutará en http://localhost:3000
- Todos los datos están protegidos por RLS
- Los cambios se sincronizarán en tiempo real con Supabase
