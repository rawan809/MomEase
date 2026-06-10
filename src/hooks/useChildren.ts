import { useChild } from "@/contexts/ChildContext";
export type { Child, ChildPayload } from "@/contexts/ChildContext";

export function useChildren() {
  const context = useChild();

  return {
    children: context.children,
    selectedChild: context.selectedChild,
    loading: context.loading,

    // fetch
    fetchChildren: context.fetchChildren,
    fetchChildById: context.fetchChildById,

    // CRUD
    addChild: context.addChild,
    editChild: context.editChild,
    deleteChild: context.deleteChild,

    // photo
    uploadPhoto: context.uploadPhoto,
    deletePhoto: context.deletePhoto,
  };
}

