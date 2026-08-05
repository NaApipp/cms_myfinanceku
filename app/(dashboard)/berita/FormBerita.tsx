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

  return (
    <>
      <div className="form-card">
        {/* Stepper Indicator */}
        <div className="stepper-wrap">
          <div className="stepper-line" />
          <div
            className="stepper-line-active"
            style={{
              width: `calc(${((currentStep - 1) / 3) * 100}% - 1rem)`,
            }}
          />
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className={`step-node${currentStep >= step ? " active" : ""}`}>
              <div className="step-circle">{step}</div>
              <span className="step-label">
                {step === 1
                  ? "Info Dasar"
                  : step === 2
                    ? "Konten"
                    : step === 3
                      ? "Penulis"
                      : "SEO"}
              </span>
            </div>
          ))}
        </div>

        {message.text && (
          <div
            className={`alert-box ${message.type === "success" ? "alert-success" : "alert-error"}`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleAddBerita}>
          <div
            className={currentStep === 1 ? "animate-in fade-in duration-300" : "hidden"}
          >
            <h3 className="form-section-title">
              Langkah 1: Informasi Dasar
            </h3>
            <div className="field-grid">
              {/* Judul Berita */}
              <div className="field-group">
                <label className="field-label">Judul Berita</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="input-field"
                  placeholder="Judul berita"
                  required
                />
              </div>

              {/* slug */}
              <div className="field-group">
                <label className="field-label">Slug</label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  className="input-field"
                  placeholder="hari-ini-sedang-inflasi"
                  required
                />
              </div>
            </div>

            <div className="field-grid">
              {/* Type */}
              <div className="field-group">
                <label className="field-label">Tipe Berita</label>
                <select
                  id="type"
                  name="type"
                  className="input-field"
                  defaultValue=""
                  required
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
              <div className="field-group">
                <label className="field-label">Bahasa Berita</label>
                <select
                  id="language"
                  name="language"
                  className="input-field"
                  defaultValue="id"
                  required
                >
                  <option value="id">Indonesia</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
          </div>

          <div
            className={currentStep === 2 ? "animate-in fade-in duration-300" : "hidden"}
          >
            <h3 className="form-section-title">
              Langkah 2: Konten & Media
            </h3>
            {/* konten berita */}
            <div className="field-group">
              <label className="field-label">Konten Berita</label>
              <textarea
                id="content"
                name="content"
                rows={6}
                className="input-field"
                placeholder="Tulis konten berita di sini..."
                required
              />
            </div>

            {/* ringkasan berita */}
            <div className="field-group">
              <label className="field-label">Ringkasan Berita</label>
              <input
                type="text"
                id="summary"
                name="summary"
                className="input-field"
                placeholder="Ringkasan singkat berita..."
                required
              />
            </div>

            {/* Image Thumbnail*/}
            <div className="field-group">
              <label className="field-label">Gambar Thumbnail</label>
              <input
                type="file"
                id="image"
                name="image"
                className="input-field"
                accept=".jpg,.jpeg,.png,.webp"
              />
            </div>
          </div>

          <div
            className={currentStep === 3 ? "animate-in fade-in duration-300" : "hidden"}
          >
            <h3 className="form-section-title">
              Langkah 3: Penulis & Tag
            </h3>
            <div className="field-grid">
              {/* Author*/}
              <div className="field-group">
                <label className="field-label">Penulis</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  className="input-field"
                  placeholder="Penulis berita"
                  required
                />
              </div>

              {/* Tags */}
              <div className="field-group">
                <label className="field-label">Tag Berita</label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  className="input-field"
                  placeholder="finance, investasi, bank (pisahkan dengan koma)"
                  required
                />
              </div>
            </div>
          </div>

          <div
            className={currentStep === 4 ? "animate-in fade-in duration-300" : "hidden"}
          >
            <h3 className="form-section-title">
              Langkah 4: SEO (Search Engine Optimization)
            </h3>
            <div className="field-grid">
              {/* Meta Title */}
              <div className="field-group">
                <label className="field-label">Meta Title</label>
                <input
                  type="text"
                  id="metaTittle"
                  name="metaTittle"
                  className="input-field"
                  placeholder="Maksimal 60 karakter"
                />
              </div>

              {/* Meta Keywords */}
              <div className="field-group">
                <label className="field-label">Meta Keywords</label>
                <input
                  type="text"
                  id="metaKeywords"
                  name="metaKeywords"
                  className="input-field"
                  placeholder="Pisahkan dengan koma (contoh: finance, bank)"
                />
              </div>
            </div>

            {/* Meta Description */}
            <div className="field-group">
              <label className="field-label">Meta Description</label>
              <textarea
                id="metaDescription"
                name="metaDescription"
                rows={3}
                className="input-field"
                placeholder="Maksimal 160 karakter"
              />
            </div>

            {/* OG Image */}
            <div className="field-group">
              <label className="field-label">URL OG Image (Opsional)</label>
              <input
                type="url"
                id="ogImage"
                name="ogImage"
                className="input-field"
                placeholder="https://contoh.com/image.jpg"
              />
            </div>
          </div>

          <div className="button-row">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                disabled={isSubmitting}
                className="btn btn-ghost"
              >
                Sebelumnya
              </button>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-fill"
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
