import { createSupabaseBrowserClient } from '@/lib/supabase/browser'
import { blogStoragePath } from '@/lib/blog-images'

const MAX_BYTES = 8 * 1024 * 1024 // 8 MB
const ALLOWED = ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif']

// Uploads an image to the public blog-media bucket and returns its public URL.
// RLS only lets allowlisted admins write, so this is safe from the browser.
export async function uploadImage(file: File): Promise<string | null> {
  if (!ALLOWED.includes(file.type)) {
    alert('Unsupported image type. Use PNG, JPEG, WebP, GIF, or AVIF.')
    return null
  }
  if (file.size > MAX_BYTES) {
    alert('Image is too large (max 8 MB).')
    return null
  }

  const supabase = createSupabaseBrowserClient()
  const ext = file.name.split('.').pop()?.toLowerCase() || 'png'
  const rand = Math.random().toString(36).slice(2, 10)
  const path = `${new Date().getFullYear()}/${rand}.${ext}`

  const { error } = await supabase.storage.from('blog-media').upload(path, file, {
    cacheControl: '31536000',
    upsert: false,
    contentType: file.type,
  })
  if (error) {
    alert(`Upload failed: ${error.message}`)
    return null
  }
  const { data } = supabase.storage.from('blog-media').getPublicUrl(path)
  return data.publicUrl
}

// Best-effort delete of blog-media images by their public URL. Non-blog-media
// URLs (external, data:) are skipped. RLS only lets an allowlisted admin
// delete, so this is safe from the browser. Never throws, a failed cleanup
// leaves an orphan for the daily sweep, it must never break the edit.
export async function deleteImages(urls: (string | null | undefined)[]): Promise<void> {
  const paths = Array.from(
    new Set(urls.map(blogStoragePath).filter((p): p is string => !!p)),
  )
  if (!paths.length) return
  try {
    const supabase = createSupabaseBrowserClient()
    await supabase.storage.from('blog-media').remove(paths)
  } catch {
    /* orphan gets caught by the retention sweep */
  }
}
