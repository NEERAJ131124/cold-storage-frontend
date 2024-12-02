import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col justify-between">
      {/* Hero Section */}
      <header className="text-center py-10 bg-cyan-600 text-white">
        <h1 className="text-4xl font-bold">Welcome to BookMyColdStore</h1>
        <p className="mt-4 text-lg">
          Revolutionizing the cold storage industry
        </p>
      </header>

      {/* Features Section */}
      <section className="py-10 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="bg-white shadow-lg p-4 rounded-lg max-w-sm">
            <h3 className="font-bold">For Store Owners</h3>
            <p>
              Register and make your storage facilities easily discoverable.
            </p>
          </div>
          <div className="bg-white shadow-lg p-4 rounded-lg max-w-sm">
            <h3 className="font-bold">For Customers</h3>
            <p>Find and book cold storage facilities near you effortlessly.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <footer className="py-10 bg-cyan-600 text-white flex justify-center gap-6">
        <a
          href="/register-owner"
          className="bg-white text-cyan-600 px-4 py-2 rounded-md shadow-lg"
        >
          Register as Store Owner
        </a>
        <a
          href="/register-customer"
          className="bg-white text-cyan-600 px-4 py-2 rounded-md shadow-lg"
        >
          Register as Customer
        </a>
      </footer>
    </div>
  );
};

export default LandingPage;
