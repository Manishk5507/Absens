import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  const navigate = useNavigate();
  const hanldeClick = () => {
    navigate("/reportMissing");
  };
  return (
    <div className="bg-[#CBCACA] p-8 lg:p-16  text-[Poppins] text-black tracking-wide ">
      <p className="text-lg lg:text-2xl text-black mb-6">
        Every missing person&apos;s story is a heart-wrenching puzzle, with
        pieces scattered across the world. You might hold that one tiny detail,
        that missing piece that could bring a loved one home.
      </p>
      <p className="text-lg lg:text-2xl  mb-6">
        <span className="font-semibold">Your contribution</span>, no matter how
        insignificant it may seem, has the&nbsp;
        <span className="relative inline-block underline-text">
          {" "}
          power to make the difference.
        </span>
      </p>
      <p className="text-lg lg:text-2xl mb-6">
        Your small piece might be the one that leads to a reunion,{" "}
        <span className="relative inline-block underline-text">
          {" "}
          a hug, and a heart made whole again.
        </span>
      </p>
      <p className="text-lg lg:text-2xl mb-8">
        If you have any information, even the tiniest, most fleeting
        recollection, please don&apos;t hesitate to get in touch. Your act of
        kindness could be the beacon of hope a family desperately needs.
      </p>
      <p className="text-xl lg:text-2xl font-bold mb-8">
        <span className="relative inline-block underline-text">
          Together, we believe we can bring the missing pieces home.
        </span>
      </p>
      <button
        type="button"
        onClick={hanldeClick}
        className="bg-red-600 text-white py-3 px-6 rounded-md text-lg lg:text-xl hover:bg-red-700 transition-all"
      >
        Submit Information
      </button>
    </div>
  );
};

export default CallToAction;
