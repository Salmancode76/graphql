import { useEffect } from "react";


const NotFound = () => {
  useEffect(() => {
    document.title = "404";
  }, []);

  
  return (
    <>
      <div className="C404">
        <h1 className="N404">404</h1>
        <p className="small404">Page Not Found</p>
      </div>
    </>
  );
};


export default NotFound;
