import { redirect } from 'next/navigation'

export default function CitizenCommunityPage() {
  redirect('/citizen/dashboard')
}

export const metadata = {
  title: 'Community Hub - Municipal Updates',
  description: 'View municipal announcements, community updates and official notifications.'
}