
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import {
  ChevronDown,
  Flame,
  Mountain,
  Plus,
  RotateCcw,
  Search,
  Shield,
  SlidersHorizontal,
  Waves,
  Wind,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { supabase } from "../lib/supabase/supabase";
import type { Brigader } from "../types/brigader";
import PageShell from "./PageShell";
import ProfileCard from "./ProfileCard";

const ALL = "__all__";

interface ElementOption {
  label: string;
  value: string;
  Icon: LucideIcon;
}

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  id: string;
  label: string;
  allLabel: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}

const elementFilters: ElementOption[] = [
  { label: "All elements", value: ALL, Icon: Shield },
  { label: "Air", value: "Air", Icon: Wind },
  { label: "Water", value: "Water", Icon: Waves },
  { label: "Earth", value: "Earth", Icon: Mountain },
  { label: "Fire", value: "Fire", Icon: Flame },
];

function FilterSelect({
  id,
  label,
  allLabel,
  value,
  options,
  onChange,
}: FilterSelectProps) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <label
        htmlFor={id}
        className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#d5b987]"
      >
        {label}
      </label>

      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-h-12 w-full cursor-pointer appearance-none rounded-xl border border-[#d5ab6c]/25 bg-[#091c21] px-4 py-3 pr-11 text-sm font-medium text-[#f1e5ca] outline-none transition-colors hover:border-[#ddb071]/50 focus:border-[#ddb071] focus:ring-2 focus:ring-[#ddb071]/15"
        >
          <option value={ALL}>{allLabel}</option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={17}
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#ddb071]"
        />
      </div>
    </div>
  );
}

