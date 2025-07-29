
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-purple-900 via-indigo-800 to-blue-900 px-4">
      <div className="w-full max-w-2xl p-10 bg-base-100 rounded-2xl shadow-2xl animate-pulse animate-fade-up animate-infinite animate-duration-[3000ms] animate-ease-in-out animate-delay-200 animate-alternate">
        <h1 className="text-4xl font-bold text-center text-accent mb-8 animate-jump animate-delay-300">
          Create Your Account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <input
            data-test="signup-firstname"
            type="text"
            {...register('firstName')}
            placeholder="First Name"
            className="input input-bordered input-accent w-full text-base"
          />
          {errors.firstName && (
            <p className="text-error text-sm mt-1">{errors.firstName.message}</p>
          )}

          <input
            data-test="signup-lastname"
            type="text"
            {...register('lastName')}
            placeholder="Last Name"
            className="input input-bordered input-accent w-full text-base"
          />
          {errors.lastName && (
            <p className="text-error text-sm mt-1">{errors.lastName.message}</p>
          )}

          <input
            data-test="signup-email"
            type="email"
            {...register('email')}
            placeholder="Email"
            className="input input-bordered input-accent w-full text-base"
          />
          {errors.email && (
            <p className="text-error text-sm mt-1">{errors.email.message}</p>
          )}

          <input
            data-test="signup-contactPhone"
            type="text"
            {...register('contactPhone')}
            placeholder="Phone Number"
            className="input input-bordered input-accent w-full text-base"
          />
          {errors.contactPhone && (
            <p className="text-error text-sm mt-1">{errors.contactPhone.message}</p>
          )}

          <input
            data-test="signup-address"
            type="text"
            {...register('address')}
            placeholder="Address"
            className="input input-bordered input-accent w-full text-base"
          />
          {errors.address && (
            <p className="text-error text-sm mt-1">{errors.address.message}</p>
          )}

          <input
            data-test="signup-password"
            type="password"
            {...register('password')}
            placeholder="Password"
            className="input input-bordered input-accent w-full text-base"
          />
          {errors.password && (
            <p className="text-error text-sm mt-1">{errors.password.message}</p>
          )}

          <input
            data-test="signup-confirmpassword"
            type="password"
            {...register('confirmPassword')}
            placeholder="Confirm Password"
            className="input input-bordered input-accent w-full text-base"
          />
          {errors.confirmPassword && (
            <p className="text-error text-sm mt-1">{errors.confirmPassword.message}</p>
          )}

          <button
            data-test="signup-submitbtn"
            type="submit"
            className="btn btn-accent w-full shadow-md hover:scale-105 transition-transform duration-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-bars loading-md" /> Registering...
              </>
            ) : (
              'Register'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-accent">
          Already have an account?{' '}
          <a href="/login" className="text-accent-content hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;

