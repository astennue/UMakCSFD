@import url('https://fonts.googleapis.com/css2?family=Metropolis:wght@300;400;500;600;700;800&family=Marcellus&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* UMAK Colors - Light Mode */
    --umak-blue: 222 74% 22%;
    --umak-gold: 45 100% 50%;
    --umak-red: 0 84% 50%;
    --umak-green: 142 76% 36%;
    
    /* shadcn variables */
    --background: 0 0% 96%;
    --foreground: 222 74% 15%;
    --card: 0 0% 100%;
    --card-foreground: 222 74% 15%;
    --popover: 0 0% 100%;
    --popover-foreground: 222 74% 15%;
    --primary: 222 74% 22%;
    --primary-foreground: 0 0% 100%;
    --secondary: 222 30% 90%;
    --secondary-foreground: 222 74% 22%;
    --muted: 220 14% 96%;
    --muted-foreground: 220 9% 46%;
    --accent: 45 100% 50%;
    --accent-foreground: 222 74% 15%;
    --destructive: 0 84% 50%;
    --destructive-foreground: 0 0% 100%;
    --success: 142 76% 36%;
    --success-foreground: 0 0% 100%;
    --warning: 45 100% 50%;
    --warning-foreground: 222 74% 15%;
    --border: 220 13% 85%;
    --input: 220 13% 85%;
    --ring: 222 74% 22%;
    --radius: 0.5rem;
    
    /* Sidebar */
    --sidebar-background: 222 74% 22%;
    --sidebar-foreground: 0 0% 100%;
    --sidebar-primary: 45 100% 50%;
    --sidebar-primary-foreground: 222 74% 15%;
    --sidebar-accent: 222 60% 30%;
    --sidebar-accent-foreground: 0 0% 100%;
    --sidebar-border: 222 50% 25%;
    --sidebar-ring: 45 100% 50%;
  }

  .dark {
    /* UMAK Colors - Dark Mode */
    --background: 222 50% 8%;
    --foreground: 0 0% 95%;
    --card: 222 45% 12%;
    --card-foreground: 0 0% 95%;
    --popover: 222 45% 12%;
    --popover-foreground: 0 0% 95%;
    --primary: 45 100% 50%;
    --primary-foreground: 222 74% 15%;
    --secondary: 222 40% 18%;
    --secondary-foreground: 0 0% 95%;
    --muted: 222 35% 15%;
    --muted-foreground: 220 10% 60%;
    --accent: 45 100% 50%;
    --accent-foreground: 222 74% 15%;
    --destructive: 0 70% 45%;
    --destructive-foreground: 0 0% 100%;
    --success: 142 60% 40%;
    --success-foreground: 0 0% 100%;
    --warning: 45 90% 45%;
    --warning-foreground: 222 74% 15%;
    --border: 222 30% 20%;
    --input: 222 30% 20%;
    --ring: 45 100% 50%;
    
    /* Sidebar Dark */
    --sidebar-background: 222 50% 8%;
    --sidebar-foreground: 0 0% 95%;
    --sidebar-primary: 45 100% 50%;
    --sidebar-primary-foreground: 222 74% 15%;
    --sidebar-accent: 222 40% 15%;
    --sidebar-accent-foreground: 0 0% 95%;
    --sidebar-border: 222 30% 18%;
    --sidebar-ring: 45 100% 50%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  body {
    @apply bg-background text-foreground antialiased;
    font-family: 'Metropolis', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Marcellus', 'Metropolis', serif;
    font-weight: 600;
  }
}

@layer components {
  .umak-gradient {
    background: linear-gradient(135deg, hsl(var(--umak-blue)) 0%, hsl(222 60% 35%) 100%);
  }
  
  .umak-gradient-gold {
    background: linear-gradient(135deg, hsl(var(--umak-gold)) 0%, hsl(45 90% 45%) 100%);
  }
  
  .glass-card {
    @apply backdrop-blur-md bg-white/80 dark:bg-black/40 border border-white/20 dark:border-white/10;
  }
  
  .text-gradient {
    background: linear-gradient(135deg, hsl(var(--umak-gold)) 0%, hsl(35 100% 55%) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .btn-primary {
    @apply bg-[#0E2A5C] text-white hover:bg-[#1a3d7a] transition-colors;
  }
  
  .btn-gold {
    @apply bg-[#FFD700] text-[#0E2A5C] hover:bg-[#e6c200] transition-colors font-semibold;
  }
  
  .input-field {
    @apply w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#0E2A5C] focus:border-transparent outline-none transition-all;
  }
  
  .card-hover {
    @apply transition-all duration-300 hover:shadow-xl hover:-translate-y-1;
  }
  
  .section-padding {
    @apply px-4 sm:px-6 lg:px-8 xl:px-12;
  }
  
  .page-container {
    @apply min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800;
  }
  
  .bg-pattern {
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230E2A5C' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  
  .animate-fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }
  
  .animate-slide-up {
    animation: slideUp 0.5s ease-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: hsl(var(--muted));
}

::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground));
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--foreground));
}

/* Selection color */
::selection {
  background: hsl(var(--umak-gold) / 0.3);
  color: inherit;
}
