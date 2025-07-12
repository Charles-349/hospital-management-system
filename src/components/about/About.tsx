import ClinicManager from '../../assets/images/doctorbadge.jpg';

const About = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-8 h-fit p-4 md:p-8 bg-green-100">
        {/* Image */}
        <div className="w-full md:w-1/2 flex items-center">
          <img
            src={ClinicManager}
            alt="clinic-management"
            className="w-full h-48 md:h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 border-2 border-gray-300 rounded-lg p-6 md:p-8 mb-6 md:mb-0">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-700">
            About MediBook
          </h1>
          <p className="mb-4 text-gray-700 text-base md:text-lg">
            MediBook is a modern patient and appointment management platform built for clinics, hospitals, and healthcare providers.
          </p>
          <p className="mb-2 text-gray-700 text-base md:text-lg">
            Patients can easily book appointments, manage their medical records, and receive care faster. Doctors and admins gain a clear overview of schedules, patient files, and secure communication — all in one place.
          </p>
          <p className="text-gray-700 text-base md:text-lg">
            With MediBook, healthcare teams work smarter and deliver a smooth, patient-first experience that builds trust and saves time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
