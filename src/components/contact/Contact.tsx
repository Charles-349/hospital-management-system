// import { useForm, type SubmitHandler } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';

// type ContactInputs = {
//   name: string;
//   email: string;
//   phone: string;
//   message: string;
// };

// const schema = yup.object({
//   name: yup.string().max(100, 'Max 100 characters').required('Name is required'),
//   email: yup.string().email('Invalid email').max(100, 'Max 100 characters').required('Email is required'),
//   phone: yup.string().max(20, 'Max 20 characters').required('Phone number is required'),
//   message: yup.string().max(1000, 'Max 1000 characters').required('Message is required'),
// });

// function Contact() {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm<ContactInputs>({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit: SubmitHandler<ContactInputs> = async (data) => {
//     console.log('Contact form submitted:', data);
//     // Example: Send to your API or email service here
//     alert('Message sent successfully!');
//     reset();
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-yellow-900 via-amber-700 to-yellow-800">
//       <div className="w-full max-w-lg p-8 rounded-xl shadow-2xl bg-white">
//         <h1 className="text-3xl font-extrabold mb-6 text-center text-amber-800">
//           Contact Us
//         </h1>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <input
//             type="text"
//             {...register('name')}
//             placeholder="Your Name"
//             className="input border border-amber-300 rounded w-full p-3 focus:ring-2 focus:ring-amber-600 text-lg"
//           />
//           {errors.name && (
//             <span className="text-red-600 text-sm">{errors.name.message}</span>
//           )}

//           <input
//             type="email"
//             {...register('email')}
//             placeholder="Your Email"
//             className="input border border-amber-300 rounded w-full p-3 focus:ring-2 focus:ring-amber-600 text-lg"
//           />
//           {errors.email && (
//             <span className="text-red-600 text-sm">{errors.email.message}</span>
//           )}

//           <input
//             type="number"
//             {...register('phone')}
//             placeholder="Phone Number"
//             className="input border border-amber-300 rounded w-full p-3 focus:ring-2 focus:ring-amber-600 text-lg"
//           />
//           {errors.phone && (
//             <span className="text-red-600 text-sm">{errors.phone.message}</span>
//           )}

//           <textarea
//             {...register('message')}
//             placeholder="Your Message"
//             rows={5}
//             className="input border border-amber-300 rounded w-full p-3 focus:ring-2 focus:ring-amber-600 text-lg resize-none"
//           />
//           {errors.message && (
//             <span className="text-red-600 text-sm">{errors.message.message}</span>
//           )}

//           <button
//             type="submit"
//             className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 rounded-lg transition"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? (
//               <>
//                 <span className="loading loading-bars loading-md" /> Sending...
//               </>
//             ) : (
//               "Send Message"
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Contact;



import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type ContactInputs = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const schema = yup.object({
  name: yup.string().max(100, 'Max 100 characters').required('Name is required'),
  email: yup.string().email('Invalid email').max(100, 'Max 100 characters').required('Email is required'),
  phone: yup.string().max(20, 'Max 20 characters').required('Phone number is required'),
  message: yup.string().max(1000, 'Max 1000 characters').required('Message is required'),
});

function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ContactInputs> = async (data) => {
    try {
      const response = await fetch('http://localhost:8081/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      alert('Message sent successfully!');
      reset();
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-yellow-900 via-amber-700 to-yellow-800">
      <div className="w-full max-w-lg p-8 rounded-xl shadow-2xl bg-white">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-amber-800">
          Contact Us
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            {...register('name')}
            placeholder="Your Name"
            className="input border border-amber-300 rounded w-full p-3 focus:ring-2 focus:ring-amber-600 text-lg"
          />
          {errors.name && (
            <span className="text-red-600 text-sm">{errors.name.message}</span>
          )}

          <input
            type="email"
            {...register('email')}
            placeholder="Your Email"
            className="input border border-amber-300 rounded w-full p-3 focus:ring-2 focus:ring-amber-600 text-lg"
          />
          {errors.email && (
            <span className="text-red-600 text-sm">{errors.email.message}</span>
          )}

          <input
            type="text"
            {...register('phone')}
            placeholder="Phone Number"
            className="input border border-amber-300 rounded w-full p-3 focus:ring-2 focus:ring-amber-600 text-lg"
          />
          {errors.phone && (
            <span className="text-red-600 text-sm">{errors.phone.message}</span>
          )}

          <textarea
            {...register('message')}
            placeholder="Your Message"
            rows={5}
            className="input border border-amber-300 rounded w-full p-3 focus:ring-2 focus:ring-amber-600 text-lg resize-none"
          />
          {errors.message && (
            <span className="text-red-600 text-sm">{errors.message.message}</span>
          )}

          <button
            type="submit"
            className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 rounded-lg transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-bars loading-md" /> Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
