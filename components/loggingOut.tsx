import { CircularProgress, Dialog, DialogTitle } from "@mui/material";

export default function LoggingOut({ loggingOut }: { loggingOut: boolean }) {
  return (
    <Dialog open={loggingOut}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <div className="flex flex-col items-center gap-4 p-5">
          <CircularProgress size={50} sx={{ color: "white" }} />
          <DialogTitle className="text-white">Logging Out...</DialogTitle>
        </div>
      </div>
    </Dialog>
  );
}
