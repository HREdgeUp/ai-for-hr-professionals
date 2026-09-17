// CLEAR Prompt Builder
document.getElementById("build-prompt-btn").addEventListener("click", () => {
  const context = document.getElementById("context").value.trim();
  const language = document.getElementById("language").value.trim();
  const examples = document.getElementById("examples").value.trim();
  const ask = document.getElementById("ask").value.trim();
  const refine = document.getElementById("refine").value.trim();

  let prompt = "";

  if (context) {
    prompt += `Context: ${context}\n\n`;
  }
  if (language) {
    prompt += `Language/Tone: ${language}\n\n`;
  }
  if (examples) {
    prompt += `Examples of "good": ${examples}\n\n`;
  }
  if (ask) {
    prompt += `Ask: ${ask}\n\n`;
  }
  if (refine) {
    prompt += `Refine: ${refine}\n\n`;
  }

  if (!prompt) {
    prompt = "Add at least one CLEAR element to generate a prompt.";
  }

  document.getElementById("generated-prompt").value = prompt;
});

// Prompt Strength Tester
document.getElementById("score-prompt-btn").addEventListener("click", () => {
  const promptText = document.getElementById("prompt-input").value.trim();
  const summaryEl = document.getElementById("score-summary");
  const breakdownEl = document.getElementById("score-breakdown");
  breakdownEl.innerHTML = "";

  if (!promptText) {
    summaryEl.textContent = "Please paste a prompt to score.";
    return;
  }

  // Simple heuristic scoring based on CLEAR-like signals
  document.getElementById("score-prompt-btn").addEventListener("click", () => {
  const promptText = document.getElementById("prompt-input").value.trim();
  const summaryEl = document.getElementById("score-summary");
  const breakdownEl = document.getElementById("score-breakdown");
  const tipsEl = document.getElementById("score-tips");
  const improvedEl = document.getElementById("improved-prompt");
  const resultsSection = document.getElementById("score-results");

  breakdownEl.innerHTML = "";
  tipsEl.innerHTML = "";
  improvedEl.value = "";

  if (!promptText) {
    summaryEl.textContent = "Please paste a prompt to score.";
    resultsSection.style.display = "block";
    return;
  }

  let score = 0;
  const breakdown = [];
  const tips = [];

  // --- CLEAR scoring logic ---
  const context = /(team|manager|HR|company|organization|role|situation)/i.test(promptText);
  const language = /(tone|professional|warm|empathetic|direct|friendly)/i.test(promptText);
  const examples = /(example|sample|such as|here is)/i.test(promptText);
  const ask = /(draft|write|create|generate|help|summarize|build)/i.test(promptText);
  const refine = /(refine|shorten|rewrite|adjust|iterate)/i.test(promptText);

  // Context
  if (context) {
    score += 20;
    breakdown.push("Context: Strong — clear situational details detected.");
  } else {
    breakdown.push("Context: Weak — add role, team, situation, or business need.");
    tips.push("Add more context: who you are, the team, the situation, and the goal.");
  }

  // Language
  if (language) {
    score += 15;
    breakdown.push("Language/Tone: Strong — tone or audience specified.");
  } else {
    breakdown.push("Language/Tone: Weak — specify tone or audience.");
    tips.push("Add tone guidance such as 'professional but warm' or 'frontline-friendly'.");
  }

  // Examples
  if (examples) {
    score += 15;
    breakdown.push("Examples: Strong — examples of 'good' detected.");
  } else {
    breakdown.push("Examples: Missing — examples dramatically improve output quality.");
    tips.push("Add 1–2 examples of what 'good' looks like.");
  }

  // Ask
  if (ask) {
    score += 25;
    breakdown.push("Ask: Strong — clear request detected.");
  } else {
    breakdown.push("Ask: Weak — state exactly what you want AI to produce.");
    tips.push("State your ask clearly: draft, summarize, rewrite, compare, or build.");
  }

  // Refine
  if (refine) {
    score += 15;
    breakdown.push("Refinement: Strong — iterative instructions detected.");
  } else {
    breakdown.push("Refinement: Missing — add follow-up instructions.");
    tips.push("Add refinement instructions like 'shorten by 30%' or 'make more empathetic'.");
  }

  // Structure
  const structure = /[\n\-•]|1\./.test(promptText);
  if (structure) {
    score += 10;
    breakdown.push("Structure: Present — lists or steps detected.");
  } else {
    breakdown.push("Structure: Minimal — consider adding bullets or sections.");
    tips.push("Add bullets or numbered steps to improve clarity.");
  }

  if (score > 100) score = 100;

  // --- Improved prompt generation ---
  const improvedPrompt = `
Context: ${context ? "As stated in your prompt." : "Add role, team, situation, and business need."}

Language/Tone: ${language ? "Use the tone you specified." : "Add tone guidance such as 'professional but warm'."}

Examples: ${examples ? "Include the examples you referenced." : "Add 1–2 examples of what 'good' looks like."}

Ask: ${ask ? "Your ask is clear." : "State exactly what you want AI to produce."}

Refine: ${refine ? "Your refinement instructions are helpful." : "Add follow-up instructions such as 'shorten by 30%'."}

Now produce the requested output using the above CLEAR structure.
  `.trim();

  // --- Render results ---
  summaryEl.textContent = `Overall Prompt Strength: ${score}/100`;

  breakdown.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    breakdownEl.appendChild(li);
  });

  tips.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    tipsEl.appendChild(li);
  });

  improvedEl.value = improvedPrompt;

  resultsSection.style.display = "block";
});
  


                                                             
