<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use App\Models\Employee;

class EmployeeController extends BaseController{


    public function index() {
        $employee = Employee::all();
        return response()->json($employee, 200);
    }

    public function getOne($id)
    {
        $employee = Employee::find($id);
        return response()->json($employee, $employee ? 200 : 404);
    }

    public function update(Request $request) {
        $employee = Employee::find( $request->input("id"));
        if ( $employee ) {
            $employee->update($request->all());
            return response()->json('', 200);
        }
        return response()->json('', 400);
    }

    public function delete($id) {
        $employee = Employee::find($id);
        $res = $employee->delete();
        return response()->json('', $res ? 200 : 404);
    }

    public function insert(Request $request)
    {
        $employee = new Employee([
            "name" => $request->input("name"),
            "birthdate" => $request->input("birthdate"),
            "position" => $request->input("position"),
        ]);
        $employee->save();
        return response()->json('', 201);
    }
}
