'use client';
import { Inter } from 'next/font/google';
import theme from '@/styles/palette';
import { ThemeProvider } from 'styled-components';
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <body className={inter.className}>{children}</body>
      </ThemeProvider>
    </html>
  );
}
