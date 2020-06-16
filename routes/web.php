<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::group(['prefix' => 'api/v1'],  function () {
    Route::get('/employee', 'EmployeeController@index');
    Route::get('/employee/{id}', 'EmployeeController@getOne')->where('id', '\d');
    Route::post('/employee', 'EmployeeController@insert');
    Route::put('/employee', 'EmployeeController@update');
    Route::delete('/employee/{id}', 'EmployeeController@delete');
});


Route::get('{any}', function () {
    return view('app');
})->where('any', '.*');




