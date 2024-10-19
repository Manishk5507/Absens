const handleOnClick = () => {
  // console.log(id);
  alert('This is a dummy button');
};


// eslint-disable-next-line react/prop-types
const MissingPersonCard = ({ image="", name="", missingSince="" }) => {
  return (
    <div className="bg-white shadow-md overflow-hidden text-center p-8">
      <img src={image} alt={name} className="w-full h-60 object-cover" />
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2 text-black">{name}</h2>
        <p className="text-gray-600 mb-4">Missing Since: {missingSince}</p>
        <button 
        onClick={handleOnClick}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default MissingPersonCard;
