
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { FaEdit } from "react-icons/fa";
// import { MdDeleteForever } from "react-icons/md";
// import UpdateAppointment from "./UpdateAppointment";
// import DeleteAppointment from "./DeleteAppointment";
// import CreatePayment from "../../AdminDashboard/payments/CreatePayment";
// import { appointmentsAPI, type TAppointment } from "../../../features/appointments/appointmentsAPI";
// import { toast } from "sonner";
// import type { RootState } from "../../../app/store";

// const UserAppointments = () => {
//   const [selectedAppointment, setSelectedAppointment] = useState<TAppointment | null>(null);
//   const [appointmentToDelete, setAppointmentToDelete] = useState<TAppointment | null>(null);
//   const [paymentAppointment, setPaymentAppointment] = useState<TAppointment | null>(null);

//   const [searchAppointmentID, setSearchAppointmentID] = useState("");
//   const [searchResult, setSearchResult] = useState<TAppointment | null>(null);

//   const userID = useSelector((state: RootState) => state.user.user?.userID);

//   const [getAppointmentById] = appointmentsAPI.useLazyGetAppointmentByIdQuery();

//   const {
//     data: appointmentsData,
//     isLoading: appointmentsLoading,
//     error: appointmentsError,
//     refetch,
//   } = appointmentsAPI.useGetAppointmentsByUserIdQuery(userID ?? 0, {
//     skip: !userID,
//     refetchOnMountOrArgChange: true,
//     pollingInterval: 10000,
//     refetchOnFocus: true,
//     refetchOnReconnect: true,
//   });

//   const handleEdit = (appointment: TAppointment) => {
//     setSelectedAppointment(appointment);
//     (document.getElementById("update_appointment_modal") as HTMLDialogElement)?.showModal();
//   };

//   const handleMakePayment = (appointment: TAppointment) => {
//     setPaymentAppointment(appointment);
//     (document.getElementById("create_payment_modal") as HTMLDialogElement)?.showModal();
//   };

//   const handleSearch = async () => {
//     setSearchResult(null);

//     if (!searchAppointmentID.trim()) {
//       toast.info("Enter an Appointment ID to search.");
//       return;
//     }

//     try {
//       const result = await getAppointmentById(parseInt(searchAppointmentID)).unwrap();
//       if (!result.appointment) {
//         toast.error("Appointment not found.");
//       } else if (result.appointment.userID !== userID) {
//         toast.error("You can only view your own appointments.");
//       } else {
//         setSearchResult(result.appointment);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Appointment not found.");
//     }
//   };

//   const renderStatusBadge = (status: string) => (
//     <span className={`badge ${status === "Confirmed" ? "badge-success" : "badge-warning"}`}>
//       <span className="lg:text-base text-white">{status}</span>
//     </span>
//   );

//   return (
//     <div>

//       <CreatePayment refetch={refetch} appointment={paymentAppointment} />
//       <UpdateAppointment appointment={selectedAppointment} refetch={refetch} />
//       <DeleteAppointment appointment={appointmentToDelete} refetch={refetch} />

//       <div className="flex flex-col sm:flex-row justify-between items-center mb-4 mt-4 gap-3">

//         <div className="flex flex-col sm:flex-row gap-2">
//           <input
//             type="text"
//             value={searchAppointmentID}
//             onChange={(e) => setSearchAppointmentID(e.target.value)}
//             placeholder="Search by Appointment ID"
//             className="input input-bordered p-2 rounded-md bg-white"
//           />
//           <button className="btn btn-primary bg-white text-black" onClick={handleSearch}>
//             Search
//           </button>
//         </div>
//       </div>

