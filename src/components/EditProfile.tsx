
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  LoaderCircle,
  Pencil,
} from "lucide-react";

import { supabase } from "../lib/supabase/supabase";
import type {
  Brigader,
  BrigaderInput,
} from "../types/brigader";

import PageShell from "./PageShell";
import BrigaderForm from "./BrigaderForm";

export default function EditProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [brigader, setBrigader] = useState<Brigader | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let active = true;

    const fetchBrigader = async (): Promise<void> => {
      if (!id) {
        setError("Missing Brigader ID.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setBrigader(null);
      setError("");

      const { data, error: fetchError } = await supabase
        .from("brigaders")
        .select("*")
        .eq("id", id)
        .single();

      if (!active) return;

      if (fetchError) {
        setError(fetchError.message);
      } else {
        setBrigader(data as Brigader);
      }

      setIsLoading(false);
    };

    void fetchBrigader();

    return () => {
      active = false;
    };
  }, [id]);

  const submitForm = async (
    values: BrigaderInput
  ): Promise<void> => {
    if (!id || isSaving) return;

    setIsSaving(true);

    try {
      const { data, error: updateError } = await supabase
        .from("brigaders")
        .update(values)
        .eq("id", id)
        .select("id")
        .maybeSingle();

      if (updateError) {
        toast.error(
          `Failed to update profile: ${updateError.message}`
        );
        return;
      }

      if (!data) {
        toast.error(
          "No profile was updated. Check your RLS permissions."
        );
        return;
      }

      toast.success("Profile updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Update profile error:", error);
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

        {/* Loading */}
        {isLoading ? (
          <div
            role="status"
            className="flex min-h-80 flex-col items-center justify-center gap-4 rounded-2xl border border-[#d6b37a]/20 bg-[#14282c]/70"
          >
            <LoaderCircle
              size={35}
              className="animate-spin text-[#ddb071]"
            />

            <p className="font-['Cinzel'] text-sm tracking-wider text-[#e9d5ae]">
              Retrieving archive record...
            </p>
          </div>
        ) : error ? (
          <div
            role="alert"
            className="rounded-2xl border border-red-400/25 bg-red-500/10 p-8"
          >
            <h2 className="font-['Cinzel'] text-xl text-[#f1b4a6]">
              Record unavailable
            </h2>

            <p className="mt-3 text-sm text-[#dbbdb6]">
              {error}
            </p>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="mt-6 rounded-lg bg-[#d8aa6b] px-5 py-2.5 text-sm font-bold text-[#18272b]"
            >
              Return to archives
            </button>
          </div>
        ) : brigader ? (
          <>
            {/* Page heading */}
            <div className="mb-9">
              <div className="mb-4 flex items-center gap-3 text-[#d7ae76]">
                <span className="h-px w-8 bg-[#d7ae76]" />

                <p className="text-xs font-bold uppercase tracking-[0.24em]">
                  Personnel records · #{brigader.id}
                </p>
              </div>

              <div className="flex items-start gap-4">
                <span className="rounded-xl border border-[#d4b27e]/30 bg-[#d4b27e]/10 p-3 text-[#edcb94]">
                  <Pencil size={27} />
                </span>

                <div>
                  <h1 className="font-['Cinzel'] text-3xl font-bold text-[#f8e8c4] sm:text-4xl">
                    Edit {brigader.name}
                  </h1>

                  <p className="mt-3 text-sm leading-7 text-[#a8bdb6]">
                    Update this Brigader's service record and
                    preserve their history in the Ellora archives.
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <BrigaderForm
              key={brigader.id}
              initialValues={brigader}
              isSaving={isSaving}
              onSubmit={submitForm}
              onCancel={() => navigate("/")}
              submitLabel="Save changes"
            />

            <p className="mt-6 text-center font-['Cinzel'] text-xs tracking-[0.15em] text-[#bca277]">
              FOR THE SURVIVAL OF ELLORA
            </p>
          </>
        ) : (
          <p className="text-center text-[#b8c5bd]">
            Brigader not found.
          </p>
        )}
      </div>
    </PageShell>
  );
}
