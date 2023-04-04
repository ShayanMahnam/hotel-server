import React, { useRef, useEffect, useState } from "react";
import lottie from "lottie-web";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Hero() {
  const container = useRef(
    null
  ) as unknown as React.MutableRefObject<HTMLDivElement>;

  const [formData, setFormData] = useState({
    "title": "",
    "firstName": "",
    "surname": "",
    "email": "",
    "checkInDate": "",
    "checkOutDate": "",
  });

  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);

  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/hotel-booking.json",
    });

    // Return clean up function here
    return () => {
      instance.destroy();
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://shayanmahnam-hotel-server.glitch.me/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        alert("Form submitted successfully!");
        setFormData({
          title: "",
          firstName: "",
          surname: "",
          email: "",
          checkInDate: "",
          checkOutDate: "",
        });
      } else {
        console.log(formData)
        alert("Error submitting form.");
      }
    } catch (error) {
      alert("Error submitting form.");
    }
  };


const handleCheckInChange = (date: Date) => {
  setCheckInDate(date);
  setFormData((prevFormData) => ({
    ...prevFormData,
    checkInDate: date.toISOString().slice(0, 10),
  }));
};

const handleCheckOutChange = (date: Date) => {
  setCheckOutDate(date);
  setFormData((prevFormData) => ({
    ...prevFormData,
    checkOutDate: date.toISOString().slice(0, 10),
  }));
};

  return (
    <section className="flex flex-col relative mt-20 md:h-screen justify-center items-center  gap-5">
      <h1 id="booking" className="self-start m-5 text-4xl">
        Booking
      </h1>
      <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-10">
        <div className="md:w-6/12">
          <form
            className="flex flex-col w-full flex-wrap border-2 border-black rounded-2xl p-7 shadow-md gap-4"
            onSubmit={handleSubmit}
          >
            <label htmlFor="title">Title:</label>
            <select
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-5/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Please select</option>
              <option value="Dr">Dr</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Miss">Miss</option>
              <option value="Ms">Ms</option>
            </select>

            <div className="flex gap-5 justify-between items-center">
              <div className="flex flex-col w-full gap-5">
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex flex-col w-full gap-5">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  value={formData.surname}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
            </div>

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />

            <label htmlFor="checkInDate">Check-in Date:</label>
            <DatePicker
              id="checkInDate"
              name="checkInDate"
              selected={checkInDate}
              onChange={handleCheckInChange}
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
              placeholderText="Select a check-in date"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />

            <label htmlFor="checkOutDate">Check-out Date:</label>
            <DatePicker
              id="checkOutDate"
              name="checkOutDate"
              selected={checkOutDate}
              onChange={handleCheckOutChange}
              dateFormat="yyyy-MM-dd"
              minDate={
                checkInDate
                  ? new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000)
                  : new Date()
              }
              disabled={!checkInDate}
              placeholderText="Select a check-out date"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="" ref={container}></div>
      </div>
    </section>
  );
}

export default Hero;
