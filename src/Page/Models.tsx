import { useEffect, useState } from "react";
import { message } from "antd";
import { PagepathAPI } from "../Router/Path";

type ModelStatus = {
  name: string;
  enabled: boolean;
};

const Models = () => {
  const [models, setModels] = useState<ModelStatus[]>([]);
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});
  const [loadingPage, setLoadingPage] = useState(false);

  const token = sessionStorage.getItem("Token");

  // ================= FETCH =================
  const fetchModels = async () => {
    if (!token) {
      message.error("กรุณา login");
      return;
    }

    try {
      setLoadingPage(true);

      const res = await fetch(PagepathAPI.Model, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Fetch failed");

      const data = await res.json();
      setModels(data.models ?? []);
    } catch (err) {
      console.error(err);
      message.error("โหลดข้อมูลไม่สำเร็จ");
    } finally {
      setLoadingPage(false);
    }
  };

  // ================= TOGGLE =================
  const toggleModel = async (name: string, enabled: boolean) => {
    if (!token) {
      message.error("กรุณา login");
      return;
    }

    const key = `toggle-${name}`;
    const oldModels = [...models];

    // 🔥 optimistic update
    setModels((prev) =>
      prev.map((m) => (m.name === name ? { ...m, enabled } : m))
    );

    setLoadingMap((prev) => ({ ...prev, [name]: true }));

    // 🔥 loading message
    message.loading({
      content: `กำลังอัปเดต ${name}...`,
      key,
    });

    try {
      const res = await fetch(PagepathAPI.Model + "/toggle", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, enabled }),
      });

      if (!res.ok) throw new Error("Toggle failed");

      message.success({
        content: `อัปเดต ${name} สำเร็จ`,
        key,
        duration: 2,
      });
    } catch (err) {
      console.error(err);

      // ❗ rollback
      setModels(oldModels);

      message.error({
        content: `อัปเดต ${name} ไม่สำเร็จ`,
        key,
        duration: 2,
      });
    } finally {
      setLoadingMap((prev) => ({ ...prev, [name]: false }));
    }
  };

  // ================= INIT =================
  useEffect(() => {
    fetchModels();
  }, []);

  // ================= UI =================
  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Model Settings
      </h2>

      {loadingPage ? (
        <div className="text-center text-gray-500 animate-pulse">
          Loading...
        </div>
      ) : (
        <div className="space-y-4">
          {models.map((model) => (
            <div
              key={model.name}
              className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition"
            >
              {/* Left */}
              <div className="flex flex-col">
                <span className="text-lg font-medium text-gray-700">
                  {model.name}
                </span>
                <span
                  className={`text-sm ${
                    model.enabled ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {model.enabled ? "Enabled" : "Disabled"}
                </span>
              </div>

              {/* Right Switch */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={model.enabled}
                  disabled={loadingMap[model.name]}
                  onChange={(e) =>
                    toggleModel(model.name, e.target.checked)
                  }
                  className="sr-only peer"
                />

                {/* Track */}
                <div className="w-12 h-7 bg-gray-300 rounded-full peer-checked:bg-green-600 transition duration-300"></div>

                {/* Knob */}
                <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-5"></div>
              </label>
            </div>
          ))}

          {/* Empty state */}
          {models.length === 0 && (
            <div className="text-center text-gray-400">
              ไม่มี model
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Models;