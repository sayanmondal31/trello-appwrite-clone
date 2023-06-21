import { Board } from "@/typings";
import formatTodosForAI from "./formatTodosForAI";

const fetchSuggestions = async (board: Board) => {
  const todos = formatTodosForAI(board);

  console.log("FORMATTED TODOS: ", todos);

  const res = await fetch("/api/generateSummary", {
    method: "POST",
    body: JSON.stringify({ todos }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("RES: ", res);

  const GPTdata = await res.json();
  const { content } = GPTdata;

  return content;
};

export default fetchSuggestions;
