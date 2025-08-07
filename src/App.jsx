import React, { useState, useEffect } from 'react';
import SubjectInput from './components/SubjectInput';
import GPAResult from './components/GPAResult';
import { calculateGPA } from './utils/gpaUtils';

// Subject data
const subjectData = {
  '10': [
    { name: 'English', credit: 4, theoryWeight: 0.75, practicalWeight: 0.25 },
    { name: 'Nepali', credit: 4, theoryWeight: 0.75, practicalWeight: 0.25 },
    { name: 'Mathematics', credit: 4, theoryWeight: 0.75, practicalWeight: 0.25 },
    { name: 'Social Studies', credit: 4, theoryWeight: 0.75, practicalWeight: 0.25 },
    { name: 'Science', credit: 4, theoryWeight: 0.75, practicalWeight: 0.25 },
    { name: 'Optional Subject', credit: 4, theoryWeight: 0.75, practicalWeight: 0.25, isOptional: true },
    { name: 'Optional Subject', credit: 4, theoryWeight: 0.75, practicalWeight: 0.25, isOptional: true },
  ],
  '11-science': [
    { name: 'English', credit: 4, theoryWeight: 0.75, practicalWeight: 0.25 },
    { name: 'Nepali', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25 },
    { name: 'Physics', credit: 5, theoryWeight: 0.75, practicalWeight: 0.25 },
    { name: 'Chemistry', credit: 5, theoryWeight: 0.75, practicalWeight: 0.25 },
    { name: 'Mathematics', credit: 5, theoryWeight: 0.75, practicalWeight: 0.25 },
    { name: 'Computer Science / Biology', credit: 5, theoryWeight: 0.75, practicalWeight: 0.25, isOptional: true },
  ],
  '12-science': [
    { name: 'English', credit: 4, theoryWeight: 0.75, practicalWeight: 0.25 },
    { name: 'Nepali', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25 },
    { name: 'Physics', credit: 5, theoryWeight: 0.75, practicalWeight: 0.25 },
    { name: 'Chemistry', credit: 5, theoryWeight: 0.75, practicalWeight: 0.25 },
    { name: 'Mathematics', credit: 5, theoryWeight: 0.75, practicalWeight: 0.25 },
    { name: 'Computer Science / Biology', credit: 5, theoryWeight: 0.75, practicalWeight: 0.25, isOptional: true },
  ],
  '11-mgmt': [
    { name: 'Nepali', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25, isOptional: false },
    { name: 'English', credit: 4, theoryWeight: 0.75, practicalWeight: 0.25, isOptional: false },
    { name: 'Social Studies', credit: 5, theoryWeight: 0.75, practicalWeight: 0.25, isOptional: false },
    { name: 'Optional I', credit: 5, theoryWeight: 0.75, practicalWeight: 0.25, isOptional: true },
    { name: 'Optional II', credit: 5, theoryWeight: 0.75, practicalWeight: 0.25, isOptional: true },
    { name: 'Optional III', credit: 5, theoryWeight: 0.75, practicalWeight: 0.25, isOptional: true },
    { name: 'Optional (Additional)', credit: 5, theoryWeight: 0.75, practicalWeight: 0.25, isOptional: true },
  ],
  '12-mgmt': [
    { name: 'Nepali', credit: 3, theoryWeight: 0.75, practicalWeight: 0.25, isOptional: false },
    { name: 'English', credit: 4, theoryWeight: 0.75, practicalWeight: 0.25, isOptional: false },
    { name: 'Social', credit: 5, theoryWeight: 0.75, practicalWeight: 0.25, isOptional: false },
    { name: 'Optional I', credit: 5, theoryWeight: 0.75, practicalWeight: 0.25, isOptional: true },
    { name: 'Optional II', credit: 5, theoryWeight: 0.75, practicalWeight: 0.25, isOptional: true },
    { name: 'Optional III', credit: 5, theoryWeight: 0.75, practicalWeight: 0.25, isOptional: true },
    { name: 'Optional (Additional)', credit: 5, theoryWeight: 0.75, practicalWeight: 0.25, isOptional: true },
  ],
};

