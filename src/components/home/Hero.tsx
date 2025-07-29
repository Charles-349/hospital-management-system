
// import { useNavigate } from 'react-router-dom';
// import heroIMG from '../../assets/images/hospitalhero.jpg';
// import type { RootState } from '../../app/store';
// import { useSelector } from 'react-redux';

// export const Hero = () => {
//   const navigate = useNavigate();
//   const userrole = useSelector((state: RootState) => state.user.user?.role);
//   const userToken = useSelector((state: RootState) => state.user.token);
//   const goToLogin = () => {
//     if (!userToken) {
//       navigate('/login');
//     } else if (userrole === 'admin') {
//       navigate('/admin/dashboard');
//     } else if (userrole === 'doctor') {
//       navigate('/doctor/dashboard');
//     } else {
//       navigate('/user/dashboard');
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
//           <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4" data-test="medical-introduction-header">
//             SmartCare — Smart Patient Care
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
//           <div className="p-6 bg-white/90 backdrop-blur-sm border rounded-lg shadow hover:shadow-lg transition">
//             <h3 className="text-xl font-semibold mb-2 text-gray-800">
//               Easy Payment
//             </h3>
//             <p className="text-gray-700">
//               Secure abd simple payment options for all services
//             </p>
//           </div>
//           <div className="p-6 bg-white/90 backdrop-blur-sm border rounded-lg shadow hover:shadow-lg transition">
//             <h3 className="text-xl font-semibold mb-2 text-gray-800">
//               Modern Care
//             </h3>
//             <p className="text-gray-700">
//               Experience healthcare with a modern touch
//             </p>
//           </div>
//           <div className="p-6 bg-white/90 backdrop-blur-sm border rounded-lg shadow hover:shadow-lg transition">
//             <h3 className="text-xl font-semibold mb-2 text-gray-800">
//               Hassle-free Appointments
//             </h3>
//             <p className="text-gray-700">
//               Manage your appointments with ease, no more waiting in lines
//             </p>
//           </div>
//           <div className="p-6 bg-white/90 backdrop-blur-sm border rounded-lg shadow hover:shadow-lg transition">
//             <h3 className="text-xl font-semibold mb-2 text-gray-800">
//               Patient-Centric
//             </h3>
//             <p className="text-gray-700">
//               We prioritize patient needs and comfort in every interaction
//             </p>
//           </div>
//           <div className="p-6 bg-white/90 backdrop-blur-sm border rounded-lg shadow hover:shadow-lg transition">
//             <h3 className="text-xl font-semibold mb-2 text-gray-800">
//               Book Appointments
//             </h3>
//             <p className="text-gray-700">
//               Schedule your appointments with just a few clicks
//             </p>
//           </div>
//           <div className="p-6 bg-white/90 backdrop-blur-sm border rounded-lg shadow hover:shadow-lg transition">
//             <h3 className="text-xl font-semibold mb-2 text-gray-800">
//               24/7 Support
//             </h3>
//             <p className="text-gray-700">
//               Our support team is available around the clock to assist you
//             </p>
//           </div>
//           <div className="p-6 bg-white/90 backdrop-blur-sm border rounded-lg shadow hover:shadow-lg transition">
//             <h3 className="text-xl font-semibold mb-2 text-gray-800">
//               User-friendly interface
//             </h3>
//             <p className="text-gray-700">
//               Navigate our platform with ease, designed for all ages
//             </p>
//           </div>
//           <div className="p-6 bg-white/90 backdrop-blur-sm border rounded-lg shadow hover:shadow-lg transition">
//             <h3 className="text-xl font-semibold mb-2 text-gray-800">
//               Comprehensive services
//             </h3>
//             <p className="text-gray-700">
//               From appointments to payments, we cover all your healthcare needs
//             </p>
//           </div>
//           <div className="p-6 bg-white/90 backdrop-blur-sm border rounded-lg shadow hover:shadow-lg transition">
//             <h3 className="text-xl font-semibold mb-2 text-gray-800">
//               Community Focus
//             </h3>
//             <p className="text-gray-700">
//               We are dedicated to improving community health and well being
//             </p>
//           </div>
//           <div className="p-6 bg-white/90 backdrop-blur-sm border rounded-lg shadow hover:shadow-lg transition">
//             <h3 className="text-xl font-semibold mb-2 text-gray-800">
//               Telemedicine Access
//             </h3>
//             <p className="text-gray-700">
//               Consult with doctors remotely for convinience and safety
//             </p>
//           </div>
//           <div className="p-6 bg-white/90 backdrop-blur-sm border rounded-lg shadow hover:shadow-lg transition">
//             <h3 className="text-xl font-semibold mb-2 text-gray-800">
//               Quick updates
//             </h3>
//             <p className="text-gray-700">
//               Stay informed with real time-updates on your appointments and health records
//             </p>
//           </div>
//           <div className="p-6 bg-white/90 backdrop-blur-sm border rounded-lg shadow hover:shadow-lg transition">
//             <h3 className="text-xl font-semibold mb-2 text-gray-800">
//               Personalized Reminders
//             </h3>
//             <p className="text-gray-700">
//               Never miss an appointment with timely notifications tailored for you.
//             </p>
//           </div>
//         </div>

