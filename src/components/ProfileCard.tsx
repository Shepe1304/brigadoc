
import { useEffect, useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import {
  Flame,
  Mountain,
  Pencil,
  Shield,
  Trash2,
  Waves,
  Wind,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { supabase } from "../lib/supabase/supabase";
import type { Brigader } from "../types/brigader";

interface ProfileCardProps {
  brigader: Brigader;
  onDeleted?: (id: number) => void;
}

interface ElementStyle {
  Icon: LucideIcon;
  text: string;
  badge: string;
  glow: string;
}

const elementStyles: Record<string, ElementStyle> = {
  air: {
    Icon: Wind,
    text: "text-[#efce8c]",
    badge: "border-[#efce8c]/35 bg-[#efce8c]/10 text-[#efce8c]",
    glow: "from-[#c49554]/30",
  },
  water: {
    Icon: Waves,
    text: "text-[#8fd2e0]",
    badge: "border-[#8fd2e0]/35 bg-[#8fd2e0]/10 text-[#8fd2e0]",
    glow: "from-[#497fba]/30",
  },
  earth: {
    Icon: Mountain,
    text: "text-[#acd39a]",
    badge: "border-[#acd39a]/35 bg-[#acd39a]/10 text-[#acd39a]",
    glow: "from-[#6f8957]/30",
  },
  fire: {
    Icon: Flame,
    text: "text-[#f2a080]",
    badge: "border-[#f2a080]/35 bg-[#f2a080]/10 text-[#f2a080]",
    glow: "from-[#ae5b46]/30",
  },
};

const neutralStyle: ElementStyle = {
  Icon: Shield,
  text: "text-[#d2bf9c]",
  badge: "border-[#d2bf9c]/35 bg-[#d2bf9c]/10 text-[#d2bf9c]",
  glow: "from-[#697c7c]/30",
};

export default function ProfileCard({
  brigader,
  onDeleted,
}: ProfileCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const style =
    elementStyles[brigader.element.trim().toLowerCase()] ??
    neutralStyle;

  const ElementIcon = style.Icon;
  const showImage = Boolean(brigader.picUrl) && !imageFailed;

  useEffect(() => {
    setImageFailed(false);
  }, [brigader.picUrl]);

  const confirmDeleteProfile = async (): Promise<void> => {
    if (isDeleting) return;

    setIsDeleting(true);

    try {
      const { data, error } = await supabase
        .from("brigaders")
        .delete()
        .eq("id", brigader.id)
        .select("id")
        .maybeSingle();

      if (error) {
        toast.error(`Failed to delete: ${error.message}`);
        return;
      }

      if (!data) {
        toast.error("No record deleted. Check your RLS permissions.");
        return;
      }

      toast.success(`${brigader.name} removed from the archives.`);
      onDeleted?.(brigader.id);
    } catch {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsDeleting(false);
    }
  };

  const deleteProfile = (): void => {
    toast(
      (t) => (
        <div className="w-[280px] space-y-3 rounded-xl border border-[#d8b47d]/30 bg-[#142a2d] p-4 font-['Manrope'] text-[#f2e7cf] shadow-xl">
          <p className="font-['Cinzel'] text-sm font-bold">
            Delete this record?
          </p>

          <p className="text-xs leading-relaxed text-[#b8c5bd]">
            Remove <strong>{brigader.name}</strong> from Brigadoc?
            This action cannot be undone.
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => toast.dismiss(t.id)}
              className="flex-1 rounded-lg border border-[#c7a878]/30 px-3 py-2 text-xs font-bold hover:bg-white/5"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => {
                toast.dismiss(t.id);
                void confirmDeleteProfile();
              }}
              className="flex-1 rounded-lg bg-[#b95f4e] px-3 py-2 text-xs font-bold text-white hover:bg-[#d26b58]"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        style: {
          padding: 0,
          background: "transparent",
          boxShadow: "none",
        },
      }
    );
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#d9b77e]/20 bg-[#16292d]/90 shadow-[0_16px_55px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 hover:border-[#e2b87a]/50 hover:shadow-[0_22px_70px_rgba(0,0,0,0.35)]">
      {/* Portrait */}
      <div className="relative h-72 w-full overflow-hidden border-b border-[#d9b77e]/15 bg-[#0f2229]">
        <div
          aria-hidden="true"
          className={`absolute inset-0 bg-gradient-to-t ${style.glow} via-transparent to-transparent opacity-90`}
        />

        <div
          aria-hidden="true"
          className="absolute inset-5 rounded-full border border-[#edc88c]/10"
        />

        <div
          aria-hidden="true"
          className="absolute inset-10 rounded-full border border-[#edc88c]/10"
        />

        {showImage ? (
          <img
            src={brigader.picUrl ?? undefined}
            alt={`Portrait of ${brigader.name}`}
            className="relative z-10 h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04]"
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="relative z-10 flex h-full flex-col items-center justify-center gap-3">
            <ElementIcon
              size={60}
              strokeWidth={1}
              className={style.text}
              aria-hidden="true"
            />

            <span className="font-['Cinzel'] text-4xl tracking-[0.2em] text-[#e7d5b0]/75">
              {brigader.name.slice(0, 1).toUpperCase()}
            </span>
          </div>
        )}

        {/* Record badge */}
        <span className="absolute left-4 top-4 z-20 inline-flex min-h-8 max-w-[calc(100%-2rem)] items-center rounded-lg border border-[#e5c189]/40 bg-[#08171b]/85 px-3.5 py-2 text-[10px] font-bold uppercase leading-4 tracking-[0.12em] text-[#e9cc94] backdrop-blur-sm">
          Record #{String(brigader.id).padStart(3, "0")}
        </span>

        {/* Element badge */}
        <span
          className={`absolute bottom-4 right-4 z-20 inline-flex min-h-9 max-w-[calc(100%-2rem)] items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold leading-5 backdrop-blur-md ${style.badge}`}
        >
          <ElementIcon size={16} className="shrink-0" />
          <span className="truncate">{brigader.element}</span>
        </span>
      </div>

      {/* Character information */}
      <div className="flex min-w-0 flex-1 flex-col gap-1 px-6 py-7 sm:px-7 sm:py-8">
        <h3 className="font-['Cinzel'] text-2xl font-bold leading-tight text-[#f8e9c4]">
          {brigader.name}
        </h3>

        <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-[#77c4bc]">
          {brigader.role}
        </p>

        <div className="my-5 grid grid-cols-2 gap-3 rounded-xl border border-[#d9b77e]/15 bg-[#0b1c22]/70 p-3">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#92aaa5]">
              Assignment
            </p>
            <p className="mt-1 text-sm font-bold text-[#f2dfb8]">
              Squad {brigader.squad}
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#92aaa5]">
              Discipline
            </p>
            <p className={`mt-1 text-sm font-bold ${style.text}`}>
              {brigader.element}
            </p>
          </div>
        </div>

        <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e3b779]">
          Appearance
        </p>

        <p className="mt-2 text-sm leading-6 text-[#c7d0c7]">
          {brigader.appearance}
        </p>

        {brigader.description && (
          <>
            <p className="mt-5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e3b779]">
              Description
            </p>

            <p className="mt-2 text-sm leading-6 text-[#c7d0c7]">
              {brigader.description}
            </p>
          </>
        )}

        <p className="mt-5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e3b779]">
          Biography
        </p>

        <p className="mt-2 flex-1 text-sm leading-6 text-[#c7d0c7]">
          {brigader.bio || "This record has no biography yet."}
        </p>

        {/* Actions */}
        <div className="mt-6 flex gap-2 border-t border-[#d9b77e]/20 pt-5">
          <Link
            to={`/${brigader.id}/edit`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#d4a864]/45 bg-[#d4a864]/10 px-4 py-2.5 text-xs font-bold text-[#f0d2a0] transition-colors hover:bg-[#d4a864]/20"
          >
            <Pencil size={15} />
            Edit profile
          </Link>

          <button
            type="button"
            onClick={deleteProfile}
            disabled={isDeleting}
            aria-label={`Delete ${brigader.name}`}
            title="Delete profile"
            className="inline-flex items-center justify-center rounded-lg border border-[#d48774]/25 px-3.5 text-[#e8a594] transition-colors hover:border-[#d48774]/50 hover:bg-[#d48774]/10 disabled:opacity-50"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}