export default function Homepage() {
  const [brigaders, setBrigaders] = useState<Brigader[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [query, setQuery] = useState("");
  const [elementFilter, setElementFilter] = useState(ALL);
  const [roleFilter, setRoleFilter] = useState(ALL);
  const [squadFilter, setSquadFilter] = useState(ALL);

  // Fetch Brigaders
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

  // Generate role options dynamically
  const roleOptions = useMemo<FilterOption[]>(() => {
    const roles = brigaders
      .map((brigader) => brigader.role.trim())
      .filter(Boolean);

    return [...new Set(roles)]
      .sort((a, b) => a.localeCompare(b))
      .map((role) => ({
        value: role,
        label: role,
      }));
  }, [brigaders]);

  // Generate squad options dynamically
  const squadOptions = useMemo<FilterOption[]>(() => {
    const squads = [
      ...new Set(brigaders.map((brigader) => brigader.squad)),
    ];

    return squads
      .sort((a, b) => a - b)
      .map((squad) => ({
        value: String(squad),
        label: `Squad ${squad}`,
      }));
  }, [brigaders]);

  // Apply filters using AND logic
  const visibleBrigaders = useMemo<Brigader[]>(() => {
    const term = query.trim().toLowerCase();

    return brigaders.filter((brigader) => {
      // Element
      const matchesElement =
        elementFilter === ALL ||
        brigader.element.trim().toLowerCase() ===
          elementFilter.toLowerCase();

      // Role
      const matchesRole =
        roleFilter === ALL ||
        brigader.role === roleFilter;

      // Squad
      const matchesSquad =
        squadFilter === ALL ||
        String(brigader.squad) === squadFilter;

      // Search
      const matchesSearch =
        term === "" ||
        [
          brigader.name,
          brigader.role,
          brigader.element,
          brigader.appearance,
          brigader.bio,
          brigader.description,
          String(brigader.squad),
        ].some((value) =>
          String(value ?? "").toLowerCase().includes(term)
        );

      return (
        matchesElement &&
        matchesRole &&
        matchesSquad &&
        matchesSearch
      );
    });
  }, [
    brigaders,
    query,
    elementFilter,
    roleFilter,
    squadFilter,
  ]);

  const hasActiveFilters =
    query.trim() !== "" ||
    elementFilter !== ALL ||
    roleFilter !== ALL ||
    squadFilter !== ALL;

  const clearFilters = (): void => {
    setQuery("");
    setElementFilter(ALL);
    setRoleFilter(ALL);
    setSquadFilter(ALL);
  };

  const handleDeleted = (id: number): void => {
    setBrigaders((previous) =>
      previous.filter((brigader) => brigader.id !== id)
    );
  };

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative w-full overflow-hidden rounded-3xl border border-[#d5ab6c]/30 bg-gradient-to-br from-[#223b3e] via-[#163039] to-[#10262b] px-6 py-10 shadow-[0_20px_75px_rgba(0,0,0,0.28)] sm:px-10 sm:py-14 lg:px-16 lg:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-28 h-80 w-80 rounded-full border-[45px] border-[#e5b77a]/5"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 right-12 h-56 w-56 rotate-45 border border-[#e5b77a]/15"
        />

        <div className="relative z-10 max-w-4xl">
          <div className="mb-7 flex flex-wrap items-center gap-3 text-[#e7c38b]">
            <span className="h-px w-8 shrink-0 bg-[#e7c38b] sm:w-12" />

            <p className="text-[10px] font-extrabold uppercase leading-5 tracking-[0.18em] sm:text-xs sm:tracking-[0.25em]">
              The Ellora Archives · Seven Havens
            </p>
          </div>

          <h1 className="max-w-full font-['Cinzel'] text-[clamp(2rem,4.5vw,4.5rem)] font-bold leading-[1.14] text-[#f8eac9] [overflow-wrap:anywhere]">
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
          {[
            {
              value: brigaders.length,
              label: "Archived profiles",
            },
            {
              value: "04",
              label: "Bending elements",
            },
            {
              value: "07",
              label: "Havens",
            },
          ].map((stat) => (
            <div key={stat.label} className="min-w-28">
              <p className="font-['Cinzel'] text-3xl font-bold text-[#f0c888]">
                {stat.value}
              </p>

              <p className="mt-2 text-[10px] font-bold uppercase leading-relaxed tracking-[0.14em] text-[#a7bdb5]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Personnel Registry */}
      <section
        id="records"
        className="scroll-mt-8 pt-14 lg:pt-16"
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
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

        {/* Filters */}
        <div className="mt-8 space-y-6 rounded-2xl border border-[#d5ab6c]/25 bg-[#14272c]/85 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] sm:p-7">
          {/* Filter heading */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <SlidersHorizontal
                size={19}
                className="text-[#e1b878]"
              />

              <h3 className="font-['Cinzel'] text-base font-semibold text-[#efdfba]">
                Refine the Archives
              </h3>
            </div>

            <button
              type="button"
              onClick={clearFilters}
              disabled={!hasActiveFilters}
              className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#d5ab6c]/25 px-4 py-2 text-xs font-bold text-[#ddc498] transition-colors hover:border-[#d5ab6c]/60 hover:bg-[#d5ab6c]/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <RotateCcw size={14} />
              Clear filters
            </button>
          </div>

          {/* Search */}
          <div className="relative w-full">
            <Search
              size={19}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#95aba5]"
            />

            <input
              value={query}
              onChange={(event) =>
                setQuery(event.target.value)
              }
              type="search"
              aria-label="Search Brigaders"
              placeholder="Search by name, role, element, biography..."
              className="min-h-12 w-full rounded-xl border border-[#d5ab6c]/25 bg-[#07181d] py-3 pl-12 pr-4 text-sm text-[#f5e8cc] placeholder:text-[#819994] outline-none transition-colors focus:border-[#ddb071] focus:ring-2 focus:ring-[#ddb071]/15"
            />
          </div>

          {/* Element filter */}
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#d5b987]">
              Bending Discipline
            </p>

            <div
              className="flex flex-wrap items-center gap-2.5"
              role="group"
              aria-label="Filter by bending element"
            >
              {elementFilters.map(
                ({ label, value, Icon }) => {
                  const selected = elementFilter === value;

                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setElementFilter(value)}
                      aria-pressed={selected}
                      className={`inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full border px-4 py-2.5 text-xs font-bold leading-5 transition-all ${
                        selected
                          ? "border-[#e3b574] bg-[#e3b574] text-[#132429]"
                          : "border-[#c3a77a]/30 bg-[#0c2025] text-[#c5d0c7] hover:border-[#e3b574]/60 hover:bg-[#1d3438] hover:text-[#f4dfba]"
                      }`}
                    >
                      <Icon
                        size={16}
                        className="shrink-0"
                      />
                      {label}
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* Role and Squad */}
          <div className="grid grid-cols-1 gap-5 border-t border-[#d5ab6c]/15 pt-6 sm:grid-cols-2">
            <FilterSelect
              id="role-filter"
              label="Brigade Role"
              allLabel="All roles"
              value={roleFilter}
              options={roleOptions}
              onChange={setRoleFilter}
            />

            <FilterSelect
              id="squad-filter"
              label="Squad Assignment"
              allLabel="All squads"
              value={squadFilter}
              options={squadOptions}
              onChange={setSquadFilter}
            />
          </div>

          {/* Results summary */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#d5ab6c]/15 pt-5">
            <p className="text-sm text-[#b9ccc3]">
              Showing{" "}
              <strong className="text-[#f0c888]">
                {visibleBrigaders.length}
              </strong>{" "}
              of{" "}
              <strong className="text-[#f0c888]">
                {brigaders.length}
              </strong>{" "}
              Brigaders
            </p>

            {hasActiveFilters && (
              <span className="rounded-full border border-[#75beb6]/30 bg-[#75beb6]/10 px-3 py-1.5 text-xs font-semibold text-[#9cd9cf]">
                Filters active
              </span>
            )}
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
              No Brigaders match your current filters.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 rounded-xl border border-[#d5ab6c]/40 px-5 py-3 text-sm font-bold text-[#efcf98] hover:bg-[#d5ab6c]/10"
            >
              Clear all filters
            </button>
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
