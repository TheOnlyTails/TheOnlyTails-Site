import type { Handle } from "@sveltejs/kit"

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event)

  return {
    ...response,
    headers: {
      ...response.headers,
      "Accept-Encoding": "gzip, compress, br",
    },
  } as Response
}