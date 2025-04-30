export default async function handler(req, res) {
  const ACCESS_ID = process.env.ACCESS_ID;
  const SECRET_KEY = process.env.SECRET_KEY;

  const tonce = Date.now().toString();
  const stringToSign = `access_id=${ACCESS_ID}&tonce=${tonce}${SECRET_KEY}`;

  const crypto = await import('crypto');
  const sign = crypto.createHash('sha256').update(stringToSign).digest('hex').toUpperCase();

  const url = `https://www.viabtc.com/res/openapi/v1/hashrate?coin=BTC&access_id=${ACCESS_ID}&tonce=${tonce}&sign=${sign}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hashrate' });
  }
}