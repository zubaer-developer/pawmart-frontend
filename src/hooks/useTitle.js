import { useEffect } from "react";

function useTitle(title) {
  useEffect(() => {
    document.title = `${title} | PawMart`;
  }, [title]);
}

export default useTitle;
