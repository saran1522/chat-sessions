import Sidebar from "../Components/Sidebar";

function Home() {
  return (
    <>
      <div className="max-md:hidden flex-grow bg-slate-100  flex justify-center items-center w-full">
        <p className="text-xl">Click on any chat to start</p>
      </div>
      <div className="md:hidden">
        <Sidebar />
      </div>
    </>
  );
}

export default Home;
