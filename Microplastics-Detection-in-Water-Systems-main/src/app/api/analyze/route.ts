import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are an expert environmental scientist and microplastics analyst. 
Analyze the provided water sample image and give a detailed detection report.

Provide the following information in JSON format:

{
  "detection_summary": {
    "microplastics_detected": true/false,
    "total_particle_count": <number>,
    "contamination_level": "Low/Moderate/High/Severe",
    "overall_risk": "Safe/Caution/Unsafe/Hazardous"
  },
  "particle_types": [
    {
      "type": "Fragment/Fiber/Film/Pellet/Foam/Bead",
      "count": <number>,
      "percentage": <number>,
      "average_size": "Small(<1mm)/Medium(1-5mm)/Large(>5mm)",
      "color": "<observed color>",
      "probable_source": "<likely plastic origin e.g. PET bottle, fishing net>"
    }
  ],
  "water_quality": {
    "water_clarity": "Clear/Cloudy/Turbid/Opaque",
    "visible_sediment": true/false,
    "other_contaminants": "<any other pollutants visible>",
    "estimated_turbidity": "Low/Medium/High"
  },
  "health_risk_assessment": {
    "risk_level": "Low/Medium/High/Critical",
    "potential_health_impacts": ["<impact 1>", "<impact 2>"],
    "safe_for_consumption": true/false,
    "safe_for_agriculture": true/false,
    "safe_for_aquatic_life": true/false
  },
  "recommendations": [
    "<recommendation 1>",
    "<recommendation 2>",
    "<recommendation 3>"
  ],
  "confidence_score": <0-100>,
  "analysis_notes": "<any important observations or limitations of this analysis>"
}

Be as accurate as possible. If the image quality is poor or the sample 
is not clearly visible, mention it in analysis_notes and lower the 
confidence_score accordingly. Do not hallucinate particle counts - 
only report what is visibly detectable in the image. Ensure your entire response is valid JSON and nothing else.`;

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, mediaType } = await req.json();

    if (!imageBase64 || !mediaType) {
      return NextResponse.json({ error: 'Image data missing' }, { status: 400 });
    }

    // ----------------------------------------------------------------------
    // MOCK AI IMPLEMENTATION (since Anthropic credits are exhausted)
    // ----------------------------------------------------------------------
    
    // Simulate network delay for realism
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Return a highly realistic mock detection report
    const mockData = {
      "detection_summary": {
        "microplastics_detected": true,
        "total_particle_count": 14,
        "contamination_level": "Moderate",
        "overall_risk": "Caution"
      },
      "particle_types": [
        {
          "type": "Fiber",
          "count": 8,
          "percentage": 57.1,
          "average_size": "Small(<1mm)",
          "color": "Blue",
          "probable_source": "Synthetic clothing (e.g., polyester fleece)"
        },
        {
          "type": "Fragment",
          "count": 4,
          "percentage": 28.6,
          "average_size": "Medium(1-5mm)",
          "color": "White/Transparent",
          "probable_source": "Degraded single-use packaging (PET/PE)"
        },
        {
          "type": "Film",
          "count": 2,
          "percentage": 14.3,
          "average_size": "Medium(1-5mm)",
          "color": "Translucent",
          "probable_source": "Plastic bags or agricultural wraps"
        }
      ],
      "water_quality": {
        "water_clarity": "Cloudy",
        "visible_sediment": true,
        "other_contaminants": "Organic debris (algae/plant matter)",
        "estimated_turbidity": "Medium"
      },
      "health_risk_assessment": {
        "risk_level": "Medium",
        "potential_health_impacts": [
          "Bioaccumulation in local aquatic species",
          "Potential vector for chemical pollutants and pathogens",
          "Gastrointestinal distress if consumed untreated"
        ],
        "safe_for_consumption": false,
        "safe_for_agriculture": true,
        "safe_for_aquatic_life": false
      },
      "recommendations": [
        "Implement multi-stage filtration (e.g., RO or ultrafiltration) before any human consumption.",
        "Conduct source tracking upstream to identify the primary origin of synthetic microfibers.",
        "Increase frequency of sampling to monitor contamination trends over time."
      ],
      "confidence_score": 88,
      "analysis_notes": "MOCK ANALYSIS: The image analysis successfully identified multiple distinct polymer signatures. The high count of blue fibers suggests contamination from municipal wastewater discharge or localized washing activities."
    };

    return NextResponse.json(mockData);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong during analysis.' },
      { status: 500 }
    );
  }
}
