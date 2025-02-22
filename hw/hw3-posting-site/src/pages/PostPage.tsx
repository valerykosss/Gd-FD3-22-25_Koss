import { useEffect, useRef } from "react";
import { Navigate, useParams } from "react-router";

export default function PostPage() {
    const params = useParams();
    const alertShown = useRef(false);
  
    const isValid = /^\d+$/.test(params.id || "");
  
    useEffect(() => {
      if (!isValid && !alertShown.current) {
        alert("This id is not numeric, you'll be transfered to 404 page");
        alertShown.current = true;
      }
    }, [isValid]);
  
    if (!isValid) {
      return <Navigate to="/404" replace />;
    }
  
    return <>{params.id} - this is an id</>;
}