// app/sign-up/page.js
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [latestTime, setLatestTime] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    company: "",
    phone: "",
    interests: [],
    message: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/get", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: "1.1.1.1",
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Fetched result:", result); // Inspect data structure

        // Access the data array for user "1.1.1.1"
        const userArray = result.data["1.1.1.1"];

        if (userArray && Array.isArray(userArray) && userArray.length > 0) {
          // Retrieve the last item in the array
          const latestEntry = userArray[userArray.length - 1];
          const timeValue = parseInt(latestEntry.value, 10); // Convert value to integer
          console.log("Latest time value:", timeValue);
          setLatestTime(timeValue); // Update state with latest value
        } else {
          console.log("User data array is empty or not an array.");
          setLatestTime(0);
        }
      } catch (error) {
        setError(error.message);
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const interests = [...formData.interests];
      if (checked) {
        interests.push(value);
      } else {
        const index = interests.indexOf(value);
        if (index > -1) {
          interests.splice(index, 1);
        }
      }
      setFormData((prev) => ({ ...prev, interests }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
  };

  const QuickForm = () => (
    <div className="bg-yellow-50 p-6 rounded-lg shadow-sm max-w-md w-full">
      <h2 className="text-xl font-semibold mb-4 text-yellow-800">
        Quick Sign Up
      </h2>
      <p className="text-sm text-yellow-700 mb-4">
        We noticed you're in a hurry! Here's a quick form to get started.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Your name"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors"
        >
          Sign Up
        </button>
      </form>
    </div>
  );

  const DetailedForm = () => (
    <div className="bg-green-50 p-6 rounded-lg shadow-sm max-w-xl w-full">
      <h2 className="text-xl font-semibold mb-4 text-green-800">
        Complete Sign Up
      </h2>
      <p className="text-sm text-green-700 mb-4">
        Thanks for spending time with us! Please tell us more about yourself.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your company"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your phone number"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interests
          </label>
          <div className="space-y-2">
            {["Product Updates", "Newsletter", "Beta Testing", "Events"].map(
              (interest) => (
                <label key={interest} className="flex items-center">
                  <input
                    type="checkbox"
                    name="interests"
                    value={interest}
                    checked={formData.interests.includes(interest)}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500 mr-2"
                  />
                  <span className="text-sm text-gray-700">{interest}</span>
                </label>
              )
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message (Optional)
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Tell us more about your interests..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
        >
          Complete Sign Up
        </button>
      </form>
    </div>
  );

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        {error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : latestTime === null ? (
          <p>Loading...</p>
        ) : (
          <>{latestTime < 30 ? <QuickForm /> : <DetailedForm />}</>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Back to Home
        </a>
      </footer>
    </div>
  );
}
