import React from 'react';
import { usePage } from '@inertiajs/react';
import Adminlayout from '@/Layouts/Adminlayout';
import TextBarDetails from '@/Components/TextBarDetails';
import { ArrowUpRight } from 'lucide-react';
import ButtonTextedStyle from '@/Components/ButtonTextedStyle';

export default function Show() {
    const { student } = usePage().props;

    return (
        <Adminlayout>
            <div className="container mx-auto p-4">
                <h1 className="text-4xl uppercase font-bold mb-4">Detail Siswa</h1>
                <TextBarDetails title="NISN" text={student.nisn}/>
                <TextBarDetails title="Nama Lengkap" text={student.nama_lengkap}/>
                <TextBarDetails title="Tempat Lahir" text={student.tempat_lahir || '-'}/>
                <TextBarDetails title="Tanggal Lahir" text={student.tanggal_lahir || '-'}/>
                <TextBarDetails title="Alamat" text={student.alamat || '-'}/>
                <TextBarDetails title="Jurusan" text={student.jurusan || '-'}/>
                <TextBarDetails title="Angkatan" text={student.angkatan || '-'}/>
                <TextBarDetails title="No HP" text={student.no_hp || '-'}/>
                <TextBarDetails title="Email" text={student.email || '-'}/>
                <TextBarDetails title="Added By" text={student.added_by || '-'}/>
                <TextBarDetails title="Status" text={student.is_active ? 'Aktif' : 'Nonaktif'}/>
                <div className='flex items-center mt-3'>
                    <ButtonTextedStyle href="/dashboard/students" text='Kembali' tipe='Link'/>
                </div>
            </div>
        </Adminlayout>
    );
}