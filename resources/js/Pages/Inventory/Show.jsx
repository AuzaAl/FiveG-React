import React from 'react';
import { usePage } from '@inertiajs/react';
import Adminlayout from '@/Layouts/Adminlayout';
import TextBarDetails from '@/Components/TextBarDetails';
import { ArrowUpRight } from 'lucide-react';
import ButtonTextedStyle from '@/Components/ButtonTextedStyle';

export default function Show() {
    const { inventory } = usePage().props;

    return (
        <Adminlayout>
            <div className="container mx-auto p-4">
                <h1 className="text-4xl uppercase font-bold mb-4">Detail Inventori</h1>
                <TextBarDetails title="ID" text={inventory.id}/>
                <TextBarDetails title="Kode Barang" text={inventory.kode_barang}/>
                <TextBarDetails title="Nama Barang" text={inventory.nama_barang}/>
                <TextBarDetails title="Kategori" text={inventory.kategori}/>
                <TextBarDetails title="Deskripsi" text={inventory.deskripsi}/>
                <TextBarDetails title="Status" text={inventory.status}/>
                <TextBarDetails title="Lokasi Barang" text={inventory.lokasi_barang}/>
                <TextBarDetails title="Added By" text={inventory.added_by || '-'}/>
                <TextBarDetails title="Is Active" text={inventory.is_active ? 'Aktif' : 'Nonaktif'}/>
                <div className='flex items-center mt-3'>
                   <ButtonTextedStyle href="/dashboard/inventories" text='Kembali' tipe='Link'/>
                </div>
            </div>
        </Adminlayout>
    );
}
