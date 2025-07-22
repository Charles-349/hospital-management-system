import {BarChart,Bar,XAxis,YAxis,Tooltip,ResponsiveContainer,PieChart,Pie,Cell,AreaChart,Area,CartesianGrid,LineChart,Line,Legend,} from 'recharts';
import { useSelector } from 'react-redux';
import { appointmentsAPI } from '../../../features/appointments/appointmentsAPI';
import { prescriptionsAPI } from '../../../features/prescription/prescriptionsAPI';
import type { RootState } from '../../../app/store';


const COLORS = ['#4F46E5', '#10B981'];


const trendData = [
  { name: 'Mon', appointments: 4, prescriptions: 2 },
  { name: 'Tue', appointments: 5, prescriptions: 3 },
  { name: 'Wed', appointments: 2, prescriptions: 1 },
  { name: 'Thu', appointments: 6, prescriptions: 4 },
  { name: 'Fri', appointments: 3, prescriptions: 2 },
  { name: 'Sat', appointments: 4, prescriptions: 1 },
  { name: 'Sun', appointments: 2, prescriptions: 1 },
];

const DoctorAnalysis = () => {
  const doctorID = useSelector((state: RootState) => state.user.user?.doctorID);

  const { data: doctorAppointments } =
    appointmentsAPI.useGetAppointmentsByDoctorIdQuery(doctorID ?? 0, {
      skip: !doctorID,
    });

  const { data: doctorPrescriptions } =
    prescriptionsAPI.useGetPrescriptionsByDoctorIdQuery(doctorID ?? 0, {
      skip: !doctorID,
    });

  const summaryData = [
    { label: 'Appointments', value: doctorAppointments?.appointments.length || 0 },
    { label: 'Prescriptions', value: doctorPrescriptions?.prescriptions.length || 0 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Doctor Dashboard</h1>

      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {summaryData.map((item) => (
          <div key={item.label} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">{item.label}</h2>
            <p className="text-2xl">{item.value}</p>
          </div>
        ))}
      </div>

   
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Overview Bar Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={summaryData}>
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Data Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={summaryData}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {summaryData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/*Area Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Weekly Trends (Area)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={trendData}>
            <defs>
              <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPrescriptions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="appointments" stroke="#4F46E5" fillOpacity={1} fill="url(#colorAppointments)" />
            <Area type="monotone" dataKey="prescriptions" stroke="#10B981" fillOpacity={1} fill="url(#colorPrescriptions)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/*Line Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Weekly Trends (Line)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="appointments" stroke="#4F46E5" />
            <Line type="monotone" dataKey="prescriptions" stroke="#10B981" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DoctorAnalysis;
