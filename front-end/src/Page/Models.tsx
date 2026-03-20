import { useEffect, useState } from "react";
import { PagepathAPI } from "../Router/Path";

type ModelStatus = {
  name: string;
  enabled: boolean;
};

const Models = () => {
  const [models, setModels] = useState<ModelStatus[]>([]);
  const token = sessionStorage.getItem("Token");

  const fetchModels = async () => {
    const res = await fetch(PagepathAPI.Model, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    setModels(data.models);
  };

  const toggleModel = async (name: string, enabled: boolean) => {
    await fetch("/toggle", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        enabled,
      }),
    });

    // update UI
    setModels((prev) =>
      prev.map((m) => (m.name === name ? { ...m, enabled } : m)),
    );
  };

  useEffect(() => {
    const runfun = () => {
      fetchModels();
    };
    runfun();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10">
  <h2 className="text-2xl font-semibold mb-6 text-gray-800">
    Model Settings
  </h2>

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

        {/* Right - Switch */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={model.enabled}
            onChange={(e) =>
              toggleModel(model.name, e.target.checked)
            }
            className="sr-only peer"
          />

          {/* track */}
          <div className="w-12 h-7 bg-gray-300 rounded-full peer-checked:bg-green-600 transition duration-300"></div>

          {/* knob */}
          <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-5"></div>
        </label>
      </div>
    ))}
  </div>
</div>
  );
};

export default Models;
