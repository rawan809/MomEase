import AddChild from "./AddChild";

type ChildPayload = {
  fullName: string;
  gender: string;
  birthDate: string;
  deliveryType: string;
  feedingTypeForBaby: string;
};

type ChildrenHeaderProps = {
  onAdd: (data: ChildPayload) => Promise<any>;
  onUpload: (id: number, photo: File) => Promise<void>;
};

function ChildrenHeader({ onAdd, onUpload }: ChildrenHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
      <div>
        <h1 className="text-xl font-bold">My Babies</h1>
        <p className="text-gray-500 mt-2">
          Manage your babies information and health details
        </p>
      </div>

      <AddChild onAdd={onAdd} onUpload={onUpload} />

      {/* <Link to={""} className="bg-primary text-white p-3  rounded-xl flex items-center gap-2 hover:opacity-90 transition-all">
        <FiPlus />
        Add Child
      </Link> */}
    </div>
  );
}

export default ChildrenHeader;
