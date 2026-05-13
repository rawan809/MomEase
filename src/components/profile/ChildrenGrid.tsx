import ChildCard from "./ChildCard";

type Props = {
  children: any[];
  onDelete: (childId: number) => Promise<void>;
  onEdit: (id: number, data: any) => Promise<any>;
  onUploadPhoto: (id: number, photo: File) => Promise<void>;
  onDeletePhoto: (id: number) => Promise<void>;
};

function ChildrenGrid({
  children,
  onDelete,
  onEdit,
  onDeletePhoto,
  onUploadPhoto,
}: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {children.map((child) => (
        <ChildCard
          key={child.childId}
          child={child}
          onDelete={onDelete}
          onEdit={onEdit}
          onDeletePhoto={onDeletePhoto}
          onUploadPhoto={onUploadPhoto}
        />
      ))}
    </div>
  );
}

export default ChildrenGrid;
