
// import heroIMG from '../../assets/images/hospitalhero.jpg';

// export const LandingPage = () => {
//   const handleScroll = () => {
//     const section = document.getElementById('appointment-section');
//     if (section) {
//       section.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <main className="flex flex-col">
//       <section
//         className="relative w-full flex flex-col justify-center items-start bg-cover bg-center py-20 px-6 md:px-16"
//         style={{ backgroundImage: `url(${heroIMG})` }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
//         <div className="relative z-10 max-w-3xl mb-12 text-left">
//           <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
//             MediBook — Smart Patient Care
//           </h1>
//           <p className="text-white text-lg md:text-xl mb-4 max-w-xl">
//             Book appointments, manage records, and provide modern care with ease.
//           </p>
//           <p className="text-white text-base md:text-lg mb-6 max-w-xl">
//             Trusted by clinics & hospitals for patient-first service.
//           </p>
//         </div>

//         <h2 className="relative z-10 text-3xl md:text-4xl font-bold text-white mb-8 text-left">
//           Why Choose Us?
//         </h2>

//         <div className="relative z-10 max-w-5xl w-full grid md:grid-cols-3 gap-8 mb-8">
//           <div className="p-6 bg-white/90 backdrop-blur-sm border rounded-lg shadow hover:shadow-lg transition">
//             <h3 className="text-xl font-semibold mb-2 text-gray-800">
//               Fast Booking
//             </h3>
//             <p className="text-gray-700">
//               Patients can book appointments in seconds, hassle-free.
//             </p>
//           </div>
//           <div className="p-6 bg-white/90 backdrop-blur-sm border rounded-lg shadow hover:shadow-lg transition">
//             <h3 className="text-xl font-semibold mb-2 text-gray-800">
//               Secure Records
//             </h3>
//             <p className="text-gray-700">
//               Manage patient data securely and efficiently.
//             </p>
//           </div>
//           <div className="p-6 bg-white/90 backdrop-blur-sm border rounded-lg shadow hover:shadow-lg transition">
//             <h3 className="text-xl font-semibold mb-2 text-gray-800">
//               Trusted Doctors
//             </h3>
//             <p className="text-gray-700">
//               Connect with verified, patient-first doctors.
//             </p>
//           </div>
//         </div>

//         <div className="relative z-10 flex justify-center items-center w-full ">
//             <button
//              onClick={handleScroll}
//              className="btn btn-primary rounded-full px-8"
//             >
//             Book Appointment
//             </button>
//         </div>

//       </section>
//     </main>
//   );
// };

// export default LandingPage;



import { useNavigate } from 'react-router-dom';
import heroIMG from '../../assets/images/hospitalhero.jpg';

export const Hero = () => {
  const navigate = useNavigate();

  const goToAbout = () => {
    navigate('/about'); 
  };

  return (
    <main className="flex flex-col">
      <section
        className="relative w-full flex flex-col justify-center items-start bg-cover bg-center py-20 px-6 md:px-16"
        style={{ backgroundImage: `url(${heroIMG})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>

        <div className="relative z-10 max-w-3xl mb-12 text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
            MediBook — Smart Patient Care
          </h1>
          <p className="text-white text-lg md:text-xl mb-4 max-w-xl">
            Book appointments, manage records, and provide modern care with ease.
          </p>
          <p className="text-white text-base md:text-lg mb-6 max-w-xl">
            Trusted by clinics & hospitals for patient-first service.
          </p>
        </div>

        <h2 className="relative z-10 text-3xl md:text-4xl font-bold text-white mb-8 text-left">
          Why Choose Us?
        </h2>

        <div className="relative z-10 max-w-5xl w-full grid md:grid-cols-3 gap-8 mb-8">
          <div className="p-6 bg-white/90 backdrop-blur-sm border rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Fast Booking
            </h3>
            <p className="text-gray-700">
              Patients can book appointments in seconds, hassle-free.
            </p>
          </div>
          <div className="p-6 bg-white/90 backdrop-blur-sm border rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Secure Records
            </h3>
            <p className="text-gray-700">
              Manage patient data securely and efficiently.
            </p>
          </div>
          <div className="p-6 bg-white/90 backdrop-blur-sm border rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Trusted Doctors
            </h3>
            <p className="text-gray-700">
              Connect with verified, patient-first doctors.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex justify-center items-center w-full ">
          <button
            onClick={goToAbout}
            className="btn btn-primary rounded-full px-8"
          >
            Book Appointment
          </button>
        </div>
      </section>
    </main>
  );
};

export default Hero;

