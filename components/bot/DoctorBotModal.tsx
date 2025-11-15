import { useState } from "react";
import { MessageCircle, X, Stethoscope } from "lucide-react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  const categories = [
    { id: "symptoms", label: "Symptoms" },
    { id: "prevention", label: "Prevention" },
    { id: "treatment", label: "Treatment" },
    { id: "pregnancy", label: "Pregnancy & Malaria" },
    { id: "children", label: "Children" },
    { id: "environment", label: "Environment" },
    { id: "others", label: "Others" },
  ];

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-[#2E3094] hover:bg-[#1f236b] text-white p-4 rounded-full shadow-xl transition-all"
      >
        <MessageCircle size={26} />
      </button>

      {/* Modal Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end md:items-center justify-center z-50">
          {/* Chat Modal Panel */}
          <div className="bg-white rounded-t-3xl md:rounded-3xl shadow-2xl w-full md:w-[420px] max-h-[85vh] flex flex-col overflow-hidden animate-slideUp md:animate-fadeIn">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                {/* Doctor Avatar */}
                <div className="w-12 h-12 rounded-full bg-[#e8efff] flex items-center justify-center shadow-inner">
                  <Stethoscope className="text-[#2E3094]" size={28} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Ask Doctor Bot</h2>
                  <p className="text-xs text-gray-500">Your malaria assistant</p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="text-gray-600 hover:text-black"
              >
                <X size={20} />
              </button>
            </div>

            {/* Welcome Section */}
            <div className="p-4 border-b text-center">
              <p className="text-sm text-gray-700">What would you like to learn about malaria today?</p>
            </div>

            {/* Category List */}
            <div className="p-4 flex flex-col gap-3 overflow-y-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className="w-full py-3 px-4 rounded-xl border flex justify-between items-center hover:bg-gray-50 transition-all text-sm font-medium"
                >
                  {cat.label}
                  <span className="text-[#2E3094] font-bold">›</span>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="p-3 text-center text-xs text-gray-400 border-t">
              Powered by Malaria Retrieval System
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp 0.35s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.35s ease-out;
        }
      `}</style>
    </>
  );
}
