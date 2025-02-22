import { nextui } from '@nextui-org/theme'
import type { Config } from 'tailwindcss'

export default {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
    theme: {},
    plugins: [nextui({})],
    darkMode: 'class',
} satisfies Config
