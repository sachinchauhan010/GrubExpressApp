import React, { useState } from "react";

const LoginSignupForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Handle login submission
    console.log(
      "Login submitted with phone number:",
      phoneNumber,
      "and OTP:",
      otp
    );
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Handle signup submission
    console.log("Signup submitted with phone number:", phoneNumber);
  };

  const handleSendOtp = () => {
    // Code to send OTP to the provided phone number
    console.log("OTP sent to:", phoneNumber);
    setIsOtpSent(true);
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-blue-700">
            {isLogin ? "LogIn" : "SignUp"}
          </h2>
        </div>
        <form
          className="mt-2 space-y-6"
          onSubmit={isLogin ? handleLoginSubmit : handleSignupSubmit}
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px flex flex-col items-center ">
            <div>
              <label htmlFor="phone-number" className="sr-only">
                Phone Number
              </label>
              <input
                id="phone-number"
                name="phone-number"
                type="tel"
                autoComplete="tel"
                required
                className="appearance-none my-4 relative block w-full md:w-72 px-3 py-2 border border-gray-300 placeholder-gray-600 text-gray-800 rounded-md focus:outline-none focus:border-indigo-500 focus:z-10 sm:text-lg font-semibold"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            {isLogin && isOtpSent && (
              <div>
                <label htmlFor="otp" className="sr-only">
                  OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  autoComplete="otp"
                  required
                  className="appearance-none relative block w-full md:w-72 px-3 py-2 border border-gray-300 placeholder-gray-600 text-gray-800 rounded-md focus:outline-none focus:border-indigo-500 focus:z-10 sm:text-lg font-semibold"
                  placeholder="OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="ml-20">
            {isLogin && !isOtpSent ? (
              <button
                type="button"
                onClick={handleSendOtp}
                className="group relative w-full md:w-72 flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-fuchsia-500 hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send OTP
              </button>
            ) : (
              <button
                type="submit"
                className="group relative w-full md:w-72 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLogin ? "Login" : "Signup"}
              </button>
            )}
          </div>
         <div>
          
         </div>
          

          <div className="flex items-center justify-center mt-4">
            <span className="mr-2">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </span>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </div>

         
        </form>
      </div>
    </div>
  );
};

export default LoginSignupForm;
