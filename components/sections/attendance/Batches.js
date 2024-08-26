import { useEffect, useState } from 'react';

const Batches = () => {
  const [batch, setBatch] = useState([]);
  let batches = ['morning', 'afternoon', 'evening'];

  useEffect(() => {
    setBatch(batches);
  }, []);
  return (
    <div class="wrapper">
      {batch &&
        batch.map((val,index) => (
          <a href="" key={index}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            {val}
          </a>
        ))}
     
    </div>
  );
};

export default Batches;
