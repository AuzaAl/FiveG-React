<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inventory;
use Inertia\Inertia;
use App\Models\Student;
use App\Models\Teachers;

class DashboardController extends Controller
{
    public function index()
    {
        $inventories = Inventory::all();
        $studentsCount = Student::count();
        $teachers = Teachers::all();
        
        return Inertia::render('Dashboard', [
            'inventories' => $inventories,
            'studentsCount' => $studentsCount,
            'teachers' => $teachers,
        ]);
    }
}
