export class CreateProjectDto {
  status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD' | 'CANCELLED';
  title: string;
  shortDescription: string;
  detailedDescription: string;
  imageUrl?: string;
  tags?: string[];
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
