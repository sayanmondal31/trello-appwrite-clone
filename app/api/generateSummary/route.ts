import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { todos } = await request.json();
  console.log(todos);

  // communicate with gpt
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content: `When responding, welcome the user always as Mr. Sayan and say welcome to trello todo! Limit the response to 200 characters.`,
      },
      {
        role: "user",
        content: `Hi there, provide summary of the following todos. Count how many todos are is each category such as To do, in progress and done,then tell the user to have a productive day! here's the data ${JSON.stringify(
          todos
        )}`,
      },
    ],
  });

  const { data } = response;

  console.log("DATA IS: ", data);
  console.log("DATA CHOICES IS: ", data.choices[0].message);

  return NextResponse.json(data.choices[0].message);
}
