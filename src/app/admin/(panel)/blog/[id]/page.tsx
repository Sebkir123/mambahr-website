import { notFound } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'
import type { Post } from '@/lib/blog'
import { getBlogPostAnalytics } from '@/lib/blog-analytics'
import Editor from './editor'

export const dynamic = 'force-dynamic'

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin()
  const { id } = await params
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.from('posts').select('*').eq('id', id).single()
  if (!data) notFound()
  const post = data as Post
  const analytics = await getBlogPostAnalytics(post.slug)
  return <Editor post={post} analytics={analytics} />
}
