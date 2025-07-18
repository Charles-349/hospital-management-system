
import { FaTwitter, FaYoutube, FaFacebook, FaLinkedin  } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-700 to-blue-500 text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        <nav>
          <h6 className="text-lg font-semibold mb-4">Services</h6>
          <a className="block mb-2 hover:underline hover:text-teal-200 cursor-pointer">
            Appointment Booking
          </a>
          <a className="block mb-2 hover:underline hover:text-teal-200 cursor-pointer">
            Patient Records
          </a>
          <a className="block mb-2 hover:underline hover:text-teal-200 cursor-pointer">
            Doctor Management
          </a>
          <a className="block mb-2 hover:underline hover:text-teal-200 cursor-pointer">
            Billing & Payments
          </a>
        </nav>


        <nav>
          <h6 className="text-lg font-semibold mb-4">Company</h6>
          <a className="block mb-2 hover:underline hover:text-teal-200 cursor-pointer">
            About Us
          </a>
          <a className="block mb-2 hover:underline hover:text-teal-200 cursor-pointer">
            Contact
          </a>
          <a className="block mb-2 hover:underline hover:text-teal-200 cursor-pointer">
            Our Clinics
          </a>
          <a className="block mb-2 hover:underline hover:text-teal-200 cursor-pointer">
            Careers
          </a>
        </nav>
        <nav>
          <h6 className="text-lg font-semibold mb-4">Contact Us</h6>
          <p className="mb-2">Email: wamahiucharles123@gmail.com</p>
          <p className="mb-2">Phone: +254 701656349</p>
          <p className="mb-2">Address: 12402-10100</p>
          <p className="mb-2">Location: Nairobi,Kenya</p>
          <p className=" text-sm font-bold">For inquiries, please reach out to us.</p>
        </nav>
        <nav>
          <h6 className="text-lg font-semibold mb-4">Connect</h6>
          <div className="flex space-x-6 mb-4">
            <a href="https://x.com/Ch84036/" target="_blank" rel="noopener noreferrer" className="hover:text-teal-200 transition">
              <FaTwitter className="text-2xl" />
            </a>
            <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" className="hover:text-teal-200 transition">
              <FaYoutube className="text-2xl" />
            </a>
            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-teal-200 transition">
              <FaFacebook className="text-2xl" />
            </a>
             <a href="https://www.linkedin.com/in/charles-wamahiu/" target="_blank" rel="noopener noreferrer" className="hover:text-teal-200 transition">
              < FaLinkedin  className="text-2xl" />
            </a>
          </div>
          <p className="text-teal-100 text-sm">Follow us for updates & news</p>
        </nav>

      </div>

      <div className="mt-10 text-center text-sm text-teal-100">
        © {new Date().getFullYear()} MediBook. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;


