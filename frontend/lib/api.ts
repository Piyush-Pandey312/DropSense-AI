const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export interface StudentFormData {
  name: string;
  roll: string;
  semester: number;
  sex: number;
  attendance: number;
  internal: number;
  assignment: number;
  backlog_count: number;
  sgpa_history: number[];
  feedback_text: string;
}

export async function runAnalysis(formData: StudentFormData) {
  const response = await fetch(`${BACKEND_URL}/api/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}
