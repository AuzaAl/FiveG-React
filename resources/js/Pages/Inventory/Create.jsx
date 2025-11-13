import React from 'react';
import { useForm } from '@inertiajs/react';
import Adminlayout from '@/Layouts/Adminlayout';
import ButtonTextedStyle from '@/Components/ButtonTextedStyle';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        kode_barang: '',
        nama_barang: '',
        kategori: '',
        deskripsi: '',
        status: '',
        lokasi_barang: '',
        is_active: 1,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/dashboard/inventories');
    };

    return (
        <Adminlayout>
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 uppercase">Tambah Inventori</h1>
            <form onSubmit={handleSubmit} className="[&_input]:rounded-lg [&_input]:border-border-color [&_select]:border-border-color">
                <div className="mb-4">
                    <label className="block">Kode Barang</label>
                    <input type="text" value={data.kode_barang || ''} onChange={(e) => setData('kode_barang', e.target.value)} className="border p-2 w-full" />
                    {errors.kode_barang && <span className="text-red-500">{errors.kode_barang}</span>}
                </div>
                <div className="mb-4">
                    <label className="block">Nama Barang</label>
                    <input type="text" value={data.nama_barang || ''} onChange={(e) => setData('nama_barang', e.target.value)} className="border p-2 w-full" />
                    {errors.nama_barang && <span className="text-red-500">{errors.nama_barang}</span>}
                </div>
                <div className="mb-4">
                    <label className="block">Kategori</label>
                    <input type="text" value={data.kategori || ''} onChange={(e) => setData('kategori', e.target.value)} className="border p-2 w-full" />
                    {errors.kategori && <span className="text-red-500">{errors.kategori}</span>}
                </div>
                <div className="mb-4">
                    <label className="block">Deskripsi</label>
                    <input type="text" value={data.deskripsi || ''} onChange={(e) => setData('deskripsi', e.target.value)} className="border p-2 w-full" />
                    {errors.deskripsi && <span className="text-red-500">{errors.deskripsi}</span>}
                </div>
                <div className="mb-4">
                    <label className="block">Status</label>
                    <select value={data.status || ''} onChange={(e) => setData('status', e.target.value)} className="border p-2 w-full">
                        <option value="">Pilih Status</option>
                        <option value="tersedia">Tersedia</option>
                        <option value="tidak tersedia">Tidak Tersedia</option>
                    </select>
                    {errors.status && <span className="text-red-500">{errors.status}</span>}
                </div>
                <div className="mb-4">
                    <label className="block">Lokasi Barang</label>
                    <input type="text" value={data.lokasi_barang || ''} onChange={(e) => setData('lokasi_barang', e.target.value)} className="border p-2 w-full" />
                    {errors.lokasi_barang && <span className="text-red-500">{errors.lokasi_barang}</span>}
                </div>
                <div className="mb-4">
                    <label className="block">Status Aktif</label>
                    <select value={String(data.is_active)} onChange={(e) => setData('is_active', Number(e.target.value))} className="border p-2 w-full">
                        <option value="1">Aktif</option>
                        <option value="0">Nonaktif</option>
                    </select>
                    {errors.is_active && <span className="text-red-500">{errors.is_active}</span>}
                </div>
                <ButtonTextedStyle text='Submit' disabled={processing} type='submit'/>
            </form>
        </div>
        </Adminlayout>
    );
}

