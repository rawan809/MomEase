export const getNotificationRoute = (
  actionUrl?: string | null
): string | null => {
  if (!actionUrl) return null;

  // Community Post
  const postMatch = actionUrl.match(/^\/posts\/(\d+)/);
  if (postMatch) {
    return `/community/post/:${postMatch[1]}`;
  }

  // My Posts
  if (actionUrl === "/my-posts") {
    return "/community/my-posts";
  }

  // Tracking
  if (
    actionUrl === "/tracking" ||
    actionUrl.startsWith("/tracking/")
  ) {
    return "/babytracking";
  }

  // Mental Health
  if (
    actionUrl.startsWith("/mental-health")
  ) {
    return "/depression";
  }

  // Assessment Results
  const assessmentResultMatch = actionUrl.match(/^\/assessments\/results\/(\d+)/);
  if (assessmentResultMatch) {
    return `/assessment/0/result?resultId=${assessmentResultMatch[1]}`;
  }

  // Assessments
  if (
    actionUrl === "/assessments" ||
    actionUrl.startsWith("/assessments/")
  ) {
    return "/assessments";
  }

  return null;
};