export const apiVersion = "/v1";
export const courses = `${apiVersion}/courses-management`;
export const users = `${apiVersion}/users`;
export const chapters = `${apiVersion}/chapters-management`;
export const purchases = `${apiVersion}/purchases`;
export const instructors = `${apiVersion}/instructors`;
export default function Api() {
  return {
    apiVersion: apiVersion,
    courses: courses,
    chapters: chapters,
    users: users,
    purchases: purchases,
    instructors: instructors,
  };
}
