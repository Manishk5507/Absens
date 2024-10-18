
const Guidelines = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Guidelines for Reporting Missing Persons</h1>
        <p className="text-gray-600 mb-6">
          Our platform allows volunteers to help find missing people using AI image matching technology.
          Please follow the guidelines below to ensure the process is efficient and ethical:
        </p>
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-xl font-semibold text-gray-700">1. Uploading Images</h2>
            <p className="text-gray-600">
              - Ensure the image is clear and recent. Avoid uploading low-quality or pixelated images.<br/>
              - If multiple images are available, choose the one that provides the best facial details.<br/>
              - Do not upload images without proper consent.
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-xl font-semibold text-gray-700">2. Providing Details</h2>
            <p className="text-gray-600">
              - Provide any additional information about the missing person, such as name, age, last seen location, and any distinctive features.<br/>
              - The more details provided, the higher the chances of matching with existing database entries.
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-xl font-semibold text-gray-700">3. Respecting Privacy</h2>
            <p className="text-gray-600">
              - Avoid sharing sensitive personal information unnecessarily.<br/>
              - Only report genuine cases of missing individuals. False reports may lead to account suspension.
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-xl font-semibold text-gray-700">4. Notifying Authorities</h2>
            <p className="text-gray-600">
              - While our platform uses AI to help identify potential matches, it is still essential to notify local authorities about a missing person.<br/>
              - Our platform should complement, not replace, official missing person reports.
            </p>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-gray-500 text-sm">
            Note: Our AI system will notify users if a potential match is found. In case of no matches, the uploaded image will remain in the database for future cross-checks.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Guidelines;
