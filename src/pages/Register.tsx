
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { userAPI } from '../features/users/userAPI';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

type RegisterInputs = {
  firstName: string;
  lastName: string;
  email: string;
  contactPhone: string;
  address: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object({
  firstName: yup.string().max(50, 'Max 50 characters').required('First name is required'),
  lastName: yup.string().max(50, 'Max 50 characters').required('Last name is required'),
  email: yup.string().email('Invalid email').max(100, 'Max 100 characters').required('Email is required'),
  contactPhone: yup.string().max(50, 'Max 50 characters').required('PhoneNumber is required'),
  address: yup.string().max(50, 'Max 100 characters').required('Address is required'),
  password: yup.string().min(6, 'Min 6 characters').max(255, 'Max 255 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

function Register() {
  const navigate = useNavigate();
  const [createUser, { isLoading }] = userAPI.useCreateUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    try {
      const response = await createUser(data).unwrap();
      console.log('Registration successful:', response);
      toast.success('Registration successful! Please check your email for verification code.');
      setTimeout(() => {
        navigate('/register/verify', {
          state: { email: data.email },
        });
      }, 2000);
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-800">
      <div className="w-full max-w-lg p-8 rounded-xl shadow-2xl bg-white">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-800">
          Create Your Account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            {...register('firstName')}
            placeholder="First Name"
            className="input border border-blue-300 rounded w-full p-3 focus:ring-2 focus:ring-blue-600 text-lg"
          />
          {errors.firstName && (
            <span className="text-red-600 text-sm">{errors.firstName.message}</span>
          )}

          <input
            type="text"
            {...register('lastName')}
            placeholder="Last Name"
            className="input border border-blue-300 rounded w-full p-3 focus:ring-2 focus:ring-blue-600 text-lg"
          />
          {errors.lastName && (
            <span className="text-red-600 text-sm">{errors.lastName.message}</span>
          )}

          <input
            type="email"
            {...register('email')}
            placeholder="Email"
            className="input border border-blue-300 rounded w-full p-3 focus:ring-2 focus:ring-blue-600 text-lg"
          />
          {errors.email && (
            <span className="text-red-600 text-sm">{errors.email.message}</span>
          )}

          <input
            type="number"
            {...register('contactPhone')}
            placeholder="Phone Number"
            className="input border border-blue-300 rounded w-full p-3 focus:ring-2 focus:ring-blue-600 text-lg"
          />
          {errors.contactPhone && (
            <span className="text-red-600 text-sm">{errors.contactPhone.message}</span>
          )}

          <input
            type="text"
            {...register('address')}
            placeholder="Address"
            className="input border border-blue-300 rounded w-full p-3 focus:ring-2 focus:ring-blue-600 text-lg"
          />
          {errors.address && (
            <span className="text-red-600 text-sm">{errors.address.message}</span>
          )}

          <input
            type="password"
            {...register('password')}
            placeholder="Password"
            className="input border border-blue-300 rounded w-full p-3 focus:ring-2 focus:ring-blue-600 text-lg"
          />
          {errors.password && (
            <span className="text-red-600 text-sm">{errors.password.message}</span>
          )}

          <input
            type="password"
            {...register('confirmPassword')}
            placeholder="Confirm Password"
            className="input border border-blue-300 rounded w-full p-3 focus:ring-2 focus:ring-blue-600 text-lg"
          />
          {errors.confirmPassword && (
            <span className="text-red-600 text-sm">{errors.confirmPassword.message}</span>
          )}

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-bars loading-md" /> Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-blue-900">
          Already have an account?{' '}
          <a href="/login" className="text-blue-700 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;