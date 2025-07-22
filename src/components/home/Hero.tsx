
import { useNavigate } from 'react-router-dom';
import heroIMG from '../../assets/images/hospitalhero.jpg';
import type { RootState } from '../../app/store';
import { useSelector } from 'react-redux';

export const Hero = () => {
  const navigate = useNavigate();
const userrole = useSelector((state: RootState) => state.user.user?.role);
        const userToken = useSelector((state: RootState) => state.user.token);
  const goToLogin = () => {
    
  //   if (!localStorage.getItem('userToken')) {
  //     navigate('/login');
  //   } else {
  //     navigate('/appointments');
  //   }
  // };
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
           <div className="p-6 bg-white/90 backdrop-blur-sm border rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Easy Payment
            </h3>
            <p className="text-gray-700">
              Secure abd simple payment options for all services
            </p>
          </div>
           <div className="p-6 bg-white/90 backdrop-blur-sm border rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
             Modern Care
            </h3>
            <p className="text-gray-700">
              Experience healthcare with a modern touch
            </p>
          </div>
          <div className="p-6 bg-white/90 backdrop-blur-sm border rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Hassle-free Appointments
            </h3>
            <p className="text-gray-700">
             Manage your appointments with ease, no more waiting in lines
            </p>
          </div>
          <div className="p-6 bg-white/90 backdrop-blur-sm border rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Patient-Centric
            </h3>
            <p className="text-gray-700">
              We prioritize patient needs and comfort in every interaction
            </p>
          </div>
          <div className="p-6 bg-white/90 backdrop-blur-sm border rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
             Book Appointments
            </h3>
            <p className="text-gray-700">
              Schedule your appointments with just a few clicks
            </p>
          </div>
          <div className="p-6 bg-white/90 backdrop-blur-sm border rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              24/7 Support
            </h3>
            <p className="text-gray-700">
            Our support team is available around the clock to assist you
            </p>
          </div>
          <div className="p-6 bg-white/90 backdrop-blur-sm border rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
             User-friendly interface
            </h3>
            <p className="text-gray-700">
             Navigate our platform with ease, designed for all ages
            </p>
          </div>
          <div className="p-6 bg-white/90 backdrop-blur-sm border rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Comprehensive services
            </h3>
            <p className="text-gray-700">
             From appointments to payments, we cover all your healthcare needs
            </p>
          </div>
          <div className="p-6 bg-white/90 backdrop-blur-sm border rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Community Focus
            </h3>
            <p className="text-gray-700">
             We are dedicated to improving community health and well being
            </p>
          </div>
          <div className="p-6 bg-white/90 backdrop-blur-sm border rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Telemedicine Access
            </h3>
            <p className="text-gray-700">
             Consult with doctors remotely for convinience and safety 
            </p>
          </div>
          <div className="p-6 bg-white/90 backdrop-blur-sm border rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Quick updates
            </h3>
            <p className="text-gray-700">
              Stay informed with real time-updates on your appointments and health records
            </p>
          </div>
          <div className="p-6 bg-white/90 backdrop-blur-sm border rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Personalized Reminders
            </h3>
            <p className="text-gray-700">
            Never miss an appointment with timely notifications tailored for you.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex justify-center items-center w-full ">
          <button
            onClick={goToLogin}
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

