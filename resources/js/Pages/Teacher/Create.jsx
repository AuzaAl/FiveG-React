import React from 'react';
import { useForm } from '@inertiajs/react';
import Adminlayout from '@/Layouts/Adminlayout';
import ButtonTextedStyle from '@/Components/ButtonTextedStyle';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        id: '',
        nip: '',
        nama_lengkap: '',
        jabatan: '',
        alamat: '',
        no_hp: '',
        email: '',
        is_active: 1,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/dashboard/teachers');
    };

    return (
        <Adminlayout>
        <div className="container mx-auto p- font-GenSan">
            <h1 className="text-2xl font-bold mb-4 uppercase">Tambah Guru</h1>
            <form onSubmit={handleSubmit} className="[&_input]:rounded-lg [&_input]:border-border-color [&_select]:border-border-color">
                <div className="mb-4">
                    <label className="block">NIP</label>
                    <input type="text" value={data.nip || ''} onChange={(e) => setData('nip', e.target.value)} className="border p-2 w-full" />
                    {errors.nip && <span className="text-red-500">{errors.nip}</span>}
                </div>
                <div className="mb-4">
                    <label className="block">Nama Lengkap</label>
                    <input type="text" value={data.nama_lengkap || ''} onChange={(e) => setData('nama_lengkap', e.target.value)} className="border p-2 w-full" />
                    {errors.nama_lengkap && <span className="text-red-500">{errors.nama_lengkap}</span>}
                </div>
                <div className="mb-4">
                    <label className="block">Jabatan</label>
                    <input type="text" value={data.jabatan || ''} onChange={(e) => setData('jabatan', e.target.value)} className="border p-2 w-full" />
                    {errors.jabatan && <span className="text-red-500">{errors.jabatan}</span>}
                </div>
                <div className="mb-4">
                    <label className="block">Alamat</label>
                    <input type="text" value={data.alamat || ''} onChange={(e) => setData('alamat', e.target.value)} className="border p-2 w-full" />
                    {errors.alamat && <span className="text-red-500">{errors.alamat}</span>}
                </div>
                <div className="mb-4">
                    <label className="block">No HP</label>
                    <input type="text" value={data.no_hp || ''} onChange={(e) => setData('no_hp', e.target.value)} className="border p-2 w-full" />
                    {errors.no_hp && <span className="text-red-500">{errors.no_hp}</span>}
                </div>
                <div className="mb-4">
                    <label className="block">Email</label>
                    <input type="email" value={data.email || ''} onChange={(e) => setData('email', e.target.value)} className="border p-2 w-full" />
                    {errors.email && <span className="text-red-500">{errors.email}</span>}
                </div>
                <div className="mb-4">
                    <label className="block">Status</label>
                    <select value={String(data.is_active)} onChange={(e) => setData('is_active', Number(e.target.value))} className="border p-2 w-full">
                        <option value="1"> Aktif</option>
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