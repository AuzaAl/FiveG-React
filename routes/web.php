  <?php
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeachersController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PeminjamanController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

//page route
Route::get('/tes', function () {
    return Inertia::render('Dashboardx');
});

// public Peminjaman page
Route::get('/peminjaman', function () {
    return Inertia::render('Peminjaman/index');
})->name('peminjaman.public');
// public verification API
Route::prefix('api')->group(function () {
    Route::get('/students/by-nisn/{nisn}', [StudentController::class, 'findByNisn']);
    Route::get('/inventories/by-kode/{kode}', [InventoryController::class, 'findByKode']);
});

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::prefix('dashboard')->group(function () {
        // Student Resource
        Route::resource('students', StudentController::class)->parameters([
            'students' => 'student',
        ])->names([
            'index' => 'dashboard.students.index',
            'create' => 'dashboard.students.create',
            'store' => 'dashboard.students.store',
            'show' => 'dashboard.students.show',
            'edit' => 'dashboard.students.edit',
            'update' => 'dashboard.students.update',
            'destroy' => 'dashboard.students.destroy',
        ]);

        // Teacher Resource
        Route::resource('teachers', TeachersController::class)->parameters([
            'teachers' => 'teacher',
        ])->names([
            'index' => 'dashboard.teachers.index',
            'create' => 'dashboard.teachers.create',
            'store' => 'dashboard.teachers.store',
            'show' => 'dashboard.teachers.show',
            'edit' => 'dashboard.teachers.edit',
            'update' => 'dashboard.teachers.update',
            'destroy' => 'dashboard.teachers.destroy',
        ]);
        
        // Inventory Resource
        Route::resource('inventories', InventoryController::class)->parameters([
            'inventories' => 'inventory',
        ])->names([
            'index' => 'dashboard.inventories.index',
            'create' => 'dashboard.inventories.create',
            'store' => 'dashboard.inventories.store',
            'show' => 'dashboard.inventories.show',
            'edit' => 'dashboard.inventories.edit',
            'update' => 'dashboard.inventories.update',
            'destroy' => 'dashboard.inventories.destroy',
        ]);

        // Inventory Resource
        Route::resource('categories', CategoryController::class)->parameters([
            'categories' => 'category',
        ])->names([
            'index' => 'dashboard.categories.index',
            'create' => 'dashboard.categories.create',
            'store' => 'dashboard.categories.store',
            'show' => 'dashboard.categories.show',
            'edit' => 'dashboard.categories.edit',
            'update' => 'dashboard.categories.update',
            'destroy' => 'dashboard.categories.destroy',
        ]);

        // Peminjaman Resource
        Route::resource('peminjaman', PeminjamanController::class)->parameters([
            'peminjaman' => 'peminjaman',
        ])->names([
            'index' => 'peminjaman.index',
            'create' => 'peminjaman.create',
            'store' => 'peminjaman.store',
            'show' => 'peminjaman.show',
            'edit' => 'peminjaman.edit',
            'update' => 'peminjaman.update',
            'destroy' => 'peminjaman.destroy',
        ]);

            

        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
});


require __DIR__.'/auth.php';
