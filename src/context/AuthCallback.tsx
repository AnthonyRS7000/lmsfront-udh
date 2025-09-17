import { useEffect } from "react";

function AuthCallback() {
  useEffect(() => {
    const params = new URLSearchParams("window.location.search");
    const message = params.get("message");
    const token = params.get("token");

    if (message === "Login exitoso con Google" && token) {
      // Envía los datos a la ventana principal
      window.opener.postMessage(
        { type: "google-auth-success", token },
        window.opener.location.origin
      );
      window.close();
    }
  }, []);

  return <div>Procesando autenticación...</div>;
}

export default AuthCallback;