//       {searchResult ? (
//         <div className="overflow-x-auto mb-4">
//           <table className="table table-xs">
//             <thead>
//               <tr className="bg-blue-700 text-white text-md">
//                 <th>Appointment ID</th>
//                 <th>User ID</th>
//                 <th>Doctor ID</th>
//                 <th>Appointment Date</th>
//                 <th>Time Slot</th>
//                 <th>Total Amount</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr className="hover:bg-gray-300 border-b border-gray-400">
//                 <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{searchResult.appointmentID}</td>
//                 <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{searchResult.userID}</td>
//                 <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{searchResult.doctorID}</td>
//                 <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{searchResult.appointmentDate}</td>
//                 <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{searchResult.timeSlot}</td>
//                 <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{searchResult.totalAmount}</td>
//                 <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{renderStatusBadge(searchResult.appointmentStatus)}</td>
//                 <td className="flex">
//                   <button
//                     className="btn btn-sm btn-primary mr-4 text-blue-500"
//                     onClick={() => handleEdit(searchResult)}
//                   >
//                     <FaEdit size={20} />
//                   </button>
//                   <button
//                     className="btn btn-sm btn-danger text-red-500"
//                     onClick={() => {
//                       setAppointmentToDelete(searchResult);
//                       (document.getElementById("delete_appointment_modal") as HTMLDialogElement)?.showModal();
//                     }}
//                   >
//                     <MdDeleteForever size={20} />
//                   </button>
//                   <button
//                     className="btn bg-gray-600 text-white hover:bg-gray-700 border border-gray-400 rounded-lg px-4 py-2"
//                     onClick={() => handleMakePayment(searchResult)}
//                   >
//                     Make Payment
//                   </button>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <>
//           {appointmentsLoading && <p>Loading your Appointments...</p>}
//           {appointmentsError && <p className="text-red-500">Error fetching appointments.</p>}
//           {appointmentsData?.appointments?.length ? (
//             <div className="md:overflow-x-auto">
//               <table className="table table-xs">
//                 <thead>
//                   <tr className="bg-gray-600 text-white text-md lg:text-lg">
//                     <th>Appointment ID</th>
//                     <th>User ID</th>
//                     <th>Doctor ID</th>
//                     <th>Appointment Date</th>
//                     <th>Time Slot</th>
//                     <th>Total Amount</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {appointmentsData.appointments.map((appointment) => (
//                     <tr
//                       key={appointment.appointmentID}
//                       className="hover:bg-gray-300 border-b border-gray-400"
//                     >
//                       <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{appointment.appointmentID}</td>
//                       <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{appointment.userID}</td>
//                       <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{appointment.doctorID}</td>
//                       <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{appointment.appointmentDate}</td>
//                       <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{appointment.timeSlot}</td>
//                       <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{appointment.totalAmount}</td>
//                       <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{renderStatusBadge(appointment.appointmentStatus)}</td>
//                       <td className="flex">
//                         <button
//                           className="btn btn-sm btn-primary mr-4 text-blue-500"
//                           onClick={() => handleEdit(appointment)}
//                         >
//                           <FaEdit size={20} />
//                         </button>
//                         <button
//                           className="btn btn-sm btn-danger text-red-500"
//                           onClick={() => {
//                             setAppointmentToDelete(appointment);
//                             (
//                               document.getElementById(
//                                 "delete_appointment_modal"
//                               ) as HTMLDialogElement
//                             )?.showModal();
//                           }}
//                         >
//                           <MdDeleteForever size={20} />
//                         </button>
//                         <button
//                           className="btn bg-gray-600 text-white hover:bg-gray-700 border border-gray-400 rounded-lg px-4 py-2 text-lg ml-2"
//                           onClick={() => handleMakePayment(appointment)}
//                         >
//                           Make Payment
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             !appointmentsLoading && <p>No Appointments Found.</p>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default UserAppointments;



import { useState } from "react";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import UpdateAppointment from "./UpdateAppointment";
import DeleteAppointment from "./DeleteAppointment";
import CreatePayment from "../../AdminDashboard/payments/CreatePayment";
import InitiateMpesaPayment from "../../AdminDashboard/payments/InitiateMpesaPayment";
import { appointmentsAPI, type TAppointment } from "../../../features/appointments/appointmentsAPI";
import { toast } from "sonner";
import type { RootState } from "../../../app/store";

