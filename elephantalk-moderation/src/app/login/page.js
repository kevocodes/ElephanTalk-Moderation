"use client"

import React from "react";
import { LuEye } from 'react-icons/lu';
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";



function LoginPage() {
    const [formData, setFormData] = React.useState({
        username: "",
        password: ""
    });
    const [showPassword, setShowPassword] = React.useState(false);
    const params = useSearchParams();

    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        const error = params.get("error");
        if (error === "CredentialsSignin") {
            alert("Credenciales incorrectas");
        }
    }, [params]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handlesubmit = (e) => {
        try {
            setLoading(true);
            e.preventDefault();

            signIn("credentials", {
                username: formData.username,
                password: formData.password,
                redirect: true,
                callbackUrl: "/",
            });
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-dark-login bg-cover">
            <div className="bg-gray-800 p-10 rounded-lg shadow-md text-center w-full max-w-sm">
                <div className="mb-6">
                    <img src="/assets/logo.webp" alt="ElephanTalk Logo" className="mx-auto" />
                </div>
                <form onSubmit={handlesubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="username"
                            required
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Username or Email"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6 relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            name="password"
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <LuEye
                            onClick={togglePasswordVisibility}
                            className={`absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer ${showPassword ? 'text-primary' : 'text-gray-400'}`}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-darkprim transition duration-200"
                    >
                        {!loading ?
                            ("Sign In") :
                            (<ClipLoader
                                loading={true}
                                color="white"
                                size={5}
                            />)}
                    </button>
                </form>
            </div>
        </main>
    );

}

export default LoginPage;

