import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { resumeData } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log('Analyzing resume data:', JSON.stringify(resumeData, null, 2));

    const prompt = `You are an expert resume reviewer. Analyze the following resume data and provide:
1. Content suggestions for improvement
2. Missing sections that should be added
3. Keyword optimization suggestions
4. Grammar and phrasing improvements

Resume Data:
${JSON.stringify(resumeData, null, 2)}

Provide your analysis in JSON format with the following structure:
{
  "suggestions": ["suggestion 1", "suggestion 2", ...],
  "missingSections": ["section 1", "section 2", ...],
  "keywords": ["keyword 1", "keyword 2", ...],
  "improvements": ["improvement 1", "improvement 2", ...]
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "You are an expert resume reviewer. Always respond with valid JSON only." },
          { role: "user", content: prompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    console.log('AI response:', content);
    
    // Extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : {
      suggestions: ["Add more quantifiable achievements"],
      missingSections: ["Professional Summary"],
      keywords: ["leadership", "teamwork"],
      improvements: ["Use action verbs"]
    };

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analyze-resume function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error",
      suggestions: ["Unable to analyze resume at this time"],
      missingSections: [],
      keywords: [],
      improvements: []
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
