import React from 'react';
import { usePage } from '@inertiajs/react';

export default function Index() {
    const { inventories, flash } = usePage().props;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Daftar Inventory</h1>
            {flash?.message && <div className="bg-green-100 p-2 mb-4">{flash.message}</div>}
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Kode Barang</th>
                        <th className="border p-2">Nama Barang</th>
                        <th className="border p-2">Kategori</th>
                        <th className="border p-2">Deskripsi</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Lokasi Barang</th>
                        <th className="border p-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {inventories.map((inventory) => (
                        <tr key={inventory.id} className="text-center">
                            <td className="border p-2">{inventory.id}</td>
                            <td className="border p-2">{inventory.kode_barang}</td>
                            <td className="border p-2">{inventory.nama_barang}</td>
                            <td className="border p-2">{inventory.kategori}</td>
                            <td className="border p-2">{inventory.deskripsi}</td>
                            <td className="border p-2">{inventory.status}</td>
                            <td className="border p-2">{inventory.lokasi_barang}</td>
                            <td className="border p-2">
                                <a href={`/inventories/${inventory.id}/edit`} className="text-blue-500">Edit</a>
                                <form action={`/inventories/${inventory.id}`} method="POST" className="inline">
                                    <input type="hidden" name="_method" value="DELETE" />
                                    <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').content} />
                                    <button type="submit" className="text-red-500">Hapus</button>
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <a href="/inventories/create" className="mt-4 inline-block bg-blue-500 text-white p-2">Tambah Inventory</a>
        </div>
    );
}
