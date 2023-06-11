@extends('layouts.email')

@section('content')
    <div style="background-color: #f8f9fa; padding: 40px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px;">
            <h1 style="text-align: center; color: #0f00b9; font-size: 24px;">
                Welcome to Osama Desing
            </h1>
            <p style="text-align: center; color: #666666; font-size: 16px;">
                Thank you <span class="text-primary"> {{ $user->name }}</span>

            </p>

            <p style="text-align: center; color: #666666; font-size: 16px;">
                for registering. We are excited to have
                you on board!
            </p>
            <p style="text-align: center; color: #666666; font-size: 16px;">Regards,</p>
            <p style="text-align: center; color: #666666; font-size: 16px;">
                Your Website Team
            </p>

            <div class="d-flex justify-content-center">
                <a href="http://localhost:3000" class="btn btn-danger text-white px-5 ">
                    Osama Desing
                </a>
            </div>

        </div>
    </div>
@endsection
