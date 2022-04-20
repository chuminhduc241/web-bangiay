import useCustomRouter from "hooks/useCustomRouter";
import React, { useEffect, useState } from "react";
import "./style.scss";
const Pagination = React.memo(({ totalPages, page, sort, category }) => {
  const [firstArr, setFirstArr] = useState([]);
  const [lastArr, setLastArr] = useState([]);
  const { pushQuery } = useCustomRouter();
  useEffect(() => {
    const newArr = [...Array(totalPages)].map((_, i) => i + 1);
    if (totalPages <= 4) return setFirstArr(newArr);
    if (totalPages - page >= 3) {
      setFirstArr(newArr.slice(page - 1, page + 2));
      setLastArr(newArr.slice(totalPages));
    } else {
      setFirstArr(newArr.slice(totalPages - 4, totalPages));
      setLastArr([]);
    }
  }, [totalPages, page]);
  const isActive = (index) => {
    if (index == page) return "active";
    return "";
  };
  function next() {
    const newPage = Math.min(page + 1, totalPages);
    pushQuery({ page: newPage, sort, category });
  }

  function prev() {
    const newPage = Math.max(page - 1, 1);
    pushQuery({ page: newPage, sort, category });
  }

  function jump(page) {
    const newPage = Math.max(1, page);
    pushQuery({ page: newPage, sort, category });
  }

  return (
    <div className="pagination">
      <button onClick={prev}>&laquo;</button>

      {firstArr.map((num) => (
        <button
          key={num}
          className={`${isActive(num)}`}
          onClick={() => jump(num)}
        >
          {num}
        </button>
      ))}

      {lastArr.length > 0 && <button>...</button>}

      {lastArr.map((num) => (
        <button
          key={num}
          className={`${isActive(num)}`}
          onClick={() => jump(num)}
        >
          {num}
        </button>
      ))}

      <button onClick={next}>&raquo;</button>
    </div>
  );
});

export default Pagination;
