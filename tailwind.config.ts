import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: { 
        hotpink: '#cf51bc',
        midpink: '#a44f95',
        darkpurple: '#1e0748',
        purple : '#915092',
        lightpurple : '#ceacc8',
        turquoise : '#adcfcd',
        lightturquoise : '#d8edeb',
        midpurple : '#d883c9',
        purpleVariant: {
  				'100': '#e9dce9',
  				'200': '#d3b9d3',
  				'300': '#bd96be',
  				'400': '#a773a8',
  				'500': '#915092',
  				'600': '#744075',
  				'700': '#573058',
  				'800': '#3a203a',
  				'900': '#1d101d'
  			},
        purpleSecondary: {
  				'100': '#f7e9f1',
  				'200': '#eed3e4',
  				'300': '#e6bcd6',
  				'400': '#dda6c9',
  				'500': '#d590bb',
  				'600': '#aa7396',
  				'700': '#805670',
  				'800': '#553a4b',
  				'900': '#2b1d25'
  			},
  			purpleLight: {
  				'100': '#f5eef4',
  				'200': '#ebdee9',
  				'300': '#e2cdde',
  				'400': '#d8bdd3',
  				'500': '#ceacc8',
  				'600': '#a58aa0',
  				'700': '#7c6778',
  				'800': '#524550',
  				'900': '#292228'
  			},
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
};

export default config;
