import axios from "axios";
import { NextResponse } from "next/server";

// Project: Dashboard APP
// Module: API
// Component: trending.ts
// Author: Advyta
// Date: 28/06/2025
// Logic:
// This module is used to get the trending repositories from GitHub
// It returns 6 trending repositories if the request is successful
// It returns an error message if the request fails

export async function GET() {
  try {
    const res = await axios.get("https://api.github.com/search/repositories", {
      params: {
        q: "stars:>50000",
        sort: "stars",
        order: "desc",
        per_page: 6
      },
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_PAT}`,
        Accept: "application/vnd.github+json",
      },
    });

    return NextResponse.json(res.data);
  } catch (error) {
    console.error("Error fetching trending repos:", error);
    return NextResponse.json(
      { error: "Failed to fetch trending repositories" },
      { status: 500 }
    );
  }
}
