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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-800">
      <div className="w-full max-w-lg p-8 rounded-xl shadow-2xl bg-white">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-800">
          Login to Your Account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            {...register('email')}
            placeholder="Email"
            className="input border border-blue-300 rounded w-full p-3 focus:ring-2 focus:ring-blue-600 text-lg"
            readOnly={!!emailFromState}
          />
          {errors.email && (
            <span className="text-sm text-red-600">{errors.email.message}</span>
          )}

          <input
            type="password"
            {...register('password')}
            placeholder="Password"
            className="input border border-blue-300 rounded w-full p-3 focus:ring-2 focus:ring-blue-600 text-lg"
          />
          {errors.password && (
            <span className="text-sm text-red-600">{errors.password.message}</span>
          )}

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition"
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

        <div className="mt-6 flex flex-col items-center space-y-2">
          <p className="text-blue-900">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-700 hover:underline">
              Register
            </a>
          </p>
          <p className="text-blue-900">
            <a href="/" className="text-blue-700 hover:underline">
              Back to Home
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
