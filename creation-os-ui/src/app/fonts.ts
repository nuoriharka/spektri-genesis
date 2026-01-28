import { Inter } from 'next/font/google'
import localFont from 'next/font/local'

export const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const fontCal = localFont({
  src: '../../public/fonts/CalSans-SemiBold.woff2',
  variable: '--font-cal',
})

export const fontMona = localFont({
  src: '../../public/fonts/Mona-Sans.woff2',
  variable: '--font-mona',
  display: 'swap',
})

export const fontHubot = localFont({
  src: '../../public/fonts/Hubot-Sans.woff2',
  variable: '--font-hubot',
  display: 'swap',
})

