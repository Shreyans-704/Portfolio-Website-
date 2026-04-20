import { NextResponse } from "next/server";
import { PORTFOLIO_DATA } from "@/utils/portfolioData";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const query = messages[messages.length - 1].content.toLowerCase();

    console.log("--- Local Assistant Debugging ---");
    console.log("Input:", query);

    let responseText = "";
    let matchedCategory = "fallback";

    // Matching Groups
    const matches = {
      about: ["about", "yourself", "who are you", "who is", "bio", "background", "profile"],
      projects: ["project", "work", "built", "done", "portfolio", "made", "apps", "application"],
      skills: ["skill", "tech", "stack", "know", "language", "knowledge", "expert", "tool"],
      certifications: ["certification", "certificate", "courses", "badges", "achievements", "learn", "award"],
      education: ["education", "college", "study", "university", "nit", "degree", "school"],
      experience: ["experience", "job", "intern", "career", "company", "worked", "professional"],
      contact: ["contact", "email", "reach", "hire", "linkedin", "github", "social", "connect", "call"]
    };

    const isMatch = (keywords: string[]) => keywords.some(k => query.includes(k));

    // Logic
    if (query.includes("hi") || query.includes("hello") || query.includes("hey")) {
        matchedCategory = "greeting";
        responseText = `Hi there! 👋 I'm Shreyans' personal AI assistant. I can tell you about my projects, skills, education, and professional experience. What can I help you with?`;
    } 
    else if (isMatch(matches.about)) {
        matchedCategory = "about";
        responseText = PORTFOLIO_DATA.about;
    }
    else if (isMatch(matches.projects)) {
        matchedCategory = "projects";
        const projects = PORTFOLIO_DATA.projects.map(p => `• **${p.title}** (${p.category}): ${p.desc}`).join("\n");
        responseText = `I've built several high-performance systems:\n\n${projects}\n\nWhich one would you like to hear more about?`;
    } 
    else if (isMatch(matches.skills)) {
        matchedCategory = "skills";
        const allSkills = [
            ...PORTFOLIO_DATA.skills.frontend,
            ...PORTFOLIO_DATA.skills.backend,
            ...PORTFOLIO_DATA.skills.ai,
            ...PORTFOLIO_DATA.skills.devops
        ].join(", ");
        responseText = `My technical toolkit includes:\n\n${allSkills}\n\nI specialize in Full-Stack development and AI systems.`;
    } 
    else if (isMatch(matches.certifications)) {
        matchedCategory = "certifications";
        const certs = PORTFOLIO_DATA.certifications.map(c => `• ${c.title} (${c.issuer})`).join("\n");
        responseText = `I'm a lifelong learner. Here are some of my certifications:\n\n${certs}`;
    }
    else if (isMatch(matches.education)) {
        matchedCategory = "education";
        const edu = PORTFOLIO_DATA.education.map(e => `${e.degree} from ${e.institute} (${e.duration})`).join("\n");
        responseText = `I'm currently pursuing my ${edu}.`;
    }
    else if (isMatch(matches.experience)) {
        matchedCategory = "experience";
        const exp = PORTFOLIO_DATA.experience.map(e => `• **${e.role}** at ${e.company} (${e.duration}). Focused on ${e.focus}.`).join("\n");
        responseText = `My professional journey so far:\n\n${exp}`;
    }
    else if (isMatch(matches.contact)) {
        matchedCategory = "contact";
        responseText = `Let's connect! 🚀\n\n• Email: ${PORTFOLIO_DATA.contact.email}\n• LinkedIn: ${PORTFOLIO_DATA.contact.linkedin}\n• GitHub: ${PORTFOLIO_DATA.contact.github}`;
    }
    else {
        responseText = "I can definitely help with that, though I might need more specifics. I can answer questions about my projects, skills, education, experience, and certifications!";
    }

    console.log("Matched Category:", matchedCategory);

    // Simulate thinking delay
    await new Promise(resolve => setTimeout(resolve, 600));

    return NextResponse.json({ text: responseText });

  } catch (error) {
    console.error("--- Local Assistant ERROR ---");
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
