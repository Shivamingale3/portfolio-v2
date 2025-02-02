import Typography from "@mui/material/Typography";

export default function DashboardSkeleton() {
  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col justify-center items-center">
      {/* Screen */}
      <div
        className="border border-solid border-white border-opacity-10 rounded-xl w-1/3 h-1/3 flex justify-center items-center space-x-2 gap-1 p-5 relative overflow-hidden animate-bounce"
        id="skeleton"
      >
        <div
          className="bg-gray-200 rounded-xl h-full w-1/5 opacity-10 border border-solid border-white border-opacity-70"
          id="sidebar"
        ></div>
        <div
          className="w-full h-full flex flex-col gap-2"
          id="dashboard-components"
        >
          <div className="flex h-full w-full space-x-2" id="top-4">
            <div className="bg-gray-200 rounded-xl w-1/4 h-5/6 opacity-10 border border-solid border-white border-opacity-70"></div>
            <div className="bg-gray-200 rounded-xl w-1/4 h-5/6 opacity-10 border border-solid border-white border-opacity-70"></div>
            <div className="bg-gray-200 rounded-xl w-1/4 h-5/6 opacity-10 border border-solid border-white border-opacity-70"></div>
            <div className="bg-gray-200 rounded-xl w-1/4 h-5/6 opacity-10 border border-solid border-white border-opacity-70"></div>
          </div>
          <div className="flex h-full w-full space-x-2 mt-[-4px]" id="next-2">
            <div className="bg-gray-200 rounded-xl w-2/6 h-full opacity-10 border border-solid border-white border-opacity-70"></div>
            <div className="bg-gray-200 rounded-xl w-3/6 h-full opacity-10 border border-solid border-white border-opacity-70"></div>
            <div className="bg-gray-200 rounded-xl w-1/6 h-full opacity-10 border border-solid border-white border-opacity-70"></div>
          </div>
          <div className="flex h-full w-full space-x-2" id="next-2">
            <div className="bg-gray-200 rounded-xl w-2/6 h-full opacity-10 border border-solid border-white border-opacity-70"></div>
            <div className="bg-gray-200 rounded-xl w-2/6 h-full opacity-10 border border-solid border-white border-opacity-70"></div>
            <div className="bg-gray-200 rounded-xl w-2/6 h-full opacity-10 border border-solid border-white border-opacity-70"></div>
          </div>
          <div className="flex h-full w-full space-x-2" id="next-2">
            <div className="bg-gray-200 rounded-xl w-2/4 h-full opacity-10"></div>
            <div className="bg-gray-200 rounded-xl w-2/4 h-full opacity-10"></div>
          </div>
        </div>
      </div>
      <div className="mt-5 animate-pulse">
        <Typography variant="h2" component="div">
          Setting things up...
        </Typography>
      </div>
    </div>
  );
}
