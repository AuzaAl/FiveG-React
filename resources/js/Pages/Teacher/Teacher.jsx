import React from "react";
import { usePage } from "@inertiajs/react";

export default function Index() {
    const { teachers, flash } = usePage().props;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Daftar Guru</h1>
            {flash?.message && (
                <div className="bg-green-100 p-2 mb-4">{flash.message}</div>
            )}
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">NIP</th>
                        <th className="border p-2">Nama Lengkap</th>
                        <th className="border p-2">Jabatan</th>
                        <th className="border p-2">Alamat</th>
                        <th className="border p-2">No HP</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map((teacher) => (
                        <tr key={teacher.id} className="text-center">
                            <td className="border p-2">{teacher.id}</td>
                            <td className="border p-2">{teacher.nip}</td>
                            <td className="border p-2">
                                {teacher.nama_lengkap}
                            </td>
                            <td className="border p-2">{teacher.jabatan}</td>
                            <td className="border p-2">{teacher.alamat}</td>
                            <td className="border p-2">{teacher.no_hp}</td>
                            <td className="border p-2">{teacher.email}</td>
                            <td className="border p-2">
                                {teacher.is_active ? "Aktif" : "Tidak Aktif"}
                            </td>
                            <td className="border p-2">
                                <a
                                    href={`/dashboard/teachers/${teacher.id}/edit`}
                                    className="text-blue-500"
                                >
                                    Edit
                                </a>
                                <form
                                    action={`/dashboard/teachers/${teacher.id}`}
                                    method="POST"
                                    className="inline"
                                >
                                    <input
                                        type="hidden"
                                        name="_method"
                                        value="DELETE"
                                    />
                                    <input
                                        type="hidden"
                                        name="_token"
                                        value={
                                            document.querySelector(
                                                'meta[name="csrf-token"]'
                                            ).content
                                        }
                                    />
                                    <button
                                        type="submit"
                                        className="text-red-500"
                                    >
                                        Hapus
                                    </button>
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <a
                href="/dashboard/teachers/create"
                className="mt-4 inline-block bg-blue-500 text-white p-2"
            >
                Tambah Guru
            </a>
        </div>
    );
}