//         <div className="relative z-10 flex justify-center items-center w-full ">
//           <button
//             onClick={goToLogin}
//             className="btn btn-primary rounded-full px-8"
//           >
//             Book Appointment
//           </button>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default Hero;


import { useNavigate } from 'react-router-dom';
import heroIMG from '../../assets/images/hospitalhero.jpg';
import type { RootState } from '../../app/store';
import { useSelector } from 'react-redux';

export const Hero = () => {
  const navigate = useNavigate();
  const userrole = useSelector((state: RootState) => state.user.user?.role);
  const userToken = useSelector((state: RootState) => state.user.token);

  const goToLogin = () => {
    if (!userToken) {
      navigate('/login');
    } else if (userrole === 'admin') {
      navigate('/admin/dashboard');
    } else if (userrole === 'doctor') {
      navigate('/doctor/dashboard');
    } else {
      navigate('/user/dashboard');
    }
  };

  const cards = [
    "Fast Booking|Patients can book appointments in seconds, hassle-free.",
    "Secure Records|Manage patient data securely and efficiently.",
    "Trusted Doctors|Connect with verified, patient-first doctors.",
    "Easy Payment|Secure and simple payment options for all services.",
    "Modern Care|Experience healthcare with a modern touch.",
    "Hassle-free Appointments|No more waiting in lines.",
    "Patient-Centric|We prioritize patient needs and comfort.",
    "Book Appointments|Schedule with just a few clicks.",
    "24/7 Support|We're always here to help.",
    "User-friendly Interface|Designed for all ages.",
    "Comprehensive Services|From appointments to payments.",
    "Community Focus|Improving community well-being.",
    "Telemedicine Access|Remote consultations made easy.",
    "Quick Updates|Real-time appointment and health updates.",
    "Personalized Reminders|Never miss an appointment."
  ];

  return (
    <main className="flex flex-col bg-base-200 text-base-content">
     
      <section
        className="relative w-full flex flex-col justify-center items-start bg-cover bg-center py-24 px-6 md:px-20"
        style={{ backgroundImage: `url(${heroIMG})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>

        <div className="relative z-10 max-w-3xl mb-12 text-left space-y-4 animate-fade-up animate-duration-[1500ms]">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-wide animate-pulse animate-duration-[2000ms]" data-test="medical-introduction-header">
            SmartCare — Smart Patient Care
          </h1>
          <p className="text-white/90 text-lg md:text-xl animate-fade animate-delay-500">
            Book appointments, manage records, and provide modern care with ease.
          </p>
          <p className="text-white/80 text-base md:text-lg animate-fade animate-delay-700">
            Trusted by clinics & hospitals for seamless patient-first service.
          </p>
        </div>

        <h2 className="relative z-10 text-3xl md:text-4xl font-bold text-white mb-8 animate-jump animate-delay-1000">
          Why Choose Us?
        </h2>

        <div className="relative z-10 max-w-6xl w-full grid md:grid-cols-3 gap-6">
          {cards.map((item, idx) => {
            const [title, desc] = item.split('|');
            return (
              <div
                key={idx}
                className="p-6 bg-white/10 dark:bg-base-200/30 backdrop-blur-md border border-white/10 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 animate-fade-up animate-delay-[500ms] animate-duration-[1200ms]"
              >
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-white/80 text-sm">{desc}</p>
              </div>
            );
          })}
        </div>

        <div className="relative z-10 flex justify-center w-full mt-10">
          <button
            onClick={goToLogin}
            className="btn btn-accent text-white px-10 py-3 rounded-full shadow-lg hover:scale-110 transition duration-300 animate-bounce hover:shadow-2xl"
          >
            Book Appointment Now
          </button>
        </div>
      </section>

      
      <section className="px-6 md:px-20 py-20 bg-gradient-to-b from-base-300 to-base-200 text-center animate-pulse">
        <h2 className="text-4xl font-bold mb-6 text-neutral-content animate-jump">
          About SmartCare
        </h2>
        <p className="max-w-4xl mx-auto text-lg text-base-content/80">
          SmartCare is your trusted healthcare partner offering a seamless digital experience for booking, managing and attending appointments.
          With cutting-edge technology and a human-first approach, we ensure quality service every step of the way.
        </p>
      </section>

      <section className="px-6 md:px-20 py-20 bg-base-100 text-center animate-fade animate-duration-[2000ms] animate-bounce">
        <h2 className="text-4xl font-bold mb-12 text-neutral-content animate-pulse">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg shadow bg-base-200 hover:bg-base-300 transition-all duration-300 animate-flash">
            <h3 className="text-xl font-semibold mb-2">Online Booking</h3>
            <p className="text-base-content/80">Book your appointments from anywhere in just a few clicks.</p>
          </div>
          <div className="p-6 rounded-lg shadow bg-base-200 hover:bg-base-300 transition-all duration-300 animate-flash">
            <h3 className="text-xl font-semibold mb-2">Doctor Consultation</h3>
            <p className="text-base-content/80">Meet with verified doctors through video or physical visits.</p>
          </div>
          <div className="p-6 rounded-lg shadow bg-base-200 hover:bg-base-300 transition-all duration-300 animate-flash">
            <h3 className="text-xl font-semibold mb-2">Medical Records</h3>
            <p className="text-base-content/80">Access and manage your medical history securely, anytime.</p>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-20 py-20 bg-gradient-to-r from-base-300 to-base-100 text-center animate-pulse">
        <h2 className="text-4xl font-bold mb-12 text-neutral-content animate-jump">What Patients Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-base-100 p-6 rounded-xl shadow animate-bounce">
            <p className="text-base-content italic">
              "Booking my doctor visit was so easy. I got a confirmation in seconds!"
            </p>
            <div className="mt-4 font-semibold">Amina K., Nairobi</div>
          </div>
          <div className="bg-base-100 p-6 rounded-xl shadow animate-bounce">
            <p className="text-base-content italic">
              "I love how I can view my records and book for my parents too!"
            </p>
            <div className="mt-4 font-semibold">Brian M., Kisumu</div>
          </div>
          <div className="bg-base-100 p-6 rounded-xl shadow animate-bounce">
            <p className="text-base-content italic">
              "The system is very fast and user-friendly. Highly recommend."
            </p>
            <div className="mt-4 font-semibold">Wanjiku N., Mombasa</div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-20 py-20 bg-accent text-white text-center animate-fade-up animate-delay-800">
        <h2 className="text-4xl font-bold mb-4 animate-pulse">Ready to Take Control of Your Health?</h2>
        <p className="text-lg mb-6">Join thousands of patients using SmartCare today.</p>
        <button
          onClick={goToLogin}
          className="btn btn-neutral px-10 py-3 rounded-full shadow-md hover:scale-110 transition duration-300 animate-bounce"
        >
          Get Started
        </button>
      </section>
    </main>
  );
};

export default Hero;
