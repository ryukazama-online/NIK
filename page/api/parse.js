import nikParse from 'nik-parse';

export default function handler(req, res) {
  const { nik } = req.query;

  if (!nik || nik.length !== 16) {
    return res.status(400).json({ error: 'NIK tidak valid' });
  }

  try {
    const result = nikParse(nik);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: 'Gagal parse NIK' });
  }
}