
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'sonner';

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
      const response = await fetch('https://medical-appointment-n1p3.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      toast.success('Message sent! We will get back to you soon.');
      reset();
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-purple-900 via-indigo-800 to-blue-900 px-4">
      <div className="w-full max-w-2xl p-10 bg-base-100 rounded-2xl shadow-2xl animate-pulse animate-fade-up animate-infinite animate-duration-[3000ms] animate-ease-in-out animate-delay-200 animate-alternate">
        <h1 className="text-4xl font-bold text-center text-accent mb-8 animate-jump animate-delay-300">
          Contact Us
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input
              type="text"
              {...register('name')}
              placeholder="Your Name"
              className="input input-bordered input-accent w-full text-base"
            />
            {errors.name && (
              <p className="text-error text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              {...register('email')}
              placeholder="Your Email"
              className="input input-bordered input-accent w-full text-base"
            />
            {errors.email && (
              <p className="text-error text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              {...register('phone')}
              placeholder="Phone Number"
              className="input input-bordered input-accent w-full text-base"
            />
            {errors.phone && (
              <p className="text-error text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <textarea
              {...register('message')}
              placeholder="Your Message"
              rows={5}
              className="textarea textarea-bordered textarea-accent w-full text-base"
            />
            {errors.message && (
              <p className="text-error text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-accent w-full shadow-md hover:scale-105 transition-transform duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-dots loading-md" /> Sending...
              </>
            ) : (
              'Send Message'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
