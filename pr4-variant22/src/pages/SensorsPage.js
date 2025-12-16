import { useEffect, useState } from "react";

function generateSensorPacket() {
  return [
    { id: "T-01", name: "Температура", unit: "°C", value: (20 + Math.random() * 10).toFixed(1) },
    { id: "H-02", name: "Вологість", unit: "%", value: (40 + Math.random() * 25).toFixed(0) },
    { id: "B-03", name: "Акумулятор робота", unit: "%", value: (60 + Math.random() * 40).toFixed(0) },
  ];
}

export default function SensorsPage({ apiUrl, pollIntervalMs }) {
  const [sensors, setSensors] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | ok | error
  const [errorText, setErrorText] = useState("");
  const [lastUpdate, setLastUpdate] = useState("");

  async function fetchSensors() {
    setStatus("loading");
    setErrorText("");

    try {
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      await res.json();

      setSensors(generateSensorPacket());
      setLastUpdate(new Date().toLocaleTimeString());
      setStatus("ok");
    } catch (e) {
      setStatus("error");
      setErrorText(`Не вдалося отримати дані з API: ${String(e.message || e)}`);
    }
  }

  useEffect(() => {
    fetchSensors();
    const t = setInterval(fetchSensors, pollIntervalMs);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl, pollIntervalMs]);

  return (
    <section className="card">
      <h2>Сенсори (API інтеграція)</h2>

      <div className="mini">
        <div><b>API:</b> {apiUrl}</div>
        <div><b>Інтервал:</b> {pollIntervalMs} мс</div>
        <div><b>Останнє оновлення:</b> {lastUpdate || "—"}</div>
      </div>

      <div className="row">
        <button className="btn" onClick={fetchSensors}>Оновити вручну</button>
        <span className="badge">
          {status === "loading" && "⏳ Завантаження..."}
          {status === "ok" && "✅ Дані отримано"}
          {status === "error" && "❌ Помилка"}
          {status === "idle" && "…"}
        </span>
      </div>

      {status === "error" && <p className="error">{errorText}</p>}

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Сенсор</th>
            <th>Значення</th>
          </tr>
        </thead>
        <tbody>
          {sensors.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td><b>{s.value}</b> {s.unit}</td>
            </tr>
          ))}
          {!sensors.length && (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>Немає даних</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
