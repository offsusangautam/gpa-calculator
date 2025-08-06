const gradeOptions = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'NG'];

const SubjectInput = ({ subjects, updateSubject }) => {
  const handleChange = (index, field, value) => {
    updateSubject(index, field, value);
  };

  return (
    <div className="space-y-8">
      {subjects.map((subject, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                Subject Name
              </label>
              <input
                type="text"
                value={subject.isOptional ? subject.optionalName || subject.name : subject.name}
                disabled={!subject.isOptional}
                onChange={
                  subject.isOptional
                    ? (e) => handleChange(index, 'optionalName', e.target.value)
                    : undefined
                }
                placeholder={subject.isOptional ? "Enter optional subject name" : ""}
                className={`w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  subject.isOptional ? 'bg-white cursor-text' : 'bg-gray-100 cursor-not-allowed'
                }`}
              />
            </div>

            <div className="w-28">
              <label className="block text-sm font-semibold text-gray-800 mb-1 text-center">
                Credit Hour
              </label>
              <input
                type="number"
                value={subject.credit}
                disabled
                className="w-full rounded-md border border-gray-300 bg-gray-100 text-center py-2 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                Theory Grade
              </label>
              <select
                value={subject.theoryGrade}
                onChange={(e) => handleChange(index, 'theoryGrade', e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">-- Select --</option>
                {gradeOptions.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>

            {subject.practicalWeight > 0 && (
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">
                  Practical Grade
                </label>
                <select
                  value={subject.practicalGrade}
                  onChange={(e) => handleChange(index, 'practicalGrade', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">-- Select --</option>
                  {gradeOptions.map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubjectInput;
