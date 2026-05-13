export const getErrorMessage = (error: any): string => {
  // لو السيرفر رجّع message بالشكل اللي إنت كاتبه
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  // لو إنت رميت Error بنفسك
  if (error?.message) {
    return error.message;
  }

  return "Something went wrong";
};
