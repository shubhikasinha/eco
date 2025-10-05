import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const NAV_LINKS = [
  { href: "/calculator", label: "Calculate Emission" },
  { href: "/solutionhub", label: "Solution Hub" },
  { href: "/playbooks", label: "AI Playbooks" },
  { href: "/ngohub", label: "Partnerships" },
];

export const metadata = {
  title: "EcoImpactApp – Carbon Intelligence Platform",
  description:
    "Carbon forecasting, AI mitigations, offset marketplace, and executive-ready storytelling in one sandboxed experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
        <div className="relative">
          <nav className="sticky top-5 z-40 border-b bg-[#003e0c] border-white/5 backdrop-blur  rounded-full m-8">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-2 py-4">
              <Link href="/" className="text-sm font-semibold uppercase tracking-[0.3em] text-white flex">
              <img src="/eco.png" alt="Eco" width={24} height={24} className="mr-2 h-7 w-7 " />
                <h1 className="pt-1 drop-shadow-[0_0_10px_rgba(0,229,255,0.9)]">EcoImpactApp</h1>
              </Link>
              <div className="flex items-center gap-4 text-xs text-white/60">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-full border border-transparent px-3 py-1.5 transition hover:border-cyan-400/40 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <span className="hidden text-[11px] uppercase tracking-widest text-white/40 sm:inline">
                Carbon intelligence studio
              </span>
            </div>
          </nav>

          {children}

          <footer className="border-t border-white/5 bg-[#003e0c]">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-2 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
              <p>EcoImpactApp · sandbox mode · ready for impact storytelling</p>
              <div className="flex flex-wrap gap-3">
                <span>Workflow API sandbox</span>
                <span>Gemini loop simulation</span>
                <span>Offset marketplace preview</span>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
