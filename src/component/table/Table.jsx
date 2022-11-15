import React, { useEffect, useState } from "react";
import "./table.css";

const Table = ({ data, handleGetCall, handleArchiveCall }) => {
  const [table, setTable] = useState([]);
  useEffect(() => {
    if (data) {
      setTable(data);
    }
  }, []);

  const handleArchive = async (id) => {
    const res = await handleArchiveCall(id);
    const newTest = table.filter((item) => {
      return item.id !== res.id;
    });
    console.log(newTest);
    setTable([...newTest, res]);
  };

  return (
    <table className="table">
      <thead>
        <tr className="table-head">
          <th>call type</th>
          <th>direction</th>
          <th>duration</th>
          <th>from</th>
          <th>to</th>
          <th>via</th>
          <th>status</th>
          <th>actions</th>
        </tr>
      </thead>

      <tbody>
        {table &&
          table.length > 0 &&
          table.map((item) => {
            return (
              <tr className="table-body">
                <td>{item.call_type}</td>
                <td>{item.direction}</td>
                <td>{item.duration}</td>
                <td>{item.from}</td>
                <td>{item.to}</td>
                <td>{item.via}</td>
                <td>
                  {item.is_archived ? (
                    <p
                      className="table-body--archived"
                      onClick={() => handleArchive(item.id)}
                    >
                      archived
                    </p>
                  ) : (
                    <p
                      className="table-body--archive"
                      onClick={() => handleArchive(item.id)}
                    >
                      archive
                    </p>
                  )}
                </td>
                <td>
                  <button onClick={() => handleGetCall(item.id)}>
                    Details
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default Table;
