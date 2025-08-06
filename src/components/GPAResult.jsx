const GPAResult = ({ gpa }) => {
  let message = '';
  let color = 'text-gray-700';

  const gpaValue = parseFloat(gpa);

  if (gpaValue >= 3.6) {
    message = 'Excellent!';
    color = 'text-green-600';
  } else if (gpaValue >= 3.2) {
    message = 'Very Good!';
    color = 'text-blue-600';
  } else if (gpaValue >= 2.8) {
    message = 'Good!';
    color = 'text-yellow-600';
  } else if (gpaValue >= 2.4) {
    message = 'Satisfactory';
    color = 'text-orange-500';
  } else if (gpaValue >= 2.0) {
    message = 'Acceptable';
    color = 'text-orange-600';
  } else if (gpaValue >= 1.6) {
    message = 'Minimum Requirement Met';
    color = 'text-amber-600';
  } else {
    message = 'NG - You need to reappear.';
    color = 'text-red-600';
  }

  return (
    <div className="mt-8 text-center bg-gray-100 p-6 rounded-xl shadow-md">
      <h2 className={`text-3xl font-bold ${color}`}>Your GPA: {gpa}</h2>
      <p className="mt-2 text-lg font-medium">{message}</p>
    </div>
  );
  
};

export default GPAResult;
