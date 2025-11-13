import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import Adminlayout from '@/Layouts/Adminlayout';
import ButtonTextedStyle from '@/Components/ButtonTextedStyle';

export default function Edit() {
    
    const { teacher } = usePage().props;
    const { data, setData, put, processing, errors } = useForm({
        id: '',
        nip: '',
        nama_lengkap: '',
        jabatan: '',
        alamat: '',
        no_hp: '',
        email: '',
        is_active: 1,
    });

    useEffect(() => {
        if (teacher) {
            setData({
                id: teacher.id || '',
                nip: teacher.nip || '',
                nama_lengkap: teacher.nama_lengkap || '',
                jabatan: teacher.jabatan || '',
                alamat: teacher.alamat || '',
                no_hp: teacher.no_hp || '',
                email: teacher.email || '',
                is_active: teacher.is_active ?? 1,
            });
        }
    }, [teacher]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/dashboard/teachers/${teacher?.id}`);
    };

    return (
        <Adminlayout>
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 uppercase">Edit Guru</h1>
            <form onSubmit={handleSubmit} className="[&_input]:rounded-lg [&_input]:border-border-color [&_select]:border-border-color">
                <div className="mb-4">
                    <label className="block">ID</label>
                    <input type="text" value={data.id || ''} onChange={(e) => setData('id', e.target.value)} className="border p-2 w-full" />
                    {errors.id && <span className="text-red-500">{errors.id?.message}</span>}
                </div>

                <div className="mb-4">
                    <label className="block">NIP</label>
                    <input type="text" value={data.nip || ''} onChange={(e) => setData('nip', e.target.value)} className="border p-2 w-full" />
                    {errors.nip && <span className="text-red-500">{errors.nip?.message}</span>}
                </div>

                <div className="mb-4">
                    <label className="block">Nama Lengkap</label>
                    <input type="text" value={data.nama_lengkap || ''} onChange={(e) => setData('nama_lengkap', e.target.value)} className="border p-2 w-full" />
                    {errors.nama_lengkap && <span className="text-red-500">{errors.nama_lengkap?.message}</span>}
                </div>

                <div className="mb-4">
                    <label className="block">Jabatan</label>
                    <input type="text" value={data.jabatan || ''} onChange={(e) => setData('jabatan', e.target.value)} className="border p-2 w-full" />
                    {errors.jabatan && <span className="text-red-500">{errors.jabatan?.message}</span>}
                </div>

                <div className="mb-4">
                    <label className="block">Alamat</label>
                    <input type="text" value={data.alamat || ''} onChange={(e) => setData('alamat', e.target.value)} className="border p-2 w-full" />
                    {errors.alamat && <span className="text-red-500">{errors.alamat?.message}</span>}
                </div>

                <div className="mb-4">
                    <label className="block">No HP</label>
                    <input type="text" value={data.no_hp || ''} onChange={(e) => setData('no_hp', e.target.value)} className="border p-2 w-full" />
                    {errors.no_hp && <span className="text-red-500">{errors.no_hp?.message}</span>}
                </div>

                <div className="mb-4">
                    <label className="block">Email</label>
                    <input type="email" value={data.email || ''} onChange={(e) => setData('email', e.target.value)} className="border p-2 w-full" />
                    {errors.email && <span className="text-red-500">{errors.email?.message}</span>}
                </div>

                <div className="mb-4">
                    <label className="block">Status</label>
                    <select value={String(data.is_active)} onChange={(e) => setData('is_active', Number(e.target.value))} className="border p-2 w-full">
                        <option value="1"> Aktif</option>
                        <option value="0"> Nonaktif</option>
                    </select>
                </div>

                <ButtonTextedStyle type="submit" disabled={processing} text='Update'/>
                    </form>
                </div>
                </Adminlayout>
            );
        }
