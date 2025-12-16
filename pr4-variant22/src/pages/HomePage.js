export default function HomePage() {
  return (
    <section className="card">
      <h1>Практична №4 • Варіант 22</h1>
      <p>
        Реалізовано SPA на React для інтеграції робота із зовнішніми сенсорними мережами через API.
      </p>
      <ul>
        <li>React Router: сторінки “Головна / Сенсори / Налаштування”</li>
        <li>Fetch API: отримання даних з API</li>
        <li>useState: форма налаштувань (API URL, інтервал опитування)</li>
      </ul>
      <p className="hint">
        Перейди в “Налаштування”, задай API та інтервал, потім відкрий “Сенсори”.
      </p>
    </section>
  );
}
