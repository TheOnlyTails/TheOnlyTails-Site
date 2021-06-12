import type { RequestHandler } from "@sveltejs/kit"

export const slugFromPath = (path) => path.match(/([\w-]+)\.(svelte\.md)/i)?.[1] ?? null

export const get: RequestHandler = async ({ query }) => {
  const modules = import.meta.glob("/static/pages/*.svelte.md")

  const postPromises = []
  const limit = Number(query.get("limit") ?? Infinity)

  if (Number.isNaN(limit)) {
    return {
      status: 400,
    }
  }

  for (let [path, resolver] of Object.entries(modules)) {
    const slug = slugFromPath(path)
    const promise = resolver().then((post) => ({
      slug,
      ...post.metadata,
    }))

    postPromises.push(promise)
  }

  const posts = await Promise.all(postPromises)
  const publishedPosts = posts.filter((post) => post.published).slice(0, limit)

  publishedPosts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1))

  return {
    body: publishedPosts.slice(0, limit),
  }
}