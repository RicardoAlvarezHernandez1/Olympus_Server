// Interface for Achievement
export interface AchievementInterface {
  achievementId: number; // ID of the achievement
  achievementDescription: string; // Description of the achievement
  achievementUrlImage: string; // URL of the achievement image
  gived: boolean | null; // Indicates if the achievement is given
  user: []; // Array containing users who received the achievement
}
