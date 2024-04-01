type Props = {
  title: string
}

export default function PageHeader({title}: Props) {
  return (
    <div className='flex items-center w-full h-16 pl-4 border-b shrink-0'>
      <h1 className="text-2xl font-bold text-sky-950">{title}</h1>
    </div>
  )
}