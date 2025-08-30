import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				traffic: {
					red: 'hsl(var(--traffic-red))',
					'red-glow': 'hsl(var(--traffic-red-glow))',
					amber: 'hsl(var(--traffic-amber))',
					'amber-glow': 'hsl(var(--traffic-amber-glow))',
					green: 'hsl(var(--traffic-green))',
					'green-glow': 'hsl(var(--traffic-green-glow))'
				},
				status: {
					high: 'hsl(var(--status-high))',
					medium: 'hsl(var(--status-medium))',
					low: 'hsl(var(--status-low))',
					normal: 'hsl(var(--status-normal))'
				}
			},
			backgroundImage: {
				'gradient-dashboard': 'var(--gradient-dashboard)',
				'gradient-card': 'var(--gradient-card)',
				'gradient-traffic-red': 'var(--gradient-traffic-red)',
				'gradient-traffic-amber': 'var(--gradient-traffic-amber)',
				'gradient-traffic-green': 'var(--gradient-traffic-green)'
			},
			boxShadow: {
				'dashboard': 'var(--shadow-dashboard)',
				'card': 'var(--shadow-card)',
				'traffic': 'var(--shadow-traffic)',
				'glow-red': 'var(--glow-red)',
				'glow-amber': 'var(--glow-amber)',
				'glow-green': 'var(--glow-green)'
			},
			transitionTimingFunction: {
				'smooth': 'var(--transition-smooth)',
				'bounce': 'var(--transition-bounce)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-glow': {
					'0%, 100%': {
						opacity: '1',
						transform: 'scale(1)'
					},
					'50%': {
						opacity: '0.7',
						transform: 'scale(1.05)'
					}
				},
				'signal-blink': {
					'0%, 50%': { opacity: '1' },
					'51%, 100%': { opacity: '0.3' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'signal-blink': 'signal-blink 1s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;