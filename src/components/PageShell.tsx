
import type { ReactNode } from "react";
import { Link } from "react-router";
import { Compass, Plus, Shield } from "lucide-react";

interface PageShellProps {
  children: ReactNode;
}

export default function PageShell({ children }: PageShellProps) {
  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-[#09171b] font-['Manrope'] text-[#f5ecd9] antialiased selection:bg-[#d9a65c] selection:text-[#142025]">
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_5%,rgba(172,98,51,0.22),transparent_38%),radial-gradient(ellipse_at_90%_25%,rgba(33,103,110,0.24),transparent_44%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.055] [background-image:linear-gradient(#e2b97b_1px,transparent_1px),linear-gradient(90deg,#e2b97b_1px,transparent_1px)] [background-size:48px_48px]"
      />

      {/* Header */}
      <header className="relative z-10 w-full border-b border-[#d7b27b]/20 bg-[#0a1b20]/90 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-[1800px] items-center justify-between gap-4 px-4 py-4 sm:px-8 sm:py-5 lg:px-12">
          {/* Brand */}
          <Link
            to="/"
            className="group flex min-w-0 items-center gap-3 sm:gap-4"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#d7b27b]/60 bg-[#d7b27b]/10 text-[#efd39c] transition-transform group-hover:rotate-12 sm:h-13 sm:w-13">
              <Compass size={24} strokeWidth={1.5} />
            </span>

            <span className="min-w-0">
              <span className="block font-['Cinzel'] text-lg font-bold leading-tight tracking-[0.1em] text-[#f6e9c7] sm:text-2xl sm:tracking-[0.16em]">
                BRIGADOC
              </span>

              <span className="mt-1 block text-[8px] font-bold uppercase tracking-[0.12em] text-[#c6aa7b] sm:text-[10px] sm:tracking-[0.2em]">
                Ellora · Bending Brigade
              </span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex shrink-0 items-center gap-3 sm:gap-5">
            <Link
              to="/"
              className="hidden min-h-11 items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-[#c8d1cb] transition-colors hover:bg-white/5 hover:text-[#f6e9c7] md:inline-flex"
            >
              <Shield size={17} />
              Archives
            </Link>

            <Link
              to="/new"
              aria-label="Create a new Brigader profile"
              className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-[#e8ba75]/60 bg-[#d7a45e] px-3 py-3 text-sm font-extrabold text-[#182327] shadow-[0_5px_25px_rgba(215,164,94,0.16)] transition-all hover:-translate-y-0.5 hover:bg-[#edc48a] sm:px-5"
            >
              <Plus size={18} strokeWidth={2.5} />
              <span className="hidden sm:inline">
                New profile
              </span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 mx-auto min-h-[calc(100vh-190px)] w-full max-w-[1800px] min-w-0 px-4 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-[#d7b27b]/15 bg-[#071318]/70">
        <div className="mx-auto flex w-full max-w-[1800px] flex-col gap-3 px-4 py-7 text-xs text-[#91a5a4] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p className="font-['Cinzel'] leading-relaxed tracking-[0.12em] text-[#c6aa7b]">
            BRIGADOC · FOR THE SURVIVAL OF ELLORA
          </p>
        </div>
      </footer>
    </div>
  );
}
