
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import {
  Flame,
  Mountain,
  Plus,
  Search,
  Shield,
  Waves,
  Wind,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { supabase } from "../lib/supabase/supabase";
import type { Brigader } from "../types/brigader";
import PageShell from "./PageShell";
import ProfileCard from "./ProfileCard";

interface ElementFilter {
  label: string;
  value: string;
  Icon: LucideIcon;
}

const filters: ElementFilter[] = [
  { label: "All records", value: "All", Icon: Shield },
  { label: "Air", value: "Air", Icon: Wind },
  { label: "Water", value: "Water", Icon: Waves },
  { label: "Earth", value: "Earth", Icon: Mountain },
  { label: "Fire", value: "Fire", Icon: Flame },
];

export default function Homepage() {
  const [brigaders, setBrigaders] = useState<Brigader[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [elementFilter, setElementFilter] = useState("All");

  useEffect(() => {
    let active = true;

    const getBrigaders = async (): Promise<void> => {
      const { data, error: fetchError } = await supabase
        .from("brigaders")
        .select("*")
        .order("id");

      if (!active) return;

      if (fetchError) {
        setError(fetchError.message);
      } else {
        setBrigaders((data ?? []) as Brigader[]);
      }

      setLoading(false);
    };

    void getBrigaders();

    return () => {
      active = false;
    };
  }, []);

  const visibleBrigaders = useMemo(() => {
    const term = query.trim().toLowerCase();

    return brigaders.filter((brigader) => {
      const matchesElement =
        elementFilter === "All" ||
        brigader.element.toLowerCase() ===
          elementFilter.toLowerCase();

      const matchesSearch = [
        brigader.name,
        brigader.role,
        brigader.bio,
        brigader.element,
      ].some((value) =>
        String(value ?? "").toLowerCase().includes(term)
      );

      return matchesElement && matchesSearch;
    });
  }, [brigaders, query, elementFilter]);

  const handleDeleted = (id: number): void => {
    setBrigaders((previous) =>
      previous.filter((brigader) => brigader.id !== id)
    );
  };

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative w-full overflow-hidden rounded-3xl border border-[#d5ab6c]/30 bg-gradient-to-br from-[#223b3e] via-[#163039] to-[#10262b] px-6 py-10 shadow-[0_20px_75px_rgba(0,0,0,0.28)] sm:px-10 sm:py-14 lg:px-16 lg:py-16">
        {/* Decorations */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-28 h-80 w-80 rounded-full border-[45px] border-[#e5b77a]/5"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 right-12 h-56 w-56 rotate-45 border border-[#e5b77a]/15"
        />

        <div className="relative z-10 max-w-4xl">
          {/* Eyebrow */}
          <div className="mb-7 flex flex-wrap items-center gap-3 text-[#e7c38b]">
            <span className="h-px w-8 shrink-0 bg-[#e7c38b] sm:w-12" />

            <p className="text-[10px] font-extrabold uppercase leading-5 tracking-[0.18em] sm:text-xs sm:tracking-[0.25em]">
              The Ellora Archives · Seven Havens
            </p>
          </div>

          {/* Title */}
          <h1 className="max-w-full font-['Cinzel'] text-[clamp(2rem,4.5vw,4.5rem)] font-bold leading-[1.14] tracking-normal text-[#f8eac9] [overflow-wrap:anywhere]">
            The Bending
            <br />
            <span className="text-[#e6b76c]">
              Brigade
            </span>{" "}
            Archives
          </h1>

          <p className="mt-7 max-w-2xl text-sm leading-7 text-[#c1d3ca] sm:text-base sm:leading-8">
            Every guardian has a story. Explore the people,
            disciplines, and allegiances that shape Ellora's
            last line of defense.
          </p>

          {/* Actions */}
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#records"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#ddb071] px-6 py-3 text-sm font-extrabold text-[#18282c] transition-colors hover:bg-[#f1c993]"
            >
              Explore records
            </a>

            <Link
              to="/new"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#e0ba82]/35 px-6 py-3 text-sm font-bold text-[#edd5ac] transition-colors hover:bg-white/5"
            >
              <Plus size={17} />
              Add a brigader
            </Link>
          </div>
        </div>

        {/* Statistics */}
        <div className="relative z-10 mt-12 flex flex-wrap gap-x-12 gap-y-6 border-t border-[#e5c18a]/20 pt-8">
          <div className="min-w-28">
            <p className="font-['Cinzel'] text-3xl font-bold text-[#f0c888]">
              {brigaders.length}
            </p>
            <p className="mt-2 text-[10px] font-bold uppercase leading-relaxed tracking-[0.14em] text-[#a7bdb5]">
              Archived profiles
            </p>
          </div>

          <div className="min-w-28">
            <p className="font-['Cinzel'] text-3xl font-bold text-[#f0c888]">
              04
            </p>
            <p className="mt-2 text-[10px] font-bold uppercase leading-relaxed tracking-[0.14em] text-[#a7bdb5]">
              Bending elements
            </p>
          </div>

          <div className="min-w-24">
            <p className="font-['Cinzel'] text-3xl font-bold text-[#f0c888]">
              07
            </p>
            <p className="mt-2 text-[10px] font-bold uppercase leading-relaxed tracking-[0.14em] text-[#a7bdb5]">
              Havens
            </p>
          </div>
        </div>
      </section>

      {/* Archive section */}
      <section id="records" className="scroll-mt-8 pt-14 lg:pt-16">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="mb-3 text-xs font-extrabold uppercase leading-5 tracking-[0.2em] text-[#75beb6]">
              Personnel registry
            </p>

            <h2 className="font-['Cinzel'] text-2xl font-bold leading-tight text-[#f5e4bd] sm:text-3xl">
              Brigader Records
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#9eb5b2]">
              Browse the roster and uncover every story.
            </p>
          </div>

          <span className="shrink-0 text-xs font-bold uppercase tracking-[0.14em] text-[#c9ac7c]">
            {visibleBrigaders.length}{" "}
            {visibleBrigaders.length === 1
              ? "entry"
              : "entries"}{" "}
            shown
          </span>
        </div>

        {/* Search and filters */}
        <div className="mt-8 flex flex-col gap-5 rounded-2xl border border-[#d5ab6c]/20 bg-[#14272c]/75 p-5 sm:p-6 xl:flex-row xl:items-center xl:justify-between">
          {/* Search */}
          <div className="relative w-full min-w-0 xl:max-w-md">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#95aba5]"
            />

            <input
              value={query}
              onChange={(event) =>
                setQuery(event.target.value)
              }
              type="search"
              aria-label="Search Brigaders"
              placeholder="Search names, roles, stories..."
              className="min-h-12 w-full rounded-xl border border-[#d5ab6c]/20 bg-[#07181d] py-3 pl-12 pr-4 text-sm text-[#f5e8cc] placeholder:text-[#819994] outline-none transition-colors focus:border-[#ddb071] focus:ring-2 focus:ring-[#ddb071]/15"
            />
          </div>

          {/* Element pills */}
          <div
            className="flex flex-wrap items-center gap-2.5"
            role="group"
            aria-label="Filter by bending element"
          >
            {filters.map(({ label, value, Icon }) => {
              const selected = elementFilter === value;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setElementFilter(value)}
                  aria-pressed={selected}
                  className={`inline-flex min-h-10 items-center justify-center gap-2 whitespace-nowrap rounded-full border px-4 py-2.5 text-xs font-bold leading-5 transition-all ${
                    selected
                      ? "border-[#e3b574] bg-[#e3b574] text-[#132429] shadow-[0_3px_15px_rgba(227,181,116,0.15)]"
                      : "border-[#c3a77a]/30 bg-[#0c2025] text-[#c5d0c7] hover:border-[#e3b574]/60 hover:bg-[#1d3438] hover:text-[#f4dfba]"
                  }`}
                >
                  <Icon size={15} className="shrink-0" />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div
            role="status"
            className="py-24 text-center text-[#b8c9c0]"
          >
            Opening the Ellora archives...
          </div>
        ) : error ? (
          <div
            role="alert"
            className="mt-7 rounded-xl border border-red-400/30 bg-red-500/10 p-6 text-sm text-red-200"
          >
            Could not load Brigaders: {error}
          </div>
        ) : visibleBrigaders.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-[#d5ab6c]/35 px-6 py-20 text-center">
            <Shield
              size={40}
              className="mx-auto mb-5 text-[#c6a477]"
            />

            <h3 className="font-['Cinzel'] text-xl text-[#efdfb9]">
              No records found
            </h3>

            <p className="mt-3 text-sm leading-6 text-[#a8bcb5]">
              Try another search or select a different element.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {visibleBrigaders.map((brigader) => (
              <ProfileCard
                key={brigader.id}
                brigader={brigader}
                onDeleted={handleDeleted}
              />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
