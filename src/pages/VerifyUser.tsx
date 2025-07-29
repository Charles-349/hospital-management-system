// import { useForm, type SubmitHandler } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { useLocation, useNavigate } from 'react-router';
// import { userAPI } from '../features/users/userAPI';
// import { toast } from 'sonner';

// type VerifyInputs = {
//   email: string;
//   code: string;
// };

// const schema = yup.object({
//   email: yup.string().email('Invalid email').required('Email is required'),
//   code: yup
//     .string()
//     .matches(/^\d{6}$/, 'Code must be a 6 digit number')
//     .required('Verification code is required'),
// });

// const VerifyUser = () => {
//   const [verifyUser, { isLoading }] = userAPI.useVerifyUserMutation();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const emailFromState = location.state?.email || '';

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<VerifyInputs>({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       email: emailFromState,
//     },
//   });

//   const onSubmit: SubmitHandler<VerifyInputs> = async (data) => {
//     try {
//       const response = await verifyUser(data).unwrap();
//       console.log('Verification response:', response);

//       toast.success('Account verified successfully!');
//       setTimeout(() => {
//         navigate('/login', {
//           state: { email: data.email },
//         });
//       }, 2000);
//     } catch (error) {
//       console.error('Verification error:', error);
//       toast.error('Verification failed. Please check your code and try again.');
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-800">
//       <div className="w-full max-w-md p-8 rounded-xl shadow-2xl bg-white">
//         <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-800">
//           Verify Your Account
//         </h1>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <input
//             type="email"
//             {...register('email')}
//             placeholder="Email"
//             className="input border border-blue-300 rounded w-full p-3 focus:ring-2 focus:ring-blue-600 text-lg"
//             readOnly={!!emailFromState}
//           />
//           {errors.email && (
//             <span className="text-red-600 text-sm">{errors.email.message}</span>
//           )}

//           <input
//             type="text"
//             {...register('code')}
//             placeholder="6 Digit Code"
//             maxLength={6}
//             className="input border border-blue-300 rounded w-full p-3 focus:ring-2 focus:ring-blue-600 text-lg"
//           />
//           {errors.code && (
//             <span className="text-red-600 text-sm">{errors.code.message}</span>
//           )}

//           <button
//             type="submit"
//             className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition"
//             disabled={isSubmitting}
//           >
//             {isLoading ? (
//               <>
//                 <span className="loading loading-bars loading-md" /> Verifying...
//               </>
//             ) : (
//               'Verify'
//             )}
//           </button>
//         </form>
//         <p className="mt-6 text-center text-blue-900">
//           Already verified?{' '}
//           <a href="/login" className="text-blue-700 hover:underline">
//             Login here
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default VerifyUser;

import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router';
import { userAPI } from '../features/users/userAPI';
import { toast } from 'sonner';

type VerifyInputs = {
  email: string;
  code: string;
};

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  code: yup
    .string()
    .matches(/^\d{6}$/, 'Code must be a 6 digit number')
    .required('Verification code is required'),
});

const VerifyUser = () => {
  const [verifyUser, { isLoading }] = userAPI.useVerifyUserMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromState = location.state?.email || '';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: emailFromState,
    },
  });

  const onSubmit: SubmitHandler<VerifyInputs> = async (data) => {
    try {
      const response = await verifyUser(data).unwrap();
      console.log('Verification response:', response);

      toast.success('Account verified successfully!');
      setTimeout(() => {
        navigate('/login', {
          state: { email: data.email },
        });
      }, 2000);
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Verification failed. Please check your code and try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-purple-900 via-indigo-800 to-blue-900 px-4">
      <div className="w-full max-w-md p-10 bg-base-100 rounded-2xl shadow-2xl animate-pulse animate-fade-up animate-infinite animate-duration-[3000ms] animate-ease-in-out animate-delay-200 animate-alternate">
        <h1 className="text-3xl font-extrabold text-center text-accent mb-6 animate-jump animate-delay-300">
          Verify Your Account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input
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
              type="text"
              {...register('code')}
              placeholder="6 Digit Code"
              maxLength={6}
              className="input input-bordered input-accent w-full text-base"
            />
            {errors.code && (
              <p className="text-error text-sm mt-1">{errors.code.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-accent w-full shadow-md hover:scale-105 transition-transform duration-300"
            disabled={isSubmitting}
          >
            {isLoading ? (
              <>
                <span className="loading loading-dots loading-md" /> Verifying...
              </>
            ) : (
              'Verify'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-accent">
          Already verified?{' '}
          <a href="/login" className="underline hover:text-primary">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default VerifyUser;

