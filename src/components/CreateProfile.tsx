
import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { ArrowLeft, Plus } from "lucide-react";

import { supabase } from "../lib/supabase/supabase";
import type { BrigaderInput } from "../types/brigader";
import PageShell from "./PageShell";
import BrigaderForm from "./BrigaderForm";

export default function CreateProfile() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const submitForm = async (
    values: BrigaderInput
  ): Promise<void> => {
    if (isSaving) return;

    setIsSaving(true);

    try {
      const { data, error } = await supabase
        .from("brigaders")
        .insert(values)
        .select("id")
        .single();

      if (error || !data) {
        toast.error(
          error?.message ?? "Failed to create profile."
        );
        return;
      }

      toast.success("Profile created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Create profile error:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <PageShell>
      <div className="mx-auto max-w-3xl">
        {/* Back navigation */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#a8c4bd] transition-colors hover:text-[#f2d5a2]"
        >
          <ArrowLeft size={17} />
          Back to archives
        </button>

        {/* Page heading */}
        <div className="mb-9">
          <div className="mb-4 flex items-center gap-3 text-[#d7ae76]">
            <span className="h-px w-8 bg-[#d7ae76]" />

            <p className="text-xs font-bold uppercase tracking-[0.24em]">
              Personnel registration
            </p>
          </div>

          <div className="flex items-start gap-4">
            <span className="rounded-xl border border-[#d4b27e]/30 bg-[#d4b27e]/10 p-3 text-[#edcb94]">
              <Plus size={27} />
            </span>

            <div>
              <h1 className="font-['Cinzel'] text-3xl font-bold text-[#f8e8c4] sm:text-4xl">
                Enlist a Brigader
              </h1>

              <p className="mt-3 text-sm leading-7 text-[#a8bdb6]">
                Welcome a new guardian into Ellora's ranks.
                Every record preserved is another story remembered.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <BrigaderForm
          onSubmit={submitForm}
          onCancel={() => navigate("/")}
          isSaving={isSaving}
          submitLabel="Create profile"
        />

        {/* Decorative footer */}
        <p className="mt-6 text-center font-['Cinzel'] text-xs tracking-[0.15em] text-[#bca277]">
          FOR THE SURVIVAL OF ELLORA
        </p>
      </div>
    </PageShell>
  );
}
