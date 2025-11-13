 import React, { useState } from 'react';
import { usePage, router, Link } from '@inertiajs/react';
import Adminlayout from '@/Layouts/Adminlayout';
import Emoicon from '@/Components/Emoicon';
import { ChevronDown, Plus, Search } from 'lucide-react';
import AddButton from '@/Components/AddButton';
import FilterButton from '@/Components/FilterButton';
import FilterOption from '@/Components/FilterOption';
import ModalDelete from '@/Components/ModalDelete';

export default function Index() {
    const { inventories, flash, filters, kategoriList } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const [selectedInventoryId, setSelectedInventoryId] = useState(null);
    const [search, setSearch] = useState(filters?.search || '');

    const handleDeleteClick = (id) => {
        setSelectedInventoryId(id);
        setShowModal(true);
    };

    const confirmDelete = () => {
        if (selectedInventoryId) {
            router.delete(`/dashboard/inventories/${selectedInventoryId}`, {
                onSuccess: () => {
                    setShowModal(false);
                    router.reload({ only: ['inventories'] });
                },
            });
        }
    };

    const cancelDelete = () => {
        setShowModal(false);
        setSelectedInventoryId(null);
    };

    const onSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        router.get(
            '/dashboard/inventories',
            { search: value, status: filters?.status || '', kategori: filters?.kategori || '' },
            { preserveState: true, preserveScroll: true, replace: true }
        );
    };

    const applyStatusFilter = (value) => {
        router.get(
            '/dashboard/inventories',
            { search, status: value, kategori: filters?.kategori || '' },
            { preserveState: true, preserveScroll: true, replace: true }
        );
    };

    const applyKategoriFilter = (value) => {
        router.get(
            '/dashboard/inventories',
            { search, status: filters?.status || '', kategori: value },
            { preserveState: true, preserveScroll: true, replace: true }
        );
    };

    // Pagination (supports server paginator and client fallback)
    const [page, setPage] = useState(1);
    const perPage = 10;
    const isServer = inventories && typeof inventories === 'object' && Array.isArray(inventories.data);
    const total = isServer ? inventories.total : (Array.isArray(inventories) ? inventories.length : 0);
    const lastPage = isServer ? inventories.last_page : Math.max(1, Math.ceil(total / perPage));
    const currentPage = isServer ? inventories.current_page : page;
    const from = isServer ? inventories.from : (total ? (currentPage - 1) * perPage + 1 : 0);
    const to = isServer ? inventories.to : Math.min(currentPage * perPage, total);
    const data = isServer
        ? inventories.data
        : (Array.isArray(inventories) ? inventories.slice((currentPage - 1) * perPage, (currentPage - 1) * perPage + perPage) : []);

    const goto = (p) => setPage(Math.max(1, Math.min(lastPage, p)));

    return (
        <Adminlayout>
        <div className="container font-GenSan">
            <h1 className="text-4xl text-white font-bold uppercase">Daftar Inventory</h1>
            <p className='mb-3 text-text-color-light'>Ini adalah tabel yang menampilkan semua data inventory</p>
            <AddButton type='inventories'/>
            {flash?.message && <div className="bg-green-100 p-2 mb-4">{flash.message}</div>}
            <div id="tabel-wrapper">
                <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
                    <div class="relative flex-grow min-w-48 max-w-sm">
                        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Search size={20} />
                        </span>
                        <input
                            class="w-full pl-10 pr-4 py-2 text-sm bg-gray-900/50 border border-gray-800/50 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                            placeholder="Search inventories..."
                            type="text"
                            value={search}
                            onChange={onSearchChange}
                        />
                    </div>
                    <div class="flex items-center flex-wrap gap-2">
                        <div class="relative group">
                            <FilterButton>
                                Kategori
                                <span class="span group-hover:rotate-180 transition-transform duration-200">
                                    <ChevronDown />
                                </span>
                            </FilterButton>
                            <div class="absolute right-0 sm:left-0 mt-1 w-48 bg-gray-800 border border-gray-700 rounded-sm shadow-xl overflow-hidden hidden group-hover:block z-10">
                                {Array.isArray(kategoriList) && kategoriList.length > 0 ? (
                                    kategoriList.map((k) => (
                                        <a
                                            key={k}
                                            class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                                            href="#"
                                            onClick={(e)=>{e.preventDefault(); applyKategoriFilter(k);}}
                                        >
                                            {k}
                                        </a>
                                    ))
                                ) : (
                                    <FilterOption jenis="Semua" />
                                )}
                            </div>
                        </div>
                        <div class="relative group">
                            <FilterButton>
                                Status
                                <span class="span group-hover:rotate-180 transition-transform duration-200">
                                    <ChevronDown />
                                </span>
                            </FilterButton>
                            <div class="absolute right-0 sm:left-0 mt-1 w-32 bg-gray-800 border border-gray-700 rounded-lg shadow-xl overflow-hidden hidden group-hover:block z-10">
                                <a
                                    class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                                    href="#"
                                    onClick={(e)=>{e.preventDefault(); applyStatusFilter('active');}}
                                >
                                    Aktif
                                </a>
                                <a
                                    class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                                    href="#"
                                    onClick={(e)=>{e.preventDefault(); applyStatusFilter('inactive');}}
                                >
                                    Non-Aktif
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='table-container' className="overflow-x-auto w-full h-full border-t border-r border-l border-border-color rounded-t-2xl">
                    <table className="min-w-full bg-darkui table-fixed text-text-color-light">
                        <thead>
                            <tr className=" border-text-color-light [&_th]:font-normal">
                                <th className="p-4">Kode Barang</th>
                                <th className="p-4">Nama Barang</th>
                                <th className="p-4">Kategori</th>
                                <th className="p-4">Deskripsi</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Lokasi Barang</th>
                                <th className="p-4">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length === 0 ? (
                                <tr><td colSpan="7" className="text-center p-2">Tidak ada data inventory.</td></tr>
                            ) : (
                                data.map((inventory) => (
                                    <tr key={inventory.id} className="text-center">
                                        <td>{inventory.kode_barang}</td>
                                        <td>{inventory.nama_barang}</td>
                                        <td>{inventory.kategori || '-'}</td>
                                        <td>{inventory.deskripsi || '-'}</td>
                                        <td>{inventory.status || '-'}</td>
                                        <td>{inventory.lokasi_barang || '-'}</td>
                                        <td className=" p-2 flex gap-1 px-4 text-xl justify-center">
                                            <a href={`/dashboard/inventories/${inventory.id}`} className="text-blue-500">
                                                <div className="w-[clamp(1.5rem,5vw+1rem,2rem)] h-[clamp(1.5rem,5vw+1rem,2rem)] p-1 rounded-md bg-blue-200">
                                                    <Emoicon name="eye"/>
                                                </div>
                                            </a>
                                            <a href={`/dashboard/inventories/${inventory.id}/edit`} className="text-blue-500 ml-2">
                                                <div className="w-[clamp(1.5rem,5vw+1rem,2rem)] h-[clamp(1.5rem,5vw+1rem,2rem)] p-1 rounded-md bg-yellow-200">
                                                    <Emoicon name="pencil"/>
                                                </div>
                                            </a>
                                            <button onClick={() => handleDeleteClick(inventory.id)} className="text-red-500 ml-2 cursor-pointer">
                                                <div className="w-[clamp(1.5rem,5vw+1rem,2rem)] h-[clamp(1.5rem,5vw+1rem,2rem)] bg-red-200 p-1 rounded-md">
                                                    <Emoicon name="wastebasket"/>
                                                </div>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <nav
                    aria-label="Table navigation"
                    className="flex items-center justify-between p-4 border-b border-r border-l border-border-color rounded-b-2xl bg-darkui"
                >
                    <span className="text-sm font-normal text-text-color-light">
                        Showing <span className="font-semibold text-white">{from}</span>–<span className="font-semibold text-white">{to}</span> of{' '}
                        <span className="font-semibold text-white">{total}</span>
                    </span>

                    {isServer ? (
                        <ul className="inline-flex items-center -space-x-px">
                            {inventories.links.map((link, idx) => (
                                <li key={idx}>
                                    {link.url ? (
                                        <Link
                                            href={link.url}
                                            preserveScroll
                                            preserveState
                                            className={[
                                                'px-3 py-2 leading-tight border',
                                                link.active
                                                    ? 'z-10 text-white bg-blue-600/30 border-blue-500 hover:bg-blue-600/40'
                                                    : 'text-text-color-light bg-gray-900/50 border-gray-700/50 hover:bg-gray-800/70 hover:text-white',
                                                idx === 0 ? 'rounded-l-lg ml-0' : '',
                                                idx === inventories.links.length - 1 ? 'rounded-r-lg' : '',
                                            ].join(' ')}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <span
                                            className={[
                                                'px-3 py-2 leading-tight border text-gray-400 bg-gray-900/50 border-gray-700/50',
                                                idx === 0 ? 'rounded-l-lg ml-0' : '',
                                                idx === inventories.links.length - 1 ? 'rounded-r-lg' : '',
                                            ].join(' ')}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <ul className="inline-flex items-center -space-x-px">
                            <li>
                                <button
                                    onClick={() => goto(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={[
                                        'px-3 py-2 ml-0 leading-tight border rounded-l-lg',
                                        currentPage === 1
                                            ? 'text-gray-400 bg-gray-900/50 border-gray-700/50'
                                            : 'text-text-color-light bg-gray-900/50 border-gray-700/50 hover:bg-gray-800/70 hover:text-white',
                                    ].join(' ')}
                                >
                                    Previous
                                </button>
                            </li>

                            {Array.from({ length: lastPage }, (_, i) => i + 1).map((n) => (
                                <li key={n}>
                                    <button
                                        onClick={() => goto(n)}
                                        className={[
                                            'px-3 py-2 leading-tight border',
                                            n === currentPage
                                                ? 'z-10 text-white bg-blue-600/30 border-blue-500 hover:bg-blue-600/40'
                                                : 'text-text-color-light bg-gray-900/50 border-gray-700/50 hover:bg-gray-800/70 hover:text-white',
                                        ].join(' ')}
                                    >
                                        {n}
                                    </button>
                                </li>
                            ))}

                            <li>
                                <button
                                    onClick={() => goto(currentPage + 1)}
                                    disabled={currentPage === lastPage}
                                    className={[
                                        'px-3 py-2 leading-tight border rounded-r-lg',
                                        currentPage === lastPage
                                            ? 'text-gray-400 bg-gray-900/50 border-gray-700/50'
                                            : 'text-text-color-light bg-gray-900/50 border-gray-700/50 hover:bg-gray-800/70 hover:text-white',
                                    ].join(' ')}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    )}
                </nav>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={cancelDelete}>
                    <ModalDelete>
                        <h2 className="text-xl md:text-2xl font-bold mb-4 uppercase">Konfirmasi Hapus</h2>
                        <p>Apakah Anda yakin ingin menghapus inventory ini?</p>
                        <div className="mt-6  gap-4 flex">
                            <button onClick={cancelDelete} className="bg-white hover:bg-gray-200 text-gray-700 p-2 rounded-md cursor-pointer">Cancel</button>
                            <button onClick={confirmDelete} className="bg-neutral-800 hover:bg-neutral-900 text-white p-2 rounded-md cursor-pointer">Confirm Delete</button>
                        </div>
                    </ModalDelete>
                </div>
            )}
        </div>
        </Adminlayout>
    );
  }

