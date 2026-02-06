import React from 'react';

const Faculty = () => {
  const facultyMembers = [
    {
      icon: 'fas fa-user-tie',
      name: 'Dr. HIMADRI NATH SAHA',
      title: 'Professor of Computer Science, MIT',
      description: 'PhD from Stanford, 50+ publications in AI/ML, NSF Career Award recipient',
      areas: 'AI Ethics, Machine Learning'
    },
    {
      icon: 'fas fa-user-md',
      name: 'Prof. HIMADRI NATH SAHA',
      title: 'Biotechnology Research Head, Cambridge',
      description: 'Former Research Director at Pfizer, 30+ patents in drug discovery',
      areas: 'Drug Discovery, CRISPR'
    },
    {
      icon: 'fas fa-atom',
      name: 'Dr. HIMADRI NATH SAHA',
      title: 'Quantum Computing Lab, IISc Bangalore',
      description: 'Young Scientist Awardee, DST-Inspire Faculty, 40+ publications',
      areas: 'Quantum Computing, Cryptography'
    }
  ];

  return (
    <section className="section faculty-section" id="faculty">
      <div className="container">
        <div className="section-title">
          <h2>Our Felicitators</h2>
          <p>Learn from world-renowned professors and researchers</p>
        </div>
        
        <div className="faculty-grid">
          {facultyMembers.map((faculty, index) => (
            <div key={index} className="faculty-card">
              <div className="faculty-img">
                <i className={faculty.icon}></i>
              </div>
              <div className="faculty-info">
                <h3>{faculty.name}</h3>
                <p className="faculty-title">{faculty.title}</p>
                <p>{faculty.description}</p>
                <p style={{ marginTop: '10px' }}>
                  <strong>Areas:</strong> {faculty.areas}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faculty;

