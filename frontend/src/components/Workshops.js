import React from 'react';

const Workshops = () => {
  const workshops = [
    {
      date: '15',
      month: 'March 2024',
      title: 'Future of AI in Healthcare',
      speaker: 'Prof. Sarah Johnson (Harvard Medical School)',
      time: '6:00 PM IST | 8:30 AM EST'
    },
    {
      date: '22',
      month: 'March 2024',
      title: 'Research Paper Writing Masterclass',
      speaker: 'Dr. Michael Brown (Nature Journal Editor)',
      time: '7:00 PM IST | 9:30 AM EST'
    }
  ];

  return (
    <section className="section" id="workshops">
      <div className="container">
        <div className="section-title">
          <h2>Upcoming Workshops & Seminars</h2>
          <p>Join live sessions with global experts</p>
        </div>
        
        <div style={{ background: 'var(--card-bg)', borderRadius: '15px', padding: '40px', boxShadow: 'var(--shadow)', border: '1px solid var(--border-color)' }}>
          {workshops.map((workshop, index) => (
            <div
              key={index}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr 1fr',
                gap: '20px',
                alignItems: 'center',
                marginBottom: index < workshops.length - 1 ? '30px' : '0',
                paddingBottom: index < workshops.length - 1 ? '20px' : '0',
                borderBottom: index < workshops.length - 1 ? '1px solid var(--border-color)' : 'none'
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--secondary)' }}>
                  {workshop.date}
                </div>
                <div style={{ color: 'var(--text-color)' }}>{workshop.month}</div>
              </div>
              <div>
                <h3 style={{ marginBottom: '10px' }}>{workshop.title}</h3>
                <p>
                  <i className="fas fa-user" style={{ color: 'var(--secondary)', marginRight: '10px' }}></i>
                  {workshop.speaker}
                </p>
                <p>
                  <i className="fas fa-clock" style={{ color: 'var(--secondary)', marginRight: '10px' }}></i>
                  {workshop.time}
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <button className="btn btn-primary" style={{ display: 'block', marginBottom: '10px', width: '100%' }}>
                  Register Now
                </button>
                <a href="#" style={{ color: 'var(--secondary)', textDecoration: 'none' }}>
                  <i className="fas fa-download" style={{ marginRight: '5px' }}></i>
                  Download Poster
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workshops;

