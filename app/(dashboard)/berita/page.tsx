// Import Components Form add Berita
import FormBerita from "./FormBerita";


export default function Page() {
  return (
    <div>
      <div className="bg-white dark:bg-gray-900 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Tambahkan Berita
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Silahkan tambahkan berita yang ingin ditampilkan
            </p>
          </div>
          <FormBerita />
        </div>
      </div>
    </div>
  );
}
