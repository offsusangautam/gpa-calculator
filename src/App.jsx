import React, { useState, useEffect } from 'react';
import SubjectInput from './components/SubjectInput';
import GPAResult from './components/GPAResult';
import { calculateGPA } from './utils/gpaUtils';

// Updated subject data — credit=3, theory=0.75, practical=0.25
const subjectData = {
  '10': [
    { name: 'English', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25 },
    { name: 'Nepali', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25 },
    { name: 'Mathematics', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25 },
    { name: 'Social Studies', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25 },
    { name: 'E.P.H. (Health)', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25 },
    { name: 'Optional Subject', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25, isOptional: true },
  ],
  '11-science': [
    { name: 'English', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25 },
    { name: 'Nepali', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25 },
    { name: 'Physics', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25 },
    { name: 'Chemistry', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25 },
    { name: 'Mathematics', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25 },
    { name: 'Computer Science / Biology', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25, isOptional: true },
  ],
  '12-science': [
    { name: 'English', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25 },
    { name: 'Nepali', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25 },
    { name: 'Physics', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25 },
    { name: 'Chemistry', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25 },
    { name: 'Mathematics', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25 },
    { name: 'Computer Science / Biology', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25, isOptional: true },
  ],
  '11-mgmt': [
    { name: 'Nepali', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25, isOptional: false },
    { name: 'English', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25, isOptional: false },
    { name: 'Social Studies', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25, isOptional: false },
    { name: 'Optional I', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25, isOptional: true },
    { name: 'Optional II', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25, isOptional: true },
    { name: 'Optional III', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25, isOptional: true },
    { name: 'Optional (Additional)', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25, isOptional: true },
  ],
  '12-mgmt': [
    { name: 'Nepali', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25, isOptional: false },
    { name: 'English', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25, isOptional: false },
    { name: 'Life Skill', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25, isOptional: false },
    { name: 'Optional I', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25, isOptional: true },
    { name: 'Optional II', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25, isOptional: true },
    { name: 'Optional III', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25, isOptional: true },
    { name: 'Optional (Additional)', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25, isOptional: true },
  ],
};

// Landing Page Component
const LandingPage = ({ onStart }) => (
  <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700 text-white min-h-screen flex flex-col justify-center items-center px-6 md:px-20 text-center">
    <div className="absolute top-10 left-10 w-40 h-40 bg-purple-400 rounded-full opacity-20 animate-pulse"></div>
    <div className="absolute bottom-20 right-10 w-60 h-60 bg-indigo-400 rounded-full opacity-15 animate-pulse"></div>

    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
      NEB GPA Calculator 2082
    </h1>

    <p className="max-w-3xl text-lg md:text-xl mb-10 drop-shadow-md">
      Easily calculate your GPA for Class 10, 11, and 12 according to the latest NEB grading system. Enter your grades and get instant results with theory and practical weightage taken into account.
    </p>

    <button
      onClick={onStart}
      className="bg-white text-blue-700 font-semibold px-8 py-4 rounded-full shadow-lg hover:scale-105 transform transition duration-300"
      aria-label="Start GPA Calculator"
    >
      Start Calculating
    </button>

    <footer className="absolute bottom-8 text-sm opacity-50">
      Developed by <span className="font-semibold">Your Name</span>
    </footer>
  </section>
);

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [selectedClassStream, setSelectedClassStream] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [gpa, setGpa] = useState(null);

  useEffect(() => {
    if (!selectedClassStream) {
      setSubjects([]);
      setGpa(null);
      return;
    }
    const subs = (subjectData[selectedClassStream] || []).map((subj) => ({
      ...subj,
      theoryGrade: '',
      practicalGrade: '',
      optionalName: subj.isOptional ? subj.name : subj.name,
    }));
    setSubjects(subs);
    setGpa(null);
  }, [selectedClassStream]);

  const handleClassStreamChange = (e) => {
    setSelectedClassStream(e.target.value);
  };

  const updateSubject = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  };

  const handleCalculate = () => {
    for (const s of subjects) {
      if (!s.theoryGrade) {
        alert(`Please select theory grade for ${s.isOptional ? s.optionalName : s.name}`);
        return;
      }
      if (s.practicalWeight > 0 && !s.practicalGrade) {
        alert(`Please select practical grade for ${s.isOptional ? s.optionalName : s.name}`);
        return;
      }
      if (s.isOptional && (!s.optionalName || s.optionalName.trim() === '')) {
        alert('Please enter name for all optional subjects.');
        return;
      }
    }
    const calculatedGPA = calculateGPA(subjects);
    setGpa(calculatedGPA);
  };

  if (showLanding) {
    return <LandingPage onStart={() => setShowLanding(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-6 md:p-10">
        <button
          onClick={() => setShowLanding(true)}
          className="mb-6 text-blue-600 hover:underline"
        >
          ← Back to Home
        </button>

        <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
          NEB GPA Calculator 2082
        </h1>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Select Class & Stream:
          </label>
          <select
            value={selectedClassStream}
            onChange={handleClassStreamChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Choose Class & Stream --</option>
            <option value="10">Class 10 (SEE)</option>
            <option value="11-science">Class 11 - Science</option>
            <option value="12-science">Class 12 - Science</option>
            <option value="11-mgmt">Class 11 - Management</option>
            <option value="12-mgmt">Class 12 - Management</option>
          </select>
        </div>

        {selectedClassStream && (
          <>
            <SubjectInput subjects={subjects} updateSubject={updateSubject} />
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleCalculate}
                className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2 rounded-lg transition duration-200 shadow"
              >
                Calculate GPA
              </button>
            </div>
          </>
        )}

        {gpa && <GPAResult gpa={gpa} />}
      </div>
    </div>
  );
}

export default App;
