
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLocation } from 'react-router';
import { loginAPI } from '../features/login/loginAPI';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/users/userSlice';
import { toast } from 'sonner';

type LoginInputs = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().email('Invalid email').max(100, 'Max 100 characters').required('Email is required'),
  password: yup.string().min(6, 'Min 6 characters').max(255, 'Max 255 characters').required('Password is required'),
});

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const emailFromState = location.state?.email || '';
  const [loginUser, { isLoading }] = loginAPI.useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: emailFromState,
    },
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    console.log('Login data:', data);

    try {
      const response = await loginUser(data).unwrap();
      dispatch(
        loginSuccess({
          token: response.token,
          user: response.user,
        })
      );
      console.log('Login successful:', response);
      toast.success('Login successful! Redirecting to dashboard...');
      if (response.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (response.user.role === 'doctor') {
        navigate('/doctor/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (error) {
      console.error('Login failed. Please check your credentials and try again.', error);
      toast.error('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-purple-900 via-indigo-800 to-blue-900 px-4">
      <div className="w-full max-w-lg p-10 bg-base-100 rounded-2xl shadow-2xl animate-pulse animate-fade-up animate-infinite animate-duration-[3000ms] animate-ease-in-out animate-delay-200 animate-alternate">
        <h1 className="text-4xl font-extrabold text-center text-accent mb-6 animate-jump animate-delay-300">
          Login to Your Account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input
              data-test="login-email-input"
              type="email"
              {...register('email')}
              placeholder="Email"
              className="input input-bordered input-accent w-full text-base"
              readOnly={!!emailFromState}
            />
            {errors.email && (
              <p className="text-error text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              data-test="login-password-input"
              type="password"
              {...register('password')}
              placeholder="Password"
              className="input input-bordered input-accent w-full text-base"
            />
            {errors.password && (
              <p className="text-error text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            data-test="login-submit-button"
            type="submit"
            className="btn btn-accent w-full shadow-md hover:scale-105 transition-transform duration-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-bars loading-md" /> Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="mt-6 flex flex-col items-center space-y-2 text-accent">
          <p>
            Don&apos;t have an account?{' '}
            <a href="/register" className="underline hover:text-primary">
              Register
            </a>
          </p>
          <p>
            <a href="/" className="underline hover:text-primary">
              Back to Home
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
