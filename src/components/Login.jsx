import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Login = ({ onSubmit }) => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();
    const handleUsername = (data) => {
        // Custom logic to set an error
        const username = data.username.trim()
        if (username === "") {
            setError("username", {
                type: "manual",
                message: "Username cannot be empty",
            });
            return;
        }
        onSubmit(username);
        // console.log(username)
    }

    return (
        <div className="mx-auto container max-w-screen-xl px-3 sm:px-10">
            <div className="py-4 flex flex-col lg:flex-row w-full">
                <div className="w-full sm:p-5 lg:p-8">
                    <div className="mx-auto text-left justify-center rounded-md w-full max-w-lg px-4 py-8 sm:p-10 overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2x">
                        <div className="overflow-hidden mx-auto">
                            <div className="text-center mb-6">
                                <h2 className="text-3xl font-bold">Welcome</h2>
                                <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">
                                    What should people call you?
                                </p>
                            </div>
                            <form
                                onSubmit={handleSubmit(handleUsername)}
                                className="flex flex-col justify-center"
                            >
                                <div className="grid grid-cols-1 gap-5">
                                    <div className="form-group">
                                        <input
                                            {...register('username', { required: true })}
                                            type="text"
                                            className={"py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-purple-500 h-11 md:h-12"}
                                        />
                                        {errors.username && <p>Username is required.</p>}
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full text-center py-3 rounded bg-purple-500 text-white hover:bg-purple-600 transition-all focus:outline-none my-1"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login