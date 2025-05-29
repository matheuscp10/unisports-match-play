
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import PersonalDashboard from "./PersonalDashboard";

interface ProfileModalProps {
  children: React.ReactNode;
}

const ProfileModal = ({ children }: ProfileModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-black">My Profile</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <PersonalDashboard />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
