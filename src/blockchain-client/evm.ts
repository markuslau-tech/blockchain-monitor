export async function request(
  source: string,
  method: string,
  params: any[] = []
) {
  const res = await fetch(source, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      method,
      params,
      id: 1,
      jsonrpc: '2.0',
    }),
  });

  return res.json();
}
