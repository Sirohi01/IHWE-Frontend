import React from 'react';
import { Link } from 'react-router-dom';
import msmeban from '../../assets/msmeban.png';

const MsmePmsSection = () => {
  return (
    <section className="w-full bg-white py-2 overflow-hidden">
      <div className="max-w-[1450px] mx-auto">
        <Link to="/msme-pms-scheme" className="block w-full">
          <img 
            src={msmeban} 
            alt="MSME PMS Scheme Banner" 
            className="w-full h-auto block"
            style={{ 
              border: 'none',
              borderRadius: '0',
              boxShadow: 'none'
            }}
          />
        </Link>
      </div>
    </section>
  );
};

export default MsmePmsSection;