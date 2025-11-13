import { Link } from '@inertiajs/react'
import { Plus } from 'lucide-react'
import React from 'react'

export default function AddButton({type='Undefined'}) {
  return (
    <>
    <Link href={`/dashboard/${type}/create`} className="my-4 flex flex-row-reverse items-center gap-2 w-fit bg-white rounded-lg text-sm text-black font-semibold px-3 py-2">
        <span>Tambahkan {type}</span>
        <Plus className="stroke-[1.5px]" />
    </Link>
    </>
  )
}
