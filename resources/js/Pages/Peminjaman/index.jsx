import { ArrowBigDown, CheckCheckIcon, CheckCircle } from "lucide-react";
import React, { useState } from "react";

export default function Index() {
    const [borrowerType, setBorrowerType] = useState("Siswa");
    const [nisnInput, setNisnInput] = useState("");
    const [borrower, setBorrower] = useState({
        found: false,
        nama: "",
        nisn: "",
        verified: false,
    });

    const [kodeInput, setKodeInput] = useState("");
    const [item, setItem] = useState({
        found: false,
        nama_barang: "",
        kode_barang: "",
        kategori: "",
        status: "",
        verified: false,
    });

    const [borrowDatetime, setBorrowDatetime] = useState("");
    const [returnDatetime, setReturnDatetime] = useState("");
    const [notes, setNotes] = useState("");

    const handleCheckNisn = async () => {
        if (!nisnInput) {
            setBorrower({ found: false, nama: "", nisn: "", verified: false });
            return;
        }
        try {
            const res = await fetch(`/api/students/by-nisn/${encodeURIComponent(nisnInput)}`);
            if (!res.ok) throw new Error("notfound");
            const data = await res.json();
            setBorrower({
                found: true,
                nama: data.nama_lengkap,
                nisn: data.nisn,
                verified: true,
            });
        } catch (e) {
            setBorrower({ found: false, nama: "", nisn: "", verified: false });
        }
    };

    const handleCheckKode = async () => {
        if (!kodeInput) {
            setItem({ found: false, nama_barang: "", kode_barang: "", kategori: "", status: "", verified: false });
            return;
        }
        try {
            const res = await fetch(`/api/inventories/by-kode/${encodeURIComponent(kodeInput)}`);
            if (!res.ok) throw new Error("notfound");
            const data = await res.json();
            setItem({
                found: true,
                nama_barang: data.nama_barang,
                kode_barang: data.kode_barang,
                kategori: data.kategori,
                status: data.status || "Tersedia",
                verified: true,
            });
        } catch (e) {
            setItem({ found: false, nama_barang: "", kode_barang: "", kategori: "", status: "", verified: false });
        }
    };

    return (
        <main className="bg-background-light dark:bg-background-dark font-GenSan text-text-light dark:text-text-dark antialiased">
            <div className="relative min-h-screen bg-lab-equipment bg-black bg-opacity-70 flex flex-col items-center justify-start p-4 sm:p-6 lg:p-8">
                <div className="absolute inset-0 bg-black opacity-80 backdrop-blur-md"></div>
                <header className="relative z-10 text-center mb-10 mt-8">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight uppercase">
                        Verification Dashboard
                    </h1>
                    <p className="text-text-secondary-dark mt-3 text-lg sm:text-xl font-medium">
                        Verifikasi Detail Peminjaman &amp; Barang Lab
                    </p>
                </header>
                <div className="relative z-10 w-full max-w-7xl bg-card-dark rounded-2xl shadow-xl p-6 lg:p-10 flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/2 space-y-8">
                        <form className="space-y-6">
                            <div className="space-y-2">
                                <label
                                    className="block text-sm font-medium text-text-secondary-dark"
                                    htmlFor="borrower-type"
                                >
                                    Jenis Peminjam
                                </label>
                                <div className="relative">
                                    <select
                                        className="w-full pl-4 pr-10 py-3 bg-field-dark border border-border-dark rounded-lg focus:ring-2 focus:ring-[#0a84ff] focus:border-[#0a84ff] transition duration-200"
                                        id="borrower-type"
                                        name="borrower-type"
                                        value={borrowerType}
                                        onChange={(e) => setBorrowerType(e.target.value)}
                                    >
                                        <option>Siswa</option>
                                        <option>Guru</option>
                                        <option>Staff</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label
                                    className="block text-sm font-medium text-text-secondary-dark"
                                    htmlFor="borrower-id"
                                >
                                    ID Peminjam
                                </label>
                                <div className="flex items-center space-x-3">
                                    <input
                                        className="flex-grow w-full px-4 py-3 bg-field-dark border border-border-dark rounded-lg focus:ring-2 focus:ring-[#0a84ff] focus:border-[#0a84ff] transition duration-200"
                                        id="borrower-id"
                                        name="borrower-id"
                                        placeholder="Masukkan NISN"
                                        type="text"
                                        value={nisnInput}
                                        onChange={(e) => setNisnInput(e.target.value)}
                                    />
                                    <button
                                        className="cursor-pointer px-5 py-3 bg-[#0a84ff] text-white font-semibold rounded-lg hover:bg-opacity-80 transition duration-200 whitespace-nowrap"
                                        type="button"
                                        onClick={handleCheckNisn}
                                    >
                                        Cek NISN
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label
                                    className="block text-sm font-medium text-text-secondary-dark"
                                    htmlFor="item-id"
                                >
                                    Barang yang Dipinjam
                                </label>
                                <div className="flex items-center space-x-3">
                                    <input
                                        className="flex-grow w-full px-4 py-3 bg-field-dark border border-border-dark rounded-lg focus:ring-2 focus:ring-[#0a84ff] focus:border-[#0a84ff] transition duration-200"
                                        id="item-id"
                                        name="item-id"
                                        placeholder="Masukkan Kode Barang"
                                        type="text"
                                        value={kodeInput}
                                        onChange={(e) => setKodeInput(e.target.value)}
                                    />
                                    <button
                                        className="cursor-pointer px-5 py-3 bg-[#0a84ff] text-white font-semibold rounded-lg hover:bg-opacity-80 transition duration-200 whitespace-nowrap"
                                        type="button"
                                        onClick={handleCheckKode}
                                    >
                                        Cek ID Barang
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label
                                        className="block text-sm font-medium text-text-secondary-dark"
                                        htmlFor="borrow-datetime"
                                    >
                                        Tanggal &amp; Waktu Pinjam
                                    </label>
                                    <input
                                        className="w-full px-4 py-3 bg-field-dark border border-border-dark rounded-lg focus:ring-2 focus:ring-[#0a84ff] focus:border-[#0a84ff] transition duration-200"
                                        id="borrow-datetime"
                                        name="borrow-datetime"
                                        type="datetime-local"
                                        value={borrowDatetime}
                                        onChange={(e) => setBorrowDatetime(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label
                                        className="block text-sm font-medium text-text-secondary-dark"
                                        htmlFor="return-datetime"
                                    >
                                        Tanggal &amp; Waktu Kembali
                                    </label>
                                    <input
                                        className="w-full px-4 py-3 bg-field-dark border border-border-dark rounded-lg focus:ring-2 focus:ring-[#0a84ff] focus:border-[#0a84ff] transition duration-200"
                                        id="return-datetime"
                                        name="return-datetime"
                                        type="datetime-local"
                                        value={returnDatetime}
                                        onChange={(e) => setReturnDatetime(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label
                                    className="block text-sm font-medium text-text-secondary-dark"
                                    htmlFor="notes"
                                >
                                    Keterangan
                                </label>
                                <textarea
                                    className="w-full px-4 py-3 bg-field-dark border border-border-dark rounded-lg focus:ring-2 focus:ring-[#0a84ff] focus:border-[#0a84ff] transition duration-200"
                                    id="notes"
                                    name="notes"
                                    placeholder="Contoh: untuk praktikum jaringan"
                                    rows="4"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="flex justify-end items-center space-x-4 pt-4">
                                <button
                                    className=" cursor-pointer px-6 py-2.5 bg-field-dark text-text-dark font-semibold rounded-lg hover:bg-opacity-80 transition duration-200"
                                    type="reset"
                                >
                                    Reset
                                </button>
                                <button
                                    className="cursor-pointer px-6 py-2.5 bg-accent-green text-white font-semibold rounded-lg hover:bg-opacity-80 transition duration-200 flex items-center space-x-2"
                                    type="submit"
                                >
                                    <CheckCircle/>
                                    <span>Verifikasi &amp; Simpan</span>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="lg:w-1/2 space-y-6 lg:border-l lg:border-border-dark lg:pl-8">
                        <h2 className="text-xl font-semibold text-text-dark border-b border-border-dark pb-4">
                            Preview &amp; Verifikasi
                        </h2>
                        <div className="space-y-4">
                            <div className="bg-field-dark rounded-xl p-4 flex items-center space-x-4">
                                <img
                                    alt="Borrower Avatar"
                                    className="w-16 h-16 rounded-full object-cover border-2 border-[#0a84ff]"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAETyG8qMi818bwogsO2UPNNs8TJbHLagPZLYeC3rbHsf6lgeoWtNCKTaUWvKepq0GePSD7iCenrFEfHm9ayZxzXp-lIi53KGV3b1NRINH-dF4Q4YF_wpN5LFqtidTI1BfE_mXU-4_64Uq6RlnO-QkfMIEOyf1CwmkQ2t6QHlFGUsSilOSP4EeKmK_GGyS3TlRZGIYyEiUgPWe8AvbInNpNEGQJkoHfUor8HsMtQmiVGjGsUKNF6gTyYEosSrAsQPibOSezSVGdWq9M"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-text-dark">
                                        Peminjam: {borrower.verified ? borrower.nama : "Tak ditemukan"}
                                    </h3>
                                    <p className="text-text-secondary-dark text-sm">
                                        ID: {borrower.verified ? borrower.nisn : "Tidak valid"}
                                    </p>
                                    <p className="text-text-secondary-dark text-sm">
                                        Jenis: {borrowerType}
                                    </p>
                                    <p className={`${borrower.verified ? "text-accent-green" : "text-red-500"} text-sm font-medium mt-1`}>
                                        Status: {borrower.verified ? "Terverifikasi" : "Tidak Terverifikasi"}
                                    </p>
                                </div>
                            </div>
                            <div className="bg-field-dark rounded-xl p-4 flex items-start space-x-4">
                                <img
                                    alt="Item Image"
                                    className="w-20 h-20 rounded-lg object-cover border border-border-dark"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfnO-MTBJgk7FWGCZJSVrCCt58hc0jPMS__01T0vnxm3hfqP3W7Vppm8cKdUrOHUVc8NsuZYnXPaEtoxb8ZKCf2oDS5Hjv4OJPIbevLsOiOddTHLRkXnT0o3gAXuaOX1z3NeE3j81KAHzp5aNEU4EigHX4F49bCWDplffzyH2cdT0FhkxlSRJ9ypAxXW9Is1PLd5CJj_700Uk2x6t1qK5o-TrHlguaeoD7Way-RUP0eQazXBGcfznFFQONo-9BwcvHk7eJJA2__2HZ"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-text-dark">
                                        Barang: {item.verified ? item.nama_barang : "Tak ditemukan"}
                                    </h3>
                                    <p className="text-text-secondary-dark text-sm">
                                        ID Barang: {item.verified ? item.kode_barang : "Tidak valid"}
                                    </p>
                                    <p className="text-text-secondary-dark text-sm">
                                        Kategori: {item.verified ? item.kategori : "-"}
                                    </p>
                                    <p className={`${item.verified ? "text-accent-green" : "text-red-500"} text-sm font-medium mt-1`}>
                                        Status: {item.verified ? (item.status || "Tersedia") : "Tidak Terverifikasi"}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2 pt-4 border-t border-border-dark">
                            <p className="text-text-secondary-dark text-sm">
                                <strong>Tanggal Pinjam:</strong>{" "}
                                <span className="text-text-dark">{borrowDatetime || ""}</span>
                            </p>
                            <p className="text-text-secondary-dark text-sm">
                                <strong>Tanggal Kembali:</strong>{" "}
                                <span className="text-text-dark">{returnDatetime || ""}</span>
                            </p>
                            <p className="text-text-secondary-dark text-sm">
                                <strong>Keterangan:</strong>{" "}
                                <span className="text-text-dark">{notes || ""}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
