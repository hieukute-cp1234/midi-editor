export function ConfirmModal({
  title,
  description,
  onCancel,
  onOk,
}: {
  title: string;
  description: string;
  onCancel: () => void;
  onOk: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <h4 className="text-l mb-4">{description}</h4>

        <div className="flex justify-end gap-2 pt-3">
          <button
            type="button"
            className="px-4 py-2 rounded bg-gray-300"
            onClick={onCancel}
          >
            No
          </button>

          <button
            type="button"
            className="px-4 py-2 rounded bg-blue-600 text-white"
            onClick={onOk}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
