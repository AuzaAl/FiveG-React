import AddButton from '@/Components/AddButton';
import Emoicon from '@/Components/Emoicon';
import FilterButton from '@/Components/FilterButton';
import FilterOption from '@/Components/FilterOption';
import ModalDelete from '@/Components/ModalDelete';
import Adminlayout from '@/Layouts/Adminlayout';
import { Link, usePage, router } from '@inertiajs/react';
import { ChevronDown, Search } from 'lucide-react';
import React, { useState } from 'react'

export default function Index() {
  const { Categories, flash, filters } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [search, setSearch] = useState(filters?.search || "");

    const onSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        router.get(
            "/dashboard/categories",
            { search: value },
            { preserveState: true, preserveScroll: true, replace: true }
        );
    };

    const handleDeleteClick = (id) => {
        setSelectedCategoryId(id);
        setShowModal(true);
    };

    const confirmDelete = () => {
        if (selectedCategoryId) {
            router.delete(`/dashboard/categories/${selectedCategoryId}`, {
                onSuccess: () => {
                    setShowModal(false);
                    router.reload({ only: ["Categories"] });
                },
            });
        }
    };

    const cancelDelete = () => {
        setShowModal(false);
        setSelectedCategoryId(null);
    };

    const applyStatusFilter = (value) => {
        router.get(
            "/dashboard/categories",
            { search, status: value },
            { preserveState: true, preserveScroll: true, replace: true }
        );
    };

    return (
        <Adminlayout>
            <div className="container font-GenSan">
                <h1 className="text-4xl text-white font-bold uppercase">
                    Daftar categories
                </h1>
                <p className="mb-3 text-text-color-light">
                    Ini adalah tabel yang menampilkan semua data categories
                </p>
                <AddButton type="Categories" />

                {flash?.message && (
                    <div className="bg-green-100 p-2 mb-4">{flash.message}</div>
                )}
                <div id="tabel-wrapper">
                    <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
                        <div class="relative flex-grow min-w-48 max-w-sm">
                            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <Search size={20} />
                            </span>
                            <input
                                class="w-full pl-10 pr-4 py-2 text-sm bg-gray-900/50 border border-gray-800/50 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                                placeholder="Search Categories..."
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
                                    <FilterOption />
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
                    <div
                        id="table-container"
                        className="overflow-x-auto w-full h-full border-t border-r border-l border-border-color rounded-t-2xl"
                    >
                        <table className="min-w-full bg-darkui table-fixed text-text-color-light">
                            <thead>
                                <tr className=" border-text-color-light [&_th]:font-normal">
                                    <th className="p-4">NIP</th>
                                    <th className="p-4">Nama Lengkap</th>
                                    <th className="p-4">Jabatan</th>
                                    <th className="p-4">Alamat</th>
                                    <th className="p-4">No HP</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Categories.data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="8"
                                            className="text-center p-2"
                                        >
                                            Tidak ada data categori.
                                        </td>
                                    </tr>
                                ) : (
                                    Categories.data.map((Category) => (
                                        <tr
                                            key={Category.id}
                                            className="text-center"
                                        >
                                            <td>{Category.nip}</td>
                                            <td>{Category.nama_lengkap}</td>
                                            <td>{Category.jabatan || "-"}</td>
                                            <td>{Category.alamat || "-"}</td>
                                            <td>{Category.no_hp || "-"}</td>
                                            <td>{Category.email || "-"}</td>
                                            <td>
                                                {Category.is_active
                                                    ? "Aktif"
                                                    : "Nonaktif"}
                                            </td>
                                            <td className=" p-2 flex gap-1 px-4 text-xl justify-center">
                                                <a
                                                    href={`/dashboard/categories/${Category.id}`}
                                                    className="text-blue-500"
                                                >
                                                    <div className="w-[clamp(1.5rem,5vw+1rem,2rem)] h-[clamp(1.5rem,5vw+1rem,2rem)] p-1 rounded-md bg-blue-200">
                                                        <Emoicon name="eye" />
                                                    </div>
                                                </a>
                                                <a
                                                    href={`/dashboard/categories/${Category.id}/edit`}
                                                    className="text-blue-500 ml-2"
                                                >
                                                    <div className="w-[clamp(1.5rem,5vw+1rem,2rem)] h-[clamp(1.5rem,5vw+1rem,2rem)] p-1 rounded-md bg-yellow-200">
                                                        <Emoicon name="pencil" />
                                                    </div>
                                                </a>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteClick(
                                                            Category.id
                                                        )
                                                    }
                                                    className="text-red-500 ml-2 cursor-pointer"
                                                >
                                                    <div className="w-[clamp(1.5rem,5vw+1rem,2rem)] h-[clamp(1.5rem,5vw+1rem,2rem)] bg-red-200 p-1 rounded-md">
                                                        <Emoicon name="wastebasket" />
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
                            Showing{" "}
                            <span className="font-semibold text-white">
                                {Categories.from}
                            </span>
                            –
                            <span className="font-semibold text-white">
                                {Categories.to}
                            </span>{" "}
                            of{" "}
                            <span className="font-semibold text-white">
                                {Categories.total}
                            </span>
                        </span>

                        <ul className="inline-flex items-center -space-x-px">
                            {Categories.links.map((link, idx) => (
                                <li key={idx}>
                                    {link.url ? (
                                        <Link
                                            href={link.url}
                                            preserveScroll
                                            preserveState
                                            as="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                router.get(
                                                    link.url,
                                                    {},
                                                    {
                                                        preserveScroll: true,
                                                        preserveState: true,
                                                        replace: true,
                                                    }
                                                );
                                            }}
                                            className={[
                                                "px-3 py-2 leading-tight border",
                                                link.active
                                                    ? "z-10 text-white bg-blue-600/30 border-blue-500 hover:bg-blue-600/40"
                                                    : "text-text-color-light bg-gray-900/50 border-gray-700/50 hover:bg-gray-800/70 hover:text-white",
                                                idx === 0
                                                    ? "rounded-l-lg ml-0"
                                                    : "",
                                                idx ===
                                                Categories.links.length - 1
                                                    ? "rounded-r-lg"
                                                    : "",
                                            ].join(" ")}
                                              dangerouslySetInnerHTML={{
                                                  __html: link.label,
                                              }}
                                          />
                                      ) : (
                                          <span
                                              className={[
                                                  "px-3 py-2 leading-tight border text-gray-400 bg-gray-900/50 border-gray-700/50",
                                                  idx === 0
                                                      ? "rounded-l-lg ml-0"
                                                      : "",
                                                  idx ===
                                                  Categories.links.length - 1
                                                      ? "rounded-r-lg"
                                                      : "",
                                              ].join(" ")}
                                              dangerouslySetInnerHTML={{
                                                  __html: link.label,
                                              }}
                                          />
                                      )}
                                  </li>
                              ))}
                          </ul>
                      </nav>
                  </div>

                {showModal && (
                    <div
                        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                        onClick={cancelDelete}
                    >
                        <ModalDelete>
                            <h2 className="text-xl md:text-2xl font-bold mb-4 uppercase">
                                Konfirmasi Hapus
                            </h2>
                            <p>Apakah Anda yakin ingin menghapus categories ini?</p>
                            <div className="mt-6  gap-4 flex">
                                <button
                                    onClick={cancelDelete}
                                    className="bg-white hover:bg-gray-200 text-gray-700 p-2 rounded-md cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="bg-neutral-800 hover:bg-neutral-900 text-white p-2 rounded-md cursor-pointer"
                                >
                                    Confirm Delete
                                </button>
                            </div>
                        </ModalDelete>
                    </div>
                )}
            </div>
        </Adminlayout>
    );
}
