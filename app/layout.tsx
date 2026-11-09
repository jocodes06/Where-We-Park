
import type { Metadata } from "next";
import ModalContext from "@/components/Contexts/ModalContext";
import Providers from "./Providers";

import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trip Planner",
  description: "Trip Planner",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en"
      className={`${bricolage.variable} ${figtree.variable} h-full antialiased`}>

      <body>
        <Providers>
            <ModalContext>
              {children}
            </ModalContext>
        </Providers>
      </body>

    </html>
  );
}
