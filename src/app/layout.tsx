import "./globals.css";
import type { Metadata } from "next";
import { Familjen_Grotesk } from "next/font/google";

const mtFontExample = Familjen_Grotesk({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Onboarding Questionnaire by @reubarm",
  description: "MyTutor frontend coding exercise - example onboarding questionnaire",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={mtFontExample.className}>{children}</body>
    </html>
  );
}
