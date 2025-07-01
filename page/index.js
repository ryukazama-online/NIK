import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/globals.module.css';

export default function Home() {
  const [nik, setNik] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? styles.dark : '';
  }, [darkMode]);

  const handleCheck = async () => {
    setResult(null);
    setError(null);
    try {
      const res = await fetch(`/api/parse?nik=${nik}`);
      const data = await res.json();
      if (res.ok) {
        setResult(data);
      } else {
        setError(data.error);
      }
    } catch (e) {
      setError('Terjadi kesalahan');
    }
  };

  return (
    <div className={`${styles.container} ${darkMode ? styles.dark : ''}`}>
      <Head>
        <title>Cek NIK Indonesia</title>
        <meta name="description" content="Website untuk mengecek informasi berdasarkan NIK" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>🔍 Cek NIK Indonesia</h1>

        <div className={styles.toggleMode}>
          <label>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />{' '}
            Dark Mode
          </label>
        </div>

        <div className={styles.inputSection}>
          <input
            type="text"
            value={nik}
            onChange={(e) => setNik(e.target.value)}
            placeholder="Masukkan 16 digit NIK"
            className={styles.input}
          />
          <button onClick={handleCheck} className={styles.button}>Cek Sekarang</button>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        {result && (
          <pre className={styles.result}>{JSON.stringify(result, null, 2)}</pre>
        )}
      </main>

      <footer className={styles.footer}>
        Dibuat dengan ❤️ oleh Kamu
      </footer>
    </div>
  );
}