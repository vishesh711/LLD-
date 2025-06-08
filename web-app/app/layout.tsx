import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], display: 'swap' });

export const viewport: Viewport = {
  themeColor: '#1a202c',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: '%s | Low-Level Design Examples',
    default: 'Low-Level Design Examples',
  },
  description: "A collection of low-level design implementation examples in Python",
  keywords: ["low-level design", "system design", "object-oriented design", "python", "examples", "implementation"],
  authors: [{ name: "LLD Examples" }],
  openGraph: {
    title: "Low-Level Design Examples",
    description: "A collection of object-oriented design implementations in Python",
    type: "website",
    locale: "en_US",
    url: "https://your-deployed-url.vercel.app/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Low-Level Design Examples",
    description: "A collection of object-oriented design implementations in Python",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <header className="bg-gray-800 text-white shadow-md">
          <div className="container mx-auto py-4 px-6 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              Low-Level Design Examples
            </Link>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link href="/" className="hover:text-blue-300 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <a 
                    href="https://github.com/vishesh/LLD-" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-blue-300 transition-colors"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        
        <main className="flex-grow">
          {children}
        </main>
        
        <footer className="bg-gray-100 py-8 mt-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">About This Project</h3>
                <p className="text-gray-600">
                  A collection of low-level design implementations in Python to demonstrate 
                  object-oriented design principles and patterns.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Learning Resources</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    <a 
                      href="https://refactoring.guru/design-patterns" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 transition-colors"
                    >
                      Design Patterns
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.geeksforgeeks.org/oops-object-oriented-design/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 transition-colors"
                    >
                      Object-Oriented Design
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://leetcode.com/discuss/interview-question/system-design" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 transition-colors"
                    >
                      System Design Questions
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Technologies Used</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    <a 
                      href="https://nextjs.org/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 transition-colors"
                    >
                      Next.js
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.python.org/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 transition-colors"
                    >
                      Python
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://vercel.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 transition-colors"
                    >
                      Vercel
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500">
              <p>© {new Date().getFullYear()} Low-Level Design Examples</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
