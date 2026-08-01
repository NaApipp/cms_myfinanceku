"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FormBerita() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Handle POST berita
  const handleAddBerita = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      return;
    }

    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    try {
      const formData = new FormData(form);

      const response = await fetch("/api/berita", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success !== false) {
        setMessage({ text: "Berita berhasil ditambahkan!", type: "success" });
        form.reset();
        setCurrentStep(1);
      } else {
        let errorMsg = "Terjadi kesalahan saat menyimpan berita";
        if (result.errors && Array.isArray(result.errors)) {
          errorMsg = result.errors
            .map(
              (e: { field: string; message: string }) =>
                `${e.field}: ${e.message}`,
            )
            .join(", ");
        } else if (result.error && typeof result.error === "string") {
          errorMsg = result.error;
        }
        setMessage({ text: errorMsg, type: "error" });
      }
    //   router.push("/data-berita");
    } catch (error: any) {
      console.error("Error submitting form:", error);
      setMessage({
        text: "Terjadi kesalahan: " + (error.message || "Jaringan Error"),
        type: "error",
      });
      
    } finally {
      setIsSubmitting(false);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-lime-500 dark:focus:ring-lime-400 focus:border-lime-500 dark:focus:border-lime-400 outline-none transition-colors text-gray-900 dark:text-white";

  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 md:p-8">
        {/* Stepper Indicator */}
        <div className="flex items-center justify-between mb-8 relative px-4 sm:px-12">
          <div className="absolute left-8 right-8 top-5 -translate-y-1/2 h-1 bg-gray-200 dark:bg-gray-700 -z-10 rounded-full"></div>
          <div
            className="absolute left-8 top-5 -translate-y-1/2 h-1 bg-lime-500 transition-all duration-300 -z-10 rounded-full"
            style={{
              width: `calc(${((currentStep - 1) / 3) * 100}% - 4rem)`,
            }}
          ></div>
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 transition-colors duration-300 ${
                  currentStep >= step
                    ? "bg-lime-500 border-gray-50 dark:border-gray-800 text-white"
                    : "bg-gray-200 dark:bg-gray-700 border-gray-50 dark:border-gray-800 text-gray-500 dark:text-gray-400"
                }`}
              >
                {step}
              </div>
              <span
                className={`text-xs font-medium hidden sm:block ${
                  currentStep >= step
                    ? "text-lime-600 dark:text-lime-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {step === 1
                  ? "Info Dasar"
                  : step === 2
                    ? "Konten"
                    : step === 3
                      ? "Penulis & Tag"
                      : step === 4
                        ? "SEO"
                        : "Dan Lainnya"}
              </span>
            </div>
          ))}
        </div>

        {message.text && (
          <div
            className={`p-4 mb-6 rounded-lg ${message.type === "success" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"}`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleAddBerita} className="space-y-6">
          <div
            className={`${currentStep === 1 ? "block space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500" : "hidden"}`}
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Langkah 1: Informasi Dasar
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Judul Berita */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Judul Berita
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className={inputClass}
                  placeholder="Judul berita"
                />
              </div>

              {/* slug */}
              <div>
                <label
                  htmlFor="slug"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Slug
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  className={inputClass}
                  placeholder="Slug berita (contoh: hari-ini-sedang-inflasi)"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Type */}
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Tipe Berita
                </label>
                <select
                  id="type"
                  name="type"
                  className={`${inputClass} resize-none`}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Pilih Tipe Berita
                  </option>
                  <option value="tips">Tips</option>
                  <option value="edukasi">Edukasi</option>
                  <option value="investasi">Investasi</option>
                  <option value="perbankan">Perbankan</option>
                  <option value="asuransi">Asuransi</option>
                </select>
              </div>

              {/* Language */}
              <div>
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Bahasa Berita
                </label>
                <select
                  id="language"
                  name="language"
                  className={`${inputClass} resize-none`}
                  defaultValue="id"
                >
                  <option value="id">Indonesia</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
          </div>

          <div
            className={`${currentStep === 2 ? "block space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500" : "hidden"}`}
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Langkah 2: Konten & Media
            </h3>
            {/* konten berita */}
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Konten Berita
              </label>
              <textarea
                id="content"
                name="content"
                rows={4}
                className={`${inputClass} resize-none`}
                placeholder="Konten berita"
              />
            </div>

            {/* ringkasan berita */}
            <div>
              <label
                htmlFor="summary"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Ringkasan Berita
              </label>
              <input
                type="text"
                id="summary"
                name="summary"
                className={inputClass}
                placeholder="Ringkasan berita"
              />
            </div>

            {/* Image Thumbnail*/}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Gambar Thumbnail
              </label>
              <input
                type="file"
                id="image"
                name="image"
                className={inputClass}
                accept=".jpg,.jpeg,.png,.webp"
              />
            </div>
          </div>

          <div
            className={`${currentStep === 3 ? "block space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500" : "hidden"}`}
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Langkah 3: Penulis & Tag
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Author*/}
              <div>
                <label
                  htmlFor="author"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Penulis
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  className={inputClass}
                  placeholder="Penulis berita"
                />
              </div>

              {/* Tags */}
              <div>
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Tag Berita
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  className={inputClass}
                  placeholder="Tag berita (pisahkan dengan koma)"
                />
              </div>
            </div>
          </div>

          <div
            className={`${currentStep === 4 ? "block space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500" : "hidden"}`}
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Langkah 4: SEO (Search Engine Optimization)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Meta Title */}
              <div>
                <label
                  htmlFor="metaTittle"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Meta Title
                </label>
                <input
                  type="text"
                  id="metaTittle"
                  name="metaTittle"
                  className={inputClass}
                  placeholder="Maksimal 60 karakter"
                />
              </div>

              {/* Meta Keywords */}
              <div>
                <label
                  htmlFor="metaKeywords"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Meta Keywords
                </label>
                <input
                  type="text"
                  id="metaKeywords"
                  name="metaKeywords"
                  className={inputClass}
                  placeholder="Pisahkan dengan koma (contoh: finance, bank)"
                />
              </div>
            </div>

            {/* Meta Description */}
            <div>
              <label
                htmlFor="metaDescription"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Meta Description
              </label>
              <textarea
                id="metaDescription"
                name="metaDescription"
                rows={3}
                className={`${inputClass} resize-none`}
                placeholder="Maksimal 160 karakter"
              />
            </div>

            {/* OG Image */}
            <div>
              <label
                htmlFor="ogImage"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                URL OG Image (Opsional)
              </label>
              <input
                type="url"
                id="ogImage"
                name="ogImage"
                className={inputClass}
                placeholder="https://contoh.com/image.jpg"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200 dark:border-gray-700">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                disabled={isSubmitting}
                className="flex-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-lg font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-800 transition-colors disabled:opacity-50"
              >
                Sebelumnya
              </button>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-lime-600 dark:bg-lime-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-lime-700 dark:hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 dark:focus:ring-offset-gray-800 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {isSubmitting ? (
                <span>Menyimpan...</span>
              ) : currentStep === 4 ? (
                "Simpan Berita"
              ) : (
                "Selanjutnya"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
