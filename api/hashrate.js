import crypto from 'crypto';

export default async function handler(req, res) {
  const ACCESS_ID = '00985306ea159c76c1bf0a0ccb4ecc87';
  const SECRET_KEY = 'b92249bfdbef50b82510aacf7c9c158c22d6a42b9d1d8ebdfddec13120ba1335';
  const BASE_URL = 'https://www.viabtc.com/res/openapi/v1/hashrate';

  const tonce = Date.now().toString();
  const query = `access_id=${ACCESS_ID}&tonce=${tonce}`;
  const sign = crypto
    .createHash('sha256')
    .update(query + SECRET_KEY)
    .digest('hex')
    .toUpperCase();

  try {
    const response = await fetch(`${BASE_URL}?coin=BTC&${query}&sign=${sign}`, {
      method: 'GET',
      headers: {
        'X-API-KEY': ACCESS_ID
      }
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al consultar la API de ViaBTC', details: err.message });
  }
}