// Landing Page Component
const LandingPage = ({ onStart }) => (
  <section className="relative bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-800 text-white min-h-screen flex flex-col justify-center items-center px-6 md:px-20 text-center">
    <div className="absolute top-10 left-10 w-44 h-44 bg-purple-500 rounded-full opacity-20 animate-pulse"></div>


    <h1 className="text-6xl font-extrabold mb-8 drop-shadow-lg">
      NEB GPA Calculator 
    </h1>

    <p className="max-w-3xl text-xl mb-12 drop-shadow-md leading-relaxed">
      Easily calculate your GPA for Class 10, 11, and 12 according to the latest NEB grading system.
      Enter your grades and get instant results with theory and practical weightage taken into account.
    </p>

    <button
      onClick={onStart}
      className="bg-white text-blue-800 font-bold px-10 py-4 rounded-full shadow-lg hover:scale-110 transform transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
      aria-label="Start GPA Calculator"
    >
      Start Calculating
    </button>

    <footer className="absolute bottom-8 text-sm opacity-50">
      Developed by <span className="font-semibold">Susan Gautam</span>
    </footer>
  </section>
);

// LoadAdScript Component
const LoadAdScript = ({ src, containerId }) => {
  useEffect(() => {
    if (!src) return;
    const container = document.getElementById(containerId);
    if (!container) return;

    const script = document.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.async = true;

    container.appendChild(script);

    return () => {
      if (container.contains(script)) {
        container.removeChild(script);
      }
    };
  }, [src, containerId]);

  return null;
};

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

  const adScripts = [
    "//pl27358121.profitableratecpm.com/7a/1b/d5/7a1bd577e12489adea7381055c2af279.js",
    "//www.highperformanceformat.com/16a83966b394294dc0f273f36ca0612b/invoke.js",
    "//www.highperformanceformat.com/f748b3f601f34198ec43c41c4f32b928/invoke.js",
    "//www.highperformanceformat.com/b4cf96d4cd512b4a34866af0ebd867e2/invoke.js",
    "//www.highperformanceformat.com/a81579c43e49c7c105d092fdf01d5dd7/invoke.js",
    "//www.highperformanceformat.com/f8eb6a6e6ca8b5d4befdc237dedb9514/invoke.js",
    '//pl27358153.profitableratecpm.com/f4/3a/d9/f43ad94a6a595b670f6f98dad3b22a94.js',
    "//www.highperformanceformat.com/37ad96a8e470ebb65ecfb3219f8c61da/invoke.js",
    "//pl27358156.profitableratecpm.com/272d2efadb9026c55995c3c274f8b351/invoke.js",
  ];

  if (showLanding) {
    return <LandingPage onStart={() => setShowLanding(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-6 md:px-12">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-8 md:p-12">
        <button
          onClick={() => setShowLanding(true)}
          className="mb-8 text-blue-700 hover:underline font-semibold text-lg"
        >
          ← Back to Home
        </button>

        <h1 className="text-5xl font-extrabold mb-10 text-center text-blue-700 tracking-tight">
          NEB GPA Calculator
        </h1>

        <div className="mb-8">
          <label className="block text-xl font-medium text-gray-800 mb-3">
            Select Class & Stream:
          </label>
          <select
            value={selectedClassStream}
            onChange={handleClassStreamChange}
            className="w-full border border-gray-300 p-3 rounded-lg text-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
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
            <SubjectInput
              subjects={subjects}
              updateSubject={updateSubject}
              className="mb-10"
            />

            <div className="flex justify-center">
              <button
                onClick={handleCalculate}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-xl mt-10 shadow-lg transition duration-300 focus:outline-none focus:ring-4 focus:ring-green-400"
              >
                Calculate GPA
              </button>
            </div>
          </>
        )}

        {gpa && (
          <div className="mt-12">
            <GPAResult gpa={gpa} />
          </div>
        )}

        {/* Ads Section */}
        <div className="mt-16 space-y-16 border-t border-gray-200 pt-12">
  {adScripts.map((src, index) => (
    <div
      key={index}
      id={`ad-container-${index}`}
      className="w-full flex justify-center shadow-md rounded-lg overflow-hidden bg-white"
    >
      <LoadAdScript src={src} containerId={`ad-container-${index}`} />
    </div>
  ))}
</div>

      
      </div>
    </div>
  );
}

export default App;