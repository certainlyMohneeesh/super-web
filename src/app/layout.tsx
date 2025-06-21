import { Inter, Poppins } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  title: 'Mr. Pops - Premium Ice Cream Experience',
  description: 'Discover our unique collection of premium ice cream flavors. Made fresh daily with the finest ingredients for an unforgettable taste experience.',
  keywords: 'ice cream, premium, artisanal, flavors, dessert, frozen treats',
  openGraph: {
    title: 'Mr. Pops - Premium Ice Cream Experience',
    description: 'Discover our unique collection of premium ice cream flavors',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mr. Pops - Premium Ice Cream Experience',
    description: 'Discover our unique collection of premium ice cream flavors',
    images: ['/twitter-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
