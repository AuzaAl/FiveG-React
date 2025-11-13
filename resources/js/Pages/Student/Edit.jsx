import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import Adminlayout from '@/Layouts/Adminlayout';
import ButtonTextedStyle from '@/Components/ButtonTextedStyle';

export default function Edit() {
    
    const { student } = usePage().props;
    const { data, setData, put, processing, errors } = useForm({
        nisn: '',
        nama_lengkap: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        alamat: '',
        jurusan: '',
        angkatan: '',
        no_hp: '',
        email: '',
        added_by: '',
        is_active: 1,
    });

    console.log(student);

    // Sinkronkan data dari props student ke state saat komponen dimuat
    useEffect(() => {
        if (student) {
            setData({
                nisn: student.nisn || '',
                nama_lengkap: student.nama_lengkap || '',
                tempat_lahir: student.tempat_lahir || '',
                tanggal_lahir: student.tanggal_lahir || '',
                alamat: student.alamat || '',
                jurusan: student.jurusan || '',
                angkatan: student.angkatan || '',
                no_hp: student.no_hp || '',
                email: student.email || '',
                added_by: student.added_by || '',
                is_active: student.is_active ?? 1,
            });
        }
    }, [student]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/dashboard/students/${student?.id}`);
    };

    return (
        <Adminlayout>
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 uppercase">Edit Siswa</h1>
            <form onSubmit={handleSubmit} className='[&_input]:border-border-color [&_input]:rounded-lg'>
                <div className="mb-4">
                <label className="block">NISN</label>
                <input type="text" value={data.nisn || ''} onChange={(e) => setData('nisn', e.target.value)} className="border p-2 w-full" />
                {errors.nisn && <span className="text-red-500">{errors.nisn}</span>}
            </div>

            <div className="mb-4">
                <label className="block">Nama Lengkap</label>
                <input type="text" value={data.nama_lengkap || ''} onChange={(e) => setData('nama_lengkap', e.target.value)} className="border p-2 w-full" />
                {errors.nama_lengkap && <span className="text-red-500">{errors.nama_lengkap}</span>}
            </div>

            <div className="mb-4">
                <label className="block">Tempat Lahir</label>
                <input type="text" value={data.tempat_lahir || ''} onChange={(e) => setData('tempat_lahir', e.target.value)} className="border p-2 w-full" />
                {errors.tempat_lahir && <span className="text-red-500">{errors.tempat_lahir}</span>}
            </div>

            <div className="mb-4">
                <label className="block">Tanggal Lahir</label>
                <input type="date" value={data.tanggal_lahir || ''} onChange={(e) => setData('tanggal_lahir', e.target.value)} className="border p-2 w-full" />
                {errors.tanggal_lahir && <span className="text-red-500">{errors.tanggal_lahir}</span>}
            </div>

            <div className="mb-4">
                <label className="block">Alamat</label>
                <input type="text" value={data.alamat || ''} onChange={(e) => setData('alamat', e.target.value)} className="border p-2 w-full" />
                {errors.alamat && <span className="text-red-500">{errors.alamat}</span>}
            </div>

            <div className="mb-4">
                <label className="block">Jurusan</label>
                <input type="text" value={data.jurusan || ''} onChange={(e) => setData('jurusan', e.target.value)} className="border p-2 w-full" />
                {errors.jurusan && <span className="text-red-500">{errors.jurusan}</span>}
            </div>

            <div className="mb-4">
                <label className="block">Angkatan</label>
                <input type="text" value={data.angkatan || ''} onChange={(e) => setData('angkatan', e.target.value)} className="border p-2 w-full" />
                {errors.angkatan && <span className="text-red-500">{errors.angkatan}</span>}
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
                <label className="block">added by</label>
                <input type="text" value={data.added_by || ''} onChange={(e) => setData('added_by', e.target.value)} className="border p-2 w-full" />
                {errors.added_by && <span className="text-red-500">{errors.added_by}</span>}
            </div>
                <ButtonTextedStyle type="submit" disabled={processing} text='Update'/>
            </form>
        </div>
        </Adminlayout>
    );
}