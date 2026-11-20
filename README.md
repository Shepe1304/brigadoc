
# Brigadoc

**For the survival of Ellora!**

Brigadoc is a fan-made character archive for the Bending Brigade from *Avatar: Seven Havens*, part of the *Avatar: The Last Airbender* universe.

The application allows users to explore, search, and manage profiles of Brigaders, including their bending elements, squad assignments, roles, appearances, and biographies.

Built as a small full-stack web development project to practice React, TypeScript, Tailwind CSS, Supabase, and deployment.

## Features

### Character Archive
- Browse Brigaders through a responsive card-based interface.
- View character portraits, appearances, biographies, bending elements, roles, and squad assignments.
- Element-themed cards with unique colors and icons for Air, Water, Earth, and Fire.
- Fallback portraits for missing or unavailable images.

### Search and Filtering
- Search characters by name, role, element, appearance, and biography.
- Filter by bending element, brigade role, and squad.
- Combine multiple filters to narrow down results.
- Dynamically generate role and squad options from database records.
- Reset all filters with a single click.

### Profile Management
- Create new Brigader profiles.
- Edit existing character information.
- Delete profiles with confirmation.
- Display success and error notifications.
- Store and retrieve character information using Supabase.

> Profile modifications require appropriate database permissions and Row Level Security (RLS) policies.

### Design
The interface draws inspiration from *Avatar: Seven Havens*, *Avatar: The Last Airbender*, and *The Legend of Korra*, combining dark teal, antique gold, elemental colors, and an archival aesthetic.

The layout is responsive across desktop and mobile screens.

## Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React, TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| Backend / Database | Supabase, PostgreSQL |
| UI Icons | Lucide React |
| Notifications | React Hot Toast |
| Hosting | Vercel |

## Getting Started

### Prerequisites

Before running the project, make sure you have:

- Node.js and npm installed
- A Supabase project
- Git installed

### 1. Clone the Repository

```bash
git clone https://github.com/Shepe1304/brigadoc.git
cd brigadoc
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

You can find these values in your Supabase project's dashboard.

Never commit secret or service-role keys to the repository. Only use Supabase's publishable key (or legacy anon key) in client-side code.

### 4. Set Up the Database

The application uses a PostgreSQL table named `brigaders` in Supabase.

The table contains the following fields:

| Column | Type | Description |
|---|---|---|
| id | bigint | Auto-generated primary key |
| name | text | Character's name |
| appearance | text | Physical appearance |
| picUrl | text | Character portrait URL |
| element | text | Bending element |
| bio | text | Character biography |
| squad | integer | Assigned squad number |
| role | text | Position within the Brigade |

Make sure Row Level Security (RLS) is enabled and appropriate access policies are configured.

Public visitors can be granted read-only access, while profile creation, editing, and deletion should be restricted to authorized users.

### 5. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal (usually `http://localhost:5173`).

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Deployment

Brigadoc is designed to be deployed using Vercel.

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. Select Vite as the framework preset.
4. Set the build command to `npm run build`.
5. Set the output directory to `dist`.
6. Add the Supabase environment variables.
7. Deploy the application.

For client-side routing, create a `vercel.json` file in the project root:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This allows React Router routes such as `/new` and `/:id/edit` to work when accessed directly.

## Future Improvements

- [ ] Add Supabase Authentication for administrators.
- [ ] Restrict create, edit, and delete operations to authorized users.
- [ ] Add individual character detail pages.
- [ ] Support image uploads through Supabase Storage.
- [ ] Add sorting and pagination for larger character collections.
- [ ] Expand the archive as more characters are introduced.

## Disclaimer

Brigadoc is a project inspired by the *Avatar* franchise.

*Avatar: The Last Airbender*, *The Legend of Korra*, *Avatar: Seven Havens*, and their associated characters and settings belong to their respective rights holders.

This project is not affiliated with or endorsed by the official creators or rights holders.

---

**For the survival of Ellora!**
