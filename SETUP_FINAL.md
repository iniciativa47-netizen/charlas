# 🚀 CHARLAS - Guía de Configuración Final

## ✅ Estado Actual

Tu proyecto ya está:
- ✅ Completamente configurado en Next.js + TypeScript + Tailwind
- ✅ Integrado con Supabase (autenticación + base de datos)
- ✅ Usando colores oficiales de la marca (#4796c4 y #193d6d)
- ✅ Listo en repositorio GitHub
- ✅ Servidor de desarrollo corriendo

## 📝 PASO 1: Ejecutar SQL en Supabase

Para que la app funcione completamente, necesitas ejecutar el esquema SQL en tu BD de Supabase.

### 1.1 Ir al SQL Editor de Supabase

1. Entra a https://app.supabase.com
2. Selecciona tu proyecto "charlas"
3. En el menú izquierdo, busca **SQL Editor**
4. Haz clic en **New Query**

### 1.2 Copiar y ejecutar el esquema

1. Abre el archivo `database.sql` en tu proyecto
2. Copia TODO el contenido
3. Pégalo en el SQL Editor de Supabase
4. Haz clic en **Run** (arriba a la derecha)

Esto creará:
- Tabla `users` (perfiles de usuario)
- Tabla `posts` (publicaciones)
- Tabla `likes` (me gustas)
- Tabla `friendships` (amistades)
- Tabla `messages` (mensajes directos)
- Índices y políticas de seguridad RLS

### 1.3 Insertar datos ficticios (OPCIONAL)

Para tener usuarios de demostración:

1. En el mismo SQL Editor, crea una nueva query
2. Abre el archivo `seed.sql`
3. Copia TODO el contenido
4. Pégalo en el SQL Editor
5. Haz clic en **Run**

Esto creará 6 usuarios demo con posts, amistades y mensajes.

## 🔐 PASO 2: Habilitar Autenticación por Email

1. En Supabase dashboard, ve a **Authentication > Providers**
2. Busca **Email**
3. Asegúrate de que está **Enabled** (verde)
4. Guarda los cambios

## 🌐 PASO 3: Configurar URLs de Redireccionamiento

1. Ve a **Authentication > URL Configuration**
2. En **Redirect URLs**, añade:
   - `http://localhost:3000`
   - `http://localhost:3000/dashboard`
   - Tu dominio de producción (cuando tengas uno)

3. Haz clic en **Save**

## 🎮 PASO 4: Probar la Aplicación

### Opción A: Con datos ficticios (seed.sql)

Si ejecutaste seed.sql, puedes usar estos usuarios:

| Email | Contraseña |
|-------|-----------|
| juan@example.com | Tu contraseña |
| maria@example.com | Tu contraseña |
| carlos@example.com | Tu contraseña |

Nota: Primero debes crear estas cuentas en Supabase Auth manualmente o editar seed.sql para agregar auth.users.

### Opción B: Crear tu propia cuenta

1. Abre http://localhost:3000
2. Haz clic en **Registrarse**
3. Rellena el formulario con:
   - Email
   - Contraseña
   - Nombre completo
   - Nombre de usuario (@usuario)
4. Haz clic en **Registrarse**
5. Verifica tu email (Supabase enviará un link de confirmación)
6. Inicia sesión

## 📊 Ver la Base de Datos

Para ver tus datos en Supabase:

1. Ve a **Table Editor** en tu dashboard
2. Selecciona cada tabla para ver su contenido
3. Puedes editar, eliminar o añadir registros directamente

## 🛠️ Desarrollo Local

```bash
# Estar en la carpeta del proyecto
cd c:\Users\Usuario\Desktop\SYNTALYS\TUTORIALES\charlas\charlas

# Iniciar servidor de desarrollo
npm.cmd run dev

# Abre http://localhost:3000
```

## 📝 Variables de Entorno

Tu `.env.local` ya tiene las claves públicas configuradas:

```
NEXT_PUBLIC_SUPABASE_URL=https://oqgvxsvxknwdvkfmdzdo.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_yKtwCFjsVu-2ZLEGROrWPA_wWfsnYx_
```

⚠️ IMPORTANTE: `.env.local` NO se sube a GitHub (está en `.gitignore`)

## 🎨 Estructura de Colores

La marca Charlas usa estos colores:

```
Primario: #4796c4 (azul medio)
Secundario: #193d6d (azul oscuro)
```

Están configurados en:
- `tailwind.config.js`
- Página de login
- Dashboard header
- Botones de acción

## 📚 Archivos Importantes

| Archivo | Descripción |
|---------|------------|
| `database.sql` | Esquema de BD para ejecutar en Supabase |
| `seed.sql` | Datos ficticios para pruebas |
| `src/lib/auth.ts` | Funciones de autenticación |
| `src/lib/db.ts` | Funciones de base de datos |
| `src/app/page.tsx` | Página de login |
| `src/app/dashboard/page.tsx` | Dashboard principal |
| `SUPABASE_SETUP.md` | Documentación de Supabase |

## 🚀 Próximos Pasos

1. ✅ Ejecutar SQL en Supabase
2. ✅ Habilitar autenticación por email
3. ✅ Crear usuario de prueba
4. ✅ Probar la app en http://localhost:3000
5. ⬜ Integrar autenticación de Google (opcional)
6. ⬜ Agregar storage para fotos de perfil (opcional)
7. ⬜ Configurar websockets para chat en tiempo real (opcional)
8. ⬜ Deploy en Vercel (opcional)

## 🐛 Troubleshooting

### Error: "Module not found: globals.css"
✅ Ya está arreglado. El archivo está en `src/app/globals.css`

### Error: "Can't resolve './supabase'"
Asegúrate de que el archivo `src/lib/supabase.ts` existe y tiene las claves correctas.

### Error: "Auth returns null"
La autenticación requiere confirmar el email primero. Revisa la bandeja de entrada (o spam).

### Error: "Posts don't load"
Asegúrate de:
1. Ejecutar `database.sql` en Supabase
2. Ejecutar `seed.sql` para datos demo
3. Estar logged in en la app

## 📞 Resumen Rápido

```bash
# 1. Ejecutar SQL en Supabase (database.sql + seed.sql)
# 2. Iniciar servidor
npm.cmd run dev

# 3. Ir a http://localhost:3000
# 4. Registrarse o ver demo
# 5. ¡Disfrutar!
```

---

¡El proyecto está listo! Solo ejecuta el SQL en Supabase y todo debería funcionar. 🎉
