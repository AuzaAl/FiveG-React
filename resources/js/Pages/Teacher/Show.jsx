import React from 'react';
import { usePage } from '@inertiajs/react';
import Adminlayout from '@/Layouts/Adminlayout';
import TextBarDetails from '@/Components/TextBarDetails';
import { ArrowUpRight } from 'lucide-react';
import ButtonTextedStyle from '@/Components/ButtonTextedStyle';

export default function Show() {
    const { teacher } = usePage().props;

    return (
        <Adminlayout>
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Detail Guru</h1>
            <TextBarDetails title="NIP" text={teacher.nip} />
            <TextBarDetails title="Nama Lengkap" text={teacher.nama_lengkap} />
            <TextBarDetails title="Jabatan" text={teacher.jabatan || '-'} />
            <TextBarDetails title="Alamat" text={teacher.alamat || '-'} />
            <TextBarDetails title="No HP" text={teacher.no_hp || '-'} />
            <TextBarDetails title="Email" text={teacher.email || '-'} />
            <TextBarDetails title="Status" text={teacher.is_active ? 'Aktif' : 'Nonaktif'} />
            <div className='flex items-center mt-3'>
                <ButtonTextedStyle href="/dashboard/teachers" text='Kembali' tipe='Link'/>
            </div>
                </div>
        </Adminlayout>
    );
}