const UserAppointments = () => {
  const [selectedAppointment, setSelectedAppointment] = useState<TAppointment | null>(null);
  const [appointmentToDelete, setAppointmentToDelete] = useState<TAppointment | null>(null);
  const [paymentAppointment, setPaymentAppointment] = useState<TAppointment | null>(null);

  const [mpesaPaymentID, setMpesaPaymentID] = useState<number | null>(null);
  const [mpesaAmount, setMpesaAmount] = useState<number | null>(null);

  const [searchAppointmentID, setSearchAppointmentID] = useState("");
  const [searchResult, setSearchResult] = useState<TAppointment | null>(null);

  const userID = useSelector((state: RootState) => state.user.user?.userID);

  const [getAppointmentById] = appointmentsAPI.useLazyGetAppointmentByIdQuery();

  const {
    data: appointmentsData,
    isLoading: appointmentsLoading,
    error: appointmentsError,
    refetch,
  } = appointmentsAPI.useGetAppointmentsByUserIdQuery(userID ?? 0, {
    skip: !userID,
    refetchOnMountOrArgChange: true,
    pollingInterval: 10000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const handleEdit = (appointment: TAppointment) => {
    setSelectedAppointment(appointment);
    (document.getElementById("update_appointment_modal") as HTMLDialogElement)?.showModal();
  };

  const handleMakePayment = (appointment: TAppointment) => {
    setPaymentAppointment(appointment);
    (document.getElementById("create_payment_modal") as HTMLDialogElement)?.showModal();
  };

  const handlePaymentCreated = (paymentID: number, amount: number) => {
    setMpesaPaymentID(paymentID);
    setMpesaAmount(amount);

    toast.info("Initiating Mpesa payment...");

    setTimeout(() => {
      const modal = document.getElementById("initiate_mpesa_payment_modal") as HTMLDialogElement;
      modal?.showModal();
      modal?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const handleSearch = async () => {
    setSearchResult(null);

    if (!searchAppointmentID.trim()) {
      toast.info("Enter an Appointment ID to search.");
      return;
    }

    try {
      const result = await getAppointmentById(parseInt(searchAppointmentID)).unwrap();
      if (!result.appointment) {
        toast.error("Appointment not found.");
      } else if (result.appointment.userID !== userID) {
        toast.error("You can only view your own appointments.");
      } else {
        setSearchResult(result.appointment);
      }
    } catch (err) {
      console.error(err);
      toast.error("Appointment not found.");
    }
  };

  const renderStatusBadge = (status: string) => (
    <span className={`badge ${status === "Confirmed" ? "badge-success" : "badge-warning"}`}>
      <span className="lg:text-base text-white">{status}</span>
    </span>
  );

  return (
    <div>
      <CreatePayment
        refetch={refetch}
        appointment={paymentAppointment}
        onPaymentCreated={handlePaymentCreated} 
      />
      <InitiateMpesaPayment
        appointment={paymentAppointment}
        paymentID={mpesaPaymentID}
        amount={mpesaAmount}
        refetch={refetch} 
      />
      <UpdateAppointment appointment={selectedAppointment} refetch={refetch} />
      <DeleteAppointment appointment={appointmentToDelete} refetch={refetch} />

      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 mt-4 gap-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={searchAppointmentID}
            onChange={(e) => setSearchAppointmentID(e.target.value)}
            placeholder="Search by Appointment ID"
            className="input input-bordered p-2 rounded-md bg-white"
          />
          <button className="btn btn-primary bg-white text-black" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {searchResult ? (
        <div className="overflow-x-auto mb-4">
          <table className="table table-xs">
            <thead>
              <tr className="bg-blue-700 text-white text-md">
                <th>Appointment ID</th>
                <th>User ID</th>
                <th>Doctor ID</th>
                <th>Appointment Date</th>
                <th>Time Slot</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-300 border-b border-gray-400">
                <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{searchResult.appointmentID}</td>
                <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{searchResult.userID}</td>
                <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{searchResult.doctorID}</td>
                <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{searchResult.appointmentDate}</td>
                <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{searchResult.timeSlot}</td>
                <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{searchResult.totalAmount}</td>
                <td className="px-4 py-2 border-r border-gray-400 lg:text-base">
                  {renderStatusBadge(searchResult.appointmentStatus)}
                </td>
                <td className="flex">
                  <button
                    className="btn btn-sm btn-primary mr-4 text-blue-500"
                    onClick={() => handleEdit(searchResult)}
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    className="btn btn-sm btn-danger text-red-500"
                    onClick={() => {
                      setAppointmentToDelete(searchResult);
                      (
                        document.getElementById("delete_appointment_modal") as HTMLDialogElement
                      )?.showModal();
                    }}
                  >
                    <MdDeleteForever size={20} />
                  </button>
                  <button
                    className="btn bg-gray-600 text-white hover:bg-gray-700 border border-gray-400 rounded-lg px-4 py-2"
                    onClick={() => handleMakePayment(searchResult)}
                  >
                    Make Payment
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <>
          {appointmentsLoading && <p>Loading your Appointments...</p>}
          {appointmentsError && <p className="text-red-500">Error fetching appointments.</p>}
          {appointmentsData?.appointments?.length ? (
            <div className="md:overflow-x-auto">
              <table className="table table-xs">
                <thead>
                  <tr className="bg-gray-600 text-white text-md lg:text-lg">
                    <th>Appointment ID</th>
                    <th>User ID</th>
                    <th>Doctor ID</th>
                    <th>Appointment Date</th>
                    <th>Time Slot</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointmentsData.appointments.map((appointment) => (
                    <tr
                      key={appointment.appointmentID}
                      className="hover:bg-gray-300 border-b border-gray-400"
                    >
                      <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{appointment.appointmentID}</td>
                      <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{appointment.userID}</td>
                      <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{appointment.doctorID}</td>
                      <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{appointment.appointmentDate}</td>
                      <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{appointment.timeSlot}</td>
                      <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{appointment.totalAmount}</td>
                      <td className="px-4 py-2 border-r border-gray-400 lg:text-base">
                        {renderStatusBadge(appointment.appointmentStatus)}
                      </td>
                      <td className="flex">
                        <button
                          className="btn btn-sm btn-primary mr-4 text-blue-500"
                          onClick={() => handleEdit(appointment)}
                        >
                          <FaEdit size={20} />
                        </button>
                        <button
                          className="btn btn-sm btn-danger text-red-500"
                          onClick={() => {
                            setAppointmentToDelete(appointment);
                            (
                              document.getElementById("delete_appointment_modal") as HTMLDialogElement
                            )?.showModal();
                          }}
                        >
                          <MdDeleteForever size={20} />
                        </button>
                        <button
                          className="btn bg-gray-600 text-white hover:bg-gray-700 border border-gray-400 rounded-lg px-4 py-2 text-lg ml-2"
                          onClick={() => handleMakePayment(appointment)}
                        >
                          Make Payment
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            !appointmentsLoading && <p>No Appointments Found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default UserAppointments;
