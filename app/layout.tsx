import type { Metadata } from "next";
import './globals.css';
import TRPCProvider from './_trpc/Provider';


export const metadata: Metadata = {
  title: "tRPC CRUD APP with Next.js",
  description: "Author: Kavil Parikh",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TRPCProvider>
          {children}
        </TRPCProvider>
      </body>
    </html>
  );
}