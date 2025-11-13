import ProgramDetailClient from './client'

export async function generateStaticParams() {
  return [
    { id: 'PRG-001' },
    { id: 'PRG-002' },
  ]
}

export default function ProgramDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <ProgramDetailClient params={params} />
}
