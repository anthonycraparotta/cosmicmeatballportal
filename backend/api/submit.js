import supabaseClient from "../lib/supabaseClient.js";

const TABLE_NAME = "lead_submissions";

const emailRegex = /^(?:[a-zA-Z0-9_'^&/+-])+(?:\.(?:[a-zA-Z0-9_'^&/+-])+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/u;

export async function handleSubmit(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, referral } = req.body;

  // Validation
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Please provide a valid email address" });
  }

  try {
    const { error } = await supabaseClient.from(TABLE_NAME).insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      referral_source: referral?.trim() || null,
    });

    if (error) {
      // Handle duplicate email
      if (error.code === "23505") {
        return res.status(409).json({ error: "This email has already been registered" });
      }
      throw error;
    }

    return res.status(200).json({
      message: "Access credentials received",
      success: true
    });
  } catch (error) {
    console.error("Submission error:", error);
    const message =
      error instanceof Error ? error.message : "Unexpected error while submitting the form";
    return res.status(500).json({ error: message });
  }
}
