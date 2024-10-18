const MissingTextPortion = () => {
  return (
    <div className="flex flex-col min-h-[70vh] md:flex-row items-start md:items-center justify-between max-w-7xl mx-auto py-10 px-16 bg-white text-black">
      <div className="md:w-1/3 mb-6 md:mb-0 md:flex md:flex-col md:items-center ">
        <span className="md:text-7xl text-5xl font-semibold mb-4">Missing </span>
        <span className="md:text-7xl text-5xl font-semibold">People</span>
      </div>
      <div className="md:w-2/3">
        <p className="text-gray-600 mb-4">
          We are actively working on a number of missing people investigations.
          To facilitate this work, we deploy teams of trained, community
          volunteers and university students to review and investigate unsolved
          missing person and unidentified remains cases.
        </p>
        <p className="text-gray-600">
          Through our National Cold Case Analysis Project, we are able to draw
          on these resources to both harness and mobilise the skills and energy
          of over 200 volunteers, each offering a broad range of professional,
          academic, and personal experiences and skills.
        </p>
      </div>
    </div>
  );
};

export default MissingTextPortion;
