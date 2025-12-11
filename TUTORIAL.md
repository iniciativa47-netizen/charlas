# Charlas - Red Social Demo

Demo funcional de una red social con Next.js y Supabase para el tutorial.

## 🚀 Características Implementadas

- ✅ Página de login/signup
- ✅ Feed de publicaciones con demostración de datos ficticios
- ✅ Sistema de "me gusta" interactivo
- ✅ Sección de amigos con lista de contactos
- ✅ Chat en tiempo real (demo)
- ✅ Perfil de usuario editable
- ✅ Diseño responsive (móvil + desktop)
- ✅ UI moderna con Tailwind CSS
- ✅ Logo de Charlas integrado

## 📋 Requisitos Previos

- Node.js v24.12.0 o superior
- Git
- Cuenta de Supabase (ya configurada)

## 🔧 Setup Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/iniciativa47-netizen/charlas.git
cd charlas
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia `.env.example` a `.env.local` y añade tus claves de Supabase:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://oqgvxsvxknwdvkfmdzdo.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_yKtwCFjsVu-2ZLEGROrWPA_wWfsnYx_
```

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🎮 Cómo Usar

### Página de Inicio
- Login/Signup demo (sin validación real en esta versión)
- Botón "Ver Demo" para acceder directamente al dashboard

### Dashboard
El dashboard tiene 4 pestañas principales:

#### 📱 Feed
- Ver publicaciones de amigos
- Crear nuevas publicaciones
- Sistema de "me gusta" interactivo
- Datos ficticios con avatares emoji

#### 👥 Amigos
- Ver lista de amigos (demo con 3 amigos)
- Botón para ver perfil (demo)

#### 💬 Mensajes
- Chat en tiempo real (demostración)
- Historial de mensajes con timestamp
- Input para enviar nuevos mensajes

#### 👤 Perfil
- Información del usuario
- Biografía
- Botón para editar perfil (demo)

## 🏗️ Estructura del Proyecto

```
charlas/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Página de login
│   │   ├── dashboard/
│   │   │   └── page.tsx       # Dashboard principal
│   │   ├── layout.tsx         # Layout global
│   │   └── globals.css        # Estilos globales
│   ├── lib/
│   │   ├── supabase.ts        # Cliente de Supabase
│   │   └── auth.ts            # Funciones de autenticación
├── public/                    # Assets estáticos
├── tailwind.config.js         # Configuración Tailwind
├── tsconfig.json             # Configuración TypeScript
├── next.config.js            # Configuración Next.js
└── package.json              # Dependencias
```

## 📦 Dependencias Principales

- **Next.js 14**: Framework React para producción
- **React 18**: Librería UI
- **Supabase**: Backend con autenticación y BD
- **Tailwind CSS**: Framework de estilos
- **TypeScript**: Tipado estático

## 🔐 Seguridad

⚠️ **IMPORTANTE**: 
- `.env.local` NO debe subirse al repositorio
- Usa `.env.example` como referencia
- Las claves públicas de Supabase están configuradas en `.env.local`
- Nunca compartas el service role key público

## 🚀 Próximos Pasos / Mejoras

1. Conectar autenticación real con Supabase
2. Implementar base de datos (usuarios, posts, mensajes)
3. Añadir carga de imágenes
4. Websockets para chat real
5. Notificaciones en tiempo real
6. Deploy en Vercel o similar

## 🎨 Customización

### Cambiar paleta de colores

Edita `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: '#tu-color-aqui',
      secondary: '#otro-color',
      accent: '#otro-color-mas',
    },
  },
},
```

### Cambiar datos demo

Los datos ficticios están hardcodeados en `src/app/dashboard/page.tsx`:

```typescript
const DEMO_POSTS = [ ... ]
const DEMO_MESSAGES = [ ... ]
```

## 📞 Soporte

Para dudas sobre el tutorial, contacta con tu instructor.

## 📄 Licencia

Proyecto demo para educación.
