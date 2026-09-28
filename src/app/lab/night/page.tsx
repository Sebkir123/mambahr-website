import type { Metadata } from 'next'
import LabHome from '../_sections/lab-home'

export const metadata: Metadata = { title: 'Design lab', robots: { index: false, follow: false } }

export default function Page() {
  return <LabHome variant="night" />
}
