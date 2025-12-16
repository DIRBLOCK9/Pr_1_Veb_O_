import { useState } from "react";

export default function SettingsPage({ apiUrl, pollIntervalMs, onSave }) {
  const [url, setUrl] = useState(apiUrl);
  const [interval, setInterval] = useState(String(pollIntervalMs));
  const [msg, setMsg] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const trimmed = url.trim();
    const num = Number(interval);

    if (!trimmed.startsWith("http")) {
      setMsg("❌ API URL має починатися з http/https");
      return;
    }
    if (!Number.isFinite(num) || num < 1000 || num > 60000) {
      setMsg("❌ Інтервал має бути від 1000 до 60000 мс");
      return;
    }

    onSave(trimmed, num);
    setMsg("✅ Збережено! Тепер відкрий сторінку “Сенсори”.");
  }

  return (
    <section className="card">
      <h2>Налаштування інтеграції</h2>

      <form onSubmit={handleSubmit} className="form">
        <label className="label">
          API URL (ендпоінт сенсорної мережі)
          <input
            className="input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/api/sensors"
          />
        </label>

        <label className="label">
          Інтервал опитування (мс)
          <input
            className="input"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            placeholder="5000"
          />
        </label>

        <button className="btn" type="submit">Зберегти</button>
      </form>

      {msg && <p className="message">{msg}</p>}

      <div className="mini">
        <div><b>Поточний URL:</b> {apiUrl}</div>
        <div><b>Поточний інтервал:</b> {pollIntervalMs} мс</div>
      </div>
    </section>
  );
}
