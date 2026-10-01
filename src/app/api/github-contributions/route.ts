import { NextResponse } from "next/server";

const GITHUB_GRAPHQL = "https://api.github.com/graphql";
const USERNAME = "Shreyans-704";

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface GraphQLResponse {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: ContributionWeek[];
        };
      };
    };
  };
  errors?: Array<{ message: string }>;
}

const QUERY = `
query ($login: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $login) {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
          }
        }
      }
    }
  }
}
`;

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "GitHub token not configured" },
      {
        status: 500,
        headers: { "Cache-Control": "no-store" },
      }
    );
  }

  const now = new Date();
  const to = now.toISOString();
  const from = new Date(
    now.getFullYear() - 1,
    now.getMonth(),
    now.getDate()
  ).toISOString();

  try {
    const response = await fetch(GITHUB_GRAPHQL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "portfolio-shreyans",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { login: USERNAME, from, to },
      }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error("GitHub API HTTP error:", response.status, response.statusText);
      return NextResponse.json(
        { error: "GitHub API request failed" },
        {
          status: 502,
          headers: { "Cache-Control": "no-store" },
        }
      );
    }

    const json: GraphQLResponse = await response.json();

    if (json.errors?.length) {
      console.error("GitHub GraphQL errors:", json.errors);
      return NextResponse.json(
        { error: "GitHub API returned errors" },
        {
          status: 502,
          headers: { "Cache-Control": "no-store" },
        }
      );
    }

    const calendar =
      json.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      return NextResponse.json(
        { error: "Could not read contribution data" },
        {
          status: 502,
          headers: { "Cache-Control": "no-store" },
        }
      );
    }

    const days: ContributionDay[] = calendar.weeks.flatMap(
      (w) => w.contributionDays
    );

    return NextResponse.json(
      {
        days,
        totalContributions: calendar.totalContributions,
      },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=300",
        },
      }
    );
  } catch (err) {
    console.error("GitHub contributions fetch error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      {
        status: 500,
        headers: { "Cache-Control": "no-store" },
      }
    );
  }
}
