import GradientCard from "@/Components/GradientCard";
import Adminlayout from "@/Layouts/Adminlayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import {
    Box,
    BoxesIcon,
    BoxIcon,
    FileClock,
    FileQuestionMark,
    Package,
    PackageOpen,
    User,
} from "lucide-react";
export default function Dashboard() {
    const { studentsCount } = usePage().props

    console.log(studentsCount)
    return (
        <Adminlayout
            header={
                <h2 className="text-3xl font-semibold leading-tight text-white">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <h1 className="text-4xl text-white font-bold uppercase">
                        DASHBOARD
                    </h1>
                    <p className="mb-3 text-text-color-light">
                        Ini adalah halaman dashboard yang menampilkan semua data
                        yang penting untuk administrator
                    </p>
                    <main class="grid grid-cols-4 grid-rows-2 gap-4 mt-5">
                        <div className="col-start-1">
                            <GradientCard color="blue">
                                <div className="flex items-center gap-2">
                                    <User size={30} />{" "}
                                    <p class=" font-medium leading-normal text-xl">
                                        Jumlah Students
                                    </p>
                                </div>
                                <p class=" tracking-light text-2xl font-semibold leading-tight mt-2">
                                    {studentsCount}
                                </p>
                            </GradientCard>
                        </div>
                        <div class="col-start-2">
                            <GradientCard color="blue">
                                <div className="flex items-center gap-2">
                                    <User size={30} />{" "}
                                    <p class=" font-medium leading-normal text-xl">
                                        Jumlah Teachers
                                    </p>
                                </div>
                                <p class=" tracking-light text-2xl font-semibold leading-tight mt-2">
                                    450
                                </p>
                            </GradientCard>
                        </div>
                        <div class="col-start-3">
                            <GradientCard color="b">
                                <div className="flex items-center gap-2">
                                    <Package size={30} />{" "}
                                    <p class=" font-medium leading-normal text-xl">
                                        Jumlah Barang
                                    </p>
                                </div>
                                <p class=" tracking-light text-2xl font-semibold leading-tight mt-2">
                                    450
                                </p>
                            </GradientCard>
                        </div>
                        <div class="col-start-4">
                            <GradientCard color="b">
                                <div className="flex items-center gap-2">
                                    <PackageOpen size={30} />{" "}
                                    <p class=" font-medium leading-normal text-xl">
                                        Barang Dipinjam
                                    </p>
                                </div>
                                <p class=" tracking-light text-2xl font-semibold leading-tight mt-2">
                                    450
                                </p>
                            </GradientCard>
                        </div>
                        <div class="col-span-2 col-start-1 row-start-2">
                            <GradientCard color="b">
                                <div className="flex items-center gap-2">
                                    <FileClock size={30} />{" "}
                                    <p class=" font-medium leading-normal text-xl">
                                        Aktivitas Terakhir
                                    </p>
                                </div>
                                <div className="">
                                    <div className="flex items-center gap-1 mt-3">
                                        {" "}
                                        <span className="font-semibold text-md border border-blue-400/40 bg-gradient-to-bl from-blue-800/0 via-blue-800/30  to-yellow-blue/60 px-[10px] rounded-full">
                                            !
                                        </span>
                                        <p class=" tracking-light text-lg    font-regular leading-tight">
                                            <strong>Auza</strong> Meminjam Laptop
                                        </p>
                                    </div>

                                    <p class=" tracking-light text-sm text-neutral-500 font-regular leading-tight ml-7">
                                        31-12-2003. 03:00:12 WIB
                                    </p>
                                </div>
                            </GradientCard>
                        </div>
                        <div class="col-span-2 col-start-3 row-start-2">
                            <GradientCard color="b">
                                <div className="flex items-center gap-2">
                                    <FileQuestionMark size={30} />{" "}
                                    <p class=" font-medium leading-normal text-xl">
                                        Placeholder
                                    </p>
                                </div>
                                <p class=" tracking-light text-2xl font-semibold leading-tight mt-2">
                                    Placeholder
                                </p>
                            </GradientCard>
                        </div>
                    </main>
                </div>
            </div>
        </Adminlayout>
    );
}
