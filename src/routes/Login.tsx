
import Button from '../components/Button';
import logo from '../assets/logo.png'
import google_logo from '../assets/google.png'


/*
<div className="relative flex sm:w-1/2 w-full h-36 sm:h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[url('/img/3.webp')] dark:grayscale bg-cover bg-center bg-no-repeat">
          <img src={udh_img} alt="Campus universitario" className="object-cover sm:w-full w-full h-36 sm:h-screen overflow-hidden xs:rounded-b-[150px] sm:rounded-br-[655px] sm:rounded-b-[0px]"/>
        </div>
        <div className="absolute top-6 right-6  rounded-lg p-2 shadow-md">
          <img src={logo} alt="Logo" className="h-10"/>
        </div>
      </div>

<div className="flex w-full md:w-1/2 items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-base opacity-70 rounded-tl-lg">
          </div>
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Iniciar sesión
          </h2>
          <p className="text-center text-gray-500 text-sm mt-4">
            Tu correo debe terminar en{" "}
            <span className="font-semibold italic">@udh.edu.pe</span>
          </p>

          <button className="flex items-center justify-center gap-2 border w-full mt-6 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>
            <span className="font-medium text-gray-700">
              Acceder con Google
            </span>
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            ¿Necesitas ayuda?{" "}
            <a href="#" className="text-emerald-600 hover:underline">
              Mira esta guía.
            </a>
          </p>
        </div>
      </div>
*/
function Login() {
  return (
    <div className="min-h-screen realtive items-center justify-center sm:flex flex flex-col sm:gap-0 gap-10  mask-radial-from-80%  bg-[url(https://graduados.udh.edu.pe/views/img/slides/1.jpg)] bg-center bg-cover  dark:bg-slate-900">
      <div className="relative flex w-full md:w-full items-center justify-center p-6">
        <div className="w-full max-w-md backdrop-blur-xl rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-serif text-center text-emerald-600 font-bold">
            Iniciar sesión
          </h2>
          <p className="text-center font-serif text-white text-sm mt-4">
            Tu correo debe terminar en{" "}
            <span className="font-semibold italic">@udh.edu.pe</span>
          </p>
          <button className="flex items-center justify-center gap-2 border-white w-full mt-6 py-2 rounded-lg shadow-sm bg-white hover:bg-[#1E1E1E] transition">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>
            <span className="font-medium font-serif text-emerald-600">
              Acceder con Google
            </span>
          </button>
          <p className="text-center font-serif text-sm text-white mt-6">
            ¿Necesitas ayuda?{" "}
            <a href="#" className="text-[#ECC138] font-serif hover:underline">
              Mira esta guía.
            </a>
          </p>
        </div>
      </div>
      <Button />
    </div>
  )
}

export default Login
