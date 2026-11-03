'use server'
import { revalidatePath, updateTag } from 'next/cache'
import { requireAdmin } from '@/lib/auth'
export async function refreshAdminWorkspace() {
  await requireAdmin()
  updateTag('admin-data')
  revalidatePath('/admin', 'layout')
}
