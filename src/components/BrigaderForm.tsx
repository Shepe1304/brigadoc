
import type { FormEvent, ReactNode } from "react";
import {
  ArrowLeft,
  Image as ImageIcon,
  LoaderCircle,
  Save,
  ScrollText,
  Shield,
  UserRound,
} from "lucide-react";

import type { BrigaderInput } from "../types/brigader";

interface BrigaderFormProps {
  initialValues?: Partial<BrigaderInput>;
  isSaving?: boolean;
  onSubmit: (values: BrigaderInput) => void | Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
}

interface FieldProps {
  label: string;
  name: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}

const inputClass =
  "mt-2 w-full rounded-xl border border-[#d6b37a]/20 bg-[#07161b]/75 px-4 py-3 text-sm text-[#f8efd9] placeholder:text-[#7c9694] shadow-inner outline-none transition-colors focus:border-[#e1b16a] focus:ring-2 focus:ring-[#e1b16a]/15";

const labelClass =
  "block text-xs font-bold uppercase tracking-[0.16em] text-[#e1c599]";

function Field({
  label,
  name,
  required = false,
  hint,
  children,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
        {required && (
          <span className="ml-1 text-[#e89a76]">*</span>
        )}
      </label>

      {children}

      {hint && (
        <p className="mt-1.5 text-xs leading-relaxed text-[#91a7a7]">
          {hint}
        </p>
      )}
    </div>
  );
}

export default function BrigaderForm({
  initialValues = {},
  isSaving = false,
  onSubmit,
  onCancel,
  submitLabel = "Save profile",
}: BrigaderFormProps) {
  const value = (key: keyof BrigaderInput) =>
    initialValues[key] ?? "";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const get = (key: string): string =>
      String(formData.get(key) ?? "").trim();

    const values: BrigaderInput = {
      name: get("name"),
      appearance: get("appearance"),
      picUrl: get("picUrl") || null,
      element: get("element"),
      bio: get("bio") || null,
      squad: Number(get("squad")),
      role: get("role"),
    };

    if (!Number.isSafeInteger(values.squad) || values.squad < 0) {
      return;
    }

    void onSubmit(values);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-2xl border border-[#d6b37a]/25 bg-[#14282c]/90 shadow-[0_22px_75px_rgba(0,0,0,0.3)]"
    >
      {/* Form heading */}
      <div className="flex items-center gap-3 border-b border-[#d6b37a]/20 bg-gradient-to-r from-[#224044] to-[#16282b] px-6 py-5 sm:px-8">
        <span className="rounded-xl border border-[#d6b37a]/30 bg-[#d6b37a]/10 p-2.5 text-[#f1ca89]">
          <ScrollText size={23} />
        </span>

        <div>
          <h2 className="font-['Cinzel'] text-lg font-semibold tracking-wide text-[#f4e4bc]">
            Brigade registration
          </h2>
          <p className="mt-0.5 text-xs text-[#a4b9b4]">
            Complete the archive entry
          </p>
        </div>
      </div>

      <div className="space-y-7 p-6 sm:p-8">
        {/* Identity section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-[#73c6bb]">
            <UserRound size={17} />
            <h3 className="text-sm font-bold uppercase tracking-[0.16em]">
              Identity
            </h3>
          </div>

          <Field label="Full name" name="name" required>
            <input
              className={inputClass}
              id="name"
              name="name"
              type="text"
              required
              defaultValue={value("name")}
              placeholder="e.g. Karthik"
            />
          </Field>

          <Field label="Appearance" name="appearance" required>
            <textarea
              className={`${inputClass} min-h-24 resize-y`}
              id="appearance"
              name="appearance"
              required
              defaultValue={value("appearance")}
              placeholder="Describe the character's appearance..."
            />
          </Field>

          <Field
            label="Portrait URL"
            name="picUrl"
            hint="Use a public image URL, preferably hosted in Supabase Storage."
          >
            <div className="relative">
              <ImageIcon
                size={17}
                className="pointer-events-none absolute left-4 top-5 text-[#86a5a1]"
              />

              <input
                className={`${inputClass} pl-11`}
                id="picUrl"
                name="picUrl"
                type="url"
                defaultValue={value("picUrl")}
                placeholder="https://..."
              />
            </div>
          </Field>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-[#d6b37a]/30 to-transparent" />

        {/* Service record section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-[#73c6bb]">
            <Shield size={17} />
            <h3 className="text-sm font-bold uppercase tracking-[0.16em]">
              Service record
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Element" name="element" required>
              <input
                list="elements"
                className={inputClass}
                id="element"
                name="element"
                required
                defaultValue={value("element")}
                placeholder="Air, Water, Earth, Fire..."
              />

              <datalist id="elements">
                <option value="Air" />
                <option value="Water" />
                <option value="Earth" />
                <option value="Fire" />
                <option value="Non-bender" />
              </datalist>
            </Field>

            <Field label="Squad number" name="squad" required>
              <input
                className={inputClass}
                id="squad"
                name="squad"
                type="number"
                min="0"
                step="1"
                required
                defaultValue={value("squad")}
                placeholder="0"
              />
            </Field>
          </div>

          <Field label="Brigade role" name="role" required>
            <input
              className={inputClass}
              id="role"
              name="role"
              type="text"
              required
              defaultValue={value("role")}
              placeholder="e.g. Commander"
            />
          </Field>

          <Field label="Biography" name="bio">
            <textarea
              className={`${inputClass} min-h-36 resize-y`}
              id="bio"
              name="bio"
              defaultValue={value("bio")}
              placeholder="Character history, duties and allegiances..."
            />
          </Field>
        </section>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-[#d6b37a]/15 pt-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSaving}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#d6b37a]/25 px-5 py-3 text-sm font-bold text-[#d0d7cf] transition-colors hover:border-[#d6b37a]/50 hover:bg-white/5 disabled:opacity-50"
          >
            <ArrowLeft size={17} />
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#dfae69] px-6 py-3 text-sm font-extrabold text-[#17242a] transition-all hover:-translate-y-0.5 hover:bg-[#f1c98d] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? (
              <LoaderCircle size={17} className="animate-spin" />
            ) : (
              <Save size={17} />
            )}

            {isSaving ? "Saving..." : submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}
