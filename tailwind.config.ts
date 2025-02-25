import { heroui } from '@heroui/theme'
import type { Config } from 'tailwindcss'

export default {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'],
    theme: {},
    plugins: [heroui({ defaultTheme: 'dark' })],
    darkMode: 'class',
} satisfies Config
