"use server";

import { generateAttendanceInsights } from "@/ai/flows/generate-attendance-insights";
import { attendanceData } from "@/lib/mock-data";

export async function getAttendanceInsightsAction(): Promise<{
  success: boolean;
  insights?: string;
  error?: string;
}> {
  try {
    // In a real app, you would filter or fetch the relevant data
    const insightsResult = await generateAttendanceInsights({
      attendanceData: JSON.stringify(attendanceData),
    });

    if (insightsResult?.insights) {
      return { success: true, insights: insightsResult.insights };
    }
    return { success: false, error: "Failed to generate insights." };

  } catch (error) {
    console.error("Error generating attendance insights:", error);
    return {
      success: false,
      error: "An unexpected error occurred while generating insights.",
    };
  }
}
