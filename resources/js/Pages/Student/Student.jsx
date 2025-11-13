import React from 'react';
import { usePage } from '@inertiajs/react';

export default function Index() {
    const { students, flash } = usePage().props;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Daftar Siswa</h1>
            {flash?.message && <div className="bg-green-100 p-2 mb-4">{flash.message}</div>}
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Nama</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Kelas</th>
                        <th className="border p-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id} className="text-center">
                            <td className="border p-2">{student.id}</td>
                            <td className="border p-2">{student.name}</td>
                            <td className="border p-2">{student.email}</td>
                            <td className="border p-2">{student.class}</td>
                            <td className="border p-2">
                                <a href={`/students/${student.id}/edit`} className="text-blue-500">Edit</a>
                                <form action={`/students/${student.id}`} method="POST" className="inline">
                                    <input type="hidden" name="_method" value="DELETE" />
                                    <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').content} />
                                    <button type="submit" className="text-red-500">Hapus</button>
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <a href="/students/create" className="mt-4 inline-block bg-blue-500 text-white p-2">Tambah Siswa</a>
        </div>
    );
}