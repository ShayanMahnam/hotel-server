import React, { useEffect, useState, useRef } from "react";
import lottie from "lottie-web";

interface Booking {
  id: number;
  title: string;
  firstName: string;
  surname: string;
  email: string;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
}

function Table() {
  const container = useRef(
    null
  ) as unknown as React.MutableRefObject<HTMLDivElement>;
  const [data, setData] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchDate, setSearchDate] = useState<string>(
    new Date().toISOString().substr(0, 10)
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
    const instance = lottie.loadAnimation({
      container: container.current!,
      renderer: "svg",
      loop: false,
      autoplay: true,
      path: "/refresh.json",
    });

    return () => instance.destroy();
  }, [isRefreshing]);

  const handleRefresh = () => {
    setIsRefreshing(!isRefreshing);
    fetchData();
    setSearchTerm("");
  };

  const fetchData = () => {
    fetch("https://shayanmahnam-hotel-server.glitch.me/bookings")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(
      `https://shayanmahnam-hotel-server.glitch.me/bookings/search?term=${searchTerm}&date=${searchDate}`
    )
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  };

  const handleDelete = (id: number) => {
    fetch(`https://shayanmahnam-hotel-server.glitch.me/bookings/${id}`, {
      method: "DELETE",
    })
      .then(() => fetchData())
      .catch((error) => console.error(error));
  };

  return (
    <section className="flex flex-col relative h-screen justify-center gap-5">
      <h1 id="table" className="justify-self-start m-5 text-4xl">
        Table
      </h1>

      <div className="flex flex-col items-center gap-10">
        <form
          className="w-full flex gap-5 justify-center"
          onSubmit={handleSearch}
        >
          <input
            type="date"
            value={searchDate}
            onChange={(event) => setSearchDate(event.target.value)}
            className="border border-gray-400 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by email, first name or surname"
            className="w-4/12 border border-gray-400 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Search
          </button>
        </form>
        <div className="flex justify-center items-center">
          <p>Refresh table</p>
          <div
            className="w-24 cursor-pointer"
            ref={container}
            onClick={handleRefresh}
          ></div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex font-bold justify-center items-center">
          <svg
            className="w-20"
            version="1.1"
            id="L4"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            enableBackground="new 0 0 0 0"
            xmlSpace="preserve"
          >
            <circle fill="#000" stroke="none" cx="6" cy="50" r="6">
              <animate
                attributeName="opacity"
                dur="1s"
                values="0;1;0"
                repeatCount="indefinite"
                begin="0.1"
              />
            </circle>
            <circle fill="#000" stroke="none" cx="26" cy="50" r="6">
              <animate
                attributeName="opacity"
                dur="1s"
                values="0;1;0"
                repeatCount="indefinite"
                begin="0.2"
              />
            </circle>
            <circle fill="#000" stroke="none" cx="46" cy="50" r="6">
              <animate
                attributeName="opacity"
                dur="1s"
                values="0;1;0"
                repeatCount="indefinite"
                begin="0.3"
              />
            </circle>
          </svg>

          <span>Data is loading, Please wait!</span>
        </div>
      ) : (
        <div className="p-10 flex justify-center">
          <table className="table-auto md:w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Surname</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Room ID</th>
                <th className="px-4 py-2">Check in Date</th>
                <th className="px-4 py-2">Check out Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2">{item.id}</td>
                  <td className="border px-4 py-2">{item.title}</td>
                  <td className="border px-4 py-2">{item.firstName}</td>
                  <td className="border px-4 py-2">{item.surname}</td>
                  <td className="border px-4 py-2">{item.email}</td>
                  <td className="border px-4 py-2">{item.roomId}</td>
                  <td className="border px-4 py-2">{item.checkInDate}</td>
                  <td className="border px-4 py-2">{item.checkOutDate}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Table;
