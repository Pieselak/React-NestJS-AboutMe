export class UpdateProjectResponse {
  uuid: string;
  status: {
    code: string;
    label: string;
    icon: string;
    color: { code: string; label: string };
  };
  title: string;
  shortDescription: string;
  detailedDescription: string;
  imageUrl?: string;
  tags?: Array<{ name: string; icon: string }>;
  sourceCodeOpen: boolean;
  sourceCodeUrl?: string;
  developers?: Array<{
    name: string;
    role?: string;
    profileUrl?: string;
  }>;
  startDate?: string;
  completeDate?: string;
}
